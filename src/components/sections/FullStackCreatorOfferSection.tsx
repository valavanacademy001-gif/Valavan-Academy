"use client";

import React from "react";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import { HelpCircle, Star, ArrowRight } from "lucide-react";
import { EXTERNAL_URLS } from "@/data/site.config";

interface FullStackCreatorOfferSectionProps {
  enrollUrl?: string;
}

export default function FullStackCreatorOfferSection({
  enrollUrl = EXTERNAL_URLS.signup,
}: FullStackCreatorOfferSectionProps) {
  const features = [
    "Beginner Friendly Structure",
    "Real-world Assignments",
    "Portfolio-Based Learning",
    "Freelancing Guidance",
    "Tamil Teaching",
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FBFDFF] relative z-20 overflow-hidden border-t border-neutral-100 select-none">
      {/* Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-[#1748BB]/5 rounded-full blur-[150px] pointer-events-none"
        aria-hidden
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-18">
          <FadeUp delay={0}>
            <div className="inline-flex items-center justify-center mb-4">
              <span className="inline-flex items-center gap-2 border border-[#1748BB]/30 text-[#1748BB] font-sans text-xs font-bold px-4 py-1.5 rounded-full bg-[#1748BB]/5 shadow-sm">
                <HelpCircle size={14} className="text-[#1748BB]" />
                Make Your Next Move Count
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2
              className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(30px, 4.4vw, 52px)" }}
            >
              AI Powered{" "}
              <span style={{ color: "#1748BB" }} className="!text-[#1748BB]">
                Full Stack Creator System
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="font-sans text-neutral-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
              Unlock limitless creativity with our MEGA Video Editing Assets Collection — thousands of premium, customizable templates, effects, and project files designed for video editors and creators ready to elevate their videos and master pro-level editing.
            </p>
          </FadeUp>
        </div>

        {/* ── Master Offer Card ── */}
        <FadeUp delay={0.15}>
          <div className="max-w-5xl mx-auto rounded-[32px] sm:rounded-[40px] bg-white border-2 border-[#1748BB]/20 shadow-[0_20px_60px_rgba(23,72,187,0.08)] p-6 sm:p-10 lg:p-12 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Why Students Join */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1E2026] uppercase tracking-wide mb-3">
                    Why Students Join This Program
                  </h3>
                  <div className="inline-block bg-[#1748BB] text-white font-sans text-xs font-bold px-4 py-1.5 rounded-md shadow-sm">
                    Features
                  </div>
                </div>

                {/* Star Feature Items */}
                <ul className="space-y-3.5 pt-1">
                  {features.map((feat) => (
                    <li key={feat} className="flex items-center gap-3 font-sans text-sm sm:text-base font-semibold text-[#1E2026]">
                      <Star size={16} className="text-[#1748BB] fill-[#1748BB] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Center Dotted Divider (Desktop only) */}
              <div className="hidden lg:block lg:col-span-1 h-64 border-r-2 border-dashed border-[#1748BB]/25 mx-auto" />

              {/* Right Column: Full Stack Creator Blue Action Box */}
              <div className="lg:col-span-6">
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
                      Full Stack Creator Program
                    </h4>

                    <p
                      className="font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase"
                      style={{ color: "#BACFFF" }}
                    >
                      Lifetime Access
                    </p>

                    <div className="pt-2">
                      <a
                        href={enrollUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ backgroundColor: "#FFFFFF", color: "#1748BB" }}
                        className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F0F5FF] !text-[#1748BB] font-sans font-bold text-base px-10 py-4 rounded-full hover:scale-105 transition-all duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.25)] w-full sm:w-auto"
                      >
                        <span style={{ color: "#1748BB" }} className="!text-[#1748BB] font-bold">
                          Join Today
                        </span>
                        <ArrowRight size={18} style={{ color: "#1748BB" }} className="!text-[#1748BB]" />
                      </a>
                    </div>

                    <p
                      className="font-sans text-xs font-medium pt-1"
                      style={{ color: "#BACFFF" }}
                    >
                      For A Limited Time Only
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
