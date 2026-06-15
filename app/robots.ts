import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/qr',
    },
    sitemap: 'https://www.elracodelpanta.cat/sitemap.xml',
  }
}
