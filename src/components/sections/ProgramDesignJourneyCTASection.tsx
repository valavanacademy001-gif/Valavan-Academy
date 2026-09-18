"use client";

import React from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import { Sparkles, ArrowRight, BookOpen, Rocket, CheckCircle2, Users } from "lucide-react";

interface ProgramDesignJourneyCTASectionProps {
  badge?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  headlineSub?: string;
  description?: string;
  primaryBtnText?: string;
  primaryBtnUrl?: string;
  secondaryBtnText?: string;
  secondaryBtnUrl?: string;
  footerSubtext?: string;
  supportMap?: Record<string, string>;
}

export default function ProgramDesignJourneyCTASection({
  badge,
  titlePrefix = "Your Design Journey",
  titleHighlight = "Starts Today.",
  headlineSub,
  description,
  primaryBtnText = "🚀 Enroll Now",
  primaryBtnUrl = "https://learn.valavanacademy.com/clientapp/signup",
  secondaryBtnText = "📖 View Curriculum",
  secondaryBtnUrl = "#roadmap",
  footerSubtext = "Join thousands of learners building their creative future with Valavan Academy.",
  supportMap,
}: ProgramDesignJourneyCTASectionProps) {
  const effectiveBadge = supportMap?.badge || badge || "START YOUR JOURNEY";
  const effectiveTitlePrefix = supportMap?.title_prefix || titlePrefix;
  const effectiveTitleHighlight = supportMap?.title_highlight || titleHighlight;
  const effectiveHeadlineSub =
    supportMap?.headline_sub ||
    headlineSub ||
    "Every successful designer started with a blank canvas. The difference is they started.";
  const effectiveDescription =
    supportMap?.description ||
    description ||
    "If you're ready to build a valuable creative skill, create an impressive portfolio, and open new opportunities, this program is designed for you.";
  const effectivePrimaryText = supportMap?.primary_btn_text || primaryBtnText;
  const effectivePrimaryUrl = supportMap?.enroll_url || supportMap?.primary_btn_url || primaryBtnUrl;
  const effectiveSecondaryText = supportMap?.secondary_btn_text || secondaryBtnText;
  const effectiveSecondaryUrl = supportMap?.secondary_btn_url || secondaryBtnUrl;
  const effectiveFooterSubtext = supportMap?.footer_subtext || footerSubtext;

  return (
    <section className="py-12 sm:py-20 md:py-28 bg-[#FBFDFF] relative z-20 overflow-hidden border-b border-neutral-100">
      {/* Soft Ambient Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#1748BB]/6 rounded-full blur-[140px] pointer-events-none"
        aria-hidden
      />

      <Container className="relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          {/* Badge */}
          <FadeUp delay={0}>
            <div className="inline-flex items-center justify-center">
              <span className="inline-flex items-center gap-2 border border-[#1748BB]/30 text-[#1748BB] font-sans text-xs font-bold px-4 py-1.5 rounded-full bg-[#1748BB]/5 shadow-sm uppercase tracking-wider">
                <Sparkles size={13} className="text-[#1748BB]" />
                {effectiveBadge}
              </span>
            </div>
          </FadeUp>

          {/* Heading */}
          <FadeUp delay={0.05}>
            <h2
              className="font-display font-bold text-[#1E2026] leading-[1.06] tracking-tight mx-auto"
              style={{ fontSize: "clamp(32px, 4.8vw, 56px)" }}
            >
              {effectiveTitlePrefix}{" "}
              <span style={{ color: "#1748BB" }} className="!text-[#1748BB]">
                {effectiveTitleHighlight}
              </span>
            </h2>
          </FadeUp>

          {/* Description & Impact Text */}
          <FadeUp delay={0.1}>
            <div className="space-y-3 max-w-2xl mx-auto text-center">
              <p className="font-sans text-base sm:text-lg font-semibold text-[#1E2026] leading-relaxed">
                {effectiveHeadlineSub}
              </p>
              <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                {effectiveDescription}
              </p>
            </div>
          </FadeUp>

          {/* Action Buttons */}
          <FadeUp delay={0.15}>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              {/* Primary CTA */}
              <a
                href={effectivePrimaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: "#1748BB", color: "#FFFFFF" }}
                className="inline-flex items-center justify-center gap-2 bg-[#1748BB] hover:bg-[#133c9e] text-white font-sans font-bold text-sm sm:text-base px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 shadow-[0_12px_32px_rgba(23,72,187,0.35)] cursor-pointer"
              >
                <span className="text-white font-bold">{effectivePrimaryText}</span>
                <ArrowRight size={17} className="text-white" />
              </a>

              {/* Secondary CTA */}
              <a
                href={effectiveSecondaryUrl}
                target={effectiveSecondaryUrl.startsWith("#") ? undefined : "_blank"}
                rel={effectiveSecondaryUrl.startsWith("#") ? undefined : "noopener noreferrer"}
                className="inline-flex items-center justify-center gap-2 border-2 border-[#1748BB] text-[#1748BB] bg-white hover:bg-[#F0F5FF] font-sans font-bold text-sm sm:text-base px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 shadow-sm cursor-pointer"
              >
                <span className="text-[#1748BB] font-bold">{effectiveSecondaryText}</span>
              </a>
            </div>
          </FadeUp>

          {/* Small Footer Text */}
          <FadeUp delay={0.2}>
            <div className="pt-3 flex items-center justify-center gap-2 text-neutral-500 font-sans text-xs sm:text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>{effectiveFooterSubtext}</span>
            </div>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
