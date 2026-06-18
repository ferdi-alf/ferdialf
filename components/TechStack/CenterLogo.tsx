"use client";

import { forwardRef } from "react";
import { motion } from "motion/react";
import Image from "next/image";

export const CenterLogo = forwardRef<HTMLDivElement>((_, ref) => (
  <div
    ref={ref}
    className="relative flex items-center justify-center"
    style={{ width: 80, height: 80 }}
  >
    <motion.div
      style={{
        position: "absolute",
        inset: -24,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)",
        willChange: "opacity",
      }}
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <div
      style={{
        width: 80,
        height: 80,
        position: "relative",
        zIndex: 10,
        filter:
          "drop-shadow(0 6px 18px rgba(0,0,0,0.65)) drop-shadow(0 1px 3px rgba(0,0,0,0.85))",
      }}
    >
      <motion.div
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          padding: "1.5px",
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.30) 0%, rgba(180,180,180,0.08) 45%, rgba(0,0,0,0.65) 100%)",
          boxShadow:
            "0 8px 28px rgba(0,0,0,0.7), 0 2px 6px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background:
              "linear-gradient(160deg, rgba(50,50,52,0.95) 0%, rgba(15,15,16,0.98) 60%, rgba(8,8,9,1) 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.13), inset 1px 0 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.55), inset -1px 0 0 rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              filter:
                "drop-shadow(0 3px 8px rgba(0,0,0,0.8)) drop-shadow(0 1px 2px rgba(0,0,0,1))",
            }}
          >
            <div
              style={{
                padding: "1.5px",
                borderRadius: 10,
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.32) 0%, rgba(160,160,160,0.08) 50%, rgba(0,0,0,0.55) 100%)",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <div
                style={{
                  borderRadius: 8.5,
                  overflow: "hidden",
                  background: "#0a0a0a",
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.8)",
                }}
              >
                <Image
                  alt="Muhammad Ferdi Alfian - Logo"
                  width={200}
                  height={200}
                  loading="eager"
                  className="w-11 h-11 block"
                  src="/images/icon.webp"
                  style={{ display: "block" }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
));

CenterLogo.displayName = "CenterLogo";
