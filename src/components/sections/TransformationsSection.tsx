"use client";

/**
 * Valavan Academy — Real People, Real Transformations Section
 * Matching Figma layout: Left heading & narrative, right vertical video preview (9:16).
 */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import FadeUp from "@/components/animations/FadeUp";
import VideoModal from "@/components/ui/VideoModal";

export default function TransformationsSection() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <Section surface="white" className="py-20 md:py-28 bg-[#FAFAFC]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Heading, description, and link */}
          <div className="lg:col-span-6 space-y-6">
            <FadeUp>
              <h2 className="text-[34px] sm:text-[42px] md:text-[48px] font-bold leading-[1.12] tracking-tight font-display text-[#1E2026]">
                Real People, <br />
                <span className="text-[#1748BB]">Real Transformations.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
                From zero digital background to working as full-time designers, agency leads, and freelance creators. Our students share their raw, unfiltered journeys.
              </p>
            </FadeUp>

            {/* Testimonial Quote Pill */}
            <FadeUp delay={0.2}>
              <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-3">
                <Quote size={24} className="text-[#1748BB]/60" />
                <p className="text-sm sm:text-base text-neutral-800 italic leading-relaxed">
                  &ldquo;I was skeptical about learning online in Tamil. But the practical project assignments and live mentor feedback helped me land my first 45K/month remote design role within 4 months!&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-full bg-[#1748BB]/10 text-[#1748BB] font-bold flex items-center justify-center text-sm">
                    KR
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#1E2026]">Kiran Rajesh</div>
                    <div className="text-xs text-neutral-500">UI/UX & Brand Designer · 90-Day Alumni</div>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <Link
                href="/community"
                className="inline-flex items-center gap-2 text-base font-bold text-[#1748BB] hover:text-[#0A3CA8] group transition-colors pt-2"
              >
                Watch All Student Stories
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeUp>
          </div>

          {/* Right Column: Vertical Video (Aspect 9:16) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <FadeUp delay={0.2} className="w-full max-w-sm">
              <div
                onClick={() => setVideoOpen(true)}
                className="relative aspect-[9/14] sm:aspect-[9/15] rounded-3xl bg-[#090A0F] border border-neutral-800 overflow-hidden group cursor-pointer shadow-2xl"
              >
                {/* Background Image / Reel Screenshot */}
                <Image
                  src="/assets/certifications/2.webp"
                  alt="Student Transformation Story"
                  fill
                  className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 360px"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/40" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#1748BB] text-white text-[11px] font-bold uppercase tracking-wider shadow">
                    STUDENT STORY
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-neutral-300 text-xs font-medium">
                    1:20 min
                  </span>
                </div>

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#1748BB]/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(23, 72, 187,0.6)] group-hover:scale-115 group-hover:bg-[#1748BB] transition-all duration-300">
                    <svg className="w-7 h-7 fill-current translate-x-0.5" viewBox="0 0 24 24">
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Card Info */}
                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                  <span className="text-xs font-semibold text-[#4A90E2]">
                    Full-Stack Creator Transformation
                  </span>
                  <h4 className="text-lg font-bold font-display leading-snug">
                    How Dhanush went from College Student to Freelance Video Editor
                  </h4>
                  <p className="text-xs text-neutral-400 pt-1">
                    Click to play story video
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>

        </div>
      </Container>

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        title="Student Transformation Story — Valavan Academy"
      />
    </Section>
  );
}
