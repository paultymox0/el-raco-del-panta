import type { Metadata } from 'next'
import HomeContent from '@/components/HomeContent'

export const metadata: Metadata = {
  title: 'El Racó del Pantà – Restaurante tapas y brasa con vistas al pantano',
  description:
    'Restaurante El Racó del Pantà. Tapas, brasa y cocina española con vistas increíbles al pantano. ¡Recién abiertos! Reserva tu mesa online.',
  openGraph: {
    title: 'El Racó del Pantà – Restaurante',
    description: 'Tapas, brasa y vistas al pantano. ¡Recién abiertos!',
    type: 'website',
  },
}

export default function HomePage() {
  return <HomeContent />
}
