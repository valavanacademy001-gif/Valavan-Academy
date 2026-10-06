"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import { Sparkles } from "lucide-react";

export interface ToolItem {
  name: string;
  logo: string;
}

interface ToolsCoveredSectionProps {
  title?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  subtitle?: string;
  badge?: string;
  tools?: ToolItem[];
  toolsMap?: Record<string, string>;
}

export const DEFAULT_GRAPHIC_DESIGN_TOOLS: ToolItem[] = [
  { name: "Adobe InDesign", logo: "/assets/tools/indesign.png" },
  { name: "Adobe Illustrator", logo: "/assets/tools/illustrator.png" },
  { name: "Adobe Photoshop", logo: "/assets/tools/ps.png" },
  { name: "ChatGPT 4o", logo: "/assets/tools/chatgpt.png" },
  { name: "Google Gemini AI", logo: "/assets/tools/gemini-ai.png" },
  { name: "Canva Pro", logo: "/assets/tools/canva.png" },
  { name: "CorelDraw", logo: "/assets/tools/coreldraw.png" },
  { name: "Color Palette & Theory", logo: "/assets/tools/color wheel.png" },
];

export function extractToolsFromMap(
  toolsMap: Record<string, string> | undefined,
  fallbackTools: ToolItem[]
): ToolItem[] {
  if (!toolsMap || Object.keys(toolsMap).length === 0) return fallbackTools;

  const dynamicTools: ToolItem[] = [];
  for (let i = 1; i <= 12; i++) {
    const name = toolsMap[`tool_${i}_name`];
    const image = toolsMap[`tool_${i}_image`];
    if (name && image) {
      dynamicTools.push({ name, logo: image });
    }
  }

  return dynamicTools.length > 0 ? dynamicTools : fallbackTools;
}

export default function ToolsCoveredSection({
  title,
  titlePrefix = "Master Industry Standard",
  titleHighlight = "Creative Tools",
  subtitle = "Learn the tools used by professional designers, agencies, freelancers and creative businesses worldwide.",
  badge = "How It Works",
  tools = DEFAULT_GRAPHIC_DESIGN_TOOLS,
  toolsMap,
}: ToolsCoveredSectionProps) {
  // Prioritize explicit tools (from CMS Programs editor) over legacy toolsMap
  const effectiveTools =
    tools && tools.length > 0
      ? tools
      : toolsMap
      ? extractToolsFromMap(toolsMap, DEFAULT_GRAPHIC_DESIGN_TOOLS)
      : DEFAULT_GRAPHIC_DESIGN_TOOLS;
  // Duplicate tools array 4 times for a perfectly seamless, gapless infinite loop
  const marqueeItems = [...effectiveTools, ...effectiveTools, ...effectiveTools, ...effectiveTools];

  return (
    <section className="py-10 sm:py-18 md:py-24 bg-white relative z-30 overflow-hidden border-b border-neutral-100">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <FadeUp delay={0}>
            <h2
              className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(28px, 3.8vw, 48px)" }}
            >
              {titlePrefix}{" "}
              <span style={{ color: "#1748BB" }} className="!text-[#1748BB]">
                {titleHighlight}
              </span>
            </h2>
          </FadeUp>


          {/* Badge */}
          <FadeUp delay={0.05}>
            <div className="inline-flex items-center justify-center mb-4">
              <span className="inline-flex items-center gap-2 border border-[#1748BB] text-[#1748BB] font-sans text-xs font-bold px-4 py-1.5 rounded-full bg-[#1748BB]/5 shadow-sm">
                <Sparkles size={13} className="text-[#1748BB]" />
                {badge}
              </span>
            </div>
          </FadeUp>

          {/* Subtitle */}
          <FadeUp delay={0.1}>
            <p className="font-sans text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </FadeUp>
        </div>

        {/* Tools Covered Card Box with Infinite Marquee Loop */}
        <FadeUp delay={0.15}>
          <div className="max-w-6xl mx-auto rounded-[18px] sm:rounded-[36px] border border-[#1748BB]/30 bg-white p-3.5 sm:p-9 md:p-11 shadow-[0_12px_40px_rgba(23,72,187,0.06)] relative overflow-hidden">
            
            {/* Header inside Box */}
            <h3 className="font-display font-bold text-center text-sm sm:text-2xl md:text-3xl text-[#1E2026] mb-2 sm:mb-8 tracking-tight leading-snug sm:leading-tight">
              Tools Covered
            </h3>

            {/* Left & Right Soft Fade Gradients for Luxury Carousel Edge */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-28 md:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-28 md:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

            {/* Content: Single Banner Duplicated Infinite Loop vs Multi-Tool Marquee */}
            {effectiveTools.length === 1 ? (
              <div className="relative w-full overflow-hidden flex items-center py-1 sm:py-9">
                <motion.div
                  className="flex items-center gap-0 shrink-0 cursor-grab active:cursor-grabbing"
                  animate={{
                    x: ["0%", "-50%"],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 36,
                      ease: "linear",
                    },
                  }}
                  whileHover={{ animationPlayState: "paused" }}
                >
                  {[0, 1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className="shrink-0 flex items-center -mx-2 sm:-mx-6 md:-mx-7 lg:-mx-[31px] select-none"
                    >
                      <img
                        src={effectiveTools[0].logo}
                        alt={effectiveTools[0].name}
                        className="h-9 sm:h-32 md:h-38 lg:h-[165px] xl:h-[175px] w-auto max-h-9 sm:max-h-[175px] object-contain max-w-none select-none pointer-events-none transition-transform duration-300"
                        draggable={false}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            ) : (
              <div className="relative w-full overflow-hidden flex items-center py-1 sm:py-2">
                <motion.div
                  className="flex items-center gap-3 sm:gap-10 md:gap-12 shrink-0 cursor-grab active:cursor-grabbing"
                  animate={{
                    x: ["0%", "-50%"],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 22,
                      ease: "linear",
                    },
                  }}
                  whileHover={{ animationPlayState: "paused" }}
                >
                  {marqueeItems.map((tool, index) => (
                    <div
                      key={`${tool.name}-${index}`}
                      className="group shrink-0 transition-transform duration-300 hover:scale-115 flex items-center justify-center"
                      title={tool.name}
                    >
                      {/* Square Icon Card (minimized on mobile, original size on desktop) */}
                      <div className="relative w-11 h-11 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-lg sm:rounded-3xl p-1.5 sm:p-3.5 bg-white flex items-center justify-center border border-neutral-200/80 shadow-[0_3px_12px_rgba(0,0,0,0.05)] sm:shadow-[0_8px_24px_rgba(0,0,0,0.07)] group-hover:shadow-[0_14px_35px_rgba(23,72,187,0.18)] group-hover:border-[#1748BB]/40 transition-all duration-300">
                        <Image
                          src={tool.logo}
                          alt={tool.name}
                          width={90}
                          height={90}
                          unoptimized={tool.logo.startsWith('data:') || tool.logo.startsWith('http')}
                          className="object-contain w-full h-full drop-shadow-sm group-hover:drop-shadow-md transition-all"
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            )}

          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
