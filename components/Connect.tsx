"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "./ui/animated-beam";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex w-full max-w-[500px] items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      <div className="flex size-full flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row justify-between">
          <Circle ref={div1Ref}>
            <Icons.email />
          </Circle>
          <Circle ref={div2Ref}>
            <Icons.instagram />
          </Circle>
          <Circle ref={div3Ref}>
            <Icons.threads />
          </Circle>
          <Circle ref={div4Ref}>
            <Icons.github />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        duration={2.5}
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        pathColor="red"
        gradientStartColor="#ff0000"
        gradientStopColor="#ff6666"
      />
      <AnimatedBeam
        duration={2}
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div1Ref}
        pathColor="blue"
        gradientStartColor="#0000ff"
        gradientStopColor="#6666ff"
      />
    </div>
  );
}

const Icons = {
  instagram: () => (
    <a href="https://instagram.com/eternalferr_?igsh=MXNmcXI1cGE2dWJkYw==">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
      >
        <path
          fill="#000"
          d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
          strokeWidth={0.1}
          stroke="#000"
        ></path>
      </svg>
    </a>
  ),
  github: () => (
    <a href="https://github.com/ferdi-alf">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
      >
        <path
          fill="#000"
          d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
          strokeWidth={0.1}
          stroke="#000"
        ></path>
      </svg>
    </a>
  ),
  email: () => (
    <a href="mailto:ferdialfianferdi.08@gmai.com">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
      >
        <path
          fill="#000"
          d="M20 18h-2V9.25L12 13L6 9.25V18H4V6h1.2l6.8 4.25L18.8 6H20m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"
          strokeWidth={0.1}
          stroke="#000"
        ></path>
      </svg>
    </a>
  ),
  threads: () => (
    <a href="https://www.threads.com/@eternalferr_?invite=0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
      >
        <g fill="none" fillRule="evenodd">
          <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
          <path
            fill="#000"
            d="M5.45 4.623C6.997 2.974 9.24 2 12.017 2c4.565 0 7.592 2.631 8.55 6.277a1 1 0 0 1-1.935.508C17.905 6.022 15.676 4 12.016 4c-2.286 0-3.98.789-5.106 1.99c-1.136 1.212-1.769 2.923-1.769 4.885v2.25c0 1.962.633 3.673 1.769 4.884C8.036 19.212 9.73 20 12.016 20c1.655 0 2.968-.384 3.976-1.005c1.015-.625 1.62-1.454 1.79-2.405c.195-1.096-.045-1.848-.458-2.391a3.2 3.2 0 0 0-.814-.741c-.135.749-.376 1.456-.74 2.01c-1.342 2.039-3.908 2.214-5.6 1.539c-.916-.365-1.701-1.364-1.945-2.435a3 3 0 0 1 .141-1.843c.265-.636.756-1.178 1.455-1.59c.692-.409 1.72-.597 2.739-.625c.614-.017 1.28.024 1.95.133c-.14-.65-.377-1.135-.644-1.384c-.484-.45-1.286-.767-2.09-.762c-.777.006-1.436.305-1.83.935a1 1 0 1 1-1.696-1.06c.837-1.338 2.216-1.865 3.513-1.875c1.27-.009 2.578.472 3.466 1.298c.898.836 1.284 2.207 1.384 3.454c.874.381 1.7.94 2.305 1.737c.781 1.03 1.117 2.358.833 3.951c-.29 1.624-1.315 2.898-2.71 3.757C15.673 21.54 13.985 22 12.016 22c-2.776 0-5.02-.974-6.565-2.623c-1.536-1.638-2.31-3.864-2.31-6.252v-2.25c0-2.388.774-4.614 2.31-6.252ZM14.6 12.7a8.4 8.4 0 0 0-1.986-.186c-.891.024-1.516.193-1.777.347c-.384.227-.55.458-.624.637a1.02 1.02 0 0 0-.038.63c.122.536.525.938.736 1.021c1.126.45 2.535.212 3.188-.78c.235-.358.422-.96.5-1.669Z"
            strokeWidth={0.1}
            stroke="#000"
          ></path>
        </g>
      </svg>
    </a>
  ),
};
