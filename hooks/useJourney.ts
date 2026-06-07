"use client";

import { ApiResponse } from "@/types/api";
import { Journey } from "@/types/journey";
import { useEffect, useRef, useState } from "react";

let clientCache: Journey | null = null;
let inflight: Promise<Journey> | null = null;

async function fetchJourneyData(): Promise<Journey> {
  if (clientCache) return clientCache;

  if (!inflight) {
    inflight = fetch("/api/journey", {
      cache: "default",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: ApiResponse<Journey>) => {
        if (!json.success) throw new Error(json.message || "Unknown error");
        if (!json.data) throw new Error("No data received");
        clientCache = json.data;
        inflight = null;
        return clientCache;
      })
      .catch((err) => {
        inflight = null;
        throw err;
      }) as Promise<Journey>;
  }

  return inflight;
}

export const useJourney = () => {
  const [data, setData] = useState<Journey | null>(() => clientCache);
  const [loading, setLoading] = useState(() => clientCache === null);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    fetchJourneyData()
      .then((result) => {
        if (mountedRef.current) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mountedRef.current && (err as Error).name !== "AbortError") {
          setError((err as Error).message);
          setLoading(false);
        }
      });

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return { data, loading, error };
};
