"use client";

import SectionLayout from "@/components/layouts/SectionLayout";
import { ScrollTimeline } from "@/components/lightswind/scroll-timeline";
import { useJourney } from "@/hooks/useJourney";
import React from "react";

interface JourneyProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function Journey({ containerRef }: JourneyProps) {
  const { data, loading, error } = useJourney();

  if (loading) {
    return (
      <SectionLayout title="Journey">
        <div className="text-white mt-10 text-center">Loading...</div>
      </SectionLayout>
    );
  }

  if (error) {
    return (
      <SectionLayout title="Journey">
        <div className="text-red-500 mt-10 text-center">Error: {error}</div>
      </SectionLayout>
    );
  }

  if (!data) return null;

  return (
    <SectionLayout title="Journey">
      <ScrollTimeline
        events={data.events}
        animationOrder="sequential"
        cardAlignment="alternating"
        revealAnimation="scale"
        cardVariant="elevated"
        cardEffect="glow"
        connectorStyle="dashed"
        dateFormat="badge"
        progressIndicator={true}
        darkMode={true}
        smoothScroll={true}
        containerRef={containerRef}
        className="mt-6"
      />
    </SectionLayout>
  );
}
