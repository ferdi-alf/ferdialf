"use client";

/**
 * app/page.tsx — Home
 * -------------------
 * Changes from original (design/animations/layout untouched):
 *
 *  1. LOADING SCREEN
 *     • useAppReady() orchestrates fonts + images + 2 s min time
 *     • <LoadingScreen> renders above content while loading
 *     • Page content renders BEHIND the loader (ready when curtain lifts)
 *     • sessionStorage cache: loader skips on refresh / back-nav
 *
 *  2. SEO / AI CRAWLING
 *     • <SeoContentLayer> — always in DOM, positioned at left:-9999px
 *     • Not display:none (crawlers skip that); position offset is indexed
 *       by Google, Bing, ChatGPT, Gemini, Claude, Perplexity
 *     • aria-hidden="true" → screen readers use the visible animated sections
 *     • Content mirrors JSON-LD in layout.tsx for consistency
 *
 *  3. MOBILE EXPERIENCE
 *     • Rubber-band effect: useMotionValue + touchmove listener
 *       → tactile resistance feedback when swiping at section boundaries
 *     • iOS-like easing [0.22, 1, 0.36, 1] on mobile vs [0.76, 0, 0.24, 1] desktop
 *     • Shorter duration: 0.38 s mobile vs 0.45 s desktop
 *     • More sensitive thresholds: 20/38 px (was 30/45) and velocity 0.3 (was 0.4)
 *     • Reduced cooldown: 380 ms mobile vs 600 ms desktop
 *     • overscrollBehavior:"none" + willChange:"transform" on section div
 *     • -webkit-overflow-scrolling: touch for smooth momentum inside sections
 */

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  animate,
} from "framer-motion";

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
import { useAppReady } from "@/hooks/Useappready ";
import LoadingScreen from "@/components/LoadingScreen";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const TOTAL = 7;

/**
 * Desktop: strong deceleration — same as original.
 * Mobile:  iOS spring-like — feels natural with finger momentum.
 */
const DESKTOP_EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];
const MOBILE_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const DESKTOP_TRANSITION = { duration: 0.45, ease: DESKTOP_EASE };
const MOBILE_TRANSITION = { duration: 0.38, ease: MOBILE_EASE };

const COOLDOWN_DESKTOP = 600; // ms between navigations on desktop
const COOLDOWN_MOBILE = 380; // ms on mobile — feels snappier

// ─────────────────────────────────────────────────────────────────────────────
// Animation variants — unchanged from original
// ─────────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────
// SEO hidden content layer
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Renders the entire site's textual content in a visually-hidden container.
 *
 * Technique: position:absolute; left:-9999px; width:1px; height:auto
 * • NOT display:none → crawlers DO index it
 * • NOT visibility:hidden → same issue
 * • aria-hidden="true" → screen readers skip it (they use the animated sections)
 *
 * This ensures Google, Bing, and every major AI crawler (ChatGPT, Gemini,
 * Claude, Perplexity) can read all sections without needing to scroll.
 */
function SeoContentLayer() {
  return (
    <div
      style={{
        position: "absolute",
        left: "-9999px",
        top: 0,
        width: 1,
        height: "auto",
        overflow: "hidden",
      }}
      aria-hidden="true"
      tabIndex={-1}
    >
      <main>
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section>
          <h1>Muhammad Ferdi Alfian | Software Engineer</h1>
          <p>Hi, My name is Muhammad Ferdi Alfian</p>
          <p>
            Turning Ideas Into Interactive Realities Through Precision and
            Purpose
          </p>
          <p>
            Muhammad Ferdi Alfian is a Software Engineer from Palembang,
            Indonesia, available for freelance projects worldwide. Specialized
            in Next.js, React, TypeScript, Laravel, and Golang.
          </p>
        </section>

        {/* ── About ─────────────────────────────────────────────────────── */}
        <section>
          <h2>About Muhammad Ferdi Alfian</h2>
          <p>
            Muhammad Ferdi Alfian is a Software Engineer from Palembang,
            Indonesia, currently studying Software Engineering at SMKN 4
            Palembang (2023–2026). He has been working as a freelance full-stack
            developer since 2023, delivering 20+ projects to clients.
          </p>
          <p>
            He specializes in building modern web applications with Next.js,
            React, Laravel, TypeScript, and Golang, with a focus on performant
            UIs and scalable backend architectures.
          </p>
          <p>
            Award-winning developer: 1st Place at VALTER 2025 (Web Design &amp;
            Development, Politeknik Negeri Sriwijaya) and 1st Runner-Up at the
            Digital Technology Innovation competition in South Sumatra (Dinas
            Pendidikan Sumatera Selatan).
          </p>
        </section>

        {/* ── Journey ───────────────────────────────────────────────────── */}
        <section>
          <h2>Journey &amp; Experience</h2>
          <ul>
            <li>
              <strong>2023 – Present:</strong> Freelance Full-Stack Developer —
              20+ web application projects delivered for international and
              domestic clients via Fiverr, Upwork, and Freelancer.com.
            </li>
            <li>
              <strong>2023 – 2026:</strong> Software Engineering student at SMKN
              4 Palembang, South Sumatra, Indonesia.
            </li>
            <li>
              <strong>2025:</strong> 1st Place — Web Design &amp; Development
              Competition, VALTER 2025, Politeknik Negeri Sriwijaya.
            </li>
            <li>
              <strong>2024:</strong> 1st Runner-Up — Digital Technology
              Innovation Competition, South Sumatra.
            </li>
          </ul>
        </section>

        {/* ── Tech Stack ────────────────────────────────────────────────── */}
        <section>
          <h2>Tech Stack &amp; Skills</h2>
          <ul>
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Laravel",
              "Golang",
              "Inertia.js",
              "Tailwind CSS",
              "Node.js",
              "PostgreSQL",
              "TanStack Query",
              "REST API",
              "Full-Stack Web Development",
              "Frontend Development",
              "Backend Development",
              "Web Performance Optimization",
              "UI/UX Implementation",
              "Decision Support Systems",
              "Learning Management Systems",
            ].map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>

        {/* ── Projects ──────────────────────────────────────────────────── */}
        <section>
          <h2>Projects by Muhammad Ferdi Alfian</h2>
          <article>
            <h3>Unfold Table</h3>
            <p>
              Headless table component for deeply nested data with on-demand
              fetching, smart caching, server-side pagination, and collapsible
              row groups. Built with TypeScript, Next.js, and Tailwind CSS.
            </p>
            <a href="https://github.com/ferdi-alf/unfold-table">
              GitHub: unfold-table
            </a>
          </article>
          <article>
            <h3>Smart Online Exams</h3>
            <p>
              High-performance examination platform with real-time academic
              integrity detection and a Go-powered backend for sub-millisecond
              response. Built with Next.js, TypeScript, Go, and PostgreSQL.
            </p>
            <a href="https://github.com/ferdi-alf/web-ujian-nextjs">
              GitHub: web-ujian-nextjs
            </a>
          </article>
          <article>
            <h3>VALTER 2025 — 1st Place Competition Entry</h3>
            <p>
              1st-place competition entry for VALTER 2025 at Politeknik Negeri
              Sriwijaya — a polished, performance-focused web design showcase.
              Built with Next.js, TypeScript, and Tailwind CSS.
            </p>
            <a href="https://valter-2025-co-volution.vercel.app/">Live demo</a>
            <a href="https://github.com/ferdi-alf/valter-2025-co-volution">
              GitHub: valter-2025-co-volution
            </a>
          </article>
        </section>

        {/* ── Certifications ────────────────────────────────────────────── */}
        <section>
          <h2>Certifications &amp; Credentials (11 total)</h2>
          <ul>
            <li>
              Software Engineer Certification — HackerRank (ID: F42333D4C421)
            </li>
            <li>
              Full Stack Developer with Bun, Hono &amp; React TypeScript —
              Santricoding (ID: SK-V8UTAW8JDW7RYRG)
            </li>
            <li>
              AWS Educate: Introduction to Cloud 101 — Amazon Web Services
            </li>
            <li>SOLID Programming Principles — Dicoding (ID: L4PQ2WNG2ZO1)</li>
            <li>
              1st Place — Web Design &amp; Development, VALTER 2025, Politeknik
              Negeri Sriwijaya
            </li>
            <li>
              1st Runner-Up — Digital Technology Innovation, South Sumatra
              (Dinas Pendidikan Sumatera Selatan)
            </li>
          </ul>
        </section>

        {/* ── Contact ───────────────────────────────────────────────────── */}
        <section>
          <h2>Contact Muhammad Ferdi Alfian</h2>
          <address>
            <p>
              Email:{" "}
              <a href="mailto:ferdialf.dev@gmail.com">ferdialf.dev@gmail.com</a>
            </p>
            <p>Phone: +62 881 0802 88925</p>
            <p>Location: Palembang, South Sumatra, Indonesia</p>
          </address>
          <nav aria-label="Social and freelance profiles">
            <a href="https://github.com/ferdi-alf" rel="me noopener noreferrer">
              GitHub: ferdi-alf
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-ferdi-alfian-979273396"
              rel="me noopener noreferrer"
            >
              LinkedIn: Muhammad Ferdi Alfian
            </a>
            <a
              href="https://www.instagram.com/eternalferr_"
              rel="me noopener noreferrer"
            >
              Instagram: eternalferr_
            </a>
            <a
              href="https://www.fiverr.com/ferdialf_dev"
              rel="noopener noreferrer"
            >
              Fiverr: ferdialf_dev — available for freelance
            </a>
            <a
              href="https://www.upwork.com/freelancers/~010945969eb89d66ab"
              rel="noopener noreferrer"
            >
              Upwork: Muhammad Ferdi Alfian — full-stack developer
            </a>
            <a
              href="https://www.freelancer.com/u/Ferdialfian80"
              rel="noopener noreferrer"
            >
              Freelancer.com: Ferdialfian80
            </a>
          </nav>
        </section>
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Home page
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  // ── State & refs ──────────────────────────────────────────────────────────
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const animating = useRef(false);
  const cooldownUntil = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const drawerOpenRef = useRef(false);
  const touchStartYRef = useRef(0);
  const touchStartTimeRef = useRef(0);
  const touchStartTargetRef = useRef<EventTarget | null>(null);

  /**
   * rubberOffset: the Y displacement applied to the rubber-band wrapper.
   * When the user swipes at a section boundary, this gives tactile resistance
   * feedback — the section "pulls back" slightly, then springs to zero.
   */
  const rubberOffset = useMotionValue(0);

  // ── Loading orchestration ──────────────────────────────────────────────
  const { isReady, skipLoader, progress } = useAppReady();

  // ── Mobile detection ───────────────────────────────────────────────────
  useEffect(() => {
    const check = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0,
      );
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Derived animation config ───────────────────────────────────────────
  const transitionConfig = useMemo(
    () => (isMobile ? MOBILE_TRANSITION : DESKTOP_TRANSITION),
    [isMobile],
  );

  // ── Data prefetch (fires during loading screen; data is warm when needed) ─
  useEffect(() => {
    prefetchAbout();
    /**
     * Add prefetch calls for other sections here as they become available.
     * Example:
     *   prefetchJourney();
     *   prefetchProjects();
     *   prefetchCertifications();
     */
  }, []);

  // ── Navigate ───────────────────────────────────────────────────────────
  const navigate = useCallback(
    (next: number) => {
      // Reset rubber-band instantly before AnimatePresence takes over
      rubberOffset.set(0);

      if (animating.current) return;
      if (Date.now() < cooldownUntil.current) return;
      if (next === page || next < 0 || next >= TOTAL) return;

      setDir(next > page ? 1 : -1);
      setPage(next);
      animating.current = true;
    },
    [page, rubberOffset],
  );

  const handleAnimationComplete = useCallback(() => {
    animating.current = false;
    cooldownUntil.current =
      Date.now() + (isMobile ? COOLDOWN_MOBILE : COOLDOWN_DESKTOP);
  }, [isMobile]);

  // ── Wheel ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (animating.current) return;
      if (Date.now() < cooldownUntil.current) return;
      if (drawerOpenRef.current) return;

      const el = sectionRef.current;
      if (!el) return;

      const TOLERANCE = 4;
      const atBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - TOLERANCE;
      const atTop = el.scrollTop <= TOLERANCE;

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

  // ── Touch ──────────────────────────────────────────────────────────────
  useEffect(() => {
    // Record start position
    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
      touchStartTimeRef.current = Date.now();
      touchStartTargetRef.current = e.target;
    };

    /**
     * Real-time rubber-band feedback while the user is swiping.
     * Only activates when the section is at its scroll boundary.
     */
    const onTouchMove = (e: TouchEvent) => {
      if (animating.current || drawerOpenRef.current) return;

      const el = sectionRef.current;
      if (!el) return;

      const diff = touchStartYRef.current - e.touches[0].clientY;
      const TOLERANCE = 4;
      const atBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - TOLERANCE;
      const atTop = el.scrollTop <= TOLERANCE;

      if ((diff > 0 && atBottom) || (diff < 0 && atTop)) {
        // Apply resistance — exponential decay so it never feels jarring
        const RESISTANCE = 0.18;
        const MAX_DRAG = 55; // px
        const rubber =
          Math.sign(diff) * Math.min(Math.abs(diff) * RESISTANCE, MAX_DRAG);
        rubberOffset.set(-rubber);
      }
    };

    /**
     * On finger lift:
     *   1. Spring rubber-band back to 0
     *   2. Check if swipe threshold was met → navigate
     *
     * Thresholds (more sensitive than original for better mobile feel):
     *   Quick flick (velocity > 0.3):  20 px  (was 30)
     *   Slow deliberate swipe:         38 px  (was 45)
     */
    const onTouchEnd = (e: TouchEvent) => {
      // Always spring rubber-band back first (no await — runs in parallel)
      animate(rubberOffset, 0, {
        type: "spring",
        stiffness: 480,
        damping: 38,
      });

      if (animating.current) return;
      if (Date.now() < cooldownUntil.current) return;
      if (drawerOpenRef.current) return;

      // Ignore swipes that started on interactive elements
      const target = (touchStartTargetRef.current || e.target) as HTMLElement;
      const interactive = target.closest(
        "input, textarea, button, select, [role='button'], [data-no-swipe]",
      );
      if (interactive) return;

      const endY = e.changedTouches[0].clientY;
      const diff = touchStartYRef.current - endY;
      const elapsed = Math.max(Date.now() - touchStartTimeRef.current, 1);
      const velocity = Math.abs(diff) / elapsed;

      const el = sectionRef.current;
      const TOLERANCE = 4;
      const atTop = !el || el.scrollTop <= TOLERANCE;
      const atBottom =
        !el || el.scrollTop + el.clientHeight >= el.scrollHeight - TOLERANCE;

      const isQuickFlick = velocity > 0.3; // was 0.4
      const threshold = isQuickFlick ? 20 : 38; // was 30 / 45

      if (Math.abs(diff) < threshold) return;

      if (diff > 0 && atBottom) navigate(page + 1);
      if (diff < 0 && atTop) navigate(page - 1);
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [page, navigate, rubberOffset]);

  // ── Keyboard ───────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (Date.now() < cooldownUntil.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") navigate(page + 1);
      if (e.key === "ArrowUp" || e.key === "PageUp") navigate(page - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page, navigate]);

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <DrawerContext.Provider
      value={{
        setDrawerOpen: (open) => {
          drawerOpenRef.current = open;
        },
      }}
    >
      {/* ── Loading screen (renders above everything) ───────────────────
          Skipped entirely on refresh / back-nav (sessionStorage cache).
          Page content renders BEHIND it so it's fully ready when it exits. */}
      {!skipLoader && (
        <LoadingScreen isVisible={!isReady} progress={progress} />
      )}

      {/* ── SEO content layer ───────────────────────────────────────────
          Positioned off-screen (not display:none) so AI crawlers index it.
          aria-hidden prevents duplicate content for screen readers. */}
      <SeoContentLayer />

      {/* ── Main interactive shell ──────────────────────────────────────
          Fades in once loading is complete (no fade if skipLoader is true). */}
      <div
        className="fixed inset-0 bg-zinc-950 overflow-hidden"
        style={
          skipLoader
            ? undefined
            : {
                opacity: isReady ? 1 : 0,
                transition: "opacity 0.5s ease 0.1s",
              }
        }
      >
        <Navbar currentPage={page} onNavigate={navigate} />

        {/* ── Rubber-band wrapper ─────────────────────────────────────────
            Provides tactile resistance when the user swipes at a section
            boundary. Wraps AnimatePresence so it doesn't conflict with
            the enter/exit Y transforms. */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ y: rubberOffset }}
        >
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={page}
              ref={sectionRef}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transitionConfig}
              onAnimationComplete={handleAnimationComplete}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden"
              style={{
                // Smooth momentum scrolling inside sections on iOS
                WebkitOverflowScrolling: "touch",
                // Prevent browser pull-to-refresh / overscroll bounce
                // from interfering with section navigation
                overscrollBehavior: "none",
                // Hint to browser: promote to GPU layer for cheaper transforms
                willChange: "transform",
              }}
            >
              {/* ── Section 0: Hero ─────────────────────────────────── */}
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

              {/* ── Section 1: About ────────────────────────────────── */}
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

              {/* ── Section 2: Journey ──────────────────────────────── */}
              {page === 2 && (
                <div className="min-h-screen bg-zinc-950 flex justify-center items-start pt-24 pb-20">
                  <Journey containerRef={sectionRef} />
                </div>
              )}

              {/* ── Section 3: Tech Stack ───────────────────────────── */}
              {page === 3 && (
                <div className="min-h-screen bg-zinc-950 w-full flex justify-center items-start pt-20 pb-20">
                  <TechStackConvergence />
                </div>
              )}

              {/* ── Section 4: Projects ─────────────────────────────── */}
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

              {/* ── Section 5: Certifications ───────────────────────── */}
              {page === 5 && (
                <div className="relative min-h-screen bg-zinc-950 overflow-hidden">
                  <div className="absolute inset-0 z-0">
                    <StripesBackground
                      position="right"
                      width="w-full"
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

              {/* ── Section 6: Contact ──────────────────────────────── */}
              {page === 6 && (
                <div className="min-h-screen bg-zinc-950 w-full flex justify-center items-start pt-20 pb-20">
                  <ContactFooter onNavigate={navigate} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Section indicator dots ──────────────────────────────────── */}
        <nav
          className="fixed right-5 top-1/2 -translate-y-1/2 z-100 flex flex-col gap-3"
          aria-label="Section navigation"
        >
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button
              key={i}
              onClick={() => navigate(i)}
              aria-label={`Go to section ${i + 1}`}
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
