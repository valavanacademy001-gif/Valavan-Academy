import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import CountUp from "@/components/ui/CountUp";
import { EXTERNAL_URLS } from "@/data/site.config";
import { Users, MessageCircle, Award, ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Community — Tamil Nadu Creators Club | Valavan Academy",
  description:
    "Join the Tamil Nadu Creators Club — Valavan Academy's thriving community of 40,000+ Tamil digital creators, designers, and learners.",
};

const STATS = [
  { target: 40, suffix: "K+", label: "Community Members" },
  { target: 100, suffix: "+", label: "Workshops Conducted" },
  { target: 5, suffix: "K+", label: "Students Trained" },
];

const PILLARS = [
  {
    icon: Users,
    title: "Connect & Collaborate",
    desc: "Network with fellow Tamil designers, video editors, and digital creators across India and abroad.",
  },
  {
    icon: MessageCircle,
    title: "Learn & Get Feedback",
    desc: "Share your daily design drafts, get constructive critique from mentors, and elevate your creative standard.",
  },
  {
    icon: Award,
    title: "Grow & Land Opportunities",
    desc: "Gain access to exclusive design challenges, freelance client job boards, and community workshops.",
  },
];

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ── 01 Hero Section ── */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden border-b border-neutral-100 bg-gradient-to-b from-[#F8FAFF] via-white to-white">
        {/* Ambient Brand Blue Pattern & Glow */}
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
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-[2px] bg-[#1748BB] opacity-40" />
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1748BB] font-semibold">
                TNCC Community
              </span>
              <div className="w-8 h-[2px] bg-[#1748BB] opacity-40" />
            </div>

            <h1
              className="font-display font-bold text-[#1E2026] leading-[1.04] sm:leading-[1.06] tracking-tight mb-6"
              style={{ fontSize: "clamp(34px, 5vw, 62px)" }}
            >
              Tamil Nadu <span className="text-[#1748BB]">Creators Club.</span>
            </h1>

            <p className="font-sans text-neutral-600 text-base sm:text-lg leading-relaxed font-normal max-w-2xl mx-auto mb-10">
              A thriving ecosystem of 40,000+ Tamil designers, video editors, and digital
              professionals learning, sharing, and accelerating their careers together.
            </p>

            {/* Main Community CTA */}
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={EXTERNAL_URLS.community}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1748BB] hover:bg-[#0A3CA8] text-white font-sans font-bold text-base px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 shadow-[0_10px_30px_rgba(23,72,187,0.35)]"
              >
                <span>Join TNCC on WhatsApp</span>
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 02 Community Stats ── */}
      <section id="stats" className="py-12 sm:py-16 bg-[#1748BB] text-white relative overflow-hidden scroll-mt-24">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-white">
                  <CountUp end={stat.target} suffix={stat.suffix} duration={1800} />
                </p>
                <p className="font-sans text-sm sm:text-base text-[#BACFFF] font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 03 Why Join Section ── */}
      <section id="benefits" className="py-20 sm:py-28 bg-white relative scroll-mt-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#1748BB] mb-2 block">
              What You Get
            </span>
            <h2
              className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
            >
              Why Creators Thrive in TNCC.
            </h2>
            <p className="font-sans text-neutral-600 text-base sm:text-lg font-normal">
              You don&apos;t have to figure it out alone. Surrounded by peers and mentors, your growth accelerates 10x.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {PILLARS.map((pillar, i) => (
              <div
                key={i}
                className="p-8 rounded-[24px] border border-neutral-200/80 bg-[#F8FAFF] hover:bg-white hover:border-[#1748BB]/30 hover:shadow-[0_12px_35px_rgba(23,72,187,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-[#EBF2FE] flex items-center justify-center text-[#1748BB] mb-6 shadow-sm">
                    <pillar.icon size={24} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#1E2026] mb-3">
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

      {/* ── 04 Final Join Banner ── */}
      <section id="join" className="py-16 sm:py-20 bg-[#F8FAFF] border-t border-[#E8EFFE] scroll-mt-24">
        <Container>
          <div className="rounded-[28px] bg-white border border-[#BFDBFE]/70 p-8 sm:p-12 shadow-[0_10px_35px_rgba(23,72,187,0.06)] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-2 max-w-xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1748BB]">
                <Sparkles size={14} className="fill-[#1748BB]" />
                Free to Join
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#1E2026]">
                Ready to Join Tamil Nadu&apos;s Largest Creator Hub?
              </h3>
              <p className="font-sans text-sm sm:text-base text-neutral-600">
                Connect instantly with thousands of peers and take your creative journey to the next level.
              </p>
            </div>

            <a
              href={EXTERNAL_URLS.community}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 bg-[#1748BB] hover:bg-[#0A3CA8] text-white font-sans font-bold text-base px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 shadow-[0_8px_25px_rgba(23,72,187,0.3)]"
            >
              <span>Join Free Community</span>
              <ArrowUpRight size={18} />
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
