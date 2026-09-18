import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { EXTERNAL_URLS } from "@/data/site.config";
import {
  ArrowUpRight,
  Sparkles,
  Users,
  ShieldCheck,
  Briefcase,
  Layers,
  GraduationCap,
  TrendingUp,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Communities & Ecosystem — TNCC & THADAM | Valavan Academy",
  description:
    "Explore Tamil Nadu Creators Club (TNCC) and THADAM Professional Network — two dedicated platforms built for creative collaboration, skill acceleration, and verified business growth.",
};

const ECOSYSTEM_STEPS = [
  {
    step: "01",
    title: "Valavan Academy",
    subtitle: "Skill Foundation & Mentorship",
    description: "Learn Graphic Design, Video Editing, Web Design, UI/UX, and AI Tools with hands-on live project training in Tamil.",
    badge: "Learn & Build",
    href: "/programs",
    linkText: "Explore Courses",
    isExternal: false,
  },
  {
    step: "02",
    title: "Tamil Nadu Creators Club",
    subtitle: "Peer Network & Daily Practice",
    description: "A community of 40,000+ creators sharing daily design drafts, getting constructive feedback, and participating in workshops.",
    badge: "Connect & Practice",
    href: "https://tamilnaducreatorsclub.com/",
    linkText: "Visit TNCC Platform",
    isExternal: true,
  },
  {
    step: "03",
    title: "THADAM",
    subtitle: "Professional Growth & Client Referrals",
    description: "A trusted, membership-gated directory to discover verified peers, exchange high-ticket client referrals, and unlock business opportunities.",
    badge: "Scale & Monetize",
    href: "https://thadam.net/",
    linkText: "Explore THADAM",
    isExternal: true,
  },
];

import { getCommunityPageData, getSectionVisibilityMap } from "@/lib/cms";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CommunityPage() {
  const [communityData, visibilityMap] = await Promise.all([
    getCommunityPageData(),
    getSectionVisibilityMap("community"),
  ]);

  return (
    <main className="min-h-screen bg-white">
      {/* ── 01 Hero Section ── */}
      {visibilityMap.hero !== false && (
        <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-20 overflow-hidden border-b border-neutral-100 bg-gradient-to-b from-[#F8FAFF] via-white to-white">
          {/* Ambient Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#1748BB 1.2px, transparent 1.2px)",
              backgroundSize: "28px 28px",
            }}
            aria-hidden
          />
          <div
            className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#1748BB]/6 rounded-full blur-3xl pointer-events-none"
            aria-hidden
          />

          <Container className="relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              {/* Kicker */}
              <div className="flex items-center justify-center gap-3 mb-4 sm:mb-5">
                <div className="w-8 h-[2px] bg-[#1748BB] opacity-40" />
                <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1748BB] font-bold">
                  {communityData.eyebrow}
                </span>
                <div className="w-8 h-[2px] bg-[#1748BB] opacity-40" />
              </div>

              <h1
                className="font-display font-bold text-[#1E2026] leading-[1.04] sm:leading-[1.06] tracking-tight mb-5"
                style={{ fontSize: "clamp(34px, 5vw, 62px)" }}
              >
                {communityData.heading}
              </h1>

              <p className="font-sans text-neutral-600 text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-2xl mx-auto">
                {communityData.description}
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* ── 02 Two Master Community Cards (Side-by-Side White Elevated Boxes) ── */}
      <section className="py-12 sm:py-20 bg-[#FBFDFF] relative z-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 max-w-6xl mx-auto items-stretch">

            {/* ── CARD 1: Tamil Nadu Creators Club (TNCC) ── */}
            <div className="group rounded-[32px] sm:rounded-[36px] bg-white border border-neutral-200/90 hover:border-[#1748BB]/50 shadow-[0_12px_40px_rgba(23,72,187,0.08)] hover:shadow-[0_22px_55px_rgba(23,72,187,0.16)] p-6 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              
              {/* Subtle top accent gradient */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#22C1D6] via-[#FF5A2B] to-[#1748BB]" />

              <div className="space-y-6">
                {/* Logo Container */}
                <a
                  href="https://tamilnaducreatorsclub.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative w-full aspect-[21/9] sm:aspect-[16/7] rounded-2xl bg-neutral-50/80 hover:bg-neutral-100/70 border border-neutral-100 p-6 flex items-center justify-center transition-all duration-300 group-hover:scale-[1.01]"
                  aria-label="Visit Tamil Nadu Creators Club"
                >
                  <Image
                    src="/assets/community/tncc-logo.jpg"
                    alt="Tamil Nadu Creators Club"
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 500px"
                    priority
                  />
                </a>

                {/* Badge & Title */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4FF] text-[#1748BB] text-[11px] font-sans font-bold uppercase tracking-wider">
                      <Users size={12} className="text-[#1748BB]" />
                      Creative Community
                    </span>
                    <span className="text-xs font-semibold text-neutral-400">40K+ Members</span>
                  </div>

                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#1E2026] group-hover:text-[#1748BB] transition-colors leading-tight">
                    Tamil Nadu Creators Club
                  </h2>

                  <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed font-normal pt-1">
                    A vibrant ecosystem of designers, video editors, and digital creators learning, sharing, and accelerating creative careers together in Tamil.
                  </p>
                </div>

                {/* Key Benefits List */}
                <ul className="space-y-2.5 pt-2 border-t border-neutral-100">
                  {[
                    "Daily design drafts critique & mentor feedback",
                    "Weekly creative workshops & live challenges",
                    "Peer networking with 40,000+ Tamil creators",
                  ].map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-medium">
                      <CheckCircle2 size={16} className="text-[#1748BB] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://tamilnaducreatorsclub.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: "#1748BB", color: "#FFFFFF" }}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1748BB] hover:bg-[#0A3CA8] !text-white font-sans font-bold text-sm sm:text-base px-6 py-3.5 rounded-full transition-all duration-200 hover:scale-[1.02] shadow-[0_8px_25px_rgba(23,72,187,0.35)] text-center cursor-pointer"
                >
                  <span style={{ color: "#FFFFFF" }} className="!text-white font-bold">
                    Visit TNCC Website
                  </span>
                  <ArrowUpRight size={16} style={{ color: "#FFFFFF" }} className="!text-white" />
                </a>

                <a
                  href={EXTERNAL_URLS.community}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1748BB", backgroundColor: "#FFFFFF", borderColor: "#1748BB" }}
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#1748BB] bg-white hover:bg-[#F0F5FF] !text-[#1748BB] font-sans font-bold text-sm sm:text-base px-6 py-3.5 rounded-full transition-all duration-200 hover:scale-[1.02] text-center cursor-pointer"
                >
                  <MessageCircle size={16} style={{ color: "#1748BB" }} className="!text-[#1748BB]" />
                  <span style={{ color: "#1748BB" }} className="!text-[#1748BB] font-bold">
                    WhatsApp Hub
                  </span>
                </a>
              </div>
            </div>

            {/* ── CARD 2: THADAM ── */}
            <div className="group rounded-[32px] sm:rounded-[36px] bg-white border border-neutral-200/90 hover:border-[#1748BB]/50 shadow-[0_12px_40px_rgba(23,72,187,0.08)] hover:shadow-[0_22px_55px_rgba(23,72,187,0.16)] p-6 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              
              {/* Subtle top accent gradient */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1748BB] via-[#3B82F6] to-[#60A5FA]" />

              <div className="space-y-6">
                {/* Logo Container */}
                <a
                  href="https://thadam.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative w-full aspect-[21/9] sm:aspect-[16/7] rounded-2xl bg-neutral-50/80 hover:bg-neutral-100/70 border border-neutral-100 p-6 flex items-center justify-center transition-all duration-300 group-hover:scale-[1.01]"
                  aria-label="Visit THADAM"
                >
                  <Image
                    src="/assets/community/thadam-logo.png"
                    alt="THADAM Professional Network"
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 500px"
                    priority
                  />
                </a>

                {/* Badge & Title */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4FF] text-[#1748BB] text-[11px] font-sans font-bold uppercase tracking-wider">
                      <ShieldCheck size={12} className="text-[#1748BB]" />
                      Professional Network
                    </span>
                    <span className="text-xs font-semibold text-neutral-400">Trust & Referrals</span>
                  </div>

                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#1E2026] group-hover:text-[#1748BB] transition-colors leading-tight">
                    THADAM
                  </h2>

                  <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed font-normal pt-1">
                    India&apos;s membership-gated growth network built on real trust — connect with verified leaders, exchange client referrals, and discover business opportunities.
                  </p>
                </div>

                {/* Key Benefits List */}
                <ul className="space-y-2.5 pt-2 border-t border-neutral-100">
                  {[
                    "Verified member directory & business listing",
                    "Direct client referrals & commercial job opportunities",
                    "Exclusive founder meetings, events & masterclasses",
                  ].map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-medium">
                      <CheckCircle2 size={16} className="text-[#1748BB] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-8">
                <a
                  href="https://thadam.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: "#1748BB", color: "#FFFFFF" }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1748BB] hover:bg-[#0A3CA8] !text-white font-sans font-bold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all duration-200 hover:scale-[1.02] shadow-[0_8px_25px_rgba(23,72,187,0.35)] text-center cursor-pointer"
                >
                  <span style={{ color: "#FFFFFF" }} className="!text-white font-bold">
                    Explore THADAM Network
                  </span>
                  <ArrowUpRight size={16} style={{ color: "#FFFFFF" }} className="!text-white" />
                </a>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* ── 03 How the Ecosystem Works Together ── */}
      <section className="py-16 sm:py-24 bg-white border-t border-neutral-100">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#1748BB] mb-2 block">
              Complete Career Transformation
            </span>
            <h2
              className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
            >
              How Our Ecosystem Powers Your Journey
            </h2>
            <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
              From learning industry skills to building peer confidence and scaling your freelance income — everything you need in one unified ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {ECOSYSTEM_STEPS.map((item) => (
              <div
                key={item.step}
                className="p-7 sm:p-8 rounded-[24px] border border-neutral-200/80 bg-[#F8FAFF] hover:bg-white hover:border-[#1748BB]/40 hover:shadow-[0_14px_40px_rgba(23,72,187,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-extrabold text-2xl text-[#1748BB]">
                      {item.step}
                    </span>
                    <span className="text-[11px] font-sans font-bold px-3 py-1 rounded-full bg-white border border-[#1748BB]/20 text-[#1748BB]">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-[#1E2026]">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm font-semibold text-[#1748BB]">
                    {item.subtitle}
                  </p>

                  <p className="font-sans text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-200/60 mt-6">
                  {item.isExternal ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-sans font-bold text-xs sm:text-sm text-[#1748BB] hover:underline"
                    >
                      <span>{item.linkText}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 font-sans font-bold text-xs sm:text-sm text-[#1748BB] hover:underline"
                    >
                      <span>{item.linkText}</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 04 Final Join Banner ── */}
      <section className="py-16 sm:py-20 bg-[#1748BB] text-white relative overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto rounded-[32px] bg-white/10 border border-white/20 p-8 sm:p-12 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-3 max-w-xl">
              <span style={{ color: "#BACFFF" }} className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider !text-[#BACFFF]">
                <Sparkles size={14} style={{ color: "#BACFFF" }} className="!text-[#BACFFF]" />
                Join the Movement
              </span>
              <h2 style={{ color: "#FFFFFF" }} className="font-display font-bold text-2xl sm:text-3xl !text-white leading-tight">
                Ready to Join Tamil Nadu&apos;s Creative & Business Ecosystem?
              </h2>
              <p style={{ color: "#FFFFFF" }} className="font-sans text-sm sm:text-base !text-white/95 leading-relaxed font-normal">
                Connect with thousands of fellow creators and entrepreneurs today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://tamilnaducreatorsclub.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: "#FFFFFF", color: "#1748BB" }}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F0F5FF] !text-[#1748BB] font-sans font-bold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all duration-200 hover:scale-105 shadow-lg cursor-pointer"
              >
                <span style={{ color: "#1748BB" }} className="!text-[#1748BB] font-bold">Join TNCC</span>
                <ArrowUpRight size={16} style={{ color: "#1748BB" }} className="!text-[#1748BB]" />
              </a>

              <a
                href="https://thadam.net/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#FFFFFF", borderColor: "#FFFFFF" }}
                className="inline-flex items-center justify-center gap-2 border-2 border-white hover:bg-white hover:!text-[#1748BB] !text-white font-sans font-bold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                <span className="font-bold">Join THADAM</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
