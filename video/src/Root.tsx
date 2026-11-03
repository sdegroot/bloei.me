import React from "react";
import { Composition, Still } from "remotion";
import { CoverSquare, CoverVertical } from "./Cover";
import { BloeiSquare, BloeiVertical, FPS, TOTAL_FRAMES } from "./Video";

export const Root: React.FC = () => (
  <>
    <Composition id="BloeiSquare" component={BloeiSquare} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1080} height={1080} />
    <Composition id="BloeiVertical" component={BloeiVertical} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1080} height={1920} />
    <Still id="CoverSquare" component={CoverSquare} width={1080} height={1080} />
    <Still id="CoverVertical" component={CoverVertical} width={1080} height={1920} />
  </>
);
