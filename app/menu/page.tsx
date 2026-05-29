// 🍽️ MENÚ DEL DÍA: Para actualizar, edita el archivo /data/menu-del-dia.json
// Cambia el texto entre comillas y guarda. ¡Sin tocar código!

import type { Metadata } from 'next'
import Link from 'next/link'
import BotanicalLeaf from '@/components/BotanicalLeaf'
import CartaCompleta from '@/components/CartaCompleta'
import menuDelDia from '@/data/menu-del-dia.json'

export const metadata: Metadata = {
  title: 'Menú – El Racó del Pantà',
  description:
    'Nuestra carta de tapas, brasa, pescados y postres. Menú del día disponible de martes a domingo. Cocina española con productos de temporada.',
}

/* ─── Decorative helpers ─────────────────────────────────────────── */

function ChalkDivider() {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 border-b border-dashed border-white/20" />
      <span className="font-chalk text-white/30 text-sm tracking-widest">✦ ✦ ✦</span>
      <div className="flex-1 border-b border-dashed border-white/20" />
    </div>
  )
}

function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-3 mt-3 mb-1">
      <div className="h-px w-16 bg-wood/60" />
      <svg width="18" height="18" viewBox="0 0 18 18" fill="#d4b896">
        <path d="M9 0l1.4 6L18 9l-7.6 1.4L9 18l-1.4-7.6L0 9l7.6-1.6z" opacity="0.7" />
      </svg>
      <div className="h-px w-16 bg-wood/60" />
    </div>
  )
}

export default function MenuPage() {
  return (
    <div className="pt-20 min-h-screen">

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — MENÚ DEL DÍA (chalkboard)
      ═══════════════════════════════════════════════════════════ */}
      <section className="chalkboard-bg py-16 px-4 relative overflow-hidden">

        {/* Background chalk doodles */}
        <div className="absolute top-5 left-5 text-white/6 text-6xl pointer-events-none select-none">★</div>
        <div className="absolute top-8 right-10 text-white/5 text-5xl pointer-events-none select-none">✦</div>
        <div className="absolute bottom-10 left-14 text-white/5 text-4xl pointer-events-none select-none">✦</div>
        <div className="absolute bottom-6 right-8 text-white/6 text-5xl pointer-events-none select-none">★</div>
        <div className="absolute top-1/2 left-4 -translate-y-1/2 text-white/4 text-3xl pointer-events-none select-none">🍴</div>
        <div className="absolute top-1/2 right-4 -translate-y-1/2 text-white/4 text-3xl pointer-events-none select-none">🍴</div>

        <div className="max-w-4xl mx-auto relative">
          {/* Inner chalk border box */}
          <div
            className="border-2 border-white/25 rounded-lg p-8 md:p-12 relative"
            style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05)' }}
          >
            {/* Corner chalk marks */}
            <div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-white/35 rounded-tl" />
            <div className="absolute top-3 right-3 w-5 h-5 border-r-2 border-t-2 border-white/35 rounded-tr" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-l-2 border-b-2 border-white/35 rounded-bl" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 border-white/35 rounded-br" />

            {/* Date — top right */}
            <p className="absolute top-5 right-8 font-chalk text-white/50 text-sm italic">
              {menuDelDia.fecha}
            </p>

            {/* Title */}
            <h1
              className="font-chalk text-4xl md:text-5xl text-white text-center font-bold mb-2"
              style={{ textShadow: '0 0 24px rgba(255,255,255,0.12)' }}
            >
              🍽️ Menú del Día
            </h1>
            <p className="font-chalk text-white/40 text-center text-base italic mb-2">
              De martes a domingo · Mediodía
            </p>

            <ChalkDivider />

            {/* Three columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">

              {/* Primeros */}
              <div>
                <h2
                  className="font-chalk text-2xl text-white font-bold text-center mb-1"
                  style={{ textShadow: '0 0 12px rgba(255,255,255,0.1)' }}
                >
                  — Primeros —
                </h2>
                <div className="border-b border-white/25 mb-4" />
                <ul className="space-y-3">
                  {menuDelDia.primero.map((item, i) => (
                    <li key={i} className="font-chalk text-white/80 text-base flex items-start gap-2">
                      <span className="text-white/35 flex-shrink-0 mt-0.5">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Segundos */}
              <div>
                <h2
                  className="font-chalk text-2xl text-white font-bold text-center mb-1"
                  style={{ textShadow: '0 0 12px rgba(255,255,255,0.1)' }}
                >
                  — Segundos —
                </h2>
                <div className="border-b border-white/25 mb-4" />
                <ul className="space-y-3">
                  {menuDelDia.segundo.map((item, i) => (
                    <li key={i} className="font-chalk text-white/80 text-base flex items-start gap-2">
                      <span className="text-white/35 flex-shrink-0 mt-0.5">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Postres */}
              <div>
                <h2
                  className="font-chalk text-2xl text-white font-bold text-center mb-1"
                  style={{ textShadow: '0 0 12px rgba(255,255,255,0.1)' }}
                >
                  — Postres —
                </h2>
                <div className="border-b border-white/25 mb-4" />
                <ul className="space-y-3">
                  {menuDelDia.postre.map((item, i) => (
                    <li key={i} className="font-chalk text-white/80 text-base flex items-start gap-2">
                      <span className="text-white/35 flex-shrink-0 mt-0.5">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            <ChalkDivider />

            {/* Price */}
            <div className="text-center">
              <p
                className="font-chalk text-6xl md:text-7xl text-white font-bold"
                style={{ textShadow: '0 0 32px rgba(255,255,255,0.18)' }}
              >
                {menuDelDia.precio_menu}
              </p>
              <p className="font-chalk text-white/45 text-sm mt-1">por persona</p>
              <p className="font-chalk text-white/55 text-lg italic mt-3">
                {menuDelDia.incluye}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Note below chalkboard */}
      <div className="bg-green-dark/8 border-b border-green-mid/15 py-8 px-4 text-center">
        <p className="font-body italic text-brown/60 text-sm max-w-lg mx-auto leading-relaxed mb-5">
          El menú del día puede variar según disponibilidad.<br />
          Para más información llámanos o escríbenos por WhatsApp.
        </p>
        {/* TODO: Replace with real WhatsApp number */}
        <a
          href="https://wa.me/34XXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-2.5 rounded-full font-heading font-bold text-sm hover:opacity-90 transition-opacity shadow-md"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Escríbenos por WhatsApp
        </a>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — NUESTRA CARTA (flip cards)
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-parchment">

        {/* Section header */}
        <div className="max-w-5xl mx-auto px-4 pt-16 pb-4 text-center relative">
          <BotanicalLeaf className="absolute top-12 left-0 w-16 h-24 opacity-15 hidden lg:block" />
          <BotanicalLeaf className="absolute top-12 right-0 w-16 h-24 opacity-15 scale-x-[-1] hidden lg:block" />

          <p className="font-body text-brown/50 text-xs uppercase tracking-[0.3em] mb-3">
            El Racó del Pantà
          </p>
          <h2
            className="font-heading text-4xl md:text-5xl font-black text-green-dark mb-2"
            style={{ textShadow: '1px 1px 0 rgba(26,61,31,0.08)' }}
          >
            Nuestra Carta
          </h2>
          <OrnamentalDivider />
          <p className="font-body italic text-brown/55 text-sm mt-3">
            Cocina de temporada · Productos locales · Elaboración artesanal
          </p>
          <p className="font-body text-brown/40 text-xs mt-2">
            Toca una carta para ver descripción, macros y alérgenos
          </p>
        </div>

        {/* Client-rendered filter + flip grid */}
        <CartaCompleta />

        {/* Allergen + reserve footer */}
        <div className="border-t border-wood/30 py-10 px-4 text-center bg-cream/50">
          <p className="text-brown/45 text-xs font-body max-w-lg mx-auto mb-6 leading-relaxed">
            Si tienes alguna alergia o intolerancia alimentaria, comunícanoslo al reservar o al llegar.
            Los alérgenos mostrados son orientativos — consulta siempre con nuestro equipo.
          </p>
          <Link
            href="/reservar"
            className="inline-block bg-green-dark text-cream px-8 py-3.5 rounded-full font-heading font-bold hover:bg-green-mid transition-all hover:scale-105 shadow-md"
          >
            Reservar Mesa
          </Link>
        </div>

      </section>
    </div>
  )
}
