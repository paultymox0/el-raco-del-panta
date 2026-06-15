import type { Metadata } from 'next'
import HomeContent from '@/components/HomeContent'

const PAGE_URL = 'https://www.elracodelpanta.cat'

export const metadata: Metadata = {
  title: 'El Racó del Pantà – Restaurante tapas y brasa con vistas al pantano',
  description:
    'Restaurante El Racó del Pantà. Tapas, brasa y cocina catalana de temporada con vistas increíbles al pantano. ¡Recién abiertos! Reserva tu mesa online.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'El Racó del Pantà – Restaurante',
    description: 'Tapas, brasa y cocina catalana de temporada con vistas al pantano. ¡Recién abiertos!',
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

export default function HomePage() {
  return <HomeContent />
}
