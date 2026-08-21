/**
 * Valavan Academy — GSAP Initialization
 * Client-side only. Registers GSAP plugins and exports configured instance.
 * Import this in client components, not server components.
 */

"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

let initialized = false;

/**
 * Initialize GSAP plugins. Call once at the app root.
 * Safe to call multiple times — only initializes once.
 */
export function initGSAP(): void {
  if (initialized || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Default GSAP configuration
  gsap.defaults({
    ease:     "power2.out",
    duration: 0.7,
  });

  // ScrollTrigger defaults
  ScrollTrigger.defaults({
    toggleActions: "play none none none",
    start:         "top 85%",
  });

  initialized = true;
}

/**
 * Clean up all ScrollTrigger instances.
 * Call this before route changes or component unmounts.
 */
export function cleanupScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

/**
 * Refresh ScrollTrigger (call after layout changes, font loads, etc.)
 */
export function refreshScrollTrigger(): void {
  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };
