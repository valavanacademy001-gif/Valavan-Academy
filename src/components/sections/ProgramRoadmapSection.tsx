"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";

export interface RoadmapItem {
  phase: string;
  duration?: string;
  description?: string;
  topics: string[];
}

interface ProgramRoadmapSectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  phases?: RoadmapItem[];
  roadmapMap?: Record<string, string>;
}

export const DEFAULT_GRAPHIC_DESIGN_ROADMAP: RoadmapItem[] = [
  {
    phase: "Foundation",
    duration: "(Week 1–3)",
    description: "Build a strong creative foundation and understand the principles behind great design.",
    topics: [
      "Design Fundamentals",
      "Color Theory",
      "Typography",
      "Layout Principles",
      "Visual Hierarchy",
      "Design Thinking",
      "Creative Mindset",
    ],
  },
  {
    phase: "Skill Development",
    duration: "(Week 4–8)",
    description: "Master the tools, workflows, and techniques used in professional design projects.",
    topics: [
      "Photoshop Mastery",
      "Image Editing",
      "Social Media Design",
      "Poster Design",
      "Branding Design",
      "Advertisement Creatives",
      "Client Workflows",
    ],
  },
  {
    phase: "Career & Growth",
    duration: "(Week 9–12)",
    description: "Transform your skills into opportunities.",
    topics: [
      "Portfolio Building",
      "Freelancing Basics",
      "Client Communication",
      "Personal Branding",
      "Project Presentation",
      "Pricing & Packaging",
      "Career Preparation",
    ],
  },
];

export function extractRoadmapPhases(
  roadmapMap?: Record<string, string>,
  fallbackPhases: RoadmapItem[] = DEFAULT_GRAPHIC_DESIGN_ROADMAP
): RoadmapItem[] {
  if (!roadmapMap || Object.keys(roadmapMap).length === 0) return fallbackPhases;

  const phases: RoadmapItem[] = [];
  for (let i = 1; i <= 6; i++) {
    const title = roadmapMap[`phase_${i}_title`];
    if (!title) continue;
    const duration = roadmapMap[`phase_${i}_duration`] || "";
    const description = roadmapMap[`phase_${i}_desc`] || "";
    const rawTopics = roadmapMap[`phase_${i}_topics`];
    const topics = rawTopics
      ? rawTopics
          .split(/\n|,/)
          .map((t) => t.replace(/^[✔•\-\*]\s*/, "").trim())
          .filter(Boolean)
      : [];

    phases.push({
      phase: title,
      duration,
      description,
      topics,
    });
  }

  return phases.length > 0 ? phases : fallbackPhases;
}

export default function ProgramRoadmapSection({
  title = "90 Days Graphic Design Mastery Roadmap",
  subtitle = "Follow a structured step-by-step journey designed to help you learn, practice, build a portfolio and launch your design career.",
  badge = "Curriculum Roadmap",
  phases = DEFAULT_GRAPHIC_DESIGN_ROADMAP,
  roadmapMap,
}: ProgramRoadmapSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectivePhases = roadmapMap ? extractRoadmapPhases(roadmapMap, phases) : phases;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop only (>= 1024px): left element slides in from left to right, right element slides in from right to left
      mm.add("(min-width: 1024px)", () => {
        const rows = containerRef.current?.querySelectorAll(".roadmap-row");
        rows?.forEach((row) => {
          const leftEl = row.querySelector(".slide-from-left");
          const rightEl = row.querySelector(".slide-from-right");

          if (leftEl) {
            gsap.fromTo(
              leftEl,
              { x: -140, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: row,
                  start: "top 78%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          if (rightEl) {
            gsap.fromTo(
              rightEl,
              { x: 140, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: row,
                  start: "top 78%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });
      });

      // Mobile only (< 1024px): clean smooth fade up
      mm.add("(max-width: 1023px)", () => {
        const rows = containerRef.current?.querySelectorAll(".roadmap-row");
        rows?.forEach((row) => {
          const elements = row.querySelectorAll(".roadmap-mobile-fade");
          elements.forEach((el, idx) => {
            gsap.fromTo(
              el,
              { y: 25, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                delay: idx * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 88%",
                  toggleActions: "play none none none",
                },
              }
            );
          });
        });
      });
    }, containerRef);

  }, [effectivePhases]);

  return (
    <section id="roadmap" className="py-10 sm:py-20 md:py-28 bg-[#FBFDFF] relative overflow-hidden border-b border-neutral-100">
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

        {/* ── Alternating Zig-Zag Layout with Directional GSAP Scroll Animations ── */}
        <div ref={containerRef} className="max-w-5xl mx-auto space-y-14 sm:space-y-20 relative">
          {effectivePhases.map((item, index) => {
            const isEven = index % 2 === 0;

            // Even: Text on Left (slide-from-left), Card on Right (slide-from-right)
            // Odd: Card on Left (slide-from-left), Text on Right (slide-from-right)
            const textSlideClass = isEven ? "slide-from-left" : "slide-from-right";
            const cardSlideClass = isEven ? "slide-from-right" : "slide-from-left";

            return (
              <div
                key={item.phase}
                className={`roadmap-row grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Phase Title Column */}
                <div
                  className={`roadmap-mobile-fade ${textSlideClass} lg:col-span-5 flex flex-col justify-center ${
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
                    className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl !text-[#1748BB] leading-[0.94] tracking-tight mb-2"
                  >
                    {item.phase}
                  </h3>
                  {item.duration && (
                    <p className="font-sans text-sm sm:text-base font-semibold text-neutral-500 mb-2">
                      {item.duration}
                    </p>
                  )}
                  {item.description && (
                    <p className="font-sans text-sm sm:text-base leading-relaxed text-neutral-600 mt-1 max-w-md">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Vibrant Blue Rounded Card */}
                <div
                  className={`roadmap-mobile-fade ${cardSlideClass} lg:col-span-7 ${
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
                    <div className="mb-4 pb-3 border-b border-white/15 flex items-center justify-between">
                      <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-white/85">
                        You&apos;ll Learn
                      </span>
                    </div>
                    <ul className="space-y-3 sm:space-y-3.5 relative z-10">
                      {item.topics.map((topic) => (
                        <li
                          key={topic}
                          className="flex items-center gap-3 font-sans text-sm sm:text-base text-white/95 group-hover:text-white transition-colors"
                        >
                          <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                            ✔
                          </span>
                          <span className="font-medium">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
