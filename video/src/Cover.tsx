import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Em } from "./anim";
import { Logo, Plant } from "./illustrations";
import { TownRow } from "./scenes/opening";
import { C, FONT } from "./theme";
import { Background } from "./background";

/**
 * Cover / thumbnail. It is also the first scene of the video (fully visible on frame 0, so
 * platforms that use the first frame as preview show it), and `pnpm cover` renders it as an image
 * to upload as a custom thumbnail.
 */
export const COVER_FRAMES = 30; // holds for 15 frames, then fades out

export const CoverStage: React.FC = () => (
  <div style={{ position: "relative", width: 1080, height: 1080, overflow: "hidden" }}>
    <div style={{ position: "absolute", top: 96, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Logo size={72} />
    </div>
    <div style={{ position: "absolute", top: 230, left: 60, right: 60, textAlign: "center", fontFamily: FONT, color: C.ink, fontSize: 84, fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1.04 }}>
      Wat als we software
      <br />
      <Em>samen</Em> financieren?
    </div>
    <div style={{ position: "absolute", left: 540, top: 735, transform: "translate(-50%, -100%)" }}>
      <Plant growth={1} bloom={1} width={180} />
    </div>
    {/* negative delays: the springs are fully settled at frame 0 */}
    <TownRow delays={[-100, -100, -100, -100]} />
  </div>
);

export const CoverSquare: React.FC = () => (
  <AbsoluteFill>
    <Background />
    <CoverStage />
  </AbsoluteFill>
);

export const CoverVertical: React.FC = () => (
  <AbsoluteFill>
    <Background />
    <div style={{ position: "absolute", top: 420, left: 0 }}>
      <CoverStage />
    </div>
  </AbsoluteFill>
);

/** First scene of the video: the cover, fully opaque at frame 0, then fading into the hook. */
export const SceneCover: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [duration / 2, duration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity }}>
      <CoverStage />
    </AbsoluteFill>
  );
};
