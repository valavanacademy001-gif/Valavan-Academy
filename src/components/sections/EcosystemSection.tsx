"use client";

/**
 * Valavan Academy — One Ecosystem. Four Ways In. Section
 * Exact 1:1 match of the Figma design (1st image):
 * 4 Tiered Numbered Pills with soft pastel blue & solid Valavan blue states,
 * dynamic active state on scroll/click, and bottom pill progress indicators.
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, BookOpen, Users, Briefcase, Cpu, CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import { cn } from "@/lib/utils";

const ECOSYSTEM_STEPS = [
  {
    step: 4,
    id: "labs",
    name: "Labs",
    tagline: "Learn. Build. Ship. Earn",
    subdesc: "Studio, AI Tools & Venture Incubation",
    icon: Cpu,
    description:
      "Advanced incubation for top graduates. Work with cutting-edge AI workflows, high-production gear, and real commercial agency projects.",
    points: [
      "Access to premium AI tooling, models & pipelines",
      "Full studio production & video editing setups",
      "Incubation & revenue-share for creators launching digital products",
    ],
    ctaText: "Explore Labs",
    ctaHref: "/community",
    external: false,
  },
  {
    step: 3,
    id: "experience",
    name: "Experience",
    tagline: "Go Beyond the Classroom",
    subdesc: "Live Client Briefs & Internships",
    icon: Briefcase,
    description:
      "Bridge the gap between learning and earning. Work on verified client briefs, build commercial case studies, and get paid project experience.",
    points: [
      "Real commercial client project assignments with deadlines",
      "1-on-1 portfolio reviews by senior agency creative directors",
      "Direct freelance referrals & career placement assistance",
    ],
    ctaText: "View Experience Track",
    ctaHref: "/programs/full-stack-creator",
    external: false,
  },
  {
    step: 2,
    id: "community",
    name: "Community",
    tagline: "Grow Together",
    subdesc: "TNCC — 40,000+ Creators Network",
    icon: Users,
    description:
      "Connect with passionate Tamil designers, editors, and creators. Share feedback, find project partners, and attend monthly creator meetups.",
    points: [
      "Daily design critique, feedback & mentorship channels",
      "Exclusive community masterclasses & offline city meetups",
      "Creator job board with remote and full-time hiring partners",
    ],
    ctaText: "Join TNCC Community",
    ctaHref: "https://tamilnaducreatorsclub.com/",
    external: true,
  },
  {
    step: 1,
    id: "learn",
    name: "Learn",
    tagline: "Build Your Skills.",
    subdesc: "Tamil-Medium Digital Mastery",
    icon: BookOpen,
    description:
      "For anyone starting from scratch or leveling up. Build a sustainable, high-income career in digital design, video editing, and full-stack creation.",
    points: [
      "100% Tamil practical video lessons with step-by-step assignments",
      "Master Photoshop, Illustrator, Premiere Pro, Figma & Web Design",
      "Lifetime access to recordings, design toolkits & asset libraries",
    ],
    ctaText: "Explore Courses",
    ctaHref: "/programs",
    external: false,
  },
];

export default function EcosystemSection() {
  const [activeStepNum, setActiveStepNum] = useState<number>(4);
  const sectionRef = useRef<HTMLDivElement>(null);

  const activeStep = ECOSYSTEM_STEPS.find((s) => s.step === activeStepNum) || ECOSYSTEM_STEPS[0];

  // Auto progression or interactive selection
  const stepIndices = [4, 3, 2, 1];
  const currentStepPos = stepIndices.indexOf(activeStepNum) + 1;

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-white border-t border-neutral-100 overflow-hidden">
      <Container>
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-18">
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#1748BB]" />
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1748BB] font-semibold">
                Four Pillars
              </span>
            </div>
            <h2 className="text-[34px] sm:text-[44px] md:text-[52px] font-bold leading-[1.12] tracking-tight font-display text-[#1E2026]">
              One Ecosystem. <span className="text-[#1748BB]">Four Ways In.</span>
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 mt-3 max-w-2xl font-normal leading-relaxed">
              Whether you are starting from zero, leveling up your creative career, or looking for high-paying client work — there is a tailored track for you.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: 4 Tiered Numbered Pills matching exact Figma layout */}
          <div className="lg:col-span-6 space-y-4">
            {ECOSYSTEM_STEPS.map((item) => {
              const isSelected = activeStepNum === item.step;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setActiveStepNum(item.step)}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className={cn(
                    "relative w-full flex items-center justify-between px-6 sm:px-8 py-5 sm:py-6 rounded-[28px] cursor-pointer transition-all duration-400 overflow-hidden border",
                    isSelected
                      ? "bg-[#1748BB] text-white border-[#1748BB] shadow-[0_15px_35px_rgba(23, 72, 187,0.35)]"
                      : "bg-[#D7E3FF]/70 text-[#0A3CA8] border-[#C2D6FF] hover:bg-[#D7E3FF]"
                  )}
                >
                  {/* Left content inside pill */}
                  <div className="space-y-1 relative z-10">
                    <h3
                      className={cn(
                        "text-2xl sm:text-3xl font-bold font-display leading-tight tracking-tight",
                        isSelected ? "text-white" : "text-[#0A3CA8]"
                      )}
                    >
                      {item.name}
                    </h3>
                    <p
                      className={cn(
                        "text-xs sm:text-sm font-medium font-sans",
                        isSelected ? "text-blue-100" : "text-[#1748BB]"
                      )}
                    >
                      {item.tagline}
                    </p>
                  </div>

                  {/* Right: Big Translucent Number matching Figma */}
                  <span
                    className={cn(
                      "text-5xl sm:text-6xl md:text-7xl font-extrabold font-display leading-none select-none tracking-tighter",
                      isSelected ? "text-white/85" : "text-white"
                    )}
                  >
                    {item.step}
                  </span>
                </motion.div>
              );
            })}

            {/* Bottom Step Indicator matching Figma (1 / 4) */}
            <div className="flex items-center gap-3 pt-2 pl-2">
              <div className="flex gap-1.5">
                {[4, 3, 2, 1].map((st) => (
                  <button
                    key={st}
                    onClick={() => setActiveStepNum(st)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      activeStepNum === st ? "w-6 bg-[#1748BB]" : "w-2 bg-neutral-300 hover:bg-neutral-400"
                    )}
                    aria-label={`Track ${st}`}
                  />
                ))}
              </div>
              <span className="font-sans text-xs text-neutral-500 font-medium">
                {currentStepPos} / 4
              </span>
            </div>

          </div>

          {/* Right Column: Dynamic Active Card with Rich Details */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 sm:p-10 rounded-[32px] bg-[#07080D] text-white border border-neutral-800 shadow-[0_25px_70px_rgba(0,0,0,0.6)] space-y-6"
              >
                <div className="flex items-center justify-between border-b border-neutral-800 pb-5">
                  <div className="flex items-center gap-3">
                    <span className="px-3.5 py-1 rounded-full bg-[#1748BB] text-white text-xs font-bold uppercase tracking-wider">
                      PILLAR {activeStep.step}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                      {activeStep.name}
                    </h3>
                  </div>

                  <Sparkles size={22} className="text-[#4A90E2]" />
                </div>

                <p className="text-base text-neutral-300 leading-relaxed font-normal">
                  {activeStep.description}
                </p>

                {/* Key Points */}
                <div className="space-y-3.5 pt-1">
                  {activeStep.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-neutral-300 font-normal">
                      <CheckCircle2 size={18} className="text-[#1748BB] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Action CTA Button */}
                <div className="pt-4 border-t border-neutral-800/80">
                  <a
                    href={activeStep.ctaHref}
                    target={activeStep.external ? "_blank" : undefined}
                    rel={activeStep.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 bg-[#1748BB] hover:bg-[#0A3CA8] text-white px-8 py-4 rounded-full font-bold text-sm sm:text-base shadow-[0_10px_30px_rgba(23, 72, 187,0.4)] hover:scale-105 transition-all duration-200"
                  >
                    <span>{activeStep.ctaText}</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </Container>
    </section>
  );
}
