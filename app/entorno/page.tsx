// 📸 Hero background: add photo as /public/entorno/hero-entorno.jpg
// Any photo from the /public/entorno/ folder works as fallback

// 📸 Add photos to /public/entorno/ — any amount, any order
// Accepted: .jpg .jpeg .png .webp

import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import EntornoContent from '@/components/EntornoContent'

export const metadata: Metadata = {
  title: 'El Entorno – El Racó del Pantà',
  description: 'Un rincón único entre montañas y agua. Conoce el entorno natural que rodea El Racó del Pantà.',
}

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const HERO_NAMES = [
  'hero-entorno.jpg', 'hero-entorno.JPG',
  'hero-entorno.jpeg', 'hero-entorno.JPEG',
  'hero-entorno.png', 'hero-entorno.PNG',
  'hero-entorno.webp', 'hero-entorno.WEBP',
]

function getEntornoPhotos(): string[] {
  const dir = path.join(process.cwd(), 'public', 'entorno')
  const heroSet = new Set(HERO_NAMES.map(n => n.toLowerCase()))
  try {
    return fs
      .readdirSync(dir)
      .filter(f => IMAGE_EXTS.has(path.extname(f).toLowerCase()) && !heroSet.has(f.toLowerCase()))
      .sort()
      .map(f => `/entorno/${f}`)
  } catch {
    return []
  }
}

function getHeroSrc(photos: string[]): string | null {
  const dir = path.join(process.cwd(), 'public', 'entorno')
  for (const name of HERO_NAMES) {
    if (fs.existsSync(path.join(dir, name))) return `/entorno/${name}`
  }
  // Fall back to first gallery photo
  return photos[0] ?? null
}

export default function EntornoPage() {
  const photos = getEntornoPhotos()
  const heroSrc = getHeroSrc(photos)
  return <EntornoContent photos={photos} heroSrc={heroSrc} />
}
