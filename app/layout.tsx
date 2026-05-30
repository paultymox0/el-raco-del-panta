import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import LanguageSplash from '@/components/LanguageSplash'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import MobileReserveButton from '@/components/MobileReserveButton'

export const metadata: Metadata = {
  title: 'El Racó del Pantà – Restaurante',
  description: 'Restaurante El Racó del Pantà. Tapas, brasa y cocina española con vistas increíbles al pantano.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ca">
      <body className="min-h-screen bg-parchment text-brown font-body">
        <LanguageProvider>
          <LanguageSplash />
          <Navbar />
          <LanguageSwitcher />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <MobileReserveButton />
        </LanguageProvider>
      </body>
    </html>
  )
}
