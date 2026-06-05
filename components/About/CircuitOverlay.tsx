// components/About/CircuitOverlay.tsx
"use client";

import { removeKeyframes } from "@/lib/keyframes";
import { SceneData } from "@/types/about";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  RefObject,
} from "react";
import Filters from "./circuit/Filters";
import BeamLayer from "./circuit/BeamLayer";
import StubLayer from "./circuit/StubLayer";
import { buildScene } from "@/lib/geometry";

export interface CircuitOverlayProps {
  containerRef: RefObject<HTMLDivElement | null>;
  chipRef: RefObject<HTMLDivElement | null>;
  card1Ref: RefObject<HTMLDivElement | null>;
  card2Ref: RefObject<HTMLDivElement | null>;
  card3Ref: RefObject<HTMLDivElement | null>;
  card4Ref: RefObject<HTMLDivElement | null>;
}

export default function CircuitOverlay({
  containerRef,
  chipRef,
  card1Ref,
  card2Ref,
  card3Ref,
  card4Ref,
}: CircuitOverlayProps) {
  const [scene, setScene] = useState<SceneData | null>(null);
  const debRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const recalc = useCallback(() => {
    const c = containerRef.current;
    const ch = chipRef.current;
    const c1 = card1Ref.current;
    const c2 = card2Ref.current;
    const c3 = card3Ref.current;
    const c4 = card4Ref.current;
    if (!c || !ch || !c1 || !c2 || !c3 || !c4) return;
    setScene(buildScene(c, ch, c1, c2, c3, c4));
  }, [containerRef, chipRef, card1Ref, card2Ref, card3Ref, card4Ref]);

  const schedule = useCallback(() => {
    if (debRef.current) clearTimeout(debRef.current);
    debRef.current = setTimeout(recalc, 16);
  }, [recalc]);

  useEffect(() => {
    const raf = requestAnimationFrame(recalc);
    const ro = new ResizeObserver(schedule);
    [containerRef, chipRef, card1Ref, card2Ref, card3Ref, card4Ref].forEach(
      (r) => {
        if (r.current) ro.observe(r.current);
      },
    );
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
      if (debRef.current) clearTimeout(debRef.current);
      removeKeyframes();
    };
  }, [
    recalc,
    schedule,
    containerRef,
    chipRef,
    card1Ref,
    card2Ref,
    card3Ref,
    card4Ref,
  ]);

  if (!scene) return null;

  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "visible",
      }}
      viewBox={`0 0 ${scene.w} ${scene.h}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <Filters />
      <BeamLayer beams={scene.beams} statics={scene.statics} />
      <StubLayer stubs={scene.stubs} />
    </svg>
  );
}
