import React from "react";
import { AbsoluteFill, Series, interpolate, useCurrentFrame } from "remotion";
import { LogoMark } from "./illustrations";
import { SceneAlone, SceneHook, SceneNetwork, SceneOthers } from "./scenes/opening";
import { SceneAccept, SceneOffer, ScenePledge } from "./scenes/middle";
import { SceneCTA, SceneMessage, SceneOpen, SceneShares } from "./scenes/closing";
import { C, FONT } from "./theme";
import { Background } from "./background";
import { COVER_FRAMES, SceneCover } from "./Cover";
import { FPS, Soundtrack, buildTimeline } from "./audio";

export { FPS };

/** Visual (minimum) scene durations; scenes stretch when their voiceover runs longer. */
const BASE_SCENES: { id: string; frames: number; C: React.FC<{ duration: number }> }[] = [
  { id: "cover", frames: COVER_FRAMES, C: SceneCover }, // frame 0 = cover, so previews look right
  { id: "hook", frames: 340, C: SceneHook },
  { id: "others", frames: 195, C: SceneOthers },
  { id: "alone", frames: 255, C: SceneAlone },
  { id: "network", frames: 285, C: SceneNetwork },
  { id: "offer", frames: 255, C: SceneOffer },
  { id: "pledge", frames: 300, C: ScenePledge },
  { id: "accept", frames: 255, C: SceneAccept },
  { id: "shares", frames: 195, C: SceneShares },
  { id: "open", frames: 210, C: SceneOpen },
  { id: "message", frames: 270, C: SceneMessage },
  { id: "cta", frames: 225, C: SceneCTA },
];

const TIMELINE = buildTimeline(BASE_SCENES);
const SCENES = TIMELINE.scenes;
export const TOTAL_FRAMES = TIMELINE.total;
const END_START = TOTAL_FRAMES - SCENES[SCENES.length - 1].frames;

/** The 1080×1080 story; every scene is laid out on this square stage. */
const Stage: React.FC = () => (
  <div style={{ position: "relative", width: 1080, height: 1080, overflow: "hidden" }}>
    <Series>
      {SCENES.map(({ id, frames, C: SceneComponent }) => (
        <Series.Sequence key={id} durationInFrames={frames} name={id}>
          <SceneComponent duration={frames} />
        </Series.Sequence>
      ))}
    </Series>
  </div>
);

export const BloeiSquare: React.FC = () => (
  <AbsoluteFill>
    <Background />
    <Stage />
    <Soundtrack segments={TIMELINE.segments} total={TOTAL_FRAMES} />
  </AbsoluteFill>
);

/** 9:16 version: same stage centred, with a brand header for Reels/Shorts/TikTok. */
export const BloeiVertical: React.FC = () => {
  const frame = useCurrentFrame();
  // hidden while the cover (which has its own logo) is on screen, and on the end card
  const headerIn = interpolate(frame, [COVER_FRAMES, COVER_FRAMES + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const headerOpacity = Math.min(headerIn, frame < END_START ? 1 : Math.max(0, 1 - (frame - END_START) / 10));
  return (
    <AbsoluteFill>
      <Background />
      <div style={{ position: "absolute", top: 230, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 18, opacity: headerOpacity }}>
        <LogoMark size={64} />
        <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 46, letterSpacing: "-0.04em", color: C.ink }}>bloei.me</span>
      </div>
      <div style={{ position: "absolute", top: 420, left: 0 }}>
        <Stage />
      </div>
      <Soundtrack segments={TIMELINE.segments} total={TOTAL_FRAMES} />
    </AbsoluteFill>
  );
};
