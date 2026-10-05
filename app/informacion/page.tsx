import type { Metadata } from 'next'
import InformacionContent from '@/components/InformacionContent'

const PAGE_URL = 'https://www.elracodelpanta.cat/informacion'

export const metadata: Metadata = {
  title: 'Información – El Racó del Pantà',
  description: 'Dirección, cómo llegar y contacto de El Racó del Pantà, junto al pantano de Sant Antoni en Talarn.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Información – El Racó del Pantà',
    description: 'Dirección, cómo llegar y contacto de El Racó del Pantà, junto al pantano de Sant Antoni en Talarn.',
    url: PAGE_URL,
    siteName: 'El Racó del Pantà',
    images: [{ url: '/entorno/1.JPG', width: 1200, height: 630, alt: 'El Racó del Pantà – Talarn, Lleida' }],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/entorno/1.JPG'],
  },
}

export default function InformacionPage() {
  return <InformacionContent />
}
