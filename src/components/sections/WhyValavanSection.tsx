"use client";

/**
 * Why Valavan Academy
 * Editorial panel layout with benefits — practical skills focus
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";

const BENEFITS = [
  {
    id: "practical",
    number: "01",
    title: "Practical Learning",
    description:
      "Every lesson is built around doing, not just watching. You apply what you learn in real project scenarios immediately.",
    icon: "⚡",
  },
  {
    id: "mentor",
    number: "02",
    title: "Mentor Guidance",
    description:
      "Learn directly from practitioners who've built brands, designed campaigns, and created for real clients — in Tamil.",
    icon: "🎯",
  },
  {
    id: "projects",
    number: "03",
    title: "Real Projects",
    description:
      "Work on briefs that mirror actual industry work. Build a portfolio of 10+ real projects before you finish the course.",
    icon: "🗂️",
  },
  {
    id: "career",
    number: "04",
    title: "Career-Focused Skills",
    description:
      "We teach only what the industry demands today — Photoshop, Figma, Premiere Pro, AI tools, and more.",
    icon: "🚀",
  },
];

function BenefitCard({
  benefit,
  index,
}: {
  benefit: (typeof BENEFITS)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group relative border-t border-neutral-200 pt-8 pb-10 hover:border-[#1748BB] transition-colors duration-300"
    >
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <span className="font-sans text-xs text-neutral-400 font-medium tracking-widest">
            {benefit.number}
          </span>
        </div>
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-3">
            <span className="text-2xl" role="img" aria-hidden>
              {benefit.icon}
            </span>
            <h3 className="font-sans font-semibold text-[#1E2026] text-lg tracking-tight">
              {benefit.title}
            </h3>
          </div>
          <p className="font-sans text-neutral-600 text-base leading-relaxed font-normal">
            {benefit.description}
          </p>
        </div>
        {/* Hover accent line */}
        <div className="w-0 group-hover:w-8 h-[2px] bg-[#1748BB] mt-3 transition-all duration-500 flex-shrink-0" />
      </div>
    </motion.div>
  );
}

export default function WhyValavanSection() {
  return (
    <section className="bg-white py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left — Section identity */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-8">
            <FadeUp delay={0}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-[#1748BB]" />
                <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1748BB] font-semibold">
                  Why Valavan
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h2
                className="font-display font-bold text-[#1E2026] leading-tight"
                style={{ fontSize: "clamp(36px, 4.5vw, 60px)" }}
              >
                Learn Skills That{" "}
                <span className="text-[#1748BB]">Move You Forward.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="font-sans text-neutral-600 text-base sm:text-lg leading-relaxed font-normal">
                Valavan Academy was built with one purpose — to give Tamil
                learners access to the same practical creative skills that power
                careers and businesses worldwide.
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <a
                href="/programs"
                className="inline-flex items-center gap-2 font-sans font-semibold text-sm text-[#1748BB] hover:text-[#0A3CA8] transition-colors group"
              >
                Explore All Programs
                <span className="transition-transform group-hover:translate-x-1 inline-block">
                  →
                </span>
              </a>
            </FadeUp>

            {/* Large decorative letter */}
            <div
              className="hidden lg:block font-display font-bold text-[#F0F6FF] select-none pointer-events-none mt-8"
              style={{ fontSize: "clamp(80px, 12vw, 180px)", lineHeight: 1 }}
              aria-hidden
            >
              V
            </div>
          </div>

          {/* Right — Benefits list */}
          <div className="lg:col-span-7 space-y-0">
            {BENEFITS.map((benefit, i) => (
              <BenefitCard key={benefit.id} benefit={benefit} index={i} />
            ))}

            {/* Bottom CTA bar */}
            <div className="border-t border-neutral-200 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="font-sans font-semibold text-[#1E2026] text-base">
                  Ready to start learning?
                </p>
                <p className="font-sans text-neutral-500 text-sm font-normal">
                  Join thousands of Tamil creators already growing with us.
                </p>
              </div>
              <a
                href="/programs"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-[#1748BB] hover:bg-[#0A3CA8] text-white font-sans font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 hover:scale-105"
              >
                View Programs
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
