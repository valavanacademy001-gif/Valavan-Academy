import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { SOCIAL_LINKS, EXTERNAL_URLS } from "@/data/site.config";
import { ArrowUpRight, MessageSquare, Mail, Sparkles } from "lucide-react";
import { SOCIAL_ICON_MAP } from "@/components/ui/SocialIcons";

export const metadata: Metadata = {
  title: "Contact Us — Valavan Academy",
  description:
    "Get in touch with Valavan Academy. Reach us through social media or WhatsApp for program inquiries, admissions, and support.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ── 01 Header Section ── */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden border-b border-neutral-100 bg-gradient-to-b from-[#F8FAFF] via-white to-white">
        {/* Ambient Glow */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#1748BB 1.2px, transparent 1.2px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />
        <div
          className="absolute top-0 right-10 w-[450px] h-[450px] bg-[#1748BB]/6 rounded-full blur-3xl pointer-events-none"
          aria-hidden
        />

        <Container className="relative z-10">
          <div className="max-w-3xl">
            {/* Kicker */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-[2px] bg-[#1748BB] opacity-40" />
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1748BB] font-semibold">
                Get In Touch
              </span>
              <div className="w-8 h-[2px] bg-[#1748BB] opacity-40" />
            </div>

            <h1
              className="font-display font-bold text-[#1E2026] leading-[1.04] sm:leading-[1.06] tracking-tight mb-6"
              style={{ fontSize: "clamp(34px, 5vw, 60px)" }}
            >
              Contact <span className="text-[#1748BB]">Valavan Academy.</span>
            </h1>

            <p className="font-sans text-neutral-600 text-base sm:text-lg leading-relaxed font-normal max-w-2xl">
              Have questions about our programs, curriculum, or enrollment? Reach out to us through our direct channels or social media.
            </p>
          </div>
        </Container>
      </section>

      {/* ── 02 Contact Methods & Channels ── */}
      <section id="channels" className="py-16 sm:py-24 bg-white relative scroll-mt-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Channels */}
            <div className="lg:col-span-7 space-y-8">
              {/* Direct Support Card */}
              <div id="support" className="scroll-mt-28">
                <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-[#1748BB] mb-4">
                  Fastest Response
                </h2>

                <a
                  href={EXTERNAL_URLS.community}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 sm:p-7 rounded-[24px] border border-neutral-200/80 bg-[#F8FAFF] hover:bg-white hover:border-[#1748BB]/40 hover:shadow-[0_12px_35px_rgba(23,72,187,0.1)] hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-13 h-13 rounded-2xl bg-[#EBF2FE] flex items-center justify-center text-[#1748BB] shrink-0 shadow-sm">
                      <MessageSquare size={22} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-[#1E2026] group-hover:text-[#1748BB] transition-colors">
                        TNCC WhatsApp Community
                      </h3>
                      <p className="font-sans text-sm text-neutral-500 mt-0.5">
                        Ask questions directly to mentors and support staff
                      </p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-[#1748BB] group-hover:bg-[#1748BB] group-hover:text-white group-hover:border-[#1748BB] transition-all shrink-0">
                    <ArrowUpRight size={18} />
                  </div>
                </a>
              </div>

              {/* Social Channels */}
              <div id="social" className="scroll-mt-28">
                <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-[#1748BB] mb-4">
                  Follow &amp; Direct Message
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = SOCIAL_ICON_MAP[social.icon];
                    return (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Valavan Academy on ${social.label}`}
                        className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-neutral-200/80 bg-[#F8FAFF] hover:bg-white hover:border-[#1748BB]/40 hover:text-[#1748BB] hover:shadow-[0_8px_25px_rgba(23,72,187,0.08)] hover:-translate-y-1 transition-all duration-200 text-neutral-700 group text-center"
                      >
                        <div className="w-11 h-11 rounded-xl bg-white border border-neutral-100 flex items-center justify-center text-[#1748BB] group-hover:bg-[#EBF2FE] transition-colors shadow-sm">
                          {Icon && <Icon size={20} />}
                        </div>
                        <span className="font-sans text-xs font-semibold">{social.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Enrollment Info Banner */}
            <div id="admissions" className="lg:col-span-5 scroll-mt-28">
              <div className="rounded-[28px] bg-gradient-to-br from-[#1748BB] to-[#0A3CA8] text-white p-8 sm:p-10 shadow-[0_20px_50px_rgba(23,72,187,0.3)] relative overflow-hidden space-y-6">
                {/* Pattern */}
                <div
                  className="absolute inset-0 opacity-[0.05] pointer-events-none"
                  style={{
                    backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                    backgroundSize: "24px 24px",
                  }}
                  aria-hidden
                />

                <div className="relative z-10 space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 text-white text-xs font-sans font-bold tracking-wide uppercase backdrop-blur-sm">
                    <Sparkles size={12} className="fill-white" />
                    Admissions Open
                  </span>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
                    Ready to Enroll in a Program?
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed">
                    Start your creative career journey today. Join thousands of Tamil learners transforming their skills with Valavan Academy.
                  </p>

                  <div className="pt-2">
                    <a
                      href={EXTERNAL_URLS.signup}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-[#1748BB] font-sans font-bold text-base px-8 py-4 rounded-full hover:bg-neutral-100 hover:scale-105 transition-all duration-200 shadow-lg w-full justify-center"
                    >
                      <span>Enroll Now</span>
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
