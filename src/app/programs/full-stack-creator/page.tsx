import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EXTERNAL_URLS } from "@/data/site.config";
import Container from "@/components/ui/Container";
import { ArrowLeft, ArrowRight, Sparkles, Clock, Globe, BarChart, Layers, Video, Palette, Layout, Bot, Briefcase, Megaphone } from "lucide-react";
import ProgramHeroInteractive from "@/components/sections/ProgramHeroInteractive";
import ToolsCoveredSection, { ToolItem, extractToolsFromMap } from "@/components/sections/ToolsCoveredSection";
import ProgramSyllabusMapSection from "@/components/sections/ProgramSyllabusMapSection";
import SkillsMoneyCarouselSection from "@/components/sections/SkillsMoneyCarouselSection";
import VideoTestimonialCarousel from "@/components/sections/VideoTestimonialCarousel";
import ProgramCertificationSection from "@/components/sections/ProgramCertificationSection";
import CreatorEconomyBoomSection from "@/components/sections/CreatorEconomyBoomSection";
import WhoIsThisForSection from "@/components/sections/WhoIsThisForSection";
import GuidanceMentorsSection from "@/components/sections/GuidanceMentorsSection";
import FullStackCreatorOfferSection from "@/components/sections/FullStackCreatorOfferSection";
import ProgramDesignJourneyCTASection from "@/components/sections/ProgramDesignJourneyCTASection";
import ProgramFAQSection from "@/components/sections/ProgramFAQSection";
import ProgramStickyBottomCTA from "@/components/sections/ProgramStickyBottomCTA";
import FullStackFinalCTASection from "@/components/sections/FullStackFinalCTASection";

const FULL_STACK_TOOLS: ToolItem[] = [
  { name: "Adobe Premiere Pro", logo: "/assets/tools/premiere-pro.png" },
  { name: "Adobe After Effects", logo: "/assets/tools/after-effects.png" },
  { name: "WordPress CMS", logo: "/assets/tools/wordpress.png" },
  { name: "Elementor Pro", logo: "/assets/tools/elementor-pro.png" },
  { name: "ChatGPT AI", logo: "/assets/tools/chatgpt.png" },
  { name: "Google Gemini AI", logo: "/assets/tools/gemini-ai.png" },
  { name: "Adobe Photoshop", logo: "/assets/tools/ps.png" },
  { name: "Adobe Illustrator", logo: "/assets/tools/illustrator.png" },
];

import { generatePageMetadata, getPageSEO } from "@/lib/seo";
import JsonLdSchema from "@/components/seo/JsonLdSchema";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("/programs/full-stack-creator");
}

const SKILLS_COVERED = [
  {
    icon: Video,
    title: "Video Editing & Production",
    desc: "Premiere Pro, DaVinci Resolve, CapCut, storytelling rhythms, viral pacing, and YouTube workflow.",
  },
  {
    icon: Layout,
    title: "Modern Web Design & WordPress",
    desc: "HTML/CSS foundations, responsive layouts, WordPress & Elementor, and conversion-optimized websites.",
  },
  {
    icon: Palette,
    title: "UI/UX Design Systems",
    desc: "Figma wireframing, interactive prototyping, mobile app UI principles, design tokens, and user research.",
  },
  {
    icon: Bot,
    title: "AI Tools & Automation",
    desc: "ChatGPT for scripting, Midjourney/Firefly for graphics, ElevenLabs voice cloning, and workflow automation.",
  },
  {
    icon: Briefcase,
    title: "Freelancing & Client Acquisition",
    desc: "Upwork & Fiverr mastery, cold outreach scripts, proposal writing, portfolio building, and pricing psychology.",
  },
  {
    icon: Megaphone,
    title: "Personal Branding & Growth",
    desc: "Building a personal brand on YouTube, Instagram, LinkedIn, audience monetization, and digital products.",
  },
];

const CAREER_ROLES = [
  "Full Stack Digital Creator",
  "Senior Video Editor",
  "Web Designer",
  "UI/UX Designer",
  "Freelance Consultant",
  "Content Strategist",
  "Brand Designer",
  "YouTube Producer",
];

const FULL_STACK_FAQS = [
  {
    question: "Is This Beginner Friendly?",
    answer:
      "Yes, 100%! We start from scratch with fundamental design principles, software basics, and step-by-step practical exercises before moving to advanced topics.",
  },
  {
    question: "Do I Need Coding Knowledge?",
    answer:
      "No prior coding or technical knowledge is required. You will learn modern visual website builders, AI tools, and practical no-code frameworks anyone can master.",
  },
  {
    question: "How Long Is The Program?",
    answer:
      "The curriculum is structured across 6 months of comprehensive learning, plus you receive lifetime access to all lessons, course updates, and resources.",
  },
  {
    question: "Will I Build A Portfolio?",
    answer:
      "Yes! Throughout the program, you will complete hands-on client-ready projects in video editing, graphic design, AI content, and web development to build an industry-ready portfolio.",
  },
  {
    question: "Can Students Join?",
    answer:
      "Absolutely! School and college students can easily follow along to build high-income creative skills early, prepare for internships, or launch freelance careers while studying.",
  },
  {
    question: "Can Freelancers Join?",
    answer:
      "Yes! If you are a freelancer or creator, this program helps you expand beyond a single service into full-stack creative execution so you can charge premium rates for complete client solutions.",
  },
  {
    question: "Do I Get Community Support?",
    answer:
      "Yes! You get direct access to our exclusive creators community, peer discussions, mentor feedback sessions, and continuous support to clarify your doubts.",
  },
  {
    question: "How Is This Different From Other Courses?",
    answer:
      "Most courses teach only a single tool (like just Premiere or just Figma). Valavan Academy teaches the complete interconnected creative ecosystem — combining Design, Video, Web, and AI into one unstoppable skillset.",
  },
  {
    question: "Will AI Replace Creative Professionals?",
    answer:
      "AI will not replace creators, but creators who use AI will replace those who don't. This program teaches you to work alongside AI to produce 10x faster and deliver higher-value creative work.",
  },
  {
    question: "What Happens After Completing The Program?",
    answer:
      "You will receive an Industry-Recognized Certification, have a complete multi-disciplinary portfolio, and have lifetime access to the community, job opportunities, and freelancing roadmaps.",
  },
];

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { HighlightItem } from "@/components/sections/ProgramHeroInteractive";
import { getProgramBySlug, getFullStackCreatorProgramData } from "@/lib/cms";

function resolveProgramTools(
  softwareTools: unknown,
  fallbackTools: ToolItem[]
): ToolItem[] {
  if (!Array.isArray(softwareTools) || softwareTools.length === 0) {
    return fallbackTools;
  }
  return softwareTools.map((t) => {
    if (typeof t === "string") {
      const match = fallbackTools.find(
        (f) => f.name.toLowerCase() === t.toLowerCase()
      );
      if (match) return match;
      const toolFile = t.toLowerCase().replace(/[^a-z0-9]/g, "-");
      return { name: t, logo: `/assets/tools/${toolFile}.png` };
    }
    if (typeof t === "object" && t !== null && "name" in t) {
      const obj = t as { name: string; image?: string; logo?: string };
      return {
        name: obj.name,
        logo: obj.image || obj.logo || "/assets/tools/ps.png",
      };
    }
    return { name: String(t), logo: "/assets/tools/ps.png" };
  });
}

export default async function FullStackCreatorPage() {
  const [cmsProgram, cmsData, pageSEO] = await Promise.all([
    getProgramBySlug("full-stack-creator"),
    getFullStackCreatorProgramData(),
    getPageSEO("/programs/full-stack-creator"),
  ]);

  const heroMap = cmsData.hero || {};
  const toolsMap = cmsData.tools || {};
  const syllabusMap = cmsData.syllabus || {};
  const skillsMoneyMap = cmsData.skillsMoney || {};
  const certMap = cmsData.certification || {};
  const economyMap = cmsData.creatorEconomy || {};
  const bonusMap = cmsData.templatesBonus || {};
  const whoMap = cmsData.whoIsThisFor || {};
  const mentorMap = cmsData.mentors || {};
  const offerMap = cmsData.offer || {};
  const finalCtaMap = cmsData.finalCta || {};
  const faqMap = cmsData.faq || {};
  const stickyMap = cmsData.sticky || {};

  const toolsList = resolveProgramTools(cmsProgram?.software_tools, FULL_STACK_TOOLS);

  const duration = heroMap.highlight_duration || cmsProgram?.duration || "6 Months";
  const title = cmsProgram?.title || "Full Stack Creative Master";
  const description =
    heroMap.description ||
    "Master Design, Video Editing, AI, Websites & Ai App Dev and Combine it all to Build A Future-Proof Creative Career In The AI Era.";
  const imageSrc = heroMap.hero_image || cmsProgram?.banner_url || cmsProgram?.thumbnail_url || "/assets/images/hero/full-stack-.jpg-1.webp";
  const enrollUrl = heroMap.enroll_url || cmsProgram?.cta_url || EXTERNAL_URLS.enrollFullStack;
  const buttonText = "Download Brochure";
  const buttonUrl = "/brochure/full-stack-creator-brochure.pdf";
  const buttonDownload = "Full-Stack-Creative-Master-Brochure.pdf";
  const secondaryButtonText = "🚀 Join The Program";
  const secondaryButtonUrl = enrollUrl;

  const highlights: HighlightItem[] = [
    { iconType: "students", value: heroMap.stat_students || "10,000+ Students" },
    { iconType: "skills", value: heroMap.stat_skills || heroMap.stat_projects || "6 Core Skill Areas" },
    { iconType: "lessons", value: heroMap.stat_lessons || "200+ Lessons" },
    { iconType: "access", value: heroMap.stat_access || "Lifetime Access" },
    { iconType: "ai", value: heroMap.stat_ai || heroMap.stat_guidance || "AI Integrated Learning" },
  ];

  const titlePrefix =
    heroMap.title_prefix && heroMap.title_prefix !== "Become A Full Stack "
      ? heroMap.title_prefix
      : "BECOME A\nFULL STACK";
  const titleHighlight =
    heroMap.title_highlight && heroMap.title_highlight !== "Digital Creator."
      ? heroMap.title_highlight
      : "CREATIVE MASTER.";

  return (
    <main className="min-h-screen bg-white">
      <JsonLdSchema pageSEO={pageSEO} />
      {/* ── 01 Interactive Expanding Hero Section ── */}
      <ProgramHeroInteractive
        badge={heroMap.badge || `Flagship Track · ${duration} · Tamil`}
        titlePrefix={titlePrefix}
        titleHighlight={titleHighlight}
        description={description}
        highlights={highlights}
        imageSrc={imageSrc}
        altText={title}
        enrollUrl={enrollUrl}
        buttonText={buttonText}
        buttonUrl={buttonUrl}
        buttonDownload={buttonDownload}
        secondaryButtonText={secondaryButtonText}
        secondaryButtonUrl={secondaryButtonUrl}
      />

      {/* ── 02 Master Industry Standard Creative Tools ── */}
      <ToolsCoveredSection
        badge={toolsMap.badge || "FULL STACK SUITE"}
        titlePrefix={toolsMap.title_prefix || "Master the Complete"}
        titleHighlight={toolsMap.title_highlight || "Creative Arsenal."}
        subtitle={toolsMap.description || "Learn Premiere Pro, After Effects, Figma, Webflow, WordPress, and cutting-edge Generative AI."}
        tools={toolsList}
        toolsMap={toolsMap}
      />

      {/* ── 03 The Full Stack Creative Framework (Why Fullstack) ── */}
      <ProgramSyllabusMapSection
        badge="WHY FULLSTACK"
        title="THE FULL STACK CREATIVE FRAMEWORK™"
        subtitle="Master the 6 interconnected pillars that turn you into an unstoppable creative leader in the AI era."
        syllabusMap={syllabusMap}
      />

      {/* ── 04 Learn Skills That Actually Make Money (Infinite 3D Floating Carousel) ── */}
      <SkillsMoneyCarouselSection
        skillsMoneyMap={skillsMoneyMap}
      />

      {/* ── 05 Student Success Stories Video Carousel ── */}
      <VideoTestimonialCarousel
        centered={true}
        titlePrefix="Our Students"
        titleHighlight="Success"
        titleSuffix="Stories"
      />

      {/* ── 06 Industry Ready Certification Section ── */}
      <ProgramCertificationSection
        certMap={certMap}
        enrollUrl={enrollUrl}
      />

      {/* ── 07 Creator Economy : Why Is Full Stack Creative Booming (Why Now) ── */}
      <div className="relative min-h-[135vh] sm:min-h-[145vh] lg:min-h-[155vh]">
        <div className="sticky top-4 sm:top-8 md:top-12 z-10">
          <CreatorEconomyBoomSection
            badge="WHY NOW"
            titlePrefix="Why Is Full Stack Creative"
            titleHighlight="Booming?"
            economyMap={economyMap}
          />
        </div>
      </div>

      {/* ── 08 Who Is This For (5 Persona Blue Cards with Enroll CTA) ── */}
      <WhoIsThisForSection
        whoMap={whoMap}
        enrollUrl={enrollUrl}
      />

      {/* ── 10 Guidance From Experienced Mentors (Why Choose Valavan Academy + Team Photo) ── */}
      <GuidanceMentorsSection
        mentorMap={mentorMap}
      />

      {/* ── 11 AI Powered Full Stack Creator System (Offer Box & Join Today) ── */}
      <FullStackCreatorOfferSection
        enrollUrl={offerMap.enroll_url || enrollUrl}
        durationText={offerMap.duration_text || duration}
        offerMap={offerMap}
      />

      {/* ── 12 Pre-FAQ Future Section ── */}
      <ProgramDesignJourneyCTASection
        badge="THE FUTURE OF CREATIVITY"
        titlePrefix="The Future Belongs To "
        titleHighlight="Creators."
        headlineSub="The Advantage No Longer Belongs To People Who Know One Tool."
        description="It Belongs To People Who Can Connect Multiple Skills And Create Results."
        primaryBtnText="🚀 Join The Program"
        primaryBtnUrl={enrollUrl}
        secondaryBtnText="Download Brochure"
        secondaryBtnUrl="/brochure/full-stack-creator-brochure.pdf"
        secondaryBtnDownload="Full-Stack-Creative-Master-Brochure.pdf"
        footerSubtext="Build Skills. Create Opportunities. Shape Your Future. — Valavan Academy 🚀"
      />

      {/* ── 13 Frequently Asked Questions (10 Core Program FAQs) ── */}
      <ProgramFAQSection
        badge="FAQ"
        titlePrefix="Your Questions,"
        titleHighlight="Answered"
        subtitle="Everything you need to know about the Full Stack Creative Master program, learning roadmap, and career opportunities."
        faqs={FULL_STACK_FAQS}
        faqMap={faqMap}
      />

      {/* ── 14 Final Call to Action ── */}
      <FullStackFinalCTASection
        brochureUrl="/brochure/full-stack-creator-brochure.pdf"
        brochureFileName="Full-Stack-Creative-Master-Brochure.pdf"
        enrollUrl={enrollUrl}
      />

      {/* ── 15 Full-Width Sticky Bottom Enrollment Action Bar ── */}
      <ProgramStickyBottomCTA
        enrollUrl={stickyMap.enroll_url || enrollUrl}
        text={stickyMap.notice_text || "Limited Seats Only"}
        buttonText={stickyMap.button_text || "ENROLL NOW"}
      />
    </main>
  );
}

