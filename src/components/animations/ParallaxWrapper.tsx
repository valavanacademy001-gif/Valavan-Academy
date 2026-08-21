"use client";

/**
 * Valavan Academy — ParallaxWrapper Component
 * Applies a smooth parallax scroll effect using GSAP ScrollTrigger.
 * Respects prefers-reduced-motion.
 */

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/animation";

interface ParallaxWrapperProps {
  children: React.ReactNode;
  className?: string;
  /** Y offset in pixels at the end of the parallax range. Negative = moves up. */
  yOffset?: number;
  /** X offset in pixels */
  xOffset?: number;
}

export default function ParallaxWrapper({
  children,
  className,
  yOffset = -80,
  xOffset = 0,
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let gsapModule: typeof import("@/lib/gsap") | null = null;

    const initParallax = async () => {
      gsapModule = await import("@/lib/gsap");
      const { gsap, ScrollTrigger, initGSAP } = gsapModule;
      initGSAP();

      if (!ref.current) return;

      const tween = gsap.fromTo(
        ref.current,
        { y: 0, x: 0 },
        {
          y: yOffset,
          x: xOffset,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      return () => {
        tween.kill();
      };
    };

    const cleanup = initParallax();
    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, [yOffset, xOffset]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
