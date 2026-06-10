import type { Metadata } from 'next'
import InformacionContent from '@/components/InformacionContent'

export const metadata: Metadata = {
  title: 'Información – El Racó del Pantà',
  description: 'Horarios, dirección y cómo llegar a El Racó del Pantà.',
}

export default function InformacionPage() {
  return <InformacionContent />
}
