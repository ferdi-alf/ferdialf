"use client";

import * as React from "react";

interface DrawerCardGridProps {
  children: React.ReactNode;
  loading: boolean;
  hasMore: boolean;
  totalCount?: number;
  endLabel?: string;
  error?: string | null;
  skeletonCount?: number;
  renderSkeleton: (key: string) => React.ReactNode;
  gridCols?: string;
  onLoadMore: () => void;
  isReady: boolean;
  bgClass?: string;
}

export default function DrawerCardGrid({
  children,
  loading,
  hasMore,
  endLabel,
  error,
  skeletonCount = 3,
  renderSkeleton,
  gridCols = "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
  onLoadMore,
  isReady,
  bgClass = "bg-zinc-900",
}: DrawerCardGridProps) {
  const sentinelRef = React.useRef<HTMLDivElement>(null);
  const fetchingRef = React.useRef(false);

  React.useEffect(() => {
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
          Promise.resolve(onLoadMore()).finally(() => {
            fetchingRef.current = false;
          });
        }
      },
      { rootMargin: "120px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isReady, onLoadMore, loading, hasMore]);

  return (
    <div className={`${bgClass} px-4 md:px-8 pb-20 pt-6`}>
      <div className={`grid ${gridCols} gap-5 max-w-7xl mx-auto`}>
        {children}
        {loading &&
          Array.from({ length: skeletonCount }).map((_, i) =>
            renderSkeleton(`sk-${i}`),
          )}
      </div>

      <div ref={sentinelRef} className="h-2 mt-6" />

      {!hasMore && endLabel && (
        <p className="text-center text-white/15 text-[10px] font-mono tracking-[0.2em] uppercase mt-4">
          — {endLabel} —
        </p>
      )}

      {error && (
        <p className="text-center text-red-400/50 text-xs mt-6 font-mono">
          {error}
        </p>
      )}
    </div>
  );
}
