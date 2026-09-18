import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { EXTERNAL_URLS } from "@/data/site.config";
import {
  Sparkles,
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  Gift,
  Award,
  Users,
  Briefcase,
  Store,
  Laptop,
  Check,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Quote,
} from "lucide-react";
import ProgramHeroInteractive, { HighlightItem } from "@/components/sections/ProgramHeroInteractive";
import VideoTestimonialCarousel from "@/components/sections/VideoTestimonialCarousel";
import ProgramStickyBottomCTA from "@/components/sections/ProgramStickyBottomCTA";
import WorkshopFAQAccordion from "./WorkshopFAQAccordion";
import WorkshopCountdownTimer from "./WorkshopCountdownTimer";

export const metadata: Metadata = {
  title: "3 Hours Live Workshop — Graphic Design & Printing Business | Valavan Academy",
  description:
    "Start your Graphic Design journey and become a professional designer. Join our live 3-hour practical workshop in Tamil by Mr. Valavan.",
  openGraph: {
    title: "3 Hours Live Workshop — Start Your Graphic Design Journey",
    description:
      "A complete beginner's roadmap to learning Graphic Design and building a lucrative freelance career in Tamil. Register for ₹99.",
  },
};

const DISCOVER_CARDS = [
  {
    title: "Understand What Graphic Design Really Is",
    desc: "Learn the core fundamentals of color theory, typography, composition, and visual hierarchy from absolute scratch.",
    image: "/assets/workshop/ChatGPT-Image-Aug-4-2026-12_10_47-PM-1024x683.webp",
  },
  {
    title: "Design Your First Professional Poster",
    desc: "Follow along live and create a stunning commercial social media poster in Photoshop within minutes.",
    image: "/assets/workshop/ChatGPT-Image-Aug-4-2026-12_10_47-PM-1-1024x683.webp",
  },
  {
    title: "Discover How Designers Earn Money",
    desc: "Understand freelancing, client acquisition, and high-paying local & international printing business opportunities.",
    image: "/assets/workshop/ChatGPT-Image-Aug-4-2026-12_12_22-PM-1024x683.webp",
  },
];

const BONUS_ITEMS = [
  {
    tag: "BONUS 01",
    valueTag: "WORTH ₹2,499",
    title: "Graphic Design Resource Vault",
    desc: "Huge collection of premium fonts, editable PSD templates, design mockups, brushes, and assets for your commercial projects.",
    image: "/assets/workshop/WhatsApp-Image-2026-06-11-at-12.28.55-PM-2048x1448.webp",
  },
  {
    tag: "BONUS 02",
    valueTag: "WORTH ₹2,500",
    title: "Workshop Completion Certificate",
    desc: "Official Certificate of Participation by Valavan Academy after attending the live workshop.",
    image: "/assets/workshop/12-Aug-Graphic-Design-Masterclass.webp",
  },
];

const AUDIENCE_CARDS = [
  {
    icon: Users,
    title: "Students",
    desc: "Wanting to learn high-income freelancing skills alongside college studies.",
  },
  {
    icon: Briefcase,
    title: "Working Professionals",
    desc: "Looking for a high-growth career shift or extra side-income freelance gigs.",
  },
  {
    icon: Store,
    title: "Business Owners",
    desc: "Wanting to design marketing materials & advertisements for their own brand.",
  },
  {
    icon: Laptop,
    title: "Freelancers",
    desc: "Wanting to upgrade design aesthetics and land premium high-paying clients.",
  },
];

const MENTOR_ACCOMPLISHMENTS = [
  "10+ Years Experience in Graphic Design & Printing Business",
  "YouTube Community 40K+ Tamil Subscribers",
  "40K+ Tamil Creator Community Founder",
  "Founder & Lead Mentor at Valavan Academy",
  "Trained 5,000+ Students across Tamil Nadu",
  "Helping Beginners Build Successful Creative Careers",
];

import { getProgramBySlug } from "@/lib/cms";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ThreeHoursLiveWorkshopPage() {
  const program = await getProgramBySlug("3-hours-live-workshop");

  const highlights: HighlightItem[] = [
    { iconType: "clock", label: "Duration", value: program?.duration || "3 Hours Live" },
    { iconType: "globe", label: "Language", value: "100% Tamil" },
    { iconType: "level", label: "Skill Level", value: program?.level ? (program.level.charAt(0).toUpperCase() + program.level.slice(1)) : "Beginner to Pro" },
    { iconType: "work", label: "Format", value: "Interactive Live" },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* ── 01 Signature Interactive Expanding Hero Section ── */}
      <ProgramHeroInteractive
        badge="Live Workshop · 3 Hours · Tamil"
        titlePrefix="3 Hours Live"
        titleHighlight="Workshop."
        description={program?.description || "A complete beginner's roadmap to learning Graphic Design and building a profitable printing and freelancing business — taught completely in practical Tamil."}
        highlights={highlights}
        imageSrc={program?.thumbnail_url || "/assets/workshop/printing-business-workshop.webp"}
        altText="3 Hours Live Workshop on Starting Your Printing Business with Graphic Design Skill"
        enrollUrl={program?.cta_url || EXTERNAL_URLS.workshop}
        communityUrl={EXTERNAL_URLS.community}
        buttonText={program?.cta_text || "Register Now for ₹99"}
        youtubeId="nWlzU8ol7uY"
      />

      {/* ── 02 "In This Live Workshop You'll Discover" (Curriculum Highlights) ── */}
      <section className="py-20 sm:py-28 bg-white relative">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#1748BB]" />
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1748BB] font-semibold">
                Curriculum Highlights
              </span>
              <div className="w-8 h-[2px] bg-[#1748BB]" />
            </div>

            <h2
              className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(28px, 4.2vw, 48px)" }}
            >
              In This Live <span className="text-[#1748BB]">Workshop</span> You&apos;ll Discover
            </h2>
            <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
              A complete beginner&apos;s roadmap to learning Graphic Design and building a lucrative freelance career in Tamil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {DISCOVER_CARDS.map((card) => (
              <div
                key={card.title}
                className="group rounded-[28px] bg-white border border-neutral-200/90 hover:border-[#1748BB]/50 p-6 shadow-[0_10px_35px_rgba(23,72,187,0.06)] hover:shadow-[0_20px_50px_rgba(23,72,187,0.14)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-100 shadow-sm">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-400"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>

                  <h3
                    style={{ color: "#1748BB" }}
                    className="font-display font-bold text-xl !text-[#1748BB] leading-snug"
                  >
                    {card.title}
                  </h3>

                  <p className="font-sans text-neutral-600 text-sm leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 03 "Enroll Now For Exciting Bonus" (Worth ₹4,999 FREE) ── */}
      <section className="py-20 sm:py-28 bg-[#F8FAFF] border-y border-[#E8EFFE] relative">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#1748BB]" />
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1748BB] font-semibold">
                Fast Action Bonuses
              </span>
              <div className="w-8 h-[2px] bg-[#1748BB]" />
            </div>

            <h2
              className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(28px, 4.2vw, 48px)" }}
            >
              Enroll Now For <span className="text-[#1748BB]">Exciting Bonuses</span>
            </h2>
            <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
              Get Exclusive Bonuses Worth ₹4,999 Absolutely Free with Your ₹99 Workshop Ticket.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {BONUS_ITEMS.map((bonus) => (
              <div
                key={bonus.title}
                className="group rounded-[32px] bg-white border border-[#BFDBFE]/80 hover:border-[#1748BB] p-7 sm:p-8 shadow-[0_12px_40px_rgba(23,72,187,0.08)] hover:shadow-[0_20px_55px_rgba(23,72,187,0.18)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between relative overflow-hidden"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1 rounded-full bg-[#EBF4FF] text-[#1748BB] text-xs font-bold uppercase tracking-wider">
                      {bonus.tag}
                    </span>
                    <span className="px-3.5 py-1 rounded-full bg-[#FEF3C7] text-[#D97706] text-xs font-extrabold uppercase tracking-wider border border-[#FDE68A]">
                      {bonus.valueTag}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-[#1E2026] group-hover:text-[#1748BB] transition-colors leading-tight flex items-center gap-2">
                    <Gift size={22} className="text-[#1748BB] shrink-0" />
                    <span>{bonus.title}</span>
                  </h3>

                  <p className="font-sans text-neutral-600 text-sm leading-relaxed font-normal">
                    {bonus.desc}
                  </p>

                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 mt-4 shadow-sm">
                    <Image
                      src={bonus.image}
                      alt={bonus.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-400"
                      sizes="(max-width: 768px) 100vw, 450px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 04 "About Your Mentor" ── */}
      <section id="mentor" className="py-20 sm:py-28 bg-white relative">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Section Heading */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-[#1748BB]" />
                <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1748BB] font-semibold">
                  Meet The Instructor
                </span>
                <div className="w-8 h-[2px] bg-[#1748BB]" />
              </div>

              <h2
                className="font-display font-bold text-[#1E2026] leading-tight tracking-tight"
                style={{ fontSize: "clamp(28px, 4.2vw, 48px)" }}
              >
                About Your <span className="text-[#1748BB]">Mentor</span>
              </h2>
            </div>

            <div className="rounded-[32px] bg-gradient-to-br from-[#07080D] via-[#0D1017] to-[#0A1A3F] text-white p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-neutral-800/80">
              {/* Ambient Glow */}
              <div
                className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1748BB]/25 rounded-full blur-[120px] pointer-events-none"
                aria-hidden
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                {/* Founder Portrait */}
                <div className="lg:col-span-5 flex justify-center lg:justify-start">
                  <div className="relative aspect-square w-full max-w-[320px] sm:max-w-[360px] rounded-[24px] overflow-hidden shadow-2xl border border-white/15 group bg-[#2563EB]/20">
                    <Image
                      src="/assets/about/valavan.webp"
                      alt="Valavan — Founder & Lead Mentor"
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 360px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />
                    
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/15">
                      <p className="font-display font-bold text-lg text-white">Valavan</p>
                      <p className="font-sans text-xs text-[#60A5FA] font-medium">
                        Founder &amp; Lead Mentor
                      </p>
                    </div>
                  </div>
                </div>

                {/* Founder Story Text */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 bg-[#1748BB] text-white font-sans text-xs font-bold px-4 py-1.5 rounded-full border border-white/20 shadow-md">
                    <Quote size={12} className="fill-white" />
                    Our Founder&apos;s Messages
                  </div>

                  <h2
                    className="font-display font-extrabold text-white leading-tight tracking-tight"
                    style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
                  >
                    Valavan
                  </h2>

                  <div className="space-y-3.5 font-sans text-neutral-300 text-sm sm:text-base leading-relaxed font-normal">
                    <p className="text-white font-medium text-base sm:text-lg">
                      I&apos;m Valavan, founder of Valavan Academy and Pixel Panther.
                    </p>
                    <p className="text-neutral-300">
                      I come from Masigam, a small village near Pernambut in Vellore District. No business background. Just a dream to do something meaningful with technology and creativity.
                    </p>
                  </div>

                  <div className="pt-3 flex items-center gap-4">
                    <a
                      href={EXTERNAL_URLS.community}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#1748BB] hover:bg-[#0A3CA8] text-white font-sans font-bold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all duration-200 hover:scale-105 shadow-[0_8px_25px_rgba(23,72,187,0.4)] cursor-pointer"
                    >
                      <span>Connect with Valavan</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 05 "Who Should Attend?" ── */}
      <section className="py-20 sm:py-28 bg-[#F8FAFF] border-t border-[#E8EFFE] relative">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#1748BB]" />
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1748BB] font-semibold">
                Target Audience
              </span>
              <div className="w-8 h-[2px] bg-[#1748BB]" />
            </div>

            <h2
              className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(28px, 4.2vw, 48px)" }}
            >
              Who Should <span className="text-[#1748BB]">Attend?</span>
            </h2>
            <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
              Designed For Anyone Who Wants To Build A Lucrative Career Using Graphic Design
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {AUDIENCE_CARDS.map((aud) => (
              <div
                key={aud.title}
                className="group rounded-[24px] bg-white border border-neutral-200/90 hover:border-[#1748BB]/60 p-6 shadow-sm hover:shadow-[0_14px_35px_rgba(23,72,187,0.12)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#EBF4FF] flex items-center justify-center text-[#1748BB] mb-5 group-hover:scale-110 transition-transform">
                    <aud.icon size={22} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#1E2026] mb-2 group-hover:text-[#1748BB] transition-colors">
                    {aud.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {aud.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 06 Student Success Stories Video Carousel ── */}
      <VideoTestimonialCarousel
        centered={true}
        titlePrefix="Our Students"
        titleHighlight="Success"
        titleSuffix="Stories"
      />

      {/* ── 07 "Workshop Details & Glowing ₹99 Pricing Card" (Signature Blue Master Banner) ── */}
      <section id="pricing" className="py-20 sm:py-28 bg-[#1748BB] text-white relative overflow-hidden">
        {/* Background diagonal stripe pattern */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1.5px, transparent 0, transparent 40px)",
          }}
          aria-hidden
        />

        <Container className="relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white mb-3" style={{ color: "#FFFFFF" }}>
                <Sparkles size={14} style={{ color: "#BACFFF" }} />
                Event Schedule & Ticket
              </span>
              <h2
                className="font-display font-bold text-white leading-tight tracking-tight mb-3"
                style={{ fontSize: "clamp(28px, 4.2vw, 48px)", color: "#FFFFFF" }}
              >
                Workshop Details & Special Ticket
              </h2>
              <p style={{ color: "#BACFFF" }} className="font-sans text-sm sm:text-base font-medium">
                Join thousands of students who launched their design careers with Valavan Academy.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Details Panel */}
              <div className="lg:col-span-6 rounded-[28px] bg-white/10 border border-white/20 p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="font-display font-bold text-2xl text-white mb-6">
                    Session Information
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <span className="text-xs text-[#BACFFF] block font-medium">Session Date</span>
                        <span className="text-sm font-bold text-white">Upcoming Sunday</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                        <Clock size={20} />
                      </div>
                      <div>
                        <span className="text-xs text-[#BACFFF] block font-medium">Duration & Time</span>
                        <span className="text-sm font-bold text-white">3 Hours Live (07:00 PM IST)</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                        <Video size={20} />
                      </div>
                      <div>
                        <span className="text-xs text-[#BACFFF] block font-medium">Platform</span>
                        <span className="text-sm font-bold text-white">Live Online Interactive Webinar</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                        <Award size={20} />
                      </div>
                      <div>
                        <span className="text-xs text-[#BACFFF] block font-medium">Language</span>
                        <span className="text-sm font-bold text-white">100% Practical Tamil</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Glowing Pricing Card */}
              <div className="lg:col-span-6 rounded-[28px] bg-white text-[#1E2026] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex flex-col justify-between text-center relative overflow-hidden">
                <div className="space-y-4 relative z-10">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-[#EBF4FF] text-[#1748BB] text-[11px] font-bold uppercase tracking-wider">
                    Special Limited Offer
                  </span>

                  <div>
                    <span className="text-sm text-neutral-400 line-through block">Total Value: ₹1,999</span>
                    <div className="flex items-center justify-center gap-2 pt-1">
                      <span className="font-display font-extrabold text-5xl sm:text-6xl text-[#1748BB]">
                        ₹99
                      </span>
                      <span className="text-xs text-neutral-500 text-left leading-tight">
                        Only<br />(Incl. GST)
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-600">
                    Includes 3-Hour Live Training + ₹4,999 Bonuses + Q&amp;A Access
                  </p>

                  {/* Live Countdown Component */}
                  <WorkshopCountdownTimer />
                </div>

                <div className="pt-6 relative z-10 space-y-3">
                  <a
                    href={program?.cta_url || EXTERNAL_URLS.workshop}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: "#1748BB", color: "#FFFFFF" }}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#1748BB] hover:bg-[#0A3CA8] !text-white font-sans font-bold text-base sm:text-lg py-4 rounded-full transition-all duration-200 hover:scale-[1.02] shadow-[0_10px_35px_rgba(23,72,187,0.4)] cursor-pointer"
                  >
                    <span style={{ color: "#FFFFFF" }} className="!text-white font-bold">{program?.cta_text || "Register Now for ₹99"}</span>
                    <ArrowRight size={18} style={{ color: "#FFFFFF" }} className="!text-white" />
                  </a>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500">
                    <ShieldCheck size={14} className="text-green-600" />
                    <span>Safe &amp; Secure Payment • Instant WhatsApp Group Link</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 08 Frequently Asked Questions ── */}
      <section className="py-20 sm:py-28 bg-white relative">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-[#1748BB]" />
                <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1748BB] font-semibold">
                  Frequently Asked Questions
                </span>
                <div className="w-8 h-[2px] bg-[#1748BB]" />
              </div>

              <h2
                className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-3"
                style={{ fontSize: "clamp(28px, 4.2vw, 44px)" }}
              >
                Got Questions? <span className="text-[#1748BB]">We Have Answers.</span>
              </h2>
              <p className="font-sans text-neutral-600 text-sm sm:text-base">
                Everything you need to know before attending the live masterclass.
              </p>
            </div>

            <WorkshopFAQAccordion />
          </div>
        </Container>
      </section>

      {/* ── 09 Full-Width Sticky Bottom Enrollment Action Bar (Matching 90 Days & Full Stack) ── */}
      <ProgramStickyBottomCTA
        enrollUrl={program?.cta_url || EXTERNAL_URLS.workshop}
        text="3 Hours Live Workshop • Special Price ₹99 (Limited Seats)"
        buttonText={program?.cta_text?.toUpperCase() || "REGISTER NOW FOR ₹99"}
      />
    </main>
  );
}
