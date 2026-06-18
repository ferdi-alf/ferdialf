"use client";

import { AnimatePresence, motion } from "framer-motion";

interface LoadingScreenProps {
  isVisible: boolean;
  progress: number;
}

export default function LoadingScreen({
  isVisible,
  progress,
}: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-9999 bg-zinc-950 flex items-center justify-center select-none"
          role="progressbar"
          aria-label="Loading portfolio"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(63,63,70,0.5) 1px, transparent 1px)," +
                "linear-gradient(90deg, rgba(63,63,70,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              opacity: 0.35,
            }}
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(9,9,11,0.6) 55%, rgba(9,9,11,0.97) 100%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mb-12 flex flex-col items-center gap-4"
            >
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: 18,
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.025), " +
                    "inset 0 1px 0 rgba(255,255,255,0.07), " +
                    "0 20px 48px rgba(0,0,0,0.6)",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "var(--font-geist-mono, 'Courier New', monospace)",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.72)",
                    letterSpacing: "0.1em",
                  }}
                >
                  MFA
                </span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <span
                  style={{
                    fontFamily: "var(--font-geist-sans, sans-serif)",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.48)",
                    letterSpacing: "0.01em",
                  }}
                >
                  Muhammad Ferdi Alfian
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono, monospace)",
                    fontSize: 9,
                    color: "rgba(255,255,255,0.2)",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                  }}
                >
                  Software Engineer
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              style={{ width: 200 }}
            >
              <div
                style={{
                  height: 1,
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <motion.div
                  style={{
                    height: "100%",
                    borderRadius: 2,
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.65) 100%)",
                    originX: 0,
                  }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>

              <div
                className="flex justify-between mt-2.5"
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: 9,
                  color: "rgba(255,255,255,0.2)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                <span>{progress >= 100 ? "Ready" : "Initializing"}</span>
                <span>{progress}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
