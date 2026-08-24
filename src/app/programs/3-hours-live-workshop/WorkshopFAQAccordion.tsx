"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Is this workshop suitable for complete beginners?",
    a: "Yes, absolutely! This workshop is specially designed for complete beginners with zero prior design experience. We start right from the core fundamentals in simple, practical Tamil.",
  },
  {
    q: "Do I need any design experience?",
    a: "No prior design experience is needed. We will walk you through color principles, typography, layout rules, and tools step-by-step.",
  },
  {
    q: "Do I need Photoshop installed before attending?",
    a: "It is not mandatory to have Photoshop installed during the live session. You can watch the live demonstration, take notes, and practice with the resources provided after the masterclass.",
  },
  {
    q: "Is the workshop conducted in Tamil?",
    a: "Yes, 100% in pure, simple, and practical Tamil so that everyone can follow along comfortably.",
  },
  {
    q: "Will I receive the workshop recording and bonuses?",
    a: "Yes! All registered participants will receive access to the Graphic Design Resource Vault (Worth ₹2,499) and the official Certificate of Participation after the live session.",
  },
];

export default function WorkshopFAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={faq.q}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? "bg-[#F8FAFF] border-[#1748BB]/40 shadow-sm"
                : "bg-white border-neutral-200/80 hover:border-neutral-300"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="font-display font-semibold text-base sm:text-lg text-[#1E2026]">
                {faq.q}
              </span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                  isOpen
                    ? "bg-[#1748BB] text-white rotate-180"
                    : "bg-neutral-100 text-neutral-500"
                }`}
              >
                <ChevronDown size={18} />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-600 font-sans leading-relaxed border-t border-neutral-100">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
