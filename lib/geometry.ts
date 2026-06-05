import type {
  Pt,
  SceneData,
  BeamPath,
  StaticPath,
  StubTrace,
} from "@/types/about";

type Box = { x: number; y: number; w: number; h: number };

export const f = (n: number) => parseFloat(n.toFixed(2));

function box(el: Element, base: DOMRect): Box {
  const r = el.getBoundingClientRect();
  return {
    x: f(r.left - base.left),
    y: f(r.top - base.top),
    w: f(r.width),
    h: f(r.height),
  };
}

function getPins(b: Box) {
  const H = 3,
    V = 3,
    GAP = 10;
  const midY = b.y + b.h / 2;
  const lrTopY = midY - (3 * H + 2 * GAP) / 2;

  const L = [0, 1, 2].map((i) => ({
    x: f(b.x),
    y: f(lrTopY + i * (H + GAP) + H / 2),
  }));
  const R = [0, 1, 2].map((i) => ({
    x: f(b.x + b.w),
    y: f(lrTopY + i * (H + GAP) + H / 2),
  }));

  const midX = b.x + b.w / 2;
  const tbLeftX = midX - (4 * V + 3 * GAP) / 2;
  const T = [0, 1, 2, 3].map((i) => ({
    x: f(tbLeftX + i * (V + GAP) + V / 2),
    y: f(b.y),
  }));
  const B = [0, 1, 2, 3].map((i) => ({
    x: f(tbLeftX + i * (V + GAP) + V / 2),
    y: f(b.y + b.h),
  }));

  return { L, R, T, B };
}

export function buildScene(
  container: HTMLDivElement,
  chip: HTMLDivElement,
  c1: HTMLDivElement,
  c2: HTMLDivElement,
  c3: HTMLDivElement,
  c4: HTMLDivElement,
): SceneData {
  const base = container.getBoundingClientRect();
  const W = f(base.width);
  const H = f(base.height);
  const mob = W < 1024;

  const bCh = box(chip, base);
  const b1 = box(c1, base);
  const b2 = box(c2, base);
  const b3 = box(c3, base);
  const b4 = box(c4, base);
  const { L, R, T, B } = getPins(bCh);

  const beams: BeamPath[] = [];
  const statics: StaticPath[] = [];
  const stubs: StubTrace[] = [];
  let bid = 0,
    sid = 0,
    tid = 0;

  const addBeam = (d: string, color: string, dur: number, delay: number) =>
    beams.push({ id: `b${bid++}`, d, color, duration: dur, delay });
  const addStatic = (
    d: string,
    baseColor: string,
    beamColor: string,
    dur: number,
    delay: number,
  ) =>
    statics.push({
      id: `s${sid++}`,
      d,
      baseColor,
      beamColor,
      duration: dur,
      delay,
    });

  const addStub = (d: string, end: Pt, color: string) =>
    stubs.push({ id: `t${tid++}`, d, endPt: end, color });

  const SH = mob ? 14 : 22;
  const SV = mob ? 13 : 20;
  const SHs = mob ? 10 : 15;
  const SVs = mob ? 9 : 12;

  if (!mob) {
    addBeam(
      `M${f(b1.x + b1.w * 0.4)},${b1.y} V${L[2].y} H${L[2].x}`,
      "#c4b5fd",
      5.6,
      0.0,
    );
    addStub(
      `M${L[1].x},${L[1].y} H${f(L[1].x - SH)}`,
      { x: f(L[1].x - SH), y: L[1].y },
      "#a78bfa",
    );
    addStub(
      `M${L[0].x},${L[0].y} H${f(L[0].x - SH)} V${f(L[0].y - SV)}`,
      { x: f(L[0].x - SH), y: f(L[0].y - SV) },
      "#818cf8",
    );
    addBeam(
      `M${f(b1.x + b1.w * 0.52)},${b1.y} V${f(b1.y - 18)} H${B[1].x} V${B[1].y}`,
      "#8b5cf6",
      5.4,
      0.7,
    );
    addStub(
      `M${B[0].x},${B[0].y} V${f(B[0].y + SVs * 2)} H${f(B[0].x - SHs)}`,
      { x: f(B[0].x - SHs), y: f(B[0].y + SVs * 2) },
      "#7c3aed",
    );
    addBeam(
      `M${f(b2.x + b2.w * 0.35)},${b2.y} V${f(bCh.y - 22)} H${T[3].x} V${T[3].y}`,
      "#06b6d4",
      5.8,
      1.4,
    );
    addStub(
      `M${R[0].x},${R[0].y} H${f(R[0].x + SH)}`,
      { x: f(R[0].x + SH), y: R[0].y },
      "#22d3ee",
    );
    addStub(
      `M${R[2].x},${R[2].y} H${f(R[2].x + SHs)} V${f(R[2].y + SVs * 2)}`,
      { x: f(R[2].x + SHs), y: f(R[2].y + SVs * 2) },
      "#06b6d4",
    );
    addStub(
      `M${T[2].x},${T[2].y} V${f(T[2].y - SVs * 2.1)} H${f(T[2].x - SH * 0.7)}`,
      { x: f(T[2].x - SH * 0.7), y: f(T[2].y - SVs * 2.1) },
      "#67e8f9",
    );
    addStub(
      `M${T[0].x},${T[0].y} V${f(T[0].y - SV * 1.5)}`,
      { x: T[0].x, y: f(T[0].y - SV * 1.5) },
      "#22d3ee",
    );
    addStub(
      `M${T[1].x},${T[1].y} V${f(T[1].y - SV * 0.6)}`,
      { x: T[1].x, y: f(T[1].y - SV * 0.6) },
      "#a5f3fc",
    );
    addBeam(
      `M${f(b2.x + b2.w * 0.25)},${b2.y} V${R[1].y} H${R[1].x}`,
      "#0891b2",
      5.6,
      2.1,
    );
    addStub(
      `M${B[2].x},${B[2].y} V${f(B[2].y + SVs * 3)} H${f(B[2].x + SHs * 1.5)}`,
      { x: f(B[2].x + SHs * 1.5), y: f(B[2].y + SVs * 3) },
      "#9f7aea",
    );
    addStub(
      `M${B[3].x},${B[3].y} V${f(B[3].y + SVs * 2)}`,
      { x: B[3].x, y: f(B[3].y + SVs * 2) },
      "#0e7490",
    );
    addStatic(
      `M${f(b4.x + b4.w * 0.62)},${b4.y} V${f(b2.y + b2.h)}`,
      "rgba(251,191,36,0.25)",
      "rgba(251,191,36,0.85)",
      5.5,
      0.3,
    );
    addStatic(
      `M${b3.x},${f(b3.y + b3.h * 0.5)} H${f(b1.x + b1.w)}`,
      "rgba(52,211,153,0.25)",
      "rgba(52,211,153,0.85)",
      5.0,
      1.1,
    );
    addStatic(
      `M${f(b3.x + b3.w * 0.36)},${b3.y} V${f(b2.y + b2.h)}`,
      "rgba(167,139,250,0.25)",
      "rgba(167,139,250,0.85)",
      5.5,
      1.3,
    );
    addStatic(
      `M${b2.x},${f(b2.y + b2.h * 0.5)} H${f(b1.x + b1.w)}`,
      "rgba(34,211,238,0.25)",
      "rgba(34,211,238,0.85)",
      2.8,
      0.5,
    );
  } else {
    addBeam(
      `M${f(b1.x + 20)},${b1.y} V${L[2].y} H${L[2].x}`,
      "#c4b5fd",
      5.2,
      0.0,
    );
    addStub(
      `M${L[1].x},${L[1].y} H${f(L[1].x - SH)}`,
      { x: f(L[1].x - SH), y: L[1].y },
      "#a78bfa",
    );
    addStub(
      `M${L[0].x},${L[0].y} H${f(L[0].x - SH * 1.2)} V${f(L[0].y - SVs)}`,
      { x: f(L[0].x - SH * 1.2), y: f(L[0].y - SVs) },
      "#818cf8",
    );
    addBeam(
      `M${f(b1.x + b1.w * 0.48)},${b1.y} V${f(b1.y - 14)} H${B[1].x} V${B[1].y}`,
      "#8b5cf6",
      5.4,
      0.6,
    );
    addStub(
      `M${B[0].x},${B[0].y} V${f(B[0].y + SVs * 2)}`,
      { x: B[0].x, y: f(B[0].y + SVs * 2) },
      "#7c3aed",
    );
    addStub(
      `M${B[2].x},${B[2].y} V${f(B[2].y + SV * 2)}`,
      { x: B[2].x, y: f(B[2].y + SV * 2) },
      "#9f7aea",
    );
    addStub(
      `M${B[3].x},${B[3].y} V${f(B[3].y + SVs * 2)} H${f(B[3].x + SHs * 1.5)}`,
      { x: f(B[3].x + SHs * 1.5), y: f(B[3].y + SVs * 2) },
      "#6d28d9",
    );
    const beam3Offset = W >= 768 ? 80 : W >= 425 ? 80 : 40;
    addBeam(
      `M${f(b1.x + b1.w - beam3Offset)},${b1.y} V${R[0].y} H${R[0].x}`,
      "#67e8f9",
      5.0,
      1.2,
    );
    addStub(
      `M${R[1].x},${R[1].y} H${f(R[1].x + SH)}`,
      { x: f(R[1].x + SH), y: R[1].y },
      "#22d3ee",
    );
    addStub(
      `M${R[2].x},${R[2].y} H${f(R[2].x + SHs)} V${f(R[2].y + SVs * 0.7)}`,
      { x: f(R[2].x + SHs), y: f(R[2].y + SVs * 0.7) },
      "#06b6d4",
    );
    addBeam(
      `M${f(b1.x + b1.w * 0.93)},${b1.y} V${f(bCh.y - 16)} H${T[3].x} V${T[3].y}`,
      "#06b6d4",
      5.6,
      1.8,
    );
    addStub(
      `M${T[2].x},${T[2].y} V${f(T[2].y - SV * 1.7)} H${f(T[1].x + 1)}`,
      { x: f(T[1].x + 1), y: f(T[2].y - SV * 1.7) },
      "#a5f3fc",
    );
    addStub(
      `M${T[1].x},${T[1].y} V${f(T[1].y - SVs)}`,
      { x: T[1].x, y: f(T[1].y - SVs) },
      "#67e8f9",
    );
    addStub(
      `M${T[0].x},${T[0].y} V${f(T[0].y - SV * 1.5)}`,
      { x: T[0].x, y: f(T[0].y - SV * 1.5) },
      "#bfdbfe",
    );
    addStatic(
      `M${f(b3.x + b3.w)},${f(b3.y + b3.h * 0.5)} H${b4.x}`,
      "rgba(52,211,153,0.25)",
      "rgba(52,211,153,0.85)",
      5.2,
      0.2,
    );
    addStatic(
      `M${f(b3.x + b3.w * 0.35)},${b3.y} V${f(b2.y + b2.h)}`,
      "rgba(167,139,250,0.25)",
      "rgba(167,139,250,0.85)",
      5.5,
      1.3,
    );
    addStatic(
      `M${f(b4.x + b4.w * 0.65)},${b4.y} V${f(b2.y + b2.h)}`,
      "rgba(251,191,36,0.25)",
      "rgba(251,191,36,0.85)",
      5.5,
      0.6,
    );
    addStatic(
      `M${f(b2.x + b2.w * 0.5)},${f(b2.y + b2.h * 0.5)} V${b1.y + b1.h}`,
      "rgba(34,211,238,0.25)",
      "rgba(34,211,238,0.85)",
      4.8,
      1.2,
    );
  }

  return { w: W, h: H, beams, statics, stubs };
}
