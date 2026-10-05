"use client";

import React from "react";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import { HelpCircle, Star, ArrowRight, CheckCircle2, ArrowDown, Sparkles } from "lucide-react";
import { EXTERNAL_URLS } from "@/data/site.config";

interface FullStackCreatorOfferSectionProps {
  enrollUrl?: string;
  durationText?: string;
  badge?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  description?: string;
  features?: string[];
  offerMap?: Record<string, string>;
}

export default function FullStackCreatorOfferSection({
  enrollUrl = EXTERNAL_URLS.enrollFullStack,
  durationText = "6 Months",
  badge,
  titlePrefix,
  titleHighlight,
  description,
  features,
  offerMap,
}: FullStackCreatorOfferSectionProps) {
  const effectiveBadge = badge || offerMap?.badge || "Make Your Next Move Count";
  const effectiveTitlePrefix = titlePrefix || offerMap?.title_prefix || "Learn How To Work With ";
  const effectiveTitleHighlight = titleHighlight || offerMap?.title_highlight || "AI, Not Compete Against It.";
  const effectiveDescription =
    description ||
    offerMap?.description ||
    "AI is changing how creators work. Instead of fearing it, learn how to leverage AI to improve creativity, productivity, research, content creation, and workflow efficiency.";

  const studentReasons = [
    "Future-Ready Skills",
    "Practical Learning",
    "Portfolio Projects",
    "Career Growth",
    "Freelancing Opportunities",
  ];

  const defaultAiSkills = [
    "AI Design Workflows",
    "AI Content Systems",
    "AI Research Methods",
    "Prompt Engineering Basics",
    "AI Productivity Tools",
    "Creative Automation",
  ];

  const frameworkSteps = [
    "Design",
    "Content",
    "Video",
    "AI",
    "Website",
    "Marketing",
    "Results",
  ];

  const cardTitle = offerMap?.card_title || "Full Stack Creative™ Framework";
  const cardBadge = offerMap?.card_badge || durationText || "Lifetime Access";
  const buttonText = offerMap?.button_text || "Join Today";
  const cardNote = offerMap?.card_note || "For A Limited Time Only";
  const finalEnrollUrl = offerMap?.enroll_url || enrollUrl;

  return (
    <section className="py-10 sm:py-20 md:py-28 bg-[#FBFDFF] relative z-20 overflow-hidden border-t border-neutral-100 select-none">
      {/* Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-[#1748BB]/5 rounded-full blur-[150px] pointer-events-none"
        aria-hidden
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-14">
          <FadeUp delay={0}>
            <div className="inline-flex items-center justify-center mb-4">
              <span className="inline-flex items-center gap-2 border border-[#1748BB]/30 text-[#1748BB] font-sans text-xs font-bold px-4 py-1.5 rounded-full bg-[#1748BB]/5 shadow-sm">
                <HelpCircle size={14} className="text-[#1748BB]" />
                {effectiveBadge}
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2
              className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(28px, 4.2vw, 50px)" }}
            >
              {effectiveTitlePrefix}
              <span style={{ color: "#1748BB" }} className="!text-[#1748BB]">
                {effectiveTitleHighlight}
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="font-sans text-neutral-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
              {effectiveDescription}
            </p>
          </FadeUp>

          {/* Centered Indicator Dot matching Image 2 */}
          <div className="flex items-center justify-center mt-6">
            <span className="w-8 h-8 rounded-full border border-[#1748BB]/30 flex items-center justify-center bg-[#1748BB]/5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1748BB]" />
            </span>
          </div>
        </div>

        {/* ── Master Offer Card ── */}
        <FadeUp delay={0.15}>
          <div className="max-w-5xl mx-auto rounded-[32px] sm:rounded-[40px] bg-white border-2 border-[#1748BB]/20 shadow-[0_20px_60px_rgba(23,72,187,0.08)] p-6 sm:p-10 lg:p-12 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Why Students Join This Program */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1E2026] uppercase tracking-wide mb-3">
                    Why Students Join This Program
                  </h3>
                  <div className="inline-block bg-[#1748BB] text-white font-sans text-xs font-bold px-4 py-1.5 rounded-md shadow-sm">
                    Features
                  </div>
                </div>

                {/* 5 Core Reasons with Checkmarks */}
                <ul className="space-y-3 pt-1">
                  {studentReasons.map((reason) => (
                    <li key={reason} className="flex items-center gap-3 font-sans text-sm sm:text-base font-semibold text-[#1E2026]">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 shadow-sm">
                        <CheckCircle2 size={15} className="text-emerald-600" />
                      </div>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>

                {/* Additional AI Capabilities Badges */}
                <div className="pt-4 border-t border-neutral-100">
                  <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-3">
                    Key AI Capabilities Included
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {defaultAiSkills.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 font-sans text-xs sm:text-sm font-medium text-neutral-700">
                        <Star size={13} className="text-[#1748BB] fill-[#1748BB] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Center Dotted Divider (Desktop only) */}
              <div className="hidden lg:block lg:col-span-1 h-96 border-r-2 border-dashed border-[#1748BB]/25 mx-auto" />

              {/* Right Column: Full Stack Creative™ Framework Blue Action Box */}
              <div className="lg:col-span-5">
                <div className="rounded-[24px] sm:rounded-[30px] bg-[#1748BB] p-7 sm:p-9 text-center text-white relative overflow-hidden shadow-[0_16px_45px_rgba(23,72,187,0.3)] border-2 border-dashed border-white/40">
                  
                  {/* Subtle Background Pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{
                      backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 40%)",
                      backgroundSize: "20px 20px",
                    }}
                    aria-hidden
                  />

                  <div className="relative z-10 space-y-3.5">
                    <h4
                      className="font-display font-bold text-xl sm:text-2xl text-white leading-tight"
                      style={{ color: "#FFFFFF" }}
                    >
                      {cardTitle}
                    </h4>

                    {/* Framework Steps Flow */}
                    <div className="py-2 flex flex-col items-center justify-center space-y-1">
                      {frameworkSteps.map((step, idx) => {
                        const isLast = idx === frameworkSteps.length - 1;
                        return (
                          <React.Fragment key={step}>
                            <div
                              className={`px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all ${
                                isLast
                                  ? "bg-amber-400 text-neutral-900 shadow-md scale-105 border border-amber-300 flex items-center gap-1.5"
                                  : "bg-white/15 text-white border border-white/20 hover:bg-white/25"
                              }`}
                            >
                              {isLast && <Sparkles size={13} className="text-neutral-900" />}
                              <span>{step}</span>
                            </div>
                            {!isLast && (
                              <ArrowDown size={14} className="text-white/60 my-0.5" />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>

                    <p
                      className="font-sans text-[11px] sm:text-xs font-semibold tracking-wider uppercase pt-1"
                      style={{ color: "#BACFFF" }}
                    >
                      {cardBadge}
                    </p>

                    <div className="pt-2">
                      <a
                        href={finalEnrollUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ backgroundColor: "#FFFFFF", color: "#1748BB" }}
                        className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F0F5FF] !text-[#1748BB] font-sans font-bold text-sm sm:text-base px-8 py-3.5 rounded-full hover:scale-105 transition-all duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.25)] w-full"
                      >
                        <span style={{ color: "#1748BB" }} className="!text-[#1748BB] font-bold">
                          {buttonText}
                        </span>
                        <ArrowRight size={17} style={{ color: "#1748BB" }} className="!text-[#1748BB]" />
                      </a>
                    </div>

                    <p className="text-[11px] text-white/70 italic">
                      {cardNote}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
