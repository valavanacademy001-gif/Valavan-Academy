"use client";

import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";

interface GuidanceMentorsSectionProps {
  badge?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  description?: string;
  whyTitlePrefix?: string;
  whyTitleHighlight?: string;
  whyDesc1?: string;
  whyDesc2?: string;
  teamImage?: string;
  mentorMap?: Record<string, string>;
}

export default function GuidanceMentorsSection({
  badge,
  titlePrefix,
  titleHighlight,
  description,
  whyTitlePrefix,
  whyTitleHighlight,
  whyDesc1,
  whyDesc2,
  teamImage,
  mentorMap,
}: GuidanceMentorsSectionProps = {}) {
  const effectiveBadge = badge || mentorMap?.badge || "Expert Mentors";
  const effectiveTitlePrefix = titlePrefix || mentorMap?.title_prefix || "Guidance From";
  const effectiveTitleHighlight = titleHighlight || mentorMap?.title_highlight || "Experienced Mentors";
  const effectiveDescription =
    description ||
    mentorMap?.description ||
    "Learn from creators focused on practical workflows, not boring theory";

  const effectiveWhyTitlePrefix = whyTitlePrefix || mentorMap?.why_title_prefix || "Why Choose";
  const effectiveWhyTitleHighlight = whyTitleHighlight || mentorMap?.why_title_highlight || "Valavan Academy ?";
  const effectiveWhyDesc1 =
    whyDesc1 ||
    mentorMap?.why_desc_1 ||
    "At Valavan Academy, we believe creativity becomes powerful only when it turns into opportunity. With 15+ years of real-world design experience, we train students using practical methods that match today's industry needs.";
  const effectiveWhyDesc2 =
    whyDesc2 ||
    mentorMap?.why_desc_2 ||
    "More than 1,000 freelancers and studio designers have already upgraded their skills through our programs, and our 180K+ YouTube learning community continues to grow every day. Our mission is to help 10,000+ creative learners build confidence, develop job-ready portfolios, and step into freelancing or professional design careers successfully.";
  const effectiveTeamImage =
    teamImage ||
    mentorMap?.team_image ||
    mentorMap?.image_url ||
    "/assets/programs/full-stack-creator/team-1024x682-1.webp";

  return (
    <section className="py-10 sm:py-20 md:py-28 bg-white relative z-20 overflow-hidden border-t border-neutral-100 select-none">
      {/* Soft Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#1748BB]/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <FadeUp delay={0}>
            <h2
              className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-3.5"
              style={{ fontSize: "clamp(30px, 4.2vw, 52px)" }}
            >
              {effectiveTitlePrefix}{" "}
              <span style={{ color: "#1748BB" }} className="!text-[#1748BB]">
                {effectiveTitleHighlight}
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.05}>
            <p className="font-sans text-neutral-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
              {effectiveDescription}
            </p>
          </FadeUp>
        </div>

        {/* ── 2-Column Content Layout ── */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Why Choose Valavan Academy ? */}
          <div className="lg:col-span-6 space-y-6">
            <FadeUp delay={0.1}>
              <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1E2026] leading-tight">
                {effectiveWhyTitlePrefix}{" "}
                <span style={{ color: "#1748BB" }} className="!text-[#1748BB]">
                  {effectiveWhyTitleHighlight}
                </span>
              </h3>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                {effectiveWhyDesc1}
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                {effectiveWhyDesc2}
              </p>
            </FadeUp>
          </div>

          {/* Right Column: Group Team Photo */}
          <div className="lg:col-span-6">
            <FadeUp delay={0.25}>
              <div className="relative aspect-[16/11] rounded-[24px] sm:rounded-[32px] overflow-hidden border-2 border-[#1748BB]/20 shadow-[0_20px_55px_rgba(23,72,187,0.15)] bg-neutral-900 group hover:shadow-[0_25px_65px_rgba(23,72,187,0.25)] transition-all duration-400">
                <Image
                  src={effectiveTeamImage}
                  alt="Valavan Academy Team of Experienced Mentors"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 600px"
                  priority
                />

                {/* Subtle gradient vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* TEAM text badge overlay */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 pointer-events-none">
                  <div className="w-8 sm:w-12 h-[1px] bg-white/40" />
                  <span className="text-white/90 text-xs sm:text-sm font-bold font-sans tracking-[0.25em] uppercase">
                    TEAM
                  </span>
                  <div className="w-8 sm:w-12 h-[1px] bg-white/40" />
                </div>
              </div>
            </FadeUp>
          </div>

        </div>
      </Container>
    </section>
  );
}
