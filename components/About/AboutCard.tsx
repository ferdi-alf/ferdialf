"use client";

import React, { memo, RefObject } from "react";
import { motion } from "motion/react";
import { BorderBeam } from "@/components/lightswind/border-beam";
import { GraduationCap, Globe, CheckCircle2, ArrowRight } from "lucide-react";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import { darkSurface, rimBorder } from "@/styles/surfaces";
import type {
  AboutApiData,
  JourneyItem,
  SocialLink,
  StatCard,
} from "@/types/about";

const SOCIAL_META: Record<string, { icon: React.ReactNode }> = {
  s1: { icon: <FaGithub /> },
  s2: { icon: <FaLinkedinIn /> },
  s3: { icon: <FaInstagram /> },
  s4: { icon: <FaEnvelope /> },
};

interface StatMeta {
  accentClass: string;
  badgeLabel: string;
  badgeColor: string;
  badgeBg: string;
  icon: React.ReactNode;
  beamProps: React.ComponentProps<typeof BorderBeam>;
}

const STAT_META: Record<string, StatMeta> = {
  st1: {
    accentClass: "text-emerald-400",
    badgeLabel: "Experience",
    badgeColor: "text-emerald-300",
    badgeBg: "bg-emerald-500/15",
    icon: (
      <svg
        className="h-4 w-4 text-emerald-400 opacity-80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    beamProps: {
      size: 150,
      duration: 9,
      colorFrom: "#10b981",
      colorTo: "#34d399",
    },
  },
  st2: {
    accentClass: "text-amber-400",
    badgeLabel: "Projects",
    badgeColor: "text-amber-300",
    badgeBg: "bg-amber-500/15",
    icon: (
      <svg
        className="h-4 w-4 text-amber-400 opacity-80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
    beamProps: {
      size: 100,
      duration: 6,
      delay: 2,
      colorFrom: "#f97316",
      colorTo: "#fb923c",
    },
  },
};

const CardBadge = memo(
  ({ label, color, bg }: { label: string; color: string; bg: string }) => (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase ${color} ${bg}`}
    >
      {label}
    </span>
  ),
);
CardBadge.displayName = "CardBadge";

const JourneyList = memo(({ items }: { items: JourneyItem[] }) => (
  <ul className="flex flex-col gap-3">
    {items.map((item) => (
      <li key={item.id} className="flex items-start gap-3">
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
));
JourneyList.displayName = "JourneyList";

const SocialButtons = memo(({ socials }: { socials: SocialLink[] }) => (
  <div className="flex gap-3 mt-auto">
    {socials.map((s) => {
      const meta = SOCIAL_META[s.id];
      return (
        <a
          key={s.id}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
        >
          <motion.div whileHover={{ y: -2 }} style={rimBorder}>
            <div
              style={{ ...darkSurface, borderRadius: 10 }}
              className="w-9 h-9 p-2 flex items-center justify-center text-white/35 hover:text-white/70 transition-colors text-base"
            >
              {meta?.icon}
            </div>
          </motion.div>
        </a>
      );
    })}
  </div>
));
SocialButtons.displayName = "SocialButtons";

const StatCardItem = memo(
  ({
    stat,
    cardRef,
  }: {
    stat: StatCard;
    cardRef: RefObject<HTMLDivElement | null>;
  }) => {
    const meta = STAT_META[stat.id];
    if (!meta) return null;

    return (
      <div
        ref={cardRef}
        className="relative min-h-35 sm:min-h-40"
        style={rimBorder}
      >
        <div
          style={darkSurface}
          className="overflow-hidden rounded-[17px] p-4 sm:p-5 flex flex-col justify-between"
        >
          <BorderBeam {...meta.beamProps} />
          <div className="flex items-center justify-between">
            <CardBadge
              label={meta.badgeLabel}
              color={meta.badgeColor}
              bg={meta.badgeBg}
            />
            {meta.icon}
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {stat.value}
            </p>
            <p
              className={`text-xs font-semibold uppercase tracking-widest ${meta.accentClass}`}
            >
              {stat.unit}
            </p>
            <p className="mt-1 text-[11px] text-zinc-500">{stat.sub}</p>
          </div>
        </div>
      </div>
    );
  },
);
StatCardItem.displayName = "StatCardItem";

export interface AboutCardsProps {
  data: AboutApiData;
  card1Ref: RefObject<HTMLDivElement | null>;
  card2Ref: RefObject<HTMLDivElement | null>;
  card3Ref: RefObject<HTMLDivElement | null>;
  card4Ref: RefObject<HTMLDivElement | null>;
}

const AboutCards = memo(
  ({ data, card1Ref, card2Ref, card3Ref, card4Ref }: AboutCardsProps) => {
    const statRefs = [card3Ref, card4Ref];

    return (
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
            <JourneyList items={data.journey} />
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
              <SocialButtons socials={data.socials} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {data.stats.map((stat, i) => (
              <StatCardItem key={stat.id} stat={stat} cardRef={statRefs[i]} />
            ))}
          </div>
        </div>
      </div>
    );
  },
);
AboutCards.displayName = "AboutCards";

export default AboutCards;
