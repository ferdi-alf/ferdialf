"use client";

import React, { memo, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { BeamPath, StaticPath } from "@/types/about";
import { computeBeamCSS, injectKeyframes } from "@/lib/keyframes";
import PulseBeam from "./PulseBeam";

interface BeamLayerProps {
  beams: BeamPath[];
  statics: StaticPath[];
}

const BeamLayer = memo(({ beams, statics }: BeamLayerProps) => {
  const measureGroupRef = useRef<SVGGElement>(null);
  const [plMap, setPlMap] = useState<Map<string, number>>(new Map());

  const allBeams = useMemo(() => [...beams, ...statics], [beams, statics]);

  useLayoutEffect(() => {
    const g = measureGroupRef.current;
    if (!g) return;

    const paths = g.querySelectorAll<SVGPathElement>("path[data-beam-id]");
    const map = new Map<string, number>();
    paths.forEach((p) => {
      const id = p.dataset.beamId!;
      const len = p.getTotalLength();
      if (len > 0) map.set(id, len);
    });

    injectKeyframes(allBeams, map);
    setPlMap(map);
  }, [allBeams]);

  const beamCSS = useMemo(
    () => computeBeamCSS(beams, plMap, false),
    [beams, plMap],
  );
  const staticCSS = useMemo(
    () => computeBeamCSS(statics, plMap, true),
    [statics, plMap],
  );

  return (
    <>
      <g
        ref={measureGroupRef}
        aria-hidden="true"
        style={{ display: "contents" }}
      >
        {allBeams.map((b) => (
          <path
            key={b.id}
            data-beam-id={b.id}
            d={b.d}
            fill="none"
            stroke="none"
            strokeWidth={0}
          />
        ))}
      </g>

      <g>
        {statics.map((s) => (
          <path
            key={`base_${s.id}`}
            d={s.d}
            fill="none"
            stroke={s.baseColor}
            strokeWidth={3.5}
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        ))}
      </g>

      <g filter="url(#co_glow_beam)">
        {staticCSS.map((e) => (
          <PulseBeam key={e.id} {...e} strokeWidth={2.5} />
        ))}
      </g>

      <g>
        {beams.map((b) => (
          <path
            key={`ulay_${b.id}`}
            d={b.d}
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth={3.5}
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        ))}
      </g>

      <g filter="url(#co_glow_beam)">
        {beamCSS.map((e) => (
          <PulseBeam key={e.id} {...e} strokeWidth={3} />
        ))}
      </g>
    </>
  );
});

BeamLayer.displayName = "BeamLayer";
export default BeamLayer;
