"use client";

/**
 * Community Section — Phase 8
 * YOU DON'T HAVE TO LEARN ALONE.
 * - Mobile: Sticky Stacking Deck Effect for stats cards
 * - Desktop: 2-column layout with pinned section
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import CountUp from "@/components/ui/CountUp";
import { EXTERNAL_URLS } from "@/data/site.config";

const COMMUNITY_STATS = [
  { target: 40, suffix: "K+", label: "Community Members" },
  { target: 100, suffix: "+", label: "Workshops Held" },
  { target: 5, suffix: "K+", label: "Students Trained" },
];

export default function CommunitySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      className="bg-[#1748BB] py-16 sm:py-20 lg:py-32 overflow-x-clip relative lg:sticky lg:top-0 z-10 lg:min-h-screen flex items-center justify-center"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "30px 30px",
        }}
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-[2px] bg-white/40" />
                <span className="font-sans text-xs tracking-[0.25em] uppercase text-white/70 font-semibold">
                  Community
                </span>
              </div>
              <h2
                className="font-display font-bold text-white leading-[1.15] sm:leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(28px, 4.8vw, 64px)" }}
              >
                You Don&apos;t Have
                <br />
                to Learn Alone.
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-sans text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-xl"
              style={{ color: "#BACFFF" }}
            >
              Join the Tamil Nadu Creators Club — a thriving community of
              designers, creators, and digital professionals learning, sharing,
              and growing together. Connect, collaborate, and create.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href={EXTERNAL_URLS.community}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-[#1748BB] font-sans font-bold text-sm sm:text-base px-7 py-3.5 rounded-full hover:bg-neutral-100 hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Join the Community
                <span>→</span>
              </a>
              <Link
                href="/programs"
                className="group inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#1748BB] font-sans font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full hover:scale-105 transition-all duration-200"
              >
                <ArrowUpRight size={18} className="text-white group-hover:text-[#1748BB] transition-colors" />
                <span className="text-white group-hover:text-[#1748BB] font-semibold transition-colors">
                  Explore Programs
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right — Stats Cards with Stacking Deck on Mobile & 2-Col Grid on Desktop */}
          <div className="lg:col-span-5 pt-4 lg:pt-0">
            <div className="flex flex-col lg:grid lg:grid-cols-1 lg:gap-5 pb-8 lg:pb-0">
              {COMMUNITY_STATS.map((stat, i) => {
                const topOffset = 85 + i * 14;
                const zIndex = 10 + i * 10;
                return (
                  <div
                    key={stat.label}
                    className="sticky lg:static mb-8 lg:mb-0"
                    style={{
                      top: `${topOffset}px`,
                      zIndex: zIndex,
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.1,
                      }}
                      className="rounded-[24px] p-6 sm:p-7 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.22)] border border-white flex items-center justify-between transition-all duration-300"
                    >
                      <div className="space-y-1">
                        <p
                          className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight leading-none"
                          style={{ color: "#1748BB" }}
                        >
                          <CountUp end={stat.target} suffix={stat.suffix} duration={1800} />
                        </p>
                        <p
                          className="font-sans text-sm sm:text-base font-semibold mt-1"
                          style={{ color: "#5E84C4" }}
                        >
                          {stat.label}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-[#EBF2FE] flex items-center justify-center text-[#1748BB] font-bold text-lg shadow-sm">
                        ✓
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
