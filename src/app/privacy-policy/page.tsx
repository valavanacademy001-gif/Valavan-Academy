import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { supabase } from "@/lib/supabase";
import { generatePageMetadata, getPageSEO } from "@/lib/seo";
import JsonLdSchema from "@/components/seo/JsonLdSchema";
import { ShieldCheck, ArrowRight, FileText, Mail, Phone, MapPin, Lock, UserCheck } from "lucide-react";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const meta = await generatePageMetadata("/privacy-policy");
  return {
    ...meta,
    title: "Privacy Policy | Valavan Academy",
    description:
      "Privacy Policy of Valavan Academy. Learn how we collect, use, and protect your personal data under the DPDP Act, 2023.",
  };
}

async function getPageData() {
  try {
    const { data: page } = await supabase
      .from("pages")
      .select("title, description, updated_at")
      .eq("slug", "privacy-policy")
      .maybeSingle();
    return page;
  } catch {
    return null;
  }
}

export default async function PrivacyPolicyPage() {
  const [pageData, pageSEO] = await Promise.all([
    getPageData(),
    getPageSEO("/privacy-policy"),
  ]);

  const rawDescription = pageData?.description || "";

  return (
    <main className="min-h-screen bg-[#FDFDFE]">
      <JsonLdSchema pageSEO={pageSEO} />

      {/* ── Header ── */}
      <section className="relative pt-32 sm:pt-40 pb-12 sm:pb-16 bg-gradient-to-b from-[#F4F7FC] via-white to-[#FDFDFE] border-b border-neutral-200/70">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#1748BB 1.2px, transparent 1.2px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-[#1748BB]/30 text-[#1748BB] font-sans text-xs font-bold px-3.5 py-1.5 rounded-full bg-[#1748BB]/5 mb-4">
              <ShieldCheck size={14} className="text-[#1748BB]" />
              PRIVACY &amp; DATA PROTECTION
            </div>
            <h1
              className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(32px, 4.5vw, 54px)" }}
            >
              Privacy Policy
            </h1>
            <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
              Valavan Academy is a brand of Valavan Ventures Private Limited (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). Registered office: SF No 157/3, Mandabam Street, Salaipettai, Pernambut Taluk, Vellore District, Tamil Nadu – 635810 · CIN: U85500TN2026PTC190473.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-neutral-500 pt-3">
              <span>Under Digital Personal Data Protection Act, 2023</span>
              <span className="w-1 h-1 rounded-full bg-neutral-300" />
              <span>Last updated: November 2026</span>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Content ── */}
      <section className="py-12 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-10">
              {rawDescription ? (
                <div className="bg-white rounded-2xl p-6 sm:p-10 border border-neutral-200/80 shadow-xs space-y-6">
                  <div className="prose prose-neutral max-w-none font-sans text-neutral-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                    {rawDescription}
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <article className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-4">
                    <h2 className="font-display font-bold text-xl text-[#1E2026]">
                      1. What We Collect
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-sans text-sm text-neutral-600 border-collapse">
                        <thead>
                          <tr className="border-b border-neutral-200 text-[#1E2026] font-semibold">
                            <th className="py-2.5 pr-4">Data Type</th>
                            <th className="py-2.5">When Collected</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                          <tr>
                            <td className="py-2.5 pr-4 font-medium text-neutral-800">Name, mobile, email, city, program</td>
                            <td className="py-2.5">When you fill a form, register, enrol or message us</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 pr-4 font-medium text-neutral-800">Messages &amp; Replies</td>
                            <td className="py-2.5">WhatsApp, Instagram, Facebook Messenger, email</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 pr-4 font-medium text-neutral-800">Consent Logs</td>
                            <td className="py-2.5">Forms, chats, calls</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 pr-4 font-medium text-neutral-800">Payment Details</td>
                            <td className="py-2.5">Processed securely via Razorpay (we never store raw card/UPI details)</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 pr-4 font-medium text-neutral-800">Analytics &amp; UTM</td>
                            <td className="py-2.5">Website visits, browser type, referral tags</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </article>

                  <article className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-3">
                    <h2 className="font-display font-bold text-xl text-[#1E2026]">
                      2. Why We Use It
                    </h2>
                    <ul className="list-disc pl-5 space-y-1.5 font-sans text-neutral-600 text-sm sm:text-base">
                      <li>To reply to enquiries and send requested brochures.</li>
                      <li>To register you for webinars, workshops, and send reminders.</li>
                      <li>To process payments, installments, and deliver LMS course access.</li>
                      <li>To provide ongoing student mentoring, certificates, and project reviews.</li>
                      <li>To send WhatsApp course updates only when consented.</li>
                    </ul>
                  </article>

                  <article className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-3">
                    <h2 className="font-display font-bold text-xl text-[#1E2026]">
                      3. WhatsApp &amp; Marketing Messages
                    </h2>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
                      We send course updates on WhatsApp only after you explicitly opt in. You can stop anytime by replying STOP on WhatsApp or emailing us.
                    </p>
                  </article>

                  <article className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-3">
                    <h2 className="font-display font-bold text-xl text-[#1E2026]">
                      4. Who We Share Data With
                    </h2>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
                      We do NOT sell your data. We share only with vetted infrastructure partners: Supabase (Database Mumbai), Razorpay (Payment gateway), Meta &amp; WhatsApp, Google Workspace, and Zoho TrainerCentral (Course delivery).
                    </p>
                  </article>

                  <article className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-3">
                    <h2 className="font-display font-bold text-xl text-[#1E2026]">
                      5. Your Rights &amp; Grievance Redressal
                    </h2>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
                      Under the DPDP Act 2023, you have the right to access, rectify, or request deletion of your personal data.
                    </p>
                    <div className="bg-[#F8FAFF] p-4 rounded-xl border border-neutral-200/80 text-sm text-neutral-700 space-y-1 font-sans">
                      <p className="font-bold text-[#1E2026]">Grievance Officer:</p>
                      <p>Valavan P, Founder, Valavan Ventures Private Limited</p>
                      <p>Email: grievance@valavanacademy.com / valavanacademy@gmail.com</p>
                      <p>Phone: +91 93428 96977 (Mon–Sat, 10 AM–7 PM IST)</p>
                      <p>Address: SF No 157/3, Mandabam Street, Salaipettai, Pernambut Taluk, Vellore District, Tamil Nadu – 635810</p>
                    </div>
                  </article>
                </div>
              )}
            </div>

            {/* Sidebar Cards */}
            <div className="lg:col-span-4 space-y-6">
              {/* Terms of Service link card */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#EBF2FE] flex items-center justify-center text-[#1748BB]">
                  <FileText size={20} />
                </div>
                <h3 className="font-display font-bold text-lg text-[#1E2026]">
                  Terms &amp; Conditions
                </h3>
                <p className="font-sans text-sm text-neutral-600 leading-relaxed">
                  Review the general terms governing program registration, learning materials, and platform access.
                </p>
                <Link
                  href="/terms-conditions"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1748BB] hover:underline pt-1"
                >
                  <span>Read Terms &amp; Conditions</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Grievance Officer Card */}
              <div className="bg-[#0D0F14] text-white rounded-2xl p-6 border border-white/10 shadow-lg space-y-4">
                <p className="font-sans font-semibold text-xs uppercase tracking-wider text-[#1748BB]">
                  Grievance Officer
                </p>
                <h3 className="font-display font-bold text-lg text-white">
                  Valavan P
                </h3>
                <p className="font-sans text-xs text-neutral-400">
                  Valavan Ventures Private Limited
                </p>

                <div className="space-y-2.5 text-xs font-sans text-neutral-300 pt-1">
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-[#1748BB] shrink-0" />
                    <a href="tel:+919342896977" className="hover:text-white transition-colors">
                      +91 93428 96977
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-[#1748BB] shrink-0" />
                    <a href="mailto:valavanacademy@gmail.com" className="hover:text-white transition-colors break-all">
                      valavanacademy@gmail.com
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-[#1748BB] shrink-0 mt-0.5" />
                    <span>SF No 157/3, Mandabam Street, Salaipettai, Pernambut Taluk, Vellore Dist - 635810</span>
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
