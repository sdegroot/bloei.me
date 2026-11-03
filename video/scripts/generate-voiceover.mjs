// Generates the voiceover: one clip per segment in voiceover/lines.json → public/vo/<scene>-<n>.mp3,
// and writes src/voiceover.json (segment start frames + durations) for the video timeline.
//
//   node scripts/generate-voiceover.mjs                 # macOS `say` placeholder (voice: Xander)
//   VOICE=Ellen RATE=170 node scripts/generate-voiceover.mjs
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const { _doc, ...scenes } = JSON.parse(readFileSync(join(root, "voiceover/lines.json"), "utf8"));
const outDir = join(root, "public/vo");
const voice = process.env.VOICE ?? "Xander";
const rate = process.env.RATE ?? "170";
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), "bloei-vo-"));

const result = {};
let total = 0;
try {
  for (const [scene, segments] of Object.entries(scenes)) {
    result[scene] = segments.map(([at, text], i) => {
      const file = `vo/${scene}-${i + 1}.mp3`;
      const raw = join(tmp, `${scene}-${i}.aiff`);
      execFileSync("say", ["-v", voice, "-r", rate, "-o", raw, text]);
      // trim leading/trailing silence, normalise speech loudness, encode
      execFileSync("ffmpeg", [
        "-loglevel", "error", "-y", "-i", raw,
        "-af", "silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,loudnorm=I=-16:TP=-1.5:LRA=11",
        "-ar", "44100", "-ac", "1", "-b:a", "160k", join(root, "public", file),
      ]);
      const seconds = Number(
        execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", join(root, "public", file)]).toString().trim(),
      );
      total += seconds;
      return { at, file, seconds: Math.round(seconds * 100) / 100, text };
    });
    console.log(`${scene.padEnd(8)} ${result[scene].map((s) => s.seconds.toFixed(2)).join(" + ")}`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

writeFileSync(join(root, "src/voiceover.json"), JSON.stringify({ voice, scenes: result }, null, 2) + "\n");
console.log(`total speech ${total.toFixed(1)}s`);
