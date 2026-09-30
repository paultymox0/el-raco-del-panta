// Pantalla "coming soon" en la web pública (producción de Vercel).
// En local (npm run dev) y en las previews de Vercel se ve la web completa.
// Para ver el coming soon en local: COMING_SOON=1 npm run dev
// 🚀 PARA LANZAR LA WEB: cambia la línea de abajo por `export const COMING_SOON = false`, commit y push.
export const COMING_SOON =
  process.env.VERCEL_ENV === 'production' || process.env.COMING_SOON === '1'
