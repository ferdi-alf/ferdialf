"use client";

import { ApiResponse } from "@/types/api";
import { Certificate, CertificatesApiData } from "@/types/certificate";
import { useCallback, useEffect, useRef, useState } from "react";

const LIMIT = 8;
const pageCache = new Map<number, Certificate[]>();
let cachedTotal = 0;

export const useCertificates = (enabled: boolean) => {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const currentPageRef = useRef(0);
  const isFetchingRef = useRef(false);
  const hasInitializedRef = useRef(false);

  const fetchPage = useCallback(async (page: number) => {
    if (isFetchingRef.current) return;

    if (pageCache.has(page)) {
      const cached = pageCache.get(page)!;
      setCerts((prev) => {
        const ids = new Set(prev.map((c) => c.id));
        const newItems = cached.filter((c) => !ids.has(c.id));
        return newItems.length > 0 ? [...prev, ...newItems] : prev;
      });
      setHasMore(page * LIMIT < cachedTotal);
      return;
    }

    isFetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/certificates?page=${page}&limit=${LIMIT}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const result: ApiResponse<CertificatesApiData> = await res.json();
      if (!result.success) throw new Error(result.message ?? "Unknown error");
      if (!result.data) throw new Error("No data returned");

      const { items, total, hasMore } = result.data;
      pageCache.set(page, items);
      cachedTotal = total;

      setCerts((prev) => {
        const ids = new Set(prev.map((c) => c.id));
        const newItems = items.filter((c) => !ids.has(c.id));
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

  return { certs, loading, error, hasMore, fetchMore };
};
