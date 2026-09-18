"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * CustomCursor — Fluid Trailing Magnetic Blue Ring with Center Point Dot
 *
 * Renders a trailing outer blue circle with a sharp blue dot at its center,
 * moving together with smooth drag & spring inertia behind the mouse.
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const ring = ringRef.current;
    if (!ring) return;

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

    // Silky smooth trailing Lerp loop (0.14 for fluid trailing drag)
    const render = () => {
      const deltaX = mouseX - ringX;
      const deltaY = mouseY - ringY;

      ringX += deltaX * 0.14;
      ringY += deltaY * 0.14;

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
      {/* Outer Blue Circle with Center Blue Point Dot inside */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full will-change-transform pointer-events-none transition-all duration-200 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isHovered
            ? "w-11 h-11 border-[1.5px] border-[#1748BB] bg-[#1748BB]/10 backdrop-blur-[0.5px] shadow-[0_0_16px_rgba(23,72,187,0.3)]"
            : isClicking
            ? "w-6 h-6 border-[2px] border-[#1748BB] bg-[#1748BB]/20 shadow-[0_0_10px_rgba(23,72,187,0.4)]"
            : "w-8 h-8 border-[1.5px] border-[#1748BB]/70 bg-[#1748BB]/5 shadow-[0_0_10px_rgba(23,72,187,0.2)]"
        }`}
      >
        {/* Center Blue Point Dot */}
        <div
          className={`rounded-full bg-[#1748BB] transition-all duration-200 shrink-0 ${
            isHovered
              ? "w-2.5 h-2.5 opacity-90 shadow-[0_0_8px_rgba(23,72,187,0.6)]"
              : "w-2 h-2 opacity-100 shadow-[0_0_6px_rgba(23,72,187,0.5)]"
          }`}
        />
      </div>
    </div>
  );
}
