"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BeamGridBackground from "@/components/lightswind/beam-grid-background";
import About from "@/sections/About";
import CareetPath from "@/sections/CareerPath";
import Main from "@/sections/Main";
import { DotBackground } from "@/components/lightswind/grid-dot-backgrounds";

const TOTAL = 3;

// Animasi slide atas-bawah
const variants = {
  enter: (dir: number) => ({
    y: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    y: dir < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const transition = {
  duration: 0.6,
  ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
};

export default function Home() {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const animating = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const navigate = useCallback(
    (next: number) => {
      if (animating.current || next === page || next < 0 || next >= TOTAL)
        return;
      setDir(next > page ? 1 : -1);
      setPage(next);
      animating.current = true;
    },
    [page],
  );

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (animating.current) return;
      const el = sectionRef.current;
      if (!el) return;

      const atTop = el.scrollTop <= 0;
      const atBottom =
        Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight;

      if (e.deltaY > 0 && atBottom) {
        e.preventDefault();
        navigate(page + 1);
      } else if (e.deltaY < 0 && atTop) {
        e.preventDefault();
        navigate(page - 1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [page, navigate]);

  useEffect(() => {
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (animating.current) return;
      const diff = startY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 60) return;
      const el = sectionRef.current;
      const atTop = !el || el.scrollTop <= 0;
      const atBottom =
        !el || Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight;
      if (diff > 0 && atBottom) navigate(page + 1);
      if (diff < 0 && atTop) navigate(page - 1);
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [page, navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") navigate(page + 1);
      if (e.key === "ArrowUp" || e.key === "PageUp") navigate(page - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page, navigate]);

  return (
    <div className="fixed inset-0 bg-zinc-950 overflow-hidden">
      <AnimatePresence custom={dir} mode="wait">
        <motion.div
          key={page}
          ref={sectionRef}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          onAnimationComplete={() => {
            animating.current = false;
          }}
          className="absolute inset-0 overflow-y-auto overflow-x-hidden"
        >
          {page === 0 && (
            <div className="relative h-screen overflow-hidden bg-zinc-950">
              <BeamGridBackground
                gridSize={40}
                gridColor="#3f3f46"
                darkGridColor="#27272a"
                beamColor="rgba(255,255,255,0.55)"
                darkBeamColor="rgba(255,255,255,0.55)"
                beamSpeed={0.7}
                idleSpeed={1.6}
                beamCount={8}
                extraBeamCount={4}
                beamThickness={2}
                beamGlow
                glowIntensity={35}
                interactive={false}
                asBackground
                showFade={false}
                className="bg-zinc-950!"
              />

              <div
                className="absolute inset-0 z-1 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 35%, rgba(9,9,11,0.65) 45%, rgba(9,9,11,0.97) 100%)",
                }}
              />

              <div className="relative z-10 flex items-center justify-center mt-16 h-[calc(100vh-4rem)]">
                <Main />
              </div>
            </div>
          )}

          {page === 1 && (
            <DotBackground
              dotSize={1.5}
              dotColor="#3f3f46"
              darkDotColor="#3f3f46"
              spacing={20}
              showFade={true}
              fadeIntensity={25}
              className="min-h-screen w-full"
            >
              <div className="flex  justify-center items-start min-h-screen px-1.5 sm:py-16 py-5">
                <About />
              </div>
            </DotBackground>
          )}

          {page === 2 && (
            <div className="min-h-screen bg-zinc-950 flex justify-center items-start pt-24 pb-20">
              <CareetPath />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-100 flex flex-col gap-3">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button
            key={i}
            onClick={() => navigate(i)}
            aria-label={`Section ${i + 1}`}
            className={`rounded-full transition-all duration-500 ${
              i === page
                ? "w-1.5 h-7 bg-white"
                : "w-1.5 h-1.5 bg-white/25 hover:bg-white/55"
            }`}
          />
        ))}
      </nav>
    </div>
  );
}
