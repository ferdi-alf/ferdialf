"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@/types/project";
import SpectrumLoader from "./lightswind/SpectrumLoader";
import LineWaves from "./LineWaves";
import {
  _React,
  Laravel,
  MaterialUi,
  Go,
  Postgresql,
  Html5,
  Css3,
  Javascript,
  Leaflet,
  NextjsIcon,
  TailwindIcon,
  TypescriptIcon,
  AlpinejsIcon,
  ReactQueryIcon,
} from "@dev.icons/react";
import ShinyText from "./ui/ShinyText";
import Image from "next/image";

const TECH_ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  NextJS: NextjsIcon,
  React: _React,
  TypeScript: TypescriptIcon,
  Tailwind: TailwindIcon,
  Laravel: Laravel,
  "Alpine.js": AlpinejsIcon,
  MUI: MaterialUi,
  Go: Go,
  PostgreSQL: Postgresql,
  HTML: Html5,
  CSS: Css3,
  JavaScript: Javascript,
  Leaflet: Leaflet,
  "TanStack Query": ReactQueryIcon,
};

function TechIcon({ tech }: { tech: string }) {
  const Icon = TECH_ICON_MAP[tech];

  if (!Icon) {
    return (
      <span className="inline-flex items-center text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-white/35 border border-white/[0.07] font-mono tracking-wide">
        {tech}
      </span>
    );
  }

  return <Icon className="w-6 h-6 opacity-75" />;
}

function SkeletonCard() {
  return (
    <div
      className="rounded-xl overflow-hidden border border-white/4"
      style={{
        background:
          "linear-gradient(160deg, rgba(39,39,42,0.6) 0%, rgba(24,24,27,0.8) 100%)",
      }}
    >
      <div className="w-full aspect-video bg-zinc-800/60 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-3.5 bg-zinc-700/40 rounded-full w-3/5 animate-pulse" />
        <div className="h-2.5 bg-zinc-700/30 rounded-full w-full animate-pulse" />
        <div className="h-2.5 bg-zinc-700/30 rounded-full w-4/5 animate-pulse" />
        <div className="flex gap-2 pt-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full bg-zinc-700/40 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onImageLoad: (id: string) => void;
  imageLoaded: boolean;
}

function ProjectCard({
  project,
  index,
  onImageLoad,
  imageLoaded,
}: ProjectCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const hasLink = !!(project.liveUrl || project.githubUrl);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    el.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${
      -y * 7
    }deg) scale(1.025)`;
  };

  const handleMouseLeave = () => {
    if (wrapperRef.current) {
      wrapperRef.current.style.transform =
        "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
    }
    setIsHovered(false);
  };

  const handleClick = () => {
    const url = project.liveUrl || project.githubUrl;
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index < 10 ? index * 0.05 : (index - 10) * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        onClick={handleClick}
        className={`relative rounded-xl overflow-hidden select-none ${
          hasLink ? "cursor-pointer" : "cursor-default"
        }`}
        style={{
          background:
            "linear-gradient(160deg, rgba(39,39,42,0.75) 0%, rgba(24,24,27,0.95) 100%)",
          border: `1px solid ${
            isHovered ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.05)"
          }`,
          boxShadow: isHovered
            ? "0 24px 64px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.09)"
            : "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
          transition:
            "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
        }}
      >
        <div className="relative w-full aspect-video overflow-hidden bg-zinc-900">
          <div
            className="absolute inset-0 bg-zinc-700/35 animate-pulse"
            style={{
              opacity: imageLoaded ? 0 : 1,
              transition: "opacity 0.45s ease",
            }}
          />

          {/* Actual image */}
          <img
            src={project.image}
            alt={project.title}
            loading={index < 2 ? "eager" : "lazy"}
            onLoad={() => onImageLoad(project.id)}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: imageLoaded ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          />

          {/* Bottom gradient on image */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 45%, rgba(18,18,22,0.75) 100%)",
            }}
          />

          <span className="absolute top-2.5 right-2.5 text-[9px] font-mono tracking-[0.15em] text-white/25 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/[0.07] uppercase">
            <div
              className="flex items-center gap-1.5"
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
                    className="w-4 h-4 block"
                    style={{ display: "block" }}
                  />
                </div>
              </div>
              <span className="text-[9px] font-mono tracking-[0.15em] text-white/55">
                MFA
              </span>
            </div>
          </span>
        </div>

        <div className="p-4">
          <h3 className="text-[13px] font-semibold text-white/85 leading-snug mb-1.5 tracking-tight">
            {project.title}
          </h3>
          <p className="text-[11px] text-white/35 leading-relaxed line-clamp-2 mb-3">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-1.5">
            {project.techStack.map((tech) => (
              <TechIcon key={tech} tech={tech} />
            ))}
          </div>

          {(project.liveUrl || project.githubUrl) && (
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/5">
              {project.liveUrl && (
                <span className="flex items-center gap-1 text-[10px] text-white/35 font-mono group-hover:text-white/60 transition-colors">
                  <ExternalLink size={10} />
                  Preview
                </span>
              )}
              {project.githubUrl && (
                <span className="flex items-center gap-1 text-[10px] text-white/35 font-mono">
                  <Github size={10} />
                  GitHub
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsDrawerContent({ isOpen }: { isOpen: boolean }) {
  const [lineWavesReady, setLineWavesReady] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const sentinelRef = useRef<HTMLDivElement>(null);

  const { projects, loading, error, hasMore, fetchMore } = useProjects(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => setLineWavesReady(true), 700);
    return () => clearTimeout(t);
  }, [isOpen]);

  const isReady =
    lineWavesReady &&
    projects.length >= 2 &&
    projects.slice(0, 2).every((p) => loadedImages.has(p.id));

  useEffect(() => {
    if (!isReady) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) fetchMore();
      },
      { rootMargin: "120px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isReady, fetchMore, loading]);

  const handleImageLoad = useCallback((id: string) => {
    setLoadedImages((prev) => new Set([...prev, id]));
  }, []);

  return (
    <div className="w-[98%] h-full relative  bg-zinc-950 rounded-tr-4xl rounded-tl-4xl overflow-hidden">
      <AnimatePresence>
        {!isReady && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 rounded-tr-4xl rounded-tl-4xl"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <SpectrumLoader
              strokeWidth={2}
              glow
              colors={["#7400ff", "#9b41ff"]}
            />
            <p className="mt-5 text-[10px] font-mono tracking-[0.25em] text-white/20 uppercase">
              Loading works
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="w-full h-full overflow-auto"
        onWheel={(e) => e.stopPropagation()}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="relative min-h-[75vh] flex flex-col overflow-hidden">
          <div className="absolute inset-0 z-0">
            <LineWaves
              speed={0.5}
              innerLineCount={32}
              outerLineCount={31}
              warpIntensity={0.1}
              rotation={-58}
              edgeFadeWidth={0.3}
              colorCycleSpeed={1}
              brightness={0.3}
              color1="#464646"
              color2="#262626"
              color3="#9b9b9b"
              enableMouseInteraction
              mouseInfluence={0.5}
            />
          </div>

          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(
                to bottom,
                rgba(9,9,11,0.25) 0%,
                rgba(9,9,11,0.50) 45%,
                rgba(9,9,11,0.75) 75%,
                rgb(24,24,27) 100%
              )`,
            }}
          />

          <div
            className="relative z-20 flex flex-col items-center justify-center flex-1 text-center px-6 py-20"
            style={{
              textShadow:
                "0 2px 24px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.8)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 20 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col items-center gap-4"
            >
              <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/55 uppercase font-mono">
                <span className="w-5 h-px bg-white/25" />
                Portofolio
                <span className="w-5 h-px bg-white/25" />
              </span>

              <h2 className="text-3xl md:text-5xl  font-bold tracking-tight leading-[1.1]">
                <span className="text-white/88">Crafted with</span>{" "}
                <ShinyText text="Precision." />
              </h2>

              <p className="text-sm text-white/65 max-w-md leading-relaxed">
                A curated selection of real-world projects — each built,
                shipped, and refined for production. Not all works are publicly
                listed or open source; some remain private by client agreement.
              </p>

              <div className="mt-8 flex flex-col items-center gap-1.5 text-white/45">
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

        <div className="bg-zinc-900 px-4 md:px-8 pb-20 pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 max-w-7xl mx-auto">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onImageLoad={handleImageLoad}
                imageLoaded={loadedImages.has(project.id)}
              />
            ))}

            {loading &&
              Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={`sk-${i}`} />
              ))}
          </div>

          <div ref={sentinelRef} className="h-2 mt-6" />

          {!hasMore && projects.length > 0 && (
            <p className="text-center text-white/15 text-[10px] font-mono tracking-[0.2em] uppercase mt-4">
              — End of works —
            </p>
          )}

          {error && (
            <p className="text-center text-red-400/50 text-xs mt-6 font-mono">
              {error}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
