import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C } from "./theme";

/** Soft, slowly drifting gradient shared by the video and the cover. */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 40;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${8 + drift / 20}% ${4 + drift / 30}%, rgba(184,217,139,.42), transparent 520px),
          radial-gradient(circle at ${94 - drift / 25}% ${88 + drift / 40}%, rgba(220,239,235,.9), transparent 620px),
          ${C.paper}`,
      }}
    />
  );
};
