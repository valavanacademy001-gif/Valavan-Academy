"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import { HelpCircle, Plus, Minus } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

const DEFAULT_GRAPHIC_DESIGN_FAQS: FAQItem[] = [
  {
    question: "Is this suitable for beginners?",
    answer: "Yes. The program starts from the fundamentals and gradually progresses to advanced concepts.",
  },
  {
    question: "How will I access the course?",
    answer: "You will receive access immediately after enrollment.",
  },
  {
    question: "Is this course in Tamil or English?",
    answer: "The training is designed for Tamil-speaking students with easy-to-follow explanations.",
  },
  {
    question: "Is there any time limit to complete the course?",
    answer: "No. You get lifetime access to the learning materials.",
  },
  {
    question: "Are projects included?",
    answer: "Yes. Multiple practical projects are included to help build real-world experience.",
  },
  {
    question: "Will I receive a certificate?",
    answer: "Yes. A certificate will be provided after successful completion.",
  },
];

interface ProgramFAQSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
}

export default function ProgramFAQSection({
  badge = "FAQ",
  title = "Your Questions, Answered",
  subtitle = "Have a question about our courses, career support, or community? We've gathered some of the most common questions to help you find the answers you need and get started with confidence",
  faqs = DEFAULT_GRAPHIC_DESIGN_FAQS,
}: ProgramFAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // Split FAQs into 2 columns for large screens (left: even index, right: odd index)
  const col1 = faqs.filter((_, i) => i % 2 === 0);
  const col2 = faqs.filter((_, i) => i % 2 !== 0);

  return (
    <section className="py-20 sm:py-28 bg-white relative z-20 overflow-hidden border-t border-neutral-100 select-none">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <FadeUp delay={0}>
            <div className="inline-flex items-center justify-center mb-4">
              <span className="inline-flex items-center gap-2 border border-[#1748BB]/30 text-[#1748BB] font-sans text-xs font-bold px-4 py-1.5 rounded-full bg-[#1748BB]/5 shadow-sm">
                <HelpCircle size={14} className="text-[#1748BB]" />
                {badge}
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2
              className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(30px, 4.2vw, 52px)" }}
            >
              Your Questions,{" "}
              <span style={{ color: "#1748BB" }} className="!text-[#1748BB]">
                Answered
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
              {subtitle}
            </p>
          </FadeUp>
        </div>

        {/* 2-Column Clean Accordion Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4 max-w-6xl mx-auto">
          {/* Column 1 */}
          <div className="space-y-4">
            {col1.map((faq, i) => {
              const actualIdx = i * 2;
              const isOpen = openIndex === actualIdx;

              return (
                <div
                  key={faq.question}
                  className="border-b border-neutral-200/90 pb-4 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(actualIdx)}
                    className="w-full flex items-center justify-between text-left py-2.5 group cursor-pointer"
                  >
                    <span className="font-display font-semibold text-base sm:text-lg text-[#1E2026] group-hover:text-[#1748BB] transition-colors pr-4">
                      {faq.question}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#1748BB] text-white flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-sm">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed pt-2 pb-1 font-medium">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            {col2.map((faq, i) => {
              const actualIdx = i * 2 + 1;
              const isOpen = openIndex === actualIdx;

              return (
                <div
                  key={faq.question}
                  className="border-b border-neutral-200/90 pb-4 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(actualIdx)}
                    className="w-full flex items-center justify-between text-left py-2.5 group cursor-pointer"
                  >
                    <span className="font-display font-semibold text-base sm:text-lg text-[#1E2026] group-hover:text-[#1748BB] transition-colors pr-4">
                      {faq.question}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#1748BB] text-white flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-sm">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed pt-2 pb-1 font-medium">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
