import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static PNG assets are pre-sized; skip the image optimizer so the site
  // deploys cleanly to Cloudflare Workers without an image route.
  images: { unoptimized: true },
  // Bundle chapter markdown into the Worker. `fs.readFileSync` works in
  // `next dev` / Node builds but fails at runtime on Cloudflare Workers —
  // OpenNext still invokes these routes as SSR/RSC even when marked static.
  webpack(config) {
    config.module.rules.push({
      test: /\.md$/,
      type: "asset/source",
    });
    return config;
  },
  turbopack: {
    rules: {
      "*.md": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },
  async redirects() {
    return [
      {
        // Chapter Zoom room — mirrors the Cloudflare redirect rule.
        source: "/zoom",
        destination:
          "https://us06web.zoom.us/j/84328962777?pwd=g9adf6I2mg3MC5mSalR5aa1dUAQEmZ.1",
        permanent: false,
      },
      // URL parity: live home is /home; we serve it at /.
      { source: "/home", destination: "/", permanent: true },
      // URL parity: correct the misspelled "activites" base, preserving inbound links.
      {
        source: "/chapter-activites",
        destination: "/chapter-activities",
        permanent: true,
      },
      {
        source: "/chapter-activites/:path*",
        destination: "/chapter-activities/:path*",
        permanent: true,
      },
      // Dropped for now — redirect old live paths to their nearest parent.
      { source: "/photos", destination: "/", permanent: false },
      { source: "/photos/:path*", destination: "/", permanent: false },
      {
        source: "/chapter-activities/st-barbaras-ball/survey",
        destination: "/chapter-activities/st-barbaras-ball",
        permanent: false,
      },
      {
        source: "/chapter-activities/softball-tournament/registration",
        destination: "/chapter-activities/softball-tournament",
        permanent: false,
      },
      {
        source: "/chapter-activities/5k-run/registration",
        destination: "/chapter-activities/5k-run",
        permanent: false,
      },
      {
        source: "/chapter-activities/golf-tournament/registration",
        destination: "/chapter-activities/golf-tournament",
        permanent: false,
      },
      // 2026 Dining Out is local (Winter Haven Armory) — no hotel/lodging.
      {
        source: "/chapter-activities/st-barbaras-ball/lodging",
        destination: "/chapter-activities/st-barbaras-ball",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

// Enable Cloudflare bindings in `next dev` when developing against the adapter.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
