import type { Metadata } from "next";
import { Cinzel, Oswald, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

// Inscriptional caps — evokes the regimental coin, medals, and monuments.
const display = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

// Condensed military-signage voice for eyebrows, nav, and labels.
const label = Oswald({
  variable: "--font-label",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gatorredleg.org"),
  title: {
    default:
      "Gator Redlegs — Florida Chapter of the US Field Artillery Association",
    template: "%s | Gator Redlegs",
  },
  description:
    "The Gator Redleg Chapter of the USFAA serves Florida's Field Artillery Soldiers, veterans, and their families.",
  authors: [{ name: "Gator Redlegs" }],
  openGraph: {
    title:
      "Gator Redlegs — Florida Chapter of the US Field Artillery Association",
    description:
      "The Gator Redleg Chapter of the USFAA serves Florida's Field Artillery Soldiers, veterans, and their families.",
    type: "website",
    url: "https://www.gatorredleg.org",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${label.variable} ${body.variable} antialiased`}
      >
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <Script
          defer
          data-domain="gatorredleg.org"
          src="https://analytics.redleg.dev/js/script.file-downloads.hash.outbound-links.js"
        />
      </body>
    </html>
  );
}
