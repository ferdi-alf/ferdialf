"use client";

import { HEAD, TAIL } from "@/lib/keyframes";
import React, { memo } from "react";

interface PulseBeamProps {
  id: string;
  d: string;
  tailColor: string;
  headColor: string;
  tailKf: string;
  headKf: string;
  duration: number;
  delay: number;
  pl: number;
  strokeWidth?: number;
}

const REPEAT_DELAY = 0.8;

const PulseBeam = memo(
  ({
    d,
    tailColor,
    headColor,
    tailKf,
    headKf,
    duration,
    delay,
    pl,
    strokeWidth = 3,
  }: PulseBeamProps) => {
    if (pl === 0) return null;

    const MARGIN = 800;
    const gap = pl + MARGIN * 4 + TAIL + 300;
    const totalDuration = duration + REPEAT_DELAY;

    const tailStyle: React.CSSProperties = {
      strokeDasharray: `${TAIL} ${gap}`,
      strokeDashoffset: pl + TAIL + MARGIN,
      animationName: tailKf,
      animationDuration: `${totalDuration}s`,
      animationDelay: `${delay}s`,
      animationTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
      animationIterationCount: "infinite",
      willChange: "stroke-dashoffset",
    } as React.CSSProperties;

    const headStyle: React.CSSProperties = {
      strokeDasharray: `${HEAD} ${gap}`,
      strokeDashoffset: pl + TAIL + MARGIN - (TAIL - HEAD),
      animationName: headKf,
      animationDuration: `${totalDuration}s`,
      animationDelay: `${delay}s`,
      animationTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
      animationIterationCount: "infinite",
      willChange: "stroke-dashoffset",
    } as React.CSSProperties;

    return (
      <>
        <path
          d={d}
          fill="none"
          stroke={tailColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.8}
          style={tailStyle}
        />
        <path
          d={d}
          fill="none"
          stroke={headColor}
          strokeWidth={strokeWidth * 0.55}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={1}
          style={headStyle}
        />
      </>
    );
  },
);

PulseBeam.displayName = "PulseBeam";
export default PulseBeam;
