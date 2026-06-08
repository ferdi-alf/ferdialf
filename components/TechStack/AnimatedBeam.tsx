"use client";

import { useId, useEffect, useState } from "react";
import { motion } from "motion/react";
import { AnimatedBeamProps } from "@/types/tect-stack";

export const AnimatedBeam = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 8,
  delay = 0,
  pathColor = "rgba(255,255,255,0.06)",
  pathWidth = 1.5,
  gradientStartColor = "#00f0ff",
  gradientStopColor = "#0066ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const gradientCoordinates = reverse
    ? {
        x1: ["120%", "-20%"],
        x2: ["100%", "0%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }
    : {
        x1: ["-20%", "120%"],
        x2: ["0%", "100%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      };

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const rectA = fromRef.current.getBoundingClientRect();
      const rectB = toRef.current.getBoundingClientRect();

      setSvgDimensions({
        width: containerRect.width,
        height: containerRect.height,
      });

      const startX =
        rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
      const startY =
        rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
      const endX =
        rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
      const endY =
        rectB.top - containerRect.top + rectB.height / 2 + endYOffset;
      const controlY = startY - curvature;

      setPathD(
        `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`,
      );
    };

    const ro = new ResizeObserver(updatePath);
    if (containerRef.current) ro.observe(containerRef.current);
    updatePath();
    return () => ro.disconnect();
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      className="pointer-events-none absolute top-0 left-0"
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={1}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        stroke={`url(#${id})`}
        strokeWidth={pathWidth + 1.5}
        strokeOpacity={1}
        strokeLinecap="round"
        style={{ filter: "blur(3px)" }}
      />
      <defs>
        <motion.linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 1.2,
          }}
        >
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="20%" stopColor={gradientStartColor} stopOpacity="0.8" />
          <stop offset="50%" stopColor={gradientStopColor} stopOpacity="1" />
          <stop offset="80%" stopColor={gradientStopColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
};
