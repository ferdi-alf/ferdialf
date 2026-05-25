"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpectrumLoader from "@/components/lightswind/SpectrumLoader";

interface DrawerShellProps {
  isOpen: boolean;
  isReady: boolean;
  loadingLabel?: string;
  bgClass?: string;
  children: React.ReactNode;
  scrollRef?: React.RefObject<HTMLDivElement>;
}

export default function DrawerShell({
  isReady,
  loadingLabel = "Loading",
  bgClass = "bg-zinc-950",
  children,
  scrollRef,
}: DrawerShellProps) {
  return (
    <div
      className={`w-[98%] h-full relative ${bgClass} rounded-tr-4xl rounded-tl-4xl overflow-hidden`}
    >
      <AnimatePresence>
        {!isReady && (
          <motion.div
            className={`absolute inset-0 z-50 flex flex-col items-center justify-center ${bgClass} rounded-tr-4xl rounded-tl-4xl`}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <SpectrumLoader
              strokeWidth={2}
              glow
              colors={["#7400ff", "#9b41ff"]}
            />
            <p className="mt-5 text-[10px] font-mono tracking-[0.25em] text-white/20 uppercase">
              {loadingLabel}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        ref={scrollRef}
        className="w-full h-full overflow-auto"
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ WebkitOverflowScrolling: "touch" }}
        onWheel={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </div>
  );
}
