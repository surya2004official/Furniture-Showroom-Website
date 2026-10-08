import { products } from '../src/data/products.js';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const sources = JSON.parse(await readFile(new URL('./image-sources.json', import.meta.url)));
const previous = JSON.parse(await readFile(new URL('../src/data/product-images.json', import.meta.url)));
await mkdir('public/images/products', { recursive: true });
const manifest = {};
for (let offset = 0; offset < 34; offset += 5) {
  await Promise.all(Array.from({ length: Math.min(5, 34 - offset) }, async (_, n) => {
    const id = offset + n + 1;
    const candidates = sources[id] || [previous[`prod-${id}`]?.source || products.find(p => p.id === `prod-${id}`).images[0]];
    for (const url of candidates) {
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
        if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`HTTP ${response.status}`);
        const bytes = Buffer.from(await response.arrayBuffer());
        const type = response.headers.get('content-type').split(';')[0];
        const ext = ({'image/png':'png','image/webp':'webp','image/avif':'avif'})[type] || 'jpg';
        const path = `/images/products/prod-${id}.${ext}`;
        await writeFile(`public${path}`, bytes);
        manifest[`prod-${id}`] = { path, source: url };
        console.log(`Saved prod-${id} (${bytes.length} bytes)`);
        return;
      } catch (error) { console.log(`Retry prod-${id}: ${error.message}`); }
    }
    throw new Error(`No valid image for prod-${id}`);
  }));
}
await writeFile('src/data/product-images.json', JSON.stringify(manifest, null, 2) + '\n');
