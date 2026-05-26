import { BeamColor } from "@/types/tect-stack";

export const PATH_COLOR = "oklch(27.4% 0.006 286.033)";

export const LEFT_BEAM_COLORS: BeamColor[] = [
  { start: "#fff085", stop: "oklch(85.2% 0.199 91.936)" },
  { start: "oklch(91.7% 0.08 205.041)", stop: "oklch(78.9% 0.154 211.53)" },
  { start: "oklch(67.3% 0.182 276.935)", stop: "oklch(58.5% 0.233 277.117)" },
  { start: "#f05033", stop: "#cc2900" },
  { start: "#ff6b6b", stop: "#cc0000" },
];

export const RIGHT_BEAM_COLORS: BeamColor[] = [
  { start: "#e4e4e7", stop: "#9f9fa9" },
  { start: "oklch(68.5% 0.169 237.323)", stop: "oklch(58.8% 0.158 241.966)" },
  { start: "oklch(80.8% 0.114 19.571)", stop: "oklch(70.4% 0.191 22.216)" },
  { start: "#d4d4d4", stop: "#a3a3a3" },
  { start: "#2496ed", stop: "#1a6eb5" },
];

export const LEFT_CURVATURES = [80, 50, 20, 0, -20] as const;
export const RIGHT_CURVATURES = [-80, -50, -20, 0, 20] as const;
