// 📸 Ver /public/INSTRUCCIONES-FOTOS.txt para guía de imágenes
import type { Metadata } from 'next'
import LocalImage from '@/components/LocalImage'

export const metadata: Metadata = {
  title: 'Fotos – El Racó del Pantà',
  description: 'Galería de fotos del restaurante, los platos y el entorno natural del pantano.',
}

type Photo = { src: string; caption: string }
type PhotoCategory = 'local' | 'platos' | 'entorno'

const photos: Record<PhotoCategory, Photo[]> = {
  local: [
    { src: '/fotos/local/foto-1.jpg', caption: 'Salón principal' },
    { src: '/fotos/local/foto-2.jpg', caption: 'Terraza con vistas' },
    { src: '/fotos/local/foto-3.jpg', caption: 'Barra de madera' },
    { src: '/fotos/local/foto-4.jpg', caption: 'Ambiente acogedor' },
    { src: '/fotos/local/foto-5.jpg', caption: 'Detalle decoración' },
    { src: '/fotos/local/foto-6.jpg', caption: 'Entrada del restaurante' },
  ],
  platos: [
    { src: '/fotos/platos/foto-1.jpg', caption: 'Chuletón a la brasa' },
    { src: '/fotos/platos/foto-2.jpg', caption: 'Tabla de ibéricos' },
    { src: '/fotos/platos/foto-3.jpg', caption: 'Pulpo a la gallega' },
    { src: '/fotos/platos/foto-4.jpg', caption: 'Crema catalana' },
    { src: '/fotos/platos/foto-5.jpg', caption: 'Gambas al ajillo' },
    { src: '/fotos/platos/foto-6.jpg', caption: 'Patatas bravas' },
  ],
  entorno: [
    { src: '/fotos/entorno/foto-1.jpg', caption: 'El pantano' },
    { src: '/fotos/entorno/foto-2.jpg', caption: 'Las montañas' },
    { src: '/fotos/entorno/foto-3.jpg', caption: 'Atardecer' },
    { src: '/fotos/entorno/foto-4.jpg', caption: 'Vistas desde la terraza' },
    { src: '/fotos/entorno/foto-5.jpg', caption: 'Paisaje otoñal' },
    { src: '/fotos/entorno/foto-6.jpg', caption: 'Amanecer en el pantano' },
  ],
}

const filterKeys: PhotoCategory[] = ['local', 'platos', 'entorno']
const filterLabels: Record<PhotoCategory, string> = {
  local: 'El local',
  platos: 'Los platos',
  entorno: 'El entorno',
}
const filterIcons: Record<PhotoCategory, string> = {
  local: '🏠',
  platos: '🍽️',
  entorno: '🏔️',
}

export default function FotosPage() {
  return (
    <div className="pt-20 min-h-screen bg-parchment">
      <div className="bg-green-dark py-16 px-4 text-center">
        <h1 className="font-heading text-5xl font-black text-cream mb-3">Galería de Fotos</h1>
        <p className="text-cream/70 font-body">Un vistazo a nuestra cocina, nuestro local y nuestro entorno</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {filterKeys.map((key) => (
          <div key={key} className="mb-16">
            <h2 className="font-heading text-2xl text-green-dark font-bold mb-6 flex items-center gap-3">
              <span>{filterLabels[key]}</span>
              <div className="flex-1 h-px bg-wood" />
            </h2>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {photos[key].map((photo) => (
                <div key={photo.src} className="break-inside-avoid relative group overflow-hidden rounded-xl">
                  <LocalImage
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full min-h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    icon={filterIcons[key]}
                  />
                  <div className="absolute inset-0 bg-green-dark/0 group-hover:bg-green-dark/60 transition-all duration-300 flex items-end">
                    <p className="text-cream font-body font-semibold px-4 py-3 translate-y-8 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center py-16 px-4 bg-green-light/30">
        <p className="font-body text-brown/70 mb-4">¿Quieres ver más? Síguenos en Instagram</p>
        <a
          href="https://www.instagram.com/elracodelpanta"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-dark text-cream px-8 py-3 rounded-full font-heading font-bold hover:bg-green-mid transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          @elracodelpanta
        </a>
      </div>
    </div>
  )
}
