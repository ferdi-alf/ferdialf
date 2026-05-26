"use client";

import * as React from "react";

import {
  ThreeDMarquee,
  MarqueeImage,
} from "@/components/lightswind/3d-marquee";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { ShineButton } from "@/components/lightswind/shine-button";
import ShinyText from "@/components/ui/ShinyText";
import { BorderBeam } from "@/components/lightswind/border-beam";
import ProjectsDrawerContent from "@/components/Projects/ProjectsDrawerContent";

const VisuallyHidden = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      border: 0,
      clip: "rect(0 0 0 0)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      width: "1px",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

const images: MarqueeImage[] = [
  { src: "/images/projects/1.png", alt: "Project One" },
  { src: "/images/projects/2.png", alt: "Project Two" },
  { src: "/images/projects/3.png", alt: "Project Three" },
  { src: "/images/projects/4.png", alt: "Project Four" },
  { src: "/images/projects/5.png", alt: "Project Five" },
  { src: "/images/projects/6.png", alt: "Project Six" },
  { src: "/images/projects/7.png", alt: "Project Six" },
  { src: "/images/projects/8.png", alt: "Project Six" },
  { src: "/images/projects/9.png", alt: "Project Six" },
];

export default function ProjectsSection() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-10 md:py-16 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="flex flex-col gap-5">
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.18em] text-white/30 uppercase font-mono">
            <span className="w-5 h-px bg-white/20" />
            Selected Works
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-[3rem] font-bold leading-[1.1] tracking-tight">
            <span className="text-white/90">Projects Built</span>{" "}
            <ShinyText text="With Purpose." className="text-white/55 " />
          </h2>

          <p className="text-sm md:text-base text-white/35 leading-relaxed max-w-sm">
            A curated collection of fullstack applications — from production
            systems to experimental builds. Each one shipped, refined, and
            battle-tested with real clients.
          </p>

          <div className="flex gap-7 pt-1">
            <div>
              <div className="text-xl font-semibold text-white/80">28+</div>
              <div className="text-xs text-white/25 tracking-wide mt-0.5">
                Projects Delivered
              </div>
            </div>
            <div className="w-px bg-white/8" />
            <div>
              <div className="text-xl font-semibold text-white/80">3</div>
              <div className="text-xs text-white/25 tracking-wide mt-0.5">
                Years Active
              </div>
            </div>
            <div className="w-px bg-white/8" />
            <div>
              <div className="text-xl font-semibold text-white/80">5+</div>
              <div className="text-xs text-white/25 tracking-wide mt-0.5">
                Tech Stacks
              </div>
            </div>
          </div>

          <div className="pt-1 md:block hidden">
            <ShineButton
              label="Explore Projects"
              size="lg"
              bgColor="linear-gradient(325deg, hsl(0 0% 18%) 0%, hsl(0 0% 32%) 50%, hsl(0 0% 14%) 100%)"
              onClick={() => setIsOpen(true)}
            />
          </div>
        </div>

        <div
          className="w-full relative rounded-2xl"
          style={{
            filter:
              "drop-shadow(0 12px 40px rgba(0,0,0,0.6)) drop-shadow(0 2px 8px rgba(0,0,0,0.5))",
          }}
        >
          <BorderBeam
            colorFrom="#7400ff"
            colorTo="#9b41ff"
            size={100}
            duration={6}
            delay={2}
            borderThickness={2}
            glowIntensity={0.8}
          />

          <div
            style={{
              borderRadius: 20,
              padding: "1px",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 40%, rgba(0,0,0,0.6) 100%)",
            }}
          >
            <div
              className="backdrop-blur-md overflow-hidden"
              style={{
                borderRadius: 19,
                background:
                  "linear-gradient(160deg, rgba(16,16,20,0.98) 0%, rgba(10,10,14,0.99) 60%, rgba(6,6,10,1) 100%)",
                boxShadow: [
                  "inset 0 1px 0 rgba(255,255,255,0.08)",
                  "inset 1px 0 0 rgba(255,255,255,0.04)",
                  "inset 0 -1px 0 rgba(0,0,0,0.6)",
                  "inset -1px 0 0 rgba(0,0,0,0.4)",
                ].join(", "),
              }}
            >
              <div className="p-2.5">
                <div
                  className="relative w-full md:h-90 h-60 overflow-hidden"
                  style={{ borderRadius: 14 }}
                >
                  <div className="w-full h-full [&_section]:bg-transparent [&_section]:7dark:bg-transparent">
                    <ThreeDMarquee images={images} />
                  </div>

                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: [
                        "linear-gradient(to top,    rgba(8,8,14,0.97) 0%, rgba(8,8,14,0.7) 35%, transparent 60%)",
                        "linear-gradient(to bottom, rgba(8,8,14,0.85) 0%, rgba(8,8,14,0.4) 18%, transparent 40%)",
                        "linear-gradient(to right,  rgba(8,8,14,0.7) 0%, rgba(8,8,14,0.2) 15%, transparent 35%)",
                        "linear-gradient(to left,   rgba(8,8,14,0.7) 0%, rgba(8,8,14,0.2) 15%, transparent 35%)",
                      ].join(", "),
                    }}
                  />

                  <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center gap-2.5 pb-5 px-6">
                    <p className="text-[10px] text-white/25 tracking-[0.2em] uppercase font-mono">
                      Preview all works
                    </p>
                    <ShineButton
                      label="View Project Details"
                      size="md"
                      bgColor="linear-gradient(325deg, hsl(0 0% 18%) 0%, hsl(0 0% 32%) 50%, hsl(0 0% 14%) 100%)"
                      onClick={() => setIsOpen(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── DRAWER (bottom) ── */}
      <Drawer open={isOpen} onOpenChange={setIsOpen} direction="bottom">
        <DrawerContent className="h-[80vh] flex justify-center items-center">
          <VisuallyHidden>
            <DrawerTitle>Project Details</DrawerTitle>{" "}
          </VisuallyHidden>
          <ProjectsDrawerContent isOpen={isOpen} />
        </DrawerContent>
      </Drawer>
    </section>
  );
}
