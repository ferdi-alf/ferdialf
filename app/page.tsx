"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BeamGridBackground from "@/components/lightswind/beam-grid-background";
import About from "@/sections/About";
import Main from "@/sections/Main";
import { DotBackground } from "@/components/lightswind/grid-dot-backgrounds";
import Journey from "@/sections/Journey";
import TechStackConvergence from "@/sections/TechStack";
import ProjectsSection from "@/sections/Projects";
import InteractiveGridBackground from "@/components/lightswind/interactive-grid-background";
import StripesBackground from "@/components/lightswind/stripes-background";
import CertificationsSection from "@/sections/Certifications";
import ContactFooter from "@/sections/Contact";
import { prefetchAbout } from "@/hooks/useAbout";
import Navbar from "@/components/Navbar";
import { DrawerContext } from "@/context/DrawerContext";

const TOTAL = 7;
const COOLDOWN_MS = 600;

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
  duration: 0.45,
  ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
};

export default function Home() {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const animating = useRef(false);
  const cooldownUntil = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const drawerOpenRef = useRef(false);

  useEffect(() => {
    prefetchAbout();
  }, []);

  const navigate = useCallback(
    (next: number) => {
      if (animating.current) return;
      if (Date.now() < cooldownUntil.current) return;
      if (next === page || next < 0 || next >= TOTAL) return;

      setDir(next > page ? 1 : -1);
      setPage(next);
      animating.current = true;
    },
    [page],
  );

  const handleAnimationComplete = useCallback(() => {
    animating.current = false;
    cooldownUntil.current = Date.now() + COOLDOWN_MS;
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (animating.current) return;
      if (Date.now() < cooldownUntil.current) return;
      if (drawerOpenRef.current) return;

      const el = sectionRef.current;
      if (!el) return;

      const BOUNDARY_TOLERANCE = 4;
      const atBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - BOUNDARY_TOLERANCE;
      const atTop = el.scrollTop <= BOUNDARY_TOLERANCE;

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
    let startTime = 0;
    let startTarget: EventTarget | null = null;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startTime = Date.now();
      startTarget = e.target;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (animating.current) return;
      if (Date.now() < cooldownUntil.current) return;
      if (drawerOpenRef.current) return;

      const target = (startTarget || e.target) as HTMLElement;
      const interactiveTag = target.closest(
        "input, textarea, button, select, [role='button'], [data-no-swipe]",
      );
      if (interactiveTag) return;

      const endY = e.changedTouches[0].clientY;
      const diff = startY - endY;
      const elapsed = Math.max(Date.now() - startTime, 1);
      const velocity = Math.abs(diff) / elapsed;

      const el = sectionRef.current;
      const BOUNDARY_TOLERANCE = 4;
      const atTop = !el || el.scrollTop <= BOUNDARY_TOLERANCE;
      const atBottom =
        !el ||
        el.scrollTop + el.clientHeight >= el.scrollHeight - BOUNDARY_TOLERANCE;

      const isQuickFlick = velocity > 0.4;
      const threshold = isQuickFlick ? 30 : 45;

      if (Math.abs(diff) < threshold) return;

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
      if (Date.now() < cooldownUntil.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") navigate(page + 1);
      if (e.key === "ArrowUp" || e.key === "PageUp") navigate(page - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page, navigate]);

  return (
    <DrawerContext.Provider
      value={{
        setDrawerOpen: (open) => {
          drawerOpenRef.current = open;
        },
      }}
    >
      <div className="fixed inset-0 bg-zinc-950 overflow-hidden">
        <Navbar currentPage={page} onNavigate={navigate} />

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
            onAnimationComplete={handleAnimationComplete}
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
                <div className="relative z-10 flex items-center justify-center mt-2 md:mt-14 h-[calc(100vh-4rem)]">
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
                <div className="flex justify-center items-start min-h-screen px-1.5 sm:py-16 py-5">
                  <About />
                </div>
              </DotBackground>
            )}

            {page === 2 && (
              <div className="min-h-screen bg-zinc-950 flex justify-center items-start pt-24 pb-20">
                <Journey containerRef={sectionRef} />
              </div>
            )}

            {page === 3 && (
              <div className="min-h-screen bg-zinc-950 w-full flex justify-center items-start pt-20 pb-20">
                <TechStackConvergence />
              </div>
            )}
            {page === 4 && (
              <InteractiveGridBackground
                gridSize={40}
                gridColor="#d1d5db"
                darkGridColor="#1f2937"
                effectColor="rgba(255,255,255,0.15)"
                darkEffectColor="rgba(255,255,255,0.15)"
                trailLength={5}
                glow
                glowRadius={30}
                showFade
                fadeIntensity={1}
                idleSpeed={0.05}
                idleRandomCount={2}
                className="bg-zinc-950!"
              >
                <div className="min-h-screen w-full flex justify-center items-start pt-20 pb-20">
                  <ProjectsSection />
                </div>
              </InteractiveGridBackground>
            )}

            {page === 5 && (
              <div className="relative min-h-screen bg-zinc-950 overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <StripesBackground
                    position="right"
                    width="w-full "
                    height="h-full"
                    opacity="opacity-30 lg:opacity-50"
                  />
                </div>
                <div
                  className="absolute inset-0 z-1 pointer-events-none"
                  style={{
                    background: `
                      radial-gradient(ellipse at 50% 40%, transparent 15%, rgba(9,9,11,0.72) 55%, rgba(9,9,11,0.97) 100%),
                      linear-gradient(to bottom, rgba(9,9,11,0.6) 0%, transparent 15%, transparent 85%, rgba(9,9,11,0.85) 100%),
                      linear-gradient(to left, transparent 50%, rgba(9,9,11,0.5) 100%)
                    `,
                  }}
                />
                <div className="relative z-10">
                  <CertificationsSection />
                </div>
              </div>
            )}
            {page === 6 && (
              <div className="min-h-screen bg-zinc-950 w-full flex justify-center items-start pt-20 pb-20">
                <ContactFooter onNavigate={navigate} />
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
    </DrawerContext.Provider>
  );
}
