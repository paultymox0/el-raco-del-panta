/** @type {import('next').NextConfig} */
// next dev bundles client modules with eval(), which a CSP without 'unsafe-eval'
// blocks — that breaks hydration in `next dev`. Allow it in development only;
// production stays strict (no eval is used in production builds).
const isDev = process.env.NODE_ENV !== 'production'

const nextConfig = {
  eslint: {
    // ESLint is run separately (npm run lint); skip it during `next build` to
    // keep production builds fast. Type-checking still runs and still fails builds.
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval' " : ''}*.vercel-insights.com`,
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https://*.googleusercontent.com https://*.google.com https://lh3.googleusercontent.com https:",
              "frame-src 'self' *.google.com maps.google.com",
              "connect-src 'self' vitals.vercel-insights.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
