import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import MarqueeRibbon from "@/components/sections/MarqueeRibbon";
import LearnCreateGrowSection from "@/components/sections/LearnCreateGrowSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import CareerJourneySection from "@/components/sections/CareerJourneySection";
import SkillStackSection from "@/components/sections/SkillStackSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import VideoTestimonialCarousel from "@/components/sections/VideoTestimonialCarousel";
import CommunitySection from "@/components/sections/CommunitySection";
import StudentReviewsSection from "@/components/sections/StudentReviewsSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import { SITE_CONFIG } from "@/data/site.config";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — Your Career Changing Partner`,
  description:
    "Tamil-first creative learning platform for digital skills — Graphic Design, Video Editing, Web Design, UI/UX, and AI Tools. Learn, practice, create, and grow.",
  openGraph: {
    title: `${SITE_CONFIG.name} — Your Career Changing Partner`,
    description:
      "Tamil-first creative learning platform for digital skills. Learn practical skills, build real projects, and create your future.",
    type: "website",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

import {
  getHeroData,
  getPublishedPrograms,
  getPublishedCertifications,
  getPublishedLearnerStories,
  getPublishedTestimonials,
} from "@/lib/cms";

export default async function HomePage() {
  const [heroData, programs, certifications, learnerStories, testimonials] = await Promise.all([
    getHeroData(),
    getPublishedPrograms(),
    getPublishedCertifications(),
    getPublishedLearnerStories(),
    getPublishedTestimonials(),
  ]);

  return (
    <>
      {/* 01 — Hero: Full-screen video + headline + CTA */}
      <HeroSection heroData={heroData} />

      {/* 02 — Marquee Ribbon */}
      <MarqueeRibbon />

      {/* 03 — Learn → Practice → Create → Grow (scroll storytelling) */}
      <LearnCreateGrowSection />

      {/* 04 — Programs (Choose Your Learning Path) */}
      <ProgramsSection programs={programs} />

      {/* 05 — Career Journey (5-Step Milestone Path) */}
      <CareerJourneySection />

      {/* 06 — Skill Stack Experience */}
      <SkillStackSection />

      {/* 07 — Certifications (arc gallery + lightbox) */}
      <CertificationsSection certifications={certifications} />

      {/* 08 — Real People, Real Transformations (curved video carousel) */}
      <VideoTestimonialCarousel stories={learnerStories} />

      {/* 09 — Community (solid blue) */}
      <CommunitySection />

      {/* 10 — Student Reviews (masonry testimonials) */}
      <StudentReviewsSection reviews={testimonials} />

      {/* 11 — Final CTA */}
      <FinalCTASection />
    </>
  );
}
