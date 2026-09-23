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
import { CMSSectionMeta } from "@/lib/cms";

const DEFAULT_STEPS = [
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

interface LearnCreateGrowSectionProps {
  meta?: CMSSectionMeta;
}

export default function LearnCreateGrowSection({ meta }: LearnCreateGrowSectionProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef<number>(0);

  const steps = [
    {
      id: "learn",
      number: "01",
      keyword: meta?.step_1_keyword || DEFAULT_STEPS[0].keyword,
      headline: meta?.step_1_title || DEFAULT_STEPS[0].headline,
      bluePrefix: "Acquire Skills",
      body: meta?.step_1_body || DEFAULT_STEPS[0].body,
      tagline: DEFAULT_STEPS[0].tagline,
      chips: DEFAULT_STEPS[0].chips,
    },
    {
      id: "practice",
      number: "02",
      keyword: meta?.step_2_keyword || DEFAULT_STEPS[1].keyword,
      headline: meta?.step_2_title || DEFAULT_STEPS[1].headline,
      bluePrefix: "Real Briefs",
      body: meta?.step_2_body || DEFAULT_STEPS[1].body,
      tagline: DEFAULT_STEPS[1].tagline,
      chips: DEFAULT_STEPS[1].chips,
    },
    {
      id: "create",
      number: "03",
      keyword: meta?.step_3_keyword || DEFAULT_STEPS[2].keyword,
      headline: meta?.step_3_title || DEFAULT_STEPS[2].headline,
      bluePrefix: "Portfolio",
      body: meta?.step_3_body || DEFAULT_STEPS[2].body,
      tagline: DEFAULT_STEPS[2].tagline,
      chips: DEFAULT_STEPS[2].chips,
    },
    {
      id: "grow",
      number: "04",
      keyword: meta?.step_4_keyword || DEFAULT_STEPS[3].keyword,
      headline: meta?.step_4_title || DEFAULT_STEPS[3].headline,
      bluePrefix: "Launch Your",
      body: meta?.step_4_body || DEFAULT_STEPS[3].body,
      tagline: DEFAULT_STEPS[3].tagline,
      chips: DEFAULT_STEPS[3].chips,
    },
  ];

  // GSAP ScrollTrigger Desktop & Mobile Pinning with Step Sync
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!pinContainerRef.current) return;

    const isMobile = window.innerWidth < 1024;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: pinContainerRef.current,
        start: isMobile ? "top top+=65px" : "top top+=75px",
        end: isMobile ? "+=180%" : "+=220%",
        pin: pinContainerRef.current,
        pinSpacing: true,
        scrub: isMobile ? 0.1 : 0.5,
        anticipatePin: isMobile ? 0 : 1,
        fastScrollEnd: true,
        preventOverlaps: true,
        onUpdate: (self) => {
          const progress = self.progress;
          let nextIndex = 0;
          if (progress < 0.25) {
            nextIndex = 0;
          } else if (progress < 0.5) {
            nextIndex = 1;
          } else if (progress < 0.75) {
            nextIndex = 2;
          } else {
            nextIndex = 3;
          }

          if (activeIndexRef.current !== nextIndex) {
            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);
          }
        },
      });
      scrollTriggerRef.current = st;
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleTabClick = (index: number) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
    if (scrollTriggerRef.current) {
      const targetProgress = (index + 0.1) / steps.length;
      const scrollPos =
        scrollTriggerRef.current.start +
        targetProgress * (scrollTriggerRef.current.end - scrollTriggerRef.current.start);
      window.scrollTo({ top: scrollPos, behavior: "smooth" });
    }
  };

  const step = steps[activeIndex] || steps[0];

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-[#1E2026] overflow-hidden"
    >
      <div
        ref={pinContainerRef}
        className="w-full min-h-screen flex flex-col justify-center items-center py-12 sm:py-20 relative overflow-hidden"
        style={{ willChange: "transform" }}
      >
        {/* Faint watermark background word of current active step */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={step.keyword}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 0.85, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.25 }}
              className="font-display font-black tracking-tighter uppercase select-none opacity-70"
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
          
          {/* Top Step Navigation Tabs */}
          <div className="grid grid-cols-4 gap-1.5 sm:flex sm:items-center sm:justify-center sm:gap-3.5 mb-7 sm:mb-12 max-w-xl mx-auto w-full px-1">
            {steps.map((s, i) => {
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

          {/* Content Card Layout */}
          <div className="max-w-4xl mx-auto text-center space-y-5 sm:space-y-7 px-2">
            
            {/* Step Tag */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`label-${activeIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center gap-2.5 sm:gap-3"
              >
                <div className="w-6 sm:w-8 h-[2px] bg-[#1748BB]/40" />
                <span className="font-sans text-[11px] sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] text-[#1748BB] uppercase font-bold">
                  {meta?.badge || `Step ${step.number} — ${step.keyword}`}
                </span>
                <div className="w-6 sm:w-8 h-[2px] bg-[#1748BB]/40" />
              </motion.div>
            </AnimatePresence>

            {/* Step Headline */}
            <AnimatePresence mode="wait">
              <motion.h2
                key={`headline-${activeIndex}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="font-display font-black text-[#1E2026] tracking-tight leading-[1.06] sm:leading-[1.04]"
                style={{ fontSize: "clamp(26px, 4.2vw, 56px)" }}
              >
                {step.headline}
              </motion.h2>
            </AnimatePresence>

            {/* Tagline / Subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`tagline-${activeIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="font-sans text-sm sm:text-base md:text-lg font-semibold text-[#1748BB] max-w-xl mx-auto flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 shrink-0 text-[#1748BB]" />
                <span>{step.tagline}</span>
                <Sparkles className="w-4 h-4 shrink-0 text-[#1748BB]" />
              </motion.p>
            </AnimatePresence>

            {/* Main Body */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`body-${activeIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="font-sans text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto font-normal"
              >
                {step.body}
              </motion.p>
            </AnimatePresence>

            {/* Pill Value Chips */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`chips-${activeIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2 sm:pt-4"
              >
                {step.chips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#F0F5FF] border border-blue-100 text-[#1748BB] font-sans font-semibold text-xs sm:text-sm shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1748BB] shrink-0" />
                    <span>{chip}</span>
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Bottom Progress Bar & Step Counter */}
            <div className="pt-4 sm:pt-6 flex flex-col items-center gap-2 sm:gap-3">
              <div className="w-36 sm:w-48 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#1748BB] rounded-full"
                  initial={false}
                  animate={{ width: `${((activeIndex + 1) / DEFAULT_STEPS.length) * 100}%` }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </div>
              <span className="font-mono text-[11px] sm:text-xs text-neutral-400 font-medium">
                0{activeIndex + 1} / 0{DEFAULT_STEPS.length}
              </span>
            </div>

          </div>
        </Container>
      </div>
    </section>
  );
}
