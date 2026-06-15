import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 text-center">

      {/* Botanical leaf decorations */}
      <div className="relative mb-8 select-none pointer-events-none" aria-hidden>
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none" className="opacity-20">
          <path d="M20 60 Q5 30 30 10 Q35 40 20 60Z" fill="#1a3d1f" />
          <path d="M20 60 Q18 35 30 10" stroke="#1a3d1f" strokeWidth="1" fill="none" />
          <path d="M100 60 Q115 30 90 10 Q85 40 100 60Z" fill="#1a3d1f" />
          <path d="M100 60 Q102 35 90 10" stroke="#1a3d1f" strokeWidth="1" fill="none" />
          <path d="M60 70 Q60 20 60 5" stroke="#1a3d1f" strokeWidth="1.5" fill="none" />
          <path d="M60 40 Q45 28 40 18" stroke="#1a3d1f" strokeWidth="1" fill="none" />
          <path d="M60 40 Q75 28 80 18" stroke="#1a3d1f" strokeWidth="1" fill="none" />
          <path d="M60 55 Q50 45 46 36" stroke="#1a3d1f" strokeWidth="1" fill="none" />
          <path d="M60 55 Q70 45 74 36" stroke="#1a3d1f" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <p className="font-heading text-8xl font-black text-[#1a3d1f]/10 leading-none mb-2 select-none">
        404
      </p>

      <div className="w-10 h-px bg-[#c8a96e] mb-8" />

      <div className="space-y-5 mb-10">
        <div>
          <p className="font-body text-[#1a3d1f]/40 text-[10px] tracking-[0.2em] uppercase mb-1">Castellano</p>
          <h1 className="font-heading text-xl font-bold text-[#1a3d1f]">
            Este plato no está en la carta
          </h1>
          <p className="font-body text-[#1a3d1f]/60 text-sm mt-1">
            La página que buscas no existe o ha sido retirada.
          </p>
        </div>

        <div className="w-6 h-px bg-[#e8d8b8] mx-auto" />

        <div>
          <p className="font-body text-[#1a3d1f]/40 text-[10px] tracking-[0.2em] uppercase mb-1">Català</p>
          <p className="font-heading text-xl font-bold text-[#1a3d1f]">
            Aquest plat no és a la carta
          </p>
          <p className="font-body text-[#1a3d1f]/60 text-sm mt-1">
            La pàgina que cerques no existeix o ha estat retirada.
          </p>
        </div>

        <div className="w-6 h-px bg-[#e8d8b8] mx-auto" />

        <div>
          <p className="font-body text-[#1a3d1f]/40 text-[10px] tracking-[0.2em] uppercase mb-1">English</p>
          <p className="font-heading text-xl font-bold text-[#1a3d1f]">
            This dish is not on the menu
          </p>
          <p className="font-body text-[#1a3d1f]/60 text-sm mt-1">
            The page you are looking for does not exist.
          </p>
        </div>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-[#1a3d1f] text-[#f5ead6] font-body font-semibold text-sm py-3.5 px-8 rounded-xl hover:bg-[#2d5a35] transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-[#1a3d1f]/40 min-h-[44px]"
      >
        ← Volver al inicio
      </Link>

      <p className="font-body text-[#1a3d1f]/30 text-xs mt-8 tracking-wide">
        El Racó del Pantà · Talarn, Lleida
      </p>
    </div>
  )
}
