import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { COMING_SOON } from '@/lib/config'
import ComingSoon from './coming-soon'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = COMING_SOON
  ? {
      title: 'Próximamente – El Racó del Pantà',
      description: 'El Racó del Pantà – Algo especial está en camino.',
    }
  : {
      title: 'El Racó del Pantà – Restaurante',
      description: 'Restaurante El Racó del Pantà. Tapas, brasa y cocina española con vistas increíbles al pantano.',
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
    image: 'https://www.elracodelpanta.cat/logo.png',
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
    servesCuisine: ['Spanish', 'Tapas', 'Grill'],
    priceRange: '€€',
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '23:00',
    }],
  }

  return (
    <html lang="ca">
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
          <LanguageProvider>
            <Navbar />
            <LanguageSwitcher />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
          </LanguageProvider>
        )}
        <Analytics />
      </body>
    </html>
  )
}
