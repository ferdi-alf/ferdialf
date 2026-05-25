"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useCertificates } from "@/hooks/useCertificates";
import { Certificate } from "@/types/certificate";
import LightPillar from "@/components/Reactbits/LightPillar";
import DrawerShell from "@/components/drawer/DrawerShell";
import DrawerHero from "@/components/drawer/DrawerHero";
import DrawerCardGrid from "@/components/drawer/DrawerCardGrid";
import CertCard from "./CertCard";
import CertModal from "./CertModal";
import CertSkeleton from "./CertSkeleton";

const HERO_GRADIENT = `linear-gradient(
  to bottom,
  rgba(9,9,11,0.2)  0%,
  rgba(9,9,11,0.45) 50%,
  rgba(9,9,11,0.78) 78%,
  rgb(24,24,27)     100%
)`;

interface CertificatesDrawerContentProps {
  isOpen: boolean;
}

export default function CertificatesDrawerContent({
  isOpen,
}: CertificatesDrawerContentProps) {
  const scrollRef = useRef<HTMLDivElement>(null!);
  const loadedCountRef = useRef(0);

  const [pillarReady, setPillarReady] = useState(false);
  const [firstTwoLoaded, setFirstTwoLoaded] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const { certs, loading, error, hasMore, fetchMore } = useCertificates(isOpen);

  useEffect(() => {
    if (isOpen) return;
    const t = setTimeout(() => {
      setPillarReady(false);
      setFirstTwoLoaded(false);
      setSelectedCert(null);
      loadedCountRef.current = 0;
    }, 0);
    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => setPillarReady(true), 600);
    return () => clearTimeout(t);
  }, [isOpen]);

  const isReady = pillarReady && firstTwoLoaded;

  const handleFirstImageLoad = useCallback(() => {
    loadedCountRef.current += 1;
    if (loadedCountRef.current >= 2) setFirstTwoLoaded(true);
  }, []);

  const handleCloseModal = useCallback(() => setSelectedCert(null), []);

  return (
    <>
      <DrawerShell
        isOpen={isOpen}
        isReady={isReady}
        loadingLabel="Loading credentials"
        bgClass="bg-zinc-900"
        scrollRef={scrollRef}
      >
        <DrawerHero
          isReady={isReady}
          eyebrow="Credentials & Recognition"
          titlePlain="Verified."
          titleShiny="Awarded."
          subtitle="Certifications, competition awards, and official recognitions earned through real-world challenges and continuous learning. Click any credential to view or verify."
          gradientOverride={HERO_GRADIENT}
          background={
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
          }
        />

        <DrawerCardGrid
          isReady={isReady}
          loading={loading}
          hasMore={hasMore}
          error={error}
          onLoadMore={fetchMore}
          endLabel={`${certs.length} credentials`}
          skeletonCount={4}
          gridCols="grid-cols-2 sm:grid-cols-3 xl:grid-cols-4"
          bgClass="bg-zinc-900"
          renderSkeleton={(key) => <CertSkeleton key={key} />}
        >
          {certs.map((cert, i) => (
            <CertCard
              key={cert.id}
              cert={cert}
              index={i}
              onOpenModal={setSelectedCert}
              onImageLoad={i < 2 ? handleFirstImageLoad : undefined}
            />
          ))}
        </DrawerCardGrid>
      </DrawerShell>

      <AnimatePresence>
        {selectedCert && (
          <CertModal cert={selectedCert} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </>
  );
}
