import type { Metadata } from "next";
import dynamicImport from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import MarqueeRibbon from "@/components/sections/MarqueeRibbon";
import { SITE_CONFIG } from "@/data/site.config";

// Below-the-fold components dynamically imported for ultra-fast initial bundle & LCP
const LearnCreateGrowSection = dynamicImport(() => import("@/components/sections/LearnCreateGrowSection"));
const ProgramsSection = dynamicImport(() => import("@/components/sections/ProgramsSection"));
const CareerJourneySection = dynamicImport(() => import("@/components/sections/CareerJourneySection"));
const SkillStackSection = dynamicImport(() => import("@/components/sections/SkillStackSection"));
const CertificationsSection = dynamicImport(() => import("@/components/sections/CertificationsSection"));
const VideoTestimonialCarousel = dynamicImport(() => import("@/components/sections/VideoTestimonialCarousel"));
const CommunitySection = dynamicImport(() => import("@/components/sections/CommunitySection"));
const StudentReviewsSection = dynamicImport(() => import("@/components/sections/StudentReviewsSection"));
const FinalCTASection = dynamicImport(() => import("@/components/sections/FinalCTASection"));

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
  getProgramsSectionData,
  getPublishedPrograms,
  getCareerJourneyData,
  getSkillStackData,
  getCertificationsSectionData,
  getPublishedLearnerStories,
  getLearnerStoriesData,
  getCommunitySectionData,
  getPublishedTestimonials,
  getTestimonialsSectionData,
  getFinalCTAData,
  getSectionVisibilityMap,
} from "@/lib/cms";

export default async function HomePage() {
  const [
    heroData,
    marqueeItems,
    learnCreateGrowData,
    programsData,
    programs,
    careerJourneyData,
    skillStackData,
    certificationsSection,
    learnerStories,
    learnerStoriesData,
    communityData,
    testimonials,
    testimonialsSectionData,
    finalCtaData,
    visibilityMap,
  ] = await Promise.all([
    getHeroData(),
    getMarqueeRibbonData(),
    getLearnCreateGrowData(),
    getProgramsSectionData(),
    getPublishedPrograms(),
    getCareerJourneyData(),
    getSkillStackData(),
    getCertificationsSectionData(),
    getPublishedLearnerStories(),
    getLearnerStoriesData(),
    getCommunitySectionData(),
    getPublishedTestimonials(),
    getTestimonialsSectionData(),
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
      {visibilityMap.programs !== false && <ProgramsSection programs={programs} meta={programsData} />}

      {/* 05 — Career Journey (5-Step Milestone Path) */}
      {visibilityMap.career_journey !== false && <CareerJourneySection meta={careerJourneyData} />}

      {/* 06 — Skill Stack Experience */}
      {visibilityMap.skill_stack !== false && <SkillStackSection meta={skillStackData} />}

      {/* 07 — Certifications (arc gallery + lightbox) */}
      {visibilityMap.certifications !== false && (
        <CertificationsSection
          certifications={certificationsSection.certifications}
          meta={certificationsSection.meta}
        />
      )}

      {/* 08 — Real People, Real Transformations (curved video carousel) */}
      {visibilityMap.learner_stories !== false && (
        <VideoTestimonialCarousel
          stories={learnerStories}
          meta={learnerStoriesData}
        />
      )}

      {/* 09 — Community (solid blue) */}
      {visibilityMap.community !== false && <CommunitySection meta={communityData} />}

      {/* 10 — Student Reviews (masonry testimonials) */}
      {visibilityMap.testimonials !== false && (
        <StudentReviewsSection
          reviews={testimonials}
          meta={testimonialsSectionData}
        />
      )}

      {/* 11 — Final CTA */}
      {visibilityMap.cta !== false && <FinalCTASection meta={finalCtaData} />}
    </>
  );
}

