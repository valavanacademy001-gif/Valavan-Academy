"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * CustomCursor — Luxury Creative Agency Trailing Cursor
 *
 * Consists of:
 * 1. An inner solid Brand Dot (follows mouse instantly)
 * 2. An outer Trailing Ring/Circle (follows with smooth lerp physics)
 * 3. Expands and reacts smoothly on hovering links, buttons, and cards
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Dot follows instantaneously
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Smooth Lerp loop for the trailing ring
    const render = () => {
      // Lerp factor (0.16 = smooth luxurious trailing glide)
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isNav = !!target.closest('header, nav, [role="banner"], [role="menu"]');
      if (isNav) {
        setIsVisible(false);
        setIsHovered(false);
        return;
      }

      setIsVisible(true);
      const isInteractive = !!target.closest(
        'a, button, input, select, textarea, [role="button"], [data-cursor-hover], .cursor-pointer'
      );
      setIsHovered(isInteractive);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", handleElementHover, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", handleElementHover);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none hidden lg:block"
    >
      {/* 1. Inner Instant Lead Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full transition-opacity duration-150 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isHovered
            ? "w-2 h-2 bg-[#1748BB] scale-90"
            : "w-2 h-2 bg-[#1748BB] scale-100"
        }`}
        style={{
          boxShadow: "0 0 6px rgba(23, 72, 187, 0.4)",
        }}
      />

      {/* 2. Outer Smooth Trailing Circle / Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full transition-all duration-200 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isHovered
            ? "w-8 h-8 border-[1.5px] border-[#1748BB] bg-[#1748BB]/10 backdrop-blur-[0.5px] scale-110"
            : isClicking
            ? "w-6 h-6 border border-[#1748BB] bg-[#1748BB]/20 scale-90"
            : "w-7 h-7 border border-[#1748BB]/40 bg-transparent scale-100"
        }`}
        style={{
          boxShadow: isHovered
            ? "0 0 10px rgba(23, 72, 187, 0.2)"
            : "none",
        }}
      />
    </div>
  );
}
