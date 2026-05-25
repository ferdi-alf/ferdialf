"use client";

import * as React from "react";
import { motion } from "framer-motion";
import ShinyText from "@/components/ui/ShinyText";

interface DrawerHeroProps {
  isReady: boolean;
  eyebrow: string;
  titlePlain: string;
  titleShiny: string;
  subtitle: string;
  background: React.ReactNode;
  gradientOverride?: string;
}

const DEFAULT_GRADIENT = `linear-gradient(
  to bottom,
  rgba(9,9,11,0.25) 0%,
  rgba(9,9,11,0.50) 45%,
  rgba(9,9,11,0.75) 75%,
  rgb(24,24,27) 100%
)`;

export default function DrawerHero({
  isReady,
  eyebrow,
  titlePlain,
  titleShiny,
  subtitle,
  background,
  gradientOverride,
}: DrawerHeroProps) {
  return (
    <div className="relative min-h-[55vh] flex flex-col overflow-hidden">
      {/* Background visual */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {background}
      </div>

      {/* Gradient scrim */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: gradientOverride ?? DEFAULT_GRADIENT }}
      />

      {/* Text content */}
      <div
        className="relative z-20 flex flex-col items-center justify-center flex-1 text-center px-6 py-16"
        style={{
          textShadow: "0 2px 24px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.8)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 20 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/30 uppercase font-mono">
            <span className="w-5 h-px bg-white/15" />
            {eyebrow}
            <span className="w-5 h-px bg-white/15" />
          </span>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]">
            <span className="text-white/90">{titlePlain}</span>{" "}
            <ShinyText text={titleShiny} />
          </h2>

          {/* Subtitle */}
          <p className="text-sm text-white/35 max-w-md leading-relaxed">
            {subtitle}
          </p>

          {/* Scroll cue */}
          <div className="mt-4 flex flex-col items-center gap-1 text-white/15">
            <p className="text-[9px] font-mono tracking-[0.25em] uppercase">
              Scroll to explore
            </p>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "easeInOut",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="opacity-40"
              >
                <path
                  d="M8 3v10M4 9l4 4 4-4"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
