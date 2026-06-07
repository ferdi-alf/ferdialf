"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Home,
  User,
  BookOpen,
  Cpu,
  FolderOpen,
  Award,
  Mail,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", index: 0, icon: Home },
  { label: "About", index: 1, icon: User },
  { label: "Journey", index: 2, icon: BookOpen },
  { label: "Tech Stack", index: 3, icon: Cpu },
  { label: "Projects", index: 4, icon: FolderOpen },
  { label: "Certifications", index: 5, icon: Award },
  { label: "Contact", index: 6, icon: Mail },
] as const;

interface NavbarProps {
  currentPage: number;
  onNavigate: (index: number) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const targetIndex = hoveredIndex ?? currentPage;
    const el = itemRefs.current[targetIndex];
    const nav = navRef.current;
    if (!el || !nav) return;

    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setPillStyle({
      left: elRect.left - navRect.left,
      width: elRect.width,
    });
  }, [hoveredIndex, currentPage]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigate = (index: number) => {
    onNavigate(index);
    setMenuOpen(false);
  };

  const MobileMenuLine = ({ index }: { index: number }) => (
    <motion.span
      layoutId="mobile-active-line"
      className="absolute left-0 top-0 h-full w-0.5 rounded-full"
      style={{
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.3))",
        opacity: index === currentPage ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
    />
  );

  return (
    <>
      <div
        className="fixed top-2 left-1/2 -translate-x-1/2 z-50 max-w-7xl w-[95%]"
        style={{
          filter:
            "drop-shadow(0 8px 32px rgba(0,0,0,0.55)) drop-shadow(0 2px 6px rgba(0,0,0,0.4))",
        }}
      >
        <div
          style={{
            borderRadius: 18,
            padding: "1px",
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 40%, rgba(0,0,0,0.6) 100%)",
          }}
        >
          <div
            className="text-white backdrop-blur-md"
            style={{
              borderRadius: 17,
              background:
                "linear-gradient(160deg, rgba(55,55,60,0.92) 0%, rgba(20,20,22,0.97) 60%, rgba(10,10,12,0.99) 100%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.14), inset 1px 0 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.5), inset -1px 0 0 rgba(0,0,0,0.35)",
            }}
          >
            <div className="px-3.5 py-2.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 shrink-0">
                <div
                  style={{
                    position: "relative",
                    filter:
                      "drop-shadow(0 4px 12px rgba(0,0,0,0.7)) drop-shadow(0 1px 3px rgba(0,0,0,0.9))",
                  }}
                >
                  <div
                    style={{
                      padding: "1.5px",
                      borderRadius: 10,
                      background:
                        "linear-gradient(145deg, rgba(255,255,255,0.35) 0%, rgba(180,180,180,0.1) 50%, rgba(0,0,0,0.5) 100%)",
                      boxShadow:
                        "0 2px 8px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)",
                    }}
                  >
                    <div
                      style={{
                        borderRadius: 8.5,
                        overflow: "hidden",
                        background: "#0a0a0a",
                        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.8)",
                      }}
                    >
                      <Image
                        width={200}
                        height={200}
                        loading="eager"
                        alt="Muhammad Ferdi Alfian - Logo"
                        src="/images/icon.PNG"
                        className="w-9 h-9 block"
                        style={{ display: "block" }}
                      />
                    </div>
                  </div>
                </div>

                <span
                  className="text-[13px] font-semibold"
                  style={{
                    color: "rgba(200, 200, 200, 0.92)",
                    letterSpacing: "0.02em",
                    textShadow: "0 1px 8px rgba(255,255,255,0.05)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  Muhammad Ferdi Alfian
                </span>
              </div>

              <nav
                ref={navRef}
                className="hidden md:flex items-center relative"
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  className="absolute top-0 h-full rounded-lg pointer-events-none"
                  animate={{
                    left: pillStyle.left,
                    width: pillStyle.width,
                    opacity: pillStyle.width > 0 ? 1 : 0,
                  }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 400, damping: 35 }
                  }
                  style={{
                    background:
                      hoveredIndex !== null
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(255,255,255,0.08)",
                  }}
                />

                <motion.div
                  className="absolute bottom-0 h-px rounded-full pointer-events-none"
                  animate={{
                    left: pillStyle.left + pillStyle.width * 0.15,
                    width: pillStyle.width * 0.7,
                    opacity: pillStyle.width > 0 ? 1 : 0,
                  }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 400, damping: 35 }
                  }
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                  }}
                />

                {NAV_ITEMS.map((item, i) => (
                  <button
                    key={item.index}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    onClick={() => handleNavigate(item.index)}
                    onMouseEnter={() => setHoveredIndex(i)}
                    className="relative px-4 py-2 text-[12.5px] font-medium tracking-wide transition-colors duration-200 rounded-lg cursor-pointer"
                    style={{
                      color:
                        currentPage === item.index
                          ? "rgba(255,255,255,0.92)"
                          : "rgba(255,255,255,0.38)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <button
                className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 rounded-lg cursor-pointer shrink-0 transition-colors"
                style={{
                  background: menuOpen
                    ? "rgba(255,255,255,0.08)"
                    : "transparent",
                }}
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={
                    menuOpen
                      ? { rotate: 45, y: 7, width: "18px" }
                      : { rotate: 0, y: 0, width: "18px" }
                  }
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="block h-px rounded-full origin-center"
                  style={{ background: "rgba(255,255,255,0.7)", width: 18 }}
                />
                <motion.span
                  animate={
                    menuOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }
                  }
                  transition={{ duration: 0.2 }}
                  className="block h-px rounded-full"
                  style={{ background: "rgba(255,255,255,0.4)", width: 12 }}
                />
                <motion.span
                  animate={
                    menuOpen
                      ? { rotate: -45, y: -7, width: "18px" }
                      : { rotate: 0, y: 0, width: "14px" }
                  }
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="block h-px rounded-full origin-center"
                  style={{ background: "rgba(255,255,255,0.7)" }}
                />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scaleY: 0.92 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.92 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: "top center" }}
              className="mt-1.5 md:hidden overflow-hidden"
            >
              <div
                style={{
                  borderRadius: 16,
                  padding: "1px",
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 40%, rgba(0,0,0,0.5) 100%)",
                  filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.6))",
                }}
              >
                <div
                  className="backdrop-blur-xl"
                  style={{
                    borderRadius: 15,
                    background:
                      "linear-gradient(160deg, rgba(40,40,44,0.97) 0%, rgba(15,15,17,0.99) 100%)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.4)",
                  }}
                >
                  <div className="py-2 px-2">
                    {NAV_ITEMS.map((item, i) => (
                      <motion.button
                        key={item.index}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.22 }}
                        onClick={() => handleNavigate(item.index)}
                        className="relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 cursor-pointer overflow-hidden"
                        style={{
                          background:
                            currentPage === item.index
                              ? "rgba(255,255,255,0.06)"
                              : "transparent",
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <MobileMenuLine index={item.index} />

                        <item.icon
                          size={15}
                          style={{
                            color:
                              currentPage === item.index
                                ? "rgba(255,255,255,0.7)"
                                : "rgba(255,255,255,0.2)",
                            flexShrink: 0,
                            strokeWidth: 1.5,
                          }}
                        />

                        <span
                          className="text-sm font-medium tracking-wide"
                          style={{
                            color:
                              currentPage === item.index
                                ? "rgba(255,255,255,0.88)"
                                : "rgba(255,255,255,0.35)",
                          }}
                        >
                          {item.label}
                        </span>

                        {currentPage === item.index && (
                          <motion.span
                            layoutId="mobile-active-dot"
                            className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.4))",
                            }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              background: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(2px)",
            }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
