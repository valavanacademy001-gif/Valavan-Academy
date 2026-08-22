"use client";

import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Target,
  Clock,
  GraduationCap,
  Users,
  Briefcase,
  HelpCircle,
  CreditCard,
  Layers,
  BookOpen,
} from "lucide-react";

interface ProgramEnrollmentSupportSectionProps {
  enrollUrl?: string;
  duration?: string;
  seatsText?: string;
}

export default function ProgramEnrollmentSupportSection({
  enrollUrl = "https://learn.valavanacademy.com/clientapp/signup",
  duration = "90 Days",
  seatsText = "20 Seats Available",
}: ProgramEnrollmentSupportSectionProps) {
  return (
    <section className="py-10 sm:py-20 md:py-28 bg-[#FBFDFF] relative z-20 overflow-hidden border-b border-neutral-100">
      {/* Background Ambience */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#1748BB]/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12">
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
              style={{ fontSize: "clamp(30px, 4.2vw, 52px)" }}
            >
              You Will Get{" "}
              <span style={{ color: "#1748BB" }} className="!text-[#1748BB]">
                Complete Support For.
              </span>
            </h2>
          </FadeUp>
        </div>

        {/* ── 01 Master Bento Card (3-Column Layout) ── */}
        <FadeUp delay={0.1}>
          <div className="max-w-6xl mx-auto rounded-[28px] sm:rounded-[36px] bg-white border border-[#1748BB]/25 shadow-[0_16px_50px_rgba(23,72,187,0.08)] p-6 sm:p-10 mb-10 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              
              {/* Left Column: Join Us Today */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-6 pb-6 lg:pb-0 border-b lg:border-b-0 lg:border-r border-neutral-100 lg:pr-8">
                <div>
                  <h3 className="font-display font-semibold text-2xl sm:text-3xl text-[#1E2026] mb-4">
                    Join Us Today
                  </h3>
                  <div className="inline-block bg-[#F0F5FF] border border-[#BFDBFE] text-[#1748BB] font-sans text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                    One Time Payment
                  </div>

                  <ul className="space-y-3.5">
                    {[
                      "Lifetime Access",
                      "Weekly Live Mentorship",
                      "Community Support",
                      "Portfolio Reviews",
                      "Career Guidance",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 font-sans text-sm sm:text-base font-semibold text-neutral-700">
                        <CheckCircle2 size={18} className="text-[#1748BB] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Middle Column: Features */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4 pb-6 lg:pb-0 border-b lg:border-b-0 lg:border-r border-neutral-100 lg:pr-8">
                <div>
                  <div className="inline-block bg-[#1748BB] text-white font-sans text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                    Features
                  </div>

                  <ul className="space-y-3">
                    {[
                      "Structured Learning System",
                      "Weekly Live Sessions",
                      "Portfolio Reviews",
                      "Project-Based Learning",
                      "Design Resources & Assets",
                      "Community Support",
                      "Freelancing Guidance",
                      "Career Growth Support",
                      "Business Development Insights",
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 font-sans text-xs sm:text-sm font-medium text-neutral-700">
                        <Sparkles size={14} className="text-[#1748BB] shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Credit Card EMI & Action Spotlight Card */}
              <div className="lg:col-span-4 flex">
                <div
                  className="w-full rounded-[24px] bg-[#1748BB] text-white p-7 sm:p-8 flex flex-col justify-between text-center relative overflow-hidden shadow-[0_16px_40px_rgba(23,72,187,0.3)] border-2 border-white/20"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(
                        45deg,
                        rgba(255, 255, 255, 0.05) 0px,
                        rgba(255, 255, 255, 0.05) 1px,
                        transparent 1px,
                        transparent 12px
                      )
                    `,
                  }}
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-white/15 flex items-center justify-center text-white border border-white/20">
                      <CreditCard size={24} />
                    </div>

                    <h4
                      className="font-display font-semibold text-xl sm:text-2xl leading-snug tracking-normal"
                      style={{ color: "#FFFFFF" }}
                    >
                      Credit Card EMI Available
                    </h4>

                    <div className="inline-block bg-black/40 border border-white/25 text-white font-sans text-xs font-bold px-4 py-1.5 rounded-full tracking-wide">
                      ⚡ {seatsText}
                    </div>

                    <p
                      className="font-sans text-xs font-semibold"
                      style={{ color: "#BACFFF" }}
                    >
                      Registration Ending Soon
                    </p>
                  </div>

                  <div className="pt-6 space-y-3">
                    <a
                      href={enrollUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ backgroundColor: "#FFFFFF", color: "#1748BB" }}
                      className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F0F5FF] !text-[#1748BB] font-sans font-bold text-base px-6 py-3.5 rounded-full hover:scale-105 transition-all duration-200 shadow-xl"
                    >
                      <span style={{ color: "#1748BB" }} className="!text-[#1748BB] font-bold">
                        Enroll Now
                      </span>
                      <ArrowRight size={17} style={{ color: "#1748BB" }} className="!text-[#1748BB]" />
                    </a>

                    <p
                      className="font-sans text-[11px] font-semibold"
                      style={{ color: "#FFFFFF" }}
                    >
                      For A Limited Time Only
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </FadeUp>

        {/* ── 02 Dual Program Outcome & Support Banner ── */}
        <FadeUp delay={0.2}>
          <div
            className="max-w-6xl mx-auto rounded-[28px] sm:rounded-[36px] bg-[#1748BB] text-white p-7 sm:p-10 border-2 border-white/20 shadow-[0_20px_60px_rgba(23,72,187,0.3)] relative overflow-hidden"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  rgba(255, 255, 255, 0.04) 0px,
                  rgba(255, 255, 255, 0.04) 1px,
                  transparent 1px,
                  transparent 12px
                )
              `,
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Box: Program Outcome (Real Goal) */}
              <div className="lg:col-span-6 space-y-5 pb-8 lg:pb-0 border-b lg:border-b-0 lg:border-r border-white/20 lg:pr-10">
                <div className="flex items-center gap-3.5">
                  <div className="w-13 h-13 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
                    <Target size={26} className="text-white" />
                  </div>
                  <h3
                    className="font-display font-semibold text-xl sm:text-2xl leading-snug tracking-normal"
                    style={{ color: "#FFFFFF" }}
                  >
                    Program Outcome (Real Goal)
                  </h3>
                </div>

                <p
                  className="font-sans text-sm sm:text-base leading-relaxed font-normal"
                  style={{ color: "#BACFFF" }}
                >
                  Our goal is to help you become a skilled Graphic Designer who can pursue a Job, Freelancing Career or Design Business.
                </p>

                <div className="pt-2">
                  <a
                    href={enrollUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: "#FFFFFF", color: "#1748BB" }}
                    className="inline-flex items-center gap-2 bg-white hover:bg-[#F0F5FF] !text-[#1748BB] font-sans font-bold text-sm px-7 py-3 rounded-full hover:scale-105 transition-all shadow-lg"
                  >
                    <span style={{ color: "#1748BB" }} className="!text-[#1748BB] font-bold">
                      ENROLL NOW
                    </span>
                    <ArrowRight size={15} style={{ color: "#1748BB" }} className="!text-[#1748BB]" />
                  </a>
                </div>
              </div>

              {/* Right Box: Program Duration & Support */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3.5 mb-2">
                  <div className="w-13 h-13 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
                    <GraduationCap size={26} className="text-white" />
                  </div>
                  <h3
                    className="font-display font-semibold text-xl sm:text-2xl leading-snug tracking-normal"
                    style={{ color: "#FFFFFF" }}
                  >
                    Program Duration & Support
                  </h3>
                </div>

                <ul className="space-y-2.5">
                  <li className="flex items-center gap-3 font-sans text-xs sm:text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                    <Clock size={16} className="text-[#BACFFF] shrink-0" />
                    <span>Duration: {duration}</span>
                  </li>
                  <li className="flex items-center gap-3 font-sans text-xs sm:text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                    <GraduationCap size={16} className="text-[#BACFFF] shrink-0" />
                    <span>Practical Project-Based Learning</span>
                  </li>
                  <li className="flex items-center gap-3 font-sans text-xs sm:text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                    <Users size={16} className="text-[#BACFFF] shrink-0" />
                    <span>Weekly Live Mentorship Sessions</span>
                  </li>
                  <li className="flex items-center gap-3 font-sans text-xs sm:text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                    <BookOpen size={16} className="text-[#BACFFF] shrink-0" />
                    <span>Structured Step-by-Step Curriculum</span>
                  </li>
                  <li className="flex items-center gap-3 font-sans text-xs sm:text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                    <Briefcase size={16} className="text-[#BACFFF] shrink-0" />
                    <span>Career & Freelancing Guidance</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
