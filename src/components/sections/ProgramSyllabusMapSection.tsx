"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import {
  Share2,
  Image as ImageIcon,
  ShieldCheck,
  Scissors,
  PlaySquare,
  Briefcase,
  Globe,
  Cpu,
  PenTool,
} from "lucide-react";

export interface NodeItem {
  id: string;
  title: string;
  icon: (isActive: boolean) => React.ReactNode;
  // Position coordinates in percentage for desktop lines & cards
  x: number; // percentage
  y: number; // percentage
  lineStartX: number; // percent
  lineStartY: number; // percent
  centerTargetX: number; // percent
  centerTargetY: number; // percent
}

const CLOCKWISE_NODES: NodeItem[] = [
  // 0: Top Left (Social Media Design)
  {
    id: "social-media",
    title: "Social Media Design",
    icon: (active) => <Share2 size={20} className={active ? "text-[#1748BB]" : "text-white"} />,
    x: 18,
    y: 8,
    lineStartX: 18,
    lineStartY: 16,
    centerTargetX: 42,
    centerTargetY: 42,
  },
  // 1: Top Center (Thumbnail Design)
  {
    id: "thumbnail",
    title: "Thumbnail Design",
    icon: (active) => <ImageIcon size={20} className={active ? "text-[#1748BB]" : "text-white"} />,
    x: 50,
    y: 6,
    lineStartX: 50,
    lineStartY: 15,
    centerTargetX: 50,
    centerTargetY: 40,
  },
  // 2: Top Right (Branding)
  {
    id: "branding",
    title: "Branding",
    icon: (active) => <ShieldCheck size={20} className={active ? "text-[#1748BB]" : "text-white"} />,
    x: 82,
    y: 8,
    lineStartX: 82,
    lineStartY: 16,
    centerTargetX: 58,
    centerTargetY: 42,
  },
  // 3: Middle Right (Video Editing)
  {
    id: "video-editing",
    title: "Video Editing",
    icon: (active) => <Scissors size={20} className={active ? "text-[#1748BB]" : "text-white"} />,
    x: 90,
    y: 36,
    lineStartX: 83,
    lineStartY: 38,
    centerTargetX: 63,
    centerTargetY: 47,
  },
  // 4: Lower Right (Content Creation)
  {
    id: "content-creation",
    title: "Content Creation",
    icon: (active) => <PlaySquare size={20} className={active ? "text-[#1748BB]" : "text-white"} />,
    x: 90,
    y: 64,
    lineStartX: 83,
    lineStartY: 64,
    centerTargetX: 63,
    centerTargetY: 53,
  },
  // 5: Bottom Right (Freelancing System)
  {
    id: "freelancing",
    title: "Freelancing System",
    icon: (active) => <Briefcase size={20} className={active ? "text-[#1748BB]" : "text-white"} />,
    x: 74,
    y: 90,
    lineStartX: 74,
    lineStartY: 82,
    centerTargetX: 58,
    centerTargetY: 58,
  },
  // 6: Bottom Left (WordPress)
  {
    id: "wordpress",
    title: "WordPress",
    icon: (active) => <Globe size={20} className={active ? "text-[#1748BB]" : "text-white"} />,
    x: 26,
    y: 90,
    lineStartX: 26,
    lineStartY: 82,
    centerTargetX: 42,
    centerTargetY: 58,
  },
  // 7: Lower Left (AI Design Workflow)
  {
    id: "ai-workflow",
    title: "AI Design Workflow",
    icon: (active) => <Cpu size={20} className={active ? "text-[#1748BB]" : "text-white"} />,
    x: 10,
    y: 64,
    lineStartX: 17,
    lineStartY: 64,
    centerTargetX: 37,
    centerTargetY: 53,
  },
  // 8: Mid-Upper Left (Logo)
  {
    id: "logo",
    title: "Logo",
    icon: (active) => <PenTool size={20} className={active ? "text-[#1748BB]" : "text-white"} />,
    x: 10,
    y: 36,
    lineStartX: 17,
    lineStartY: 38,
    centerTargetX: 37,
    centerTargetY: 47,
  },
];

interface ProgramSyllabusMapSectionProps {
  title?: string;
  subtitle?: string;
}

export default function ProgramSyllabusMapSection({
  title = "Why we are different from others",
  subtitle = "Learn directly from our mentors and engage 24/7 within the community",
}: ProgramSyllabusMapSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Clockwise rotating loop every 1.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % CLOCKWISE_NODES.length);
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-10 sm:py-20 md:py-28 bg-[#FBFDFF] relative overflow-hidden border-b border-neutral-100 select-none">
      {/* Soft Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#1748BB]/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12">
          <FadeUp delay={0}>
            <h2
              className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-3"
              style={{ fontSize: "clamp(30px, 4.2vw, 52px)" }}
            >
              {title}
            </h2>
          </FadeUp>

          <FadeUp delay={0.05}>
            <p className="font-sans text-neutral-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
              {subtitle}
            </p>
          </FadeUp>
        </div>

        {/* ── Connected Interactive Radial Mind-Map ── */}
        <FadeUp delay={0.1}>
          <div className="max-w-4xl mx-auto relative p-2 sm:p-6">
            
            {/* Desktop Radial Layout with Rotating Glowing Connection Lines */}
            <div className="hidden md:block relative h-[560px] w-full">
              
              {/* SVG Connecting Branch Lines with Dynamic Active Glow */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden
              >
                {CLOCKWISE_NODES.map((node, i) => {
                  const isActive = i === activeIdx;

                  return (
                    <line
                      key={node.id}
                      x1={`${node.lineStartX}%`}
                      y1={`${node.lineStartY}%`}
                      x2={`${node.centerTargetX}%`}
                      y2={`${node.centerTargetY}%`}
                      stroke={isActive ? "#1748BB" : "#CBD5E1"}
                      strokeWidth={isActive ? 3 : 1.5}
                      strokeDasharray={isActive ? "none" : "none"}
                      className="transition-all duration-500"
                    />
                  );
                })}
              </svg>

              {/* Center "Syllabus" Box */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-56 h-36 rounded-[24px] bg-white border-2 border-dashed border-[#1748BB] shadow-[0_16px_45px_rgba(23,72,187,0.12)] flex items-center justify-center p-6 text-center transition-all duration-300">
                  <span
                    className="font-serif text-3xl sm:text-4xl font-bold tracking-wide"
                    style={{ color: "#1748BB" }}
                  >
                    Syllabus
                  </span>
                </div>
              </div>

              {/* 9 Clockwise Animated Surrounding Nodes */}
              {CLOCKWISE_NODES.map((node, i) => {
                const isActive = i === activeIdx;

                return (
                  <div
                    key={node.id}
                    style={{
                      position: "absolute",
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      transform: "translate(-50%, -50%)",
                      zIndex: isActive ? 30 : 20,
                    }}
                    onMouseEnter={() => setActiveIdx(i)}
                  >
                    <div
                      className={`w-36 sm:w-40 p-3 sm:p-3.5 rounded-[20px] transition-all duration-500 text-center flex flex-col items-center justify-center gap-2 cursor-pointer ${
                        isActive
                          ? "bg-[#1748BB] text-white border-2 border-[#1748BB] scale-110 shadow-[0_16px_40px_rgba(23,72,187,0.35)] ring-4 ring-[#1748BB]/15"
                          : "bg-white text-[#1E2026] border-2 border-[#1748BB]/30 hover:border-[#1748BB] shadow-[0_8px_25px_rgba(23,72,187,0.08)] hover:scale-105"
                      }`}
                    >
                      {/* Icon Container */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 shadow-sm ${
                          isActive
                            ? "bg-white text-[#1748BB]"
                            : "bg-[#1748BB] text-white"
                        }`}
                      >
                        {node.icon(isActive)}
                      </div>

                      {/* Title */}
                      <span
                        className={`font-display font-semibold text-xs sm:text-sm leading-tight transition-colors duration-300 ${
                          isActive ? "text-white" : "text-[#1E2026]"
                        }`}
                      >
                        {node.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile / Tablet Friendly Grid Layout with Rotating Active Highlight */}
            <div className="block md:hidden space-y-6">
              {/* Center Badge on Mobile */}
              <div className="w-full max-w-xs mx-auto py-4.5 rounded-[22px] bg-white border-2 border-dashed border-[#1748BB] shadow-md text-center">
                <span className="font-serif text-3xl font-bold" style={{ color: "#1748BB" }}>
                  Syllabus
                </span>
              </div>

              {/* Mobile 2/3 Column Grid with Sequential Loop Highlighting */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {CLOCKWISE_NODES.map((item, idx) => {
                  const isActive = idx === activeIdx;

                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveIdx(idx)}
                      className={`p-3.5 rounded-[18px] text-center shadow-sm flex flex-col items-center justify-center gap-2 transition-all duration-400 cursor-pointer ${
                        isActive
                          ? "bg-[#1748BB] text-white border-2 border-[#1748BB] scale-105 shadow-lg"
                          : "bg-white text-[#1E2026] border-2 border-[#1748BB]/30"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                          isActive ? "bg-white text-[#1748BB]" : "bg-[#1748BB] text-white"
                        }`}
                      >
                        {item.icon(isActive)}
                      </div>
                      <span
                        className={`font-display font-semibold text-xs leading-tight ${
                          isActive ? "text-white" : "text-[#1E2026]"
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
