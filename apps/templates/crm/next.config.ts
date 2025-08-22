/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow embedding in iframes for preview
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors 'self' ${process.env.GALLERY_DOMAIN || "https://*.vercel.app"} https://*.vercel.app;`,
          },
        ],
      },
    ];
  },

  // Standalone build for easier deployment
  output: "standalone",

  // Optional: Add base path if needed
  basePath: process.env.NODE_ENV === "production" ? "" : "",

  // Optimize for static export if you want to serve from CDN
  trailingSlash: true,

  images: {
    domains: ["localhost"],
    unoptimized: false,
  },

  // Handle turbopack in dev
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

module.exports = nextConfig;
