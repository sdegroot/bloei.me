// Generates the voiceover: one clip per segment in voiceover/lines.json → public/vo/<scene>-<n>.mp3,
// and writes src/voiceover.json (segment start frames + durations) for the video timeline.
//
//   node scripts/generate-voiceover.mjs                      # macOS `say` placeholder (voice: Xander)
//   PROVIDER=elevenlabs node scripts/generate-voiceover.mjs  # ElevenLabs, settings from .env
//
// ElevenLabs settings (in video/.env, never committed):
//   ELEVENLABS_API_KEY=...            required
//   ELEVENLABS_VOICE_ID=...           required (see scripts/list-voices.mjs)
//   ELEVENLABS_MODEL=eleven_multilingual_v2   optional
//
// Unchanged segments (same spoken text, provider, voice, model) are reused, so editing one line only
// regenerates that line. Use FORCE=1 to regenerate everything.
//
// Pronunciation: "_pronounce" in lines.json maps a written word to how the voice should say it
// (e.g. "Epistola" → "Eepistola"). Only the spoken text changes; the lines stay readable.
//
// Loudness: every clip is levelled to TARGET_LUFS (measure → gain → peak limiter). Single-pass
// loudnorm cannot do this reliably for clips under ~3 s, which left some lines far too quiet.
// Reused clips that are more than 1 LU off target are re-levelled in place (no new TTS call).
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
loadEnv(join(root, ".env"));

const provider = process.env.PROVIDER ?? "say";
const TARGET_LUFS = -17;
const PEAK_DB = -1.5;
const { _doc, _pronounce = {}, ...scenes } = JSON.parse(readFileSync(join(root, "voiceover/lines.json"), "utf8"));
const manifestPath = join(root, "src/voiceover.json");
const previous = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : { scenes: {} };
const outDir = join(root, "public/vo");
mkdirSync(outDir, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), "bloei-vo-"));

const settings =
  provider === "elevenlabs"
    ? {
        voice: required("ELEVENLABS_VOICE_ID"),
        model: process.env.ELEVENLABS_MODEL ?? "eleven_multilingual_v2",
      }
    : { voice: process.env.VOICE ?? "Xander", model: `say-r${process.env.RATE ?? "170"}` };

// flat list so every segment knows its neighbours (for natural ElevenLabs intonation)
const flat = Object.entries(scenes).flatMap(([scene, segs]) =>
  segs.map(([at, text], i) => ({ scene, i, at, text, spoken: pronounce(text) })),
);

const result = {};
let total = 0;
let generated = 0;
let relevelled = 0;
try {
  for (const [k, seg] of flat.entries()) {
    const file = `vo/${seg.scene}-${seg.i + 1}.mp3`;
    const abs = join(root, "public", file);
    const key = hash([provider, settings.voice, settings.model, seg.spoken]);
    const old = previous.scenes?.[seg.scene]?.[seg.i];
    let seconds;
    if (!process.env.FORCE && old?.key === key && existsSync(abs)) {
      seconds = old.seconds;
      if (Math.abs(loudness(abs) - TARGET_LUFS) > 1) {
        const copy = join(tmp, `${seg.scene}-${seg.i}-old.mp3`);
        execFileSync("cp", [abs, copy]);
        level(copy, abs);
        relevelled++;
      }
    } else {
      const raw = join(tmp, `${seg.scene}-${seg.i}.${provider === "elevenlabs" ? "mp3" : "aiff"}`);
      if (provider === "elevenlabs") {
        await elevenlabs(seg.spoken, flat[k - 1]?.spoken, flat[k + 1]?.spoken, raw);
      } else {
        execFileSync("say", ["-v", settings.voice, "-r", settings.model.replace("say-r", ""), "-o", raw, seg.spoken]);
      }
      // trim leading/trailing silence, then level loudness and encode
      const trimmed = join(tmp, `${seg.scene}-${seg.i}.wav`);
      execFileSync("ffmpeg", [
        "-loglevel", "error", "-y", "-i", raw,
        "-af", "silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse",
        "-ar", "44100", "-ac", "1", trimmed,
      ]);
      level(trimmed, abs);
      seconds = Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", abs]).toString().trim());
      seconds = Math.round(seconds * 100) / 100;
      generated++;
    }
    total += seconds;
    (result[seg.scene] ??= []).push({ at: seg.at, file, seconds, text: seg.text, key });
    console.log(`${file.padEnd(20)} ${seconds.toFixed(2)}s  ${loudness(abs).toFixed(1)} LUFS`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

writeFileSync(manifestPath, JSON.stringify({ provider, ...settings, scenes: result }, null, 2) + "\n");
console.log(`${generated} generated, ${flat.length - generated} reused (${relevelled} re-levelled) · total speech ${total.toFixed(1)}s`);

function pronounce(text) {
  return Object.entries(_pronounce).reduce((t, [written, said]) => t.split(written).join(said), text);
}

/** Integrated loudness (LUFS) of a file. */
function loudness(file) {
  // ebur128 reports on stderr
  const { stderr: log } = spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-i", file, "-af", "ebur128", "-f", "null", "-"], {
    encoding: "utf8",
  });
  const matches = [...log.matchAll(/^\s+I:\s+(-?[\d.]+) LUFS/gm)];
  return Number(matches[matches.length - 1][1]);
}

/**
 * Gain to TARGET_LUFS, then a limiter so peaks stay below PEAK_DB; encodes to mp3. The limiter
 * takes some loudness off peaky clips, so a second pass corrects the gain by what was lost.
 */
function level(input, out) {
  let gain = TARGET_LUFS - loudness(input);
  for (let pass = 0; pass < 2; pass++) {
    execFileSync("ffmpeg", [
      "-loglevel", "error", "-y", "-i", input,
      "-af", `volume=${gain.toFixed(2)}dB,alimiter=limit=${Math.pow(10, PEAK_DB / 20).toFixed(4)}:level=false:attack=2:release=40`,
      "-ar", "44100", "-ac", "1", "-b:a", "160k", out,
    ]);
    const miss = TARGET_LUFS - loudness(out);
    if (Math.abs(miss) < 0.3) break;
    gain += miss;
  }
}

async function elevenlabs(text, previousText, nextText, out) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${settings.voice}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "xi-api-key": required("ELEVENLABS_API_KEY"), "content-type": "application/json", accept: "audio/mpeg" },
    body: JSON.stringify({
      text,
      model_id: settings.model,
      language_code: "nl",
      previous_text: previousText,
      next_text: nextText,
      voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.15, use_speaker_boost: true },
    }),
  });
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`);
  writeFileSync(out, Buffer.from(await res.arrayBuffer()));
}

function hash(parts) {
  return createHash("sha256").update(parts.join("\u0000")).digest("hex").slice(0, 16);
}

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set (put it in video/.env)`);
  return v;
}

function loadEnv(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
