"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import { PlaySquare } from "lucide-react";

export interface SkillModuleImage {
  src: string;
  alt: string;
}

const DEFAULT_SKILL_MODULES: SkillModuleImage[] = [
  {
    src: "/assets/programs/full-stack-creator/skills-modules/foundation-of-graphic-design-1.webp",
    alt: "Foundation of Graphic Design",
  },
  {
    src: "/assets/programs/full-stack-creator/skills-modules/photoshop-mastery-1.webp",
    alt: "Adobe Photoshop CC Mastery",
  },
  {
    src: "/assets/programs/full-stack-creator/skills-modules/illustrator-mastery-1.webp",
    alt: "Adobe Illustrator CC Mastery",
  },
  {
    src: "/assets/programs/full-stack-creator/skills-modules/logo-design-mastery-2.webp",
    alt: "Logo Design Mastery",
  },
  {
    src: "/assets/programs/full-stack-creator/skills-modules/social-media-design-mastery-1.webp",
    alt: "Social Media Design Mastery",
  },
  {
    src: "/assets/programs/full-stack-creator/skills-modules/thumbnail-mastery.webp",
    alt: "YouTube Thumbnail Mastery",
  },
  {
    src: "/assets/programs/full-stack-creator/skills-modules/branding-mastery-1.webp",
    alt: "Branding Mastery",
  },
  {
    src: "/assets/programs/full-stack-creator/skills-modules/Video-Editing-Mastery-1.webp",
    alt: "Video Editing Mastery",
  },
  {
    src: "/assets/programs/full-stack-creator/skills-modules/WordPress-Mastery-1.webp",
    alt: "WordPress Mastery",
  },
  {
    src: "/assets/programs/full-stack-creator/skills-modules/ai-graphic-design-work-flow-1.webp",
    alt: "AI Graphic Design Workflow",
  },
  {
    src: "/assets/programs/full-stack-creator/skills-modules/canva-Mastery-3.webp",
    alt: "Canva Mastery",
  },
];

interface SkillsMoneyCarouselSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  images?: SkillModuleImage[];
}

export default function SkillsMoneyCarouselSection({
  badge = "Topics",
  title = "Learn Skills That Actually Make Money",
  subtitle = "Not outdated theory. Real digital skills businesses & clients are hiring for right now.",
  images = DEFAULT_SKILL_MODULES,
}: SkillsMoneyCarouselSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Triple the list to enable seamless infinite wrapping
  const allItems = [...images, ...images, ...images];

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    let pos = 0;
    const speed = 1.35; // brisk, energetic speed
    let animationFrameId: number;

    const cards = Array.from(track.children) as HTMLElement[];

    const loop = () => {
      if (!isHovered) {
        pos += speed;
      }

      const totalWidth = track.scrollWidth / 3;
      if (pos >= totalWidth) {
        pos -= totalWidth;
      }

      track.style.transform = `translate3d(-${pos}px, 0, 0)`;

      // Calculate container center
      const containerRect = container.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;

      // Dynamic Center Pop-up computation for each card on Deep Blue background
      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const dist = Math.abs(cardCenterX - containerCenterX);

        const maxDist = 280;
        if (dist < maxDist) {
          const factor = 1 - dist / maxDist; // 0 to 1
          const scale = 1 + 0.12 * factor; // Up to 1.12 scale
          const translateY = -10 * factor; // Up to -10px lift
          const zIndex = Math.round(10 + factor * 20);

          card.style.transform = `scale(${scale}) translateY(${translateY}px)`;
          card.style.zIndex = `${zIndex}`;
          card.style.borderColor = factor > 0.35 ? "#FFFFFF" : "rgba(255, 255, 255, 0.35)";
          card.style.boxShadow =
            factor > 0.35
              ? "0 0 35px rgba(255, 255, 255, 0.45), 0 16px 35px rgba(10, 30, 80, 0.25), 0 0 0 2px rgba(255, 255, 255, 0.8)"
              : "0 8px 22px rgba(10, 30, 80, 0.2)";
          card.style.opacity = "1";
        } else {
          card.style.transform = "scale(0.96) translateY(0px)";
          card.style.zIndex = "1";
          card.style.borderColor = "rgba(255, 255, 255, 0.25)";
          card.style.boxShadow = "0 6px 18px rgba(10, 30, 80, 0.15)";
          card.style.opacity = "0.85";
        }
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, allItems.length]);

  return (
    <section
      className="sticky top-0 z-10 min-h-screen py-20 sm:py-28 bg-[#1748BB] text-white relative overflow-hidden select-none pb-32 sm:pb-44 flex flex-col justify-center"
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.035) 0px,
            rgba(255, 255, 255, 0.035) 1px,
            transparent 1px,
            transparent 14px
          )
        `,
      }}
    >
      {/* Ambient background soft glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none"
        aria-hidden
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <FadeUp delay={0}>
            <div className="inline-flex items-center justify-center mb-4">
              <span className="inline-flex items-center gap-2 border border-white/25 text-white font-sans text-xs font-bold px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm shadow-sm">
                <PlaySquare size={13} className="text-[#BACFFF]" />
                {badge}
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2
              className="font-display font-bold leading-tight tracking-tight mb-3.5"
              style={{ fontSize: "clamp(30px, 4.2vw, 52px)", color: "#FFFFFF" }}
            >
              Learn Skills That{" "}
              <span style={{ color: "#BACFFF" }} className="!text-[#BACFFF]">
                Actually Make Money
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p
              className="font-sans text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
              style={{ color: "#BACFFF" }}
            >
              {subtitle}
            </p>
          </FadeUp>
        </div>
      </Container>

      {/* ── Infinite Continuous Carousel with Center Dynamic Pop-up Lens Effect on Deep Blue ── */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden py-12 sm:py-16"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Soft edge gradient fades in Brand Blue */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-[#1748BB] via-[#1748BB]/80 to-transparent z-30" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-[#1748BB] via-[#1748BB]/80 to-transparent z-30" />

        {/* Moving Track */}
        <div
          ref={trackRef}
          className="flex items-center gap-5 sm:gap-7 shrink-0 cursor-grab active:cursor-grabbing will-change-transform"
        >
          {allItems.map((item, index) => (
            <div
              key={`${item.alt}-${index}`}
              className="shrink-0 w-[270px] sm:w-[350px] md:w-[380px] aspect-[16/9] rounded-[20px] sm:rounded-[24px] overflow-hidden border-2 bg-white relative transition-[transform,box-shadow,opacity,border-color] duration-150 ease-out will-change-transform shadow-xl"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 270px, (max-width: 1024px) 350px, 380px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
