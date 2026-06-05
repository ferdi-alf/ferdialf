export interface JourneyItem {
  id: string;
  text: string;
  done: boolean;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
}

export interface StatCard {
  id: string;
  value: string;
  unit: string;
  sub: string;
}

export interface AboutApiData {
  journey: JourneyItem[];
  socials: SocialLink[];
  stats: StatCard[];
}

export type Pt = { x: number; y: number };

export interface BeamPath {
  id: string;
  d: string;
  color: string;
  duration: number;
  delay: number;
}

export interface StaticPath {
  id: string;
  d: string;
  baseColor: string;
  beamColor: string;
  duration: number;
  delay: number;
}

export interface StubTrace {
  id: string;
  d: string;
  endPt: Pt;
  color: string;
}

export interface SceneData {
  w: number;
  h: number;
  beams: BeamPath[];
  statics: StaticPath[];
  stubs: StubTrace[];
}
