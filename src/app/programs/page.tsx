import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import WorkshopSection from "@/components/sections/WorkshopSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import { EXTERNAL_URLS } from "@/data/site.config";

export const metadata: Metadata = {
  title: "Programs — Valavan Academy",
  description:
    "Explore Valavan Academy programs — 90-Day Graphic Design Mastery, Full Stack Digital Creator Program, and 3 Hours Live Workshops. Tamil-medium, project-based digital skills training.",
};

import { getPublishedPrograms } from "@/lib/cms";

export default async function ProgramsPage() {
  const programs = await getPublishedPrograms();

  return (
    <main className="min-h-screen bg-white pt-10 sm:pt-14">
      {/* ── 01 Live Workshop Section ── */}
      <WorkshopSection />

      {/* ── 02 Choose Your Learning Path (Card-Based Program Showcase) ── */}
      <ProgramsSection programs={programs} />

      {/* ── 03 Community Support Strip ── */}
      <section id="community-help" className="py-16 sm:py-20 bg-[#F8FAFF] border-t border-[#E8EFFE] scroll-mt-24">
        <Container>
          <div className="rounded-[28px] bg-white border border-[#BFDBFE]/70 p-8 sm:p-12 shadow-[0_10px_35px_rgba(23,72,187,0.06)] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#1748BB] block">
                Need Guidance?
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#1E2026] leading-snug">
                Not sure which program is right for you?
              </h3>
              <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed">
                Join the Tamil Nadu Creators Club community to talk directly with alumni, mentors, and fellow creators.
              </p>
            </div>
            <a
              href={EXTERNAL_URLS.community}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#FFFFFF" }}
              className="shrink-0 inline-flex items-center gap-2 bg-[#1748BB] hover:bg-[#0A3CA8] !text-white font-sans font-bold text-sm sm:text-base px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 shadow-[0_8px_25px_rgba(23,72,187,0.3)]"
            >
              <span style={{ color: "#FFFFFF" }} className="!text-white font-bold">
                Ask in Community →
              </span>
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
