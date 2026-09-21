"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Users, Sparkles, CheckCircle2 } from "lucide-react";
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
    <main
      className="min-h-screen bg-[#0C0D11] text-white flex flex-col items-center justify-center relative overflow-hidden px-4 py-12 sm:py-16 md:py-24 selection:bg-[#F3C643] selection:text-black"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: "44px 44px",
      }}
    >
      {/* Subtle glowing ambient behind card */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#1748BB]/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-3xl w-full mx-auto text-center flex flex-col items-center z-10">
        
        {/* Top Centered Brand Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 transition-transform hover:scale-105 active:scale-95 group mb-4"
        >
          <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center bg-white/5 shadow-inner">
            <span className="font-display font-black text-white text-base tracking-tighter">VA</span>
          </div>
          <span className="font-display font-bold text-white text-base sm:text-lg tracking-widest uppercase">
            Valavan Academy
          </span>
        </Link>

        {/* Golden-Yellow Main Headline (Matching reference style) */}
        <h1
          className="font-display font-extrabold text-[#F3C643] tracking-tight leading-[1.15] mb-4 sm:mb-5"
          style={{ fontSize: "clamp(32px, 5.2vw, 56px)" }}
        >
          {data.heading || "Thank You For Purchasing"}
        </h1>

        {/* Program Enrollment & Journey Details */}
        <div className="space-y-1 mb-8 max-w-2xl">
          <p className="text-white font-medium text-base sm:text-lg md:text-xl leading-snug">
            You&apos;ve Successfully Enrolled In {data.programTitle}
          </p>
          <p className="text-neutral-300 font-normal text-sm sm:text-base md:text-lg">
            {data.journeySubtext}
          </p>
        </div>

        {/* Order Confirmation Notice & Activation Note Box */}
        <div className="space-y-4 max-w-2xl mx-auto text-center mb-10 text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed px-2">
          <p className="text-white font-medium">
            Check Your Inbox! ✉️ We Have Sent Your Order Confirmation, Your Registered Email Address.
          </p>

          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            {data.activationNote}
          </p>
        </div>

        {/* Two Green Pill Action Buttons (Matching reference style) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none">
          
          {/* Button 1: I Need Course Access (WhatsApp direct support) */}
          <a
            href={data.courseAccessUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#22C55E", color: "#FFFFFF" }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white font-sans font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_8px_25px_rgba(34,197,94,0.35)] cursor-pointer"
          >
            <span>{data.courseAccessBtnText}</span>
          </a>

          {/* Button 2: Join Whatsapp Community Group */}
          <a
            href={data.whatsappGroupUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#22C55E", color: "#FFFFFF" }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white font-sans font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_8px_25px_rgba(34,197,94,0.35)] cursor-pointer"
          >
            <span>{data.whatsappGroupBtnText}</span>
          </a>
        </div>

        {/* Bottom subtle return to home link */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors underline underline-offset-4"
          >
            Return to Homepage
          </Link>
        </div>

      </div>
    </main>
  );
}
