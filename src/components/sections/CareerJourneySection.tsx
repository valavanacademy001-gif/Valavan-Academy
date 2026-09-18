"use client";

/**
 * Career Journey Section
 * "Your Path to a Creative Career."
 * 5-Step sequential traveling light milestone animation.
 * The glowing highlight travels from 01 START to 05 CAREER in a loop.
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import { CMSSectionMeta } from "@/lib/cms";

const TIMELINE_STEPS = [
  {
    step: "01",
    title: "START",
    description: "Zero experience, big ambition",
  },
  {
    step: "02",
    title: "LEARN",
    description: "Build skills in Tamil",
  },
  {
    step: "03",
    title: "PRACTICE",
    description: "Real briefs, live reviews",
  },
  {
    step: "04",
    title: "PORTFOLIO",
    description: "Showcase your best work",
  },
  {
    step: "05",
    title: "CAREER",
    description: "Freelance, hired, or studio",
  },
];

interface CareerJourneySectionProps {
  meta?: CMSSectionMeta;
}

export default function CareerJourneySection({ meta }: CareerJourneySectionProps = {}) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Sequential traveling light timer (loops 01 -> 02 -> 03 -> 04 -> 05 -> 01)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % TIMELINE_STEPS.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="bg-white text-[#1E2026] py-10 sm:py-18 md:py-24 relative overflow-hidden border-b border-neutral-100">
      <Container>
        {/* ── Section Header ───────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <FadeUp delay={0}>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-[#1748BB]" />
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1748BB] font-semibold">
                {meta?.badge || "Career Journey"}
              </span>
              <div className="w-8 h-[2px] bg-[#1748BB]" />
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2
              className="font-display font-bold text-[#1E2026] leading-[1.04] sm:leading-[1.08] tracking-tight"
              style={{ fontSize: "clamp(30px, 4.2vw, 54px)" }}
            >
              {meta?.heading ? (
                <span>{meta.heading}</span>
              ) : (
                <>
                  Your Path to a{" "}
                  <span className="text-[#1748BB]">Creative Career.</span>
                </>
              )}
            </h2>
          </FadeUp>
        </div>

        {/* ── 5-Step Timeline ──────────────────────────────────────── */}
        <FadeUp delay={0.15}>
          <div
            className="relative max-w-5xl mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Desktop Horizontal Blue Connecting Track */}
            <div
              className="hidden md:block absolute top-[28px] left-[5%] right-[5%] h-[2.5px] bg-[#1748BB]/20 z-0"
              aria-hidden
            />

            {/* Active Traveling Progress Bar */}
            <motion.div
              className="hidden md:block absolute top-[28px] left-[5%] h-[2.5px] bg-[#1748BB] shadow-[0_0_10px_rgba(23,72,187,0.8)] z-0 transition-all duration-500"
              style={{
                width: `${(activeStepIndex / (TIMELINE_STEPS.length - 1)) * 90}%`,
              }}
              aria-hidden
            />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
              {TIMELINE_STEPS.map((item, idx) => {
                const isActive = idx === activeStepIndex;

                return (
                  <div
                    key={item.step}
                    onClick={() => setActiveStepIndex(idx)}
                    className="flex flex-col items-center text-center group cursor-pointer"
                  >
                    {/* Step Number Circle with Traveling Pulse Light */}
                    <div className="relative">
                      {/* Ambient Glow Aura when Active */}
                      {isActive && (
                        <motion.div
                          layoutId="activeGlow"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1.25 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                          className="absolute -inset-2 rounded-full bg-[#1748BB]/20 blur-md pointer-events-none"
                        />
                      )}

                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center font-mono font-bold text-base transition-all duration-300 relative z-10 ${
                          isActive
                            ? "bg-[#1748BB] text-white ring-4 ring-blue-100 scale-110 shadow-lg shadow-[#1748BB]/30"
                            : "bg-white text-neutral-400 border-2 border-neutral-200 hover:border-[#1748BB] hover:text-[#1748BB]"
                        }`}
                      >
                        {item.step}
                      </div>
                    </div>

                    {/* Step Title & Subtitle */}
                    <div className="mt-4 space-y-1">
                      <p
                        className={`font-display font-bold text-sm tracking-wide transition-colors duration-200 ${
                          isActive ? "text-[#1748BB]" : "text-[#1E2026]"
                        }`}
                      >
                        {item.title}
                      </p>
                      <p className="font-sans text-xs text-neutral-500 max-w-[130px] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
