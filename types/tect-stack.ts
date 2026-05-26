import { RefObject, ReactNode } from "react";

export interface AnimatedBeamProps {
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

export interface OrbitRingProps {
  radius: number;
  duration: number;
  reverse?: boolean;
  color?: string;
  opacity?: number;
  dotSize?: number;
  children?: ReactNode;
}

export interface IconCircleProps {
  icon: ReactNode;
  label?: string;
  size?: number;
}

export interface TechItem {
  icon: ReactNode;
  label: string;
}

export interface BeamColor {
  start: string;
  stop: string;
}
