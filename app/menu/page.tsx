import type { Metadata } from 'next'
import MenuContent from '@/components/MenuContent'

export const metadata: Metadata = {
  title: 'Menú – El Racó del Pantà',
  description:
    'La nostra carta de tapes, brasa, peixos i postres. Cuina catalana amb productes de temporada.',
}

export default function MenuPage() {
  return <MenuContent />
}
