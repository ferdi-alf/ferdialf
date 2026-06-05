import React, { memo } from "react";
import type { StubTrace } from "@/types/about";

const StubLayer = memo(({ stubs }: { stubs: StubTrace[] }) => (
  <g filter="url(#co_glow_stub)">
    {stubs.map((s) => (
      <g key={s.id}>
        <path
          d={s.d}
          fill="none"
          stroke={s.color}
          strokeWidth={2}
          strokeLinecap="square"
          strokeLinejoin="miter"
          opacity={0.75}
        />
        <circle
          cx={s.endPt.x}
          cy={s.endPt.y}
          r={5.5}
          fill="none"
          stroke={s.color}
          strokeWidth={0.7}
          opacity={0.3}
        />
        <circle
          cx={s.endPt.x}
          cy={s.endPt.y}
          r={3.5}
          fill={s.color}
          opacity={0.9}
        />
        <circle cx={s.endPt.x} cy={s.endPt.y} r={1.2} fill="rgba(0,0,0,0.7)" />
      </g>
    ))}
  </g>
));

StubLayer.displayName = "StubLayer";
export default StubLayer;
