/* eslint-disable react-hooks/refs */
"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "./ui/animated-beam";
import { useAbout } from "@/hooks/useAbout";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; onClick?: () => void }
>(({ className, children, onClick }, ref) => {
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={cn(
        "border-border z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        onClick &&
          "cursor-pointer hover:scale-110 transition-transform duration-200",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export default function Connect({ className }: { className?: string }) {
  const { data, loading } = useAbout();
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const socialRefs = useRef<(HTMLDivElement | null)[]>([]);
  const freelanceRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div
        className={cn(
          "relative flex h-[500px] w-full items-center justify-center",
          className
        )}
      >
        <p className="text-white">Loading connections...</p>
      </div>
    );
  }

  if (!data) return null;

  const socialLinks = data.connect.social || [];
  const freelancePlatforms = data.connect.freelancePlarforms || [];

  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full items-center justify-center overflow-hidden p-10",
        className
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-w-4xl flex-row items-center justify-between gap-10">
        <div className="flex flex-col justify-center gap-8 flex-1">
          <div className="flex flex-col gap-2">
            {socialLinks.map((social, index) => (
              <Circle
                key={`social-${index}`}
                ref={(el) => {
                  socialRefs.current[index] = el;
                }}
                onClick={() => handleLinkClick(social.link)}
              >
                {social.name.toLowerCase().includes("instagram") ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 256 256"
                  >
                    <g fill="none">
                      <rect
                        width={256}
                        height={256}
                        fill="url(#SVGWRUqebek)"
                        rx={60}
                      ></rect>
                      <rect
                        width={256}
                        height={256}
                        fill="url(#SVGfkNpldMH)"
                        rx={60}
                      ></rect>
                      <path
                        fill="#fbfbfb"
                        d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396s-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413s.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5s6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355s22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334s-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334"
                        strokeWidth={6.5}
                        stroke="#fbfbfb"
                      ></path>
                      <defs>
                        <radialGradient
                          id="SVGWRUqebek"
                          cx={0}
                          cy={0}
                          r={1}
                          gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#fd5"></stop>
                          <stop offset={0.1} stopColor="#fd5"></stop>
                          <stop offset={0.5} stopColor="#ff543e"></stop>
                          <stop offset={1} stopColor="#c837ab"></stop>
                        </radialGradient>
                        <radialGradient
                          id="SVGfkNpldMH"
                          cx={0}
                          cy={0}
                          r={1}
                          gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#3771c8"></stop>
                          <stop offset={0.128} stopColor="#3771c8"></stop>
                          <stop
                            offset={1}
                            stopColor="#60f"
                            stopOpacity={0}
                          ></stop>
                        </radialGradient>
                      </defs>
                    </g>
                  </svg>
                ) : social.name.toLowerCase().includes("linkedin") ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 256 256"
                  >
                    <g fill="none">
                      <rect
                        width={256}
                        height={256}
                        fill="#fbfbfb"
                        rx={60}
                        strokeWidth={6.5}
                        stroke="#fbfbfb"
                      ></rect>
                      <rect
                        width={256}
                        height={256}
                        fill="#0a66c2"
                        rx={60}
                        strokeWidth={6.5}
                        stroke="#0a66c2"
                      ></rect>
                      <path
                        fill="#fbfbfb"
                        d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4"
                        strokeWidth={6.5}
                        stroke="#fbfbfb"
                      ></path>
                    </g>
                  </svg>
                ) : (
                  <div
                    className="w-6 h-6 flex items-center justify-center"
                    dangerouslySetInnerHTML={{
                      __html: social.logo
                        .trim()
                        .replace(/>\s+</g, "><")
                        .replace(/stroke="[^"]*"/g, "")
                        .replace(/strokeWidth="[^"]*"/g, "")
                        .replace(/width="\d+"/g, 'width="24"')
                        .replace(/height="\d+"/g, 'height="24"'),
                    }}
                  />
                )}
              </Circle>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {freelancePlatforms.map((platform, index) => (
              <Circle
                key={`freelance-${index}`}
                ref={(el) => {
                  freelanceRefs.current[index] = el;
                }}
                onClick={() => handleLinkClick(platform.link)}
              >
                <div
                  className="w-6 h-6 flex items-center justify-center"
                  dangerouslySetInnerHTML={{
                    __html: platform.logo
                      .trim()
                      .replace(/>\s+</g, "><")
                      .replace(/stroke="[^"]*"/g, "")
                      .replace(/strokeWidth="[^"]*"/g, "")
                      .replace(/width="\d+"/g, 'width="24"')
                      .replace(/height="\d+"/g, 'height="24"'),
                  }}
                />
              </Circle>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Circle ref={centerRef} className="opacity-0 pointer-events-none">
            <div className="w-6 h-6" />
          </Circle>
        </div>

        <div className="flex flex-col justify-center">
          <Circle ref={userRef}>
            <Icons.user />
          </Circle>
        </div>
      </div>

      {socialLinks.map((_, index) => (
        <AnimatedBeam
          pathColor="#fff"
          key={`beam-social-${index}`}
          containerRef={containerRef}
          fromRef={{ current: socialRefs.current[index] }}
          toRef={centerRef}
        />
      ))}

      {freelancePlatforms.map((_, index) => (
        <AnimatedBeam
          key={`beam-freelance-${index}`}
          containerRef={containerRef}
          fromRef={{ current: freelanceRefs.current[index] }}
          toRef={centerRef}
          pathColor="white"
          pathWidth={2}
          duration={3}
        />
      ))}

      <AnimatedBeam
        pathColor="#fff"
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={userRef}
      />
    </div>
  );
}

const Icons = {
  user: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};
