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
  titlePrefix?: string;
  titleHighlight?: string;
  subtitle?: string;
  imageSrc?: string;
  buttonText?: string;
  enrollUrl?: string;
}

export default function TemplatesWorldBonusSection({
  badge = "Additional Bonuses",
  titlePrefix = "Access To",
  titleHighlight = "Templatesworld",
  subtitle = "Save hours of work using ready-to-use professional creative resources",
  imageSrc = "/assets/programs/full-stack-creator/Untitled-design-3-1-1-2048x1152-1-1024x576.webp",
  buttonText = "Get Access Now",
  enrollUrl = EXTERNAL_URLS.signup,
}: TemplatesWorldBonusSectionProps) {
  return (
    <section
      className="py-10 sm:py-20 md:py-28 bg-[#1748BB] text-white relative z-20 overflow-hidden select-none border-t border-white/10 text-center"
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
        <div className="max-w-3xl mx-auto mb-6 sm:mb-12">
          <FadeUp delay={0}>
            <div className="inline-flex items-center justify-center mb-4">
              <span className="inline-flex items-center gap-2 border border-white/30 text-white font-sans text-xs font-bold px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md shadow-sm">
                <Gift size={14} className="text-[#BACFFF]" />
                {badge}
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2
              className="font-display font-bold leading-[1.08] tracking-tight mb-3.5"
              style={{ fontSize: "clamp(32px, 4.4vw, 56px)", color: "#FFFFFF" }}
            >
              {titlePrefix}{" "}
              <span style={{ color: "#BACFFF" }} className="!text-[#BACFFF]">
                {titleHighlight}
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p
              className="font-sans text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-normal font-medium"
              style={{ color: "#BACFFF" }}
            >
              {subtitle}
            </p>
          </FadeUp>
        </div>

        {/* ── 02 Centered 3D Template Mockup Image (Compact & Balanced) ── */}
        <FadeUp delay={0.15} className="w-full max-w-lg sm:max-w-xl md:max-w-[580px] mb-8 sm:mb-10">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="relative w-full aspect-[16/10] rounded-[24px] sm:rounded-[30px] overflow-hidden border border-white/20 shadow-[0_16px_50px_rgba(0,0,0,0.35)] bg-black/15 backdrop-blur-sm group hover:border-white/40 transition-all duration-400"
          >
            <Image
              src={imageSrc}
              alt="Templatesworld Complete Professional Asset Vault"
              fill
              className="object-contain p-2 sm:p-3 group-hover:scale-105 transition-transform duration-500 ease-out"
              sizes="(max-width: 640px) 100vw, 580px"
              priority
            />
          </motion.div>
        </FadeUp>

        {/* ── 03 Centered White Action Button ── */}
        <FadeUp delay={0.2}>
          <a
            href={enrollUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#FFFFFF", color: "#1748BB" }}
            className="inline-flex items-center gap-2.5 bg-white hover:bg-[#F0F5FF] !text-[#1748BB] font-sans font-bold text-base sm:text-lg px-9 sm:px-11 py-4 sm:py-4.5 rounded-full hover:scale-105 transition-all duration-200 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
          >
            <span style={{ color: "#1748BB" }} className="!text-[#1748BB] font-bold">
              {buttonText}
            </span>
            <ArrowRight size={19} style={{ color: "#1748BB" }} className="!text-[#1748BB]" />
          </a>
        </FadeUp>

      </Container>
    </section>
  );
}
