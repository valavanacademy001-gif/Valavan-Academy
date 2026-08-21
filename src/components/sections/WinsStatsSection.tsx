"use client";

/**
 * Valavan Academy — 2500+ Wins and Counting Section
 * Solid primary blue block with growth bar chart graphic and crisp high-contrast white text.
 */

import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";

export default function WinsStatsSection() {
  return (
    <section className="py-20 md:py-28 bg-[#1748BB] text-white relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-[100px] pointer-events-none"
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Heading & Impact description */}
          <div className="lg:col-span-6 space-y-6">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold uppercase tracking-wider">
                PROVEN STUDENT SUCCESS
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2 className="text-[36px] sm:text-[46px] md:text-[54px] font-bold leading-[1.08] tracking-tight font-display text-white">
                2500+ wins <br />
                and counting.
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-lg font-normal">
                From launching first freelance gigs on Upwork to securing senior design roles at leading startups, Valavan Academy learners achieve tangible financial and career breakthroughs.
              </p>
            </FadeUp>

            {/* Quick Metrics Grid */}
            <FadeUp delay={0.3}>
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/25">
                <div>
                  <div className="text-3xl sm:text-4xl font-bold font-display text-white">
                    ₹45K - ₹1.2L
                  </div>
                  <div className="text-xs sm:text-sm text-white/80 mt-1 font-medium">
                    Average Monthly Freelance Income
                  </div>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-bold font-display text-white">
                    94%
                  </div>
                  <div className="text-xs sm:text-sm text-white/80 mt-1 font-medium">
                    Course Completion & Placement Rate
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Stylized Stepped Bar Chart Graphic */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <FadeUp delay={0.2} className="w-full max-w-md">
              <div className="p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl space-y-6">
                
                {/* Stepped Bars Graphic */}
                <div className="flex items-end justify-between gap-3 sm:gap-4 h-64 sm:h-72 px-2 pt-6">
                  
                  {/* Bar 1 */}
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full h-24 rounded-2xl bg-white/40 border border-white/40 shadow-sm" />
                    <span className="text-xs font-semibold text-white/90">Month 1</span>
                  </div>

                  {/* Bar 2 */}
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full h-36 rounded-2xl bg-white/60 border border-white/50 shadow-md" />
                    <span className="text-xs font-semibold text-white/90">Month 2</span>
                  </div>

                  {/* Bar 3 */}
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full h-48 rounded-2xl bg-white/80 border border-white/70 shadow-lg" />
                    <span className="text-xs font-semibold text-white/90">Month 3</span>
                  </div>

                  {/* Bar 4: Peak */}
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full h-60 rounded-2xl bg-white border border-white shadow-xl flex items-center justify-center">
                      <span className="text-[#1748BB] font-bold text-xs">🚀 3X</span>
                    </div>
                    <span className="text-xs font-bold text-white">Graduate</span>
                  </div>

                </div>

                {/* Footer caption under chart */}
                <div className="text-center pt-3 border-t border-white/20">
                  <p className="text-xs sm:text-sm text-white font-medium">
                    Skill Velocity & Income Trajectory of Valavan Academy Graduates
                  </p>
                </div>

              </div>
            </FadeUp>
          </div>

        </div>
      </Container>
    </section>
  );
}
