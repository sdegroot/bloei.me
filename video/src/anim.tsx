import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT, SERIF } from "./theme";

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/** 0 → 1 spring that starts at `delay` frames. */
export const useAppear = (delay = 0, damping = 200) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping } });
};

/** Bouncy pop for icons and badges. */
export const usePop = (delay = 0) => useAppear(delay, 12);

/** Fades the whole scene in and out through the shared background. */
export const Scene: React.FC<{ duration: number; children: React.ReactNode }> = ({
  duration,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, duration - 12, duration], [0, 1, 1, 0], clamp);
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

/** Visible only between `from` and `to` (frames, scene-relative) with soft fades. */
export const Beat: React.FC<{
  from: number;
  to?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ from, to = 1e6, children, style }) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [from, from + 10], [0, 1], clamp);
  const fadeOut = interpolate(frame, [to - 10, to], [1, 0], clamp);
  const lift = interpolate(frame, [from, from + 14], [24, 0], clamp);
  if (frame < from || frame > to) return null;
  return (
    <div style={{ opacity: Math.min(fadeIn, fadeOut), transform: `translateY(${lift}px)`, ...style }}>
      {children}
    </div>
  );
};

/** Headline block at the top of the 1080×1080 stage. */
export const Headline: React.FC<{
  children: React.ReactNode;
  sub?: React.ReactNode;
  size?: number;
}> = ({ children, sub, size = 66 }) => (
  <div
    style={{
      position: "absolute",
      top: 84,
      left: 80,
      right: 80,
      fontFamily: FONT,
      color: C.ink,
    }}
  >
    <div style={{ fontSize: size, fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1.06 }}>
      {children}
    </div>
    {sub ? (
      <div style={{ marginTop: 18, fontSize: 32, fontWeight: 500, color: C.muted, lineHeight: 1.3 }}>
        {sub}
      </div>
    ) : null}
  </div>
);

export const Em: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = C.leaf,
}) => (
  <em style={{ fontFamily: SERIF, fontWeight: 500, color, letterSpacing: "-0.02em" }}>{children}</em>
);
