// Turns the raw screenshots in assets/source into responsive WebP files in
// public/images/work and writes src/content/image-manifest.json (sizes for CLS-free layout).
import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'assets/source';
const OUT = 'public/images/work';
const WIDTHS = [480, 960, 1600, 2400];

await mkdir(OUT, { recursive: true });
const manifest = {};
for (const file of (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort()) {
  const name = file.replace(/\.(jpe?g|png)$/i, '');
  const img = sharp(path.join(SRC, file));
  const { width, height } = await img.metadata();
  const widths = WIDTHS.filter((w) => w < width).concat(width > 2400 ? [] : [width]);
  for (const w of [...new Set(widths)]) {
    await sharp(path.join(SRC, file)).resize({ width: w }).webp({ quality: 78, effort: 5 }).toFile(path.join(OUT, `${name}-${w}.webp`));
  }
  manifest[name] = { width, height, widths: [...new Set(widths)] };
  console.log(name, width, 'x', height, '→', widths.join(','));
}
await writeFile('src/content/image-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
