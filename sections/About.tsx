"use client";

import React, { useRef } from "react";
import ElectronicChip from "@/components/About/ElectronicChip";

import { useAbout } from "@/hooks/useAbout";

import AboutCards from "@/components/About/AboutCard";
import CircuitOverlay from "@/components/About/CircuitOverlay";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  const { data, loading } = useAbout();

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

      {loading && (
        <div className="relative z-10 flex w-full flex-col gap-4 lg:flex-row">
          {[1.25, 1].map((flex, i) => (
            <div
              key={i}
              className="rounded-[17px] bg-white/5 animate-pulse"
              style={{ height: 280, flex }}
            />
          ))}
        </div>
      )}

      {!loading && data && (
        <AboutCards
          data={data}
          card1Ref={card1Ref}
          card2Ref={card2Ref}
          card3Ref={card3Ref}
          card4Ref={card4Ref}
        />
      )}
    </div>
  );
};

export default About;
