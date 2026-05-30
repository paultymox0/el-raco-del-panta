// 📸 Ver /public/INSTRUCCIONES-FOTOS.txt para guía de imágenes
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import BotanicalLeaf from '@/components/BotanicalLeaf'
import LocalImage from '@/components/LocalImage'

export const metadata: Metadata = {
  title: 'El Racó del Pantà – Restaurante tapas y brasa con vistas al pantano',
  description:
    'Restaurante El Racó del Pantà. Tapas, brasa y cocina española con vistas increíbles al pantano. ¡Recién abiertos! Reserva tu mesa online.',
  openGraph: {
    title: 'El Racó del Pantà – Restaurante',
    description: 'Tapas, brasa y vistas al pantano. ¡Recién abiertos!',
    type: 'website',
  },
}

const dishes = [
  {
    name: 'Chuletón a la brasa',
    description: 'Carne de primera calidad cocinada a fuego lento sobre brasa de leña',
    img: '/especialidades/especialidad-1.jpg',
  },
  {
    name: 'Tabla de ibéricos',
    description: 'Selección artesanal de embutidos ibéricos de la comarca',
    img: '/especialidades/especialidad-2.jpg',
  },
  {
    name: 'Pulpo a la gallega',
    description: 'Pulpo tierno con pimentón ahumado y aceite de oliva virgen extra',
    img: '/especialidades/especialidad-3.jpg',
  },
]

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/elracodelpanta',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    color: 'bg-pink-100 text-pink-600',
    label: '@elracodelpanta',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@elracodelpanta',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
      </svg>
    ),
    color: 'bg-gray-100 text-gray-800',
    label: '@elracodelpanta',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/34XXXXXXXXX',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    color: 'bg-green-100 text-green-700',
    label: 'Escríbenos',
  },
]

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Restaurant',
            name: 'El Racó del Pantà',
            description: 'Restaurante de tapas y brasa con vistas al pantano',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Dirección pendiente',
              addressLocality: 'Localidad pendiente',
              addressRegion: 'Catalunya',
              addressCountry: 'ES',
            },
            telephone: '+34XXXXXXXXX',
            url: 'https://elracodelpanta.com',
            openingHours: [
              'Tu-Fr 13:00-16:00',
              'Tu-Fr 20:00-23:00',
              'Sa-Su 13:00-16:00',
              'Sa-Su 20:00-23:00',
            ],
          }),
        }}
      />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center wood-bg overflow-hidden pt-20">
        <LocalImage
          src="/hero/hero-bg.jpg"
          alt="El Racó del Pantà"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          silent
        />
        {/* Botanical leaves */}
        <BotanicalLeaf className="absolute top-20 left-0 w-16 h-20 opacity-25" />
        <BotanicalLeaf className="absolute top-20 right-0 w-16 h-20 opacity-25 scale-x-[-1]" />
        <BotanicalLeaf className="absolute bottom-6 left-0 w-12 h-16 opacity-20" />
        <BotanicalLeaf className="absolute bottom-6 right-0 w-12 h-16 opacity-20 scale-x-[-1]" />

        <div className="relative text-center px-4 max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <Image
              src="/logo.png"
              alt="El Racó del Pantà"
              width={480}
              height={120}
              className="h-[120px] w-auto"
              priority
            />
          </div>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black text-green-dark mb-4 leading-tight"
            style={{ textShadow: '2px 2px 0 rgba(26,61,31,0.15), 4px 4px 0 rgba(26,61,31,0.08)' }}
          >
            EL RACÓ<br />DEL PANTÀ
          </h1>
          <p className="font-body text-xl md:text-2xl text-brown/80 mb-10 max-w-xl mx-auto">
            Buena comida, buen ambiente y vistas increíbles
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="bg-green-dark text-cream px-8 py-4 rounded-full font-heading font-bold text-lg hover:bg-green-mid transition-all hover:scale-105 shadow-lg"
            >
              Ver Menú
            </Link>
            <Link
              href="/reservar"
              className="bg-cream text-green-dark border-2 border-green-dark px-8 py-4 rounded-full font-heading font-bold text-lg hover:bg-green-dark hover:text-cream transition-all hover:scale-105 shadow-lg"
            >
              Reservar Mesa
            </Link>
          </div>
        </div>
      </section>

      {/* NEWLY OPENED BANNER */}
      <div className="bg-green-dark text-cream text-center py-4 px-4 text-base md:text-lg font-body">
        🎉 ¡Recién abiertos! Ven a celebrar esta nueva aventura con nosotros
      </div>

      {/* ESPECIALIDADES */}
      <section className="py-20 px-4 bg-parchment">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl text-green-dark text-center mb-4">
            Lo mejor de nuestra cocina
          </h2>
          <div className="w-20 h-1 bg-wood mx-auto mb-12 rounded-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dishes.map((dish) => (
              <div
                key={dish.name}
                className="rounded-2xl overflow-hidden shadow-md hover:-translate-y-2 transition-transform duration-300 bg-cream"
              >
                <div className="relative h-52 overflow-hidden">
                  <LocalImage
                    src={dish.img}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                    icon="🍽️"
                  />
                </div>
                <div className="p-6 wood-bg">
                  <h3 className="font-heading text-xl font-bold text-green-dark mb-2">{dish.name}</h3>
                  <p className="text-brown/70 text-sm font-body">{dish.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS */}
      <section className="py-20 px-4 bg-green-light/30">
        <div className="max-w-lg mx-auto">
          <div className="bg-parchment rounded-3xl shadow-lg p-10 text-center border border-wood/30">
            <div className="text-5xl font-heading font-black text-yellow-500 mb-2">⭐ 5.0</div>
            <h2 className="font-heading text-2xl text-green-dark mb-3">Sé de los primeros en valorarnos</h2>
            <p className="text-brown/70 mb-6 font-body">Tu opinión nos ayuda a crecer 🙏</p>
            {/* TODO: Replace PLACE_ID_HERE with real Google Maps Place ID */}
            <a
              href="https://search.google.com/local/writereview?placeid=PLACE_ID_HERE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-dark text-cream px-8 py-3 rounded-full font-heading font-bold hover:bg-green-mid transition-colors shadow-md"
            >
              Dejanos tu opinión en Google
            </a>
          </div>
        </div>
      </section>

      {/* SOCIAL ROW */}
      <section className="py-20 px-4 bg-parchment">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl text-green-dark text-center mb-10">Síguenos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${s.color} rounded-2xl p-8 flex flex-col items-center gap-4 hover:-translate-y-2 hover:shadow-xl transition-all duration-300`}
              >
                <div className="transition-transform group-hover:scale-125">{s.icon}</div>
                <div className="text-center">
                  <div className="font-heading font-bold text-lg">{s.name}</div>
                  <div className="text-sm opacity-70">{s.label}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
