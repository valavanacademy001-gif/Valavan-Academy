"use client";

/**
 * Valavan Academy — Signature Scroll-Driven Skill Stack Section
 *
 * Concept:
 * 4 individual skills gradually combine into ONE CREATOR as the user scrolls.
 *
 * 01 Graphic Design
 * 02 Video Editing
 * 03 Web & UI/UX
 * 04 AI Tooling
 *      ↓
 * FULL STACK CREATOR (Design × Video × Web × AI | 4 SKILLS → 1 CREATOR)
 */

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Palette,
  Video,
  Globe,
  Brain,
  ArrowRight,
  Sparkles,
  Check,
  Layers,
} from "lucide-react";
import Container from "@/components/ui/Container";
import InteractiveGridBackground from "@/components/ui/InteractiveGridBackground";
import { initGSAP, gsap, ScrollTrigger } from "@/lib/gsap";

interface ToolItem {
  name: string;
  image: string;
}

interface SkillData {
  id: string;
  step: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  tools: ToolItem[];
  badge: string;
}

const SKILLS: SkillData[] = [
  {
    id: "graphic",
    step: "01",
    name: "Graphic Design",
    tagline: "Visual Identity & Branding",
    description:
      "Master layout principles, color theory, typography, and high-impact commercial branding.",
    icon: Palette,
    tools: [
      { name: "Photoshop", image: "/assets/tools/ps.png" },
      { name: "Illustrator", image: "/assets/tools/illustrator.png" },
      { name: "Canva", image: "/assets/tools/canva.png" },
      { name: "CorelDraw", image: "/assets/tools/coreldraw.png" },
      { name: "InDesign", image: "/assets/tools/indesign.png" },
    ],
    badge: "Foundation Layer",
  },
  {
    id: "video",
    step: "02",
    name: "Video Editing",
    tagline: "Motion & Dynamic Storytelling",
    description:
      "Transform static visuals into retention-driven reels, YouTube videos, and high-converting ads.",
    icon: Video,
    tools: [
      { name: "Premiere Pro", image: "/assets/tools/premiere-pro.png" },
      { name: "After Effects", image: "/assets/tools/after-effects.png" },
      { name: "Media Encoder", image: "/assets/tools/media-encoder.png" },
      { name: "Adobe Podcast", image: "/assets/tools/adobe-podcast.png" },
    ],
    badge: "Engagement Layer",
  },
  {
    id: "web",
    step: "03",
    name: "Web & UI/UX",
    tagline: "Digital Experience & Platforms",
    description:
      "Design and deploy modern, responsive landing pages, e-commerce, and high-converting websites.",
    icon: Globe,
    tools: [
      { name: "WordPress", image: "/assets/tools/wordpress.png" },
      { name: "Elementor Pro", image: "/assets/tools/elementor-pro.png" },
      { name: "WooCommerce", image: "/assets/tools/woocommerce.png" },
      { name: "Rank Math", image: "/assets/tools/rank-math.png" },
      { name: "WP Rocket", image: "/assets/tools/wp-rocket.png" },
    ],
    badge: "Conversion Layer",
  },
  {
    id: "ai",
    step: "04",
    name: "AI Tooling",
    tagline: "10x Velocity & Automation",
    description:
      "Leverage generative AI models to multiply workflow speed, asset generation, and creative scale.",
    icon: Brain,
    tools: [
      { name: "ChatGPT", image: "/assets/tools/chatgpt.png" },
      { name: "Gemini AI", image: "/assets/tools/gemini-ai.png" },
      { name: "HeyGen", image: "/assets/tools/heygen.png" },
    ],
    badge: "Multiplier Layer",
  },
];

export default function SkillStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const stackStageRef = useRef<HTMLDivElement>(null);

  // Active step (1 to 4): 1=Design, 2=Video, 3=Web, 4=AI & Complete
  const [activeStep, setActiveStep] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // GSAP ScrollTrigger integration for desktop pinned stack animation
  useEffect(() => {
    initGSAP();

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: pinContainerRef.current,
        start: "top top+=75px",
        end: "+=170%",
        pin: pinContainerRef.current,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          if (progress < 0.22) {
            setActiveStep(1);
          } else if (progress < 0.48) {
            setActiveStep(2);
          } else if (progress < 0.74) {
            setActiveStep(3);
          } else {
            setActiveStep(4);
          }
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skill-stack-experience"
      className="bg-white text-[#1E2026] relative border-t border-neutral-100 overflow-x-clip py-4 sm:py-6 flex flex-col justify-start"
    >
      {/* Pixel Gradient Pattern Background */}
      <InteractiveGridBackground />

      {/* Background ambient light tint */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-[#EFF4FF] rounded-full blur-[140px] pointer-events-none" />

      {/* ── DESKTOP PINNED SCROLL-DRIVEN STACK EXPERIENCE (Header + Stage Pinned Together) ── */}
      <div ref={pinContainerRef} className="hidden lg:flex flex-col justify-start min-h-[90vh] pb-8 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="pt-4 pb-4">
          <Container>
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-8 h-[2px] bg-[#1748BB]" />
                <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1748BB] font-semibold">
                  Power of Stacking
                </span>
                <div className="w-8 h-[2px] bg-[#1748BB]" />
              </div>
              <h2
                className="font-display font-bold text-[#1E2026] leading-[1.06] tracking-tight mb-2"
                style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
              >
                One Skill Is Good.{" "}
                <span className="text-[#1748BB]">A Skill Stack Is Powerful.</span>
              </h2>
              <p className="font-sans text-neutral-600 text-sm max-w-2xl mx-auto leading-relaxed font-normal">
                Scroll down to watch how combining Design, Video, Web, and AI
                gradually stacks together into one complete, high-demand Creator.
              </p>
            </div>
          </Container>
        </div>

        <Container>
          <div className="grid grid-cols-12 gap-10 items-stretch">
            
            {/* ── Left / Center: Physical Card-Deck Stacking Stage (7 Cols) ── */}
            <div
              ref={stackStageRef}
              className="col-span-7 relative flex flex-col justify-between"
            >
              {/* Stack Layer Progress Tracker */}
              <div className="flex items-center justify-between gap-2 mb-6 pb-3 border-b border-neutral-200/80">
                <span className="text-xs font-sans font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers size={14} className="text-[#1748BB]" />
                  PHYSICAL SKILL STACK
                </span>
                <div className="flex items-center gap-1.5">
                  {SKILLS.map((s, idx) => {
                    const isPassed = activeStep >= idx + 1;
                    const isCur = activeStep === idx + 1;
                    return (
                      <div
                        key={s.id}
                        className={`h-2 rounded-full transition-all duration-400 ${
                          isCur
                            ? "w-8 bg-[#1748BB]"
                            : isPassed
                            ? "w-4 bg-[#60A5FA]"
                            : "w-2 bg-neutral-200"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Physical Card Deck Container */}
              <div className="relative w-full h-[320px] sm:h-[330px]">
                {SKILLS.map((skill, index) => {
                  const skillStepNum = index + 1;
                  const isStacked = activeStep >= skillStepNum;
                  const isTopActive = activeStep === skillStepNum;
                  const diffFromTop = activeStep - skillStepNum;

                  // Physical slide-up & stack transform calculations
                  let translateY = 0;
                  let scale = 1;
                  let opacity = 1;
                  let zIndex = 10 + index * 10;
                  let pointerEvents = "auto";

                  if (activeStep < skillStepNum) {
                    // Card is waiting below in the deck
                    translateY = 180;
                    scale = 0.94;
                    opacity = 0;
                    zIndex = 5;
                    pointerEvents = "none";
                  } else if (isTopActive) {
                    // Current top stacked card
                    translateY = 0;
                    scale = 1;
                    opacity = 1;
                    zIndex = 40;
                  } else {
                    // Stacked underneath: neatly layered tabs behind
                    translateY = -diffFromTop * 14;
                    scale = 1 - diffFromTop * 0.035;
                    opacity = Math.max(0.4, 0.9 - diffFromTop * 0.2);
                    zIndex = 10 + index * 5;
                  }

                  return (
                    <div
                      key={skill.id}
                      className="absolute inset-x-0 top-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                      style={{
                        transform: `translateY(${translateY}px) scale(${scale})`,
                        opacity,
                        zIndex,
                        pointerEvents: pointerEvents as any,
                      }}
                    >
                      {/* Physical Card */}
                      <div
                        className={`rounded-[24px] border-2 p-6 sm:p-7 transition-all duration-500 bg-white select-none ${
                          isTopActive
                            ? "border-[#1748BB] shadow-[0_20px_50px_rgba(23,72,187,0.18)]"
                            : "border-neutral-300/80 shadow-[0_8px_25px_rgba(0,0,0,0.06)]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          {/* Step number & Icon */}
                          <div className="flex items-center gap-3.5">
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                isTopActive
                                  ? "bg-[#1748BB] text-white shadow-[0_6px_20px_rgba(23,72,187,0.35)] scale-105"
                                  : "bg-[#EFF4FF] text-[#1748BB]"
                              }`}
                            >
                              <skill.icon size={22} />
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-neutral-400 tracking-wider">
                                  {skill.step}
                                </span>
                                <span className="text-xs font-sans font-semibold px-2.5 py-0.5 rounded-full bg-[#EFF4FF] text-[#1748BB]">
                                  {skill.badge}
                                </span>
                              </div>
                              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1E2026] leading-snug mt-0.5">
                                {skill.name}
                              </h3>
                            </div>
                          </div>

                          {/* Top Card Badge */}
                          <div className="flex items-center gap-2">
                            {isTopActive ? (
                              <span className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[#1748BB] bg-[#EFF4FF] px-3 py-1 rounded-full border border-[#BFDBFE] shadow-2xs">
                                <Check size={13} className="stroke-[3]" />
                                Active Layer
                              </span>
                            ) : (
                              <span className="text-xs font-sans text-neutral-500 font-medium px-2 py-0.5 bg-neutral-100 rounded-md">
                                Stacked
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <div className="mt-3.5 pl-15">
                          <p className="font-sans text-sm text-neutral-600 leading-relaxed font-normal">
                            {skill.description}
                          </p>

                          {/* Pure Tool Logos (Enlarged & prominent) */}
                          <div className="flex flex-wrap items-center gap-4 mt-4 pt-3.5 border-t border-neutral-100">
                            <span className="text-xs font-sans text-neutral-400 font-semibold mr-1">
                              Tools:
                            </span>
                            {skill.tools.map((tool) => (
                              <div
                                key={tool.name}
                                title={tool.name}
                                className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center transition-all duration-200 hover:scale-125 cursor-pointer"
                              >
                                <Image
                                  src={tool.image}
                                  alt={tool.name}
                                  width={44}
                                  height={44}
                                  className="object-contain max-h-10 max-w-10 sm:max-h-11 sm:max-w-11 w-auto h-auto drop-shadow-xs"
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ── Final Transformation Visual Payoff Banner ── */}
              <div
                className={`mt-8 rounded-[24px] p-6 sm:p-7 transition-all duration-700 border-2 overflow-hidden relative ${
                  activeStep === 4
                    ? "bg-[#1748BB] border-[#1748BB] text-white shadow-[0_20px_50px_rgba(23,72,187,0.3)] translate-y-0 opacity-100 scale-100"
                    : "bg-[#F8FAFC] border-dashed border-neutral-300 text-neutral-600 translate-y-2 opacity-70 scale-98"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Layers size={16} className={activeStep === 4 ? "text-blue-200" : "text-[#1748BB]"} />
                      <span
                        className={`text-[11px] font-sans font-bold tracking-[0.2em] uppercase ${
                          activeStep === 4 ? "text-blue-200" : "text-neutral-400"
                        }`}
                      >
                        FINAL TRANSFORMATION PAYOFF
                      </span>
                    </div>
                    <div
                      style={{ color: activeStep === 4 ? "#FFFFFF" : "#1E2026" }}
                      className="font-display font-black text-2xl sm:text-3xl tracking-tight leading-tight"
                    >
                      FULL STACK CREATOR
                    </div>
                    <div
                      className={`text-xs sm:text-sm font-sans font-medium ${
                        activeStep === 4 ? "text-blue-100" : "text-neutral-500"
                      }`}
                    >
                      Design × Video × Web × AI
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span
                      className={`text-xs font-sans font-extrabold px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                        activeStep === 4
                          ? "bg-white text-[#1748BB] shadow-md"
                          : "bg-white border border-neutral-300 text-neutral-500"
                      }`}
                    >
                      4 SKILLS → 1 CREATOR
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* ── Right Side: Streamlined Minimal Creator Level Panel (5 Cols) ── */}
            <div className="col-span-5 flex flex-col justify-between h-full">
              
              <div className="h-full rounded-[24px] p-6 bg-gradient-to-b from-[#F5F8FF] via-white to-[#F9FBFF] border-2 border-[#1748BB]/20 shadow-[0_16px_40px_rgba(23,72,187,0.08)] relative overflow-hidden flex flex-col justify-between">
                {/* Subtle top brand glow accent */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-[#1748BB]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-3.5 relative z-10 flex-1 flex flex-col justify-between">
                  {/* Top Status Header */}
                  <div className="flex items-center justify-between border-b border-neutral-200/80 pb-3">
                    <span className="text-[11px] font-sans text-[#1748BB] font-bold uppercase tracking-[0.18em] flex items-center gap-1.5">
                      <Sparkles size={14} className="text-[#1748BB]" />
                      YOUR CREATOR LEVEL
                    </span>

                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#1748BB] text-white shadow-xs">
                      {activeStep} / 4 SKILLS
                    </span>
                  </div>

                  {/* Creator Level Title */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-sans font-semibold text-[#1748BB] uppercase tracking-wider">
                      {activeStep === 4 ? "COMPLETE MASTERY" : "IN PROGRESS"}
                    </div>
                    <h3 className="font-display font-bold text-2xl sm:text-[26px] text-[#1E2026] tracking-tight leading-tight">
                      {activeStep === 1 && "Graphic Specialist"}
                      {activeStep === 2 && "Visual Storyteller"}
                      {activeStep === 3 && "Full-Stack Designer"}
                      {activeStep === 4 && "FULL STACK CREATOR"}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-neutral-600 leading-relaxed font-normal pt-0.5">
                      {activeStep === 1 &&
                        "Solid foundation in branding, layout, and static visual communication."}
                      {activeStep === 2 &&
                        "Combines static design with dynamic motion video and narrative storytelling."}
                      {activeStep === 3 &&
                        "Delivers complete digital ecosystems — from visual branding to interactive live websites."}
                      {activeStep === 4 &&
                        "Unstoppable creator equipped with Design, Motion, Web platforms, and 10x AI automation."}
                    </p>
                  </div>

                  {/* 4 Skill Stack Checklist Visualizer (Compact rows) */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-sans text-neutral-400 font-semibold tracking-wider uppercase">
                      Skill Stack Integration
                    </div>

                    <div className="grid grid-cols-1 gap-1.5">
                      {SKILLS.map((s, idx) => {
                        const isUnlocked = activeStep >= idx + 1;
                        return (
                          <div
                            key={s.id}
                            className={`flex items-center justify-between px-3 py-1.5 rounded-lg border transition-all duration-300 ${
                              isUnlocked
                                ? "bg-white border-[#1748BB]/30 text-[#1E2026] shadow-2xs"
                                : "bg-neutral-50 border-neutral-200/80 text-neutral-400 opacity-50"
                            }`}
                          >
                            <div className="flex items-center gap-2 text-xs font-sans font-medium">
                              <span
                                className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-mono ${
                                  isUnlocked
                                    ? "bg-[#1748BB] text-white"
                                    : "bg-neutral-200 text-neutral-500"
                                }`}
                              >
                                {isUnlocked ? "✓" : s.step}
                              </span>
                              <span className="font-semibold text-xs">{s.name}</span>
                            </div>
                            <span
                              className={`text-[9px] font-sans font-bold px-1.5 py-0.5 rounded ${
                                isUnlocked
                                  ? "bg-[#EFF4FF] text-[#1748BB]"
                                  : "text-neutral-400"
                              }`}
                            >
                              {isUnlocked ? "Active" : "Locked"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-4 mt-4 border-t border-neutral-200/80 relative z-10">
                  <Link
                    href="/programs/full-stack-creator"
                    style={{ color: "#FFFFFF" }}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#1748BB] hover:bg-[#0A3CA8] !text-white font-sans font-bold text-sm px-5 py-3 rounded-full shadow-[0_6px_20px_rgba(23,72,187,0.3)] hover:scale-[1.01] transition-all group"
                  >
                    <span style={{ color: "#FFFFFF" }} className="!text-white font-bold">
                      Build Your Full Stack
                    </span>
                    <ArrowRight size={15} style={{ color: "#FFFFFF" }} className="!text-white group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>

            </div>

          </div>
        </Container>
      </div>

      {/* ── DEDICATED MOBILE VERTICAL STACK EXPERIENCE (Sticky Stacking Deck) ── */}
      <div className="lg:hidden pb-10 relative z-10 px-4">
        {/* Mobile Header */}
        <div className="pt-4 pb-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-8 h-[2px] bg-[#1748BB]" />
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1748BB] font-semibold">
              Power of Stacking
            </span>
            <div className="w-8 h-[2px] bg-[#1748BB]" />
          </div>
          <h2
            className="font-display font-bold text-[#1E2026] leading-[1.06] tracking-tight mb-2"
            style={{ fontSize: "clamp(24px, 4.4vw, 48px)" }}
          >
            One Skill Is Good.{" "}
            <span className="text-[#1748BB]">A Skill Stack Is Powerful.</span>
          </h2>
          <p className="font-sans text-neutral-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-normal">
            Scroll down to watch how combining Design, Video, Web, and AI
            gradually stacks together into one complete, high-demand Creator.
          </p>
        </div>

        <div className="max-w-md mx-auto relative flex flex-col">
          
          {SKILLS.map((skill, index) => {
            return (
              <MobileSkillCard key={skill.id} skill={skill} index={index} />
            );
          })}

          {/* Mobile Final Culmination Card (Topmost Stacking Card) */}
          <div
            className="mb-4"
            style={{
              position: "sticky",
              top: "135px",
              zIndex: 50,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-[24px] p-5 sm:p-6 bg-gradient-to-b from-[#F5F8FF] to-white text-[#1E2026] border-2 border-[#1748BB]/40 shadow-[0_16px_40px_rgba(23,72,187,0.18)] space-y-3.5"
            >
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#1748BB] flex items-center gap-1.5">
                  <Sparkles size={13} className="text-[#1748BB]" />
                  YOUR CREATOR LEVEL
                </span>
                <span className="text-[11px] font-sans font-extrabold px-2.5 py-0.5 rounded-full bg-[#1748BB] text-white shadow-xs">
                  COMPLETE
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-2xl text-[#1E2026] tracking-tight">
                  FULL STACK CREATOR
                </h3>
                <p className="text-xs font-sans font-bold text-[#1748BB]">
                  Design × Video × Web × AI
                </p>
                <p className="text-xs font-sans text-neutral-600 leading-relaxed pt-1">
                  4 essential digital skills combined into one high-demand creative powerhouse.
                </p>
              </div>

              <div className="pt-1.5">
                <Link
                  href="/programs/full-stack-creator"
                  style={{ color: "#FFFFFF" }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1748BB] hover:bg-[#0A3CA8] !text-white font-sans font-bold text-sm px-5 py-3.5 rounded-full shadow-md transition-all"
                >
                  <span style={{ color: "#FFFFFF" }} className="!text-white font-bold">
                    Build Your Full Stack →
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

    </section>
  );
}

/**
 * Mobile Skill Card Component with Sticky Stacking Deck Animation
 */
function MobileSkillCard({
  skill,
  index,
}: {
  skill: SkillData;
  index: number;
}) {
  const topOffset = 75 + index * 15;
  const zIndex = 10 + index * 10;

  return (
    <div
      className="mb-6"
      style={{
        position: "sticky",
        top: `${topOffset}px`,
        zIndex: zIndex,
      }}
    >
      <div className="p-5 sm:p-6 rounded-[24px] border-2 border-[#1748BB]/25 bg-white shadow-[0_14px_40px_rgba(23,72,187,0.12)] transition-all duration-300">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#1748BB] text-white shadow-xs">
              <skill.icon size={18} />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-neutral-400">
                LAYER {skill.step}
              </span>
              <h4 className="font-display font-bold text-base text-[#1E2026] leading-tight">
                {skill.name}
              </h4>
            </div>
          </div>

          <span className="text-[10px] font-sans font-bold px-2.5 py-0.5 rounded-full bg-[#EFF4FF] text-[#1748BB] border border-[#BFDBFE]">
            {skill.badge}
          </span>
        </div>

        <p className="font-sans text-xs text-neutral-600 leading-relaxed mt-3">
          {skill.description}
        </p>

        {/* Pure Tool Logos on Mobile (Enlarged) */}
        <div className="flex flex-wrap items-center gap-3.5 mt-3.5 pt-3 border-t border-neutral-100">
          {skill.tools.map((tool) => (
            <div
              key={tool.name}
              title={tool.name}
              className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center"
            >
              <Image
                src={tool.image}
                alt={tool.name}
                width={40}
                height={40}
                className="object-contain max-h-9 max-w-9 sm:max-h-10 sm:max-w-10 w-auto h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
