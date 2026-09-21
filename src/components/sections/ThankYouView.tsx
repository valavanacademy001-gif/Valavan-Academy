"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { CMSThankYouData } from "@/lib/cms";

interface ThankYouViewProps {
  data: CMSThankYouData;
}

export default function ThankYouView({ data }: ThankYouViewProps) {
  useEffect(() => {
    // 1. Meta Pixel Tracking (Client-side execution on Thank You page load)
    if (typeof window !== "undefined") {
      const fbq = (window as any).fbq;
      if (typeof fbq === "function") {
        fbq("track", data.metaEvent || "Purchase", {
          content_name: data.programTitle,
          currency: "INR",
          value: data.conversionValue || 0,
        });
      }

      // 2. Google Tag Manager / GA4 dataLayer event
      const dataLayer = (window as any).dataLayer;
      if (Array.isArray(dataLayer)) {
        dataLayer.push({
          event: "conversion_success",
          conversion_type: data.metaEvent,
          program_name: data.programTitle,
          currency: "INR",
          value: data.conversionValue || 0,
        });
      }
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-white text-[#1E2026] flex flex-col selection:bg-[#1748BB] selection:text-white">
      
      {/* ── 01 Blue Header Bar with Valavan Academy Emblem Logo ── */}
      <header className="w-full bg-[#1748BB] text-white py-3.5 sm:py-4 px-4 sm:px-8 border-b border-[#0E3BB0] shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 group cursor-pointer"
          >
            {/* Circular Badge with uploaded Valavan Academy Emblem Logo */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center p-1.5 shadow-md group-hover:shadow-lg transition-all shrink-0">
              <Image
                src="/assets/logo/valavan-emblem.png"
                alt="Valavan Academy"
                width={36}
                height={36}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-black text-white text-base sm:text-lg tracking-wider uppercase leading-none">
                Valavan Academy
              </span>
              <span className="text-[10px] sm:text-[11px] text-white/80 font-sans tracking-widest uppercase mt-0.5 font-medium">
                Your Career Changing Partner
              </span>
            </div>
          </Link>

          {/* Quick Help WhatsApp link in Header */}
          <a
            href={data.courseAccessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/20 transition-all cursor-pointer"
          >
            <MessageCircle size={14} className="text-[#4ADE80]" />
            <span>Support: +91 82205 11273</span>
          </a>
        </div>
      </header>

      {/* ── 02 White Theme Main Page Content ── */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 sm:py-16 md:py-20 relative overflow-hidden">
        
        {/* Soft Ambient Background Decoration */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#1748BB]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-3xl w-full mx-auto text-center flex flex-col items-center z-10">
          
          {/* Main Headline */}
          <h1
            className="font-display font-extrabold text-[#1748BB] tracking-tight leading-[1.15] mb-4 sm:mb-5"
            style={{ fontSize: "clamp(30px, 4.8vw, 52px)" }}
          >
            {data.heading || "Thank You For Purchasing"}
          </h1>

          {/* Program Enrollment & Journey Details */}
          <div className="space-y-1.5 mb-8 max-w-2xl">
            <p className="text-[#1E2026] font-bold text-lg sm:text-xl md:text-2xl leading-snug">
              You&apos;ve Successfully Enrolled In <span className="text-[#1748BB]">{data.programTitle}</span>
            </p>
            <p className="text-neutral-600 font-normal text-sm sm:text-base md:text-lg">
              {data.journeySubtext}
            </p>
          </div>

          {/* Order Confirmation Notice & Activation Note Box */}
          <div className="bg-[#F8FAFC] border border-neutral-200/80 rounded-2xl p-6 sm:p-8 max-w-2xl w-full mx-auto text-center mb-10 shadow-xs space-y-3.5">
            <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-semibold text-[#1E2026]">
              <span>Check Your Inbox! ✉️ We Have Sent Your Order Confirmation, Your Registered Email Address.</span>
            </div>

            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-normal">
              {data.activationNote}
            </p>
          </div>

          {/* Two Green Pill Action Buttons (Matching reference style) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md sm:max-w-none">
            
            {/* Button 1: I Need Course Access (WhatsApp direct support) */}
            <a
              href={data.courseAccessUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: "#22C55E", color: "#FFFFFF" }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#22C55E] hover:bg-[#16A34A] !text-white font-sans font-bold text-sm sm:text-base px-7 sm:px-9 py-4 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_8px_25px_rgba(34,197,94,0.35)] cursor-pointer"
            >
              <MessageCircle size={18} className="text-white shrink-0" />
              <span style={{ color: "#FFFFFF" }} className="!text-white font-bold">{data.courseAccessBtnText}</span>
            </a>

            {/* Button 2: Join Whatsapp Community Group */}
            <a
              href={data.whatsappGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: "#22C55E", color: "#FFFFFF" }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#22C55E] hover:bg-[#16A34A] !text-white font-sans font-bold text-sm sm:text-base px-7 sm:px-9 py-4 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_8px_25px_rgba(34,197,94,0.35)] cursor-pointer"
            >
              <Users size={18} className="text-white shrink-0" />
              <span style={{ color: "#FFFFFF" }} className="!text-white font-bold">{data.whatsappGroupBtnText}</span>
            </a>
          </div>

          {/* Bottom return to homepage */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-neutral-500 hover:text-[#1748BB] font-medium transition-colors"
            >
              <span>← Return to Valavan Academy Homepage</span>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
