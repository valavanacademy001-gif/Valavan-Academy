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
    let visible = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!visible) {
        visible = true;
        setIsVisible(true);
        ringX = mouseX;
        ringY = mouseY;
      }

      // Dot follows instantaneously
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => {
      visible = false;
      setIsVisible(false);
    };
    const onMouseEnter = () => {
      visible = true;
      setIsVisible(true);
    };

    // Smooth Lerp loop for the trailing ring (pure transform, no CSS transition conflict)
    const render = () => {
      ringX += (mouseX - ringX) * 0.28;
      ringY += (mouseY - ringY) * 0.28;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

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
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none hidden lg:block"
    >
      {/* 1. Inner Instant Lead Dot (fades smoothly when hovering interactive buttons) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full transition-opacity duration-150 will-change-transform ${
          isVisible && !isHovered ? "opacity-100" : "opacity-0"
        } w-2 h-2 bg-[#1748BB]`}
        style={{
          boxShadow: "0 0 6px rgba(23, 72, 187, 0.4)",
        }}
      />

      {/* 2. Outer Smooth Trailing Circle / Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full transition-[width,height,background-color,border-color,opacity] duration-150 ease-out will-change-transform ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isHovered
            ? "w-10 h-10 border-[1.5px] border-[#1748BB] bg-[#1748BB]/15 backdrop-blur-[0.5px]"
            : isClicking
            ? "w-6 h-6 border border-[#1748BB] bg-[#1748BB]/20"
            : "w-7 h-7 border border-[#1748BB]/50 bg-transparent"
        }`}
        style={{
          boxShadow: isHovered
            ? "0 0 12px rgba(23, 72, 187, 0.25)"
            : "none",
        }}
      />
    </div>
  );
}
