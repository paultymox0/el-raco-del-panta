import { MetadataRoute } from 'next'

const BASE = 'https://www.elracodelpanta.cat'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const pages: Array<{
    path: string
    freq: MetadataRoute.Sitemap[number]['changeFrequency']
    priority: number
  }> = [
    { path: '',             freq: 'weekly',  priority: 1.0 },
    { path: '/menu',        freq: 'weekly',  priority: 0.9 },
    { path: '/ressenyes',   freq: 'weekly',  priority: 0.8 },
    { path: '/fotos',       freq: 'monthly', priority: 0.7 },
    { path: '/entorno',     freq: 'monthly', priority: 0.7 },
    { path: '/historia',    freq: 'monthly', priority: 0.7 },
    { path: '/informacion', freq: 'monthly', priority: 0.8 },
    { path: '/aviso-legal', freq: 'yearly',  priority: 0.3 },
    { path: '/privacidad',  freq: 'yearly',  priority: 0.3 },
    { path: '/cookies',     freq: 'yearly',  priority: 0.3 },
  ]

  return pages.map(({ path, freq, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }))
}
