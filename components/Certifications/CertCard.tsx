import { Certificate } from "@/types/certificate";
import { motion } from "framer-motion";
import { Award, BadgeCheck, Users } from "lucide-react";
import React, { memo, useRef, useState } from "react";

const CATEGORY_CONFIG = {
  award: { label: "Award", Icon: Award },
  certification: { label: "Certification", Icon: BadgeCheck },
  participation: { label: "Participation", Icon: Users },
} as const;

interface CertCardProps {
  cert: Certificate;
  index: number;
  onOpenModal: (cert: Certificate) => void;
  onImageLoad?: () => void;
}

const CertCard = memo(function CertCard({
  cert,
  index,
  onOpenModal,
  onImageLoad,
}: CertCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cfg = CATEGORY_CONFIG[cert.category];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    el.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`;
    el.style.borderColor = "rgba(255,255,255,0.09)";
    el.style.boxShadow =
      "0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)";
  };

  const handleMouseLeave = () => {
    const el = wrapperRef.current;
    if (!el) return;
    el.style.transform =
      "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
    el.style.borderColor = "rgba(255,255,255,0.05)";
    el.style.boxShadow =
      "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)";
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    onImageLoad?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpenModal(cert)}
        className="rounded-xl overflow-hidden cursor-pointer select-none"
        style={{
          background:
            "linear-gradient(160deg, rgba(39,39,42,0.75) 0%, rgba(24,24,27,0.95) 100%)",
          border: "1px solid rgba(255,255,255,0.05)",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
          transition:
            "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
          willChange: "transform",
        }}
      >
        <div className="px-3.5 pt-3 pb-1">
          <span className="inline-flex items-center gap-1 text-[9px] text-white/35 font-mono tracking-[0.12em] uppercase">
            <cfg.Icon size={8} className="text-white/30" />
            {cfg.label}
          </span>
        </div>
        <div className="relative mx-3 rounded-lg overflow-hidden aspect-4/3 bg-zinc-900">
          <div
            className="absolute inset-0 bg-zinc-800/50 animate-pulse"
            style={{
              opacity: imageLoaded ? 0 : 1,
              transition: "opacity 0.4s ease",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cert.image}
            alt={cert.title}
            loading={index < 4 ? "eager" : "lazy"}
            onLoad={handleImageLoad}
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: imageLoaded ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 55%, rgba(18,18,22,0.6) 100%)",
            }}
          />
          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-black/50 backdrop-blur-sm border border-white/[0.07] flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1v6M6 9.5v1"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <div className="p-3.5 pt-2.5">
          <h3 className="text-[11px] font-semibold text-white/80 leading-snug mb-1 line-clamp-2">
            {cert.title}
          </h3>
          <p className="text-[10px] text-white/38 truncate">{cert.issuer}</p>
          {cert.credentialId && (
            <p className="text-[9px] font-mono text-white/28 mt-1 truncate tracking-wide">
              {cert.credentialId}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
});
export default CertCard;
