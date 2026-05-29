'use client'
import { useEffect, useState } from 'react'

type NavCategory = { id: string; emoji: string; name: string }

export default function MenuNav({ categories }: { categories: NavCategory[] }) {
  const [active, setActive] = useState(categories[0]?.id ?? '')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    categories.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-15% 0px -75% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [categories])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 140
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <nav className="sticky top-[72px] z-40 bg-parchment/95 backdrop-blur-sm border-b border-wood/30 shadow-sm">
      <div className="max-w-5xl mx-auto px-4">
        <div
          className="flex gap-1.5 overflow-x-auto py-3"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
        >
          {categories.map(({ id, emoji, name }) => (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={`
                flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold font-body
                whitespace-nowrap transition-all duration-200 flex-shrink-0 border
                ${active === id
                  ? 'bg-green-dark text-cream border-green-dark shadow-md scale-[1.03]'
                  : 'text-brown/70 border-transparent hover:text-brown hover:bg-green-light/50 hover:border-green-light'
                }
              `}
            >
              <span>{emoji}</span>
              <span>{name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
