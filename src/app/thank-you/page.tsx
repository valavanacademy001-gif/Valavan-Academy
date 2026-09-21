import { Metadata } from "next";
import { getThankYouPageData } from "@/lib/cms";
import ThankYouView from "@/components/sections/ThankYouView";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Thank You For Purchasing — Valavan Academy",
  description: "Thank you for your enrollment at Valavan Academy. Access your course materials and community group.",
  robots: {
    index: false,
    follow: false,
  },
};

interface ThankYouPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const resolvedParams = await searchParams;
  const programParam = (resolvedParams?.program || resolvedParams?.course || resolvedParams?.p || "") as string;

  const data = await getThankYouPageData(programParam);

  return <ThankYouView data={data} />;
}
