"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import {
  Sparkles,
  Bot,
  Palette,
  Globe,
  Scissors,
  Code2,
  ShieldCheck,
} from "lucide-react";

export interface FrameworkPillar {
  id: string;
  name: string;
  icon: React.ElementType;
  tagline: string;
  description: string;
  tools: string[];
  // Desktop SVG coordinates (viewBox 0 0 1000 580)
  pillX: number;
  pillY: number;
  pillWidth: number;
  pillHeight: number;
  lineStartX: number;
  lineStartY: number;
  lineEndX: number;
  lineEndY: number;
}

const FRAMEWORK_PILLARS: FrameworkPillar[] = [
  // 1: Top Left — GEN AI
  {
    id: "gen-ai",
    name: "GEN AI",
    icon: Bot,
    tagline: "Prompt Engineering & Creative Automation",
    description: "Master Midjourney, ChatGPT, Gemini, ElevenLabs, and creative AI workflows to 10X your output speed.",
    tools: ["ChatGPT", "Midjourney", "Gemini AI", "ElevenLabs", "Claude"],
    pillX: 380,
    pillY: 125,
    pillWidth: 170,
    pillHeight: 56,
    lineStartX: 532,
    lineStartY: 228,
    lineEndX: 465,
    lineEndY: 140,
  },
  // 2: Top Right — DESIGNING
  {
    id: "designing",
    name: "DESIGNING",
    icon: Palette,
    tagline: "Visual Identity, Typography & Layouts",
    description: "Commercial graphic design principles, color theory, social media creatives, thumbnails, and advertising assets.",
    tools: ["Photoshop", "Illustrator", "Canva Pro", "Typography", "Color Theory"],
    pillX: 820,
    pillY: 125,
    pillWidth: 190,
    pillHeight: 56,
    lineStartX: 668,
    lineStartY: 228,
    lineEndX: 735,
    lineEndY: 140,
  },
  // 3: Middle Left — WEB DESIGN
  {
    id: "web-design",
    name: "WEB DESIGN",
    icon: Globe,
    tagline: "High-Converting Websites & Landing Pages",
    description: "Responsive web layouts, WordPress development, Elementor Pro mastery, UI/UX systems, and speed optimization.",
    tools: ["WordPress", "Elementor Pro", "WooCommerce", "Responsive UI", "RankMath"],
    pillX: 350,
    pillY: 290,
    pillWidth: 190,
    pillHeight: 56,
    lineStartX: 508,
    lineStartY: 290,
    lineEndX: 445,
    lineEndY: 290,
  },
  // 4: Middle Right — EDITING
  {
    id: "editing",
    name: "EDITING",
    icon: Scissors,
    tagline: "Cinematic Video Editing & Motion Graphics",
    description: "Viral pacing, storytelling rhythms, Premiere Pro editing, After Effects animations, and audio mastering.",
    tools: ["Premiere Pro", "After Effects", "CapCut Pro", "Sound Design", "Media Encoder"],
    pillX: 850,
    pillY: 290,
    pillWidth: 170,
    pillHeight: 56,
    lineStartX: 692,
    lineStartY: 290,
    lineEndX: 765,
    lineEndY: 290,
  },
  // 5: Bottom Left — APP DEV
  {
    id: "app-dev",
    name: "APP DEV",
    icon: Code2,
    tagline: "AI Web Apps & Modern Interactive Tools",
    description: "Building modern interactive web tools, client dashboards, API integrations, and frontend logic with AI.",
    tools: ["Next.js Foundations", "Tailwind / CSS", "AI Web Apps", "API Integration", "Vercel"],
    pillX: 380,
    pillY: 455,
    pillWidth: 170,
    pillHeight: 56,
    lineStartX: 532,
    lineStartY: 352,
    lineEndX: 465,
    lineEndY: 440,
  },
  // 6: Bottom Right — BRANDING
  {
    id: "branding",
    name: "BRANDING",
    icon: ShieldCheck,
    tagline: "Brand Strategy & Freelance Systems",
    description: "Complete brand guidelines, commercial identity, client acquisition systems, proposal writing, and premium pricing.",
    tools: ["Brand Guidelines", "Client Pitching", "Freelance Systems", "Portfolio", "Pricing Strategy"],
    pillX: 820,
    pillY: 455,
    pillWidth: 180,
    pillHeight: 56,
    lineStartX: 668,
    lineStartY: 352,
    lineEndX: 735,
    lineEndY: 440,
  },
];

interface ProgramSyllabusMapSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  syllabusMap?: Record<string, string>;
}

export default function ProgramSyllabusMapSection({
  badge = "WHY FULLSTACK",
  title = "THE FULL STACK CREATIVE FRAMEWORK™",
  subtitle = "Master the 6 interconnected pillars that turn you into an unstoppable creative leader in the AI era.",
  syllabusMap,
}: ProgramSyllabusMapSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const effectiveBadge = syllabusMap?.badge || badge || "WHY FULLSTACK";
  const effectiveTitle =
    (syllabusMap?.title_prefix
      ? `${syllabusMap.title_prefix} ${syllabusMap.title_highlight || ""}`.trim()
      : title) || "THE FULL STACK CREATIVE FRAMEWORK™";
  const effectiveSubtitle =
    syllabusMap?.description ||
    subtitle ||
    "Master the 6 interconnected pillars that turn you into an unstoppable creative leader in the AI era.";

  // Auto rotate through the 6 pillars smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % FRAMEWORK_PILLARS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const activePillar = FRAMEWORK_PILLARS[activeIdx] || FRAMEWORK_PILLARS[0];

  return (
    <section
      id="framework"
      className="py-12 sm:py-20 md:py-28 bg-[#FAFCFF] relative overflow-hidden border-b border-neutral-100 select-none scroll-mt-10"
    >
      {/* Soft Ambient Radial Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] bg-[#1748BB]/4 rounded-full blur-[140px] pointer-events-none"
        aria-hidden
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          {/* Badge: WHY FULLSTACK */}
          <FadeUp delay={0}>
            <div className="inline-flex items-center justify-center mb-3.5">
              <span className="inline-flex items-center gap-2 border border-[#1748BB] text-[#1748BB] font-sans text-xs font-bold px-4 py-1.5 rounded-full bg-[#1748BB]/5 shadow-xs uppercase tracking-wider">
                <Sparkles size={13} className="text-[#1748BB]" />
                {effectiveBadge}
              </span>
            </div>
          </FadeUp>

          {/* Section Title: THE FULL STACK CREATIVE FRAMEWORK™ */}
          <FadeUp delay={0.05}>
            <h2
              className="font-display font-extrabold text-[#1E2026] leading-tight tracking-tight uppercase mb-3"
              style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
            >
              {effectiveTitle}
            </h2>
          </FadeUp>

          {/* Subtitle */}
          <FadeUp delay={0.1}>
            <p className="font-sans text-neutral-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
              {effectiveSubtitle}
            </p>
          </FadeUp>
        </div>

        {/* ── Connected Interactive Radial Mind-Map ── */}
        <FadeUp delay={0.15}>
          <div className="max-w-5xl mx-auto relative p-2 sm:p-4">
            
            {/* ── Desktop SVG Radial Framework Diagram ── */}
            <div className="hidden md:block relative w-full h-[580px] select-none">
              <svg
                viewBox="0 0 1200 580"
                className="w-full h-full drop-shadow-sm"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 1. Background Concentric Guide Watermark Rings */}
                <circle
                  cx="600"
                  cy="290"
                  r="230"
                  fill="none"
                  stroke="#1748BB"
                  strokeWidth="1.5"
                  strokeOpacity="0.08"
                />
                <circle
                  cx="600"
                  cy="290"
                  r="275"
                  fill="none"
                  stroke="#1748BB"
                  strokeWidth="1"
                  strokeOpacity="0.04"
                />

                {/* 2. Faint Watermark "VA" in Center Background */}
                <text
                  x="600"
                  y="355"
                  textAnchor="middle"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="900"
                  fontSize="210"
                  fill="#1748BB"
                  fillOpacity="0.035"
                  letterSpacing="-8"
                  className="pointer-events-none select-none"
                >
                  VA
                </text>

                {/* 3. Connecting Radial Lines with Terminal Rings */}
                {FRAMEWORK_PILLARS.map((pillar, i) => {
                  const isActive = i === activeIdx;

                  return (
                    <g key={`line-${pillar.id}`}>
                      {/* Dynamic Background Glow for Active Line */}
                      {isActive && (
                        <line
                          x1={pillar.lineStartX}
                          y1={pillar.lineStartY}
                          x2={pillar.lineEndX}
                          y2={pillar.lineEndY}
                          stroke="#1748BB"
                          strokeWidth="7"
                          strokeOpacity="0.25"
                          strokeLinecap="round"
                        />
                      )}

                      {/* Main Connecting Blue Line */}
                      <line
                        x1={pillar.lineStartX}
                        y1={pillar.lineStartY}
                        x2={pillar.lineEndX}
                        y2={pillar.lineEndY}
                        stroke="#1748BB"
                        strokeWidth={isActive ? "3" : "2.5"}
                        strokeLinecap="round"
                        className="transition-all duration-300"
                      />

                      {/* Terminal Ring at Center Circle End */}
                      <circle
                        cx={pillar.lineStartX}
                        cy={pillar.lineStartY}
                        r="6"
                        fill="#FFFFFF"
                        stroke="#1748BB"
                        strokeWidth="2.5"
                      />

                      {/* Terminal Ring at Outer Node End */}
                      <circle
                        cx={pillar.lineEndX}
                        cy={pillar.lineEndY}
                        r="6"
                        fill="#FFFFFF"
                        stroke="#1748BB"
                        strokeWidth="2.5"
                      />
                    </g>
                  );
                })}

                {/* 4. Center Circle Hub: FULL STACK */}
                <g className="cursor-pointer">
                  {/* Subtle Pulse Halo when active */}
                  <circle
                    cx="600"
                    cy="290"
                    r="104"
                    fill="#1748BB"
                    fillOpacity="0.12"
                    className="animate-pulse"
                  />
                  {/* Solid Center Circle */}
                  <circle
                    cx="600"
                    cy="290"
                    r="95"
                    fill="#1748BB"
                    className="drop-shadow-[0_12px_32px_rgba(23,72,187,0.32)]"
                  />
                  {/* Center Text: FULL STACK */}
                  <text
                    x="600"
                    y="298"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontFamily="var(--font-display), sans-serif"
                    fontWeight="800"
                    fontSize="22"
                    letterSpacing="1"
                    className="select-none pointer-events-none uppercase"
                  >
                    FULL STACK
                  </text>
                </g>

                {/* 5. 6 Outer Pill Capsules */}
                {FRAMEWORK_PILLARS.map((pillar, i) => {
                  const isActive = i === activeIdx;

                  return (
                    <g
                      key={`pill-${pillar.id}`}
                      className="cursor-pointer transition-transform duration-300"
                      onClick={() => setActiveIdx(i)}
                      onMouseEnter={() => setActiveIdx(i)}
                    >
                      {/* Active Glow behind Pill */}
                      {isActive && (
                        <rect
                          x={pillar.pillX - pillar.pillWidth / 2 - 4}
                          y={pillar.pillY - pillar.pillHeight / 2 - 4}
                          width={pillar.pillWidth + 8}
                          height={pillar.pillHeight + 8}
                          rx={32}
                          fill="#1748BB"
                          fillOpacity="0.2"
                        />
                      )}

                      {/* Pill Capsule Body */}
                      <rect
                        x={pillar.pillX - pillar.pillWidth / 2}
                        y={pillar.pillY - pillar.pillHeight / 2}
                        width={pillar.pillWidth}
                        height={pillar.pillHeight}
                        rx={28}
                        fill="#1748BB"
                        className={`transition-all duration-300 drop-shadow-[0_6px_20px_rgba(23,72,187,0.22)] ${
                          isActive ? "filter brightness-105 scale-105" : "hover:brightness-110"
                        }`}
                      />

                      {/* Pill Label Text */}
                      <text
                        x={pillar.pillX}
                        y={pillar.pillY + 6}
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontFamily="var(--font-display), sans-serif"
                        fontWeight="700"
                        fontSize="15"
                        letterSpacing="1.2"
                        className="select-none pointer-events-none uppercase"
                      >
                        {pillar.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* ── Dynamic Floating Detail Box Beside Active Pillar on Desktop ── */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={{
                    opacity: 0,
                    x: (activeIdx === 0 || activeIdx === 2 || activeIdx === 4) ? -18 : 18,
                    scale: 0.95,
                  }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    x: (activeIdx === 0 || activeIdx === 2 || activeIdx === 4) ? -12 : 12,
                    scale: 0.95,
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`absolute z-20 w-[270px] lg:w-[290px] xl:w-[310px] rounded-2xl bg-white/95 backdrop-blur-md border-2 border-[#1748BB]/25 p-4 sm:p-5 shadow-[0_16px_40px_rgba(23,72,187,0.14)] pointer-events-auto ${
                    activeIdx === 0
                      ? "top-[3%] left-0"
                      : activeIdx === 1
                      ? "top-[3%] right-0"
                      : activeIdx === 2
                      ? "top-[30%] left-0"
                      : activeIdx === 3
                      ? "top-[30%] right-0"
                      : activeIdx === 4
                      ? "bottom-[3%] left-0"
                      : "bottom-[3%] right-0"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#1748BB] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <activePillar.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-base text-[#1E2026]">
                          {activePillar.name}
                        </span>
                        <span className="text-[10px] font-sans font-bold text-[#1748BB] bg-[#1748BB]/10 px-2 py-0.5 rounded-full uppercase">
                          Pillar 0{activeIdx + 1}
                        </span>
                      </div>
                      <p className="font-sans text-[11px] text-[#1748BB] font-semibold leading-tight mt-0.5">
                        {activePillar.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-neutral-600 mb-3 leading-relaxed">
                    {activePillar.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-100">
                    {activePillar.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-sans font-medium px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Mobile & Tablet Layout ── */}
            <div className="block md:hidden space-y-6">
              {/* Central Full Stack Hub on Mobile */}
              <div className="relative flex justify-center items-center py-4">
                <div className="w-40 h-40 rounded-full bg-[#1748BB] text-white flex flex-col items-center justify-center text-center p-4 shadow-[0_12px_36px_rgba(23,72,187,0.35)] border-4 border-white ring-4 ring-[#1748BB]/20">
                  <span className="font-display font-extrabold text-xl tracking-wider uppercase">
                    FULL STACK
                  </span>
                  <span className="text-[10px] text-blue-200 mt-1 uppercase font-semibold">
                    Creative Hub
                  </span>
                </div>
              </div>

              {/* 6 Blue Pill Buttons in Responsive 2-Column Grid */}
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {FRAMEWORK_PILLARS.map((pillar, i) => {
                  const isActive = i === activeIdx;

                  return (
                    <button
                      key={pillar.id}
                      onClick={() => setActiveIdx(i)}
                      className={`py-3.5 px-4 rounded-full font-display font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-md flex items-center justify-center text-center cursor-pointer ${
                        isActive
                          ? "bg-[#1748BB] text-white ring-4 ring-[#1748BB]/25 scale-105 shadow-[0_8px_25px_rgba(23,72,187,0.35)]"
                          : "bg-[#1748BB] text-white/90 hover:brightness-110"
                      }`}
                    >
                      {pillar.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Active Pillar Detailed Breakdown Card (Mobile Only) ── */}
            <div className="mt-6 sm:mt-10 max-w-2xl mx-auto block md:hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl sm:rounded-3xl bg-white border border-[#1748BB]/20 p-5 sm:p-7 shadow-[0_12px_36px_rgba(23,72,187,0.08)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#1748BB] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <activePillar.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-base sm:text-lg text-[#1E2026]">
                          {activePillar.name}
                        </span>
                        <span className="text-[11px] font-sans font-semibold text-[#1748BB] bg-[#1748BB]/10 px-2.5 py-0.5 rounded-full">
                          Pillar 0{activeIdx + 1}
                        </span>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-neutral-600 mt-1 leading-snug">
                        {activePillar.description}
                      </p>
                    </div>
                  </div>

                  {/* Tool Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 shrink-0 sm:max-w-[210px]">
                    {activePillar.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] sm:text-[11px] font-sans font-medium px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-700 border border-neutral-200"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
