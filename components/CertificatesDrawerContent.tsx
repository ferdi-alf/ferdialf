/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useCallback, useEffect, useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, BadgeCheck, Users } from "lucide-react";
import { useCertificates } from "@/hooks/useCertificates";
import { Certificate } from "@/types/certificate";
import SpectrumLoader from "./lightswind/SpectrumLoader";
import LightPillar from "./LightPillar";
import { createPortal } from "react-dom";
import { ShineButton } from "@/components/lightswind/shine-button";

const CATEGORY_CONFIG = {
  award: { label: "Award", Icon: Award },
  certification: { label: "Certification", Icon: BadgeCheck },
  participation: { label: "Participation", Icon: Users },
} as const;

// ─── Skeleton ──────────────────────────────────────────────────────────────────
function SkeletonCertCard() {
  return (
    <div
      className="rounded-xl overflow-hidden border border-white/4"
      style={{
        background:
          "linear-gradient(160deg,rgba(39,39,42,0.6)0%,rgba(24,24,27,0.8)100%)",
      }}
    >
      <div className="w-full aspect-4/3 bg-zinc-800/50 animate-pulse" />
      <div className="p-3.5 space-y-2">
        <div className="h-3 bg-zinc-700/40 rounded-full w-4/5 animate-pulse" />
        <div className="h-2.5 bg-zinc-700/30 rounded-full w-2/3 animate-pulse" />
      </div>
    </div>
  );
}

// ─── Modal (via createPortal → renders to document.body) ──────────────────────
function CertModal({
  cert,
  onClose,
}: {
  cert: Certificate;
  onClose: () => void;
}) {
  const cfg = CATEGORY_CONFIG[cert.category];
  const hasLink = !!cert.redirectUrl;

  // ESC key to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // FIX TS: redirectUrl is string | null, window.open expects string | URL | undefined
  const handleVerify = () => {
    if (hasLink && cert.redirectUrl) {
      window.open(cert.redirectUrl, "_blank", "noopener,noreferrer");
    }
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      // FIX BACKDROP: pointer-events:all ensures this layer truly captures ALL
      // clicks and never lets them fall through to cards beneath the modal.
      // We stop propagation on the inner card so only clicks on the bare
      // backdrop reach this handler and trigger onClose.
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        // Critical: make sure the entire fixed layer intercepts pointer events
        pointerEvents: "all",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.72)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ scale: 0.91, opacity: 0, y: 22 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 8 }}
        transition={{ duration: 0.26, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "32rem",
          borderRadius: "1rem",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          background:
            "linear-gradient(160deg,rgba(39,39,42,0.88)0%,rgba(24,24,27,0.98)100%)",
          boxShadow:
            "0 32px 96px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.07)",
          pointerEvents: "all",
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            zIndex: 10,
            width: "2rem",
            height: "2rem",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.09)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.15)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.07)";
          }}
        >
          <X size={14} style={{ color: "rgba(255,255,255,0.6)" }} />
        </button>

        <div
          className="mb-1.5"
          style={{ padding: "1.125rem 1.125rem 0.375rem" }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              fontSize: "0.6875rem",
              color: "rgba(255,255,255,0.38)",
              fontFamily: "monospace",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            <cfg.Icon size={10} style={{ color: "rgba(255,255,255,0.32)" }} />
            {cfg.label}
          </span>
        </div>

        <div
          style={{
            position: "relative",
            margin: "0 1rem",
            borderRadius: "0.625rem",
            overflow: "hidden",
            aspectRatio: "4/3",
            background: "#18181b",
          }}
        >
          <img
            src={cert.image}
            alt={cert.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "linear-gradient(to bottom,transparent 55%,rgba(18,18,22,0.55)100%)",
            }}
          />
        </div>

        <div style={{ padding: "0.875rem 1.125rem 0.5rem" }}>
          <h3
            style={{
              fontSize: "0.9375rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.4,
              marginBottom: "0.35rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {cert.title}
          </h3>
          <p
            className="text-white/38"
            style={{
              fontSize: "0.8125rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {cert.issuer}
          </p>
          {cert.credentialId && (
            <p
              className="text-white/28"
              style={{
                fontSize: "0.6875rem",
                fontFamily: "monospace",
                marginTop: "0.3rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                letterSpacing: "0.06em",
              }}
            >
              {cert.credentialId}
            </p>
          )}
        </div>

        <div style={{ padding: "0.5rem 1.125rem 1.125rem" }}>
          <ShineButton
            label="View Credential"
            size="sm"
            disabled={!hasLink}
            bgColor="linear-gradient(325deg, hsl(0 0% 18%) 0%, hsl(0 0% 32%) 50%, hsl(0 0% 14%) 100%)"
            onClick={handleVerify}
          />
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

// ─── CertCard ─────────────────────────────────────────────────────────────────
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
      "0 20px 60px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.08)";
  };

  const handleMouseLeave = () => {
    const el = wrapperRef.current;
    if (!el) return;
    el.style.transform =
      "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
    el.style.borderColor = "rgba(255,255,255,0.05)";
    el.style.boxShadow =
      "0 4px 20px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.04)";
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    onImageLoad?.();
  };

  const handleClick = () => onOpenModal(cert);

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
        onClick={handleClick}
        className="rounded-xl overflow-hidden cursor-pointer select-none"
        style={{
          background:
            "linear-gradient(160deg,rgba(39,39,42,0.75)0%,rgba(24,24,27,0.95)100%)",
          border: "1px solid rgba(255,255,255,0.05)",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.04)",
          transition:
            "transform 0.18s ease,box-shadow 0.18s ease,border-color 0.18s ease",
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
                "linear-gradient(to bottom,transparent 55%,rgba(18,18,22,0.6)100%)",
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

// ─── Main drawer content ───────────────────────────────────────────────────────
export default function CertificatesDrawerContent({
  isOpen,
}: {
  isOpen: boolean;
}) {
  const [pillarReady, setPillarReady] = useState(false);
  const [firstTwoLoaded, setFirstTwoLoaded] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const loadedCountRef = useRef(0);
  const fetchingRef = useRef(false);

  const { certs, loading, error, hasMore, fetchMore } = useCertificates(isOpen);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setPillarReady(false);
        setFirstTwoLoaded(false);
        setSelectedCert(null);
      }, 0);
      loadedCountRef.current = 0;
      fetchingRef.current = false;
      return;
    }
    const t = setTimeout(() => setPillarReady(true), 600);
    return () => clearTimeout(t);
  }, [isOpen]);

  const isReady = pillarReady && firstTwoLoaded;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => e.stopPropagation();
    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onTouchMove = (e: TouchEvent) => e.stopPropagation();
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => el.removeEventListener("touchmove", onTouchMove);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !loading &&
          !fetchingRef.current &&
          hasMore
        ) {
          fetchingRef.current = true;
          Promise.resolve(fetchMore()).finally(() => {
            fetchingRef.current = false;
          });
        }
      },
      { rootMargin: "120px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isReady, fetchMore, loading, hasMore]);

  const handleFirstImageLoad = useCallback(() => {
    loadedCountRef.current += 1;
    if (loadedCountRef.current >= 2) setFirstTwoLoaded(true);
  }, []);

  const handleCloseModal = useCallback(() => setSelectedCert(null), []);

  return (
    <div className="w-full h-full relative bg-zinc-900 rounded-tr-4xl rounded-tl-4xl overflow-hidden">
      <AnimatePresence>
        {!isReady && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-zinc-900 rounded-tr-4xl rounded-tl-4xl"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SpectrumLoader
              strokeWidth={2}
              glow
              colors={["#7400ff", "#9b41ff"]}
            />
            <p className="mt-5 text-[10px] font-mono tracking-[0.25em] text-white/20 uppercase">
              Loading credentials
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        ref={scrollRef}
        className="w-full h-full overflow-auto"
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: 0.45 }}
        style={{ WebkitOverflowScrolling: "touch" }}
        onWheel={(e) => e.stopPropagation()}
      >
        <div className="relative min-h-[55vh] flex flex-col overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <LightPillar
              topColor="#dbdbdb"
              bottomColor="#687ea0"
              intensity={0.8}
              rotationSpeed={0.2}
              glowAmount={0.004}
              pillarWidth={2.2}
              pillarHeight={0.5}
              noiseIntensity={0.5}
              pillarRotation={28}
              interactive={false}
              mixBlendMode="normal"
              quality="high"
            />
          </div>

          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(
                to bottom,
                rgba(9,9,11,0.2) 0%,
                rgba(9,9,11,0.45) 50%,
                rgba(9,9,11,0.78) 78%,
                rgb(24,24,27) 100%
              )`,
            }}
          />

          <div
            className="relative z-20 flex flex-col items-center justify-center flex-1 text-center px-6 py-16"
            style={{
              textShadow:
                "0 2px 24px rgba(0,0,0,0.95),0 0 60px rgba(0,0,0,0.8)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 20 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="flex flex-col items-center gap-4"
            >
              <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/30 uppercase font-mono">
                <span className="w-5 h-px bg-white/15" />
                Credentials & Recognition
                <span className="w-5 h-px bg-white/15" />
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]">
                <span className="text-white/90">Verified.</span>{" "}
                <span className="text-white/35">Awarded.</span>
              </h2>
              <p className="text-sm text-white/30 max-w-sm leading-relaxed">
                Certifications, competition awards, and official recognitions
                earned through real-world challenges and continuous learning.
                Click any credential to view or verify.
              </p>
              <div className="mt-4 flex flex-col items-center gap-1 text-white/15">
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

        <div className="bg-zinc-900 px-4 md:px-8 pb-20 pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5 max-w-7xl mx-auto">
            {certs.map((cert, i) => (
              <CertCard
                key={cert.id}
                cert={cert}
                index={i}
                onOpenModal={setSelectedCert}
                onImageLoad={i < 2 ? handleFirstImageLoad : undefined}
              />
            ))}
            {loading &&
              Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCertCard key={`sk-${i}`} />
              ))}
          </div>

          <div ref={sentinelRef} className="h-2 mt-4" />

          {!hasMore && certs.length > 0 && (
            <p className="text-center text-white/15 text-[10px] font-mono tracking-[0.2em] uppercase mt-6">
              — {certs.length} credentials —
            </p>
          )}
          {error && (
            <p className="text-center text-red-400/50 text-xs mt-6 font-mono">
              {error}
            </p>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedCert && (
          <CertModal cert={selectedCert} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </div>
  );
}
