"use client";

import { OrbitRingProps } from "@/types/tect-stack";
import { motion } from "motion/react";

export const OrbitRing = ({
  radius,
  duration,
  reverse = false,
  color = "#00d4ff",
  opacity = 0.4,
  dotSize = 3,
  children,
}: OrbitRingProps) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div
      style={{
        width: radius * 2,
        height: radius * 2,
        borderRadius: "50%",
        border: `1px solid ${color}`,
        opacity: opacity * 0.4,
        position: "absolute",
      }}
    />
    <motion.div
      style={{ width: radius * 2, height: radius * 2, position: "absolute" }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 6px 2px ${color}`,
        }}
      />
      {children}
    </motion.div>
  </div>
);
