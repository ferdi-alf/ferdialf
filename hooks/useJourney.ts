"use client";

import { ApiResponse } from "@/types/api";
import { Journey } from "@/types/journey";
import { useEffect, useState } from "react";

export const useJourney = () => {
  const [data, setData] = useState<Journey | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJourney = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/journey");
        if (!res.ok) throw new Error("Failed to fetch data");

        const result: ApiResponse<Journey> = await res.json();

        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.message || "Unknown error");
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchJourney();
  }, []);

  return { data, loading, error };
};
