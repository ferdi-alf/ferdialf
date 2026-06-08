"use client";

import { motion } from "framer-motion";
import React from "react";

export interface MarqueeImage {
  src: string;
  alt: string;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

export interface ThreeDMarqueeProps {
  images: MarqueeImage[];
  className?: string;
  cols?: number;
  onImageClick?: (image: MarqueeImage, index: number) => void;
}

export const ThreeDMarquee: React.FC<ThreeDMarqueeProps> = ({
  images,
  className = "",
  cols = 4,
  onImageClick,
}) => {
  const duplicatedImages = [...images, ...images, ...images];

  const groupSize = Math.ceil(duplicatedImages.length / cols);
  const imageGroups = Array.from({ length: cols }, (_, i) =>
    duplicatedImages.slice(i * groupSize, (i + 1) * groupSize),
  );

  const handleImageClick = (image: MarqueeImage, globalIndex: number) => {
    if (onImageClick) {
      onImageClick(image, globalIndex);
    } else if (image.href) {
      window.open(image.href, image.target || "_self");
    }
  };

  return (
    /*
     * overflow-hidden clips the scaled+rotated content to the card bounds.
     * bg-transparent — no white background leaks through.
     */
    <section
      className={`w-full h-full overflow-hidden bg-transparent ${className}`}
    >
      {/*
       * This wrapper applies the isometric 3D transform.
       *
       * Key fix: we combine rotateX/Z with scale(1.6) inside one `transform`
       * declaration so the scaled-up grid fills the card after perspective
       * distortion shrinks the visible area.
       *
       * translateX(-8%) + translateY(-8%) re-centers the content after
       * the rotation shifts its visual center off to one side.
       * Tune these two values if it still looks off-center.
       */}
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          transform:
            "rotateX(55deg) rotateZ(45deg) scale(1.55) translateX(-4%) translateY(-4%)",
          transformOrigin: "center center",
        }}
      >
        <div
          className="relative grid w-full gap-3"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          }}
        >
          {imageGroups.map((imagesInGroup, idx) => (
            <motion.div
              key={`column-${idx}`}
              /*
               * Larger y range → columns travel all the way to card edges.
               * Even/odd columns go opposite directions for the interleaved
               * scroll effect.
               */
              animate={{ y: idx % 2 === 0 ? 240 : -240 }}
              transition={{
                duration: idx % 2 === 0 ? 12 : 17,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
              className="flex flex-col gap-3"
            >
              {imagesInGroup.map((image, imgIdx) => {
                const globalIndex = idx * groupSize + imgIdx;
                const isClickable = image.href || onImageClick;

                return (
                  <motion.img
                    key={`img-${imgIdx}`}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    src={image.src}
                    loading="lazy"
                    alt={image.alt}
                    width={970}
                    height={700}
                    className={`aspect-970/700 w-full rounded-lg object-cover
                      ring-1 ring-white/10 shadow-lg
                      transition-shadow duration-300
                      ${isClickable ? "cursor-pointer" : ""}`}
                    onClick={() => handleImageClick(image, globalIndex)}
                  />
                );
              })}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
