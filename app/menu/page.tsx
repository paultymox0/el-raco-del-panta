import type { Metadata } from 'next'
import MenuContent from '@/components/MenuContent'

const PAGE_URL = 'https://www.elracodelpanta.cat/menu'

export const metadata: Metadata = {
  title: 'Menú – El Racó del Pantà',
  description:
    'La nostra carta de tapes, brasa, peixos i postres. Cuina catalana de temporada.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Menú – El Racó del Pantà',
    description: 'La nostra carta de tapes, brasa, peixos i postres. Cuina catalana de temporada.',
    url: PAGE_URL,
    siteName: 'El Racó del Pantà',
    images: [{ url: '/menu/entrantes/braves.jpg', width: 1200, height: 630, alt: 'Menú – El Racó del Pantà' }],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/menu/entrantes/braves.jpg'],
  },
}

export default function MenuPage() {
  return <MenuContent />
}
