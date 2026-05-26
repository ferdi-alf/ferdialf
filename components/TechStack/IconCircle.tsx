"use client";

import { IconCircleProps } from "@/types/tect-stack";
import { forwardRef } from "react";

export const IconCircle = forwardRef<HTMLDivElement, IconCircleProps>(
  ({ icon, label, size = 48 }, ref) => (
    <div ref={ref} className="relative z-10 flex flex-col items-center gap-1.5">
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0 0 12px rgba(0,200,255,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
          overflow: "hidden",
        }}
      >
        {typeof icon === "string" ? (
          <span style={{ fontSize: size * 0.42, lineHeight: 1 }}>{icon}</span>
        ) : (
          <div
            style={{
              width: size * 0.55,
              height: size * 0.55,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </div>
        )}
      </div>
      {label && (
        <span
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.05em",
            fontFamily: "monospace",
          }}
        >
          {label}
        </span>
      )}
    </div>
  ),
);

IconCircle.displayName = "IconCircle";
