"use client";

/**
 * Valavan Academy — Fullscreen Video Hero Section
 * Exact 1:1 match of the Social Eagle reference layout:
 * - High contrast white and blue text
 * - Download Brochure button with crisp, visible dark text on white pill
 * - Clash Display font for main heading, Inter medium/regular for subtext
 * - Horizontal compact slider card with auto-rotation
 */

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Download } from "lucide-react";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import { EXTERNAL_URLS } from "@/data/site.config";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    id: "summit",
    tag: "GRAND EVENT 2026",
    tagColor: "text-[#4A90E2]",
    title: "TNCC Grand Summit 2026",
    dateText: "STARTS SOON",
    image: "/assets/images/team/team.webp",
    link: EXTERNAL_URLS.community,
    external: true,
  },
  {
    id: "graphic-design",
    tag: "NOW ENROLLING",
    tagColor: "text-[#4A90E2]",
    title: "90-Day Graphic Design Mastery",
    dateText: "BATCH 14",
    image: "/assets/images/hero/ai-powered-GD.webp",
    link: "/programs/90-days-graphic-design",
    external: false,
  },
  {
    id: "full-stack",
    tag: "FLAGSHIP PROGRAM",
    tagColor: "text-[#4A90E2]",
    title: "Full Stack Creator Program",
    dateText: "6 MONTHS",
    image: "/assets/images/hero/full-stack-.jpg-1.webp",
    link: "/programs/full-stack-creator",
    external: false,
  },
  {
    id: "ai-challenge",
    tag: "21-DAY CHALLENGE",
    tagColor: "text-[#4A90E2]",
    title: "AI For Digital Creators",
    dateText: "LIMITED SEATS",
    image: "/assets/certifications/2.webp",
    link: "/programs",
    external: false,
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-rotating timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 4500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const slide = SLIDES[currentSlide];

  return (
    <section className="relative w-full min-h-[100dvh] lg:h-screen flex flex-col justify-between overflow-hidden bg-[#07080D] text-white">
      
      {/* ── Background Video with Cinematic Overlays (Brighter & Clearer) ── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[center_30%] opacity-100 brightness-[1.15] contrast-[1.04] scale-[1.08] sm:scale-105"
        >
          <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Scrims: Soft bottom gradient for text contrast while keeping instructor & scene bright */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080D] via-[#07080D]/65 via-[#07080D]/15 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent z-10" />
      </div>

      {/* ── Left Edge Vertical Brand Line ─────────────────────────────────── */}
      <div className="absolute left-4 sm:left-6 bottom-24 hidden xl:flex items-center gap-3 -rotate-90 origin-bottom-left z-20 select-none text-[10px] tracking-[0.25em] text-neutral-400 font-semibold uppercase">
        <span>TAMIL NADU</span>
        <span className="w-8 h-[1px] bg-neutral-600" />
        <span>SINCE 2018</span>
      </div>

      {/* ── Spacer for fixed top navbar ───────────────────────────────────── */}
      <div className="h-20 sm:h-28 lg:h-32" />

      {/* ── Bottom Third Main Content Area ────────────────────────────────── */}
      <div className="relative z-20 pb-6 sm:pb-12 lg:pb-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
            
            {/* ── Left Column: Headline, Narrative & White Pill Button ──────── */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              
              {/* Main Headline (Clash Display Bold) */}
              <FadeUp delay={0.1}>
                <h1 className="text-[38px] sm:text-[48px] md:text-[56px] lg:text-[62px] font-bold leading-[0.98] sm:leading-[1.02] tracking-tight font-display text-white">
                  <span className="text-white">Your Career</span> <br />
                  <span className="text-[#6392FF]">Changing Partner</span>
                </h1>
              </FadeUp>

              {/* Subtitle (Inter Medium / Regular) */}
              <FadeUp delay={0.2}>
                <p
                  style={{ color: "#C7CDDB" }}
                  className="text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-sans font-normal"
                >
                  Learn Graphic Design, Video Editing , Web Design &amp; Advanced AI in Tamil with hands-on mentorship and real-world projects.
                </p>
              </FadeUp>

              {/* Action Buttons */}
              <FadeUp delay={0.3}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  
                  {/* Primary Blue Button: Explore Courses with ArrowUpRight icon */}
                  <Link
                    href="/programs"
                    className="inline-flex items-center gap-2 bg-[#1748BB] hover:bg-[#0A3CA8] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-[0_10px_30px_rgba(23, 72, 187,0.45)] hover:scale-105 transition-all duration-200"
                  >
                    <ArrowUpRight size={18} className="text-white" />
                    <span>Explore Courses</span>
                  </Link>

                  {/* Secondary Button: Join TNCC Community (Blue Stroke -> White background with Blue text on hover) */}
                  <a
                    href={EXTERNAL_URLS.community}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-white hover:text-[#1748BB] bg-[#1748BB]/10 hover:bg-white border-2 border-[#1748BB] hover:border-white px-6 py-3.5 rounded-full shadow-lg hover:shadow-[0_10px_30px_rgba(255,255,255,0.25)] hover:scale-105 transition-all duration-200 backdrop-blur-md"
                  >
                    <span className="transition-colors group-hover:text-[#1748BB]">Join TNCC Community</span>
                    <span className="transition-all group-hover:text-[#1748BB] group-hover:translate-x-1">→</span>
                  </a>

                </div>
              </FadeUp>

            </div>

            {/* ── Right Column: Compact Horizontal Slider Card ──────────────── */}
            <div className="lg:col-span-5 flex justify-start lg:justify-end">
              <FadeUp delay={0.2} className="w-full sm:w-[400px] md:w-[430px]">
                
                {/* Horizontal Card Box */}
                <div
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className="rounded-2xl bg-[#0D101A]/95 border border-white/15 p-3 sm:p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 hover:border-[#1748BB]/60"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-center gap-3.5"
                    >
                      {/* Left Thumbnail Image */}
                      <div className="relative w-24 sm:w-28 h-20 sm:h-22 rounded-xl overflow-hidden bg-neutral-900 shrink-0 border border-white/10">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          priority
                          className="object-cover"
                          sizes="120px"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                      </div>

                      {/* Right Text & CTA */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <span className={cn("text-[10px] font-bold uppercase tracking-widest block", slide.tagColor)}>
                          {slide.tag}
                        </span>

                        <h3 className="text-sm sm:text-base font-semibold font-display text-white truncate leading-snug">
                          {slide.title}
                        </h3>

                        {/* Bottom Row inside card */}
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">
                            {slide.dateText}
                          </span>

                          {slide.external ? (
                            <a
                              href={slide.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 bg-[#1748BB] hover:bg-[#0A3CA8] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-colors shadow-md"
                            >
                              <span>CLICK HERE</span>
                              <ArrowRight size={11} />
                            </a>
                          ) : (
                            <Link
                              href={slide.link}
                              className="inline-flex items-center gap-1 bg-[#1748BB] hover:bg-[#0A3CA8] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-colors shadow-md"
                            >
                              <span>CLICK HERE</span>
                              <ArrowRight size={11} />
                            </Link>
                          )}
                        </div>
                      </div>

                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Below-Card Progress & Navigation Controls */}
                <div className="flex items-center justify-between pt-3 px-1 text-xs text-neutral-400">
                  
                  {/* Left: Progress Dash & Dots + Status */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {SLIDES.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          aria-label={`Go to slide ${idx + 1}`}
                          className={cn(
                            "h-1.5 rounded-full transition-all duration-300",
                            currentSlide === idx
                              ? "w-6 bg-[#1748BB]"
                              : "w-1.5 bg-neutral-600 hover:bg-neutral-400"
                          )}
                        />
                      ))}
                    </div>

                    <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                      {currentSlide + 1} / {SLIDES.length} · {isPaused ? "PAUSED" : "AUTO-ROTATING"}
                    </span>
                  </div>

                  {/* Right: Circular Prev / Next Navigation Arrows */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={prevSlide}
                      aria-label="Previous slide"
                      className="w-7 h-7 rounded-full border border-neutral-700 bg-black/40 text-neutral-300 hover:text-white hover:border-white/40 flex items-center justify-center transition-all"
                    >
                      <ChevronLeft size={14} />
                    </button>

                    <button
                      onClick={nextSlide}
                      aria-label="Next slide"
                      className="w-7 h-7 rounded-full border border-neutral-700 bg-black/40 text-neutral-300 hover:text-white hover:border-white/40 flex items-center justify-center transition-all"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>

                </div>

              </FadeUp>
            </div>

          </div>
        </Container>
      </div>

    </section>
  );
}
