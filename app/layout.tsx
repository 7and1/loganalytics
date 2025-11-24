import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DeveloperHud } from "@/components/debug/DeveloperHud";

export const metadata: Metadata = {
  title: {
    default: "LogAnalytics — Local-First Log Intelligence",
    template: "%s | LogAnalytics",
  },
  description: "Analyze Apache, Nginx, and AWS logs entirely in your browser with DuckDB-Wasm.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-950 text-zinc-50">
        <Header />
        <div className="pt-20">{children}</div>
        <Footer />
        <DeveloperHud />
      </body>
    </html>
  );
}
