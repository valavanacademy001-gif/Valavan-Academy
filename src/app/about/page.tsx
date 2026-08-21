import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import TimelineSection from "@/components/sections/TimelineSection";
import TeamSection from "@/components/sections/TeamSection";
import { EXTERNAL_URLS } from "@/data/site.config";
import {
  ArrowRight,
  Sparkles,
  Target,
  Users,
  Award,
  CheckCircle2,
  Calendar,
  Compass,
  Zap,
  TrendingUp,
  Briefcase,
  Heart,
  Quote,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Valavan Academy | Tamil-First Creative Learning",
  description:
    "Learn about Valavan Academy — founded by Valavan to empower Tamil learners with high-income digital skills in Graphic Design, Video Editing, UI/UX, and AI Tools.",
  openGraph: {
    title: "About Valavan Academy | Empowering Creative Minds in Tamil",
    description:
      "From humble beginnings in Vellore to training 5,000+ students and building a 40,000+ creator community across Tamil Nadu.",
  },
};



/* ── TIMELINE DATA ── */
const TIMELINE_EVENTS = [
  {
    year: "2016",
    title: "The Creative Spark",
    desc: "After completing schooling in Tirupattur district, moved to Chennai in 2016. Discovered a deep passion for digital arts, typography, and graphic design.",
    tag: "Origins",
  },
  {
    year: "2020",
    title: "Literary & Creative Foundation",
    desc: "Completed B.A. and M.A. in Tamil Literature in Chennai, combining the power of Tamil communication with modern digital creative storytelling.",
    tag: "Foundation",
  },
  {
    year: "2021",
    title: "Birth of Tamil Nadu Creators Club (TNCC)",
    desc: "Launched a dedicated creator initiative which evolved into TNCC — building a vibrant community of passionate Tamil designers and creators.",
    tag: "Community",
  },
  {
    year: "2023",
    title: "Valavan Tutorials & Online Training",
    desc: "Launched YouTube design tutorials in Tamil reaching hundreds of thousands of views, followed by structured online coaching batches.",
    tag: "Education",
  },
  {
    year: "2024 — Present",
    title: "Valavan Academy Established",
    desc: "Officially founded Valavan Academy. Trained 5,000+ students with 100% practical, project-driven mentorship and established TNCC with 40,000+ members.",
    tag: "Milestone",
  },
];

/* ── STATS DATA ── */
const STATS = [
  { value: "5K+", label: "Students Trained" },
  { value: "40K+", label: "TNCC Community Members" },
  { value: "100+", label: "Workshops Conducted" },
  { value: "98%", label: "Satisfaction Rate" },
];

/* ── PILLARS / VALUES DATA ── */
const PILLARS = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To empower Tamil-speaking learners with practical, industry-aligned skills in Graphic Design, Video Editing, UI/UX, and AI Tools that lead to real freelance careers and financial independence.",
    badge: "Purpose",
  },
  {
    icon: Compass,
    title: "Our Vision",
    desc: "To build the world's largest Tamil creative ecosystem — empowering 100,000+ skilled creators, designers, and entrepreneurs to compete on a global stage.",
    badge: "Horizon",
  },
  {
    icon: Heart,
    title: "Our Commitment",
    desc: "Zero-fluff, 100% practical learning. Every concept is broken down step-by-step in Tamil with weekly real-world client briefs and direct mentor feedback.",
    badge: "Promise",
  },
];

/* ── WHY CHOOSE HIGHLIGHTS ── */
const WHY_CHOOSE = [
  {
    icon: Zap,
    title: "Comprehensive Live Mentorship",
    desc: "Weekly live doubt clearing, step-by-step software walkthroughs, and lifetime access to updated curriculum recordings.",
  },
  {
    icon: Briefcase,
    title: "Portfolio & Commercial Projects",
    desc: "Walk away with 10+ polished client-ready deliverables that prove your skill to international and local clients.",
  },
  {
    icon: TrendingUp,
    title: "Freelancing & Client Blueprint",
    desc: "Practical guidance on Upwork, Fiverr, Instagram outreach, rate card pricing, and high-ticket client proposals.",
  },
  {
    icon: Users,
    title: "Lifetime TNCC Community Access",
    desc: "Join an active network of 40,000+ peers for daily design critiques, collaboration opportunities, and freelance referrals.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ── 01 Hero Section ── */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden border-b border-neutral-100 bg-gradient-to-b from-[#F8FAFF] via-white to-white">
        {/* Ambient Brand Blue Glow */}
        <div
          className="absolute top-0 right-1/4 w-[550px] h-[550px] bg-[#1748BB]/6 rounded-full blur-3xl pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#1748BB 1.2px, transparent 1.2px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Kicker */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-[2px] bg-[#1748BB] opacity-40" />
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1748BB] font-semibold">
                About Valavan Academy
              </span>
              <div className="w-8 h-[2px] bg-[#1748BB] opacity-40" />
            </div>

            <h1
              className="font-display font-bold text-[#1E2026] leading-[1.04] sm:leading-[1.06] tracking-tight mb-6"
              style={{ fontSize: "clamp(34px, 5.2vw, 64px)" }}
            >
              Industry Experts,{" "}
              <span className="text-[#1748BB]">Unwavering Support.</span>
            </h1>

            <p className="font-sans text-neutral-600 text-base sm:text-lg leading-relaxed font-normal max-w-2xl mx-auto mb-8">
              Empowering Tamil minds with hands-on, career-focused digital education.
              Bridging the gap between classroom theory and real-world high-income creative execution.
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#BFDBFE] text-[#1748BB] text-xs font-bold shadow-xs">
                <Sparkles size={13} className="text-[#1748BB] fill-[#1748BB]" />
                Tamil-First Creative Hub
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#BFDBFE] text-[#1748BB] text-xs font-bold shadow-xs">
                <CheckCircle2 size={13} className="text-[#1748BB]" />
                5,000+ Learners Trained
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#BFDBFE] text-[#1748BB] text-xs font-bold shadow-xs">
                <Users size={13} className="text-[#1748BB]" />
                40K+ TNCC Members
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 02 Split Story & Team Overview Card ── */}
      <section id="story" className="py-16 sm:py-24 bg-white relative scroll-mt-24">
        <Container>
          <div className="rounded-[32px] border border-neutral-200/90 bg-[#F8FAFF] p-8 sm:p-12 lg:p-14 shadow-[0_10px_40px_rgba(23,72,187,0.06)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Text */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1748BB]" />
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#1748BB]">
                    Our Story &amp; Philosophy
                  </span>
                </div>

                <h2
                  className="font-display font-bold text-[#1E2026] leading-tight tracking-tight"
                  style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
                >
                  Practical Digital Education Built for{" "}
                  <span className="text-[#1748BB]">Real Outcomes.</span>
                </h2>

                <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                  Valavan Academy is a brand of Valavan Ventures Private Limited, a company dedicated to advancing education through innovative digital learning, skill development, and industry-relevant training initiatives.
                </p>

                <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                  With a strong commitment to empowering learners, Valavan Academy focuses on bridging the gap between traditional education and evolving career opportunities by delivering practical, future-ready learning experiences in creative, digital, and professional domains.
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    href="/programs"
                    style={{ color: "#FFFFFF" }}
                    className="inline-flex items-center gap-2 bg-[#1748BB] hover:bg-[#0A3CA8] !text-white font-sans font-bold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all duration-200 hover:scale-105 shadow-[0_8px_25px_rgba(23,72,187,0.3)]"
                  >
                    <span style={{ color: "#FFFFFF" }} className="!text-white font-bold">
                      View Programs
                    </span>
                    <ArrowRight size={16} style={{ color: "#FFFFFF" }} className="!text-white" />
                  </Link>
                  <a
                    href={EXTERNAL_URLS.community}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#1748BB" }}
                    className="inline-flex items-center gap-2 border-2 border-[#1748BB] !text-[#1748BB] hover:bg-[#1748BB] hover:!text-white font-sans font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all duration-200 hover:scale-105 bg-white"
                  >
                    <span style={{ color: "#1748BB" }} className="!text-[#1748BB] font-semibold">
                      Join Community
                    </span>
                  </a>
                </div>
              </div>

              {/* Right Team Photo */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[16/11] rounded-[24px] overflow-hidden shadow-2xl border border-white group">
                  <Image
                    src="/assets/about/team-1024x682.webp"
                    alt="Valavan Academy Team and Students"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                  
                  {/* Photo Caption Pill */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 flex items-center justify-between shadow-lg">
                    <div>
                      <p className="font-sans text-xs font-bold text-[#1748BB]">
                        Valavan Academy Community
                      </p>
                      <p className="font-sans text-[11px] text-neutral-600">
                        Mentors, students, and creators growing together
                      </p>
                    </div>
                    <span className="w-8 h-8 rounded-lg bg-[#EBF2FE] text-[#1748BB] flex items-center justify-center font-bold text-xs">
                      ✓
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 03 Founder Profile & Personal Story ── */}
      <section id="founder" className="py-12 sm:py-20 bg-white relative border-t border-neutral-100 scroll-mt-24">
        <Container>
          <div className="rounded-[32px] bg-gradient-to-br from-[#07080D] via-[#0D1017] to-[#0A1A3F] text-white p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            {/* Ambient Glow */}
            <div
              className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1748BB]/25 rounded-full blur-[120px] pointer-events-none"
              aria-hidden
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Founder Portrait */}
              <div className="lg:col-span-5 flex justify-center lg:justify-start">
                <div className="relative aspect-square w-full max-w-[340px] sm:max-w-[380px] rounded-[24px] overflow-hidden shadow-2xl border border-white/15 group">
                  <Image
                    src="/assets/about/valavan.webp"
                    alt="Valavan — Founder & Lead Mentor"
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 380px"
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
                <div className="inline-flex items-center gap-2 bg-[#1748BB]/80 text-white font-sans text-xs font-bold px-3.5 py-1.5 rounded-full border border-white/20">
                  <Quote size={12} className="fill-white" />
                  Our Founder&apos;s Messages
                </div>

                <h2
                  className="font-display font-bold text-white leading-tight tracking-tight"
                  style={{ fontSize: "clamp(30px, 3.8vw, 48px)" }}
                >
                  Valavan
                </h2>

                <div className="space-y-3.5 font-sans text-neutral-300 text-sm sm:text-base leading-relaxed font-normal">
                  <p className="text-white font-medium text-base sm:text-lg">
                    I&apos;m Valavan, founder of Valavan Academy and Pixel Panther.
                  </p>
                  <p>
                    I come from Masigam, a small village near Pernambut in Vellore District. No business background. Just a dream to do something meaningful with technology and creativity.
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <a
                    href={EXTERNAL_URLS.community}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#1748BB] hover:bg-[#0A3CA8] text-white font-sans font-bold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    <span>Connect with Valavan</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 04 Interactive Timeline Journey ── */}
      <TimelineSection />

      {/* ── 05 Mission, Vision & Core Values ── */}
      <section id="values" className="py-20 sm:py-28 bg-white relative scroll-mt-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#1748BB] mb-2 block">
              Core Pillars
            </span>
            <h2
              className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
            >
              Our Mission, Vision &amp; <span className="text-[#1748BB]">Values.</span>
            </h2>
            <p className="font-sans text-neutral-600 text-sm sm:text-base">
              The guiding principles that shape every lesson, project, and workshop we design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map((pillar, i) => (
              <div
                key={i}
                className="p-8 sm:p-9 rounded-[28px] border border-neutral-200/90 bg-[#F8FAFF] hover:bg-white hover:border-[#1748BB]/40 hover:shadow-[0_16px_40px_rgba(23,72,187,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#EBF2FE] flex items-center justify-center text-[#1748BB] shadow-xs">
                      <pillar.icon size={26} />
                    </div>
                    <span className="font-sans text-xs font-bold px-3 py-1 rounded-full bg-white border border-[#BFDBFE] text-[#1748BB] uppercase tracking-wider">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-[#1E2026] mb-3">
                    {pillar.title}
                  </h3>

                  <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 06 Meet Our Mentors & Team ── */}
      <TeamSection />

      {/* ── 07 Why Choose Valavan Academy (4 Pillars) ── */}
      <section id="advantage" className="py-20 sm:py-28 bg-white relative scroll-mt-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#1748BB] mb-2 block">
              The Advantage
            </span>
            <h2
              className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
            >
              Why <span className="text-[#1748BB]">Valavan Academy</span> is the Best Choice for Your Creative Career.
            </h2>
            <p className="font-sans text-neutral-600 text-sm sm:text-base">
              A proven ecosystem focused entirely on hands-on craft, live feedback, and real commercial outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 max-w-5xl mx-auto">
            {WHY_CHOOSE.map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-[24px] border border-neutral-200/90 bg-[#F8FAFF] hover:bg-white hover:border-[#1748BB]/40 hover:shadow-[0_12px_35px_rgba(23,72,187,0.08)] hover:-translate-y-1 transition-all duration-300 flex items-start gap-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EBF2FE] flex items-center justify-center text-[#1748BB] shrink-0 shadow-xs">
                  <item.icon size={22} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#1E2026] mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-neutral-600 text-sm leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 08 Impact Numbers Bar ── */}
      <section id="impact" className="py-14 sm:py-18 bg-[#1748BB] text-white relative overflow-hidden scroll-mt-24">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />

        <Container className="relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.label} className="space-y-1.5">
                <p
                  className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight"
                  style={{ color: "#FFFFFF" }}
                >
                  {stat.value}
                </p>
                <p
                  className="font-sans text-xs sm:text-sm font-semibold"
                  style={{ color: "#D7E3FF" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 09 Final CTA Section ── */}
      <section className="py-20 sm:py-28 bg-[#F8FAFF] border-t border-[#E8EFFE] relative">
        <Container>
          <div className="rounded-[32px] bg-gradient-to-br from-[#1748BB] to-[#0A3CA8] text-white p-8 sm:p-14 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(23,72,187,0.3)] max-w-4xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 text-white text-xs font-sans font-bold tracking-wide uppercase backdrop-blur-sm">
              <Sparkles size={13} className="fill-white" />
              Start Your Journey
            </span>

            <h2
              className="font-display font-bold text-white leading-tight"
              style={{ fontSize: "clamp(30px, 4.5vw, 50px)" }}
            >
              Ready to Start Your Creative Journey?
            </h2>

            <p
              className="font-sans text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
              style={{ color: "#D7E3FF" }}
            >
              Join thousands of successful designers, video editors, and digital creators trained in Tamil with Valavan Academy.
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
              <a
                href={EXTERNAL_URLS.signup}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1748BB" }}
                className="inline-flex items-center gap-2 bg-white !text-[#1748BB] font-sans font-bold text-sm sm:text-base px-8 py-4 rounded-full hover:bg-neutral-100 hover:scale-105 transition-all duration-200 shadow-xl"
              >
                <span style={{ color: "#1748BB" }} className="!text-[#1748BB] font-bold">
                  Enroll in a Program
                </span>
                <ArrowRight size={16} style={{ color: "#1748BB" }} className="!text-[#1748BB]" />
              </a>
              <a
                href={EXTERNAL_URLS.community}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#FFFFFF" }}
                className="inline-flex items-center gap-2 border-2 border-white !text-white hover:bg-white hover:!text-[#1748BB] font-sans font-semibold text-sm sm:text-base px-8 py-4 rounded-full transition-all duration-200"
              >
                <span style={{ color: "#FFFFFF" }} className="!text-white font-semibold">
                  Join TNCC Community
                </span>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
