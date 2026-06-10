import type { Metadata } from 'next'
import EntornoContent from '@/components/EntornoContent'

export const metadata: Metadata = {
  title: 'El Entorno – El Racó del Pantà',
  description: 'Un rincón único entre montañas y agua. Conoce el entorno natural que rodea El Racó del Pantà.',
}

export default function EntornoPage() {
  return <EntornoContent />
}
