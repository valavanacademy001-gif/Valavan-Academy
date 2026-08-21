"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Container from "@/components/ui/Container";
import { ArrowLeft, ArrowRight, Clock, Globe, BarChart, Layers, Sparkles } from "lucide-react";

export interface HighlightItem {
  iconType: "clock" | "globe" | "level" | "work";
  label: string;
  value: string;
}

interface ProgramHeroInteractiveProps {
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  highlights: HighlightItem[];
  imageSrc: string;
  altText: string;
  enrollUrl: string;
  communityUrl: string;
}

function renderIcon(type: "clock" | "globe" | "level" | "work") {
  switch (type) {
    case "clock":
      return <Clock size={18} className="text-[#BACFFF] mb-1.5" />;
    case "globe":
      return <Globe size={18} className="text-[#BACFFF] mb-1.5" />;
    case "level":
      return <BarChart size={18} className="text-[#BACFFF] mb-1.5" />;
    case "work":
      return <Layers size={18} className="text-[#BACFFF] mb-1.5" />;
    default:
      return <Sparkles size={18} className="text-[#BACFFF] mb-1.5" />;
  }
}

export default function ProgramHeroInteractive({
  badge,
  titlePrefix,
  titleHighlight,
  description,
  highlights,
  imageSrc,
  altText,
  enrollUrl,
  communityUrl,
}: ProgramHeroInteractiveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  // Desktop Animation Transforms for seamless Expansion Effect
  // 1. Text slides and fades smoothly as scroll begins
  const textOpacity = useTransform(smoothProgress, [0, 0.35], [1, 0]);
  const textX = useTransform(smoothProgress, [0, 0.35], [0, -70]);

  // 2. Right Image shifts to horizontal center and scales up to massive full-width banner
  const imageX = useTransform(smoothProgress, [0, 0.65], ["0%", "-66%"]);
  const imageScale = useTransform(smoothProgress, [0, 0.65, 1], [1, 1.88, 1.92]);
  const imageShadow = useTransform(
    smoothProgress,
    [0, 0.65],
    [
      "0 20px 50px rgba(0,0,0,0.35)",
      "0 35px 100px rgba(0,0,0,0.65)",
    ]
  );

  return (
    <div
      ref={containerRef}
      className={`relative bg-[#1748BB] text-white ${
        isDesktop ? "h-[200vh]" : "min-h-screen pb-20 pt-28"
      }`}
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
      {/* Ambient Gradient Highlights */}
      <div
        className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-white/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 left-10 w-[400px] h-[400px] bg-black/15 rounded-full blur-[120px] pointer-events-none"
        aria-hidden
      />

      {/* Sticky Viewport Container */}
      <div
        className={`${
          isDesktop
            ? "sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden"
            : "relative z-10"
        }`}
      >
        <Container className="relative z-10 w-full py-8 lg:py-0">
          {/* Breadcrumb Link */}
          <Link
            href="/programs"
            style={{ color: "#BACFFF" }}
            className="inline-flex items-center gap-2 font-sans text-xs font-bold tracking-wider uppercase hover:text-white mb-6 lg:mb-8 transition-colors group"
          >
            <ArrowLeft size={14} style={{ color: "#BACFFF" }} className="group-hover:-translate-x-1 transition-transform" />
            <span>All Programs</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              style={isDesktop ? { opacity: textOpacity, x: textX } : {}}
              className="lg:col-span-7 space-y-6 lg:space-y-7"
            >
              <div>
                {/* Kicker with Line */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-[2px] bg-white" />
                  <span className="font-sans text-xs tracking-[0.25em] uppercase text-white font-bold">
                    {badge}
                  </span>
                </div>

                {/* Main Heading in Solid White */}
                <h1
                  className="font-display font-bold text-white leading-[1.04] sm:leading-[1.06] tracking-tight"
                  style={{ fontSize: "clamp(34px, 4.6vw, 62px)", color: "#FFFFFF" }}
                >
                  {titlePrefix} {titleHighlight}
                </h1>
              </div>

              {/* Subtext explicitly with color #BACFFF */}
              <p
                className="font-sans text-base sm:text-lg leading-relaxed font-normal max-w-2xl"
                style={{ color: "#BACFFF" }}
              >
                {description}
              </p>

              {/* Meta Highlights Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
                {highlights.map((h) => (
                  <div
                    key={h.label}
                    className="p-3.5 sm:p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md"
                  >
                    {renderIcon(h.iconType)}
                    <p
                      className="font-sans text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold"
                      style={{ color: "#BACFFF" }}
                    >
                      {h.label}
                    </p>
                    <p className="font-sans text-xs sm:text-sm font-bold text-white mt-0.5" style={{ color: "#FFFFFF" }}>
                      {h.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-3">
                {/* Primary Button: White Pill with Blue Text */}
                <a
                  href={enrollUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: "#FFFFFF", color: "#1748BB" }}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F0F5FF] !text-[#1748BB] font-sans font-bold text-sm sm:text-base px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                >
                  <span style={{ color: "#1748BB" }} className="!text-[#1748BB] font-bold">
                    Enroll in Program
                  </span>
                  <ArrowRight size={17} style={{ color: "#1748BB" }} className="!text-[#1748BB]" />
                </a>

                {/* Secondary Button: White Outline Pill */}
                <a
                  href={communityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#FFFFFF", borderColor: "#FFFFFF" }}
                  className="inline-flex items-center justify-center gap-2 border-2 border-white hover:border-white !text-white font-sans font-bold text-sm sm:text-base px-7 py-4 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <span style={{ color: "#FFFFFF" }} className="!text-white font-bold">
                    ↗ Ask in Community
                  </span>
                </a>
              </div>
            </motion.div>

            {/* Right Hero Image Card (Transforms from right position into a massive centered showcase) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <motion.div
                style={
                  isDesktop
                    ? {
                        x: imageX,
                        scale: imageScale,
                        boxShadow: imageShadow,
                      }
                    : {}
                }
                className="w-full origin-center relative aspect-[16/9] rounded-[22px] sm:rounded-[28px] overflow-hidden border-2 border-white/25 bg-black/40 shadow-[0_25px_60px_rgba(0,0,0,0.35)] z-20 group"
              >
                <Image
                  src={imageSrc}
                  alt={altText}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 1000px"
                />
              </motion.div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
