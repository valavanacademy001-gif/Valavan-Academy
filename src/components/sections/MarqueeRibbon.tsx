/**
 * Valavan Academy — Marquee Ribbon
 * Black ribbon ticker with responsive typography:
 * - Mobile: Sleek compact text size (text-sm), tight padding & fast speed
 * - Desktop: Bold Clash Display typography (text-2xl to text-[32px])
 */

import { DEFAULT_MARQUEE_ITEMS } from "@/lib/cms";

interface MarqueeRibbonProps {
  items?: string[];
}

export default function MarqueeRibbon({ items = DEFAULT_MARQUEE_ITEMS }: MarqueeRibbonProps) {
  const displayItems = items && items.length > 0 ? items : DEFAULT_MARQUEE_ITEMS;

  return (
    <div
      className="relative w-full bg-black text-white py-3 sm:py-7 border-y border-neutral-800 overflow-hidden select-none z-20"
      aria-label="Academy achievements and highlights"
    >
      <div className="flex items-center gap-4 sm:gap-8 whitespace-nowrap animate-marquee">
        {/* First set */}
        {displayItems.map((item, idx) => (
          <div
            key={`a-${idx}`}
            className="flex items-center gap-4 sm:gap-8 shrink-0 text-sm sm:text-2xl md:text-3xl lg:text-[32px] font-extrabold tracking-normal font-display text-white"
          >
            <span className="text-[#769FFF] text-base sm:text-3xl">✦</span>
            <span>{item}</span>
          </div>
        ))}

        {/* Duplicate set for seamless continuous loop */}
        {displayItems.map((item, idx) => (
          <div
            key={`b-${idx}`}
            className="flex items-center gap-4 sm:gap-8 shrink-0 text-sm sm:text-2xl md:text-3xl lg:text-[32px] font-extrabold tracking-normal font-display text-white"
          >
            <span className="text-[#769FFF] text-base sm:text-3xl">✦</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
