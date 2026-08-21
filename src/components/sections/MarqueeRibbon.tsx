/**
 * Valavan Academy — Marquee Ribbon
 * Black ribbon ticker with responsive typography:
 * - Mobile: Sleek compact text size (text-sm), tight padding & fast speed
 * - Desktop: Bold Clash Display typography (text-2xl to text-[32px])
 */

const RIBBON_ITEMS = [
  "Graphic Design",
  "Video Editing",
  "Web Design",
  "UI/UX",
  "AI Tools",
  "Creative Skills",
  "Career Growth",
  "Tamil-First Learning",
  "Real Projects",
  "Build Your Portfolio",
];

export default function MarqueeRibbon() {
  return (
    <div
      className="relative w-full bg-black text-white py-3 sm:py-7 border-y border-neutral-800 overflow-hidden select-none z-20"
      aria-label="Academy achievements and highlights"
    >
      <div className="flex items-center gap-4 sm:gap-8 whitespace-nowrap animate-marquee">
        {/* First set */}
        {RIBBON_ITEMS.map((item, idx) => (
          <div
            key={`a-${idx}`}
            className="flex items-center gap-4 sm:gap-8 shrink-0 text-sm sm:text-2xl md:text-3xl lg:text-[32px] font-extrabold tracking-normal font-display text-white"
          >
            <span className="text-[#769FFF] text-base sm:text-3xl">✦</span>
            <span>{item}</span>
          </div>
        ))}

        {/* Duplicate set for seamless continuous loop */}
        {RIBBON_ITEMS.map((item, idx) => (
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
