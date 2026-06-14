'use client'

import { useRef, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Download, Check } from 'lucide-react'

const MENU_URL = 'https://elracodelpanta.cat/menu'
const QR_SIZE = 280

export default function QRPage() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [downloaded, setDownloaded] = useState(false)

  function handleDownload() {
    const canvas = canvasRef.current?.querySelector('canvas')
    if (!canvas) return

    // Upscale 4× for print quality, add cream margin
    const SCALE = 4
    const MARGIN = 40 * SCALE
    const inner = QR_SIZE * SCALE
    const total = inner + MARGIN * 2

    const out = document.createElement('canvas')
    out.width = total
    out.height = total
    const ctx = out.getContext('2d')!
    ctx.fillStyle = '#fdf8f0'
    ctx.fillRect(0, 0, total, total)
    ctx.drawImage(canvas, MARGIN, MARGIN, inner, inner)

    out.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'QR-El-Raco-del-Panta-Menu.png'
      a.click()
      URL.revokeObjectURL(url)
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 2500)
    }, 'image/png')
  }

  return (
    <div className="min-h-screen bg-[#fdf8f0] flex items-center justify-center p-8 print:p-0">
      <div className="flex flex-col items-center gap-8 max-w-sm w-full">

        {/* Print card */}
        <div className="bg-white rounded-3xl shadow-xl border border-[#e8d8b8] p-10 flex flex-col items-center gap-6 w-full print:shadow-none print:border-none print:rounded-none print:p-8">

          <div className="text-center">
            <p className="font-body text-[#1a3d1f]/40 text-xs tracking-[0.2em] uppercase mb-1">Restaurant</p>
            <h1 className="font-heading text-2xl font-black text-[#1a3d1f] leading-tight">
              El Racó<br />del Pantà
            </h1>
          </div>

          <div className="w-12 h-px bg-[#c8a96e]" />

          <div
            ref={canvasRef}
            className="p-3 bg-white rounded-2xl border border-[#e8d8b8]"
            aria-label="QR code per veure la carta del restaurant"
          >
            <QRCodeCanvas
              value={MENU_URL}
              size={QR_SIZE}
              bgColor="#ffffff"
              fgColor="#1a3d1f"
              level="H"
              includeMargin={false}
            />
          </div>

          <div className="text-center space-y-0.5">
            <p className="font-body text-[#1a3d1f] text-sm font-semibold">Escaneja per veure la carta</p>
            <p className="font-body text-[#1a3d1f]/70 text-sm">Escanea para ver la carta</p>
            <p className="font-body text-[#1a3d1f]/50 text-xs italic">Scan to see the menu</p>
          </div>

          <p className="font-body text-[#1a3d1f]/30 text-[10px] tracking-wide">
            elracodelpanta.cat/menu
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="print:hidden flex items-center gap-2.5 bg-[#1a3d1f] text-[#f5ead6] font-body font-semibold text-sm py-3.5 px-8 rounded-xl hover:bg-[#2d5a35] transition-colors duration-200 shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1a3d1f]/40 min-h-[44px]"
        >
          {downloaded ? (
            <><Check size={16} strokeWidth={2} />Descarregat!</>
          ) : (
            <><Download size={16} strokeWidth={1.5} />Descarregar QR (PNG alta resolució)</>
          )}
        </button>

        <p className="print:hidden font-body text-[#1a3d1f]/40 text-xs text-center max-w-xs leading-relaxed">
          Descarrega el QR per imprimir-lo a les targes de taula, adhesius o cartells del restaurant.
        </p>
      </div>
    </div>
  )
}
