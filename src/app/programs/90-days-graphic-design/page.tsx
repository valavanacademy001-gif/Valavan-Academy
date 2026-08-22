import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EXTERNAL_URLS } from "@/data/site.config";
import Container from "@/components/ui/Container";
import { ArrowLeft, ArrowRight, Award, CheckCircle2, Sparkles, Layers, Clock, Globe, BarChart } from "lucide-react";
import ProgramHeroInteractive from "@/components/sections/ProgramHeroInteractive";
import ToolsCoveredSection from "@/components/sections/ToolsCoveredSection";
import ProgramRoadmapSection from "@/components/sections/ProgramRoadmapSection";
import PracticalProjectsSection from "@/components/sections/PracticalProjectsSection";
import After90DaysSection from "@/components/sections/After90DaysSection";
import VideoTestimonialCarousel from "@/components/sections/VideoTestimonialCarousel";
import ProgramEnrollmentSupportSection from "@/components/sections/ProgramEnrollmentSupportSection";
import ProgramFAQSection from "@/components/sections/ProgramFAQSection";
import ProgramStickyBottomCTA from "@/components/sections/ProgramStickyBottomCTA";

export const metadata: Metadata = {
  title: "90-Day Graphic Design Mastery Program — Valavan Academy",
  description:
    "Master Graphic Design in 90 days with Valavan Academy. Learn Photoshop, Illustrator, Canva, Logo Design, Branding, and AI-powered design — in Tamil.",
  openGraph: {
    title: "90-Day Graphic Design Mastery | Valavan Academy",
    description:
      "From beginner to confident graphic designer in 90 days. Practical Tamil-language course with real project portfolio.",
  },
};

const CURRICULUM = [
  { week: "Week 1–2", topic: "Design Fundamentals", desc: "Color theory, typography, composition, visual balance, and design hierarchy." },
  { week: "Week 3–4", topic: "Photoshop Mastery", desc: "Photo editing, compositing, retouching, masking, and high-converting posters." },
  { week: "Week 5–6", topic: "Illustrator & Vector Design", desc: "Logo design, vector illustrations, icon sets, and print-ready files." },
  { week: "Week 7–8", topic: "Canva & Social Media Design", desc: "High-engagement templates, YouTube thumbnails, Instagram reels covers, and ad creatives." },
  { week: "Week 9–10", topic: "Branding & Identity Design", desc: "Brand strategy, complete style guides, business stationery, and client presentation mockups." },
  { week: "Week 11–12", topic: "AI-Powered Design Workflows", desc: "Midjourney prompts, Adobe Firefly generation, background expansion, and AI productivity tools." },
  { week: "Week 13", topic: "Portfolio Building & Freelancing", desc: "Curating your top 10 portfolio projects, setting freelance pricing, and onboarding clients." },
];

const TOOLS = [
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Canva Pro",
  "Figma Basics",
  "Adobe Firefly",
  "Midjourney AI",
  "Adobe Lightroom",
];

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { HighlightItem } from "@/components/sections/ProgramHeroInteractive";
import { getProgramBySlug } from "@/lib/cms";

export default async function GraphicDesignProgramPage() {
  const cmsProgram = await getProgramBySlug("90-days-graphic-design");

  const duration = cmsProgram?.duration || "90 Days";
  const title = cmsProgram?.title || "90 Days Graphic Design Mastery Program";
  const description = cmsProgram?.description || "A structured, project-driven career program covering Photoshop, Illustrator, Canva, Logo Design, Social Media Design, Branding, and AI-powered creative workflows — taught completely in practical Tamil.";
  const imageSrc = cmsProgram?.banner_url || cmsProgram?.thumbnail_url || "/assets/images/hero/ai-powered-GD.webp";
  const enrollUrl = cmsProgram?.cta_url || EXTERNAL_URLS.signup;

  const highlights: HighlightItem[] = [
    { iconType: "clock", label: "Duration", value: duration },
    { iconType: "globe", label: "Language", value: "100% Tamil" },
    { iconType: "level", label: "Skill Level", value: cmsProgram?.level === "beginner" ? "Beginner to Pro" : "Beginner to Intermediate" },
    { iconType: "work", label: "Practical Work", value: "10+ Live Projects" },
  ];

  // Split title if possible into prefix and highlight
  const titleParts = title.split(" ");
  const titlePrefix = titleParts.length > 2 ? titleParts.slice(0, -2).join(" ") : titleParts.slice(0, -1).join(" ");
  const titleHighlight = titleParts.length > 2 ? titleParts.slice(-2).join(" ") : titleParts.slice(-1).join(" ");

  return (
    <main className="min-h-screen bg-white">
      {/* ── 01 Interactive Expanding Hero Section ── */}
      <ProgramHeroInteractive
        badge={`Most Popular · ${duration} · Tamil`}
        titlePrefix={titlePrefix || "90 Days Graphic Design"}
        titleHighlight={titleHighlight ? `${titleHighlight}.` : "Mastery Program."}
        description={description}
        highlights={highlights}
        imageSrc={imageSrc}
        altText={title}
        enrollUrl={enrollUrl}
        communityUrl={EXTERNAL_URLS.community}
      />

      {/* ── 02 Master Industry Standard Creative Tools ── */}
      <ToolsCoveredSection />

      {/* ── 03 Creative Interactive Roadmap Section ── */}
      <ProgramRoadmapSection
        title="90 Days Graphic Design Mastery Roadmap"
        subtitle="Follow a structured step-by-step journey designed to help you learn, practice, build a portfolio and launch your design career."
        badge="Structured Curriculum"
      />

      {/* ── 04 Practical Projects Section ── */}
      <PracticalProjectsSection />

      {/* ── 05 After 90 Days You Can (Full-Width Blue Showcase) ── */}
      <After90DaysSection enrollUrl={EXTERNAL_URLS.signup} />

      {/* ── 06 Our Students Success Stories (Centered Heading with Success in Blue) ── */}
      <VideoTestimonialCarousel
        centered
        titlePrefix="Our Students"
        titleHighlight="Success"
        titleSuffix="Stories"
      />

      {/* ── 07 Complete Support & Enrollment Master Section ── */}
      <ProgramEnrollmentSupportSection
        enrollUrl={EXTERNAL_URLS.signup}
        duration="90 Days"
        seatsText="20 Seats Available"
      />

      {/* ── 08 Frequently Asked Questions (2-Column Accordion) ── */}
      <ProgramFAQSection />

      {/* ── 09 Full-Width Sticky Bottom Enrollment Action Bar ── */}
      <ProgramStickyBottomCTA
        enrollUrl={EXTERNAL_URLS.signup}
        text="Limited Seats Available"
        buttonText="ENROLL NOW"
      />
    </main>
  );
}
