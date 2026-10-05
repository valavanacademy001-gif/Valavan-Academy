"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import { TrendingUp, Sparkles, User, Settings } from "lucide-react";

interface CreatorEconomyBoomSectionProps {
  badge?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  description?: string;
  economyMap?: Record<string, string>;
}

export default function CreatorEconomyBoomSection({
  badge,
  titlePrefix,
  titleHighlight,
  description,
  economyMap,
}: CreatorEconomyBoomSectionProps = {}) {
  const effectiveBadge = badge || economyMap?.badge || "WHY NOW";
  const effectiveTitlePrefix = titlePrefix || economyMap?.title_prefix || "Why Is Full Stack Creative";
  const effectiveTitleHighlight = titleHighlight || economyMap?.title_highlight || "Booming?";
  const effectiveDescription =
    description ||
    economyMap?.description ||
    "The creative market has changed permanently. Companies and clients no longer want isolated specialists — they need versatile creators who command AI, design, video, and web workflows together.";

  const card1Tag = economyMap?.card_1_tag || "AI ERA SHIFT";
  const card1Rise = economyMap?.card_1_rise || "+300% Boost";
  const card1Title = economyMap?.card_1_title || "AI Is Changing Everything";
  const card1Stat = economyMap?.card_1_stat || "10X";
  const card1StatLabel = economyMap?.card_1_stat_label || "Creative Velocity";
  const card1Desc =
    economyMap?.card_1_desc ||
    "Businesses Need People Who Can Work Alongside AI, Not Compete With It.";
  const card1Source = economyMap?.card_1_source || "(Global Creative AI Market Report)";

  const card2Tag = economyMap?.card_2_tag || "Multi-Skill Advantage";
  const card2Badge = economyMap?.card_2_badge || "High-Demand";
  const card2Title = economyMap?.card_2_title || "More Opportunities Than Ever";
  const card2Stat = economyMap?.card_2_stat || "5X";
  const card2StatLabel = economyMap?.card_2_stat_label || "Higher Earning Potential";
  const card2Desc =
    economyMap?.card_2_desc ||
    "Creators Who Understand Multiple Skills Have More Career & Freelancing Opportunities.";
  const card2Source = economyMap?.card_2_source || "(Creator Freelancing Trends)";

  const points = [
    { label: "1X Speed", x: 50, y: 165, value: "Manual Workflow" },
    { label: "2X Speed", x: 150, y: 132, value: "Multi-Tool" },
    { label: "4X Speed", x: 250, y: 98, value: "AI Assisted" },
    { label: "8X Speed", x: 350, y: 64, value: "Workflow Automation" },
    { label: "10X Velocity", x: 450, y: 35, value: "Full Stack Creative", highlight: "10X Velocity" },
  ];

  const polylinePoints = "50,165 150,132 250,98 350,64 450,35";
  const areaPoints = "50,165 150,132 250,98 350,64 450,35 450,195 50,195";

  return (
    <section className="py-4 sm:py-6 md:py-8 bg-[#FBFDFF] relative overflow-visible select-none transition-all">
      {/* Soft Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#1748BB]/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <FadeUp delay={0}>
            <div className="inline-flex items-center justify-center mb-3">
              <span className="inline-flex items-center gap-2 border border-[#1748BB]/30 text-[#1748BB] font-sans text-xs font-bold px-4 py-1.5 rounded-full bg-[#1748BB]/5 shadow-sm">
                <Sparkles size={13} className="text-[#1748BB]" />
                {effectiveBadge}
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2
              className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-2.5"
              style={{ fontSize: "clamp(26px, 3.8vw, 46px)" }}
            >
              {effectiveTitlePrefix}{" "}
              <span style={{ color: "#1748BB" }} className="!text-[#1748BB]">
                {effectiveTitleHighlight}
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="font-sans text-neutral-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-normal">
              {effectiveDescription}
            </p>
          </FadeUp>
        </div>

        {/* ── 2-Card Bento Grid ── */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ── Card 1: Explosive Growth in India + Animated Interactive Line Chart ── */}
          <div className="lg:col-span-7 flex">
            <FadeUp delay={0.15} className="w-full flex">
              <div className="w-full rounded-[24px] sm:rounded-[32px] bg-white border-2 border-[#1748BB]/25 p-5 sm:p-7 shadow-[0_16px_45px_rgba(23,72,187,0.08)] flex flex-col justify-between hover:shadow-[0_22px_55px_rgba(23,72,187,0.15)] transition-all duration-300">
                
                {/* Text Details */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#1748BB] bg-[#F0F5FF] px-3.5 py-1 rounded-full border border-[#BFDBFE]">
                      {card1Tag}
                    </span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-bold font-mono bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <TrendingUp size={13} /> {card1Rise}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-xl sm:text-2xl text-[#1E2026] leading-snug">
                    {card1Title}
                  </h3>

                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-display font-bold text-3xl sm:text-4xl"
                      style={{ color: "#1748BB" }}
                    >
                      {card1Stat}
                    </span>
                    <span className="text-xs text-neutral-500 font-sans font-medium">
                      {card1StatLabel}
                    </span>
                  </div>

                  <p className="font-sans text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    {card1Desc}
                  </p>
                  <p className="font-sans text-[11px] text-neutral-400 font-semibold italic">
                    {card1Source}
                  </p>
                </div>

                {/* ── Animated SVG Line Graph ── */}
                <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#F4F8FF] to-[#EBF3FF]/60 border border-[#BFDBFE]/60 p-3 sm:p-5 overflow-hidden">
                  
                  {/* Subtle Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-40 pointer-events-none">
                    <div className="border-b border-dashed border-[#1748BB]/20 w-full" />
                    <div className="border-b border-dashed border-[#1748BB]/20 w-full" />
                    <div className="border-b border-dashed border-[#1748BB]/20 w-full" />
                  </div>

                  {/* SVG Chart */}
                  <svg
                    viewBox="0 0 500 195"
                    preserveAspectRatio="none"
                    className="w-full aspect-[2.6/1] sm:aspect-[2.8/1] overflow-visible"
                  >
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1748BB" stopOpacity="0.32" />
                        <stop offset="100%" stopColor="#1748BB" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Gradient Area Fill */}
                    <polygon
                      points={areaPoints}
                      fill="url(#chartGradient)"
                    />

                    {/* Animated Polyline */}
                    <motion.polyline
                      points={polylinePoints}
                      fill="none"
                      stroke="#1748BB"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, ease: "easeOut" }}
                    />

                    {/* Coordinate Milestone Dots */}
                    {points.map((pt, i) => (
                      <g key={pt.label}>
                        {/* Glow halo on peak point */}
                        {pt.highlight && (
                          <motion.circle
                            cx={pt.x}
                            cy={pt.y}
                            r="22"
                            fill="#1748BB"
                            fillOpacity="0.15"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.35, 0.7, 0.35] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                          />
                        )}

                        {/* Node circle */}
                        <motion.circle
                          cx={pt.x}
                          cy={pt.y}
                          r={pt.highlight ? 7 : 5}
                          fill={pt.highlight ? "#1748BB" : "#FFFFFF"}
                          stroke="#1748BB"
                          strokeWidth={pt.highlight ? 3 : 2.5}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                        />

                        {/* Spotlight 10X Velocity Badge on Peak */}
                        {pt.highlight && (
                          <g transform={`translate(${pt.x - 28}, ${pt.y - 18})`}>
                            <motion.g
                              initial={{ y: 8, opacity: 0 }}
                              whileInView={{ y: 0, opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 1, duration: 0.4 }}
                            >
                              <rect
                                x="-44"
                                y="-13"
                                width="88"
                                height="26"
                                rx="13"
                                fill="#1748BB"
                                filter="drop-shadow(0 4px 10px rgba(23,72,187,0.35))"
                              />
                              <text
                                x="0"
                                y="4"
                                textAnchor="middle"
                                fill="#FFFFFF"
                                fontSize="11"
                                fontWeight="bold"
                                fontFamily="sans-serif"
                              >
                                {pt.highlight}
                              </text>
                            </motion.g>
                          </g>
                        )}
                      </g>
                    ))}
                  </svg>

                  {/* 5 Milestone X-Axis Pills (1:1 aligned with SVG columns) */}
                  <div className="grid grid-cols-5 gap-1 pt-2.5 border-t border-[#BFDBFE]/60 text-center">
                    {points.map((pt) => (
                      <div key={pt.label} className="flex justify-center">
                        <span
                          className={`px-1.5 sm:px-2.5 py-1 rounded-full border text-[10px] sm:text-xs font-bold transition-colors cursor-default whitespace-nowrap ${
                            pt.highlight
                              ? "bg-[#1748BB] text-white border-[#1748BB] shadow-sm"
                              : "bg-white border-[#BFDBFE] text-[#1748BB] shadow-xs hover:bg-[#1748BB] hover:text-white"
                          }`}
                        >
                          {pt.label}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            </FadeUp>
          </div>

          {/* ── Card 2: Diverse Opportunities + Interactive Rotating Industry Hub ── */}
          <div className="lg:col-span-5 flex">
            <FadeUp delay={0.2} className="w-full flex">
              <div className="w-full rounded-[24px] sm:rounded-[32px] bg-white border-2 border-[#1748BB]/25 p-5 sm:p-7 shadow-[0_16px_45px_rgba(23,72,187,0.08)] flex flex-col justify-between hover:shadow-[0_22px_55px_rgba(23,72,187,0.15)] transition-all duration-300">
                
                {/* Text Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#1748BB] bg-[#F0F5FF] px-3.5 py-1 rounded-full border border-[#BFDBFE]">
                      {card2Tag}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#1748BB] text-xs font-bold font-mono bg-[#EBF2FE] px-2.5 py-1 rounded-full border border-[#BFDBFE]">
                      {card2Badge}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-xl sm:text-2xl text-[#1E2026] leading-snug">
                    {card2Title}
                  </h3>

                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-display font-bold text-3xl sm:text-4xl"
                      style={{ color: "#1748BB" }}
                    >
                      {card2Stat}
                    </span>
                    <span className="text-xs text-neutral-500 font-sans font-medium">
                      {card2StatLabel}
                    </span>
                  </div>

                  <p className="font-sans text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    {card2Desc}
                  </p>
                  <p className="font-sans text-[11px] text-neutral-400 font-semibold italic">
                    {card2Source}
                  </p>
                </div>

                {/* ── Animated Rotating Gear with Creator Avatar Center ── */}
                <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#F4F8FF] to-[#EBF3FF]/60 border border-[#BFDBFE]/60 p-4 sm:p-5 flex flex-col items-center justify-center text-center overflow-hidden min-h-[175px]">
                  
                  {/* Floating rotating gear graphic */}
                  <div className="relative w-28 h-28 flex items-center justify-center mb-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
                      className="absolute inset-0 text-[#1748BB]/20 flex items-center justify-center"
                    >
                      <Settings size={105} strokeWidth={1.5} />
                    </motion.div>

                    {/* Center Creator Icon Badge */}
                    <div className="w-16 h-16 rounded-full bg-[#1748BB] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(23,72,187,0.4)] relative z-10">
                      <User size={28} />
                    </div>
                  </div>

                  {/* Industry Tags pill list */}
                  <div className="flex flex-wrap justify-center gap-1.5 pt-2 relative z-10">
                    {["E-Commerce", "Real Estate", "EdTech", "Marketing", "Fashion"].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-white border border-[#BFDBFE] text-[11px] font-semibold text-[#1748BB] shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            </FadeUp>
          </div>

        </div>
      </Container>
    </section>
  );
}
