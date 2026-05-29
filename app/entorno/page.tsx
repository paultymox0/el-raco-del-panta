import type { Metadata } from 'next'
import BotanicalLeaf from '@/components/BotanicalLeaf'

export const metadata: Metadata = {
  title: 'El Entorno – El Racó del Pantà',
  description: 'Un rincón único entre montañas y agua. Conoce el entorno natural que rodea El Racó del Pantà.',
}

const features = [
  {
    emoji: '🏔️',
    title: 'Las montañas',
    description: 'Paisaje natural espectacular que cambia con cada estación. La naturaleza en su estado más puro rodeando nuestro restaurante.',
  },
  {
    emoji: '💧',
    title: 'El pantano',
    description: 'Vistas al agua que hacen de cada comida una experiencia única. El reflejo del cielo en el agua crea un ambiente incomparable.',
  },
  {
    emoji: '🔥',
    title: 'La brasa',
    description: 'Productos de la zona cocinados a la brasa, sabor auténtico. La tradición culinaria de la comarca en cada bocado.',
  },
]

const naturePhotos = [
  { src: 'https://picsum.photos/seed/entorno1/800/500', alt: 'El pantano' },
  { src: 'https://picsum.photos/seed/entorno2/800/500', alt: 'Las montañas' },
  { src: 'https://picsum.photos/seed/entorno3/800/500', alt: 'El entorno natural' },
  { src: 'https://picsum.photos/seed/entorno4/800/500', alt: 'Paisaje de la zona' },
]

export default function EntornoPage() {
  return (
    <div className="pt-20 min-h-screen bg-parchment">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://picsum.photos/seed/entornohero/1600/900"
          alt="Entorno natural"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-dark/50 flex items-center justify-center">
          <div className="text-center px-4">
            <BotanicalLeaf className="w-16 h-24 opacity-40 mx-auto mb-4" />
            <h1 className="font-heading text-5xl md:text-6xl font-black text-cream mb-4">
              Un rincón único
            </h1>
            <p className="font-body text-cream/90 text-xl md:text-2xl">
              entre montañas y agua
            </p>
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <section className="py-20 px-4 bg-parchment">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-cream rounded-2xl p-8 text-center shadow-md border border-wood/20 hover:border-green-mid hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{f.emoji}</div>
                <h3 className="font-heading text-2xl font-bold text-green-dark mb-3">{f.title}</h3>
                <p className="text-brown/70 font-body">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SVG Map */}
      <section className="py-16 px-4 bg-green-light/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl text-green-dark font-bold mb-8">Dónde estamos</h2>

          {/* Hand-drawn style SVG map */}
          <div className="bg-cream rounded-3xl p-8 shadow-lg border border-wood/30 mb-6">
            <svg viewBox="0 0 400 300" className="w-full max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg">
              {/* Sky */}
              <rect width="400" height="300" fill="#d4e8d0" rx="12" />

              {/* Mountains */}
              <polygon points="0,200 60,100 120,160 180,80 240,150 300,90 360,140 400,120 400,200" fill="#4a7c3f" opacity="0.8" />
              <polygon points="0,200 60,130 120,180 160,110 220,170 260,120 320,160 400,140 400,200" fill="#1a3d1f" opacity="0.6" />

              {/* Water / pantano */}
              <ellipse cx="200" cy="240" rx="180" ry="50" fill="#7ec8e3" opacity="0.7" />
              <ellipse cx="200" cy="240" rx="160" ry="40" fill="#5ab4d4" opacity="0.5" />
              {/* Water waves */}
              <path d="M60,235 Q100,225 140,235 Q180,245 220,235 Q260,225 300,235 Q340,245 340,235" stroke="white" strokeWidth="2" fill="none" opacity="0.6" />
              <path d="M80,248 Q120,238 160,248 Q200,258 240,248 Q280,238 320,248" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4" />

              {/* Restaurant location pin */}
              <circle cx="200" cy="190" r="14" fill="#1a3d1f" />
              <circle cx="200" cy="190" r="8" fill="#f5ead6" />
              <circle cx="200" cy="190" r="4" fill="#1a3d1f" />
              <line x1="200" y1="204" x2="200" y2="215" stroke="#1a3d1f" strokeWidth="2" />

              {/* Label */}
              <rect x="150" y="158" width="100" height="22" rx="11" fill="#1a3d1f" />
              <text x="200" y="173" textAnchor="middle" fill="#f5ead6" fontSize="9" fontFamily="serif">El Racó del Pantà</text>

              {/* Trees */}
              <circle cx="80" cy="185" r="12" fill="#4a7c3f" opacity="0.8" />
              <circle cx="100" cy="178" r="10" fill="#4a7c3f" opacity="0.8" />
              <circle cx="300" cy="183" r="12" fill="#4a7c3f" opacity="0.8" />
              <circle cx="320" cy="176" r="10" fill="#4a7c3f" opacity="0.8" />
            </svg>
            <p className="font-body text-brown/70 mt-4 text-sm">Ven a descubrir este rincón especial</p>
          </div>

          {/* TODO: Replace with real Google Maps URL */}
          <a
            href="https://maps.google.com/?q=El+Raco+del+Panta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-dark text-cream px-8 py-3 rounded-full font-heading font-bold hover:bg-green-mid transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Cómo llegar
          </a>
        </div>
      </section>

      {/* Photo grid */}
      <section className="py-20 px-4 bg-parchment">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl text-green-dark text-center mb-10">El entorno en imágenes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {naturePhotos.map((photo) => (
              <div key={photo.src} className="relative overflow-hidden rounded-2xl group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-green-dark/0 group-hover:bg-green-dark/30 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
