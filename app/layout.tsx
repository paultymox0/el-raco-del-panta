import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { COMING_SOON } from '@/lib/config'
import ComingSoon from './coming-soon'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ConsentProvider } from '@/lib/ConsentContext'
import CookieConsent from '@/components/CookieConsent'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

const BASE_URL = 'https://www.elracodelpanta.cat'

export const metadata: Metadata = COMING_SOON
  ? {
      metadataBase: new URL(BASE_URL),
      title: 'El Racó del Pantà – Restaurant a Talarn',
      description: 'Restaurant al Pantà de Sant Antoni, Talarn (Lleida). Estem preparant la nostra web. Estamos preparando nuestra web.',
    }
  : {
      metadataBase: new URL(BASE_URL),
      title: 'El Racó del Pantà – Restaurante',
      description: 'Restaurante El Racó del Pantà. Tapas, brasa y cocina catalana de temporada con vistas increíbles al pantano.',
      openGraph: {
        title: 'El Racó del Pantà – Restaurante',
        description: 'Tapas, brasa y cocina catalana de temporada con vistas al Pantà de Sant Antoni.',
        url: BASE_URL,
        siteName: 'El Racó del Pantà',
        images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'El Racó del Pantà – Restaurante' }],
        locale: 'es_ES',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'El Racó del Pantà – Restaurante',
        description: 'Tapas, brasa y cocina catalana de temporada con vistas al Pantà de Sant Antoni.',
        images: ['/opengraph-image'],
      },
    }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'El Racó del Pantà',
    image: [
      'https://www.elracodelpanta.cat/entorno/hero-entorno.JPG',
      'https://www.elracodelpanta.cat/entorno/2.JPG',
    ],
    logo: 'https://www.elracodelpanta.cat/logo.png',
    sameAs: [
      'https://www.instagram.com/elracodelpanta',
      'https://www.tiktok.com/@elracodelpanta',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'C-13, 91',
      addressLocality: 'Talarn',
      addressRegion: 'Lleida',
      postalCode: '25630',
      addressCountry: 'ES',
    },
    telephone: '+34633043077',
    url: 'https://www.elracodelpanta.cat',
    description:
      'Tapas, brasa i cuina catalana de temporada amb vistes al Pantà de Sant Antoni, a Talarn (Pallars Jussà).',
    hasMap: 'https://maps.app.goo.gl/tpbXkdwr8J6UPk6p9',
    servesCuisine: ['Catalan', 'Tapas', 'Grill'],
    priceRange: '€€',
    hasMenu: 'https://www.elracodelpanta.cat/menu',
    acceptsReservations: true,
  }

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-parchment text-brown font-body">
        {COMING_SOON ? (
          <ComingSoon />
        ) : (
          <ConsentProvider>
            <LanguageProvider>
              <Navbar />
              <LanguageSwitcher />
              <main>{children}</main>
              <Footer />
              <WhatsAppButton />
              <CookieConsent />
            </LanguageProvider>
          </ConsentProvider>
        )}
        <Analytics />
      </body>
    </html>
  )
}
