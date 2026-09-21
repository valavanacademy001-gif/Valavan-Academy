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
import TemplatesWorldBonusSection from "@/components/sections/TemplatesWorldBonusSection";
import WhoIsThisForSection from "@/components/sections/WhoIsThisForSection";
import GuidanceMentorsSection from "@/components/sections/GuidanceMentorsSection";
import FullStackCreatorOfferSection from "@/components/sections/FullStackCreatorOfferSection";
import ProgramDesignJourneyCTASection from "@/components/sections/ProgramDesignJourneyCTASection";
import ProgramFAQSection from "@/components/sections/ProgramFAQSection";
import ProgramStickyBottomCTA from "@/components/sections/ProgramStickyBottomCTA";

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

export const metadata: Metadata = {
  title: "Full Stack Digital Creator Program — Valavan Academy",
  description:
    "Become a Full Stack Digital Creator with Valavan Academy. Learn Video Editing, Web Design, UI/UX, AI Tools, and more — in Tamil.",
  openGraph: {
    title: "Full Stack Digital Creator Program | Valavan Academy",
    description:
      "Master high-income digital skills in 6 months. Practical Tamil-language program with real projects.",
  },
};

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
    desc: "ChatGPT workflows, Midjourney, Adobe Firefly, automated content repurposing, and AI productivity tools.",
  },
  {
    icon: Briefcase,
    title: "Freelancing & Client Acquisition",
    desc: "Fiverr, Upwork, international client communication, proposal writing, contract drafting, and high-ticket pricing.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing & Branding",
    desc: "Personal branding, social media distribution strategy, content funnels, and monetization blueprints.",
  },
];

const CAREER_PATHS = [
  "Full Stack Creator",
  "Professional Video Editor",
  "Web Designer",
  "UI/UX Designer",
  "Freelance Consultant",
  "Content Strategist",
  "Brand Designer",
  "YouTube Producer",
];

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { HighlightItem } from "@/components/sections/ProgramHeroInteractive";
import { getProgramBySlug, getFullStackCreatorProgramData } from "@/lib/cms";

export default async function FullStackCreatorPage() {
  const [cmsProgram, cmsData] = await Promise.all([
    getProgramBySlug("full-stack-creator"),
    getFullStackCreatorProgramData(),
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

  const duration = heroMap.highlight_duration || cmsProgram?.duration || "6 Months";
  const title = cmsProgram?.title || "Full Stack Digital Creator Program";
  const description = heroMap.description || cmsProgram?.description || "A complete 6-month career transformation program covering Video Editing, Web Design, UI/UX, WordPress, AI Tools, and Freelancing — everything you need to build high-income creative skills in Tamil.";
  const imageSrc = heroMap.hero_image || cmsProgram?.banner_url || cmsProgram?.thumbnail_url || "/assets/images/hero/full-stack-.jpg-1.webp";
  const enrollUrl = heroMap.enroll_url || cmsProgram?.cta_url || EXTERNAL_URLS.signup;
  const buttonText = heroMap.enroll_btn_text || "🚀 Join The Program";
  const secondaryButtonText = heroMap.secondary_btn_text || "📖 View Curriculum";
  const secondaryButtonUrl = heroMap.secondary_btn_url || "#syllabus";

  const highlights: HighlightItem[] = [
    { iconType: "students", value: heroMap.stat_students || "10,000+ Students" },
    { iconType: "skills", value: heroMap.stat_skills || heroMap.stat_projects || "6 Core Skill Areas" },
    { iconType: "lessons", value: heroMap.stat_lessons || "200+ Lessons" },
    { iconType: "access", value: heroMap.stat_access || "Lifetime Access" },
    { iconType: "ai", value: heroMap.stat_ai || heroMap.stat_guidance || "AI Integrated Learning" },
  ];

  const titlePrefix = heroMap.title_prefix || "Become A Full Stack ";
  const titleHighlight = heroMap.title_highlight || "Digital Creator.";

  return (
    <main className="min-h-screen bg-white">
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
        secondaryButtonText={secondaryButtonText}
        secondaryButtonUrl={secondaryButtonUrl}
      />

      {/* ── 02 Master Industry Standard Creative Tools ── */}
      <ToolsCoveredSection
        badge={toolsMap.badge || "FULL STACK SUITE"}
        titlePrefix={toolsMap.title_prefix || "Master the Complete"}
        titleHighlight={toolsMap.title_highlight || "Creative Arsenal."}
        subtitle={toolsMap.description || "Learn Premiere Pro, After Effects, Figma, Webflow, WordPress, and cutting-edge Generative AI."}
        tools={FULL_STACK_TOOLS}
        toolsMap={toolsMap}
      />

      {/* ── 03 Syllabus Mind-Map Section (Why we are different from others) ── */}
      <ProgramSyllabusMapSection
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

      {/* ── 07 Creator Economy : Why is it Booming ? (Animated Growth Chart & Market Demand) ── */}
      <CreatorEconomyBoomSection
        economyMap={economyMap}
      />

      {/* ── 08 Access To Templatesworld (Full-Width Blue Background Centered Bonus Section) ── */}
      <TemplatesWorldBonusSection
        bonusMap={bonusMap}
        enrollUrl={enrollUrl}
      />

      {/* ── 09 Who Is This For (5 Persona Blue Cards with Enroll CTA) ── */}
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

      {/* ── 12 Pre-FAQ Final Call to Action ── */}
      <ProgramDesignJourneyCTASection
        badge=""
        titlePrefix={finalCtaMap.title_prefix || "The Future Belongs To "}
        titleHighlight={finalCtaMap.title_highlight || "Creators."}
        headlineSub={finalCtaMap.headline_sub || "The people who can design, communicate, create content, use AI, and build audiences will have more opportunities than ever before."}
        description={finalCtaMap.description || "Start building those skills today."}
        primaryBtnText={finalCtaMap.primary_btn_text || "🚀 Join The Program"}
        primaryBtnUrl={finalCtaMap.primary_btn_url || enrollUrl}
        secondaryBtnText={finalCtaMap.secondary_btn_text || "📖 Explore Curriculum"}
        secondaryBtnUrl={finalCtaMap.secondary_btn_url || "#syllabus"}
        footerSubtext={finalCtaMap.footer_subtext || "Build Skills. Create Opportunities. Shape Your Future. — Valavan Academy – Empowering The Next Generation Of Digital Creators. 🚀"}
        supportMap={finalCtaMap}
      />

      {/* ── 13 Frequently Asked Questions (2-Column Accordion from 90-days page) ── */}
      <ProgramFAQSection
        faqMap={faqMap}
      />

      {/* ── 13 Full-Width Sticky Bottom Enrollment Action Bar ── */}
      <ProgramStickyBottomCTA
        enrollUrl={stickyMap.enroll_url || enrollUrl}
        text={stickyMap.notice_text || "Limited Seats Only"}
        buttonText={stickyMap.button_text || "ENROLL NOW"}
      />
    </main>
  );
}

