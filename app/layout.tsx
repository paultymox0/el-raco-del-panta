import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

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
    <html lang="es">
      <body className="min-h-screen bg-parchment text-brown font-body">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        {/* Mobile reserve button */}
        <a
          href="/reservar"
          className="fixed bottom-4 left-4 z-40 md:hidden bg-green-dark text-cream px-4 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2 text-sm"
        >
          🍽️ Reservar
        </a>
      </body>
    </html>
  )
}
