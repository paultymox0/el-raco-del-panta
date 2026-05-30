// 📸 Ver /public/INSTRUCCIONES-FOTOS.txt para guía de imágenes
import type { Metadata } from 'next'
import FotosContent from '@/components/FotosContent'

export const metadata: Metadata = {
  title: 'Fotos – El Racó del Pantà',
  description: 'Galería de fotos del restaurante, los platos y el entorno natural del pantano.',
}

export default function FotosPage() {
  return <FotosContent />
}
