import type { Metadata } from 'next'
import ResenyesContent from '@/components/ResenyesContent'

const PAGE_URL = 'https://www.elracodelpanta.cat/ressenyes'

export const metadata: Metadata = {
  title: 'Reseñas – El Racó del Pantà',
  description: 'Opiniones y reseñas de El Racó del Pantà.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Reseñas – El Racó del Pantà',
    description: 'Opiniones y reseñas de El Racó del Pantà.',
    url: PAGE_URL,
    siteName: 'El Racó del Pantà',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'El Racó del Pantà – Restaurante' }],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/opengraph-image'],
  },
}

export default function Page() {
  return <ResenyesContent />
}
