import type { Metadata } from 'next'
import HistoriaContent from '@/components/HistoriaContent'

export const metadata: Metadata = {
  title: 'Historia – El Racó del Pantà',
  description: 'La historia detrás de El Racó del Pantà.',
}

export default function Page() {
  return <HistoriaContent />
}
