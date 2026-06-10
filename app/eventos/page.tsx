import type { Metadata } from 'next'
import EventosContent from '@/components/EventosContent'

export const metadata: Metadata = {
  title: 'Eventos – El Racó del Pantà',
  description: 'Celebra con nosotros. Cumpleaños, eventos de empresa, bodas y grupos en El Racó del Pantà.',
}

export default function EventosPage() {
  return <EventosContent />
}
