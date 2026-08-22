"use client";

/**
 * Valavan Academy — Mobile Menu
 * Compact, modern floating box navigation card for mobile devices.
 * Styled as a sleek dropdown card with smooth spring animations.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ChevronRight, ChevronDown, Sparkles, BookOpen, Users, Phone, Home } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { NAV_LINKS, EXTERNAL_URLS, SOCIAL_LINKS } from "@/data/site.config";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROGRAM_ITEMS = [
  { label: "90-Day Graphic Design Mastery", href: "/programs/90-days-graphic-design", badge: "90 Days" },
  { label: "Full Stack Creator Program", href: "/programs/full-stack-creator", badge: "6 Months" },
  { label: "Live Printing Business Workshop", href: "https://valavanacademy.in/workshop/", external: true, badge: "Live" },
  { label: "Explore All Programs →", href: "/programs#programs" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [programsOpen, setProgramsOpen] = useState(true);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll gently when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: -12, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: { duration: 0.18 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[75] bg-black/45 backdrop-blur-xs lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Floating Menu Card Box */}
          <motion.div
            key="mobile-card"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "fixed top-[62px] sm:top-[70px] left-3.5 right-3.5 sm:left-auto sm:right-6 sm:w-[380px] z-[85]",
              "bg-white rounded-2xl border border-neutral-200/90",
              "shadow-[0_20px_50px_rgba(0,0,0,0.18)] flex flex-col",
              "max-h-[calc(100vh-80px)] overflow-hidden lg:hidden"
            )}
          >
            {/* Card Header */}
            <div className="flex items-center justify-between px-4.5 py-3 border-b border-neutral-100 bg-neutral-50/70">
              <div className="flex items-center gap-2">
                <Logo height={22} className="h-5 w-auto" />
              </div>
              <button
                onClick={onClose}
                aria-label="Close navigation menu"
                className="w-7 h-7 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/60 flex items-center justify-center transition-colors"
              >
                <X size={17} />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-1.5 divide-y divide-neutral-100">
              
              {/* Main Links */}
              <div className="space-y-1">
                {/* Home Link */}
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-neutral-800 font-semibold text-sm hover:bg-[#F0F5FF] hover:text-[#1748BB] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <Home size={16} className="text-[#1748BB]" />
                    Home
                  </span>
                  <ChevronRight size={14} className="text-neutral-400" />
                </Link>

                {/* Programs Accordion */}
                <div className="rounded-xl overflow-hidden bg-neutral-50/60 border border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setProgramsOpen(!programsOpen)}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 text-neutral-800 font-semibold text-sm hover:text-[#1748BB] transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <BookOpen size={16} className="text-[#1748BB]" />
                      Programs & Tracks
                    </span>
                    <ChevronDown
                      size={15}
                      className={cn(
                        "text-neutral-400 transition-transform duration-200",
                        programsOpen ? "rotate-180 text-[#1748BB]" : ""
                      )}
                    />
                  </button>

                  {programsOpen && (
                    <div className="px-2 pb-2 space-y-1 pt-0.5">
                      {PROGRAM_ITEMS.map((prog) => (
                        prog.external ? (
                          <a
                            key={prog.label}
                            href={prog.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={onClose}
                            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:text-[#1748BB] hover:bg-white transition-colors"
                          >
                            <span className="truncate">{prog.label}</span>
                            {prog.badge && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-[#1748BB] shrink-0 ml-2">
                                {prog.badge}
                              </span>
                            )}
                          </a>
                        ) : (
                          <Link
                            key={prog.label}
                            href={prog.href}
                            onClick={onClose}
                            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:text-[#1748BB] hover:bg-white transition-colors"
                          >
                            <span className="truncate">{prog.label}</span>
                            {prog.badge && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-[#1748BB] shrink-0 ml-2">
                                {prog.badge}
                              </span>
                            )}
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>

                {/* About Link */}
                <Link
                  href="/about"
                  onClick={onClose}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-neutral-800 font-semibold text-sm hover:bg-[#F0F5FF] hover:text-[#1748BB] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <Sparkles size={16} className="text-[#1748BB]" />
                    About Valavan Academy
                  </span>
                  <ChevronRight size={14} className="text-neutral-400" />
                </Link>

                {/* Community Link */}
                <Link
                  href="/community"
                  onClick={onClose}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-neutral-800 font-semibold text-sm hover:bg-[#F0F5FF] hover:text-[#1748BB] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <Users size={16} className="text-[#1748BB]" />
                    TNCC Community (40K+)
                  </span>
                  <ChevronRight size={14} className="text-neutral-400" />
                </Link>

                {/* Contact Link */}
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-neutral-800 font-semibold text-sm hover:bg-[#F0F5FF] hover:text-[#1748BB] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <Phone size={16} className="text-[#1748BB]" />
                    Contact & Helpdesk
                  </span>
                  <ChevronRight size={14} className="text-neutral-400" />
                </Link>
              </div>

              {/* Bottom Action CTAs */}
              <div className="pt-3 space-y-2">
                <a
                  href={EXTERNAL_URLS.login}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-neutral-200 text-neutral-800 font-bold text-xs hover:bg-neutral-50 transition-colors shadow-2xs"
                >
                  <span>Login to Account</span>
                  <ExternalLink size={12} className="opacity-70" />
                </a>

                <a
                  href={EXTERNAL_URLS.signup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1748BB] hover:bg-[#0E3594] text-white font-bold text-xs shadow-md shadow-blue-600/25 transition-all"
                >
                  <span>Enroll Now →</span>
                </a>
              </div>

            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
