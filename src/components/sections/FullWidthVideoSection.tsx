"use client";

/**
 * Valavan Academy — Full Width Video Treatment Section
 * Wide cinematic video card matching the Figma layout.
 */

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import FadeUp from "@/components/animations/FadeUp";
import VideoModal from "@/components/ui/VideoModal";

export default function FullWidthVideoSection() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <Section surface="white" className="py-12 md:py-16">
      <Container>
        <FadeUp>
          <div
            onClick={() => setVideoOpen(true)}
            className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl md:rounded-3xl bg-[#090A0F] border border-neutral-800 overflow-hidden group cursor-pointer shadow-2xl"
          >
            {/* Background Thumbnail Image */}
            <Image
              src="/assets/images/hero/ai-powered-GD.webp"
              alt="Valavan Academy Full Width Showcase"
              fill
              className="object-cover opacity-60 group-hover:scale-102 group-hover:opacity-75 transition-all duration-700"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

            {/* Center Glowing Play Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-4">
              <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#1748BB]/90 text-white flex items-center justify-center shadow-[0_0_40px_rgba(23, 72, 187,0.5)] group-hover:scale-110 group-hover:bg-[#1748BB] transition-all duration-300">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-1"
                  viewBox="0 0 24 24"
                >
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-neutral-200 mb-2 border border-white/15">
                  EXPERIENCE THE CREATOR JOURNEY
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-display">
                  Inside Valavan Academy & TNCC
                </h3>
              </div>
            </div>

            {/* Corner Tag */}
            <div className="absolute bottom-6 right-6 hidden sm:block text-xs font-medium text-neutral-400 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              Watch Trailer (2:15)
            </div>
          </div>
        </FadeUp>
      </Container>

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        title="Inside Valavan Academy Experience"
      />
    </Section>
  );
}
