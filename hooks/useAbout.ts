"use client";

import { About } from "@/types/about";
import { ApiResponse } from "@/types/api";
import { useEffect, useState } from "react";

export const useAbout = () => {
  const [data, setData] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/about");
        if (!res.ok) {
          throw new Error(`failed to fetch data`);
        }

        const result: ApiResponse<About> = await res.json();

        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.message || "unknown error");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error oncurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return { data, loading, error };
};
