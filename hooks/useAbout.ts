/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { AboutApiData } from "@/types/about";
import { useEffect, useRef, useState } from "react";

let cache: AboutApiData | null = null;
let inflightPromise: Promise<AboutApiData> | null = null;

async function fetchAboutData(): Promise<AboutApiData> {
  if (cache) return cache;

  if (!inflightPromise) {
    inflightPromise = fetch("/api/about")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        cache = json.data as AboutApiData;
        inflightPromise = null;
        return cache;
      })
      .catch((err) => {
        inflightPromise = null;
        throw err;
      });
  }

  return inflightPromise;
}

export function prefetchAbout(): void {
  fetchAboutData().catch(() => {});
}

interface UseAboutReturn {
  data: AboutApiData | null;
  loading: boolean;
  error: string | null;
}

export function useAbout(): UseAboutReturn {
  const [data, setData] = useState<AboutApiData | null>(() => cache);
  const [loading, setLoading] = useState(() => cache === null);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    if (cache !== null) {
      setData(cache);
      setLoading(false);
      return;
    }

    fetchAboutData()
      .then((d) => {
        if (!mountedRef.current) return;
        setData(d);
        setError(null);
      })
      .catch((err: Error) => {
        if (!mountedRef.current) return;
        setError(err.message);
      })
      .finally(() => {
        if (mountedRef.current) setLoading(false);
      });

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return { data, loading, error };
}
