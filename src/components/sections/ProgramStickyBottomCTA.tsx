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
      // Show sticky CTA once scrolled past 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-[#1748BB] text-white py-2 sm:py-2.5 px-4 sm:px-8 border-t border-white/20 shadow-[0_-8px_30px_rgba(0,0,0,0.22)] select-none"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            
            {/* Left/Center Text */}
            <div className="flex items-center gap-2 mx-auto sm:mx-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="font-display font-semibold text-xs sm:text-sm tracking-wide text-white" style={{ color: "#FFFFFF" }}>
                {text}
              </p>
            </div>

            {/* Right Action Button */}
            <div className="shrink-0">
              <a
                href={enrollUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#092B82] sm:bg-white hover:bg-[#071F60] sm:hover:bg-[#F0F5FF] !text-white sm:!text-[#1748BB] font-sans font-bold text-xs px-4.5 sm:px-6 py-1.5 sm:py-2 rounded-full border border-white/40 sm:border-transparent hover:scale-105 transition-all duration-200 shadow-md"
              >
                <span className="!text-white sm:!text-[#1748BB] font-bold tracking-wider uppercase text-[11px] sm:text-xs">
                  {buttonText}
                </span>
                <ArrowRight size={13} className="!text-white sm:!text-[#1748BB]" />
              </a>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
