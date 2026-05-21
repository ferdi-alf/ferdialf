/* eslint-disable react-hooks/refs */
"use client";

import React, {
  forwardRef,
  useRef,
  useEffect,
  useState,
  useId,
  ReactNode,
  RefObject,
} from "react";
import { motion } from "motion/react";
import ShinyText from "@/components/ui/ShinyText";
import Image from "next/image";

interface AnimatedBeamProps {
  containerRef: RefObject<HTMLDivElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

interface OrbitRingProps {
  radius: number;
  duration: number;
  reverse?: boolean;
  color?: string;
  opacity?: number;
  dotSize?: number;
  children?: ReactNode;
}

interface IconCircleProps {
  icon: ReactNode;
  label?: string;
  size?: number;
}

interface TechItem {
  ref: RefObject<HTMLDivElement | null>;
  icon: ReactNode;
  label: string;
}

const AnimatedBeam = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 8,
  delay = 0,
  pathColor = "rgba(255,255,255,0.06)",
  pathWidth = 1.5,
  gradientStartColor = "#00f0ff",
  gradientStopColor = "#0066ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const gradientCoordinates = reverse
    ? {
        x1: ["120%", "-20%"],
        x2: ["100%", "0%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }
    : {
        x1: ["-20%", "120%"],
        x2: ["0%", "100%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      };

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();
        setSvgDimensions({
          width: containerRect.width,
          height: containerRect.height,
        });
        const startX =
          rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
        const startY =
          rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
        const endX =
          rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
        const endY =
          rectB.top - containerRect.top + rectB.height / 2 + endYOffset;
        const controlY = startY - curvature;
        setPathD(
          `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`,
        );
      }
    };
    const ro = new ResizeObserver(updatePath);
    if (containerRef.current) ro.observe(containerRef.current);
    updatePath();
    return () => ro.disconnect();
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      className="pointer-events-none absolute top-0 left-0"
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={1}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        stroke={`url(#${id})`}
        strokeWidth={pathWidth + 1.5}
        strokeOpacity={1}
        strokeLinecap="round"
        filter={`url(#glow-${id})`}
      />
      <defs>
        <filter id={`glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <motion.linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 1.2,
          }}
        >
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="20%" stopColor={gradientStartColor} stopOpacity="0.8" />
          <stop offset="50%" stopColor={gradientStopColor} stopOpacity="1" />
          <stop offset="80%" stopColor={gradientStopColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
};

const OrbitRing = ({
  radius,
  duration,
  reverse = false,
  color = "#00d4ff",
  opacity = 0.4,
  dotSize = 3,
  children,
}: OrbitRingProps) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div
      style={{
        width: radius * 2,
        height: radius * 2,
        borderRadius: "50%",
        border: `1px solid ${color}`,
        opacity: opacity * 0.4,
        position: "absolute",
      }}
    />
    <motion.div
      style={{ width: radius * 2, height: radius * 2, position: "absolute" }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 6px 2px ${color}`,
        }}
      />
      {children}
    </motion.div>
  </div>
);

const IconCircle = forwardRef<HTMLDivElement, IconCircleProps>(
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

const CenterLogo = forwardRef<HTMLDivElement>((_, ref) => (
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
      }}
      animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.08, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />

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
        filter:
          "drop-shadow(0 6px 18px rgba(0,0,0,0.65)) drop-shadow(0 1px 3px rgba(0,0,0,0.85))",
        position: "relative",
        zIndex: 10,
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
                src="/images/icon.PNG"
                style={{ display: "block" }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
));
CenterLogo.displayName = "CenterLogo";

export function TechStackConvergence({
  className = "",
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  const refL1 = useRef<HTMLDivElement>(null);
  const refL2 = useRef<HTMLDivElement>(null);
  const refL3 = useRef<HTMLDivElement>(null);
  const refL4 = useRef<HTMLDivElement>(null);
  const refL5 = useRef<HTMLDivElement>(null);

  const refR1 = useRef<HTMLDivElement>(null);
  const refR2 = useRef<HTMLDivElement>(null);
  const refR3 = useRef<HTMLDivElement>(null);
  const refR4 = useRef<HTMLDivElement>(null);
  const refR5 = useRef<HTMLDivElement>(null);

  const leftTechs: TechItem[] = [
    {
      ref: refL1,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path
            fill="#F7DF1E"
            d="M8.5 0h31C44.2 0 48 3.897 48 8.718v30.564C48 44.102 44.2 48 39.5 48h-31C3.8 48 0 44.103 0 39.282V8.718C0 3.898 3.8 0 8.5 0z"
          />
          <path d="M12 36.382l3.483-2.107c.672 1.191 1.283 2.199 2.749 2.199 1.405 0 2.291-.55 2.291-2.688V19.245H24.8v14.601c0 4.43-2.596 6.446-6.385 6.446-3.421 0-5.407-1.772-6.415-3.91zm15.123-.458l3.482-2.016c.917 1.497 2.109 2.597 4.216 2.597 1.772 0 2.902-.886 2.902-2.108 0-1.467-1.16-1.986-3.116-2.841l-1.069-.459c-3.085-1.313-5.132-2.963-5.132-6.445 0-3.208 2.444-5.652 6.263-5.652 2.719 0 4.674.947 6.079 3.422l-3.33 2.138c-.734-1.313-1.527-1.833-2.75-1.833-1.252 0-2.046.795-2.046 1.833 0 1.283.794 1.803 2.627 2.597l1.069.458C39.953 29.173 42 30.762 42 34.335c0 3.85-3.024 5.958-7.087 5.958-3.971 0-6.538-1.894-7.79-4.369" />
        </svg>
      ),
      label: "JavaScript",
    },
    {
      ref: refL2,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="256"
          height="256"
          fill="none"
          viewBox="0 0 256 256"
        >
          <rect width="256" height="256" fill="#00B4E0" rx="60" />
          <path
            fill="#fff"
            d="M40.5 113.234C40.1 113.234 40 113.034 40.2 112.734L42.3 110.034C42.5 109.734 43 109.534 43.4 109.534H79.1C79.5 109.534 79.6 109.834 79.4 110.134L77.7 112.734C77.5 113.034 77 113.334 76.7 113.334L40.5 113.234Z"
          />
          <path
            fill="#fff"
            d="M25.4 122.434C25 122.434 24.9 122.234 25.1 121.934L27.2 119.234C27.4 118.934 27.9 118.734 28.3 118.734H73.9C74.3 118.734 74.5 119.034 74.4 119.334L73.6 121.734C73.5 122.134 73.1 122.334 72.7 122.334L25.4 122.434Z"
          />
          <path
            fill="#fff"
            d="M49.6 131.634C49.2 131.634 49.1 131.334 49.3 131.034L50.7 128.534C50.9 128.234 51.3 127.934 51.7 127.934H71.7C72.1 127.934 72.3 128.234 72.3 128.634L72.1 131.034C72.1 131.434 71.7 131.734 71.4 131.734L49.6 131.634Z"
          />
          <path
            fill="#fff"
            d="M153.4 111.434C147.1 113.034 142.8 114.234 136.6 115.834C135.1 116.234 135 116.334 133.7 114.834C132.2 113.134 131.1 112.034 129 111.034C122.7 107.934 116.6 108.834 110.9 112.534C104.1 116.934 100.6 123.434 100.7 131.534C100.8 139.534 106.3 146.134 114.2 147.234C121 148.134 126.7 145.734 131.2 140.634C132.1 139.534 132.9 138.334 133.9 136.934C130.3 136.934 125.8 136.934 114.6 136.934C112.5 136.934 112 135.634 112.7 133.934C114 130.834 116.4 125.634 117.8 123.034C118.1 122.434 118.8 121.434 120.3 121.434C125.4 121.434 144.2 121.434 156.7 121.434C156.5 124.134 156.5 126.834 156.1 129.534C155 136.734 152.3 143.334 147.9 149.134C140.7 158.634 131.3 164.534 119.4 166.134C109.6 167.434 100.5 165.534 92.5 159.534C85.1 153.934 80.9 146.534 79.8 137.334C78.5 126.434 81.7 116.634 88.3 108.034C95.4 98.7343 104.8 92.8343 116.3 90.7343C125.7 89.0343 134.7 90.1343 142.8 95.6343C148.1 99.1343 151.9 103.934 154.4 109.734C155 110.634 154.6 111.134 153.4 111.434Z"
          />
          <path
            fill="#fff"
            d="M186.5 166.734C177.4 166.534 169.1 163.934 162.1 157.934C156.2 152.834 152.5 146.334 151.3 138.634C149.5 127.334 152.6 117.334 159.4 108.434C166.7 98.8343 175.5 93.8343 187.4 91.7343C197.6 89.9343 207.2 90.9343 215.9 96.8343C223.8 102.234 228.7 109.534 230 119.134C231.7 132.634 227.8 143.634 218.5 153.034C211.9 159.734 203.8 163.934 194.5 165.834C191.8 166.334 189.1 166.434 186.5 166.734ZM210.3 126.334C210.2 125.034 210.2 124.034 210 123.034C208.2 113.134 199.1 107.534 189.6 109.734C180.3 111.834 174.3 117.734 172.1 127.134C170.3 134.934 174.1 142.834 181.3 146.034C186.8 148.434 192.3 148.134 197.6 145.434C205.5 141.334 209.8 134.934 210.3 126.334Z"
          />
        </svg>
      ),
      label: "Golang",
    },
    {
      ref: refL3,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinejoin: "round",
            strokeMiterlimit: 2,
          }}
          viewBox="0 0 512 513"
        >
          <path
            d="M512 122.68C512 55.247 457.253.5 389.82.5H122.18C54.747.5 0 55.247 0 122.68v267.64C0 457.753 54.747 512.5 122.18 512.5h267.64c67.433 0 122.18-54.747 122.18-122.18z"
            style={{ fill: "#4b4b8a" }}
          />
          <path
            d="M98.039 205.159h56.014q24.663.195 35.741 13.274 11.081 13.076 7.315 35.724-1.46 10.35-6.479 20.303c-3.251 6.697-7.785 12.783-13.377 17.959q-10.45 10.151-22.364 12.884a109.4 109.4 0 0 1-24.663 2.733h-25.08l-7.943 37.091H68.151zm24.454 22.254-12.54 58.564a16 16 0 0 0 2.508.196h2.926q20.065.195 33.441-3.71 13.377-4.1 17.975-28.501 3.762-20.497-7.524-23.621-11.077-3.123-27.798-2.928-2.509.195-4.808.195h-4.389zm107.71-59.54h28.843l-8.151 37.286h25.917q21.318.39 31.769 8.199 10.659 7.808 6.27 29.672l-14.003 65.006h-29.261l13.376-62.078q2.091-9.76-1.254-13.86c-3.344-4.099-7.035-4.099-14.421-4.099l-23.2-.195-17.139 80.232h-28.843zm115.621 37.286h56.014q24.659.195 35.74 13.274 11.082 13.076 7.316 35.724-1.46 10.35-6.48 20.303c-3.251 6.697-7.784 12.783-13.376 17.959q-10.45 10.151-22.364 12.884a109.4 109.4 0 0 1-24.663 2.733H352.93l-7.942 37.091h-29.052zm24.454 22.254-12.541 58.564a16 16 0 0 0 2.508.196h2.927q20.064.195 33.441-3.71 13.376-4.1 17.974-28.501 3.762-20.497-7.524-23.621-11.077-3.12-27.798-2.928a62 62 0 0 1-4.807.195h-4.389z"
            style={{ fill: "#fff", fillRule: "nonzero" }}
          />
        </svg>
      ),
      label: "PHP",
    },
    {
      ref: refL4,
      icon: (
        <svg
          version="1.1"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="lG3764"
              x1="1"
              x2="47"
              gradientTransform="matrix(0 -1 1 0 0 48)"
              gradientUnits="userSpaceOnUse"
            >
              <stop style={{ stopColor: "#efa9a9" }} offset="0" />
              <stop style={{ stopColor: "#f2baba" }} offset="1" />
            </linearGradient>
          </defs>
          <path
            d="m36.31 5c5.859 4.062 9.688 10.831 9.688 18.5 0 12.426-10.07 22.5-22.5 22.5-7.669 0-14.438-3.828-18.5-9.688 1.037 1.822 2.306 3.499 3.781 4.969 4.085 3.712 9.514 5.969 15.469 5.969 12.703 0 23-10.298 23-23 0-5.954-2.256-11.384-5.969-15.469-1.469-1.475-3.147-2.744-4.969-3.781zm4.969 3.781c3.854 4.113 6.219 9.637 6.219 15.719 0 12.703-10.297 23-23 23-6.081 0-11.606-2.364-15.719-6.219 4.16 4.144 9.883 6.719 16.219 6.719 12.703 0 23-10.298 23-23 0-6.335-2.575-12.06-6.719-16.219z"
            style={{ opacity: 0.05 }}
          />
          <path
            d="m41.28 8.781c3.712 4.085 5.969 9.514 5.969 15.469 0 12.703-10.297 23-23 23-5.954 0-11.384-2.256-15.469-5.969 4.113 3.854 9.637 6.219 15.719 6.219 12.703 0 23-10.298 23-23 0-6.081-2.364-11.606-6.219-15.719z"
            style={{ opacity: 0.1 }}
          />
          <path
            d="m31.25 2.375c8.615 3.154 14.75 11.417 14.75 21.13 0 12.426-10.07 22.5-22.5 22.5-9.708 0-17.971-6.135-21.12-14.75a23 23 0 0 0 44.875-7 23 23 0 0 0-16-21.875z"
            style={{ opacity: 0.2 }}
          />
          <path
            d="m24 1c12.703 0 23 10.297 23 23s-10.297 23-23 23-23-10.297-23-23 10.297-23 23-23z"
            style={{ fill: "url(#lG3764)" }}
          />
          <circle cx="25" cy="25" r="15" style={{ opacity: 0.1 }} />
          <circle cx="24" cy="24" r="15" style={{ fill: "#d4201e" }} />
          <path
            d="m23 18c-1.3053 0-2.4159 0.83531-2.8281 2h-4.1719v1.9961h4.1699c0.41013 1.1668 1.5201 2.0039 2.8301 2.0039 0.50339 0 0.97779-0.12436 1.3945-0.34375l3.9492 3.9512c-0.2187 0.41623-0.34375 0.89004-0.34375 1.3926 0 1.656 1.34 3 3 3 1.656 0 3-1.344 3-3s-1.344-3-3-3c-0.50339 0-0.97779 0.12436-1.3945 0.34375l-3.9492-3.9492c0.06727-0.12776 0.12529-0.26065 0.17383-0.39844h2.3398c0.41013 1.1668 1.5201 2.0039 2.8301 2.0039 1.656 0 3-1.344 3-3s-1.344-3-3-3c-1.3053 0-2.4159 0.83531-2.8281 2h-2.3438c-0.4122-1.1647-1.5228-2-2.8281-2z"
            style={{ opacity: 0.1 }}
          />
          <path
            d="m22 17c-1.3053 0-2.4159 0.83531-2.8281 2h-4.1719v1.9961h4.1699c0.41013 1.1668 1.5201 2.0039 2.8301 2.0039 0.50339 0 0.97779-0.12436 1.3945-0.34375l3.9492 3.9512c-0.2187 0.41623-0.34375 0.89004-0.34375 1.3926 0 1.656 1.34 3 3 3 1.656 0 3-1.344 3-3s-1.344-3-3-3c-0.50339 0-0.97779 0.12436-1.3945 0.34375l-3.9492-3.9492c0.067269-0.12776 0.12529-0.26065 0.17383-0.39844h2.3398c0.41013 1.1668 1.5201 2.0039 2.8301 2.0039 1.656 0 3-1.344 3-3s-1.344-3-3-3c-1.3053 0-2.4159 0.83531-2.8281 2h-2.3438c-0.4122-1.1647-1.5228-2-2.8281-2z"
            style={{ fill: "#fceeee" }}
          />
          <path
            d="m40.03 7.531c3.712 4.084 5.969 9.514 5.969 15.469 0 12.703-10.297 23-23 23-5.954 0-11.384-2.256-15.469-5.969 4.178 4.291 10.01 6.969 16.469 6.969 12.703 0 23-10.298 23-23 0-6.462-2.677-12.291-6.969-16.469z"
            style={{ opacity: 0.1 }}
          />
        </svg>
      ),
      label: "Git",
    },
    {
      ref: refL5,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 218.587">
          <path
            fill="#912626"
            d="M245.97 168.36c-13.662 7.121-84.434 36.22-99.501 44.074-15.067 7.856-23.437 7.78-35.34 2.09-11.902-5.69-87.216-36.112-100.783-42.596C3.566 168.687 0 165.952 0 163.368v-25.876s98.05-21.346 113.879-27.024c15.828-5.68 21.32-5.884 34.79-.95 13.472 4.935 94.018 19.468 107.331 24.344l-.006 25.51c.002 2.558-3.07 5.364-10.024 8.988"
          />
          <path
            fill="#c6302b"
            d="M245.965 142.637c-13.661 7.118-84.431 36.218-99.498 44.072-15.066 7.857-23.436 7.78-35.338 2.09-11.903-5.686-87.214-36.113-100.78-42.594-13.566-6.485-13.85-10.948-.524-16.166 13.326-5.22 88.224-34.605 104.055-40.284 15.828-5.677 21.319-5.884 34.789-.948 13.471 4.934 83.819 32.935 97.13 37.81 13.316 4.88 13.827 8.899.166 16.02"
          />
          <path
            fill="#912626"
            d="M245.97 126.49c-13.662 7.122-84.434 36.221-99.501 44.078-15.067 7.854-23.437 7.778-35.34 2.087-11.903-5.687-87.216-36.112-100.783-42.596C3.566 126.818 0 124.086 0 121.502v-25.88S98.05 74.279 113.879 68.6c15.828-5.678 21.32-5.884 34.79-.95C162.142 72.584 242.688 87.114 256 91.991l-.006 25.513c.002 2.557-3.07 5.363-10.024 8.987"
          />
          <path
            fill="#c6302b"
            d="M245.965 100.768c-13.661 7.12-84.431 36.218-99.498 44.075-15.066 7.854-23.436 7.777-35.338 2.087-11.903-5.686-87.214-36.112-100.78-42.594-13.566-6.483-13.85-10.947-.524-16.167C23.151 82.952 98.05 53.565 113.88 47.887c15.828-5.678 21.319-5.884 34.789-.95 13.471 4.935 83.819 32.934 97.13 37.81 13.316 4.88 13.827 8.9.166 16.02"
          />
          <path
            fill="#912626"
            d="M245.97 83.07c-13.662 7.12-84.434 36.22-99.501 44.077-15.067 7.855-23.437 7.778-35.34 2.088-11.903-5.688-87.216-36.114-100.783-42.596C3.566 83.397 0 80.664 0 78.082v-25.88S98.05 30.858 113.879 25.18c15.828-5.679 21.32-5.884 34.79-.95C162.142 29.165 242.688 43.695 256 48.572l-.006 25.512c.002 2.555-3.07 5.361-10.024 8.985"
          />
          <path
            fill="#c6302b"
            d="M245.965 57.346c-13.661 7.12-84.431 36.22-99.498 44.075-15.066 7.854-23.436 7.777-35.338 2.089-11.902-5.688-87.214-36.112-100.78-42.595-13.566-6.483-13.85-10.948-.524-16.167C23.151 39.53 98.05 10.146 113.88 4.466c15.828-5.679 21.319-5.883 34.789-.948 13.471 4.935 83.819 32.934 97.13 37.81 13.316 4.877 13.827 8.898.166 16.018"
          />
          <path
            fill="#fff"
            d="m159.283 32.174-22.01 2.285-4.927 11.855-7.958-13.23L98.973 30.8l18.964-6.838-5.69-10.498 17.755 6.944 16.738-5.48-4.524 10.855 17.067 6.39M131.032 89.691 89.955 72.654l58.86-9.034-17.783 26.071M74.082 38.763c17.375 0 31.46 5.46 31.46 12.195s-14.085 12.195-31.46 12.195-31.46-5.46-31.46-12.195 14.085-12.195 31.46-12.195"
          />
          <path
            fill="#621b1c"
            d="m185.295 35.414 34.836 13.767-34.806 13.752-.03-27.519"
          />
          <path
            fill="#9a2928"
            d="m146.755 50.66 38.54-15.246.03 27.52-3.779 1.478-34.791-13.753"
          />
        </svg>
      ),
      label: "Redis",
    },
  ];

  const rightTechs: TechItem[] = [
    {
      ref: refR1,
      icon: (
        <svg
          width="256px"
          height="256px"
          viewBox="0 0 256 256"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          preserveAspectRatio="xMidYMid"
        >
          <title>Next.js</title>
          <defs>
            <circle id="path-1" cx="128" cy="128" r="128"></circle>
            <linearGradient
              x1="55.6325605%"
              y1="56.3850422%"
              x2="83.2279093%"
              y2="96.0801119%"
              id="nextjsLinearGradient-3"
            >
              <stop stopColor="#FFFFFF" offset="0%"></stop>
              <stop stopColor="#FFFFFF" stopOpacity="0" offset="100%"></stop>
            </linearGradient>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="49.9534722%"
              y2="73.4375%"
              id="nextjsLinearGradient-4"
            >
              <stop stopColor="#FFFFFF" offset="0%"></stop>
              <stop stopColor="#FFFFFF" stopOpacity="0" offset="100%"></stop>
            </linearGradient>
          </defs>
          <g>
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-1"></use>
            </mask>
            <g mask="url(#mask-2)">
              <circle fill="#000000" cx="128" cy="128" r="128"></circle>
              <path
                d="M212.6336,224.028444 L98.3352889,76.8 L76.8,76.8 L76.8,179.157333 L94.0282311,179.157333 L94.0282311,98.6788978 L199.109689,234.446222 C203.851378,231.273244 208.368356,227.790222 212.6336,224.028444 Z"
                fill="url(#nextjsLinearGradient-3)"
              ></path>
              <rect
                fill="url(#nextjsLinearGradient-4)"
                x="163.555556"
                y="76.8"
                width="17.0666667"
                height="102.4"
              ></rect>
            </g>
          </g>
        </svg>
      ),
      label: "Next.JS",
    },
    {
      ref: refR2,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
          <path
            fill="#00acd7"
            d="M62.55 47.98c-1.99 0-3.83 1.512-4.122 3.376-.272 1.851 1.19 3.386 3.187 3.386 1.998 0 3.85-1.523 4.098-3.387.247-1.863-1.171-3.374-3.162-3.374zm-25.552 1.954-4.924 29.66h7.166l1.97-11.916h11.788l.984-5.84H42.195l.985-6.082h13.074l.986-5.822H36.998zm31.326 0-4.916 29.658h7.006l.58-3.608h.276c.52 2.057 2.2 3.924 5.558 3.924 4.924 0 9.557-3.851 10.803-11.424 1.31-7.847-2.287-11.423-6.936-11.423-3.518 0-5.82 2.053-6.978 4.095h-.152l1.837-11.222h-7.078zm57.735 7.115c-2.433 0-4.618 1.414-5.936 4.353h-.23l.685-4.054h-6.87l-3.706 22.242h7.08l1.998-12.076c.462-2.65 2.636-4.432 5.14-4.432.884 0 2.086.131 2.737.377L128 57.291a8.417 8.417 0 0 0-1.941-.242zm-24.66.014c-6.705 0-11.804 4.604-12.946 11.495-1.202 7.107 2.359 11.451 9.342 11.461 5.861 0 10.105-2.823 11.682-7.197l-6.457-.187c-.808 1.49-2.405 2.273-4.245 2.273-2.765 0-4.096-1.643-3.648-4.467l.045-.26h14.81l.278-1.767c1.216-7.313-2.548-11.352-8.862-11.352zm-43.83.285L53.866 79.59h7.082l3.7-22.242h-7.08zm-48.055.459-1.85 2.623 24.53-.014.427-2.61H9.514zm91.232 4.367c2.316 0 3.679 1.622 3.317 3.894h-8.14c.508-2.2 2.535-3.894 4.823-3.894zm-23.482.424c2.628 0 3.664 2.29 3.092 5.88-.572 3.59-2.434 5.922-5.04 5.922-2.592 0-3.706-2.326-3.12-5.922.578-3.634 2.475-5.88 5.068-5.88zm-75.362.646L0 65.857l31.377-.023.428-2.59H1.902zm16.31 5.436-1.718 2.623 14.067-.01.427-2.613H18.213z"
          />
        </svg>
      ),
      label: "Fiber",
    },
    {
      ref: refR3,
      icon: (
        <svg
          width="256px"
          height="264px"
          viewBox="0 0 256 264"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          preserveAspectRatio="xMidYMid"
        >
          <g>
            <path
              d="M255.855641,59.619717 C255.950565,59.9710596 256,60.3333149 256,60.6972536 L256,117.265345 C256,118.743206 255.209409,120.108149 253.927418,120.843385 L206.448786,148.178786 L206.448786,202.359798 C206.448786,203.834322 205.665123,205.195421 204.386515,205.937838 L105.27893,262.990563 C105.05208,263.119455 104.804608,263.201946 104.557135,263.289593 C104.464333,263.320527 104.376687,263.377239 104.278729,263.403017 C103.585929,263.58546 102.857701,263.58546 102.164901,263.403017 C102.051476,263.372083 101.948363,263.310215 101.840093,263.26897 C101.613244,263.186479 101.376082,263.1143 101.159544,262.990563 L2.07258227,205.937838 C0.7913718,205.201819 0,203.837372 0,202.359798 L0,32.6555248 C0,32.2843161 0.0515567729,31.9234187 0.144358964,31.5728326 C0.175293028,31.454252 0.24747251,31.3459828 0.288717928,31.2274022 C0.366053087,31.0108638 0.438232569,30.7891697 0.55165747,30.5880982 C0.628992629,30.4540506 0.742417529,30.3457814 0.83521972,30.2220451 C0.953800298,30.0570635 1.06206952,29.8869261 1.20127281,29.7425672 C1.31985339,29.6239866 1.4745237,29.5363401 1.60857131,29.4332265 C1.75808595,29.3094903 1.89213356,29.1754427 2.06227091,29.0774848 L2.06742659,29.0774848 L51.6134853,0.551122364 C52.8901903,-0.183535768 54.4613221,-0.183535768 55.7380271,0.551122364 L105.284086,29.0774848 L105.294397,29.0774848 C105.459379,29.1805983 105.598582,29.3094903 105.748097,29.4280708 C105.882144,29.5311844 106.031659,29.6239866 106.15024,29.7374115 C106.294599,29.8869261 106.397712,30.0570635 106.521448,30.2220451 C106.609095,30.3457814 106.727676,30.4540506 106.799855,30.5880982 C106.918436,30.7943253 106.985459,31.0108638 107.06795,31.2274022 C107.109196,31.3459828 107.181375,31.454252 107.212309,31.5779883 C107.307234,31.9293308 107.355765,32.2915861 107.356668,32.6555248 L107.356668,138.651094 L148.643332,114.878266 L148.643332,60.6920979 C148.643332,60.3312005 148.694889,59.9651474 148.787691,59.619717 C148.823781,59.4959808 148.890804,59.3877116 148.93205,59.269131 C149.014541,59.0525925 149.08672,58.8308984 149.200145,58.629827 C149.27748,58.4957794 149.390905,58.3875102 149.478552,58.2637739 C149.602288,58.0987922 149.705401,57.9286549 149.84976,57.7842959 C149.968341,57.6657153 150.117856,57.5780688 150.251903,57.4749553 C150.406573,57.351219 150.540621,57.2171714 150.705603,57.1192136 L150.710758,57.1192136 L200.261973,28.5928511 C201.538395,27.8571345 203.110093,27.8571345 204.386515,28.5928511 L253.932573,57.1192136 C254.107866,57.2223271 254.241914,57.351219 254.396584,57.4697996 C254.525476,57.5729132 254.674991,57.6657153 254.793572,57.7791402 C254.93793,57.9286549 255.041044,58.0987922 255.16478,58.2637739 C255.257582,58.3875102 255.371007,58.4957794 255.443187,58.629827 C255.561767,58.8308984 255.628791,59.0525925 255.711282,59.269131 C255.757683,59.3877116 255.824707,59.4959808 255.855641,59.619717 Z M247.740605,114.878266 L247.740605,67.8378666 L230.402062,77.8192579 L206.448786,91.6106946 L206.448786,138.651094 L247.745761,114.878266 L247.740605,114.878266 Z M198.194546,199.97272 L198.194546,152.901386 L174.633101,166.357704 L107.351512,204.757188 L107.351512,252.27191 L198.194546,199.97272 Z M8.25939501,39.7961379 L8.25939501,199.97272 L99.0921175,252.266755 L99.0921175,204.762344 L51.6392637,177.906421 L51.6237967,177.89611 L51.603174,177.885798 C51.443348,177.792996 51.3093004,177.658949 51.1597857,177.545524 C51.0308938,177.44241 50.8813791,177.359919 50.7679542,177.246494 L50.7576429,177.231027 C50.6235953,177.102135 50.5307931,176.942309 50.4173682,176.79795 C50.3142546,176.658747 50.1905184,176.540167 50.1080276,176.395808 L50.1028719,176.380341 C50.0100697,176.22567 49.9533572,176.040066 49.8863334,175.864773 C49.8193096,175.710103 49.7316631,175.565744 49.6904177,175.400762 L49.6904177,175.395606 C49.6388609,175.19969 49.6285496,174.993463 49.6079269,174.792392 C49.5873041,174.637722 49.5460587,174.483051 49.5460587,174.328381 L49.5460587,174.31807 L49.5460587,63.5689658 L25.5979377,49.7723734 L8.25939501,39.8012935 L8.25939501,39.7961379 Z M53.6809119,8.89300821 L12.3994039,32.6555248 L53.6706006,56.4180414 L94.9469529,32.6503692 L53.6706006,8.89300821 L53.6809119,8.89300821 Z M75.1491521,157.19091 L99.0972731,143.404629 L99.0972731,39.7961379 L81.7587304,49.7775291 L57.8054537,63.5689658 L57.8054537,167.177457 L75.1491521,157.19091 Z M202.324244,36.934737 L161.047891,60.6972536 L202.324244,84.4597702 L243.59544,60.6920979 L202.324244,36.934737 Z M198.194546,91.6106946 L174.24127,77.8192579 L156.902727,67.8378666 L156.902727,114.878266 L180.850848,128.664547 L198.194546,138.651094 L198.194546,91.6106946 Z M103.216659,197.616575 L163.759778,163.052915 L194.023603,145.781396 L152.778185,122.034346 L105.289242,149.374903 L62.0073307,174.292291 L103.216659,197.616575 Z"
              fill="#FF2D20"
            ></path>
          </g>
        </svg>
      ),
      label: "Laravel",
    },
    {
      ref: refR4,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-github"
          viewBox="0 0 16 16"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
        </svg>
      ),
      label: "GitHub",
    },
    {
      ref: refR5,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinejoin: "round",
            strokeMiterlimit: "2",
          }}
          viewBox="0 0 512 512"
        >
          <path
            d="M512 122.18C512 54.747 457.253 0 389.82 0H122.18C54.747 0 0 54.747 0 122.18v267.64C0 457.253 54.747 512 122.18 512h267.64C457.253 512 512 457.253 512 389.82z"
            style={{ fill: "#008bf2" }}
          />
          <path
            d="M459.011 239.597c-8.714-6.046-28.683-8.313-44.294-5.29-1.815-15.114-10.165-28.34-24.688-40.054l-8.349-6.045-5.811 8.69c-7.259 11.336-10.89 27.207-9.802 42.321.363 5.291 2.178 14.738 7.624 23.051-5.081 3.021-15.611 6.8-29.406 6.8H81.793l-.727 3.023c-2.541 15.116-2.541 62.349 27.23 98.624 22.51 27.584 55.912 41.566 99.841 41.566 95.122 0 165.554-45.722 198.593-128.475 13.07.378 41.026 0 55.184-28.34.363-.756 1.09-2.267 3.631-7.935l1.453-3.023zm-167.37-106.558h-39.937v37.787h39.937zm0 45.344h-39.937v37.787h39.937zm-47.199 0h-39.936v37.787h39.936zm-47.197 0h-39.936v37.787h39.936zm-47.197 45.345h-39.936v37.786h39.936zm47.197 0h-39.936v37.786h39.936zm47.197 0h-39.936v37.786h39.936zm47.199 0h-39.937v37.786h39.937zm47.198 0h-39.938v37.786h39.938z"
            style={{ fill: "#fff", fillRule: "nonzero" }}
          />
        </svg>
      ),
      label: "Docker",
    },
  ];

  const leftBeamColors = [
    { start: "#fff085", stop: "oklch(85.2% 0.199 91.936)" },
    { start: "oklch(91.7% 0.08 205.041)", stop: "oklch(78.9% 0.154 211.53)" },
    { start: "oklch(67.3% 0.182 276.935)", stop: "oklch(58.5% 0.233 277.117)" },
    { start: "#f05033", stop: "#cc2900" },
    { start: "#ff6b6b", stop: "#cc0000" },
    { start: "#38bdf8", stop: "#0ea5e9" },
  ];

  const rightBeamColors = [
    { start: "#e4e4e7", stop: "#9f9fa9" },
    { start: "oklch(68.5% 0.169 237.323)", stop: "oklch(58.8% 0.158 241.966)" },
    { start: "oklch(80.8% 0.114 19.571)", stop: "oklch(70.4% 0.191 22.216)" },
    { start: "#d4d4d4", stop: "#a3a3a3" },
    { start: "#2496ed", stop: "#1a6eb5" },
    { start: "#e4e4e7", stop: "#9f9fa9" },
  ];

  const leftCurvatures = [80, 50, 20, 0, -20, -50, -80];
  const rightCurvatures = [-80, -50, -20, 0, 20, 50, 80];

  const leftRefs = [refL1, refL2, refL3, refL4, refL5];
  const rightRefs = [refR1, refR2, refR3, refR4, refR5];

  return (
    <div
      className={`relative  flex flex-col items-center justify-center w-full overflow-hidden ${className}`}
      style={{
        height: 600,
        background: "transparent",
        borderRadius: 16,
      }}
    >
      <ShinyText
        text="Tech Stack"
        disabled={false}
        speed={2.5}
        className="text-5xl font-bold"
      />
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
      >
        <div
          className="absolute left-[6%] flex flex-col gap-5 justify-center"
          style={{ height: "100%" }}
        >
          {leftTechs.map((t, i) => (
            <IconCircle key={i} ref={t.ref} icon={t.icon} label={t.label} />
          ))}
        </div>

        <div
          className="absolute right-[6%] flex flex-col gap-5 justify-center"
          style={{ height: "100%" }}
        >
          {rightTechs.map((t, i) => (
            <IconCircle key={i} ref={t.ref} icon={t.icon} label={t.label} />
          ))}
        </div>
        <div
          className="relative flex items-center justify-center"
          style={{ width: 200, height: 200 }}
        >
          <OrbitRing
            radius={60}
            duration={8}
            color="#94A3B8"
            opacity={0.55}
            dotSize={4}
          >
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#F1F5F9",
                boxShadow:
                  "0 0 8px 3px rgba(241,245,249,0.9), 0 0 18px 5px rgba(148,163,184,0.35)",
              }}
            />
          </OrbitRing>

          <OrbitRing
            radius={80}
            duration={12}
            reverse
            color="#475569"
            opacity={0.4}
            dotSize={3}
          >
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#CBD5E1",
                boxShadow:
                  "0 0 6px 2px rgba(203,213,225,0.75), 0 0 14px 4px rgba(71,85,105,0.3)",
              }}
            />
          </OrbitRing>

          <motion.div
            style={{
              position: "absolute",
              width: 180,
              height: 180,
              borderRadius: "50%",
              border: "1.5px dashed rgba(148,163,184,0.28)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            style={{
              position: "absolute",
              width: 140,
              height: 140,
              borderRadius: "50%",
              border: "1px dashed rgba(100,116,139,0.2)",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />

          <CenterLogo ref={centerRef} />
        </div>

        {(leftRefs as RefObject<HTMLDivElement | null>[]).map((r, i) => (
          <AnimatedBeam
            key={`L${i}`}
            containerRef={containerRef}
            fromRef={r}
            toRef={centerRef}
            curvature={leftCurvatures[i]}
            duration={6 + i * 0.8}
            delay={i * 0.5}
            gradientStartColor={leftBeamColors[i].start}
            gradientStopColor={leftBeamColors[i].stop}
            pathColor="oklch(27.4% 0.006 286.033)"
          />
        ))}

        {(rightRefs as RefObject<HTMLDivElement | null>[]).map((r, i) => (
          <AnimatedBeam
            key={`R${i}`}
            containerRef={containerRef}
            fromRef={r}
            toRef={centerRef}
            reverse
            curvature={rightCurvatures[i]}
            duration={6 + i * 0.8}
            delay={i * 0.5 + 0.25}
            gradientStartColor={rightBeamColors[i].start}
            gradientStopColor={rightBeamColors[i].stop}
            pathColor="oklch(27.4% 0.006 286.033)"
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#f4f4f5",
            boxShadow: "0 0 6px #00d4ff",
          }}
        />
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.15em",
            fontFamily: "monospace",
            textTransform: "uppercase",
          }}
          className="text-zinc-200 truncate"
        >
          Tech Stack Convergence
        </span>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#f4f4f5",
            boxShadow: "0 0 6px #00d4ff",
          }}
        />
      </div>
    </div>
  );
}

export default TechStackConvergence;
