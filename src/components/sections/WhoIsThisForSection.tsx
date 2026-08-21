"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import { Sparkles, Lightbulb, Home, GraduationCap, Banknote, Briefcase, ArrowRight } from "lucide-react";
import { EXTERNAL_URLS } from "@/data/site.config";

interface WhoIsThisForItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const PERSONAS: WhoIsThisForItem[] = [
  {
    icon: <Lightbulb size={22} className="text-[#1748BB]" />,
    title: "Beginner",
    description: "who's never touched editing software but wants to start from scratch the right way",
  },
  {
    icon: <Home size={22} className="text-[#1748BB]" />,
    title: "Home Maker",
    description: "who wants to level up editing skills for YouTube, Reels, or client videos",
  },
  {
    icon: <GraduationCap size={22} className="text-[#1748BB]" />,
    title: "Student",
    description: "looking to build a career in media, video production, or freelance editing",
  },
  {
    icon: <Banknote size={22} className="text-[#1748BB]" />,
    title: "Freelancer",
    description: "tired of low-paying gigs and wants to charge higher by delivering pro-level edits",
  },
  {
    icon: <Briefcase size={22} className="text-[#1748BB]" />,
    title: "Job Seeker",
    description: "To Work a Creative Field and needs step-by-step, practical guidance",
  },
];

export default function WhoIsThisForSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#FBFDFF] relative z-20 overflow-hidden border-t border-neutral-100 select-none">
      {/* Soft Ambient Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-[#1748BB]/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <FadeUp delay={0}>
            <div className="inline-flex items-center justify-center mb-4">
              <span className="inline-flex items-center gap-2 border border-[#1748BB]/30 text-[#1748BB] font-sans text-xs font-bold px-4 py-1.5 rounded-full bg-[#1748BB]/5 shadow-sm">
                <Sparkles size={13} className="text-[#1748BB]" />
                Who Is This For
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2
              className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-3.5"
              style={{ fontSize: "clamp(30px, 4.2vw, 52px)" }}
            >
              This Program Is Perfect For You{" "}
              <span style={{ color: "#1748BB" }} className="!text-[#1748BB]">
                If...
              </span>
            </h2>
          </FadeUp>
        </div>

        {/* ── 5 Persona Blue Cards Grid ── */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 mb-12 sm:mb-16">
          {PERSONAS.map((item, index) => (
            <FadeUp key={item.title} delay={0.08 * index} className="flex">
              <div className="w-full bg-[#1748BB] text-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 flex flex-col items-center text-center shadow-[0_12px_32px_rgba(23,72,187,0.18)] hover:shadow-[0_20px_45px_rgba(23,72,187,0.35)] hover:-translate-y-2 transition-all duration-300 border border-white/10 group">
                
                {/* Top White Circle Icon Badge */}
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white text-[#1748BB] flex items-center justify-center mb-5 shadow-[0_4px_14px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>

                {/* Persona Title */}
                <h3
                  className="font-display font-semibold text-lg sm:text-xl mb-3 !text-white"
                  style={{ color: "#FFFFFF" }}
                >
                  {item.title}
                </h3>

                {/* Persona Description (100% Solid Crisp White) */}
                <p
                  className="font-sans text-xs sm:text-[13px] leading-relaxed font-normal flex-1 !text-white"
                  style={{ color: "#FFFFFF" }}
                >
                  {item.description}
                </p>

              </div>
            </FadeUp>
          ))}
        </div>

        {/* ── Centered Enroll Now Button ── */}
        <FadeUp delay={0.4} className="text-center">
          <a
            href={EXTERNAL_URLS.signup}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#1748BB", color: "#FFFFFF" }}
            className="inline-flex items-center justify-center gap-2.5 bg-[#1748BB] hover:bg-[#0A3CA8] !text-white font-sans font-bold text-base px-10 py-4 rounded-full hover:scale-105 transition-all duration-200 shadow-[0_10px_30px_rgba(23,72,187,0.35)]"
          >
            <span style={{ color: "#FFFFFF" }} className="!text-white font-bold">
              Enroll Now
            </span>
            <ArrowRight size={18} className="text-white" />
          </a>
        </FadeUp>

      </Container>
    </section>
  );
}
