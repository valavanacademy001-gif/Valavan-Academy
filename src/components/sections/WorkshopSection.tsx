"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";

export default function WorkshopSection() {
  return (
    <section id="workshop" className="pt-16 sm:pt-20 pb-12 sm:pb-16 bg-white relative">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <FadeUp delay={0}>
            <div className="flex items-center justify-center gap-3 mb-3.5">
              <div className="w-8 h-[2px] bg-[#1748BB]" />
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1748BB] font-semibold">
                Live Workshop
              </span>
              <div className="w-8 h-[2px] bg-[#1748BB]" />
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2
              className="font-display font-bold text-[#1E2026] leading-[1.04] sm:leading-[1.06] tracking-tight mb-3"
              style={{ fontSize: "clamp(30px, 4vw, 48px)" }}
            >
              3 Hours Live <span className="text-[#1748BB]">Workshop.</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="font-sans text-neutral-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Learn how to start and grow a profitable printing business using high-income graphic design skills.
            </p>
          </FadeUp>
        </div>

        {/* Centered Workshop Card */}
        <FadeUp delay={0.15}>
          <div className="max-w-xl mx-auto">
            <div className="group rounded-[28px] sm:rounded-[32px] bg-white border border-neutral-200/90 p-6 sm:p-7 shadow-[0_12px_36px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_55px_rgba(23,72,187,0.12)] hover:border-[#1748BB]/40 transition-all duration-400 flex flex-col items-center text-center">
              
              {/* Thumbnail Image */}
              <div className="relative aspect-[16/10] w-full rounded-[20px] sm:rounded-[22px] overflow-hidden bg-neutral-100 mb-6 shadow-sm">
                <Image
                  src="/assets/workshop/printing-business-workshop.webp"
                  alt="3 Hour Live Workshop on Starting Your Printing Business with Graphic Design Skill"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
                  sizes="(max-width: 768px) 100vw, 580px"
                  priority
                />
                
                {/* Live Badge */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="inline-flex items-center gap-1.5 bg-[#1748BB] text-white font-sans text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    <Sparkles size={12} className="text-white fill-white" />
                    Online Workshop
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-2xl sm:text-[26px] text-[#1E2026] tracking-tight leading-tight mb-5">
                3 Hours Live Workshop
              </h3>

              {/* CTA Button */}
              <a
                href="https://valavanacademy.in/workshop/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#FFFFFF" }}
                className="inline-flex items-center justify-center gap-2 bg-[#1748BB] hover:bg-[#0A3CA8] !text-white font-sans font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-[0_8px_24px_rgba(23,72,187,0.32)] hover:scale-105 transition-all group/btn"
              >
                <span style={{ color: "#FFFFFF" }} className="!text-white font-bold">
                  View Details
                </span>
                <ArrowRight
                  size={16}
                  style={{ color: "#FFFFFF" }}
                  className="!text-white group-hover/btn:translate-x-1.5 transition-transform"
                />
              </a>

            </div>
          </div>
        </FadeUp>

      </Container>
    </section>
  );
}
