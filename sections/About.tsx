"use client";

import React, { forwardRef, useRef } from "react";
import { BorderBeam } from "@/components/lightswind/border-beam";
import {
  GraduationCap,
  Globe,
  Code2,
  FolderGit2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import CircuitOverlay from "@/components/Circuitoverlay";
import { darkSurface, rimBorder } from "@/styles/surfaces";

const ElectronicChip = forwardRef<
  HTMLDivElement,
  { label: string; accentColor?: string; glowColor?: string }
>(
  (
    {
      label,
      accentColor = "rgba(167,139,250,0.55)",
      glowColor = "rgba(139,92,246,0.3)",
    },
    ref,
  ) => {
    const SILVER_H =
      "linear-gradient(90deg, #8a8a96 0%, #C0C0C0 40%, #e8e8f0 65%, #C0C0C0 80%, #9a9aaa 100%)";
    const SILVER_V =
      "linear-gradient(180deg, #8a8a96 0%, #C0C0C0 40%, #e8e8f0 65%, #C0C0C0 80%, #9a9aaa 100%)";
    const SILVER_GLOW =
      "0 0 6px rgba(192,192,192,0.5), 0 0 2px rgba(255,255,255,0.3)";

    const hPin = (side: "left" | "right"): React.CSSProperties => ({
      width: 14,
      height: 3,
      background: SILVER_H,
      borderRadius: side === "left" ? "2px 1px 1px 2px" : "1px 2px 2px 1px",
      boxShadow: SILVER_GLOW,
    });

    const vPin = (side: "top" | "bottom"): React.CSSProperties => ({
      width: 3,
      height: 14,
      background: SILVER_V,
      borderRadius: side === "top" ? "2px 2px 1px 1px" : "1px 1px 2px 2px",
      boxShadow: SILVER_GLOW,
    });

    const hPins = (side: "left" | "right") => (
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
          <div key={i} style={hPin(side)} />
        ))}
      </div>
    );

    const vPins = (side: "top" | "bottom") => (
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
          <div key={i} style={vPin(side)} />
        ))}
      </div>
    );

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
          {vPins("top")}

          <div className="flex items-center">
            {hPins("left")}

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
                flexDirection: "column" as const,
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
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
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
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
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

            {hPins("right")}
          </div>

          {vPins("bottom")}
        </div>
      </>
    );
  },
);

ElectronicChip.displayName = "ElectronicChip";

const CardBadge = ({
  label,
  color,
  bg,
}: {
  label: string;
  color: string;
  bg: string;
}) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase ${color} ${bg}`}
  >
    {label}
  </span>
);

const journeyItems = [
  {
    done: true,
    text: "SMKN 4 Palembang – Vocational High School (Software Engineering 2023 – 2026)",
  },
  { done: true, text: "Volunteering Developer – School Digital Systems" },
  { done: true, text: "Freelance Fullstack Developer – Active (2023 – Now)" },
  { done: false, text: "Pursuing Higher Education – In Progress" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/ferdi-alf" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-ferdi-alfian-979273396?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  { label: "Instagram", href: "https://www.instagram.com/eternalferr_" },
  { label: "Email", href: "mailto:ferdialf.dev@gmail.com" },
];

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative max-w-7xl md:w-4/5 w-full md:p-0 p-3 md:mt-5 mt-10"
    >
      <CircuitOverlay
        containerRef={containerRef}
        chipRef={chipRef}
        card1Ref={card1Ref}
        card2Ref={card2Ref}
        card3Ref={card3Ref}
        card4Ref={card4Ref}
      />

      <div className="relative z-10 flex justify-center mb-16">
        <ElectronicChip
          ref={chipRef}
          label="About Me"
          accentColor="rgba(167,139,250,0.55)"
          glowColor="rgba(139,92,246,0.3)"
        />
      </div>

      <div className="relative z-10 flex w-full flex-col gap-4 lg:flex-row">
        <div ref={card1Ref} className="relative flex-[1.25]" style={rimBorder}>
          <div
            style={darkSurface}
            className="overflow-hidden rounded-[17px] p-6 sm:p-7 flex flex-col gap-5"
          >
            <BorderBeam
              size={280}
              duration={8}
              colorFrom="#8b5cf6"
              colorTo="#c4b5fd"
            />
            <div className="flex items-center justify-between">
              <CardBadge
                label="My Journey"
                color="text-violet-300"
                bg="bg-violet-500/15"
              />
              <GraduationCap className="h-5 w-5 text-violet-400 opacity-80" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                Building From the{" "}
                <span className="text-violet-400">Ground Up</span>
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed max-w-sm">
                Started in vocational school, shipping production code for real
                clients. Every project added a layer — now I&apos;m leveling up
                through formal education while staying active in freelance.
              </p>
            </div>
            <div className="h-px w-full bg-white/[0.07]" />
            <ul className="flex flex-col gap-3">
              {journeyItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  {item.done ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                  ) : (
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
                  )}
                  <span
                    className={`text-sm leading-snug ${item.done ? "text-zinc-300" : "text-zinc-500 italic"}`}
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <div ref={card2Ref} className="relative" style={rimBorder}>
            <div
              style={darkSurface}
              className="overflow-hidden rounded-[17px] p-5 sm:p-6 flex flex-col gap-4"
            >
              <BorderBeam
                size={200}
                duration={10}
                colorFrom="#06b6d4"
                colorTo="#67e8f9"
              />
              <div className="flex items-center justify-between">
                <CardBadge
                  label="Find Me"
                  color="text-cyan-300"
                  bg="bg-cyan-500/15"
                />
                <Globe className="h-5 w-5 text-cyan-400 opacity-80" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Let&apos;s Connect
                </h3>
                <p className="mt-1 text-xs text-zinc-500">
                  Open to collaborations, freelance projects, and new
                  opportunities.
                </p>
              </div>
              <div className="mt-auto flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-300"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div
              ref={card3Ref}
              className="relative min-h-35 sm:min-h-40"
              style={rimBorder}
            >
              <div
                style={darkSurface}
                className="overflow-hidden rounded-[17px] p-4 sm:p-5 flex flex-col justify-between"
              >
                <BorderBeam
                  size={150}
                  duration={9}
                  colorFrom="#10b981"
                  colorTo="#34d399"
                />

                <div className="flex items-center justify-between">
                  <CardBadge
                    label="Experience"
                    color="text-emerald-300"
                    bg="bg-emerald-500/15"
                  />
                  <Code2 className="h-4 w-4 text-emerald-400 opacity-80" />
                </div>
                <div>
                  <p className="text-3xl  sm:text-4xl font-black text-white tracking-tight">
                    3
                  </p>
                  <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                    Years
                  </p>
                  <p className="mt-1 text-[11px] text-zinc-500">
                    2023 – Present
                  </p>
                </div>
              </div>
            </div>

            <div
              ref={card4Ref}
              className="relative min-h-35 sm:min-h-40"
              style={rimBorder}
            >
              <div
                style={darkSurface}
                className="overflow-hidden rounded-[17px] p-4 sm:p-5 flex flex-col justify-between"
              >
                <BorderBeam
                  size={100}
                  duration={6}
                  delay={2}
                  colorFrom="#f97316"
                  colorTo="#fb923c"
                />
                <div className="flex items-center justify-between">
                  <CardBadge
                    label="Projects"
                    color="text-amber-300"
                    bg="bg-amber-500/15"
                  />
                  <FolderGit2 className="h-4 w-4 text-amber-400 opacity-80" />
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    28
                  </p>
                  <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                    Delivered
                  </p>
                  <p className="mt-1 text-[11px] text-zinc-500">
                    Across clients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
