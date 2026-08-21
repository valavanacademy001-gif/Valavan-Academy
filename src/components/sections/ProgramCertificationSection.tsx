"use client";

import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import { Award, Sparkles, ArrowRight } from "lucide-react";
import { EXTERNAL_URLS } from "@/data/site.config";

interface ProgramCertificationSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  programTitle?: string;
  description?: string;
  certificateImage?: string;
  enrollUrl?: string;
}

export default function ProgramCertificationSection({
  badge = "Get Certified",
  title = "Industry Ready Certification",
  subtitle = "Showcase your creator skills confidently with a professional completion certificate",
  programTitle = "Earn a Professional Certification in Full Stack Digital Creator Program",
  description = "Build credibility for freelancing, portfolio & job opportunities with recognized project-based learning",
  certificateImage = "/assets/programs/full-stack-creator/CERTIFICATE-model-2.jpg-1-2048x1448.webp",
  enrollUrl = EXTERNAL_URLS.signup,
}: ProgramCertificationSectionProps) {
  return (
    <section className="py-20 sm:py-28 bg-white relative z-20 overflow-hidden border-t border-neutral-100 select-none">
      {/* Soft Ambient Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#1748BB]/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <FadeUp delay={0}>
            <div className="inline-flex items-center justify-center mb-4">
              <span className="inline-flex items-center gap-2 border border-[#1748BB]/30 text-[#1748BB] font-sans text-xs font-bold px-4 py-1.5 rounded-full bg-[#1748BB]/5 shadow-sm">
                <Sparkles size={13} className="text-[#1748BB]" />
                {badge}
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2
              className="font-display font-bold text-[#1E2026] leading-[1.08] tracking-tight mb-3"
              style={{ fontSize: "clamp(32px, 4.4vw, 54px)" }}
            >
              Industry Ready{" "}
              <span style={{ color: "#1748BB" }} className="!text-[#1748BB]">
                Certification
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="font-sans text-neutral-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-normal font-normal">
              {subtitle}
            </p>
          </FadeUp>
        </div>

        {/* ── 2-Column Certificate Spotlight Layout ── */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Certificate Mockup */}
          <div className="lg:col-span-7">
            <FadeUp delay={0.15}>
              <div className="relative aspect-[1.414/1] rounded-[24px] sm:rounded-[28px] overflow-hidden border-2 border-[#1748BB]/20 shadow-[0_16px_50px_rgba(23,72,187,0.12)] bg-white group hover:scale-[1.02] hover:shadow-[0_24px_60px_rgba(23,72,187,0.2)] transition-all duration-400">
                <Image
                  src={certificateImage}
                  alt="Official Full Stack Digital Creator Certification"
                  fill
                  className="object-contain p-2 sm:p-3"
                  sizes="(max-width: 1024px) 100vw, 600px"
                  priority
                />
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Certification Details & Action */}
          <div className="lg:col-span-5 space-y-5">
            <FadeUp delay={0.2}>
              <h3 className="font-display font-semibold text-2xl sm:text-[28px] text-[#1E2026] leading-[1.15] tracking-tight">
                Earn a Professional Certification in{" "}
                <span style={{ color: "#1748BB" }} className="!text-[#1748BB]">
                  Full Stack Digital Creator Program
                </span>
              </h3>
            </FadeUp>

            <FadeUp delay={0.25}>
              <p className="font-sans text-neutral-600 text-sm sm:text-base leading-normal font-normal">
                {description}
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="pt-2">
                <a
                  href={enrollUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: "#1748BB", color: "#FFFFFF" }}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#1748BB] hover:bg-[#0A3CA8] !text-white font-sans font-bold text-sm sm:text-base px-8 py-3.5 rounded-full hover:scale-105 transition-all duration-200 shadow-[0_10px_30px_rgba(23,72,187,0.35)]"
                >
                  <span style={{ color: "#FFFFFF" }} className="!text-white font-bold">
                    Get Certified
                  </span>
                  <ArrowRight size={17} className="text-white" />
                </a>
              </div>
            </FadeUp>
          </div>

        </div>
      </Container>
    </section>
  );
}
