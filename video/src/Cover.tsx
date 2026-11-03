import React from "react";
import { AbsoluteFill } from "remotion";
import { Em } from "./anim";
import { Logo, Plant } from "./illustrations";
import { TownRow } from "./scenes/opening";
import { C, FONT } from "./theme";
import { Background } from "./Video";

/**
 * Thumbnail / cover image (render with `pnpm cover`). The video itself fades in from an empty
 * background, so platforms that use the first frame as preview show nothing useful; upload this
 * image as the custom thumbnail instead.
 */
const CoverStage: React.FC = () => (
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
