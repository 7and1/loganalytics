import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DeveloperHud } from "@/components/debug/DeveloperHud";
import { DuckDBPreloader } from "@/components/ui/DuckDBPreloader";

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://loganalytics.org'),
  title: {
    default: "LogAnalytics — Local-First Log Intelligence",
    template: "%s | LogAnalytics",
  },
  description: "Analyze Apache, Nginx, and AWS logs entirely in your browser with DuckDB-Wasm. Privacy-first, zero-backend log analysis tool powered by local SQL.",
  keywords: ["log analysis", "DuckDB", "browser-based analytics", "local-first", "privacy", "nginx logs", "apache logs", "AWS logs", "SQL log parser"],
  authors: [{ name: "LogAnalytics Team" }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://loganalytics.org",
    siteName: "LogAnalytics",
    title: "LogAnalytics — Local-First Log Intelligence",
    description: "Analyze Apache, Nginx, and AWS logs entirely in your browser with DuckDB-Wasm. Privacy-first, zero-backend log analysis.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LogAnalytics — Local-First Log Intelligence",
    description: "Analyze Apache, Nginx, and AWS logs entirely in your browser. Privacy-first, powered by DuckDB-Wasm.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="min-h-screen bg-page text-slate-900">
        <Header />
        <div className="pt-24 pb-16">{children}</div>
        <Footer />
        <DeveloperHud />
        <DuckDBPreloader />
      </body>
    </html>
  );
}
