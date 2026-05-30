'use client'
import { useState } from 'react'

type Props = {
  src: string
  alt: string
  className?: string
  icon?: string
  silent?: boolean
}

export default function LocalImage({ src, alt, className = '', icon = '📷', silent = false }: Props) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    if (silent) return null
    return (
      <div
        className={`bg-[#1a3d1f] flex flex-col items-center justify-center gap-2 ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="text-3xl opacity-40 select-none">{icon}</span>
        <span className="text-[#f5ead6]/40 text-[10px] font-body text-center px-3 leading-tight">{alt}</span>
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  )
}
