"use client";

import React from "react";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import { Download, Sparkles, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { useLeadModal } from "@/components/leads/LeadCaptureProvider";

interface FullStackFinalCTASectionProps {
  brochureUrl?: string;
  brochureFileName?: string;
  enrollUrl?: string;
}

export default function FullStackFinalCTASection({
  brochureUrl = "/brochure/full-stack-creator-brochure.pdf",
  brochureFileName = "Full-Stack-Creative-Master-Brochure.pdf",
  enrollUrl = "https://rzp.io/rzp/v8ykjCk",
}: FullStackFinalCTASectionProps) {
  const { openEnrollModal } = useLeadModal();

  const handleJoinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openEnrollModal({
      programSlug: "full-stack-creator",
      programName: "Full Stack Creative Master",
      defaultPaymentUrl: enrollUrl,
    });
  };

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-white text-[#1E2026] relative z-20 overflow-hidden select-none border-t border-neutral-200">
      {/* Soft Ambient Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#1748BB]/6 rounded-full blur-[150px] pointer-events-none"
        aria-hidden
      />

      <Container className="relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Top AI Badge */}
          <FadeUp delay={0}>
            <div className="inline-flex items-center justify-center">
              <span className="inline-flex items-center gap-2 border border-[#1748BB]/30 text-[#1748BB] font-sans text-xs sm:text-sm font-bold px-5 py-2 rounded-full bg-[#1748BB]/5 shadow-sm tracking-wider uppercase">
                <Sparkles size={14} className="text-[#1748BB]" />
                AI-Powered Full Stack Creative Mastery™
              </span>
            </div>
          </FadeUp>

          {/* Main Huge Headline */}
          <FadeUp delay={0.05}>
            <h2
              className="font-display font-black text-[#1E2026] leading-[1.06] tracking-tight mx-auto uppercase"
              style={{ fontSize: "clamp(32px, 5.2vw, 64px)" }}
            >
              CREATE WITHOUT LIMITS.
              <br />
              <span style={{ color: "#1748BB" }} className="!text-[#1748BB]">
                BUILD A CAREER WITHOUT LIMITS.
              </span>
            </h2>
          </FadeUp>

          {/* Subtitle */}
          <FadeUp delay={0.1}>
            <p className="font-sans text-base sm:text-xl md:text-2xl text-neutral-600 font-medium max-w-2xl mx-auto leading-relaxed">
              Master The Skills. Build The Portfolio. Create The Future.
            </p>
          </FadeUp>

          {/* Action Buttons */}
          <FadeUp delay={0.15}>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
              
              {/* Primary: Download Brochure Button */}
              <a
                href={brochureUrl}
                download={brochureFileName}
                style={{ backgroundColor: "#1748BB", color: "#FFFFFF" }}
                className="inline-flex items-center justify-center gap-2.5 bg-[#1748BB] hover:bg-[#133c9e] text-white font-sans font-bold text-base sm:text-lg px-9 py-4 rounded-full transition-all duration-200 hover:scale-105 shadow-[0_12px_35px_rgba(23,72,187,0.35)] cursor-pointer"
              >
                <Download size={20} className="text-white" />
                <span className="text-white font-bold">Download Brochure</span>
              </a>

              {/* Secondary: Join The Program */}
              <button
                type="button"
                onClick={handleJoinClick}
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-[#F0F5FF] text-[#1748BB] border-2 border-[#1748BB] font-sans font-bold text-base sm:text-lg px-9 py-4 rounded-full transition-all duration-200 hover:scale-105 shadow-sm cursor-pointer"
              >
                <span className="text-[#1748BB] font-bold">Join The Program</span>
                <ArrowRight size={19} className="text-[#1748BB]" />
              </button>
            </div>
          </FadeUp>

          {/* Trust Value Badges Row */}
          <FadeUp delay={0.2}>
            <div className="pt-6 sm:pt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-neutral-600 font-sans text-xs sm:text-sm font-semibold">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                100% Practical Learning
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                Lifetime Course Access
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#1748BB]" />
                Industry Certification
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                180K+ Creators Community
              </span>
            </div>
          </FadeUp>

        </div>
      </Container>
    </section>
  );
}
