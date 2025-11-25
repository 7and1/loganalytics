import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { FormatGrid } from "@/components/home/FormatGrid";
import { Faq } from "@/components/home/Faq";
import { ToolSection } from "@/components/home/ToolSection";
import { DeepDive } from "@/components/home/DeepDive";
import { OrganizationJsonLd, WebSiteJsonLd, SoftwareApplicationJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Log Analytics Tool — Parse Apache, Nginx & AWS Logs Locally",
  description: "Free browser-based log analytics tool powered by DuckDB-Wasm. Analyze Apache, Nginx, AWS S3 logs with SQL. Local log analytics software for privacy-first log analysis. No installation required.",
  keywords: ["log analytics", "log analytics tool", "log analysis", "browser log analytics", "local log analytics", "free log analytics", "server log analysis", "nginx log analytics", "apache log analytics"],
  openGraph: {
    title: "Log Analytics Tool — Parse Apache, Nginx & AWS Logs Locally",
    description: "Free browser-based log analytics tool. Analyze Apache, Nginx, AWS logs with SQL. 100% local log analytics, privacy-first.",
  },
};

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <SoftwareApplicationJsonLd />
      <main className="space-y-16">
        <Hero />
        <div className="mt-12">
          <ToolSection />
        </div>
        <DeepDive />
        <ValueProps />
        <FormatGrid />
        <Faq />
      </main>
    </>
  );
}
