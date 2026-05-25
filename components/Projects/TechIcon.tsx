"use client";

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

interface TechIconProps {
  tech: string;
}

export default function TechIcon({ tech }: TechIconProps) {
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
