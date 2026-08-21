"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Container from "@/components/ui/Container";

export interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
  tag: string;
}

const DEFAULT_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "2016",
    title: "The Creative Spark",
    desc: "After completing schooling in Tirupattur district, moved to Chennai in 2016. Discovered a deep passion for digital arts, typography, and graphic design.",
    tag: "Origins",
  },
  {
    year: "2020",
    title: "Literary & Creative Foundation",
    desc: "Completed B.A. and M.A. in Tamil Literature in Chennai, combining the power of Tamil communication with modern digital creative storytelling.",
    tag: "Foundation",
  },
  {
    year: "2021",
    title: "Birth of Tamil Nadu Creators Club (TNCC)",
    desc: "Launched a dedicated creator initiative which evolved into TNCC — building a vibrant community of passionate Tamil designers and creators.",
    tag: "Community",
  },
  {
    year: "2023",
    title: "Valavan Tutorials & Online Training",
    desc: "Launched YouTube design tutorials in Tamil reaching hundreds of thousands of views, followed by structured online coaching batches.",
    tag: "Education",
  },
  {
    year: "2024 — Present",
    title: "Valavan Academy Established",
    desc: "Officially founded Valavan Academy. Trained 5,000+ students with 100% practical, project-driven mentorship and established TNCC with 40,000+ members.",
    tag: "Milestone",
  },
];

interface TimelineSectionProps {
  events?: TimelineEvent[];
}

export default function TimelineSection({ events = DEFAULT_TIMELINE_EVENTS }: TimelineSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the timeline section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 75%"],
  });

  // Smooth out the beam progress with a spring
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Glowing light head percentage
  const beamTopPercentage = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  return (
    <section id="milestones" className="py-20 sm:py-28 bg-[#F8FAFF] border-t border-[#E8EFFE] relative overflow-hidden scroll-mt-24">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-[2px] bg-[#1748BB] opacity-40" />
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1748BB] font-bold">
              Our Milestones
            </span>
            <div className="w-8 h-[2px] bg-[#1748BB] opacity-40" />
          </div>

          <h2
            className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
          >
            The Journey of <span className="text-[#1748BB]">Valavan Academy.</span>
          </h2>
          <p className="font-sans text-neutral-600 text-sm sm:text-base max-w-xl mx-auto">
            A decade of passion, persistence, and continuous evolution in Tamil digital education.
          </p>
        </div>

        {/* Timeline Interactive Container */}
        <div ref={containerRef} className="max-w-5xl mx-auto relative px-2 sm:px-4">
          
          {/* ── Center Background Static Track ── */}
          <div className="absolute left-6 md:left-1/2 top-6 bottom-6 w-[2px] -translate-x-1/2 bg-[#E2E8F0] rounded-full" />

          {/* ── Center Subtle Glowing Light Beam on Scroll ── */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-6 md:left-1/2 top-6 bottom-6 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#1748BB] via-[#2563EB] to-[#60A5FA] rounded-full shadow-[0_0_8px_rgba(37,99,235,0.45)] z-0"
          />

          {/* ── Subtle Glowing Light Head travelling down the center track ── */}
          <motion.div
            style={{ top: beamTopPercentage }}
            className="absolute left-6 md:left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-[#1748BB] shadow-[0_0_10px_rgba(23,72,187,0.5)] z-20 pointer-events-none"
          />

          {/* ── Timeline Events Stack ── */}
          <div className="space-y-10 sm:space-y-16 relative z-10">
            {events.map((event, index) => {
              // Even index (0, 2, 4): Right side on Desktop
              // Odd index (1, 3): Left side on Desktop
              const isRightSide = index % 2 === 0;

              return (
                <div
                  key={event.year}
                  className="relative grid grid-cols-1 md:grid-cols-2 items-center"
                >
                  {/* ── Left Column (Desktop) ── */}
                  <div className="hidden md:block md:pr-12">
                    {!isRightSide && (
                      <motion.div
                        initial={{ opacity: 0, x: -70 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <TimelineCard event={event} />
                      </motion.div>
                    )}
                  </div>

                  {/* ── Center Node ── */}
                  <div className="absolute left-6 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <motion.div
                      initial={{ scale: 0.85, opacity: 0.7 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: false, amount: 0.4 }}
                      transition={{ duration: 0.35 }}
                      className="w-9 h-9 rounded-full bg-white border-[3px] border-[#1748BB] shadow-[0_2px_12px_rgba(23,72,187,0.2)] flex items-center justify-center group cursor-default transition-all duration-300 hover:scale-105 hover:border-[#2563EB]"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-[#1748BB] group-hover:bg-[#2563EB] transition-colors" />
                    </motion.div>
                  </div>

                  {/* ── Right Column (Desktop) & Mobile for all ── */}
                  <div className="pl-14 md:pl-12">
                    {/* On desktop: show only if isRightSide. On mobile: show for both! */}
                    <div className={!isRightSide ? "md:hidden" : ""}>
                      <motion.div
                        initial={{ opacity: 0, x: 70 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <TimelineCard event={event} />
                      </motion.div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
}

function TimelineCard({ event }: { event: TimelineEvent }) {
  return (
    <div className="p-6 sm:p-8 rounded-[24px] border border-neutral-200/90 bg-white hover:border-[#1748BB]/50 hover:shadow-[0_16px_40px_rgba(23,72,187,0.12)] hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-3.5">
        <span className="font-display font-black text-2xl sm:text-3xl text-[#1748BB] group-hover:text-[#0A3CA8] transition-colors">
          {event.year}
        </span>
        <span className="font-sans text-[11px] font-bold px-3 py-1 rounded-full bg-[#EBF2FE] text-[#1748BB] uppercase tracking-wider border border-[#BFDBFE]/60">
          {event.tag}
        </span>
      </div>

      <h3 className="font-display font-bold text-lg sm:text-xl text-[#1E2026] mb-2 group-hover:text-[#1748BB] transition-colors">
        {event.title}
      </h3>

      <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
        {event.desc}
      </p>
    </div>
  );
}
