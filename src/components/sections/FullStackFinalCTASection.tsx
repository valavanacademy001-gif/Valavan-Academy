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
    <section className="py-16 sm:py-24 md:py-32 bg-[#081534] text-white relative z-20 overflow-hidden select-none border-t border-[#1748BB]/30">
      {/* Dynamic Deep Space Ambient Glow Orbs */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#1748BB]/25 rounded-full blur-[170px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -top-24 left-1/4 w-[400px] h-[400px] bg-[#3B82F6]/20 rounded-full blur-[130px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -bottom-24 right-1/4 w-[450px] h-[450px] bg-[#2563EB]/25 rounded-full blur-[140px] pointer-events-none"
        aria-hidden
      />

      {/* Subtle Grid Line Texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      <Container className="relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Top AI Badge */}
          <FadeUp delay={0}>
            <div className="inline-flex items-center justify-center">
              <span className="inline-flex items-center gap-2 border border-[#3B82F6]/40 text-[#93C5FD] font-sans text-xs sm:text-sm font-bold px-5 py-2 rounded-full bg-[#1E3A8A]/40 backdrop-blur-md shadow-[0_0_25px_rgba(59,130,246,0.3)] tracking-wider uppercase">
                <Sparkles size={14} className="text-[#60A5FA]" />
                AI-Powered Full Stack Creative Mastery™
              </span>
            </div>
          </FadeUp>

          {/* Main Huge Headline */}
          <FadeUp delay={0.05}>
            <h2
              className="font-display font-black text-white leading-[1.05] tracking-tight mx-auto uppercase"
              style={{ fontSize: "clamp(34px, 5.5vw, 68px)" }}
            >
              CREATE WITHOUT LIMITS.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#93C5FD] to-[#FFFFFF]">
                BUILD A CAREER WITHOUT LIMITS.
              </span>
            </h2>
          </FadeUp>

          {/* Subtitle */}
          <FadeUp delay={0.1}>
            <p className="font-sans text-base sm:text-xl md:text-2xl text-neutral-300 font-medium max-w-2xl mx-auto leading-relaxed">
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
                className="inline-flex items-center justify-center gap-2.5 bg-white text-[#0B1E48] hover:bg-[#F0F5FF] font-sans font-bold text-base sm:text-lg px-9 py-4 rounded-full transition-all duration-200 hover:scale-105 shadow-[0_12px_40px_rgba(255,255,255,0.25)] cursor-pointer"
              >
                <Download size={20} className="text-[#1748BB]" />
                <span>Download Brochure</span>
              </a>

              {/* Secondary: Join The Program */}
              <button
                type="button"
                onClick={handleJoinClick}
                className="inline-flex items-center justify-center gap-2.5 bg-[#1748BB] hover:bg-[#1f56db] text-white border-2 border-[#3B82F6]/50 font-sans font-bold text-base sm:text-lg px-9 py-4 rounded-full transition-all duration-200 hover:scale-105 shadow-[0_12px_35px_rgba(23,72,187,0.5)] cursor-pointer"
              >
                <span>🚀 Join The Program</span>
                <ArrowRight size={19} />
              </button>
            </div>
          </FadeUp>

          {/* Trust Value Badges Row */}
          <FadeUp delay={0.2}>
            <div className="pt-6 sm:pt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-neutral-400 font-sans text-xs sm:text-sm">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                100% Practical Learning
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                Lifetime Course Access
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-400" />
                Industry Certification
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                180K+ Creators Community
              </span>
            </div>
          </FadeUp>

        </div>
      </Container>
    </section>
  );
}
