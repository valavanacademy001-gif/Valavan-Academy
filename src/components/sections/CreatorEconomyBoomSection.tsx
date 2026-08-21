"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import { TrendingUp, Sparkles, User, Settings } from "lucide-react";

export default function CreatorEconomyBoomSection() {
  const points = [
    { label: "2 LPA", x: 40, y: 260, value: "Beginner" },
    { label: "4 LPA", x: 130, y: 185, value: "Junior Designer" },
    { label: "6 LPA", x: 240, y: 170, value: "Full Stack Creator" },
    { label: "8 LPA", x: 340, y: 95, value: "Lead Designer", highlight: "8.5 LPA" },
    { label: "10 LPA", x: 440, y: 55, value: "Top Freelance Consultant" },
  ];

  const polylinePoints = "40,260 130,185 190,205 240,170 340,95 440,55";
  const areaPoints = "40,260 130,185 190,205 240,170 340,95 440,55 440,300 40,300";

  return (
    <section className="py-20 sm:py-28 bg-[#FBFDFF] relative z-20 overflow-hidden border-t border-neutral-100 select-none">
      {/* Soft Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#1748BB]/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <FadeUp delay={0}>
            <div className="inline-flex items-center justify-center mb-4">
              <span className="inline-flex items-center gap-2 border border-[#1748BB]/30 text-[#1748BB] font-sans text-xs font-bold px-4 py-1.5 rounded-full bg-[#1748BB]/5 shadow-sm">
                <Sparkles size={13} className="text-[#1748BB]" />
                Growth Update
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2
              className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-3.5"
              style={{ fontSize: "clamp(30px, 4.2vw, 52px)" }}
            >
              Creator Economy :{" "}
              <span style={{ color: "#1748BB" }} className="!text-[#1748BB]">
                Why is it Booming ?
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="font-sans text-neutral-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
              Graphic design blends creativity, visual storytelling, and technology to turn ideas into stunning visuals. With the rise of digital content, talented freelance designers are in high demand!
            </p>
          </FadeUp>
        </div>

        {/* ── 2-Card Bento Grid ── */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ── Card 1: Explosive Growth in India + Animated Interactive Line Chart ── */}
          <div className="lg:col-span-7 flex">
            <FadeUp delay={0.15} className="w-full flex">
              <div className="w-full rounded-[28px] sm:rounded-[36px] bg-white border-2 border-[#1748BB]/25 p-7 sm:p-9 shadow-[0_16px_45px_rgba(23,72,187,0.08)] flex flex-col justify-between hover:shadow-[0_22px_55px_rgba(23,72,187,0.15)] transition-all duration-300">
                
                {/* Text Details */}
                <div className="mb-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#1748BB] bg-[#F0F5FF] px-3.5 py-1 rounded-full border border-[#BFDBFE]">
                      Market Demand
                    </span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-bold font-mono bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <TrendingUp size={13} /> +250% Rise
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-2xl sm:text-3xl text-[#1E2026] leading-snug">
                    Explosive Growth in India
                  </h3>

                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-display font-bold text-4xl sm:text-5xl"
                      style={{ color: "#1748BB" }}
                    >
                      250%
                    </span>
                    <span className="text-xs text-neutral-500 font-sans font-medium">
                      Industry Expansion Rate
                    </span>
                  </div>

                  <p className="font-sans text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Between 2022–2030, India&apos;s freelancing and graphic design industry is set for massive growth driven by digital marketing, brand design demand, and AI-powered creative tools.
                  </p>
                  <p className="font-sans text-[11px] text-neutral-400 font-semibold italic">
                    (Source: FICCI Report)
                  </p>
                </div>

                {/* ── Animated SVG Line Graph ── */}
                <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#F4F8FF] to-[#EBF3FF]/60 border border-[#BFDBFE]/60 p-4 sm:p-6 overflow-hidden">
                  
                  {/* Subtle Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-40 pointer-events-none">
                    <div className="border-b border-dashed border-[#1748BB]/20 w-full" />
                    <div className="border-b border-dashed border-[#1748BB]/20 w-full" />
                    <div className="border-b border-dashed border-[#1748BB]/20 w-full" />
                  </div>

                  {/* SVG Chart */}
                  <svg
                    viewBox="0 0 480 300"
                    className="w-full h-48 sm:h-56 overflow-visible"
                  >
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1748BB" stopOpacity="0.3" />
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
                        {/* Glow halo on high points */}
                        {pt.highlight && (
                          <motion.circle
                            cx={pt.x}
                            cy={pt.y}
                            r="28"
                            fill="#1748BB"
                            fillOpacity="0.12"
                            animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
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

                        {/* Spotlight 8.5 LPA Badge on Peak */}
                        {pt.highlight && (
                          <g transform={`translate(${pt.x}, ${pt.y - 42})`}>
                            {/* Blue badge */}
                            <motion.g
                              initial={{ y: 10, opacity: 0 }}
                              whileInView={{ y: 0, opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 1.1, duration: 0.4 }}
                            >
                              <rect
                                x="-36"
                                y="-18"
                                width="72"
                                height="32"
                                rx="16"
                                fill="#1748BB"
                                filter="drop-shadow(0 4px 10px rgba(23,72,187,0.35))"
                              />
                              <text
                                x="0"
                                y="3"
                                textAnchor="middle"
                                fill="#FFFFFF"
                                fontSize="12"
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

                  {/* 5 Milestone X-Axis Pills */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#BFDBFE]/60">
                    {points.map((pt) => (
                      <span
                        key={pt.label}
                        className="px-2 sm:px-3 py-1 rounded-full bg-white border border-[#BFDBFE] text-[10px] sm:text-xs font-bold text-[#1748BB] shadow-sm hover:bg-[#1748BB] hover:text-white transition-colors cursor-default"
                      >
                        {pt.label}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            </FadeUp>
          </div>

          {/* ── Card 2: Diverse Opportunities + Interactive Rotating Industry Hub ── */}
          <div className="lg:col-span-5 flex">
            <FadeUp delay={0.2} className="w-full flex">
              <div className="w-full rounded-[28px] sm:rounded-[36px] bg-white border-2 border-[#1748BB]/25 p-7 sm:p-9 shadow-[0_16px_45px_rgba(23,72,187,0.08)] flex flex-col justify-between hover:shadow-[0_22px_55px_rgba(23,72,187,0.15)] transition-all duration-300">
                
                {/* Text Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#1748BB] bg-[#F0F5FF] px-3.5 py-1 rounded-full border border-[#BFDBFE]">
                      Multi-Sector Adoption
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#1748BB] text-xs font-bold font-mono bg-[#EBF2FE] px-2.5 py-1 rounded-full border border-[#BFDBFE]">
                      Global Reach
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-2xl sm:text-3xl text-[#1E2026] leading-snug">
                    Diverse Opportunities
                  </h3>

                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-display font-bold text-4xl sm:text-5xl"
                      style={{ color: "#1748BB" }}
                    >
                      95%
                    </span>
                    <span className="text-xs text-neutral-500 font-sans font-medium">
                      Businesses Rely on Visuals
                    </span>
                  </div>

                  <p className="font-sans text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    From marketing and education to fashion, real estate, and e-commerce nearly every industry now depends on graphic design to build brand identity and attract customers.
                  </p>
                  <p className="font-sans text-[11px] text-neutral-400 font-semibold italic">
                    (Source: Statista)
                  </p>
                </div>

                {/* ── Animated Rotating Gear with Creator Avatar Center ── */}
                <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#F4F8FF] to-[#EBF3FF]/60 border border-[#BFDBFE]/60 p-6 flex flex-col items-center justify-center text-center overflow-hidden min-h-[220px]">
                  
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
