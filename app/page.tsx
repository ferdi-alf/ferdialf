"use client";
import LightRays from "@/components/LightRays";
import About from "@/sections/About";

import Main from "@/sections/Main";
import { useEffect, useState } from "react";

export default function Home() {
  const [animate, setAnimate] = useState(true);
  const [rayLength, setRayLength] = useState(2);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setRayLength(5);
      } else {
        setRayLength(2);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      setAnimate(scrollY < viewportHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {animate && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "",
            top: 0,
            left: 0,
            zIndex: 0,
            pointerEvents: "none",
            transform: "translateZ(0)",
            willChange: "opacity",

            animation: "fadeInDarkVeil 2s ease-in-out forwards",
          }}
        >
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={0.5}
            rayLength={rayLength}
            fadeDistance={1.3}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="ease"
            followMouse={false}
          />
        </div>
      )}
      <div className=" z-10 bg-[132, 0, 255]  w-full flex items-center mt-24 flex-col">
        <>
          <div className="">
            <Main />
          </div>
          <About
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={false}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={13}
          />
        </>
      </div>
    </>
  );
}
