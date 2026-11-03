// Masters the audio of a rendered video to social-media loudness (two-pass EBU R128 loudnorm,
// -14 LUFS integrated, -1.5 dBTP) without re-encoding the video stream.
//   node scripts/master.mjs <in.mp4> <out.mp4>
import { spawnSync } from "node:child_process";

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error("usage: node scripts/master.mjs <in.mp4> <out.mp4>");
  process.exit(1);
}
const target = "I=-14:TP=-1.5:LRA=11";

const ffmpeg = (args) => {
  const r = spawnSync("ffmpeg", ["-hide_banner", ...args], { encoding: "utf8" });
  if (r.status !== 0) throw new Error(r.stderr);
  return r.stderr;
};

// pass 1: measure (loudnorm prints its JSON report on stderr)
const report = ffmpeg(["-i", input, "-af", `loudnorm=${target}:print_format=json`, "-f", "null", "-"]);
const m = JSON.parse(report.slice(report.lastIndexOf("{"), report.lastIndexOf("}") + 1));

// pass 2: apply as a linear gain using the measured values
const filter = `loudnorm=${target}:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true`;
ffmpeg(["-loglevel", "error", "-y", "-i", input, "-c:v", "copy", "-af", filter, "-ar", "48000", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", output]);
console.log(`mastered ${input} (${m.input_i} LUFS) → ${output}`);
