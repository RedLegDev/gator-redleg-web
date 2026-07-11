import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static PNG assets are pre-sized; skip the image optimizer so the site
  // deploys cleanly to Cloudflare Workers without an image route.
  images: { unoptimized: true },
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
    ];
  },
};

export default nextConfig;
