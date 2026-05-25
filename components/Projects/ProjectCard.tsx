/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import TechIcon from "./TechIcon";

interface ProjectCardProps {
  project: Project;
  index: number;
  imageLoaded: boolean;
  onImageLoad: (id: string) => void;
}

export default function ProjectCard({
  project,
  index,
  imageLoaded,
  onImageLoad,
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
    el.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) scale(1.025)`;
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
        {/* Image */}
        <div className="relative w-full aspect-video overflow-hidden bg-zinc-900">
          <div
            className="absolute inset-0 bg-zinc-700/35 animate-pulse"
            style={{
              opacity: imageLoaded ? 0 : 1,
              transition: "opacity 0.45s ease",
            }}
          />
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
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 45%, rgba(18,18,22,0.75) 100%)",
            }}
          />

          <span className="absolute top-2.5 right-2.5 text-[9px] font-mono tracking-[0.15em] text-white/25 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/[0.07] uppercase">
            <MfaBadge />
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
                <span className="flex items-center gap-1 text-[10px] text-white/35 font-mono">
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

function MfaBadge() {
  return (
    <div
      className="flex items-center gap-1.5"
      style={{
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
          <img
            width={16}
            height={16}
            loading="eager"
            alt="MFA logo"
            src="/images/icon.PNG"
            className="w-4 h-4 block"
          />
        </div>
      </div>
      <span className="text-[9px] font-mono tracking-[0.15em] text-white/55">
        MFA
      </span>
    </div>
  );
}
