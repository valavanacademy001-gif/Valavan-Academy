"use client";

/**
 * Programs Section — Polished Card-Based Program Showcase
 * Clean, minimal content with prominent original tool logo images.
 *
 * Program 01: 90-Day Graphic Design Mastery
 * Program 02: Full Stack Digital Creator
 */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Globe2,
  GraduationCap,
} from "lucide-react";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import InteractiveGridBackground from "@/components/ui/InteractiveGridBackground";

interface ToolItem {
  name: string;
  image: string;
}

interface ProgramItem {
  id: string;
  number: string;
  badge: string;
  badgeAccent: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  language: string;
  level: string;
  image: string;
  href: string;
  tools: ToolItem[];
  ctaLabel: string;
}

const PROGRAMS: ProgramItem[] = [
  {
    id: "graphic-design",
    number: "01",
    badge: "90 Days Program",
    badgeAccent: "Most Popular",
    title: "90-Day Graphic Design Mastery",
    subtitle: "From beginner to confident commercial designer",
    description:
      "A practical, project-driven program covering complete visual branding, commercial layouts, and AI-powered workflows in Tamil.",
    duration: "90 Days",
    language: "Tamil",
    level: "Beginner to Intermediate",
    image: "/assets/images/hero/ai-powered-GD.webp",
    href: "/programs/90-days-graphic-design",
    tools: [
      { name: "Photoshop", image: "/assets/tools/ps.png" },
      { name: "Illustrator", image: "/assets/tools/illustrator.png" },
      { name: "Canva", image: "/assets/tools/canva.png" },
      { name: "CorelDraw", image: "/assets/tools/coreldraw.png" },
      { name: "InDesign", image: "/assets/tools/indesign.png" },
    ],
    ctaLabel: "View Program",
  },
  {
    id: "full-stack",
    number: "02",
    badge: "180 Days Program",
    badgeAccent: "Flagship Track",
    title: "Full Stack Digital Creator",
    subtitle: "Master high-income multi-skilled digital creation",
    description:
      "A comprehensive program covering Video Editing, Web Design, UI/UX, WordPress, and AI Automation to build client-ready digital assets.",
    duration: "6 Months",
    language: "Tamil",
    level: "Beginner to Advanced",
    image: "/assets/images/hero/full-stack-.jpg-1.webp",
    href: "/programs/full-stack-creator",
    tools: [
      { name: "Premiere Pro", image: "/assets/tools/premiere-pro.png" },
      { name: "After Effects", image: "/assets/tools/after-effects.png" },
      { name: "WordPress", image: "/assets/tools/wordpress.png" },
      { name: "Elementor Pro", image: "/assets/tools/elementor-pro.png" },
      { name: "ChatGPT", image: "/assets/tools/chatgpt.png" },
      { name: "Gemini AI", image: "/assets/tools/gemini-ai.png" },
    ],
    ctaLabel: "View Program",
  },
];

export default function ProgramsSection() {
  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      className="bg-[#F8FAFC] py-20 sm:py-28 relative border-t border-b border-neutral-200/70 overflow-hidden scroll-mt-24"
    >
      {/* Pixel Gradient Pattern Background */}
      <InteractiveGridBackground />

      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#EFF4FF] rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        
        {/* ── Section Header ───────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <FadeUp delay={0}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#1748BB]" />
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1748BB] font-semibold">
                Our Programs
              </span>
              <div className="w-8 h-[2px] bg-[#1748BB]" />
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2
              id="programs-heading"
              className="font-display font-bold text-[#1E2026] leading-[1.02] sm:leading-[1.06] tracking-tight mb-3.5"
              style={{ fontSize: "clamp(32px, 4.5vw, 54px)" }}
            >
              Choose Your{" "}
              <span className="text-[#1748BB]">Learning Path.</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="font-sans text-neutral-600 text-base sm:text-lg leading-relaxed font-normal">
              Two programs. One goal — to give you the creative digital skills
              that open doors to careers, freelancing, and your own brand.
            </p>
          </FadeUp>
        </div>

        {/* ── 2-Column Minimal Program Showcase Cards ───────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-5xl mx-auto">
          {PROGRAMS.map((program, idx) => (
            <FadeUp key={program.id} delay={0.12 * idx} className="h-full">
              <div className="group h-full rounded-[28px] sm:rounded-[32px] bg-white border border-neutral-200/90 p-6 sm:p-7 shadow-[0_12px_36px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_55px_rgba(23,72,187,0.12)] hover:border-[#1748BB]/40 transition-all duration-400 flex flex-col justify-between relative overflow-hidden">
                
                <div>
                  {/* Thumbnail Banner */}
                  <div className="relative aspect-[16/10] w-full rounded-[20px] sm:rounded-[22px] overflow-hidden bg-neutral-100 mb-5 shadow-sm">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
                      sizes="(max-width: 1024px) 100vw, 560px"
                    />

                    {/* Gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    {/* Overlay Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-[#1748BB] text-white text-xs font-sans font-bold shadow-md tracking-wide">
                        {program.badge}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-sans font-semibold border border-white/20">
                        {program.badgeAccent}
                      </span>
                    </div>

                    <div className="absolute bottom-3.5 left-3.5 font-mono text-[11px] font-bold text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-md border border-white/10">
                      PROGRAM {program.number}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1 mb-3">
                    <h3
                      style={{ color: "#1748BB" }}
                      className="font-display font-semibold text-2xl sm:text-[26px] !text-[#1748BB] tracking-tight leading-tight transition-colors duration-300 group-hover:!text-[#0A3CA8]"
                    >
                      {program.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm font-semibold text-neutral-600">
                      {program.subtitle}
                    </p>
                  </div>

                  {/* Minimal 1-line Description */}
                  <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mb-5">
                    {program.description}
                  </p>

                  {/* Metadata Row */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#F8FAFC] border border-neutral-200/70 mb-5">
                    <div className="space-y-0.5">
                      <span className="font-sans text-[10px] uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1">
                        <Clock size={10} className="text-[#1748BB]" />
                        Duration
                      </span>
                      <p className="font-sans text-xs font-bold text-[#1E2026]">
                        {program.duration}
                      </p>
                    </div>

                    <div className="space-y-0.5 border-l border-neutral-200 pl-2.5">
                      <span className="font-sans text-[10px] uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1">
                        <Globe2 size={10} className="text-[#1748BB]" />
                        Language
                      </span>
                      <p className="font-sans text-xs font-bold text-[#1E2026]">
                        {program.language}
                      </p>
                    </div>

                    <div className="space-y-0.5 border-l border-neutral-200 pl-2.5">
                      <span className="font-sans text-[10px] uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1">
                        <GraduationCap size={10} className="text-[#1748BB]" />
                        Level
                      </span>
                      <p className="font-sans text-xs font-bold text-[#1E2026] truncate">
                        {program.level}
                      </p>
                    </div>
                  </div>

                  {/* Original Tool Logo Icons */}
                  <div className="space-y-2 mb-6 pt-1">
                    <span className="text-[11px] font-sans text-neutral-400 font-semibold uppercase tracking-wider block">
                      Tools Mastered:
                    </span>
                    <div className="flex flex-wrap items-center gap-3.5">
                      {program.tools.map((tool) => (
                        <div
                          key={tool.name}
                          title={tool.name}
                          className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-all duration-200 hover:scale-120 cursor-pointer"
                        >
                          <Image
                            src={tool.image}
                            alt={tool.name}
                            width={36}
                            height={36}
                            className="object-contain max-h-8 max-w-8 sm:max-h-9 sm:max-w-9 w-auto h-auto drop-shadow-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-3 border-t border-neutral-100 mt-auto">
                  <Link
                    href={program.href}
                    style={{ color: "#FFFFFF" }}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#1748BB] hover:bg-[#0A3CA8] !text-white font-sans font-bold text-sm sm:text-base px-6 py-3.5 rounded-full shadow-[0_8px_24px_rgba(23,72,187,0.32)] hover:scale-[1.02] transition-all group/btn"
                  >
                    <span style={{ color: "#FFFFFF" }} className="!text-white font-bold">
                      {program.ctaLabel}
                    </span>
                    <ArrowRight
                      size={16}
                      style={{ color: "#FFFFFF" }}
                      className="!text-white group-hover/btn:translate-x-1.5 transition-transform"
                    />
                  </Link>
                </div>

              </div>
            </FadeUp>
          ))}
        </div>

      </Container>
    </section>
  );
}
