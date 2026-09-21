"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import { Gift, ArrowRight, Sparkles } from "lucide-react";
import { EXTERNAL_URLS } from "@/data/site.config";

interface TemplatesWorldBonusSectionProps {
  badge?: string;
  title?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  features?: string[];
  imageSrc?: string;
  buttonText?: string;
  enrollUrl?: string;
  bonusMap?: Record<string, string>;
}

export default function TemplatesWorldBonusSection({
  badge,
  title,
  titlePrefix,
  titleHighlight,
  features,
  imageSrc,
  buttonText,
  enrollUrl = EXTERNAL_URLS.enrollFullStack,
  bonusMap,
}: TemplatesWorldBonusSectionProps = {}) {
  const effectiveBadge = badge || bonusMap?.badge || "WHAT YOU'LL GET";
  const effectiveTitle =
    title ||
    bonusMap?.title ||
    (bonusMap?.title_prefix
      ? `${bonusMap.title_prefix} ${bonusMap.title_highlight || ""}`.trim()
      : "Complete Program Access");

  const defaultFeatures = [
    "Full Curriculum",
    "Lifetime Access",
    "Community Access",
    "Resource Library",
    "Templates & Assets",
    "AI Systems",
    "Project-Based Learning",
    "Future Updates",
  ];

  const cmsFeatures = bonusMap
    ? [
        bonusMap.feature_1,
        bonusMap.feature_2,
        bonusMap.feature_3,
        bonusMap.feature_4,
        bonusMap.feature_5,
        bonusMap.feature_6,
        bonusMap.feature_7,
        bonusMap.feature_8,
      ].filter(Boolean) as string[]
    : [];

  const effectiveFeatures =
    features && features.length > 0
      ? features
      : cmsFeatures.length > 0
      ? cmsFeatures
      : defaultFeatures;

  const effectiveImageSrc =
    imageSrc ||
    bonusMap?.image ||
    bonusMap?.image_url ||
    "/assets/programs/full-stack-creator/Untitled-design-3-1-1-2048x1152-1-1024x576.webp";
  const effectiveButtonText = buttonText || bonusMap?.button_text || "🚀 Join Full Stack Creator Program";
  const effectiveEnrollUrl = bonusMap?.enroll_url || enrollUrl;

  return (
    <section
      className="relative lg:sticky lg:top-0 z-0 lg:z-10 py-14 sm:py-20 md:py-28 bg-[#1748BB] text-white overflow-hidden select-none border-t border-white/10 text-center flex flex-col justify-center lg:min-h-screen"
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.035) 0px,
            rgba(255, 255, 255, 0.035) 1px,
            transparent 1px,
            transparent 14px
          )
        `,
      }}
    >
      {/* Soft Ambient Glow in Center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-white/10 rounded-full blur-[160px] pointer-events-none"
        aria-hidden
      />

      <Container className="relative z-10 flex flex-col items-center">
        {/* ── 01 Centered Header ── */}
        <div className="max-w-3xl mx-auto mb-6 sm:mb-8">
          <FadeUp delay={0}>
            <div className="inline-flex items-center justify-center mb-4">
              <span className="inline-flex items-center gap-2 border border-white/30 text-white font-sans text-xs font-bold px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md shadow-sm uppercase tracking-wider">
                <Gift size={14} className="text-[#BACFFF]" />
                {effectiveBadge}
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2
              className="font-display font-bold leading-[1.08] tracking-tight mb-2"
              style={{ fontSize: "clamp(32px, 4.4vw, 56px)", color: "#FFFFFF" }}
            >
              {effectiveTitle}
            </h2>
          </FadeUp>
        </div>

        {/* ── 02 8 Included Features Grid ── */}
        <FadeUp delay={0.1} className="w-full max-w-4xl mb-8 sm:mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {effectiveFeatures.map((feat) => (
              <div
                key={feat}
                className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl px-3.5 py-2.5 text-left backdrop-blur-sm transition-colors shadow-sm"
              >
                <span className="text-[#60A5FA] font-bold text-sm shrink-0">✔</span>
                <span className="font-sans text-xs sm:text-sm font-semibold text-white truncate">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* ── 04 Centered White Action Button ── */}
        <FadeUp delay={0.2}>
          <a
            href={effectiveEnrollUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#FFFFFF", color: "#1748BB" }}
            className="inline-flex items-center gap-2.5 bg-white hover:bg-[#F0F5FF] !text-[#1748BB] font-sans font-bold text-base sm:text-lg px-9 sm:px-11 py-4 sm:py-4.5 rounded-full hover:scale-105 transition-all duration-200 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
          >
            <span style={{ color: "#1748BB" }} className="!text-[#1748BB] font-bold">
              {effectiveButtonText}
            </span>
            <ArrowRight size={19} style={{ color: "#1748BB" }} className="!text-[#1748BB]" />
          </a>
        </FadeUp>

      </Container>
    </section>
  );
}
