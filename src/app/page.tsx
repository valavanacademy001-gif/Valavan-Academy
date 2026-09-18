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
  getMarqueeRibbonData,
  getLearnCreateGrowData,
  getPublishedPrograms,
  getCareerJourneyData,
  getSkillStackData,
  getCertificationsSectionData,
  getPublishedLearnerStories,
  getCommunitySectionData,
  getPublishedTestimonials,
  getFinalCTAData,
  getSectionVisibilityMap,
} from "@/lib/cms";

export default async function HomePage() {
  const [
    heroData,
    marqueeItems,
    learnCreateGrowData,
    programs,
    careerJourneyData,
    skillStackData,
    certificationsSection,
    learnerStories,
    communityData,
    testimonials,
    finalCtaData,
    visibilityMap,
  ] = await Promise.all([
    getHeroData(),
    getMarqueeRibbonData(),
    getLearnCreateGrowData(),
    getPublishedPrograms(),
    getCareerJourneyData(),
    getSkillStackData(),
    getCertificationsSectionData(),
    getPublishedLearnerStories(),
    getCommunitySectionData(),
    getPublishedTestimonials(),
    getFinalCTAData(),
    getSectionVisibilityMap("home"),
  ]);

  return (
    <>
      {/* 01 — Hero: Full-screen video + headline + CTA */}
      {visibilityMap.hero !== false && <HeroSection heroData={heroData} />}

      {/* 02 — Marquee Ribbon */}
      {visibilityMap.marquee_ribbon !== false && <MarqueeRibbon items={marqueeItems} />}

      {/* 03 — Learn → Practice → Create → Grow (scroll storytelling) */}
      {visibilityMap.learn_create_grow !== false && <LearnCreateGrowSection meta={learnCreateGrowData} />}

      {/* 04 — Programs (Choose Your Learning Path) */}
      {visibilityMap.programs !== false && <ProgramsSection programs={programs} />}

      {/* 05 — Career Journey (5-Step Milestone Path) */}
      {visibilityMap.career_journey !== false && <CareerJourneySection meta={careerJourneyData} />}

      {/* 06 — Skill Stack Experience */}
      {visibilityMap.skill_stack !== false && <SkillStackSection />}

      {/* 07 — Certifications (arc gallery + lightbox) */}
      {visibilityMap.certifications !== false && (
        <CertificationsSection
          certifications={certificationsSection.certifications}
          meta={certificationsSection.meta}
        />
      )}

      {/* 08 — Real People, Real Transformations (curved video carousel) */}
      {visibilityMap.learner_stories !== false && <VideoTestimonialCarousel stories={learnerStories} />}

      {/* 09 — Community (solid blue) */}
      {visibilityMap.community !== false && <CommunitySection meta={communityData} />}

      {/* 10 — Student Reviews (masonry testimonials) */}
      {visibilityMap.testimonials !== false && <StudentReviewsSection reviews={testimonials} />}

      {/* 11 — Final CTA */}
      {visibilityMap.cta !== false && <FinalCTASection meta={finalCtaData} />}
    </>
  );
}
