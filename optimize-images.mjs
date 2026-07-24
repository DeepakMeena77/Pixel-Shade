/**
 * Image Optimization Script
 * Converts JPG/JPEG/PNG images in /public to WebP format
 * Uses the already-installed 'sharp' devDependency
 */

import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PUBLIC_DIR = join(__dirname, 'public');
const WEBP_QUALITY = 82;

async function getFilesRecursive(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      const subFiles = await getFilesRecursive(fullPath);
      files.push(...subFiles);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function optimizeImages() {
  const files = await getFilesRecursive(PUBLIC_DIR);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f) && !f.endsWith('.webp'));

  console.log(`\n🖼️  Found ${imageFiles.length} images to optimize\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;
  const results = [];

  for (const filePath of imageFiles) {
    const ext = extname(filePath);
    const nameWithoutExt = filePath.slice(0, -ext.length);
    const webpPath = nameWithoutExt + '.webp';

    const originalStat = await stat(filePath);
    const originalSize = originalStat.size;
    totalOriginal += originalSize;

    try {
      await sharp(filePath)
        .webp({ quality: WEBP_QUALITY })
        .toFile(webpPath);

      const newStat = await stat(webpPath);
      const newSize = newStat.size;
      totalOptimized += newSize;

      const saving = ((originalSize - newSize) / originalSize * 100).toFixed(1);
      const rel = filePath.replace(PUBLIC_DIR, '');

      results.push({
        file: rel,
        original: formatBytes(originalSize),
        optimized: formatBytes(newSize),
        saving: saving + '%'
      });

      console.log(`  ✅ ${basename(filePath)}`);
      console.log(`     ${formatBytes(originalSize)} → ${formatBytes(newSize)} (saved ${saving}%)`);
    } catch (err) {
      console.error(`  ❌ Failed: ${basename(filePath)} — ${err.message}`);
    }
  }

  console.log('\n' + '─'.repeat(60));
  console.log(`📦 Total original : ${formatBytes(totalOriginal)}`);
  console.log(`📦 Total optimized: ${formatBytes(totalOptimized)}`);
  console.log(`💾 Total saved    : ${formatBytes(totalOriginal - totalOptimized)} (${((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1)}%)`);
  console.log('─'.repeat(60));
  console.log('\n⚠️  Original files kept. Delete them manually after verifying.\n');
}

optimizeImages().catch(console.error);
