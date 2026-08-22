"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
  // Duplicate array 3 times for continuous seamless marquee
  const allItems = [...images, ...images, ...images];

  return (
    <section
      className="relative z-10 py-10 sm:py-20 md:py-28 bg-[#1748BB] text-white overflow-hidden select-none pb-12 sm:pb-24 flex flex-col justify-center border-t border-[#1748BB]"
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
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12">
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

      {/* ── GPU-Accelerated Hardware Infinite Continuous Marquee on Deep Blue ── */}
      <div className="relative w-full overflow-hidden py-6 sm:py-10">
        {/* Soft edge gradient fades in Brand Blue */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-36 bg-gradient-to-r from-[#1748BB] via-[#1748BB]/80 to-transparent z-30" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-36 bg-gradient-to-l from-[#1748BB] via-[#1748BB]/80 to-transparent z-30" />

        {/* Moving Track */}
        <div className="relative w-full overflow-hidden flex items-center">
          <motion.div
            className="flex items-center gap-4 sm:gap-6 md:gap-8 shrink-0 cursor-grab active:cursor-grabbing"
            animate={{
              x: ["0%", "-33.333%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 28,
                ease: "linear",
              },
            }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {allItems.map((item, index) => (
              <div
                key={`${item.alt}-${index}`}
                className="shrink-0 w-[260px] sm:w-[340px] md:w-[380px] aspect-[16/9] rounded-[18px] sm:rounded-[24px] overflow-hidden border-2 border-white/30 bg-white relative shadow-xl hover:scale-105 transition-transform duration-300 group"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 260px, (max-width: 1024px) 340px, 380px"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
