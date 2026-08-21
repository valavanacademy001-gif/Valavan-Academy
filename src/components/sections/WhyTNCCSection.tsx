"use client";

/**
 * Valavan Academy — Why We Built TNCC Section
 * Matching the Figma layout: 2-column layout with left heading, narrative, stats,
 * and right video/preview container with play button.
 */

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import FadeUp from "@/components/animations/FadeUp";
import VideoModal from "@/components/ui/VideoModal";

export default function WhyTNCCSection() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <Section surface="white" className="py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Heading, text, and stats */}
          <div className="lg:col-span-6 space-y-6">
            <FadeUp>
              <h2 className="text-[34px] sm:text-[42px] md:text-[48px] font-bold leading-[1.12] tracking-tight font-display text-[#1E2026]">
                Why we built <br />
                <span className="text-[#1748BB]">TNCC?</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
                Traditional education focuses heavily on theory without real market skills. We created TNCC (Tamil Nadu Creators Club) & Valavan Academy to provide an end-to-end ecosystem where creators learn practical digital tools, produce high-caliber portfolios, and unlock real career and freelance opportunities.
              </p>
            </FadeUp>

            {/* Stats Row */}
            <FadeUp delay={0.2}>
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-neutral-200">
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1748BB] font-display">
                    40,000+
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
                    Community Members
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E2026] font-display">
                    100+
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
                    Live Workshops
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E2026] font-display">
                    5,000+
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
                    Students Mentored
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Dark Rounded Video Card */}
          <div className="lg:col-span-6">
            <FadeUp delay={0.2}>
              <div
                onClick={() => setVideoOpen(true)}
                className="relative aspect-[16/10] rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden group cursor-pointer shadow-xl"
              >
                {/* Background Image / Overlay */}
                <Image
                  src="/assets/images/hero/Untitled-design-25.jpg-1.webp"
                  alt="Why we built TNCC - Valavan Academy Story"
                  fill
                  className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-500"
                  sizes="(max-width: 1024px) 100vw, 550px"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent" />

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1748BB] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#0A3CA8] transition-transform duration-300">
                    <svg
                      className="w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5"
                      viewBox="0 0 24 24"
                    >
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#4A90E2] uppercase tracking-wider">
                      Our Vision & Mission
                    </span>
                    <p className="text-sm font-bold text-white mt-0.5">
                      Watch the Valavan Academy & TNCC Story
                    </p>
                  </div>
                  <span className="text-xs text-neutral-400 bg-black/50 px-2.5 py-1 rounded-md">
                    3:45 min
                  </span>
                </div>
              </div>
            </FadeUp>
          </div>

        </div>
      </Container>

      {/* Video Popup Modal */}
      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        title="Why we built TNCC & Valavan Academy"
      />
    </Section>
  );
}
