// 📸 Ver /public/INSTRUCCIONES-FOTOS.txt para guía de imágenes
import type { Metadata } from 'next'
import EventoForm from '@/components/EventoForm'
import BotanicalLeaf from '@/components/BotanicalLeaf'
import LocalImage from '@/components/LocalImage'

export const metadata: Metadata = {
  title: 'Eventos – El Racó del Pantà',
  description: 'Celebra con nosotros. Cumpleaños, eventos de empresa, bodas y grupos en El Racó del Pantà.',
}

const eventTypes = [
  {
    emoji: '🎂',
    title: 'Cumpleaños y celebraciones',
    description: 'Haz de tu día especial un recuerdo imborrable. Decoración personalizada y menú a tu medida.',
    img: '/eventos/cumpleanos.jpg',
  },
  {
    emoji: '💼',
    title: 'Eventos de empresa',
    description: 'El espacio perfecto para reuniones, team buildings y celebraciones corporativas.',
    img: '/eventos/empresa.jpg',
  },
  {
    emoji: '👨‍👩‍👧‍👦',
    title: 'Grupos y familias',
    description: 'Reuniones familiares y de amigos con menús especiales para grupos a partir de 15 personas.',
    img: '/eventos/grupos.jpg',
  },
  {
    emoji: '💍',
    title: 'Bodas y celebraciones especiales',
    description: 'Un entorno mágico junto al pantano para el día más importante de tu vida.',
    img: '/eventos/bodas.jpg',
  },
]

export default function EventosPage() {
  return (
    <div className="pt-20 min-h-screen bg-parchment">
      {/* Header */}
      <div className="relative bg-green-dark py-20 px-4 text-center overflow-hidden">
        <BotanicalLeaf className="absolute top-4 left-4 w-20 h-28 opacity-20" />
        <BotanicalLeaf className="absolute top-4 right-4 w-20 h-28 opacity-20 scale-x-[-1]" />
        <h1 className="font-heading text-5xl font-black text-cream mb-3">Celebra con nosotros</h1>
        <p className="text-cream/70 font-body text-lg max-w-xl mx-auto">
          Lo hacemos especial, sea cual sea la ocasión
        </p>
      </div>

      {/* Event type cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventTypes.map((ev) => (
            <div
              key={ev.title}
              className="bg-parchment border-2 border-transparent hover:border-green-dark rounded-2xl overflow-hidden shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-44 overflow-hidden">
                <LocalImage
                  src={ev.img}
                  alt={ev.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  icon={ev.emoji}
                />
              </div>
              <div className="p-6 text-center">
                <div className="text-3xl mb-3">{ev.emoji}</div>
                <h3 className="font-heading text-lg font-bold text-green-dark mb-2">{ev.title}</h3>
                <p className="text-brown/70 font-body text-sm mb-4">{ev.description}</p>
                <a
                  href="#contacto-evento"
                  className="inline-block border border-green-dark text-green-dark px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-dark hover:text-cream transition-colors"
                >
                  Consultar disponibilidad
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <section id="contacto-evento" className="py-16 px-4 bg-cream">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-4xl font-bold text-green-dark mb-3">¿Tienes un evento en mente?</h2>
            <p className="text-brown/70 font-body">Cuéntanos los detalles y diseñamos juntos tu celebración perfecta</p>
          </div>
          <div className="bg-parchment rounded-3xl shadow-lg p-8">
            <EventoForm />
          </div>
        </div>
      </section>
    </div>
  )
}
