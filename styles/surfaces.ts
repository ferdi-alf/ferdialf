import type { CSSProperties } from "react";

export const rimBorder: CSSProperties = {
  filter:
    "drop-shadow(0 8px 32px rgba(0,0,0,0.55)) drop-shadow(0 2px 6px rgba(0,0,0,0.4))",
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.03) 40%, rgba(0,0,0,0.62) 100%)",
  padding: "1px",
  borderRadius: 18,
};

export const darkSurface: CSSProperties = {
  borderRadius: 17,
  background:
    "linear-gradient(160deg, rgba(38,38,42,0.96) 0%, rgba(16,16,18,0.99) 55%, rgba(8,8,10,1) 100%)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.11), inset 1px 0 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.58), inset -1px 0 0 rgba(0,0,0,0.38)",
  height: "100%",
};
