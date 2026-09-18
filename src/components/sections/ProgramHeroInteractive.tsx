"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import Container from "@/components/ui/Container";
import { ArrowLeft, ArrowRight, Clock, Globe, BarChart, Layers, Sparkles, Play, Volume2, VolumeX, GraduationCap, FolderGit2, Video, UserCheck } from "lucide-react";

export interface HighlightItem {
  iconType: "clock" | "globe" | "level" | "work" | "students" | "projects" | "lessons" | "access" | "guidance" | string;
  label: string;
  value: string;
}

interface ProgramHeroInteractiveProps {
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  highlights: HighlightItem[];
  imageSrc: string;
  altText: string;
  enrollUrl: string;
  communityUrl?: string;
  buttonText?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  youtubeId?: string;
  videoUrl?: string;
  show3DIcons?: boolean;
  topRight3DIcon?: string;
  bottomRight3DIcon?: string;
}

function renderIcon(type: string) {
  const iconProps = { size: 16, className: "text-[#BACFFF] shrink-0" };
  switch (type) {
    case "students":
    case "graduation":
      return <GraduationCap {...iconProps} />;
    case "projects":
    case "folder":
      return <FolderGit2 {...iconProps} />;
    case "lessons":
    case "video":
      return <Video {...iconProps} />;
    case "access":
    case "globe":
      return <Globe {...iconProps} />;
    case "guidance":
    case "mentor":
      return <UserCheck {...iconProps} />;
    case "clock":
      return <Clock {...iconProps} />;
    case "level":
      return <BarChart {...iconProps} />;
    case "work":
      return <Layers {...iconProps} />;
    default:
      return <Sparkles {...iconProps} />;
  }
}

export default function ProgramHeroInteractive({
  badge,
  titlePrefix,
  titleHighlight,
  description,
  highlights,
  imageSrc,
  altText,
  enrollUrl,
  communityUrl,
  buttonText = "Enroll Now",
  secondaryButtonText = "View Curriculum",
  secondaryButtonUrl = "#roadmap",
  youtubeId,
  videoUrl,
  show3DIcons = false,
  topRight3DIcon = "/assets/icons/illustrator-3d-sphere.png",
  bottomRight3DIcon = "/assets/icons/photoshop-3d-sphere.png",
}: ProgramHeroInteractiveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Extract clean YouTube ID and optional start seconds if full URL passed
  let startSeconds = 0;
  if (videoUrl) {
    const startMatch = videoUrl.match(/[?&]start=(\d+)/);
    if (startMatch) startSeconds = parseInt(startMatch[1], 10);
  }

  const effectiveYoutubeId = youtubeId
    ? youtubeId
    : videoUrl
    ? videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/)?.[1]
    : undefined;

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  // Switch to playing video automatically when expanded on scroll
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (effectiveYoutubeId) {
      if (latest > 0.22 && !isPlayingVideo) {
        setIsPlayingVideo(true);
      } else if (latest <= 0.12 && isPlayingVideo) {
        setIsPlayingVideo(false);
      }
    }
  });

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;

    if (isMuted) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "unMute" }),
        "*"
      );
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "setVolume", args: [100] }),
        "*"
      );
      setIsMuted(false);
    } else {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "mute" }),
        "*"
      );
      setIsMuted(true);
    }
  };

  // Banner Heading + Arrow opacity (fades in as card expands to center stage)
  const bannerHeadingOpacity = useTransform(smoothProgress, [0.28, 0.58], [0, 1]);
  const bannerHeadingY = useTransform(smoothProgress, [0.28, 0.58], [15, 0]);

  // Floating 3D Spheres fade out as video card expands to full stage
  const sphereOpacity = useTransform(smoothProgress, [0, 0.22], [1, 0]);
  const sphereScale = useTransform(smoothProgress, [0, 0.22], [1, 0.6]);

  // Shift image/video down by 68px as it expands so it sits in the lower center with zero top clipping
  const imageY = useTransform(smoothProgress, [0, 0.65], [0, 68]);

  // Desktop Animation Transforms for seamless Expansion Effect
  const textOpacity = useTransform(smoothProgress, [0, 0.35], [1, 0]);
  const textX = useTransform(smoothProgress, [0, 0.35], [0, -70]);
  const imageX = useTransform(smoothProgress, [0, 0.65], ["0%", "-66%"]);
  const imageScale = useTransform(smoothProgress, [0, 0.65, 1], [1, 1.88, 1.92]);
  const imageShadow = useTransform(
    smoothProgress,
    [0, 0.65],
    ["0 20px 45px rgba(0,0,0,0.28)", "0 30px 75px rgba(0,0,0,0.45)"]
  );

  return (
    <div
      ref={containerRef}
      className={`relative bg-[#1748BB] text-white ${
        isDesktop ? "h-[140vh]" : "w-full pb-12 pt-24 sm:pt-28"
      }`}
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.05) 0px,
            rgba(255, 255, 255, 0.05) 1px,
            transparent 1px,
            transparent 12px
          )
        `,
      }}
    >
      <div
        className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-white/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#0A2E8A]/50 rounded-full blur-[100px] pointer-events-none"
        aria-hidden
      />

      <div
        className={`${
          isDesktop
            ? "sticky top-0 h-screen w-full flex flex-col justify-center pt-8 overflow-visible"
            : "relative z-10"
        }`}
      >
        <Container className="relative z-10 w-full py-8 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <motion.div
              style={isDesktop ? { opacity: textOpacity, x: textX } : {}}
              className="lg:col-span-7 space-y-6 lg:space-y-7"
            >
              <Link
                href="/programs"
                style={{ color: "#BACFFF" }}
                className="inline-flex items-center gap-2 font-sans text-xs font-bold tracking-wider uppercase hover:text-white mb-2 transition-colors group cursor-pointer"
              >
                <ArrowLeft size={14} style={{ color: "#BACFFF" }} className="group-hover:-translate-x-1 transition-transform" />
                <span>All Programs</span>
              </Link>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-[2px] bg-white" />
                  <span className="font-sans text-xs tracking-[0.25em] uppercase text-white font-bold">
                    {badge}
                  </span>
                </div>

                <h1
                  className="font-display font-bold text-white leading-[1.04] tracking-tight uppercase"
                  style={{ fontSize: "clamp(34px, 4.4vw, 58px)" }}
                >
                  <span className="text-white block">{titlePrefix}</span>
                  <span className="text-white block">{titleHighlight}</span>
                </h1>
              </div>

              <p
                style={{ color: "#BACFFF" }}
                className="font-sans text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-normal"
              >
                {description}
              </p>

              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1.5">
                {highlights.map((item, idx) => {
                  const displayText =
                    item.value && item.label && !item.value.toLowerCase().includes(item.label.toLowerCase())
                      ? `${item.value} ${item.label}`
                      : item.value || item.label;

                  return (
                    <div
                      key={idx}
                      className="px-3.5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-2.5 shadow-sm hover:bg-white/15 hover:border-white/30 transition-all duration-200 whitespace-nowrap"
                    >
                      <div className="shrink-0 flex items-center justify-center">
                        {renderIcon(item.iconType)}
                      </div>
                      <span className="font-sans text-xs sm:text-sm font-semibold text-white whitespace-nowrap tracking-normal">
                        {displayText}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <a
                  href={enrollUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: "#FFFFFF", color: "#1748BB" }}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F0F5FF] !text-[#1748BB] font-sans font-bold text-sm sm:text-base px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 shadow-[0_10px_30px_rgba(0,0,0,0.25)] cursor-pointer"
                >
                  <span style={{ color: "#1748BB" }} className="!text-[#1748BB] font-bold">
                    {buttonText}
                  </span>
                  <ArrowRight size={17} style={{ color: "#1748BB" }} className="!text-[#1748BB]" />
                </a>

                <a
                  href={secondaryButtonUrl || communityUrl || "#roadmap"}
                  target={secondaryButtonUrl?.startsWith("#") ? undefined : "_blank"}
                  rel={secondaryButtonUrl?.startsWith("#") ? undefined : "noopener noreferrer"}
                  style={{ color: "#FFFFFF", borderColor: "#FFFFFF" }}
                  className="inline-flex items-center justify-center gap-2 border-2 border-white hover:border-white !text-white font-sans font-bold text-sm sm:text-base px-7 py-4 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-105 cursor-pointer"
                >
                  <span style={{ color: "#FFFFFF" }} className="!text-white font-bold">
                    {secondaryButtonText}
                  </span>
                  <ArrowRight size={17} style={{ color: "#FFFFFF" }} className="!text-white" />
                </a>
              </div>
            </motion.div>

            {/* Right Hero Image/Video Showcase with Floating 3D Orbs */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
              {/* ─── 1. Floating 3D Illustrator (Ai) Sphere (Top-Right of Video) ─── */}
              {show3DIcons && (
                <motion.div
                  style={isDesktop ? { opacity: sphereOpacity, scale: sphereScale } : {}}
                  className="absolute -top-7 -right-4 sm:-top-9 sm:-right-6 md:-top-11 md:-right-8 lg:-top-12 lg:-right-8 xl:-top-14 xl:-right-10 z-40 pointer-events-auto select-none"
                >
                  {/* Entrance animation: flies in smoothly from right with elastic rebound */}
                  <motion.div
                    initial={{ x: 140, y: -30, rotate: 32, scale: 0.35, opacity: 0 }}
                    animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                    transition={{
                      duration: 1.25,
                      delay: 0.18,
                      ease: [0.34, 1.56, 0.64, 1], // Elastic overshoot
                    }}
                  >
                    {/* Continuous ambient float & subtle wiggle */}
                    <motion.div
                      animate={{
                        y: [0, -14, 0, 10, 0],
                        x: [0, 6, 0, -6, 0],
                        rotate: [0, 7, 0, -6, 0],
                      }}
                      transition={{
                        duration: 5.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      whileHover={{
                        scale: 1.15,
                        rotate: 15,
                        transition: { type: "spring", stiffness: 350, damping: 12 },
                      }}
                      whileTap={{ scale: 0.92 }}
                      className="cursor-pointer"
                    >
                      <div className="relative w-18 h-18 sm:w-22 sm:h-22 md:w-26 md:h-26 lg:w-30 lg:h-30 xl:w-34 xl:h-34 drop-shadow-[0_24px_35px_rgba(0,0,0,0.65)] drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]">
                        <Image
                          src={topRight3DIcon}
                          alt="Adobe Illustrator 3D Badge"
                          fill
                          className="object-contain pointer-events-none"
                          priority
                          sizes="(max-width: 768px) 96px, 144px"
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* Outer Glowing Border Stroke Frame matching Image 2 */}
              <motion.div
                style={
                  isDesktop
                    ? {
                        x: imageX,
                        y: imageY,
                        scale: imageScale,
                        boxShadow: imageShadow,
                      }
                    : {}
                }
                className="w-full origin-center relative p-1.5 sm:p-2 rounded-[24px] sm:rounded-[32px] border border-white/40 bg-white/10 backdrop-blur-md shadow-[0_25px_65px_rgba(0,0,0,0.4)] z-20 group"
              >
                {/* Top Callout Question (Single tight text with ultra-low line-height + Clean Doodle Downward Arrow) */}
                <motion.div
                  style={isDesktop ? { opacity: bannerHeadingOpacity, y: bannerHeadingY } : {}}
                  className="absolute -top-[52px] sm:-top-[62px] left-0 right-0 hidden sm:flex items-center justify-center pointer-events-none text-center z-30"
                >
                  <div className="inline-flex items-center justify-center gap-2">
                    <p
                      style={{ color: "#FFFFFF", lineHeight: 0.88 }}
                      className="font-display font-semibold text-base sm:text-lg md:text-xl text-white tracking-tight text-center drop-shadow-md m-0 p-0"
                    >
                      Confused about your next
                      <br />
                      <span className="inline-block mt-0.5">career move ?</span>
                    </p>
                    {/* Clean Elegant Hand-Drawn White Doodle Arrow SVG */}
                    <motion.svg
                      animate={{
                        y: [0, 4, 0],
                        rotate: [0, -2, 0],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-8 h-8 sm:w-10 sm:h-9 text-white shrink-0 self-end -mb-1"
                      viewBox="0 0 60 50"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      {/* Smooth hand-drawn curve arcing from text and swooping down to video */}
                      <path d="M 6 14 C 20 2, 42 4, 48 20 C 51 28, 46 38, 38 44" />
                      {/* Crisp arrowhead */}
                      <path d="M 48 36 L 38 44 L 32 34" />
                    </motion.svg>
                  </div>
                </motion.div>

                {/* Inner Video/Image Card */}
                <div className="relative aspect-[16/9] w-full rounded-[18px] sm:rounded-[26px] overflow-hidden bg-black">
                  {/* 1. YouTube Video with Normal-Sized Desktop Controls on Hover */}
                  {effectiveYoutubeId && (
                    <div
                      className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-500 ${
                        isPlayingVideo ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <iframe
                        ref={iframeRef}
                        src={`https://www.youtube-nocookie.com/embed/${effectiveYoutubeId}?autoplay=1&mute=1&loop=1&playlist=${effectiveYoutubeId}&controls=1&modestbranding=1&rel=0&playsinline=1&enablejsapi=1${startSeconds ? `&start=${startSeconds}` : ""}`}
                        title={altText}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className={`border-0 ${
                          isDesktop
                            ? "w-[190%] h-[190%] scale-[0.526] origin-top-left"
                            : "w-full h-full"
                        }`}
                      />
                    </div>
                  )}

                  {/* 2. Thumbnail Poster Image with Centered Interactive Play Button */}
                  <div
                    onClick={() => {
                      if (effectiveYoutubeId) {
                        setIsPlayingVideo(true);
                      }
                    }}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                      isPlayingVideo && effectiveYoutubeId
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100 pointer-events-auto cursor-pointer group/thumb"
                    }`}
                  >
                    <Image
                      src={imageSrc}
                      alt={altText}
                      fill
                      className="object-cover scale-[1.05] group-hover/thumb:scale-[1.08] transition-transform duration-500"
                      priority
                      sizes="(max-width: 1024px) 100vw, 1000px"
                    />

                    {/* Centered Glowing Play Button */}
                    {effectiveYoutubeId && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/thumb:bg-black/35 transition-colors">
                        <div className="relative flex items-center justify-center">
                          <div className="absolute w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white/30 animate-ping pointer-events-none" />
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-[#1748BB] flex items-center justify-center shadow-[0_10px_35px_rgba(0,0,0,0.4)] group-hover/thumb:scale-110 group-hover/thumb:bg-[#1748BB] group-hover/thumb:text-white transition-all duration-300 relative z-10">
                            <Play size={24} className="fill-current translate-x-0.5" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Sleek Floating Circular Sound Button placed at Marked Bottom-Right Position */}
                {effectiveYoutubeId && isPlayingVideo && (
                  <div className="absolute -bottom-4 right-4 sm:-bottom-5 sm:right-6 z-40 pointer-events-auto">
                    <button
                      onClick={toggleMute}
                      type="button"
                      aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-2 transition-all duration-200 hover:scale-110 cursor-pointer backdrop-blur-md ${
                        isMuted
                          ? "bg-[#1748BB] text-white border-white hover:bg-[#0A3CA8] animate-pulse"
                          : "bg-black/85 text-white border-emerald-400 hover:bg-black"
                      }`}
                    >
                      {isMuted ? (
                        <VolumeX size={18} className="text-white shrink-0" />
                      ) : (
                        <Volume2 size={18} className="text-emerald-400 shrink-0" />
                      )}
                    </button>
                  </div>
                )}
              </motion.div>

              {/* ─── 2. Floating 3D Photoshop (Ps) Sphere (Bottom-Right of Hero) ─── */}
              {show3DIcons && (
                <motion.div
                  style={isDesktop ? { opacity: sphereOpacity, scale: sphereScale } : {}}
                  className="absolute -bottom-10 -right-6 sm:-bottom-12 sm:-right-8 md:-bottom-14 md:-right-10 lg:-bottom-16 lg:-right-12 xl:-bottom-20 xl:-right-16 z-40 pointer-events-auto select-none"
                >
                  {/* Entrance animation: flies in smoothly from right with elastic rebound */}
                  <motion.div
                    initial={{ x: 180, y: 50, rotate: -38, scale: 0.35, opacity: 0 }}
                    animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                    transition={{
                      duration: 1.45,
                      delay: 0.35,
                      ease: [0.34, 1.56, 0.64, 1], // Elastic overshoot
                    }}
                  >
                    {/* Continuous ambient float & subtle wiggle */}
                    <motion.div
                      animate={{
                        y: [0, 16, 0, -12, 0],
                        x: [0, -8, 0, 7, 0],
                        rotate: [0, -8, 0, 6, 0],
                      }}
                      transition={{
                        duration: 6.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.4,
                      }}
                      whileHover={{
                        scale: 1.15,
                        rotate: -15,
                        transition: { type: "spring", stiffness: 350, damping: 12 },
                      }}
                      whileTap={{ scale: 0.92 }}
                      className="cursor-pointer"
                    >
                      <div className="relative w-22 h-22 sm:w-28 sm:h-28 md:w-34 md:h-34 lg:w-40 lg:h-40 xl:w-48 xl:h-48 drop-shadow-[0_28px_45px_rgba(0,0,0,0.7)] drop-shadow-[0_12px_22px_rgba(0,0,0,0.45)]">
                        <Image
                          src={bottomRight3DIcon}
                          alt="Adobe Photoshop 3D Badge"
                          fill
                          className="object-contain pointer-events-none"
                          priority
                          sizes="(max-width: 768px) 128px, 208px"
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

