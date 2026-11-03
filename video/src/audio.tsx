import React from "react";
import { Audio, Sequence, getInputProps, interpolate, staticFile } from "remotion";
import { clamp } from "./anim";
import voiceover from "./voiceover.json";

export const FPS = 30;
const SEGMENT_GAP = 6; // frames between two segments of the same scene
const SCENE_TAIL = 20; // frames after the last segment before a scene may end

type VoSegment = { at: number; file: string; seconds: number };
export type PlacedSegment = { start: number; frames: number; file: string };

/**
 * Places every voiceover segment on the global timeline and stretches a scene when its
 * voiceover runs longer than the scene's visual duration.
 */
export const buildTimeline = <T extends { id: string; frames: number }>(scenes: T[]) => {
  const vo = voiceover.scenes as Record<string, VoSegment[] | undefined>;
  const placed: PlacedSegment[] = [];
  let offset = 0;
  const sized = scenes.map((scene) => {
    let cursor = 0;
    for (const seg of vo[scene.id] ?? []) {
      const start = Math.max(seg.at, cursor);
      const frames = Math.ceil(seg.seconds * FPS);
      placed.push({ start: offset + start, frames, file: seg.file });
      cursor = start + frames + SEGMENT_GAP;
    }
    const frames = Math.max(scene.frames, cursor + SCENE_TAIL);
    offset += frames;
    return { ...scene, frames };
  });
  return { scenes: sized, segments: placed, total: offset };
};

// CC BY 4.0 tracks by Kevin MacLeod (incompetech.com). Pick one with --props='{"music":"carefree"}'.
// Volumes are per track so both sit at a similar level in the mix.
const TRACKS = {
  "easy-lemon": { file: "music/easy-lemon.mp3", title: "Easy Lemon", full: 0.65, ducked: 0.24 },
  carefree: { file: "music/carefree.mp3", title: "Carefree", full: 1, ducked: 0.38 }, // track is ~4.4 dB quieter
} as const;
type TrackId = keyof typeof TRACKS;
const requested = (getInputProps() as { music?: string }).music;
export const MUSIC = TRACKS[(requested && requested in TRACKS ? requested : "easy-lemon") as TrackId];

/** Merges segments that are close together so the music doesn't pump between sentences. */
const duckIntervals = (segments: PlacedSegment[]) => {
  const out: { from: number; to: number }[] = [];
  for (const s of segments) {
    const last = out[out.length - 1];
    if (last && s.start - last.to < 36) last.to = s.start + s.frames;
    else out.push({ from: s.start, to: s.start + s.frames });
  }
  return out;
};

export const Soundtrack: React.FC<{ segments: PlacedSegment[]; total: number }> = ({ segments, total }) => {
  const intervals = duckIntervals(segments);
  const musicVolume = (f: number) => {
    const fade = Math.min(interpolate(f, [0, 30], [0, 1], clamp), interpolate(f, [total - 90, total - 5], [1, 0], clamp));
    const duck = Math.max(0, ...intervals.map(({ from, to }) => interpolate(f, [from - 10, from, to, to + 18], [0, 1, 1, 0], clamp)));
    return (MUSIC.full - (MUSIC.full - MUSIC.ducked) * duck) * fade;
  };
  return (
    <>
      <Audio src={staticFile(MUSIC.file)} volume={musicVolume} />
      {segments.map((s) => (
        <Sequence key={s.file} from={s.start} durationInFrames={s.frames + 2} name={s.file} layout="none">
          <Audio src={staticFile(s.file)} />
        </Sequence>
      ))}
    </>
  );
};
