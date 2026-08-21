"use client";

/**
 * Video Testimonial Carousel — Phase 7
 * Real People, Real Transformations.
 * 3D Curved Arc Spatial Carousel with 12 YouTube Shorts:
 * - Center card pops up in front with scale & high elevation.
 * - Left & right neighbor cards stay behind with low opacity & subtle angle.
 * - Infinite continuous circular loop (never reverses/rewinds).
 * - Full responsive touch swipe support.
 */

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, PanInfo } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";

const VIDEOS = [
  { id: "BzQ9wNPit5I", name: "Learner Story 1" },
  { id: "3oVzfOTkjWE", name: "Learner Story 2" },
  { id: "N5a_d-R_eJw", name: "Learner Story 3" },
  { id: "wZ5HiQO8g74", name: "Learner Story 4" },
  { id: "h3uv9HAC3Ek", name: "Learner Story 5" },
  { id: "tPPE5Jywfsg", name: "Learner Story 6" },
  { id: "RRn6b8cIgxc", name: "Learner Story 7" },
  { id: "GNLYaMdWF64", name: "Learner Story 8" },
  { id: "R4nXDTTTq4g", name: "Learner Story 9" },
  { id: "nCQ18VfjKUQ", name: "Learner Story 10" },
  { id: "ezqLPTS8vHk", name: "Learner Story 11" },
  { id: "YOhkWGcyTLw", name: "Learner Story 12" },
];

function YtThumbnail({
  videoId,
  name,
  onClick,
}: {
  videoId: string;
  name: string;
  onClick: () => void;
}) {
  const [imgSrc, setImgSrc] = useState(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`);

  return (
    <button
      type="button"
      className="relative w-full h-full group bg-neutral-900 overflow-hidden cursor-pointer"
      onClick={onClick}
      aria-label={`Play ${name}`}
    >
      <Image
        src={imgSrc}
        alt={name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 640px) 200px, (max-width: 768px) 300px, 400px"
        onError={() => {
          if (imgSrc.includes("maxresdefault")) {
            setImgSrc(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
          }
        }}
      />
      {/* Subtle bottom vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/10 group-hover:opacity-80 transition-opacity" />

      {/* Center Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#1748BB]/90 border border-white/30 flex items-center justify-center shadow-[0_8px_25px_rgba(23,72,187,0.6)] group-hover:scale-115 group-hover:bg-[#1748BB] transition-all duration-300 backdrop-blur-sm">
          <Play size={18} className="text-white fill-white ml-0.5" />
        </div>
      </div>
    </button>
  );
}

function YtEmbed({ videoId, name }: { videoId: string; name: string }) {
  return (
    <div key={videoId} className="absolute inset-0 w-full h-full">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}&rel=0&modestbranding=1`}
        title={name}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full border-0"
      />
    </div>
  );
}

interface VideoTestimonialCarouselProps {
  centered?: boolean;
  kicker?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  titleSuffix?: string;
  subtitle?: string;
  noTopShadow?: boolean;
  customTitle?: React.ReactNode;
}

export default function VideoTestimonialCarousel({
  centered = false,
  kicker = "Learner Stories",
  titlePrefix = "Real People,",
  titleHighlight = "Real Transformations.",
  titleSuffix = "",
  subtitle = "Career changers who redefined their future with Valavan Academy — in their own words.",
  noTopShadow = false,
  customTitle,
}: VideoTestimonialCarouselProps = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = VIDEOS.length;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total);
    setPlayingVideo(null);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + total) % total);
    setPlayingVideo(null);
  }, [total]);

  // Auto-loop: 2.8 seconds per slide
  useEffect(() => {
    if (!isPlaying || playingVideo !== null) return;
    intervalRef.current = setInterval(goNext, 2800);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, goNext, playingVideo]);

  // Touch swipe drag handling
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 35) {
      if (info.offset.x < 0) goNext();
      else goPrev();
    }
  };

  const handleThumbnailClick = (index: number) => {
    if (index === activeIndex) {
      setPlayingVideo(VIDEOS[index].id);
      setIsPlaying(false);
    } else {
      setActiveIndex(index);
      setPlayingVideo(null);
    }
  };

  // Responsive dimensions for 9:16 vertical shorts cards
  const cardW = isMobile ? 172 : 260;
  const cardH = isMobile ? 305 : 462;
  const offsetStep = isMobile ? 145 : 235;
  const farOffset = isMobile ? 280 : 440;

  return (
    <section
      className={`relative z-20 bg-white py-16 sm:py-28 overflow-hidden border-t border-neutral-100 select-none ${
        noTopShadow
          ? ""
          : "rounded-t-[36px] sm:rounded-t-[52px] shadow-[0_-25px_60px_rgba(0,0,0,0.18)]"
      }`}
    >
      <Container>
        {/* Header */}
        {centered ? (
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <FadeUp delay={0.05}>
              {customTitle ? (
                customTitle
              ) : (
                <h2
                  className="font-display font-bold leading-tight tracking-tight"
                  style={{ fontSize: "clamp(30px, 4.2vw, 54px)", color: "#1E2026" }}
                >
                  {titlePrefix}{" "}
                  <span style={{ color: "#1748BB" }} className="!text-[#1748BB]">
                    {titleHighlight}
                  </span>{" "}
                  {titleSuffix}
                </h2>
              )}
            </FadeUp>
          </div>
        ) : (
          <>
            <FadeUp delay={0}>
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-[2px] bg-[#1748BB] opacity-40" />
                <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1748BB] font-semibold">
                  {kicker}
                </span>
                <div className="w-8 h-[2px] bg-[#1748BB] opacity-40" />
              </div>
            </FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14 items-start mb-12 sm:mb-16">
              <FadeUp delay={0.05}>
                <h2
                  className="font-display font-bold leading-[1.18] sm:leading-[1.06] tracking-tight"
                  style={{ fontSize: "clamp(26px, 4vw, 52px)", color: "#1E2026" }}
                >
                  {titlePrefix}{" "}
                  <span className="text-[#1748BB]">{titleHighlight}</span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="font-sans text-sm sm:text-base md:text-lg leading-relaxed font-normal text-neutral-600 pt-1">
                  {subtitle}
                </p>
              </FadeUp>
            </div>
          </>
        )}

        {/* ── 3D Arc Carousel with Real Spatial Physical Motion (Desktop & Mobile) ── */}
        <motion.div
          ref={containerRef}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          className="relative mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{
            height: cardH + (isMobile ? 50 : 80),
            maxWidth: "100vw",
            perspective: 1400,
            transformStyle: "preserve-3d",
          }}
        >
          {VIDEOS.map((video, idx) => {
            // Compute relative circular distance to activeIndex (Infinite loop without reverse)
            let diff = (idx - activeIndex + total) % total;
            if (diff > total / 2) diff -= total;

            const isCenter = diff === 0;
            const isEmbedding = playingVideo === video.id && isCenter;

            // Slot kinematics based on relative distance (pop-up arc)
            let xOffset = 0;
            let yOffset = 0;
            let scale = 1;
            let opacity = 0;
            let rotateY = 0;
            let zIndex = 0;
            let pointerEvents: "auto" | "none" = "none";

            if (diff === 0) {
              xOffset = 0;
              yOffset = isMobile ? -10 : -18;
              scale = isMobile ? 1.08 : 1.14;
              opacity = 1;
              rotateY = 0;
              zIndex = 20;
              pointerEvents = "auto";
            } else if (diff === -1) {
              xOffset = -offsetStep;
              yOffset = isMobile ? 10 : 14;
              scale = isMobile ? 0.82 : 0.86;
              opacity = 0.60;
              rotateY = 12;
              zIndex = 8;
              pointerEvents = "auto";
            } else if (diff === 1) {
              xOffset = offsetStep;
              yOffset = isMobile ? 10 : 14;
              scale = isMobile ? 0.82 : 0.86;
              opacity = 0.60;
              rotateY = -12;
              zIndex = 8;
              pointerEvents = "auto";
            } else if (diff === -2) {
              xOffset = -farOffset;
              yOffset = isMobile ? 22 : 34;
              scale = 0.68;
              opacity = isMobile ? 0 : 0.40;
              rotateY = 22;
              zIndex = 3;
              pointerEvents = isMobile ? "none" : "auto";
            } else if (diff === 2) {
              xOffset = farOffset;
              yOffset = isMobile ? 22 : 34;
              scale = 0.68;
              opacity = isMobile ? 0 : 0.40;
              rotateY = -22;
              zIndex = 3;
              pointerEvents = isMobile ? "none" : "auto";
            } else if (diff < -2) {
              xOffset = -660;
              yOffset = 55;
              scale = 0.50;
              opacity = 0;
              rotateY = 30;
              zIndex = 0;
            } else {
              xOffset = 660;
              yOffset = 55;
              scale = 0.50;
              opacity = 0;
              rotateY = -30;
              zIndex = 0;
            }

            return (
              <motion.div
                key={video.id}
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
                  ease: [0.34, 1.35, 0.64, 1], // Smooth pop-up easing
                }}
                style={{
                  width: cardW,
                  transformStyle: "preserve-3d",
                  pointerEvents,
                }}
              >
                <div
                  className={`relative rounded-2xl overflow-hidden transition-all duration-500 bg-neutral-900 ${
                    isCenter
                      ? "border-2 border-[#1748BB] shadow-[0_14px_34px_rgba(0,0,0,0.16),0_0_28px_rgba(23,72,187,0.35),0_0_10px_rgba(74,144,226,0.3)]"
                      : "border border-neutral-200/60 opacity-85 shadow-md hover:opacity-95"
                  }`}
                  style={{ width: cardW, height: cardH }}
                  onClick={() => handleThumbnailClick(idx)}
                >
                  {isEmbedding ? (
                    <YtEmbed videoId={video.id} name={video.name} />
                  ) : (
                    <YtThumbnail
                      videoId={video.id}
                      name={video.name}
                      onClick={() => handleThumbnailClick(idx)}
                    />
                  )}
                  {/* Video label */}
                  {isCenter && !isEmbedding && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 sm:p-4">
                      <p className="font-sans text-white text-xs sm:text-sm font-semibold">
                        {video.name}
                      </p>
                      <p className="font-sans text-white/70 text-[10px] sm:text-xs mt-0.5 font-normal">
                        Tap to watch
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5 sm:gap-6 mt-6 sm:mt-8">
          <button
            onClick={goPrev}
            aria-label="Previous video"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#1748BB]/40 text-[#1748BB] hover:border-[#1748BB] hover:bg-[#1748BB]/5 flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Play / Pause */}
          <button
            onClick={() => {
              setIsPlaying((p) => !p);
              setPlayingVideo(null);
            }}
            aria-label={isPlaying ? "Pause auto-play" : "Resume auto-play"}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1748BB] hover:bg-[#0A3CA8] text-white flex items-center justify-center transition-all shadow-lg cursor-pointer"
          >
            {isPlaying ? (
              <Pause size={17} />
            ) : (
              <Play size={17} className="ml-0.5" />
            )}
          </button>

          <button
            onClick={goNext}
            aria-label="Next video"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#1748BB]/40 text-[#1748BB] hover:border-[#1748BB] hover:bg-[#1748BB]/5 flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 sm:gap-2 mt-4">
          {VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveIndex(i); setPlayingVideo(null); }}
              aria-label={`Video ${i + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? "w-5 sm:w-6 h-1.5 bg-[#1748BB]"
                  : "w-1.5 h-1.5 bg-[#1748BB]/30 hover:bg-[#1748BB]/60"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
