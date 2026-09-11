import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.paulburg.com" }],
        destination: "https://paulburg.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // via.placeholder.com removed: scaffolding left over from the template,
      // referenced by nothing, and an allow-listed third-party host is a route
      // through which /_next/image will proxy whatever it is asked to.
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  async headers() {
    // Measured on production before this: only strict-transport-security, set
    // by Cloudflare. No CSP, no framing policy, no referrer policy — on a site
    // that carries a public intake form and injects two inline scripts.
    //
    // CSP is Report-Only to begin with, deliberately: the theme and language
    // script in the root layout and the JSON-LD block are inline, so a blocking
    // policy needs nonces threaded through them. Report-Only collects the
    // violations without breaking the page, and the policy can be enforced once
    // the reports come back clean.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://img.youtube.com https://www.googletagmanager.com",
      "font-src 'self'",
      "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          { key: "Content-Security-Policy-Report-Only", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
