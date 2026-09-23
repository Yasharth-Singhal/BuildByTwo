import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { stat } from 'node:fs/promises'

for (const name of ['coffee-campaign', 'wellness-platform', 'culture-campaign']) {
  const input = fileURLToPath(new URL(`../src/assets/${name}.png`, import.meta.url))
  const output = fileURLToPath(new URL(`../src/assets/${name}.webp`, import.meta.url))
  await sharp(input).resize({ width: 1536, withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toFile(output)
  const before = await stat(input), after = await stat(output)
  console.log(`${name}: ${Math.round(before.size / 1024)} KB → ${Math.round(after.size / 1024)} KB`)
}
