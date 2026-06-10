import type { Metadata } from 'next'
import ReservarContent from '@/components/ReservarContent'

export const metadata: Metadata = {
  title: 'Reservar Mesa – El Racó del Pantà',
  description: 'Reserva tu mesa en El Racó del Pantà. Te confirmamos en menos de 24 horas.',
}

export default function ReservarPage() {
  return <ReservarContent />
}
