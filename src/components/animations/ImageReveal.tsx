"use client";

/**
 * Valavan Academy — ImageReveal Animation Component
 * Clip-path based image reveal using GSAP ScrollTrigger.
 * Creates a cinematic wipe effect from left to right.
 */

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/animation";

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "left-to-right" | "right-to-left" | "bottom-to-top";
}

export default function ImageReveal({
  children,
  className,
  delay = 0,
  direction = "left-to-right",
}: ImageRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let gsapModule: typeof import("@/lib/gsap") | null = null;

    const initAnimation = async () => {
      gsapModule = await import("@/lib/gsap");
      const { gsap, ScrollTrigger, initGSAP } = gsapModule;
      initGSAP();

      if (!wrapperRef.current) return;

      const clipStart =
        direction === "left-to-right"
          ? "inset(0 100% 0 0)"
          : direction === "right-to-left"
          ? "inset(0 0 0 100%)"
          : "inset(100% 0 0 0)";

      const clipEnd = "inset(0 0% 0 0)";

      gsap.fromTo(
        wrapperRef.current,
        { clipPath: clipStart },
        {
          clipPath: clipEnd,
          duration: 1.1,
          ease: "power3.out",
          delay,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    };

    initAnimation();

    return () => {
      // ScrollTrigger cleanup handled by the lib
    };
  }, [delay, direction]);

  return (
    <div ref={wrapperRef} className={className} style={{ overflow: "hidden" }}>
      {children}
    </div>
  );
}
