// Lists ElevenLabs voices usable for Dutch: your own voices plus Dutch voices from the shared
// library, and the available TTS models.   node scripts/list-voices.mjs
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const envPath = join(root, ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const key = process.env.ELEVENLABS_API_KEY;
if (!key) throw new Error("ELEVENLABS_API_KEY is not set (put it in video/.env)");

// Scoped API keys may lack some read permissions; report and continue instead of failing.
const get = async (path) => {
  const res = await fetch(`https://api.elevenlabs.io${path}`, { headers: { "xi-api-key": key } });
  if (res.ok) return res.json();
  const body = await res.json().catch(() => ({}));
  console.log(`  (skipped ${path}: ${res.status} ${body?.detail?.message ?? ""})`);
  return null;
};

console.log("Models (TTS, with Dutch):");
const models = (await get("/v1/models")) ?? [];
for (const m of models.filter((m) => m.can_do_text_to_speech && m.languages?.some((l) => l.language_id === "nl"))) {
  console.log(`  ${m.model_id.padEnd(28)} ${m.name}`);
}

console.log("\nYour voices:");
const mine = await get("/v2/voices?page_size=100");
for (const v of mine?.voices ?? []) {
  const l = v.labels ?? {};
  console.log(`  ${v.voice_id}  ${v.name.padEnd(28)} ${[l.gender, l.age, l.accent, l.use_case].filter(Boolean).join(", ")}`);
}

console.log("\nShared library, Dutch (most used this year):");
const shared = await get("/v1/shared-voices?language=nl&page_size=25&sort=usage_character_count_1y");
for (const v of shared?.voices ?? []) {
  console.log(`  ${v.voice_id}  ${v.name.padEnd(28)} ${[v.gender, v.age, v.accent, v.use_case].filter(Boolean).join(", ")}`);
}
