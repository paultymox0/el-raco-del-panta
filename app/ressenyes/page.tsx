import type { Metadata } from 'next'
import ResenyesContent from '@/components/ResenyesContent'

export const metadata: Metadata = {
  title: 'Reseñas – El Racó del Pantà',
  description: 'Opiniones y reseñas de El Racó del Pantà.',
}

export default function Page() {
  return <ResenyesContent />
}
