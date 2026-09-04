import type { Metadata } from "next";
import { Cinzel, Oswald, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema } from "@/lib/structured-data";

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

const SITE_URL = "https://www.gatorredleg.org";
const SITE_NAME = "Gator Redlegs";
const SITE_TITLE =
  "Gator Redlegs — Florida Chapter of the US Field Artillery Association";
const SITE_DESCRIPTION =
  "A 501(c)(3) non-profit professional association serving Florida's Field Artillery Soldiers, veterans, and families in support of the 116th Field Artillery Regiment.";
const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Gator Redlegs — Florida Chapter of the US Field Artillery Association",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Gator Redleg Chapter, USFAA" }],
  creator: "Gator Redleg Chapter, USFAA",
  keywords: [
    "Gator Redlegs",
    "USFAA",
    "Field Artillery",
    "Florida",
    "116th Field Artillery",
    "St. Barbara's Ball",
    "501(c)(3)",
  ],
  // Intentionally omit openGraph.title / description so child page title +
  // description cascade into share cards via the template above.
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE],
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/icon.png", type: "image/png" }],
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
        <JsonLd data={organizationSchema} />
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
