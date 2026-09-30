// Optimiza las fotos de /public sin cambiar nombres ni rutas.
// Uso: npm run fotos
// - Reduce a un máximo de 2560 px por el lado largo (suficiente para pantallas retina).
// - Recomprime JPG (mozjpeg, calidad 82) y WebP (calidad 82). Los PNG se recomprimen sin pérdida.
// - Solo sobrescribe si el resultado pesa al menos un 10 % menos, así que ejecutarlo
//   varias veces no degrada las fotos que ya están optimizadas.
import { readdir, readFile, writeFile, stat } from 'node:fs/promises'
import { join, extname } from 'node:path'
import sharp from 'sharp'

const ROOT = new URL('../public/', import.meta.url).pathname
const MAX_SIDE = 2560
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else if (EXTS.has(extname(entry.name).toLowerCase())) yield full
  }
}

const kb = (n) => `${Math.round(n / 1024)} KB`
let before = 0, after = 0, changed = 0

for await (const file of walk(ROOT)) {
  const input = await readFile(file)
  const ext = extname(file).toLowerCase()
  let img = sharp(input).rotate().resize({ width: MAX_SIDE, height: MAX_SIDE, fit: 'inside', withoutEnlargement: true })
  if (ext === '.png') img = img.png({ compressionLevel: 9, effort: 10 })
  else if (ext === '.webp') img = img.webp({ quality: 82 })
  else img = img.jpeg({ quality: 82, mozjpeg: true })
  const output = await img.toBuffer()

  before += input.length
  if (output.length < input.length * 0.9) {
    await writeFile(file, output)
    after += output.length
    changed++
    console.log(`✔ ${file.replace(ROOT, '')}: ${kb(input.length)} → ${kb(output.length)}`)
  } else {
    after += input.length
  }
}

console.log(`\n${changed} foto(s) optimizadas · total ${kb(before)} → ${kb(after)}`)
