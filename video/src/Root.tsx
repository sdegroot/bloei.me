import React from "react";
import { Composition } from "remotion";
import { BloeiSquare, BloeiVertical, FPS, TOTAL_FRAMES } from "./Video";

export const Root: React.FC = () => (
  <>
    <Composition id="BloeiSquare" component={BloeiSquare} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1080} height={1080} />
    <Composition id="BloeiVertical" component={BloeiVertical} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1080} height={1920} />
  </>
);
