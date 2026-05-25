"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import LineWaves from "@/components/LineWaves";
import DrawerShell from "@/components/drawer/DrawerShell";
import DrawerHero from "@/components/drawer/DrawerHero";
import DrawerCardGrid from "@/components/drawer/DrawerCardGrid";
import ProjectCard from "./ProjectCard";
import ProjectSkeleton from "./ProjectSkeleton";

const HERO_GRADIENT = `linear-gradient(
  to bottom,
  rgba(9,9,11,0.25) 0%,
  rgba(9,9,11,0.50) 45%,
  rgba(9,9,11,0.75) 75%,
  rgb(24,24,27) 100%
)`;

interface ProjectsDrawerContentProps {
  isOpen: boolean;
}

export default function ProjectsDrawerContent({
  isOpen,
}: ProjectsDrawerContentProps) {
  const scrollRef = useRef<HTMLDivElement>(null!);
  const [lineWavesReady, setLineWavesReady] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const { projects, loading, error, hasMore, fetchMore } = useProjects(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => setLineWavesReady(true), 700);
    return () => clearTimeout(t);
  }, [isOpen]);

  const isReady =
    lineWavesReady &&
    projects.length >= 2 &&
    projects.slice(0, 2).every((p) => loadedImages.has(p.id));

  const handleImageLoad = useCallback((id: string) => {
    setLoadedImages((prev) => new Set([...prev, id]));
  }, []);

  return (
    <DrawerShell
      isOpen={isOpen}
      isReady={isReady}
      loadingLabel="Loading works"
      bgClass="bg-zinc-950"
      scrollRef={scrollRef}
    >
      <DrawerHero
        isReady={isReady}
        eyebrow="Portofolio"
        titlePlain="Crafted with"
        titleShiny="Precision."
        subtitle="A curated selection of real-world projects — each built, shipped, and refined for production. Not all works are publicly listed or open source; some remain private by client agreement."
        gradientOverride={HERO_GRADIENT}
        background={
          <LineWaves
            speed={0.5}
            innerLineCount={32}
            outerLineCount={31}
            warpIntensity={0.1}
            rotation={-58}
            edgeFadeWidth={0.3}
            colorCycleSpeed={1}
            brightness={0.3}
            color1="#464646"
            color2="#262626"
            color3="#9b9b9b"
            enableMouseInteraction
            mouseInfluence={0.5}
          />
        }
      />

      <DrawerCardGrid
        isReady={isReady}
        loading={loading}
        hasMore={hasMore}
        error={error}
        onLoadMore={fetchMore}
        endLabel="End of works"
        skeletonCount={3}
        gridCols="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
        bgClass="bg-zinc-900"
        renderSkeleton={(key) => <ProjectSkeleton key={key} />}
      >
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            imageLoaded={loadedImages.has(project.id)}
            onImageLoad={handleImageLoad}
          />
        ))}
      </DrawerCardGrid>
    </DrawerShell>
  );
}
