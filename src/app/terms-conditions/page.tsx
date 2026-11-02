import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { supabase } from "@/lib/supabase";
import { generatePageMetadata, getPageSEO } from "@/lib/seo";
import JsonLdSchema from "@/components/seo/JsonLdSchema";
import { ShieldCheck, ArrowRight, FileText, Mail, Phone, MapPin } from "lucide-react";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const meta = await generatePageMetadata("/terms-conditions");
  return {
    ...meta,
    title: "Terms & Conditions | Valavan Academy",
    description:
      "Review the Terms and Conditions for courses, workshops, and digital programs offered by Valavan Academy.",
  };
}

async function getPageData() {
  try {
    const { data: page } = await supabase
      .from("pages")
      .select("title, description, updated_at")
      .eq("slug", "terms-conditions")
      .maybeSingle();
    return page;
  } catch {
    return null;
  }
}

export default async function TermsConditionsPage() {
  const [pageData, pageSEO] = await Promise.all([
    getPageData(),
    getPageSEO("/terms-conditions"),
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
              <FileText size={14} className="text-[#1748BB]" />
              LEGAL &amp; COMPLIANCE
            </div>
            <h1
              className="font-display font-bold text-[#1E2026] leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(32px, 4.5vw, 54px)" }}
            >
              Terms &amp; Conditions
            </h1>
            <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
              These terms apply to courses, programs, webinars and workshops offered by Valavan Academy, a brand of Valavan Ventures Private Limited. By registering, enrolling, or paying, you agree to these terms.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-neutral-500 pt-3">
              <span>Last updated: November 2026</span>
              <span className="w-1 h-1 rounded-full bg-neutral-300" />
              <span>Applicable to all online &amp; offline learners</span>
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
              {/* Dynamic or Fallback structured content */}
              {rawDescription ? (
                <div className="bg-white rounded-2xl p-6 sm:p-10 border border-neutral-200/80 shadow-xs space-y-6">
                  <div className="prose prose-neutral max-w-none font-sans text-neutral-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                    {rawDescription}
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <article className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-3">
                    <h2 className="font-display font-bold text-xl text-[#1E2026]">
                      1. Our Programs
                    </h2>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
                      90-Day Graphic Design Mastery, Full Stack Creative Master, AI 360 Mastery (recorded) and webinars / workshops, as described on our website and brochures at the time you enrol.
                    </p>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
                      Course content, schedules, tools covered and mentors may be updated to keep the course current. We will not remove the core outcome of a program you paid for.
                    </p>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
                      Live sessions are held on the published schedule (currently 2 live sessions per week for 90 Days and Full Stack). Recordings are provided where available.
                    </p>
                  </article>

                  <article className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-3">
                    <h2 className="font-display font-bold text-xl text-[#1E2026]">
                      2. Enrolment and Access
                    </h2>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
                      Access is given after payment is confirmed. Course access details are shared by email / WhatsApp; please allow up to 1 working day.
                    </p>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
                      &quot;Lifetime access&quot; means access to the course content for as long as the course is offered on our platform. If we move platforms, we will move your access.
                    </p>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
                      Your account is for you only. Sharing logins, recordings or materials, or reselling access, will end your access without refund.
                    </p>
                  </article>

                  <article className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-3">
                    <h2 className="font-display font-bold text-xl text-[#1E2026]">
                      3. Fees and Payment
                    </h2>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
                      Fees are as shown on our website or payment page at the time of payment, in Indian Rupees, inclusive of applicable taxes unless stated otherwise.
                    </p>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
                      Payments are made through Razorpay (cards, UPI, net banking, card EMI where shown) or other methods we confirm in writing. Your Razorpay receipt is your payment proof / invoice.
                    </p>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
                      Instalments: where we offer an instalment plan, the amounts and due dates are those in your written plan. If an instalment is not paid by its due date, access to the program may be paused until it is paid.
                    </p>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
                      Offers: festival or limited-time offers are valid only for the dates stated and cannot be combined unless we say so.
                    </p>
                  </article>

                  <article className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-3">
                    <h2 className="font-display font-bold text-xl text-[#1E2026]">
                      4. Refunds and Cancellation
                    </h2>
                    <ul className="list-disc pl-5 space-y-1.5 font-sans text-neutral-600 text-sm sm:text-base">
                      <li>AI 360 Mastery (recorded course): non-refundable once purchased.</li>
                      <li>90 Days / Full Stack: standard refund guidelines apply before batch cutoff.</li>
                      <li>Webinars / workshops: non-refundable, transferable to next batch.</li>
                      <li>If we cancel a program before it starts, you get a full refund.</li>
                      <li>Approved refunds are paid to the original payment method within 7–10 working days.</li>
                    </ul>
                  </article>

                  <article className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-3">
                    <h2 className="font-display font-bold text-xl text-[#1E2026]">
                      5. Certificates, Internships and Freelancing
                    </h2>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
                      A completion certificate is given when you complete the course requirements (assignments / final project / exam as stated).
                    </p>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
                      Internship and freelancing opportunities are offered only to students who qualify under the program&apos;s criteria; they are not guaranteed to every student.
                    </p>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
                      We do not guarantee any job, income, number of clients or earnings. Examples of student results are individual and not a promise.
                    </p>
                  </article>

                  <article className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-3">
                    <h2 className="font-display font-bold text-xl text-[#1E2026]">
                      6. Student Conduct
                    </h2>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
                      Be respectful to mentors and other learners in classes, groups and communities. Harassment, spam, sharing others&apos; personal data, or posting illegal content may lead to removal from the community or course without refund.
                    </p>
                  </article>

                  <article className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-3">
                    <h2 className="font-display font-bold text-xl text-[#1E2026]">
                      7. Intellectual Property
                    </h2>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
                      All course videos, materials, templates and brochures belong to Valavan Ventures Private Limited or its licensors. You may use them for your own learning and for client work you create with the skills learned. You may not copy, record, distribute or resell the course content. Work you create in the course is yours; we may showcase it with your permission.
                    </p>
                  </article>

                  <article className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-3">
                    <h2 className="font-display font-bold text-xl text-[#1E2026]">
                      8. Communications
                    </h2>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
                      We will contact you about your enquiry, payments, classes and support. Marketing messages and offers are sent only with your consent, and you can stop them at any time by replying STOP. See our Privacy Policy.
                    </p>
                  </article>

                  <article className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-3">
                    <h2 className="font-display font-bold text-xl text-[#1E2026]">
                      9. Third-Party Tools
                    </h2>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
                      Some courses use third-party software (Adobe, Canva, AI tools, etc.). Their licences or subscriptions are not included unless stated, and their terms apply.
                    </p>
                  </article>

                  <article className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-3">
                    <h2 className="font-display font-bold text-xl text-[#1E2026]">
                      10. Limitation of Liability
                    </h2>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
                      We provide courses with care, but to the extent allowed by law we are not liable for indirect losses, and our total liability for any claim is limited to the fee you paid for the program concerned.
                    </p>
                  </article>

                  <article className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-3">
                    <h2 className="font-display font-bold text-xl text-[#1E2026]">
                      11. Changes to These Terms
                    </h2>
                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
                      We may update these terms; the version on the website at the time of your enrolment applies to that enrolment, except for changes required by law.
                    </p>
                  </article>
                </div>
              )}
            </div>

            {/* Sidebar Cards */}
            <div className="lg:col-span-4 space-y-6">
              {/* Privacy Policy link card */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#EBF2FE] flex items-center justify-center text-[#1748BB]">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-display font-bold text-lg text-[#1E2026]">
                  Privacy Policy
                </h3>
                <p className="font-sans text-sm text-neutral-600 leading-relaxed">
                  Learn how we handle and protect your personal data under the Digital Personal Data Protection Act, 2023.
                </p>
                <Link
                  href="/privacy-policy"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1748BB] hover:underline pt-1"
                >
                  <span>Read Privacy Policy</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Contact Card */}
              <div className="bg-[#0D0F14] text-white rounded-2xl p-6 border border-white/10 shadow-lg space-y-4">
                <p className="font-sans font-semibold text-xs uppercase tracking-wider text-[#1748BB]">
                  Official Contact
                </p>
                <h3 className="font-display font-bold text-lg text-white">
                  Valavan Academy
                </h3>
                <p className="font-sans text-xs text-neutral-400">
                  A brand of Valavan Ventures Private Limited
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
