"use client";

/**
 * Valavan Academy — Smooth Scroll Provider
 * Wraps the app with Lenis smooth scrolling.
 * Integrates with GSAP ScrollTrigger for synchronized scroll-driven animations.
 * Respects prefers-reduced-motion.
 */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Delay scroll reset until Next.js completes page unmount & mount
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
        lenisRef.current.resize();
      }
      ScrollTrigger.refresh();
    }, 60);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    // Respect user's reduced motion preference and bypass on touch/mobile devices
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024;

    if (reducedMotion || isTouch) {
      // Let mobile devices use hardware-accelerated native smooth momentum scrolling without JS interception!
      return;
    }

    // Register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis for desktop
    const lenis = new Lenis({
      duration:         1.1,
      easing:           (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation:      "vertical",
      gestureOrientation: "vertical",
      smoothWheel:      true,
      wheelMultiplier:  0.85,
      touchMultiplier:  1.0,
      infinite:         false,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker to drive Lenis RAF loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's own lag smoothing since Lenis handles it
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
