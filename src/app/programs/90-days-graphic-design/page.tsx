import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EXTERNAL_URLS } from "@/data/site.config";
import Container from "@/components/ui/Container";
import { ArrowLeft, ArrowRight, Award, CheckCircle2, Sparkles, Layers, Clock, Globe, BarChart } from "lucide-react";
import ProgramHeroInteractive from "@/components/sections/ProgramHeroInteractive";
import ToolsCoveredSection, { DEFAULT_GRAPHIC_DESIGN_TOOLS, extractToolsFromMap } from "@/components/sections/ToolsCoveredSection";
import ProgramRoadmapSection from "@/components/sections/ProgramRoadmapSection";
import PracticalProjectsSection from "@/components/sections/PracticalProjectsSection";
import After90DaysSection from "@/components/sections/After90DaysSection";
import VideoTestimonialCarousel from "@/components/sections/VideoTestimonialCarousel";
import ProgramEnrollmentSupportSection from "@/components/sections/ProgramEnrollmentSupportSection";
import ProgramDesignJourneyCTASection from "@/components/sections/ProgramDesignJourneyCTASection";
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

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { HighlightItem } from "@/components/sections/ProgramHeroInteractive";
import { getProgramBySlug, getGraphicDesignProgramData, getPublishedLearnerStories } from "@/lib/cms";

export default async function GraphicDesignProgramPage() {
  const [cmsProgram, cmsData, learnerStories] = await Promise.all([
    getProgramBySlug("90-days-graphic-design"),
    getGraphicDesignProgramData(),
    getPublishedLearnerStories(),
  ]);

  const heroMap = cmsData.hero || {};
  const toolsMap = cmsData.tools || {};
  const roadmapMap = cmsData.roadmap || {};
  const projectsMap = cmsData.projects || {};
  const outcomesMap = cmsData.outcomes || {};
  const testimonialsMap = cmsData.testimonials || {};
  const supportMap = cmsData.support || {};
  const faqMap = cmsData.faq || {};
  const stickyMap = cmsData.sticky || {};

  const duration = heroMap.highlight_duration || cmsProgram?.duration || "90 Days";
  const title = cmsProgram?.title || "90 Days Graphic Design Mastery Program";
  const description = heroMap.description || cmsProgram?.description || "A structured, project-driven career program covering Photoshop, Illustrator, Canva, Logo Design, Social Media Design, Branding, and AI-powered creative workflows — taught completely in practical Tamil.";
  const imageSrc = heroMap.hero_image || cmsProgram?.banner_url || cmsProgram?.thumbnail_url || "/assets/images/hero/ai-powered-GD.webp";
  const enrollUrl = heroMap.enroll_url || cmsProgram?.cta_url || EXTERNAL_URLS.signup;
  const buttonText = heroMap.enroll_btn_text || "Enroll Now";
  const secondaryButtonText = heroMap.secondary_btn_text || "View Curriculum";
  const secondaryButtonUrl = heroMap.secondary_btn_url || "#roadmap";

  const highlights: HighlightItem[] = [
    { iconType: "students", value: heroMap.stat_students || "10,000+ Students" },
    { iconType: "projects", value: heroMap.stat_projects || "20+ Projects" },
    { iconType: "lessons", value: heroMap.stat_lessons || "150+ Lessons" },
    { iconType: "access", value: heroMap.stat_access || "Lifetime Access" },
    { iconType: "guidance", value: heroMap.stat_guidance || "Expert Guidance" },
  ];

  const titlePrefix = heroMap.title_prefix || "90 Days Graphic Design";
  const titleHighlight = heroMap.title_highlight || "Mastery Program.";

  return (
    <main className="min-h-screen bg-white">
      {/* ── 01 Interactive Expanding Hero Section with Video Playback ── */}
      <ProgramHeroInteractive
        badge={heroMap.badge || `Most Popular · ${duration} · Tamil`}
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
        youtubeId={heroMap.youtube_video_id || heroMap.youtube_id || heroMap.video_id || "BYSgZWZMgMU"}
        videoUrl={heroMap.video_url || "https://www.youtube.com/embed/BYSgZWZMgMU?si=TeHULtawXhx5PWig&start=2"}
        show3DIcons={true}
        topRight3DIcon={heroMap.top_right_3d_icon || "/assets/icons/illustrator-3d-sphere.png"}
        bottomRight3DIcon={heroMap.bottom_right_3d_icon || "/assets/icons/photoshop-3d-sphere.png"}
      />

      {/* ── 02 Master Industry Standard Creative Tools ── */}
      <ToolsCoveredSection
        badge={toolsMap.badge || "MASTER INDUSTRY STANDARD"}
        titlePrefix={toolsMap.title_prefix || "Creative Tools &"}
        titleHighlight={toolsMap.title_highlight || "AI Software."}
        subtitle={toolsMap.description || "Gain practical mastery across industry-standard vector, raster, and AI design tools."}
        toolsMap={toolsMap}
      />

      {/* ── 03 Creative Interactive Roadmap Section ── */}
      <ProgramRoadmapSection
        title={roadmapMap.title_prefix ? `${roadmapMap.title_prefix} ${roadmapMap.title_highlight || ''}` : "90 Days Graphic Design Mastery Roadmap"}
        subtitle={roadmapMap.description || "Follow a structured step-by-step journey designed to help you learn, practice, build a portfolio and launch your design career."}
        badge={roadmapMap.badge || "Structured Curriculum"}
        roadmapMap={roadmapMap}
      />

      {/* ── 04 Practical Projects Section ── */}
      <PracticalProjectsSection
        subtitle={projectsMap.description || "Every module includes actual client-level design projects so you graduate with a job-winning portfolio."}
      />

      {/* ── 05 After 90 Days You Can (Full-Width Blue Showcase) ── */}
      <After90DaysSection
        badge={outcomesMap.badge || "CAREER TRANSFORMATION"}
        title={outcomesMap.title_prefix ? `${outcomesMap.title_prefix} ${outcomesMap.title_highlight || ''}` : "After 90 Days You Can"}
        subtitle={outcomesMap.description || "From landing your first ₹30k/mo freelance client to securing a high-demand graphic design role."}
        enrollUrl={enrollUrl}
        outcomesMap={outcomesMap}
      />

      {/* ── 06 Student Stories (3D YouTube Shorts Carousel - Editable in CMS) ── */}
      <VideoTestimonialCarousel
        centered
        kicker={testimonialsMap.badge || "▶ Watch Student Stories"}
        titlePrefix={testimonialsMap.title_prefix || "See What's Possible When"}
        titleHighlight={testimonialsMap.title_highlight || "Skills Meet Action."}
        subtitle={testimonialsMap.description || "Thousands of learners have transformed their creativity into real opportunities through consistent learning and implementation."}
        stories={learnerStories}
        meta={testimonialsMap}
      />

      {/* ── 07 Complete Support & Credit Card EMI Bento Section ── */}
      <ProgramEnrollmentSupportSection
        enrollUrl={supportMap.enroll_url || enrollUrl}
        duration={supportMap.duration_text || duration}
        seatsText={supportMap.seats_text || "20 Seats Available"}
      />

      {/* ── 08 Pre-FAQ Call to Action (Your Design Journey Starts Today - Editable in CMS) ── */}
      <ProgramDesignJourneyCTASection
        badge={supportMap.badge || "START YOUR JOURNEY"}
        titlePrefix={supportMap.title_prefix || "Your Design Journey"}
        titleHighlight={supportMap.title_highlight || "Starts Today."}
        headlineSub={supportMap.headline_sub || "Every successful designer started with a blank canvas. The difference is they started."}
        description={supportMap.description || "If you're ready to build a valuable creative skill, create an impressive portfolio, and open new opportunities, this program is designed for you."}
        primaryBtnText={supportMap.primary_btn_text || "🚀 Enroll Now"}
        primaryBtnUrl={supportMap.enroll_url || supportMap.primary_btn_url || enrollUrl}
        secondaryBtnText={supportMap.secondary_btn_text || "📖 View Curriculum"}
        secondaryBtnUrl={supportMap.secondary_btn_url || "#roadmap"}
        footerSubtext={supportMap.footer_subtext || "Join thousands of learners building their creative future with Valavan Academy."}
        supportMap={supportMap}
      />

      {/* ── 08 Frequently Asked Questions (2-Column Accordion) ── */}
      <ProgramFAQSection />

      {/* ── 09 Full-Width Sticky Bottom Enrollment Action Bar ── */}
      <ProgramStickyBottomCTA
        enrollUrl={stickyMap.enroll_url || enrollUrl}
        text={stickyMap.notice_text || "Limited Seats Available"}
        buttonText={stickyMap.button_text || "ENROLL NOW"}
      />
    </main>
  );
}

