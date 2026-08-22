"use client";

/**
 * LEARN → PRACTICE → CREATE → GROW
 * Scroll-driven center-aligned interactive process journey.
 * As the user scrolls down, steps 01 to 04 transition one by one.
 * Pinned cleanly with GSAP ScrollTrigger, unpins smoothly after step 04.
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";

const STEPS = [
  {
    id: "learn",
    number: "01",
    keyword: "LEARN",
    headline: "Acquire Skills That Matter",
    bluePrefix: "Acquire Skills",
    body:
      "Start from zero. Our Tamil-language curriculum breaks down Graphic Design, Video Editing, Web Design, UI/UX, and AI tools into clear, practical lessons — no jargon, no fluff.",
    tagline: "Structured. Practical. In Tamil.",
    chips: ["Zero to Pro Curriculum", "100% Practical in Tamil", "Industry Tools Mastered"],
  },
  {
    id: "practice",
    number: "02",
    keyword: "PRACTICE",
    headline: "Build With Real Briefs",
    bluePrefix: "Real Briefs",
    body:
      "Learning only clicks when you create. Every module comes with real-world project briefs, commercial design challenges, and hands-on exercises guided by experienced mentors.",
    tagline: "Real Projects. Real Feedback.",
    chips: ["Real Client Briefs", "Live Mentor Feedback", "Daily Hands-on Tasks"],
  },
  {
    id: "create",
    number: "03",
    keyword: "CREATE",
    headline: "Build Your Portfolio",
    bluePrefix: "Portfolio",
    body:
      "Walk away with a professional portfolio of projects. Show potential clients and employers actual work — not theory. Your skills become visible, tangible, and high-converting.",
    tagline: "Your Work. Your Identity.",
    chips: ["Commercial Portfolio", "Case Study Walkthroughs", "Proof of Work"],
  },
  {
    id: "grow",
    number: "04",
    keyword: "GROW",
    headline: "Launch Your Career or Business",
    bluePrefix: "Launch Your",
    body:
      "Freelance, get hired, or build your own brand. With in-demand digital skills, a portfolio, and community support, you have everything you need to grow on your own terms.",
    tagline: "Career Ready. Community Backed.",
    chips: ["Freelance Client Acquisition", "Placement Assistance", "Lifelong Community"],
  },
];

export default function LearnCreateGrowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // GSAP ScrollTrigger Desktop & Mobile Pinning with Step Sync
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!pinContainerRef.current) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: pinContainerRef.current,
        start: "top top+=75px",
        end: "+=220%",
        pin: pinContainerRef.current,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress < 0.25) {
            setActiveIndex(0);
          } else if (progress < 0.5) {
            setActiveIndex(1);
          } else if (progress < 0.75) {
            setActiveIndex(2);
          } else {
            setActiveIndex(3);
          }
        },
      });
      scrollTriggerRef.current = st;
    }, sectionRef);

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill(true);
      }
      ctx.revert();
    };
  }, []);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    const st = scrollTriggerRef.current;
    if (st && pinContainerRef.current) {
      const scrollPos = st.start + (index / (STEPS.length - 1)) * (st.end - st.start);
      window.scrollTo({ top: scrollPos, behavior: "smooth" });
    }
  };

  const step = STEPS[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="learn-practice-create-grow"
      className="bg-white text-[#1E2026] relative overflow-x-clip border-t border-neutral-100"
    >
      <div
        ref={pinContainerRef}
        className="w-full py-8 sm:py-20 min-h-[70vh] sm:min-h-[85vh] flex flex-col justify-center relative"
      >
      {/* Large subtle background watermark text (#EFF4FF) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={step.keyword}
            initial={{ opacity: 0, scale: 0.90 }}
            animate={{ opacity: 0.50, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="font-display font-black leading-none tracking-tight select-none"
            style={{
              fontSize: "clamp(120px, 25vw, 340px)",
              color: "#EFF4FF",
            }}
          >
            {step.keyword}
          </motion.span>
        </AnimatePresence>
      </div>

      <Container className="relative z-10 w-full">
        
        {/* Top Step Navigation Tabs — 4 Tabs fit cleanly on Mobile */}
        <div className="grid grid-cols-4 gap-1.5 sm:flex sm:items-center sm:justify-center sm:gap-3.5 mb-7 sm:mb-12 max-w-xl mx-auto w-full px-1">
          {STEPS.map((s, i) => {
            const isCur = i === activeIndex;
            return (
              <button
                key={s.id}
                onClick={() => handleTabClick(i)}
                className={`flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 px-1.5 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full font-sans font-bold transition-all duration-300 cursor-pointer ${
                  isCur
                    ? "bg-[#1748BB] text-white shadow-[0_4px_16px_rgba(23,72,187,0.35)] scale-102 sm:scale-105"
                    : "bg-[#F5F8FF] text-neutral-500 hover:text-[#1748BB] hover:bg-[#EBF2FF]"
                }`}
              >
                <span
                  className={`text-[10px] sm:text-xs font-mono font-bold ${
                    isCur ? "text-blue-200" : "text-neutral-400"
                  }`}
                >
                  {s.number}
                </span>
                <span className="text-[11px] sm:text-xs tracking-tight sm:tracking-wide">
                  {s.keyword}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Card Layout — Center Aligned & Prominent */}
        <div className="max-w-4xl mx-auto text-center space-y-5 sm:space-y-7 px-2">
          
          {/* Step Tag */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`label-${activeIndex}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-2.5 sm:gap-3"
            >
              <div className="w-6 sm:w-8 h-[2px] bg-[#1748BB]/40" />
              <span className="font-sans text-[11px] sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] text-[#1748BB] uppercase font-bold">
                Step {step.number} — {step.keyword}
              </span>
              <div className="w-6 sm:w-8 h-[2px] bg-[#1748BB]/40" />
            </motion.div>
          </AnimatePresence>

          {/* Main Large Headline */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={`headline-${activeIndex}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="font-display font-bold leading-[1.04] sm:leading-[0.98] tracking-tight text-[#1E2026]"
              style={{ fontSize: "clamp(26px, 4.8vw, 62px)" }}
            >
              {(() => {
                const { headline, bluePrefix } = step;
                if (bluePrefix && headline.includes(bluePrefix)) {
                  const idx = headline.indexOf(bluePrefix);
                  const before = headline.slice(0, idx);
                  const after = headline.slice(idx + bluePrefix.length);
                  return (
                    <>
                      {before && <span className="text-[#1E2026]">{before}</span>}
                      <span className="text-[#1748BB]">{bluePrefix}</span>
                      {after && <span className="text-[#1E2026]">{after}</span>}
                    </>
                  );
                }
                return <span className="text-[#1E2026]">{headline}</span>;
              })()}
            </motion.h2>
          </AnimatePresence>

          {/* Large Body Text */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`body-${activeIndex}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3, delay: 0.08 }}
              className="font-sans text-neutral-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-normal"
            >
              {step.body}
            </motion.p>
          </AnimatePresence>

          {/* Feature Highlights Row */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`chips-${activeIndex}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3, delay: 0.12 }}
              className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-1"
            >
              {step.chips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F5F8FF] border border-[#D7E3FF] text-xs sm:text-sm font-semibold text-[#1748BB]"
                >
                  <CheckCircle2 size={14} className="text-[#1748BB]" />
                  {chip}
                </span>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Tagline Pill */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`tag-${activeIndex}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, delay: 0.16 }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#EFF4FF] border border-[#BFDBFE] text-xs sm:text-sm font-semibold text-[#1748BB]"
            >
              <Sparkles size={14} className="text-[#1748BB]" />
              <span>{step.tagline}</span>
            </motion.div>
          </AnimatePresence>

        </div>

      </Container>
      </div>
    </section>
  );
}
