/* eslint-disable react-hooks/set-state-in-effect */
"use client";

/**
 * useAppReady
 * -----------
 * Orchestrates the loading screen lifecycle.
 *
 * What it does while the loading screen is visible:
 *   1. Waits for web fonts (document.fonts.ready)
 *   2. Preloads every critical image so they render instantly
 *   3. Enforces a minimum display time (2 s) so the animation completes
 *
 * Session caching strategy:
 *   • sessionStorage  → persists across refreshes within the same tab session
 *   • back/forward nav detection → skip loader when user presses the browser Back button
 *   → Net effect: loader shows once per session, never on refresh or Back
 */

import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "mfa-portfolio-v1";
const MIN_MS = 2000; // minimum loader display time (ms)

const CRITICAL_IMAGES: string[] = [
  "/images/avatar.webp",
  "/images/icon.webp",
  "/images/og-image.webp",
  "/images/certificates/1.webp",
  "/images/certificates/2.webp",
  "/images/certificates/5.webp",
  "/images/projects/1.webp",
  "/images/projects/2.webp",
  "/images/projects/3.webp",
  "/images/projects/4.webp",
  "/images/projects/5.webp",
  "/images/projects/6.webp",
  "/images/projects/7.webp",
  "/images/projects/8.webp",
  "/images/projects/9.webp",
];

export interface AppReadyReturn {
  isReady: boolean;

  skipLoader: boolean;
  /** 0–100, for the progress bar inside the loading screen. */
  progress: number;
}

export function useAppReady(): AppReadyReturn {
  const [isReady, setIsReady] = useState(false);
  const [skipLoader, setSkipLoader] = useState(false);
  const [progress, setProgress] = useState(0);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    // ── 1. Decide whether to skip the loader entirely ──────────────────
    const shouldSkip = (): boolean => {
      try {
        if (sessionStorage.getItem(SESSION_KEY) === "1") return true;

        const nav = performance.getEntriesByType?.("navigation")?.[0] as
          | PerformanceNavigationTiming
          | undefined;
        if (nav?.type === "back_forward") return true;
      } catch {
        return true;
      }
      return false;
    };

    if (shouldSkip()) {
      setProgress(100);
      setSkipLoader(true);
      setIsReady(true);
      return;
    }

    let done = 0;
    const total = CRITICAL_IMAGES.length + 2;

    const tick = () => {
      done += 1;
      setProgress(Math.min(97, Math.round((done / total) * 100)));
    };

    const tasks: Promise<void>[] = [
      document.fonts.ready.then(() => tick()).catch(() => tick()),

      new Promise<void>((res) =>
        setTimeout(() => {
          tick();
          res();
        }, MIN_MS),
      ),

      ...CRITICAL_IMAGES.map(
        (src) =>
          new Promise<void>((res) => {
            const img = new Image();
            img.onload = img.onerror = () => {
              tick();
              res();
            };
            img.src = src;
          }),
      ),
    ];

    Promise.all(tasks).then(() => {
      setProgress(100);
      setTimeout(() => {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {}
        setIsReady(true);
      }, 380); // brief pause at 100 % before page reveal
    });
  }, []);

  return { isReady, skipLoader, progress };
}
