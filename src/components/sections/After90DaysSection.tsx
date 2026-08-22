"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import {
  Briefcase,
  Laptop,
  GraduationCap,
  DollarSign,
  Palette,
  Package,
  Cpu,
  Building2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export interface OutcomeItem {
  iconType: "job" | "freelance" | "portfolio" | "client" | "branding" | "packaging" | "workflow" | "business";
  title: string;
  tag: string;
}

interface After90DaysSectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  enrollUrl?: string;
  outcomes?: OutcomeItem[];
}

const DEFAULT_OUTCOMES: OutcomeItem[] = [
  {
    iconType: "job",
    title: "Apply For Graphic Design Jobs",
    tag: "Career Ready",
  },
  {
    iconType: "freelance",
    title: "Start Freelancing With Confidence",
    tag: "High Income",
  },
  {
    iconType: "portfolio",
    title: "Build A Professional Portfolio",
    tag: "Real Proof",
  },
  {
    iconType: "client",
    title: "Handle Client Projects Independently",
    tag: "End-to-End",
  },
  {
    iconType: "branding",
    title: "Design Branding & Marketing Materials",
    tag: "Commercial",
  },
  {
    iconType: "packaging",
    title: "Create Packaging & Print Designs",
    tag: "Print & Dieline",
  },
  {
    iconType: "workflow",
    title: "Understand Industry Workflows",
    tag: "Agencies & Studios",
  },
  {
    iconType: "business",
    title: "Start Building Your Own Design Business",
    tag: "Entrepreneurship",
  },
];

function renderOutcomeIcon(type: OutcomeItem["iconType"]) {
  const iconProps = { size: 20, className: "transition-colors duration-300" };

  switch (type) {
    case "job":
      return <Briefcase {...iconProps} />;
    case "freelance":
      return <Laptop {...iconProps} />;
    case "portfolio":
      return <GraduationCap {...iconProps} />;
    case "client":
      return <DollarSign {...iconProps} />;
    case "branding":
      return <Palette {...iconProps} />;
    case "packaging":
      return <Package {...iconProps} />;
    case "workflow":
      return <Cpu {...iconProps} />;
    case "business":
      return <Building2 {...iconProps} />;
    default:
      return <Sparkles {...iconProps} />;
  }
}

export default function After90DaysSection({
  title = "After 90 Days You Can",
  subtitle = "Unlock real-world creative capabilities and transform from a beginner to a confident, industry-ready designer.",
  badge = "Career Outcomes",
  enrollUrl = "https://learn.valavanacademy.com/clientapp/signup",
  outcomes = DEFAULT_OUTCOMES,
}: After90DaysSectionProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.15 });

  return (
    <section
      className="relative z-10 py-10 sm:py-20 md:py-24 bg-[#1748BB] text-white overflow-hidden flex flex-col justify-center select-none border-t border-[#1748BB]"
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.04) 0px,
            rgba(255, 255, 255, 0.04) 1px,
            transparent 1px,
            transparent 12px
          )
        `,
      }}
    >
      {/* Ambient Gradient Spheres */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-black/20 rounded-full blur-[120px] pointer-events-none"
        aria-hidden
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <FadeUp delay={0}>
            <div className="flex items-center justify-center gap-3 mb-2.5">
              <div className="w-8 h-[2px] bg-white" />
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-white font-bold">
                {badge}
              </span>
              <div className="w-8 h-[2px] bg-white" />
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2
              className="font-display font-bold text-white leading-tight tracking-tight mb-2.5"
              style={{ fontSize: "clamp(30px, 4.2vw, 50px)", color: "#FFFFFF" }}
            >
              After{" "}
              <span style={{ color: "#BACFFF" }}>90 Days</span> You Can.
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p
              className="font-sans text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-normal"
              style={{ color: "#BACFFF" }}
            >
              {subtitle}
            </p>
          </FadeUp>
        </div>

        {/* 8 Modern Glass Outcome Cards in Compact Balanced Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-6xl mx-auto"
        >
          {outcomes.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.55, y: 45 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.55, y: 45 }
              }
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 16,
                mass: 0.7,
                delay: index * 0.08,
              }}
              className="h-full"
            >
              <div className="group h-full p-4 sm:p-5 rounded-[22px] bg-white/10 hover:bg-white border border-white/20 hover:border-white transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.25)] hover:-translate-y-1.5 flex flex-col justify-between gap-4 backdrop-blur-md cursor-default">
                
                {/* Top Icon & Tag */}
                <div className="flex items-center justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-white/15 group-hover:bg-[#1748BB] text-white group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                    {renderOutcomeIcon(item.iconType)}
                  </div>
                  <span className="font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 group-hover:bg-[#1748BB]/10 text-white group-hover:text-[#1748BB] transition-colors">
                    {item.tag}
                  </span>
                </div>

                {/* Outcome Title (Clash Display Semibold, White in normal, Blue on hover) */}
                <div>
                  <h3 className="font-display font-semibold text-sm sm:text-base text-white group-hover:text-[#1748BB] leading-snug tracking-normal transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>

                {/* Subtle verified checkmark */}
                <div className="flex items-center gap-1.5 pt-1.5 border-t border-white/10 group-hover:border-neutral-100 transition-colors">
                  <CheckCircle2 size={13} className="text-[#BACFFF] group-hover:text-[#1748BB] transition-colors" />
                  <span className="font-sans text-[11px] sm:text-xs text-[#BACFFF] group-hover:text-[#1748BB] font-medium transition-colors">
                    Guaranteed Skill
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
