import type { Metadata } from 'next'
import HistoriaContent from '@/components/HistoriaContent'

const PAGE_URL = 'https://www.elracodelpanta.cat/historia'

export const metadata: Metadata = {
  title: 'Historia – El Racó del Pantà',
  description: 'La historia detrás de El Racó del Pantà.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Historia – El Racó del Pantà',
    description: 'La historia detrás de El Racó del Pantà.',
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
  return <HistoriaContent />
}
