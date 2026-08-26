import { ImageResponse } from 'next/og'

export const alt = 'El Racó del Pantà – Restaurante con vistas al Pantà de Sant Antoni'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a3d1f',
          position: 'relative',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(ellipse at 20% 80%, rgba(200,169,110,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(200,169,110,0.08) 0%, transparent 50%)',
          }}
        />

        {/* Gold accent bars */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', backgroundColor: '#c8a96e' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '6px', backgroundColor: '#c8a96e' }} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ color: 'rgba(245,234,214,0.5)', fontSize: '14px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '16px', marginTop: '0' }}>
            Restaurant · Talarn, Lleida
          </p>

          <h1 style={{ color: '#f5ead6', fontSize: '80px', fontWeight: '900', lineHeight: '1', margin: '0', textAlign: 'center' }}>
            El Racó del Pantà
          </h1>

          <div style={{ width: '80px', height: '2px', backgroundColor: '#c8a96e', margin: '28px 0' }} />

          <p style={{ color: 'rgba(245,234,214,0.75)', fontSize: '24px', margin: '0', textAlign: 'center', maxWidth: '700px', lineHeight: '1.4' }}>
            Tapas, brasa i cuina catalana de temporada amb vistes al Pantà de Sant Antoni
          </p>

          <p style={{ color: 'rgba(245,234,214,0.3)', fontSize: '16px', marginTop: '40px', marginBottom: '0', letterSpacing: '0.05em' }}>
            elracodelpanta.cat
          </p>
        </div>
      </div>
    ),
    { ...size },
  )
}
