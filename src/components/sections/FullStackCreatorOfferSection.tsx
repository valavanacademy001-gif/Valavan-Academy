"use client";

import React from "react";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import { HelpCircle, Star, ArrowRight } from "lucide-react";
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
  enrollUrl = EXTERNAL_URLS.signup,
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

  const defaultFeatures = [
    "AI Design Workflows",
    "AI Content Systems",
    "AI Research Methods",
    "Prompt Engineering Basics",
    "AI Productivity Tools",
    "Creative Automation",
  ];

  const cmsFeatures = offerMap
    ? [
        offerMap.feature_1,
        offerMap.feature_2,
        offerMap.feature_3,
        offerMap.feature_4,
        offerMap.feature_5,
        offerMap.feature_6,
      ].filter(Boolean) as string[]
    : [];

  const effectiveFeatures =
    features && features.length > 0
      ? features
      : cmsFeatures.length > 0
      ? cmsFeatures
      : defaultFeatures;

  const cardTitle = offerMap?.card_title || "Full Stack Creator Program";
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
        </div>

        {/* ── Master Offer Card ── */}
        <FadeUp delay={0.15}>
          <div className="max-w-5xl mx-auto rounded-[32px] sm:rounded-[40px] bg-white border-2 border-[#1748BB]/20 shadow-[0_20px_60px_rgba(23,72,187,0.08)] p-6 sm:p-10 lg:p-12 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Why Students Join */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1E2026] uppercase tracking-wide mb-3">
                    Why Students Join This Program
                  </h3>
                  <div className="inline-block bg-[#1748BB] text-white font-sans text-xs font-bold px-4 py-1.5 rounded-md shadow-sm">
                    Features
                  </div>
                </div>

                {/* Star Feature Items */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {effectiveFeatures.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 font-sans text-sm sm:text-base font-semibold text-[#1E2026]">
                      <Star size={16} className="text-[#1748BB] fill-[#1748BB] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Center Dotted Divider (Desktop only) */}
              <div className="hidden lg:block lg:col-span-1 h-64 border-r-2 border-dashed border-[#1748BB]/25 mx-auto" />

              {/* Right Column: Full Stack Creator Blue Action Box */}
              <div className="lg:col-span-5">
                <div className="rounded-[24px] sm:rounded-[30px] bg-[#1748BB] p-8 sm:p-10 text-center text-white relative overflow-hidden shadow-[0_16px_45px_rgba(23,72,187,0.3)] border-2 border-dashed border-white/40">
                  
                  {/* Subtle Background Pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{
                      backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 40%)",
                      backgroundSize: "20px 20px",
                    }}
                    aria-hidden
                  />

                  <div className="relative z-10 space-y-5">
                    <h4
                      className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight"
                      style={{ color: "#FFFFFF" }}
                    >
                      {cardTitle}
                    </h4>

                    <p
                      className="font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase"
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
                        className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F0F5FF] !text-[#1748BB] font-sans font-bold text-base px-10 py-4 rounded-full hover:scale-105 transition-all duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.25)] w-full sm:w-auto"
                      >
                        <span style={{ color: "#1748BB" }} className="!text-[#1748BB] font-bold">
                          {buttonText}
                        </span>
                        <ArrowRight size={18} style={{ color: "#1748BB" }} className="!text-[#1748BB]" />
                      </a>
                    </div>

                    <p
                      className="font-sans text-xs font-medium pt-1"
                      style={{ color: "#BACFFF" }}
                    >
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
