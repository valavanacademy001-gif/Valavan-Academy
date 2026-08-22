import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EXTERNAL_URLS } from "@/data/site.config";
import Container from "@/components/ui/Container";
import { ArrowLeft, ArrowRight, Sparkles, Clock, Globe, BarChart, Layers, Video, Palette, Layout, Bot, Briefcase, Megaphone } from "lucide-react";
import ProgramHeroInteractive from "@/components/sections/ProgramHeroInteractive";
import ToolsCoveredSection, { ToolItem } from "@/components/sections/ToolsCoveredSection";
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
import { getProgramBySlug } from "@/lib/cms";

export default async function FullStackCreatorPage() {
  const cmsProgram = await getProgramBySlug("full-stack-creator");

  const duration = cmsProgram?.duration || "6 Months";
  const title = cmsProgram?.title || "Full Stack Digital Creator Program";
  const description = cmsProgram?.description || "A complete 6-month career transformation program covering Video Editing, Web Design, UI/UX, WordPress, AI Tools, and Freelancing — everything you need to build high-income creative skills in Tamil.";
  const imageSrc = cmsProgram?.banner_url || cmsProgram?.thumbnail_url || "/assets/images/hero/full-stack-.jpg-1.webp";
  const enrollUrl = cmsProgram?.cta_url || EXTERNAL_URLS.signup;

  const highlights: HighlightItem[] = [
    { iconType: "clock", label: "Duration", value: duration },
    { iconType: "globe", label: "Language", value: "100% Tamil" },
    { iconType: "level", label: "Skill Level", value: cmsProgram?.level === "beginner" ? "Beginner" : "Beginner to Advanced" },
    { iconType: "work", label: "Coverage", value: "6 Major Domains" },
  ];

  // Split title if possible into prefix and highlight
  const titleParts = title.split(" ");
  const titlePrefix = titleParts.length > 2 ? titleParts.slice(0, -2).join(" ") : titleParts.slice(0, -1).join(" ");
  const titleHighlight = titleParts.length > 2 ? titleParts.slice(-2).join(" ") : titleParts.slice(-1).join(" ");

  return (
    <main className="min-h-screen bg-white">
      {/* ── 01 Interactive Expanding Hero Section ── */}
      <ProgramHeroInteractive
        badge={`Flagship Track · ${duration} · Tamil`}
        titlePrefix={titlePrefix || "Full Stack Digital"}
        titleHighlight={titleHighlight ? `${titleHighlight}.` : "Creator Program."}
        description={description}
        highlights={highlights}
        imageSrc={imageSrc}
        altText={title}
        enrollUrl={enrollUrl}
        communityUrl={EXTERNAL_URLS.community}
      />

      {/* ── 02 Master Industry Standard Creative Tools ── */}
      <ToolsCoveredSection tools={FULL_STACK_TOOLS} />

      {/* ── 03 Syllabus Mind-Map Section (Why we are different from others) ── */}
      <ProgramSyllabusMapSection />

      {/* ── 04 Learn Skills That Actually Make Money (Infinite 3D Floating Carousel) ── */}
      <SkillsMoneyCarouselSection />

      {/* ── 05 Student Success Stories Video Carousel ── */}
      <VideoTestimonialCarousel
        centered={true}
        customTitle={
          <>
            Our Students{" "}
            <span style={{ color: "#1748BB" }} className="!text-[#1748BB]">
              Success
            </span>{" "}
            Stories
          </>
        }
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
      <FullStackCreatorOfferSection enrollUrl={EXTERNAL_URLS.signup} />

      {/* ── 12 Frequently Asked Questions (2-Column Accordion from 90-days page) ── */}
      <ProgramFAQSection />

      {/* ── 13 Full-Width Sticky Bottom Enrollment Action Bar ── */}
      <ProgramStickyBottomCTA
        enrollUrl={EXTERNAL_URLS.signup}
        text="Limited Seats Available"
        buttonText="ENROLL NOW"
      />
    </main>
  );
}
