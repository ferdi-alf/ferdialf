import type { BeamPath, StaticPath } from "@/types/about";
import { toHex, lightenToWhite } from "./colors";

const STYLE_ID = "circuit-beam-keyframes";
const TAIL = 95;
const HEAD = 22;
const HEAD_ADVANCE = TAIL - HEAD;
const MARGIN = 800;

function beamKeyframeName(id: string, part: "tail" | "head") {
  return `cbm_${id}_${part}`;
}

function buildKeyframes(id: string, pl: number, part: "tail" | "head"): string {
  const offset = part === "head" ? HEAD_ADVANCE : 0;
  const gap = pl + MARGIN * 4 + TAIL + 300;
  const start = pl + TAIL + MARGIN - offset;
  const end = -(TAIL + MARGIN) - offset;
  const dashLen = part === "tail" ? TAIL : HEAD;
  const name = beamKeyframeName(id, part);

  return `
@keyframes ${name} {
  0%   { stroke-dashoffset: ${start}; stroke-dasharray: ${dashLen} ${gap}; }
  100% { stroke-dashoffset: ${end};   stroke-dasharray: ${dashLen} ${gap}; }
}`;
}

export interface BeamCSSEntry {
  id: string;
  d: string;
  tailColor: string;
  headColor: string;
  tailKf: string;
  headKf: string;
  duration: number;
  delay: number;
  pl: number;
}

export function computeBeamCSS(
  beams: (BeamPath | StaticPath)[],
  plMap: Map<string, number>,
  isStatic = false,
): BeamCSSEntry[] {
  return beams.map((b) => {
    const pl = plMap.get(b.id) ?? 0;
    const hex = toHex("beamColor" in b ? b.beamColor : b.color);
    return {
      id: b.id,
      d: b.d,
      tailColor: hex,
      headColor: lightenToWhite(hex),
      tailKf: beamKeyframeName(b.id, "tail"),
      headKf: beamKeyframeName(b.id, "head"),
      duration: b.duration,
      delay: b.delay,
      pl,
      ...(isStatic ? {} : {}),
    };
  });
}

export function injectKeyframes(
  beams: (BeamPath | StaticPath)[],
  plMap: Map<string, number>,
): void {
  const css = beams
    .flatMap((b) => {
      const pl = plMap.get(b.id) ?? 0;
      if (pl === 0) return [];
      return [
        buildKeyframes(b.id, pl, "tail"),
        buildKeyframes(b.id, pl, "head"),
      ];
    })
    .join("\n");

  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement("style");
    el.id = STYLE_ID;
    document.head.appendChild(el);
  }
  el.textContent = css;
}

export function removeKeyframes(): void {
  document.getElementById(STYLE_ID)?.remove();
}

export { TAIL, HEAD, HEAD_ADVANCE, MARGIN };
