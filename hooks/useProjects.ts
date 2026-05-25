"use client";

import { ApiResponse } from "@/types/api";
import { Project, ProjectsApiData } from "@/types/project";
import { useCallback, useEffect, useRef, useState } from "react";

const LIMIT = 10;

// Module-level cache — persists across drawer open/close cycles
const pageCache = new Map<number, Project[]>();
let cachedTotal = 0;

export const useProjects = (enabled: boolean) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const currentPageRef = useRef(0);
  const isFetchingRef = useRef(false);
  const hasInitializedRef = useRef(false);

  const fetchPage = useCallback(async (page: number) => {
    if (isFetchingRef.current) return;

    // Cache hit — hydrate from memory instantly
    if (pageCache.has(page)) {
      const cached = pageCache.get(page)!;
      setProjects((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const newItems = cached.filter((p) => !existingIds.has(p.id));
        return newItems.length > 0 ? [...prev, ...newItems] : prev;
      });
      setHasMore(page * LIMIT < cachedTotal);
      return;
    }

    isFetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/projects?page=${page}&limit=${LIMIT}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const result: ApiResponse<ProjectsApiData> = await res.json();
      if (!result.success) throw new Error(result.message ?? "Unknown error");

      const { items, total, hasMore } = result.data;

      pageCache.set(page, items);
      cachedTotal = total;

      setProjects((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const newItems = items.filter((p) => !existingIds.has(p.id));
        return [...prev, ...newItems];
      });
      setHasMore(hasMore);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled || hasInitializedRef.current) return;
    hasInitializedRef.current = true;
    currentPageRef.current = 1;
    fetchPage(1);
  }, [enabled, fetchPage]);

  const fetchMore = useCallback(() => {
    if (!hasMore || isFetchingRef.current) return;
    currentPageRef.current += 1;
    fetchPage(currentPageRef.current);
  }, [hasMore, fetchPage]);

  return { projects, loading, error, hasMore, fetchMore };
};
