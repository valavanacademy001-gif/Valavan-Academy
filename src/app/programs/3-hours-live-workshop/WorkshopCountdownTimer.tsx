"use client";

import React, { useEffect, useState } from "react";

export default function WorkshopCountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return { days: 5, hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="pt-3">
      <span className="text-[12px] text-[#D97706] font-bold uppercase tracking-wider block mb-2.5">
        ⏳ Price Increases Soon in:
      </span>
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 font-mono text-sm sm:text-base font-bold">
        {/* Days */}
        <div className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#F0F5FF] border border-[#BFDBFE] text-[#1748BB] shadow-sm min-w-[52px]">
          <span className="text-base sm:text-lg font-extrabold text-[#1748BB] block leading-tight">
            {formatNumber(timeLeft.days)}
          </span>
          <span className="text-[9px] text-[#1748BB]/70 block font-sans font-semibold uppercase">Days</span>
        </div>
        <span className="text-[#1748BB] font-bold">:</span>

        {/* Hours */}
        <div className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#F0F5FF] border border-[#BFDBFE] text-[#1748BB] shadow-sm min-w-[52px]">
          <span className="text-base sm:text-lg font-extrabold text-[#1748BB] block leading-tight">
            {formatNumber(timeLeft.hours)}
          </span>
          <span className="text-[9px] text-[#1748BB]/70 block font-sans font-semibold uppercase">Hrs</span>
        </div>
        <span className="text-[#1748BB] font-bold">:</span>

        {/* Mins */}
        <div className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#F0F5FF] border border-[#BFDBFE] text-[#1748BB] shadow-sm min-w-[52px]">
          <span className="text-base sm:text-lg font-extrabold text-[#1748BB] block leading-tight">
            {formatNumber(timeLeft.minutes)}
          </span>
          <span className="text-[9px] text-[#1748BB]/70 block font-sans font-semibold uppercase">Mins</span>
        </div>
        <span className="text-[#1748BB] font-bold">:</span>

        {/* Secs */}
        <div className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#F0F5FF] border border-[#BFDBFE] text-[#1748BB] shadow-sm min-w-[52px]">
          <span className="text-base sm:text-lg font-extrabold text-[#1748BB] block leading-tight">
            {formatNumber(timeLeft.seconds)}
          </span>
          <span className="text-[9px] text-[#1748BB]/70 block font-sans font-semibold uppercase">Secs</span>
        </div>
      </div>
    </div>
  );
}
