"use client";

import React from "react";
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

export function extractSkillModulesFromMap(
  map: Record<string, string> | undefined,
  fallback: SkillModuleImage[]
): SkillModuleImage[] {
  if (!map || Object.keys(map).length === 0) return fallback;

  const items: SkillModuleImage[] = [];
  for (let i = 1; i <= 20; i++) {
    const src = map[`card_${i}_image`] || map[`module_${i}_image`];
    const alt = map[`card_${i}_title`] || map[`module_${i}_title`] || `Skill Module ${i}`;
    if (src && src.trim() !== "") {
      items.push({ src: src.trim(), alt: alt.trim() });
    }
  }
  return items.length > 0 ? items : fallback;
}

interface SkillsMoneyCarouselSectionProps {
  badge?: string;
  title?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  subtitle?: string;
  images?: SkillModuleImage[];
  skillsMoneyMap?: Record<string, string>;
}

export default function SkillsMoneyCarouselSection({
  badge,
  title,
  titlePrefix,
  titleHighlight,
  subtitle,
  images = DEFAULT_SKILL_MODULES,
  skillsMoneyMap,
}: SkillsMoneyCarouselSectionProps) {
  const effectiveBadge = badge || skillsMoneyMap?.badge || "Topics";
  const effectiveTitlePrefix = titlePrefix || skillsMoneyMap?.title_prefix || "Learn Skills That";
  const effectiveTitleHighlight = titleHighlight || skillsMoneyMap?.title_highlight || "Actually Make Money";
  const effectiveSubtitle = subtitle || skillsMoneyMap?.description || "Not outdated theory. Real digital skills businesses & clients are hiring for right now.";
  const effectiveImages = skillsMoneyMap ? extractSkillModulesFromMap(skillsMoneyMap, images) : images;

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
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <FadeUp delay={0}>
            <div className="inline-flex items-center justify-center mb-4">
              <span className="inline-flex items-center gap-2 border border-white/25 text-white font-sans text-xs font-bold px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm shadow-sm">
                <PlaySquare size={13} className="text-[#BACFFF]" />
                {effectiveBadge}
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            {title ? (
              <h2
                className="font-display font-bold leading-tight tracking-tight mb-3.5"
                style={{ fontSize: "clamp(30px, 4.2vw, 52px)", color: "#FFFFFF" }}
              >
                {title}
              </h2>
            ) : (
              <h2
                className="font-display font-bold leading-tight tracking-tight mb-3.5"
                style={{ fontSize: "clamp(30px, 4.2vw, 52px)", color: "#FFFFFF" }}
              >
                {effectiveTitlePrefix}{" "}
                <span style={{ color: "#BACFFF" }} className="!text-[#BACFFF]">
                  {effectiveTitleHighlight}
                </span>
              </h2>
            )}
          </FadeUp>

          <FadeUp delay={0.1}>
            <p
              className="font-sans text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
              style={{ color: "#BACFFF" }}
            >
              {effectiveSubtitle}
            </p>
          </FadeUp>
        </div>

        {/* ── Row & Column Grid Layout (No Carousel) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7">
          {effectiveImages.map((item, index) => (
            <FadeUp key={`${item.alt}-${index}`} delay={(index % 6) * 0.05}>
              <div className="relative aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/25 hover:border-white/60 bg-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
