import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

// Wrap with Sentry. Runtime error capture is controlled by the DSN env vars (no-op if unset).
// Source-map upload only happens when SENTRY_AUTH_TOKEN is present, so the build never requires it.
export default withSentryConfig(nextConfig, {
  org: "vitacrypt",
  project: "paulburg",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
});
