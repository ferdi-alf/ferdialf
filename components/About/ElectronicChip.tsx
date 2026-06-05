"use client";

import React, { forwardRef, memo } from "react";

interface ElectronicChipProps {
  label: string;
  accentColor?: string;
  glowColor?: string;
}

const SILVER_H =
  "linear-gradient(90deg, #8a8a96 0%, #C0C0C0 40%, #e8e8f0 65%, #C0C0C0 80%, #9a9aaa 100%)";
const SILVER_V =
  "linear-gradient(180deg, #8a8a96 0%, #C0C0C0 40%, #e8e8f0 65%, #C0C0C0 80%, #9a9aaa 100%)";
const SILVER_GLOW =
  "0 0 6px rgba(192,192,192,0.5), 0 0 2px rgba(255,255,255,0.3)";

const hPinStyle = (side: "left" | "right"): React.CSSProperties => ({
  width: 14,
  height: 3,
  background: SILVER_H,
  borderRadius: side === "left" ? "2px 1px 1px 2px" : "1px 2px 2px 1px",
  boxShadow: SILVER_GLOW,
});

const vPinStyle = (side: "top" | "bottom"): React.CSSProperties => ({
  width: 3,
  height: 14,
  background: SILVER_V,
  borderRadius: side === "top" ? "2px 2px 1px 1px" : "1px 1px 2px 2px",
  boxShadow: SILVER_GLOW,
});

const HPin = memo(({ side }: { side: "left" | "right" }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 10,
      alignItems: side === "left" ? "flex-end" : "flex-start",
      marginRight: side === "left" ? -1 : 0,
      marginLeft: side === "right" ? -1 : 0,
    }}
  >
    {[0, 1, 2].map((i) => (
      <div key={i} style={hPinStyle(side)} />
    ))}
  </div>
));
HPin.displayName = "HPin";

const VPin = memo(({ side }: { side: "top" | "bottom" }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      gap: 10,
      justifyContent: "center",
      alignItems: side === "top" ? "flex-end" : "flex-start",
      marginBottom: side === "top" ? -1 : 0,
      marginTop: side === "bottom" ? -1 : 0,
    }}
  >
    {[0, 1, 2, 3].map((i) => (
      <div key={i} style={vPinStyle(side)} />
    ))}
  </div>
));
VPin.displayName = "VPin";

const DOTS = Array.from({ length: 7 }, (_, i) => i);

const ElectronicChip = forwardRef<HTMLDivElement, ElectronicChipProps>(
  (
    {
      label,
      accentColor = "rgba(167,139,250,0.55)",
      glowColor = "rgba(139,92,246,0.3)",
    },
    ref,
  ) => {
    return (
      <>
        <style>{`
          @keyframes chipShine {
            0%   { transform: translateX(-130%) skewX(-18deg); }
            100% { transform: translateX(260%)  skewX(-18deg); }
          }
        `}</style>

        <div
          ref={ref}
          className="relative z-10 flex flex-col items-center"
          style={{
            filter: `drop-shadow(0 8px 28px rgba(0,0,0,0.8)) drop-shadow(0 0 16px ${glowColor})`,
          }}
        >
          <VPin side="top" />

          <div className="flex items-center">
            <HPin side="left" />

            <div
              style={{
                position: "relative",
                overflow: "hidden",
                padding: "17px 34px",
                background:
                  "linear-gradient(160deg, #2e2e34 0%, #18181c 35%, #0c0c0e 60%, #1a1a1f 100%)",
                border: `1px solid ${accentColor}`,
                borderRadius: 9,
                boxShadow: `
                  inset 2px 2px 4px rgba(255,255,255,0.10),
                  inset -2px -2px 5px rgba(0,0,0,0.85),
                  inset 0 4px 18px rgba(0,0,0,0.7),
                  inset 0 1px 0 rgba(255,255,255,0.13),
                  0 0 28px ${glowColor},
                  0 8px 24px rgba(0,0,0,0.9),
                  0 2px 4px rgba(0,0,0,0.6)
                `,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                minWidth: 180,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "40%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.16) 50%, rgba(255,255,255,0.07) 60%, transparent 100%)",
                  animation: "chipShine 3.2s ease-in-out infinite",
                  pointerEvents: "none",
                }}
              />

              <div style={{ display: "flex", gap: 5 }}>
                {DOTS.map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 8,
                      height: 2,
                      background: accentColor,
                      borderRadius: 1,
                      opacity: 0.5,
                    }}
                  />
                ))}
              </div>

              <span
                style={{
                  fontSize: 15,
                  fontFamily: "monospace",
                  fontWeight: 900,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "transparent",
                  background:
                    "linear-gradient(180deg, #f0f0f8 0%, #d8d8e8 20%, #C0C0C0 45%, #a8a8b8 65%, #d0d0dc 82%, #f0f0f8 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  textShadow: `
                    0  1px 0   rgba(255,255,255,0.6),
                    0 -1px 0   rgba(0,0,0,0.9),
                    0  2px 4px rgba(0,0,0,0.75),
                    0 -1px 5px rgba(200,200,220,0.25)
                  `,
                }}
              >
                {label}
              </span>

              <div style={{ display: "flex", gap: 5 }}>
                {DOTS.map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 8,
                      height: 2,
                      background: accentColor,
                      borderRadius: 1,
                      opacity: 0.5,
                    }}
                  />
                ))}
              </div>
            </div>

            <HPin side="right" />
          </div>

          <VPin side="bottom" />
        </div>
      </>
    );
  },
);

ElectronicChip.displayName = "ElectronicChip";

export default ElectronicChip;
