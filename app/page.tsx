"use client";
import LightRays from "@/components/LightRays";
import About from "@/sections/About";
import CareetPath from "@/sections/CareerPath";

import Main from "@/sections/Main";
import { useEffect, useState } from "react";

export default function Home() {
  const [shouldShow, setShouldShow] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 50);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      const newShouldShow = scrollY < viewportHeight;

      if (newShouldShow !== shouldShow) {
        if (!newShouldShow) {
          setIsVisible(false);
          setTimeout(() => setShouldShow(false), 600);
        } else {
          setShouldShow(true);
          setTimeout(() => setIsVisible(true), 50);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldShow]);

  return (
    <>
      {shouldShow && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 0,
            pointerEvents: "none",
            transform: "translateZ(0)",
            willChange: "opacity",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.6s ease-in-out",
          }}
        >
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={0.5}
            rayLength={1}
            fadeDistance={2}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            followMouse={false}
          />
        </div>
      )}
      <div className=" z-10 bg-[132, 0, 255]  w-full flex items-center mt-24 flex-col">
        <Main />

        <About />
        <CareetPath />
      </div>
    </>
  );
}
