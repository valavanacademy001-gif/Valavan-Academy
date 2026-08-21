"use client";

/**
 * Certifications Section — Phase 6
 * MORE THAN A CERTIFICATE.
 * Premium 3D Spatial Carousel with responsive card sizing:
 * - Scaled down neatly on mobile so cards never cut off and neighbor preview cards peek in smoothly.
 * - Auto-looping and smooth pop-up arc motion.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const CERTS = [
  { id: "c1", src: "/assets/certifications/2.webp", alt: "Valavan Academy Certification" },
  { id: "c2", src: "/assets/certifications/3.webp", alt: "Graphic Design Certificate" },
  { id: "c3", src: "/assets/certifications/4.webp", alt: "Video Editing Certificate" },
  { id: "c4", src: "/assets/certifications/5.webp", alt: "Web Design Certificate" },
  { id: "c5", src: "/assets/certifications/6.webp", alt: "Digital Skills Certificate" },
  { id: "c6", src: "/assets/certifications/7.webp", alt: "UI/UX Certificate" },
  { id: "c7", src: "/assets/certifications/8.webp", alt: "Full Stack Creator Certificate" },
  { id: "c8", src: "/assets/certifications/9.webp", alt: "AI Tools Certificate" },
];

export default function CertificationsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = CERTS.length;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + total) % total);
  }, [total]);

  // Auto-loop: 2.8s per slide
  useEffect(() => {
    if (!isPlaying || lightboxOpen) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(next, 2800);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, lightboxOpen, next]);

  const openLightbox = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
    setIsPlaying(false);
  };

  const lbPrev = () =>
    setLightboxIndex((i) => (i - 1 + total) % total);
  const lbNext = () =>
    setLightboxIndex((i) => (i + 1) % total);

  // Responsive card dimensions to ensure zero cut-off on small screens
  const cardW = isMobile ? 260 : 340;
  const cardH = isMobile ? 180 : 240;
  const offsetStep = isMobile ? 180 : 280;
  const farOffset = isMobile ? 320 : 520;

  return (
    <section className="bg-neutral-50 py-16 sm:py-28 overflow-hidden select-none">
      <Container>
        {/* Header */}
        <FadeUp delay={0}>
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <div className="w-8 h-[2px] bg-[#1748BB]" />
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1748BB] font-semibold">
              Certifications
            </span>
          </div>
        </FadeUp>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14 items-start mb-12 sm:mb-16">
          <FadeUp delay={0.05}>
            <h2
              className="font-display font-bold text-[#1E2026] leading-[1.18] sm:leading-[1.06] tracking-tight"
              style={{ fontSize: "clamp(26px, 4vw, 54px)" }}
            >
              More Than{" "}
              <span className="text-[#1748BB]">A Certificate.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-sans text-neutral-600 text-sm sm:text-base md:text-lg leading-relaxed font-normal pt-1">
              Every learner who completes a Valavan Academy program earns a
              certificate that represents real skills, real projects, and real
              growth — not just attendance.
            </p>
          </FadeUp>
        </div>

        {/* ── 3D Physical Spatial Gallery ── */}
        <div
          className="relative mx-auto flex items-center justify-center"
          style={{
            height: cardH + (isMobile ? 50 : 80),
            maxWidth: "100vw",
            perspective: 1400,
            transformStyle: "preserve-3d",
          }}
        >
          {CERTS.map((cert, idx) => {
            let diff = (idx - activeIndex + total) % total;
            if (diff > total / 2) diff -= total;

            const isCenter = diff === 0;

            let xOffset = 0;
            let yOffset = 0;
            let scale = 1;
            let opacity = 0;
            let rotateY = 0;
            let zIndex = 0;
            let pointerEvents: "auto" | "none" = "none";

            if (diff === 0) {
              xOffset = 0;
              yOffset = isMobile ? -8 : -16;
              scale = isMobile ? 1.04 : 1.12;
              opacity = 1;
              rotateY = 0;
              zIndex = 20;
              pointerEvents = "auto";
            } else if (diff === -1) {
              xOffset = -offsetStep;
              yOffset = isMobile ? 6 : 12;
              scale = isMobile ? 0.82 : 0.86;
              opacity = 0.75;
              rotateY = 12;
              zIndex = 8;
              pointerEvents = "auto";
            } else if (diff === 1) {
              xOffset = offsetStep;
              yOffset = isMobile ? 6 : 12;
              scale = isMobile ? 0.82 : 0.86;
              opacity = 0.75;
              rotateY = -12;
              zIndex = 8;
              pointerEvents = "auto";
            } else if (diff === -2) {
              xOffset = -farOffset;
              yOffset = isMobile ? 16 : 28;
              scale = 0.68;
              opacity = isMobile ? 0 : 0.45;
              rotateY = 20;
              zIndex = 3;
              pointerEvents = isMobile ? "none" : "auto";
            } else if (diff === 2) {
              xOffset = farOffset;
              yOffset = isMobile ? 16 : 28;
              scale = 0.68;
              opacity = isMobile ? 0 : 0.45;
              rotateY = -20;
              zIndex = 3;
              pointerEvents = isMobile ? "none" : "auto";
            } else if (diff < -2) {
              xOffset = -760;
              yOffset = 45;
              scale = 0.50;
              opacity = 0;
              rotateY = 30;
              zIndex = 0;
            } else {
              xOffset = 760;
              yOffset = 45;
              scale = 0.50;
              opacity = 0;
              rotateY = -30;
              zIndex = 0;
            }

            return (
              <motion.div
                key={cert.id}
                className="absolute cursor-pointer select-none"
                animate={{
                  x: xOffset,
                  y: yOffset,
                  scale,
                  opacity,
                  rotateY,
                  zIndex,
                }}
                transition={{
                  duration: 0.75,
                  ease: [0.34, 1.35, 0.64, 1], // Smooth pop-up arc easing
                }}
                style={{
                  width: cardW,
                  transformStyle: "preserve-3d",
                  pointerEvents,
                }}
                onClick={() => {
                  if (isCenter) {
                    openLightbox(idx);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
              >
                <div
                  className={`relative rounded-2xl overflow-hidden shadow-xl transition-all duration-500 bg-white ${
                    isCenter
                      ? "ring-2 ring-[#1748BB] ring-offset-2 sm:ring-offset-4 ring-offset-neutral-50 shadow-[0_15px_45px_rgba(23,72,187,0.25)]"
                      : "hover:ring-1 hover:ring-neutral-300 opacity-90"
                  }`}
                  style={{ width: cardW, height: cardH }}
                >
                  <Image
                    src={cert.src}
                    alt={cert.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 270px, (max-width: 768px) 340px, 450px"
                  />
                  {isCenter && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-end p-2.5 sm:p-3">
                      <span className="bg-black/70 backdrop-blur-sm text-white font-sans text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg font-medium shadow-md">
                        Click to expand
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center justify-center gap-5 sm:gap-6 mt-6 sm:mt-8">
          <button
            onClick={prev}
            aria-label="Previous certificate"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-300 bg-white hover:border-[#1748BB] hover:text-[#1748BB] flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
          >
            <ChevronLeft size={17} />
          </button>

          {/* Dots */}
          <div className="flex gap-1.5 sm:gap-2">
            {CERTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Certificate ${i + 1}`}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex
                    ? "w-5 sm:w-6 h-1.5 sm:h-2 bg-[#1748BB]"
                    : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next certificate"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-300 bg-white hover:border-[#1748BB] hover:text-[#1748BB] flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </Container>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => {
              setLightboxOpen(false);
              setIsPlaying(true);
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-4xl aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-neutral-900"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={CERTS[lightboxIndex].src}
                alt={CERTS[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 95vw, 900px"
              />
              {/* Close */}
              <button
                onClick={() => {
                  setLightboxOpen(false);
                  setIsPlaying(true);
                }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X size={20} />
              </button>
              {/* Prev/Next in lightbox */}
              <button
                onClick={lbPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={lbNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
