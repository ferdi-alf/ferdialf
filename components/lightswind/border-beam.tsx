/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useMemo } from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  transition?: any;
  className?: string;
  style?: React.CSSProperties;
  reverse?: boolean;
  initialOffset?: number;
  borderThickness?: number;
  opacity?: number;
  glowIntensity?: number;
  beamBorderRadius?: number;
  pauseOnHover?: boolean;
  speedMultiplier?: number;
}

export const BorderBeam = ({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#7400ff",
  colorTo = "#9b41ff",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderThickness = 1,
  opacity = 1,
  glowIntensity = 0,
  beamBorderRadius,
  pauseOnHover = false,
  speedMultiplier = 1,
}: BorderBeamProps) => {
  const actualDuration = speedMultiplier
    ? duration / speedMultiplier
    : duration;

  const glowEffect =
    glowIntensity > 0
      ? `0 0 ${glowIntensity * 5}px ${glowIntensity * 2}px var(--color-from)`
      : undefined;

  // Memoize style object to avoid new reference on every render.
  // Adds will-change + translateZ(0) to promote a GPU compositing layer
  // on Safari iOS before the first animation frame, preventing the
  // mid-animation layer-promotion stall that causes first-frame jank.
  const beamStyle = useMemo(
    () =>
      ({
        width: size,
        offsetPath: `rect(0 auto auto 0 round ${beamBorderRadius ?? size}px)`,
        "--color-from": colorFrom,
        "--color-to": colorTo,
        opacity,
        boxShadow: glowEffect,
        borderRadius: beamBorderRadius ? `${beamBorderRadius}px` : undefined,
        willChange: "transform, opacity",
        transform: "translateZ(0)",
        ...style,
      }) as React.CSSProperties,
    [size, beamBorderRadius, colorFrom, colorTo, opacity, glowEffect, style],
  );

  // Memoize animate object — Framer Motion uses referential equality to
  // decide whether to restart/re-diff the animation. A new object every
  // render triggers an unnecessary reconciler walk even when values are
  // identical, adding JS overhead per render on the mobile main thread.
  const animateProps = useMemo(
    () => ({
      offsetDistance: reverse
        ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
        : [`${initialOffset}%`, `${100 + initialOffset}%`],
    }),
    [reverse, initialOffset],
  );

  // Memoize transition object for the same reason.
  const transitionProps = useMemo(
    () => ({
      repeat: Infinity,
      ease: "linear" as const,
      duration: actualDuration,
      delay: -delay,
      ...transition,
    }),
    [actualDuration, delay, transition],
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] 
    border border-transparent [mask-clip:padding-box,border-box] 
    mask-intersect mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
    >
      <motion.div
        className={cn(
          "absolute aspect-square",
          "bg-linear-to-l from-(--color-from) via-(--color-to) to-transparent",
          pauseOnHover && "group-hover:animation-play-state-paused",
          className,
        )}
        style={beamStyle}
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={animateProps}
        transition={transitionProps}
      />
    </div>
  );
};
