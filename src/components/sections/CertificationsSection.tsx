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
import { CMSCertification, CMSSectionMeta } from "@/lib/cms";

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

interface CertificationsSectionProps {
  certifications?: CMSCertification[];
  meta?: CMSSectionMeta;
}

export default function CertificationsSection({ certifications, meta }: CertificationsSectionProps = {}) {
  const items = (certifications && certifications.length > 0)
    ? certifications.map((c, idx) => ({
        id: c.id || `c-${idx}`,
        src: c.image_url || CERTS[idx % CERTS.length].src,
        alt: c.title || "Valavan Academy Certification",
      }))
    : CERTS;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = items.length;

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

  const closeLightbox = () => {
    setLightboxOpen(false);
    setIsPlaying(true);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") {
        if (lightboxOpen) setLightboxIndex((i) => (i + 1) % total);
        else next();
      }
      if (e.key === "ArrowLeft") {
        if (lightboxOpen) setLightboxIndex((i) => (i - 1 + total) % total);
        else prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, next, prev, total]);

  // Positional offset logic
  const getOffset = (idx: number) => {
    let diff = idx - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section
      className="bg-white py-14 sm:py-24 relative overflow-hidden"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => !lightboxOpen && setIsPlaying(true)}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#1748BB]/5 rounded-full blur-[130px] pointer-events-none"
        aria-hidden
      />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <FadeUp delay={0}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#1748BB]" />
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1748BB] font-semibold">
                {meta?.badge || "STUDENT ACHIEVEMENTS"}
              </span>
              <div className="w-8 h-[2px] bg-[#1748BB]" />
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2
              className="font-display font-bold text-[#1E2026] tracking-tight leading-[1.04] sm:leading-[1.06]"
              style={{ fontSize: "clamp(30px, 4.8vw, 60px)" }}
            >
              {meta?.headline_prefix ? (
                <>
                  {meta.headline_prefix}{" "}
                  <span className="text-[#1748BB]">{meta.headline_highlight || "Certificate."}</span>
                </>
              ) : meta?.heading && /Certificate/i.test(meta.heading) ? (
                <>
                  {meta.heading.replace(/Certificate\.?/i, "").trim()}{" "}
                  <span className="text-[#1748BB]">
                    {meta.heading.match(/Certificate\.?/i)?.[0] || "Certificate."}
                  </span>
                </>
              ) : (
                <>
                  {meta?.heading || "More than a"}{" "}
                  <span className="text-[#1748BB]">Certificate.</span>
                </>
              )}
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            <p className="font-sans text-sm sm:text-base md:text-lg text-neutral-600 mt-3 font-normal max-w-xl mx-auto">
              {meta?.description || "Skill Verification for High-Income Careers. Every certificate validates a real-world portfolio deliverable."}
            </p>
          </FadeUp>
        </div>

        {/* 3D Spatial Carousel Stage */}
        <div className="relative w-full h-[230px] xs:h-[270px] sm:h-[360px] md:h-[440px] flex items-center justify-center select-none perspective-[1200px]">
          {items.map((item, idx) => {
            const offset = getOffset(idx);
            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            // Responsive geometry offsets
            const xShift = isMobile ? offset * 115 : offset * 210;
            const zShift = -Math.abs(offset) * (isMobile ? 70 : 130);
            const rotateY = offset * (isMobile ? -14 : -18);
            const scale = 1 - Math.abs(offset) * (isMobile ? 0.16 : 0.14);
            const opacity = 1 - Math.abs(offset) * 0.28;
            const zIndex = 20 - Math.abs(offset);

            return (
              <motion.div
                key={item.id}
                className="absolute cursor-pointer"
                style={{
                  zIndex,
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  x: xShift,
                  z: zShift,
                  rotateY,
                  scale,
                  opacity,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.25, 1, 0.5, 1],
                }}
                onClick={() => {
                  if (isCenter) openLightbox(idx);
                  else setActiveIndex(idx);
                }}
              >
                <div
                  className={`relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl transition-all duration-300 ${
                    isCenter
                      ? "ring-2 sm:ring-4 ring-[#1748BB] shadow-[0_16px_50px_rgba(23,72,187,0.3)]"
                      : "ring-1 ring-neutral-200 shadow-md hover:ring-[#1748BB]/40"
                  }`}
                  style={{
                    width: isMobile ? "200px" : "380px",
                    maxWidth: isMobile ? "68vw" : "380px",
                    aspectRatio: "16 / 12",
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 220px, 380px"
                    className="object-cover"
                    priority={idx === 0}
                  />

                  {/* Glass shimmer overlay */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      isCenter
                        ? "bg-gradient-to-t from-black/25 via-transparent to-transparent"
                        : "bg-black/20 hover:bg-black/5"
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-4 mt-6 sm:mt-10">
          <button
            onClick={prev}
            aria-label="Previous certificate"
            className="w-10 h-10 rounded-full border border-neutral-200 bg-white hover:bg-[#1748BB] text-neutral-700 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm hover:scale-105"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex
                    ? "w-6 bg-[#1748BB]"
                    : "w-2 bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next certificate"
            className="w-10 h-10 rounded-full border border-neutral-200 bg-white hover:bg-[#1748BB] text-neutral-700 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm hover:scale-105"
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </Container>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              aria-label="Close image modal"
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 z-50 cursor-pointer"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full max-h-[85vh] aspect-[16/12] rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[lightboxIndex].src}
                alt={items[lightboxIndex].alt}
                fill
                sizes="(max-width: 1024px) 90vw, 1000px"
                className="object-contain bg-black/40"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
