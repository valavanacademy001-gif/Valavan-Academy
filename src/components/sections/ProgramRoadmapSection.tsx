"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";

export interface RoadmapItem {
  phase: string;
  duration: string;
  topics: string[];
}

interface ProgramRoadmapSectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  phases?: RoadmapItem[];
}

const DEFAULT_GRAPHIC_DESIGN_ROADMAP: RoadmapItem[] = [
  {
    phase: "Foundation",
    duration: "(Week 1–3)",
    topics: [
      "Design Thinking Basics",
      "Typography Fundamentals",
      "Color Theory",
      "Layout Principles",
      "Photoshop Introduction",
      "Design Practice Exercises",
      "Creative Mindset Development",
    ],
  },
  {
    phase: "Skill Development",
    duration: "(Week 4–8)",
    topics: [
      "Photoshop Advanced Techniques",
      "Branding Design",
      "Logo Design",
      "Social Media Design",
      "Thumbnail Design",
      "Poster Design",
      "Print Design Fundamentals",
      "Packaging Design Introduction",
    ],
  },
  {
    phase: "Career & Growth",
    duration: "(Week 9–12)",
    topics: [
      "Portfolio Development",
      "Client Communication",
      "Freelancing Roadmap",
      "Personal Branding",
      "Pricing Strategies",
      "Design Business Fundamentals",
      "Career Growth Framework",
    ],
  },
];

export default function ProgramRoadmapSection({
  title = "90 Days Graphic Design Mastery Roadmap",
  subtitle = "Follow a structured step-by-step journey designed to help you learn, practice, build a portfolio and launch your design career.",
  badge = "Curriculum Roadmap",
  phases = DEFAULT_GRAPHIC_DESIGN_ROADMAP,
}: ProgramRoadmapSectionProps) {
  return (
    <section className="py-10 sm:py-20 md:py-28 bg-[#FBFDFF] relative overflow-hidden border-b border-neutral-100">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#1748BB]/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <FadeUp delay={0}>
            <h2
              className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(32px, 4.4vw, 54px)" }}
            >
              90 Days Graphic Design Mastery{" "}
              <span style={{ color: "#1748BB" }} className="!text-[#1748BB]">
                Roadmap
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.05}>
            <p className="font-sans text-neutral-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </FadeUp>
        </div>

        {/* ── Alternating Zig-Zag Layout with Directional Scroll Animations ── */}
        <div className="max-w-5xl mx-auto space-y-14 sm:space-y-20 relative">
          {phases.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.phase}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Phase Title Column (Slides in from left on even, from right on odd) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "350px 0px 100px 0px", amount: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isEven
                      ? "lg:text-left lg:items-start"
                      : "lg:order-2 lg:text-left lg:items-start lg:pl-8"
                  }`}
                >
                  <span
                    style={{ color: "#1748BB" }}
                    className="font-sans text-xs font-bold uppercase tracking-[0.25em] !text-[#1748BB] mb-2 block"
                  >
                    Phase 0{index + 1}
                  </span>
                  <h3
                    style={{ color: "#1748BB" }}
                    className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl !text-[#1748BB] leading-[0.94] tracking-tight mb-2.5"
                  >
                    {item.phase}
                  </h3>
                  <p className="font-sans text-base sm:text-lg font-semibold text-neutral-500">
                    {item.duration}
                  </p>
                </motion.div>

                {/* Vibrant Blue Rounded Card (Slides in from right on even, from left on odd) */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "350px 0px 100px 0px", amount: 0 }}
                  transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className={`lg:col-span-7 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div
                    className="p-7 sm:p-9 rounded-[28px] sm:rounded-[34px] bg-[#1748BB] text-white border-2 border-white/20 shadow-[0_20px_50px_rgba(23,72,187,0.28)] hover:scale-[1.01] hover:shadow-[0_25px_60px_rgba(23,72,187,0.38)] transition-all duration-300 group relative overflow-hidden"
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(
                          45deg,
                          rgba(255, 255, 255, 0.04) 0px,
                          rgba(255, 255, 255, 0.04) 1px,
                          transparent 1px,
                          transparent 12px
                        )
                      `,
                    }}
                  >
                    <ul className="space-y-3 sm:space-y-3.5 relative z-10">
                      {item.topics.map((topic, tIdx) => (
                        <motion.li
                          key={topic}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.15 + tIdx * 0.04 }}
                          className="flex items-center gap-3 font-sans text-sm sm:text-base text-white/95 group-hover:text-white transition-colors"
                        >
                          <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] shrink-0" />
                          <span className="font-medium">{topic}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
