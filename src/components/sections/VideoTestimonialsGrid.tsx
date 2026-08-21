"use client";

/**
 * Valavan Academy — Video Testimonials Grid Section
 * Top large featured video player + Bottom row of 5 student reel cards matching Figma layout.
 */

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import FadeUp from "@/components/animations/FadeUp";
import VideoModal from "@/components/ui/VideoModal";

const REEL_TESTIMONIALS = [
  {
    id: "1",
    name: "Akash R.",
    role: "Freelance Graphic Designer",
    tag: "₹65K/Month",
    image: "/assets/certifications/3.webp",
  },
  {
    id: "2",
    name: "Sanjay M.",
    role: "Video Editor & Motion Designer",
    tag: "Full-Time Role",
    image: "/assets/certifications/4.webp",
  },
  {
    id: "3",
    name: "Priyanka S.",
    role: "Brand Identity Designer",
    tag: "Remote Agency",
    image: "/assets/certifications/5.webp",
  },
  {
    id: "4",
    name: "Vignesh K.",
    role: "Web & UI/UX Specialist",
    tag: "Freelance Studio",
    image: "/assets/certifications/6.webp",
  },
  {
    id: "5",
    name: "Dinesh B.",
    role: "YouTube Video Creator",
    tag: "100K+ Views",
    image: "/assets/certifications/7.webp",
  },
];

export default function VideoTestimonialsGrid() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <Section surface="white" className="py-20 md:py-28 bg-[#090A0F] text-white">
      <Container>
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <FadeUp>
            <span className="px-3 py-1 rounded-full bg-[#1748BB]/20 text-[#4A90E2] text-xs font-bold uppercase tracking-wider border border-[#1748BB]/30">
              COMMUNITY VOICES
            </span>
            <h2 className="text-[34px] sm:text-[42px] md:text-[48px] font-bold leading-[1.12] tracking-tight font-display text-white mt-4">
              Watch Real Student <br />
              <span className="text-[#1748BB]">Video Reviews</span>
            </h2>
            <p className="text-neutral-400 text-base mt-3">
              Hear how practical mentoring in Tamil transformed our students’ skillsets, confidence, and earnings.
            </p>
          </FadeUp>
        </div>

        {/* 1. Large Top Video Player */}
        <FadeUp delay={0.1} className="mb-10">
          <div
            onClick={() => setActiveVideo("Valavan Academy Featured Graduate Review")}
            className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl md:rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden group cursor-pointer shadow-2xl"
          >
            <Image
              src="/assets/images/hero/full-stack-.jpg-1.webp"
              alt="Featured Student Showcase"
              fill
              className="object-cover opacity-60 group-hover:scale-102 group-hover:opacity-75 transition-all duration-500"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />

            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#1748BB] text-white flex items-center justify-center shadow-[0_0_40px_rgba(23, 72, 187,0.6)] group-hover:scale-110 group-hover:bg-[#0A3CA8] transition-all duration-300">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-1"
                  viewBox="0 0 24 24"
                >
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              </div>
            </div>

            {/* Bottom Caption Info */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-xs font-semibold text-[#4A90E2] uppercase tracking-wider">
                  FEATURED COHORT REVIEW
                </span>
                <h3 className="text-lg sm:text-2xl font-bold font-display text-white mt-1">
                  How 50+ Tamil Creators Built High-Income Portfolios in 90 Days
                </h3>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 rounded-md bg-black/60 text-xs text-neutral-400">
                Watch (4:30)
              </span>
            </div>
          </div>
        </FadeUp>

        {/* 2. Bottom Row: 5 Vertical Reel Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {REEL_TESTIMONIALS.map((reel, idx) => (
            <FadeUp key={reel.id} delay={0.1 * idx}>
              <div
                onClick={() => setActiveVideo(`${reel.name} - ${reel.role}`)}
                className="relative aspect-[9/14] rounded-2xl bg-neutral-900 border border-neutral-800/80 overflow-hidden group cursor-pointer shadow-lg hover:border-[#1748BB]/60 transition-all duration-300"
              >
                <Image
                  src={reel.image}
                  alt={reel.name}
                  fill
                  className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/40" />

                {/* Top Pill */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#1748BB] text-[10px] font-bold text-white uppercase tracking-wider">
                    {reel.tag}
                  </span>
                </div>

                {/* Center Mini Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center group-hover:scale-115 group-hover:bg-[#1748BB] group-hover:border-[#1748BB] transition-all duration-200">
                    <svg className="w-4 h-4 fill-current translate-x-0.5" viewBox="0 0 24 24">
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <div className="text-xs sm:text-sm font-bold text-white font-display truncate">
                    {reel.name}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-neutral-400 truncate">
                    {reel.role}
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

      </Container>

      {/* Video Modal */}
      <VideoModal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        title={activeVideo || "Student Video Review"}
      />
    </Section>
  );
}
