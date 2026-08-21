"use client";

import React from "react";

interface PixelBackgroundProps {
  className?: string;
}

/**
 * InteractiveGridBackground — Pixelated Mosaic Gradient Texture
 * Pure pixel effect without full-screen grid lines.
 * Stepped pixel squares fading gracefully from soft brand blue to pure white.
 * Tuned with ultra-soft opacity on mobile for crystal clear text readability.
 */
export default function InteractiveGridBackground({
  className = "",
}: PixelBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
    >
      {/* 1. Primary Pixel Mosaic Cluster (Top-Right Area) */}
      <div className="absolute -top-8 -right-8 w-[380px] sm:w-[540px] h-[340px] sm:h-[480px] opacity-30 sm:opacity-85 transition-opacity">
        <svg
          viewBox="0 0 360 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Faint Outer Fringe Pixels (Opacity 0.025 - 0.035) */}
          <g fill="#1748BB" fillOpacity="0.025">
            <rect x="0" y="80" width="40" height="40" rx="4" />
            <rect x="40" y="40" width="40" height="40" rx="4" />
            <rect x="80" y="0" width="40" height="40" rx="4" />
            <rect x="40" y="160" width="40" height="40" rx="4" />
            <rect x="80" y="200" width="40" height="40" rx="4" />
            <rect x="120" y="240" width="40" height="40" rx="4" />
            <rect x="160" y="280" width="40" height="40" rx="4" />
            <rect x="0" y="120" width="40" height="40" rx="4" />
            <rect x="40" y="80" width="40" height="40" rx="4" />
          </g>

          {/* Light Step Pixels (Opacity ~0.05) */}
          <g fill="#1748BB" fillOpacity="0.05">
            <rect x="80" y="80" width="40" height="40" rx="4" />
            <rect x="120" y="40" width="40" height="40" rx="4" />
            <rect x="160" y="0" width="40" height="40" rx="4" />
            <rect x="80" y="120" width="40" height="40" rx="4" />
            <rect x="120" y="160" width="40" height="40" rx="4" />
            <rect x="160" y="200" width="40" height="40" rx="4" />
            <rect x="200" y="240" width="40" height="40" rx="4" />
            <rect x="120" y="80" width="40" height="40" rx="4" />
            <rect x="160" y="40" width="40" height="40" rx="4" />
            <rect x="200" y="0" width="40" height="40" rx="4" />
          </g>

          {/* Medium Step Pixels (Opacity ~0.08) */}
          <g fill="#1748BB" fillOpacity="0.08">
            <rect x="160" y="80" width="40" height="40" rx="4" />
            <rect x="200" y="40" width="40" height="40" rx="4" />
            <rect x="240" y="0" width="40" height="40" rx="4" />
            <rect x="160" y="120" width="40" height="40" rx="4" />
            <rect x="200" y="80" width="40" height="40" rx="4" />
            <rect x="240" y="40" width="40" height="40" rx="4" />
            <rect x="200" y="120" width="40" height="40" rx="4" />
            <rect x="200" y="160" width="40" height="40" rx="4" />
            <rect x="240" y="200" width="40" height="40" rx="4" />
            <rect x="240" y="160" width="40" height="40" rx="4" />
          </g>

          {/* Core Deep Pixels (Opacity ~0.12) */}
          <g fill="#1748BB" fillOpacity="0.12">
            <rect x="240" y="80" width="40" height="40" rx="4" />
            <rect x="280" y="40" width="40" height="40" rx="4" />
            <rect x="320" y="0" width="40" height="40" rx="4" />
            <rect x="280" y="80" width="40" height="40" rx="4" />
            <rect x="320" y="40" width="40" height="40" rx="4" />
            <rect x="240" y="120" width="40" height="40" rx="4" />
            <rect x="280" y="120" width="40" height="40" rx="4" />
            <rect x="320" y="80" width="40" height="40" rx="4" />
            <rect x="280" y="160" width="40" height="40" rx="4" />
            <rect x="320" y="120" width="40" height="40" rx="4" />
            <rect x="320" y="160" width="40" height="40" rx="4" />
          </g>
        </svg>
      </div>

      {/* 2. Secondary Pixel Mosaic Cluster (Bottom-Left Area) */}
      <div className="absolute -bottom-10 -left-10 w-[300px] sm:w-[420px] h-[280px] sm:h-[380px] opacity-25 sm:opacity-75 transition-opacity">
        <svg
          viewBox="0 0 280 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <g fill="#1748BB" fillOpacity="0.025">
            <rect x="120" y="0" width="40" height="40" rx="4" />
            <rect x="160" y="40" width="40" height="40" rx="4" />
            <rect x="200" y="80" width="40" height="40" rx="4" />
            <rect x="240" y="120" width="40" height="40" rx="4" />
          </g>
          <g fill="#1748BB" fillOpacity="0.05">
            <rect x="80" y="40" width="40" height="40" rx="4" />
            <rect x="120" y="80" width="40" height="40" rx="4" />
            <rect x="160" y="120" width="40" height="40" rx="4" />
            <rect x="200" y="160" width="40" height="40" rx="4" />
            <rect x="80" y="80" width="40" height="40" rx="4" />
            <rect x="120" y="120" width="40" height="40" rx="4" />
          </g>
          <g fill="#1748BB" fillOpacity="0.08">
            <rect x="40" y="80" width="40" height="40" rx="4" />
            <rect x="80" y="120" width="40" height="40" rx="4" />
            <rect x="120" y="160" width="40" height="40" rx="4" />
            <rect x="0" y="120" width="40" height="40" rx="4" />
            <rect x="40" y="160" width="40" height="40" rx="4" />
            <rect x="80" y="200" width="40" height="40" rx="4" />
          </g>
          <g fill="#1748BB" fillOpacity="0.12">
            <rect x="0" y="160" width="40" height="40" rx="4" />
            <rect x="40" y="200" width="40" height="40" rx="4" />
            <rect x="0" y="200" width="40" height="40" rx="4" />
          </g>
        </svg>
      </div>

      {/* 3. Ambient Soft Blue Glow behind pixels */}
      <div className="absolute top-1/4 right-1/4 w-[320px] sm:w-[420px] h-[260px] sm:h-[340px] bg-[#EFF4FF] rounded-full blur-[90px] sm:blur-[110px] pointer-events-none opacity-40 sm:opacity-100" />
    </div>
  );
}
