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
  const faqMap = cmsData.faq || {};
  const stickyMap = cmsData.sticky || {};

  const duration = heroMap.highlight_duration || cmsProgram?.duration || "6 Months";
  const title = cmsProgram?.title || "Full Stack Digital Creator Program";
  const description = heroMap.description || cmsProgram?.description || "A complete 6-month career transformation program covering Video Editing, Web Design, UI/UX, WordPress, AI Tools, and Freelancing — everything you need to build high-income creative skills in Tamil.";
  const imageSrc = heroMap.hero_image || cmsProgram?.banner_url || cmsProgram?.thumbnail_url || "/assets/images/hero/full-stack-.jpg-1.webp";
  const enrollUrl = heroMap.enroll_url || cmsProgram?.cta_url || EXTERNAL_URLS.signup;
  const buttonText = heroMap.enroll_btn_text || "Enroll Now";
  const secondaryButtonText = heroMap.secondary_btn_text || "View Curriculum";
  const secondaryButtonUrl = heroMap.secondary_btn_url || "#syllabus";

  const highlights: HighlightItem[] = [
    { iconType: "students", label: "Students Trained", value: heroMap.stat_students || "10,000+" },
    { iconType: "projects", label: "Portfolio Projects", value: heroMap.stat_projects || "25+ Projects" },
    { iconType: "lessons", label: "Learning Lessons", value: heroMap.stat_lessons || "150+ Lessons" },
    { iconType: "access", label: "Course Access", value: heroMap.stat_access || "Lifetime Access" },
    { iconType: "guidance", label: "Mentorship", value: heroMap.stat_guidance || "Expert Guidance" },
  ];

  const titlePrefix = heroMap.title_prefix || "Full Stack Digital";
  const titleHighlight = heroMap.title_highlight || "Creator Program.";

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
      <ProgramSyllabusMapSection />

      {/* ── 04 Learn Skills That Actually Make Money (Infinite 3D Floating Carousel) ── */}
      <SkillsMoneyCarouselSection />

      {/* ── 05 Student Success Stories Video Carousel ── */}
      <VideoTestimonialCarousel
        centered={true}
        titlePrefix="Our Students"
        titleHighlight="Success"
        titleSuffix="Stories"
      />

      {/* ── 06 Industry Ready Certification Section ── */}
      <ProgramCertificationSection />

      {/* ── 07 Creator Economy : Why is it Booming ? (Animated Growth Chart & Market Demand) ── */}
      <CreatorEconomyBoomSection />

      {/* ── 08 Access To Templatesworld (Full-Width Blue Background Centered Bonus Section) ── */}
      <TemplatesWorldBonusSection />

      {/* ── 09 Who Is This For (5 Persona Blue Cards with Enroll CTA) ── */}
      <WhoIsThisForSection />

      {/* ── 10 Guidance From Experienced Mentors (Why Choose Valavan Academy + Team Photo) ── */}
      <GuidanceMentorsSection />

      {/* ── 11 AI Powered Full Stack Creator System (Offer Box & Join Today) ── */}
      <FullStackCreatorOfferSection
        enrollUrl={offerMap.enroll_url || enrollUrl}
        durationText={offerMap.duration_text || duration}
      />

      {/* ── 12 Frequently Asked Questions (2-Column Accordion from 90-days page) ── */}
      <ProgramFAQSection />

      {/* ── 13 Full-Width Sticky Bottom Enrollment Action Bar ── */}
      <ProgramStickyBottomCTA
        enrollUrl={stickyMap.enroll_url || enrollUrl}
        text={stickyMap.notice_text || "Limited Seats Available"}
        buttonText={stickyMap.button_text || "ENROLL NOW"}
      />
    </main>
  );
}

