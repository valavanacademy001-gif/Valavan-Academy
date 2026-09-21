"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ProgramStickyBottomCTAProps {
  enrollUrl?: string;
  text?: string;
  buttonText?: string;
}

export default function ProgramStickyBottomCTA({
  enrollUrl = "https://learn.valavanacademy.com/clientapp/signup",
  text = "Limited Seats Available",
  buttonText = "ENROLL NOW",
}: ProgramStickyBottomCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA once scrolled past 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-[#1748BB] text-white py-2.5 sm:py-3 px-3.5 sm:px-8 border-t border-white/20 shadow-[0_-8px_30px_rgba(0,0,0,0.25)] select-none"
          style={{
            paddingBottom: "max(0.625rem, calc(0.5rem + env(safe-area-inset-bottom, 0px)))",
          }}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-2.5 sm:gap-4 w-full">
            
            {/* Left Notice Text with pulsing dot */}
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse shrink-0 shadow-[0_0_8px_#10B981]" />
              <p
                className="font-display font-semibold text-xs sm:text-sm tracking-normal sm:tracking-wide text-white truncate"
                style={{ color: "#FFFFFF" }}
              >
                {text}
              </p>
            </div>

            {/* Right Action Button */}
            <div className="shrink-0">
              <a
                href={enrollUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: "#FFFFFF", color: "#1748BB" }}
                className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-[#F0F5FF] !text-[#1748BB] font-sans font-bold text-xs px-4 sm:px-6 py-1.5 sm:py-2 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 shadow-md whitespace-nowrap"
              >
                <span style={{ color: "#1748BB" }} className="!text-[#1748BB] font-bold tracking-wider uppercase text-[11px] sm:text-xs">
                  {buttonText}
                </span>
                <ArrowRight size={13} style={{ color: "#1748BB" }} className="!text-[#1748BB] shrink-0" />
              </a>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
