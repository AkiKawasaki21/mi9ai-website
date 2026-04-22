import type { Metadata, Viewport } from "next";
import { Bebas_Neue, IBM_Plex_Mono } from "next/font/google";

import { ScanlineOverlay } from "@/components/layout/ScanlineOverlay";

import "./globals.css";

const displayFont = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const bodyFont = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mi9.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MI9 | AI Agent Deployment Agency",
  description:
    "MI9 professionally deploys and configures OpenClaw and NemoClaw AI agents for businesses, startups, freelancers, and personal rigs.",
  applicationName: "MI9",
  alternates: {
    canonical: "/"
  },
  keywords: [
    "MI9",
    "AI agent deployment",
    "OpenClaw",
    "NemoClaw",
    "AI workflow automation",
    "AI setup agency"
  ],
  openGraph: {
    title: "MI9 | We Deploy AI Agents.",
    description:
      "OpenClaw and NemoClaw, installed, configured, and ready to operate for your business or your machine.",
    type: "website",
    url: "/",
    siteName: "MI9",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MI9 AI Agent Deployment Agency"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "MI9 | We Deploy AI Agents.",
    description:
      "Professionally deployed OpenClaw and NemoClaw agents, configured to your exact mission.",
    images: ["/og-image.png"]
  },
  icons: {
    icon: "/icon.png"
  }
};

export const viewport: Viewport = {
  themeColor: "#080810",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-[var(--mi9-black)]">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} min-h-screen bg-[var(--mi9-black)] font-body text-[var(--mi9-white)] antialiased`}
      >
        <ScanlineOverlay />
        <div className="relative min-h-screen overflow-x-clip">{children}</div>
      </body>
    </html>
  );
}
