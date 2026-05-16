"use client";

/**
 * CircuitOverlay v4 — Framer Motion beam overhaul
 *
 * ROOT CAUSE dari glitch di v3:
 *   1. CSS @keyframes injection via styleRef tidak reliable saat re-render (resize).
 *      Browser melanjutkan animasi dari titik tengah siklus karena `animation: none`
 *      + getBoundingClientRect() reflow tidak selalu di-flush sebelum paint berikutnya.
 *   2. 3 path terpisah (tail/core/head) bisa desync — masing-masing punya style element
 *      sendiri yang timing-nya tidak dijamin sinkron.
 *   3. resetPct jump (dashoffset loncat dari end→start) kadang terjadi saat opacity
 *      belum benar-benar 0, menyebabkan "flash" yang terlihat.
 *
 * SOLUSI v4:
 *   - Ganti CSS keyframe injection → Framer Motion (sama seperti TechStackConvergence).
 *   - Manfaatkan posisi "off-path" untuk loop bersih: saat dashoffset di luar
 *     range path (terlalu positif = sebelum path, terlalu negatif = sesudah path),
 *     dash segment tidak terlihat secara alami — TANPA perlu animasi opacity.
 *   - Pada repeatDelay, beam ada di posisi tailEnd (sesudah path) = invisible.
 *   - Saat loop restart, beam langsung lompat ke tailStart (sebelum path) = invisible.
 *   - Tidak ada flash, tidak ada glitch.
 *
 * GRADIENT v4:
 *   - 2 path: tail (warna beam, panjang) + head (warna diputihkan, pendek).
 *   - strokeLinecap="round" → kedua ujung alami taper/lancip.
 *   - Head selalu `headAdvance` px di depan tail → efek comet natural.
 *   - Tidak ada CSS style injection — Framer Motion handle semua timing.
 */

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  RefObject,
} from "react";
import { motion } from "motion/react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Pt = { x: number; y: number };
type Box = { x: number; y: number; w: number; h: number };

interface BeamPath {
  id: string;
  d: string;
  color: string;
  duration: number;
  delay: number;
}

interface StaticPath {
  id: string;
  d: string;
  baseColor: string;
  beamColor: string;
  duration: number;
  delay: number;
}

interface StubTrace {
  id: string;
  d: string;
  endPt: Pt;
  color: string;
}

interface SceneData {
  w: number;
  h: number;
  beams: BeamPath[];
  statics: StaticPath[];
  stubs: StubTrace[];
}

export interface CircuitOverlayProps {
  containerRef: RefObject<HTMLDivElement | null>;
  chipRef: RefObject<HTMLDivElement | null>;
  card1Ref: RefObject<HTMLDivElement | null>;
  card2Ref: RefObject<HTMLDivElement | null>;
  card3Ref: RefObject<HTMLDivElement | null>;
  card4Ref: RefObject<HTMLDivElement | null>;
}

// ─── Geometry helpers ─────────────────────────────────────────────────────────
const f = (n: number) => parseFloat(n.toFixed(2));

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
  const H = 3;
  const V = 3;
  const GAP = 10;

  const midY = b.y + b.h / 2;
  const lrColH = 3 * H + 2 * GAP;
  const lrTopY = midY - lrColH / 2;

  const L = [0, 1, 2].map((i) => ({
    x: f(b.x),
    y: f(lrTopY + i * (H + GAP) + H / 2),
  }));
  const R = [0, 1, 2].map((i) => ({
    x: f(b.x + b.w),
    y: f(lrTopY + i * (H + GAP) + H / 2),
  }));

  const midX = b.x + b.w / 2;
  const tbRowW = 4 * V + 3 * GAP;
  const tbLeftX = midX - tbRowW / 2;

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

// ─── Scene builder ────────────────────────────────────────────────────────────
function buildScene(
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
    // ── DESKTOP ──────────────────────────────────────────────────────────────

    addBeam(
      `M${f(b1.x + b1.w * 0.4)},${b1.y} V${L[2].y} H${L[2].x}`,
      "#c4b5fd",
      2.6,
      0.0,
    );

    addStub(
      `M${L[1].x},${L[1].y} H${f(L[1].x - SH)}`,
      { x: f(L[1].x - SH), y: L[1].y },
      "#a78bfa",
    );

    {
      const mx = f(L[0].x - SH);
      const ey = f(L[0].y - SV);
      addStub(
        `M${L[0].x},${L[0].y} H${mx} V${ey}`,
        { x: mx, y: ey },
        "#818cf8",
      );
    }

    {
      const upY = f(b1.y - 18);
      addBeam(
        `M${f(b1.x + b1.w * 0.52)},${b1.y} V${upY} H${B[1].x} V${B[1].y}`,
        "#8b5cf6",
        2.4,
        0.7,
      );
    }

    {
      const dy = f(B[0].y + SVs * 2);
      const ex = f(B[0].x - SHs);
      addStub(
        `M${B[0].x},${B[0].y} V${dy} H${ex}`,
        { x: ex, y: dy },
        "#7c3aed",
      );
    }

    {
      const aboveChip = f(bCh.y - 22);
      addBeam(
        `M${f(b2.x + b2.w * 0.35)},${b2.y} V${aboveChip} H${T[3].x} V${T[3].y}`,
        "#06b6d4",
        2.8,
        1.4,
      );
    }

    {
      const ex = f(R[0].x + SH);
      addStub(`M${R[0].x},${R[0].y} H${ex}`, { x: ex, y: R[0].y }, "#22d3ee");
    }

    {
      const mx = f(R[2].x + SHs * 1.0);
      const ey = f(R[2].y + SVs * 2);
      addStub(
        `M${R[2].x},${R[2].y} H${mx} V${ey}`,
        { x: mx, y: ey },
        "#06b6d4",
      );
    }

    {
      const ty = f(T[2].y - SVs * 2.1);
      const ex = f(T[2].x + SH * -0.7);
      addStub(
        `M${T[2].x},${T[2].y} V${ty} H${ex}`,
        { x: ex, y: ty },
        "#67e8f9",
      );
    }

    {
      const ey = f(T[0].y - SV * 1.5);
      addStub(`M${T[0].x},${T[0].y} V${ey}`, { x: T[0].x, y: ey }, "#22d3ee");
    }

    {
      const ey = f(T[1].y - SV * 0.6);
      addStub(`M${T[1].x},${T[1].y} V${ey}`, { x: T[1].x, y: ey }, "#a5f3fc");
    }

    {
      addBeam(
        `M${f(b2.x + b2.w * 0.25)},${b2.y} V${R[1].y} H${R[1].x}`,
        "#0891b2",
        2.6,
        2.1,
      );
    }

    {
      const dy = f(B[2].y + SVs * 3);
      const ex = f(B[2].x - SHs * -1.5);
      addStub(
        `M${B[2].x},${B[2].y} V${dy} H${ex}`,
        { x: ex, y: dy },
        "#9f7aea",
      );
    }

    const ey = f(B[3].y + SVs * 2);
    addStub(`M${B[3].x},${B[3].y} V${ey}`, { x: B[3].x, y: ey }, "#0e7490");

    // ── Card-to-Card ─────────────────────────────────────────────────────────
    addStatic(
      `M${f(b4.x + b4.w * 0.62)},${b4.y} V${f(b2.y + b2.h)}`,
      "rgba(251,191,36,0.25)",
      "rgba(251,191,36,0.85)",
      2.5,
      0.3,
    );
    addStatic(
      `M${b3.x},${f(b3.y + b3.h * 0.5)} H${f(b1.x + b1.w)}`,
      "rgba(52,211,153,0.25)",
      "rgba(52,211,153,0.85)",
      2.0,
      1.1,
    );
    addStatic(
      `M${f(b3.x + b3.w * 0.36)},${b3.y} V${f(b2.y + b2.h)}`,
      "rgba(167,139,250,0.25)",
      "rgba(167,139,250,0.85)",
      2.5,
      1.3,
    );
    addStatic(
      `M${b2.x},${f(b2.y + b2.h * 0.5)} H${f(b1.x + b1.w)}`,

      "rgba(34,211,238,0.25)",
      "rgba(34,211,238,0.85)",
      1.8,
      0.5,
    );
  } else {
    // ── MOBILE ───────────────────────────────────────────────────────────────

    {
      const fromX = f(b1.x + 20);
      addBeam(`M${fromX},${b1.y} V${L[2].y} H${L[2].x}`, "#c4b5fd", 2.2, 0.0);
    }

    {
      const ex = f(L[1].x - SH);
      addStub(`M${L[1].x},${L[1].y} H${ex}`, { x: ex, y: L[1].y }, "#a78bfa");
    }

    {
      const mx = f(L[0].x - SH * 1.2);
      const ey = f(L[0].y - SVs);
      addStub(
        `M${L[0].x},${L[0].y} H${mx} V${ey}`,
        { x: mx, y: ey },
        "#818cf8",
      );
    }

    {
      const upY = f(b1.y - 14);
      addBeam(
        `M${f(b1.x + b1.w * 0.48)},${b1.y} V${upY} H${B[1].x} V${B[1].y}`,
        "#8b5cf6",
        2.4,
        0.6,
      );
    }

    {
      const ey = f(B[0].y + SVs * 2);
      addStub(`M${B[0].x},${B[0].y} V${ey}`, { x: B[0].x, y: ey }, "#7c3aed");
    }

    {
      const ey = f(B[2].y + SV * 2);
      addStub(`M${B[2].x},${B[2].y} V${ey}`, { x: B[2].x, y: ey }, "#9f7aea");
    }

    {
      const my = f(B[3].y + SVs * 2);
      const ex = f(B[3].x + SHs * 1.5);
      addStub(
        `M${B[3].x},${B[3].y} V${my} H${ex}`,
        { x: ex, y: my },
        "#6d28d9",
      );
    }

    {
      const beam3Offset = W >= 768 ? 80 : W >= 425 ? 80 : 40;
      const fromX = f(b1.x + b1.w - beam3Offset);
      addBeam(`M${fromX},${b1.y} V${R[0].y} H${R[0].x}`, "#67e8f9", 2.0, 1.2);
    }

    {
      const ex = f(R[1].x + SH);
      addStub(`M${R[1].x},${R[1].y} H${ex}`, { x: ex, y: R[1].y }, "#22d3ee");
    }

    {
      const mx = f(R[2].x + SHs * 1.0);
      const ey = f(R[2].y + SVs * 0.7);
      addStub(
        `M${R[2].x},${R[2].y} H${mx} V${ey}`,
        { x: mx, y: ey },
        "#06b6d4",
      );
    }

    {
      const aboveChip = f(bCh.y - 16);
      addBeam(
        `M${f(b1.x + b1.w * 0.93)},${b1.y} V${aboveChip} H${T[3].x} V${T[3].y}`,
        "#06b6d4",
        2.6,
        1.8,
      );
    }

    {
      const my = f(T[2].y - SV * 1.7);
      const ex = f(T[1].x + 1);
      addStub(
        `M${T[2].x},${T[2].y} V${my} H${ex}`,
        { x: ex, y: my },
        "#a5f3fc",
      );
    }

    {
      const ey = f(T[1].y - SVs * 1);
      addStub(`M${T[1].x},${T[1].y} V${ey}`, { x: T[1].x, y: ey }, "#67e8f9");
    }

    {
      const ey = f(T[0].y - SV * 1.5);
      addStub(`M${T[0].x},${T[0].y} V${ey}`, { x: T[0].x, y: ey }, "#bfdbfe");
    }

    addStatic(
      `M${f(b3.x + b3.w)},${f(b3.y + b3.h * 0.5)} H${b4.x}`,
      "rgba(52,211,153,0.25)",
      "rgba(52,211,153,0.85)",
      2.2,
      0.2,
    );
    addStatic(
      `M${f(b3.x + b3.w * 0.35)},${b3.y} V${f(b2.y + b2.h)}`,
      "rgba(167,139,250,0.25)",
      "rgba(167,139,250,0.85)",
      2.5,
      1.3,
    );
    addStatic(
      `M${f(b4.x + b4.w * 0.65)},${b4.y} V${f(b2.y + b2.h)}`,
      "rgba(251,191,36,0.25)",
      "rgba(251,191,36,0.85)",
      2.5,
      0.6,
    );
    addStatic(
      `M${f(b2.x + b2.w * 0.5)},${f(b2.y + b2.h * 0.5)} V${b1.y + b1.h}`,
      "rgba(34,211,238,0.25)",
      "rgba(34,211,238,0.85)",
      1.8,
      1.2,
    );
  }

  return { w: W, h: H, beams, statics, stubs };
}

// ─── Color helpers ─────────────────────────────────────────────────────────────
function toHex(color: string): string {
  if (color.startsWith("#")) return color;
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (m) {
    return (
      "#" +
      [m[1], m[2], m[3]]
        .map((n) => parseInt(n).toString(16).padStart(2, "0"))
        .join("")
    );
  }
  return color;
}

/**
 * Blend warna beam dengan putih 60% untuk efek "kepala bercahaya".
 * Hasilnya: warna lebih terang/putih, cocok untuk ujung depan comet.
 */
function lightenToWhite(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const blend = (c: number) => Math.round(c + (255 - c) * 0.6);
  return (
    "#" +
    [blend(r), blend(g), blend(b)]
      .map((n) => n.toString(16).padStart(2, "0"))
      .join("")
  );
}

// ─── PulseBeam v4 — Framer Motion, off-path loop, no opacity tricks ────────────
/**
 * Mekanisme loop bersih tanpa glitch:
 *
 * Posisi dashoffset:
 *   tailStart = pl + TAIL + MARGIN  → beam ada SEBELUM path start = tidak terlihat
 *   tailEnd   = -(TAIL + MARGIN)    → beam ada SESUDAH path end   = tidak terlihat
 *
 * Saat repeatDelay (jeda):
 *   Framer Motion mempertahankan nilai terakhir = tailEnd (off-screen). ✓
 *
 * Saat loop restart:
 *   Framer Motion lompat ke nilai awal = tailStart (off-screen). ✓
 *
 * → Tidak ada momen di mana beam terlihat saat "reset". Tidak perlu animasi opacity.
 *
 * Efek gradient:
 *   - Tail path: warna beam, 80px, strokeLinecap="round" → ujung belakang lancip alami
 *   - Head path: warna diputihkan, 22px, headAdvance px di depan → ujung depan bercahaya
 *   - Kedua path bergerak dengan transition identik → selalu sinkron
 *   - Tidak ada desync karena keduanya dikontrol Framer Motion, bukan CSS injection
 */
interface PulseBeamProps {
  d: string;
  color: string;
  duration: number;
  delay: number;
  strokeWidth?: number;
}

function PulseBeam({
  d,
  color,
  duration,
  delay,
  strokeWidth = 3,
}: PulseBeamProps) {
  const measureRef = useRef<SVGPathElement>(null);
  const [pl, setPl] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (measureRef.current) {
      const length = measureRef.current.getTotalLength();
      if (length > 0) {
        setPl(length);
        setReady(true);
      }
    }
  }, [d]);

  // Panjang segmen
  const TAIL = 95; // ekor: panjang, warna beam penuh
  const HEAD = 22; // kepala: pendek, warna diputihkan
  const headAdvance = TAIL - HEAD; // px kepala di depan ujung ekor

  // Margin agar beam betul-betul off-screen di kedua ujung
  const MARGIN = 800;

  // Gap harus lebih besar dari panjang path agar hanya 1 dash terlihat
  const gap = pl + MARGIN * 4 + TAIL + 300;

  // Posisi awal & akhir dashoffset untuk tail
  const tailStart = pl + TAIL + MARGIN; // sebelum path → invisible
  const tailEnd = -(TAIL + MARGIN); //  sesudah path → invisible

  // Head selalu headAdvance px lebih maju dari tail
  const headStart = tailStart - headAdvance;
  const headEnd = tailEnd - headAdvance;

  // Jeda antar pulse (saat beam off-screen)
  const repeatDelay = 0.8;

  const baseTransition = {
    duration,
    delay,
    repeat: Infinity,
    repeatDelay,
    // ease-in-out: beam akselerasi di awal, deselerasi di akhir
    ease: [2, 1.5, 1.6, 1.3] as [number, number, number, number],
  };

  const hexColor = toHex(color);
  const headColor = lightenToWhite(hexColor);

  return (
    <>
      {/* Path tersembunyi untuk mengukur panjang jalur */}
      <path ref={measureRef} d={d} fill="none" stroke="none" strokeWidth={0} />

      {ready && (
        <>
          {/*
           * TAIL — warna beam, lebih panjang, opacity lebih rendah.
           * strokeLinecap="round" → ujung belakang membulat/lancip alami.
           * Mewakili "ekor" yang memudar di belakang.
           */}
          <motion.path
            key={`tail-${d}`}
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.8}
            strokeDasharray={`${TAIL} ${gap}`}
            initial={{ strokeDashoffset: tailStart }}
            animate={{ strokeDashoffset: tailEnd }}
            transition={baseTransition}
          />

          {/*
           * HEAD — warna diputihkan, lebih pendek, di depan tail.
           * Mewakili "kepala" komet yang bercahaya.
           * Karena lebih pendek dari tail tapi headStart < tailStart,
           * kepala selalu berada headAdvance px lebih maju sepanjang path.
           */}
          <motion.path
            key={`head-${d}`}
            d={d}
            fill="none"
            stroke={headColor}
            strokeWidth={strokeWidth * 0.55}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={1}
            strokeDasharray={`${HEAD} ${gap}`}
            initial={{ strokeDashoffset: headStart }}
            animate={{ strokeDashoffset: headEnd }}
            transition={baseTransition}
          />
        </>
      )}
    </>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────
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
    const raf = requestAnimationFrame(() => recalc());
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
  const { w, h, beams, statics, stubs } = scene;

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
      viewBox={`0 0 ${w} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Glow kuat untuk chip beams */}
        <filter
          id="co_glow_beam"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Glow lembut untuk stub traces */}
        <filter id="co_glow_stub" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Layer 1 — Card-to-Card base trace ── */}
      <g>
        {statics.map((s) => (
          <path
            key={`cbase_${s.id}`}
            d={s.d}
            fill="none"
            stroke={s.baseColor}
            strokeWidth={3.5}
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        ))}
      </g>

      {/* ── Layer 2 — Card-to-Card pulse beams ── */}
      <g filter="url(#co_glow_beam)">
        {statics.map((s) => (
          <PulseBeam
            key={`canim_${s.id}`}
            d={s.d}
            color={s.beamColor}
            duration={s.duration}
            delay={s.delay}
            strokeWidth={2.5}
          />
        ))}
      </g>

      {/* ── Layer 3 — Chip beam base underlay ── */}
      <g>
        {beams.map((b) => (
          <path
            key={`bbase_${b.id}`}
            d={b.d}
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth={3.5}
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        ))}
      </g>

      {/* ── Layer 4 — Chip pulse beams (comet, glow kuat) ── */}
      <g filter="url(#co_glow_beam)">
        {beams.map((b) => (
          <PulseBeam
            key={b.id}
            d={b.d}
            color={b.color}
            duration={b.duration}
            delay={b.delay}
            strokeWidth={3}
          />
        ))}
      </g>

      {/* ── Layer 5 — Stub traces + solder pads ── */}
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
            <circle
              cx={s.endPt.x}
              cy={s.endPt.y}
              r={1.2}
              fill="rgba(0,0,0,0.7)"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
