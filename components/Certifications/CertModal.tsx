"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X, Award, BadgeCheck, Users } from "lucide-react";
import { Certificate } from "@/types/certificate";
import { ShineButton } from "@/components/lightswind/shine-button";

const CATEGORY_CONFIG = {
  award: { label: "Award", Icon: Award },
  certification: { label: "Certification", Icon: BadgeCheck },
  participation: { label: "Participation", Icon: Users },
} as const;

interface CertModalProps {
  cert: Certificate;
  onClose: () => void;
}

export default function CertModal({ cert, onClose }: CertModalProps) {
  const cfg = CATEGORY_CONFIG[cert.category];
  const hasLink = !!cert.redirectUrl;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

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
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        pointerEvents: "all",
      }}
    >
      {/* Backdrop */}
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

      {/* Card */}
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
            "linear-gradient(160deg, rgba(39,39,42,0.88) 0%, rgba(24,24,27,0.98) 100%)",
          boxShadow:
            "0 32px 96px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)",
          pointerEvents: "all",
        }}
      >
        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.15)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.07)";
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
        >
          <X size={14} style={{ color: "rgba(255,255,255,0.6)" }} />
        </button>

        {/* Category label */}
        <div style={{ padding: "1.125rem 1.125rem 0.375rem" }}>
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

        {/* Image */}
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
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
                "linear-gradient(to bottom, transparent 55%, rgba(18,18,22,0.55) 100%)",
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
            style={{
              fontSize: "0.8125rem",
              color: "rgba(255,255,255,0.38)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {cert.issuer}
          </p>
          {cert.credentialId && (
            <p
              style={{
                fontSize: "0.6875rem",
                fontFamily: "monospace",
                marginTop: "0.3rem",
                color: "rgba(255,255,255,0.28)",
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
