"use client";

/**
 * Valavan Academy — ReducedMotionProvider
 * Provides a context for components to check if the user prefers reduced motion.
 * Also applies a class to the root element for CSS-level overrides.
 */

import { createContext, useContext, useEffect, useState } from "react";

interface ReducedMotionContextValue {
  prefersReducedMotion: boolean;
}

const ReducedMotionContext = createContext<ReducedMotionContextValue>({
  prefersReducedMotion: false,
});

export function useIsReducedMotion(): boolean {
  return useContext(ReducedMotionContext).prefersReducedMotion;
}

interface ReducedMotionProviderProps {
  children: React.ReactNode;
}

export default function ReducedMotionProvider({
  children,
}: ReducedMotionProviderProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Apply class to <html> for CSS-level overrides
    document.documentElement.classList.toggle(
      "reduced-motion",
      mediaQuery.matches
    );

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
      document.documentElement.classList.toggle("reduced-motion", event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <ReducedMotionContext.Provider value={{ prefersReducedMotion }}>
      {children}
    </ReducedMotionContext.Provider>
  );
}
