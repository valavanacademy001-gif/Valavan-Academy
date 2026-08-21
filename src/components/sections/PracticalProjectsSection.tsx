"use client";

import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";

export interface ProjectCardItem {
  imageSrc: string;
  title: string;
  description: string;
}

interface PracticalProjectsSectionProps {
  title?: string;
  subtitle?: string;
  projects?: ProjectCardItem[];
}

const DEFAULT_GRAPHIC_DESIGN_PROJECTS: ProjectCardItem[] = [
  {
    imageSrc: "/assets/programs/graphic-design/ChatGPT-Image-Aug-8-2026-12_01_46-PM-1.webp",
    title: "Logo Design Projects",
    description: "Learn high-converting commercial design.",
  },
  {
    imageSrc: "/assets/programs/graphic-design/ChatGPT-Image-Aug-8-2026-12_03_27-PM-1.webp",
    title: "Social Media Campaign Designs",
    description: "Create engaging content for modern businesses.",
  },
  {
    imageSrc: "/assets/programs/graphic-design/ChatGPT-Image-Aug-8-2026-12_08_42-PM-1.webp",
    title: "Packaging & Label Design Projects",
    description: "Design products ready for the real market.",
  },
  {
    imageSrc: "/assets/programs/graphic-design/ChatGPT-Image-Aug-8-2026-12_12_16-PM-1.webp",
    title: "Advertising Creatives",
    description: "Learn high-converting commercial design.",
  },
  {
    imageSrc: "/assets/programs/graphic-design/ChatGPT-Image-Aug-8-2026-12_13_25-PM-1.webp",
    title: "Thumbnail Design Projects",
    description: "Create attention-grabbing YouTube thumbnails.",
  },
  {
    imageSrc: "/assets/programs/graphic-design/ChatGPT-Image-Aug-8-2026-12_14_47-PM-1.webp",
    title: "Portfolio Development Projects",
    description: "Build a portfolio that attracts opportunities.",
  },
];

export default function PracticalProjectsSection({
  title,
  subtitle = "Learn by doing. Work on real projects that help you build confidence, portfolio and industry-ready skills.",
  projects = DEFAULT_GRAPHIC_DESIGN_PROJECTS,
}: PracticalProjectsSectionProps) {
  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden border-b border-neutral-100">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <FadeUp delay={0}>
            <h2
              className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(30px, 4vw, 50px)" }}
            >
              Build Real-World Design Skills Through{" "}
              <span style={{ color: "#1748BB" }} className="!text-[#1748BB]">
                Practical Projects
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.05}>
            <p className="font-sans text-neutral-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </FadeUp>
        </div>

        {/* 3-Column Blue Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <FadeUp key={project.title} delay={index * 0.08}>
              <div className="h-full rounded-[24px] sm:rounded-[28px] bg-[#1748BB] text-white p-3.5 sm:p-4 border-2 border-white/20 shadow-[0_16px_45px_rgba(23,72,187,0.22)] hover:scale-[1.02] hover:shadow-[0_24px_60px_rgba(23,72,187,0.36)] transition-all duration-300 group flex flex-col justify-between overflow-hidden">
                <div>
                  {/* Project Image Container */}
                  <div className="relative aspect-[16/10] w-full rounded-[18px] overflow-hidden bg-black/30 mb-4 border border-white/15">
                    <Image
                      src={project.imageSrc}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Title & Description in Solid Bright White */}
                  <div className="px-2.5 pb-2">
                    <h3
                      className="font-display font-semibold text-lg sm:text-xl mb-2 leading-snug tracking-normal"
                      style={{ color: "#FFFFFF" }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="font-sans text-xs sm:text-sm leading-relaxed font-medium"
                      style={{ color: "#FFFFFF" }}
                    >
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
