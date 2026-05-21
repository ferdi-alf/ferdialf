"use client";

import * as React from "react";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { ShineButton } from "@/components/lightswind/shine-button";
import ShinyText from "@/components/ui/ShinyText";
import CertificatesDrawerContent from "@/components/CertificatesDrawerContent";

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

function PreviewStack({ srcs }: { srcs: string[] }) {
  const rotations = [-6, 1, 7];
  const offsets = [
    "-translate-y-3 -translate-x-2",
    "translate-y-0",
    "translate-y-2 translate-x-2",
  ];

  return (
    <div className="relative w-60  h-44 md:w-92 md:h-72 mx-auto pr-8 sm:pr-0">
      {srcs.slice(0, 3).map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 rounded-xl overflow-hidden border border-white/[0.07] shadow-2xl ${offsets[i]}`}
          style={{
            transform: `rotate(${rotations[i]}deg)`,
            zIndex: i,
            background:
              "linear-gradient(160deg, rgba(39,39,42,0.9) 0%, rgba(18,18,22,0.98) 100%)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
          }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover opacity-70"
            draggable={false}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default function CertificationsSection() {
  const [isOpen, setIsOpen] = React.useState(false);

  const previewSrcs = [
    "/images/certificates/5.png",
    "/images/certificates/2.png",
    "/images/certificates/1.png",
  ];

  return (
    <section className="w-full min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="flex flex-col gap-5  lg:order-1">
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.18em] text-white/30 uppercase font-mono">
            <span className="w-5 h-px bg-white/20" />
            Credentials
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-[3rem] font-bold leading-[1.1] tracking-tight">
            <span className="text-white/90">Recognition &</span>{" "}
            <ShinyText text="Expertise." className="text-white/50" />
          </h2>

          <p className="text-sm md:text-base text-white/35 leading-relaxed max-w-sm">
            A collection of verified credentials, competition awards, and
            professional certifications earned across software engineering,
            cloud, and web development.
          </p>

          <div className="flex gap-7 pt-1">
            <div>
              <div className="text-xl font-semibold text-white/80">11</div>
              <div className="text-xs text-white/25 tracking-wide mt-0.5">
                Credentials
              </div>
            </div>
            <div className="w-px bg-white/8" />
            <div>
              <div className="text-xl font-semibold text-white/80">3</div>
              <div className="text-xs text-white/25 tracking-wide mt-0.5">
                Competition Awards
              </div>
            </div>
            <div className="w-px bg-white/8" />
            <div>
              <div className="text-xl font-semibold text-white/80">2</div>
              <div className="text-xs text-white/25 tracking-wide mt-0.5">
                National Recognition
              </div>
            </div>
          </div>

          <div className="pt-1 md:block hidden">
            <ShineButton
              label="View All Credentials"
              size="lg"
              bgColor="linear-gradient(325deg, hsl(0 0% 18%) 0%, hsl(0 0% 32%) 50%, hsl(0 0% 14%) 100%)"
              onClick={() => setIsOpen(true)}
            />
          </div>
        </div>

        <div className=" lg:order-2 flex flex-col items-center gap-6">
          <PreviewStack srcs={previewSrcs} />

          <div className="md:hidden">
            <ShineButton
              label="View All Credentials"
              size="md"
              bgColor="linear-gradient(325deg, hsl(0 0% 18%) 0%, hsl(0 0% 32%) 50%, hsl(0 0% 14%) 100%)"
              onClick={() => setIsOpen(true)}
            />
          </div>
        </div>
      </div>

      <Drawer open={isOpen} onOpenChange={setIsOpen} direction="bottom">
        <DrawerContent className="h-[85vh]">
          <VisuallyHidden>
            <DrawerTitle>Credentials</DrawerTitle>
          </VisuallyHidden>
          <CertificatesDrawerContent isOpen={isOpen} />
        </DrawerContent>
      </Drawer>
    </section>
  );
}
