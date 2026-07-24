import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const inputDir = './images for work';
const outputDir = './public/logos';

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// Each image has a logo in a circular region (usually centered in the image)
// We'll detect the approximate crop region for each image based on visual inspection
const logos = [
  {
    input: 'WhatsApp Image 2026-07-24 at 2.29.44 PM.jpeg',
    output: 'logo-oso-real-estates.jpg',
    // OSO Real Estates - logo is a white circle in black bg, centered roughly
    // Full image ~707x1483, logo circle is at center ~30% from top to ~80%
    left: 25, top: 370, width: 660, height: 660,
  },
  {
    input: 'WhatsApp Image 2026-07-24 at 2.29.45 PM.jpeg',
    output: 'logo-vivah-utshav.jpg',
    // Vivah Utshav - white circle in dark bg - roughly 60% height, centered
    left: 60, top: 450, width: 590, height: 620,
  },
  {
    input: 'WhatsApp Image 2026-07-24 at 2.29.45 PM (1).jpeg',
    output: 'logo-vl-boutique.jpg',
    // VL Boutique - white circle in dark bg
    left: 130, top: 470, width: 460, height: 500,
  },
  {
    input: 'WhatsApp Image 2026-07-24 at 2.29.45 PM (2).jpeg',
    output: 'logo-amla-cubes.jpg',
    // AmlaCubes - white circle centered
    left: 155, top: 490, width: 400, height: 420,
  },
  {
    input: 'WhatsApp Image 2026-07-24 at 2.29.45 PM (3).jpeg',
    output: 'logo-mr-realty-talks.jpg',
    // MR Realty Talks - dark circle
    left: 55, top: 400, width: 590, height: 590,
  },
  {
    input: 'WhatsApp Image 2026-07-24 at 2.29.46 PM.jpeg',
    output: 'logo-d-boutique.jpg',
    // D boutique - white circle with pink D logo
    left: 100, top: 500, width: 520, height: 540,
  },
  {
    input: 'WhatsApp Image 2026-07-24 at 2.29.46 PM (1).jpeg',
    output: 'logo-ms-cell-point.jpg',
    // MS Cell Point - dark circle in instagram profile
    left: 130, top: 520, width: 450, height: 450,
  },
  {
    input: 'WhatsApp Image 2026-07-24 at 2.29.46 PM (2).jpeg',
    output: 'logo-house-of-maha.jpg',
    // House of Maha - red circular logo
    left: 90, top: 560, width: 530, height: 500,
  },
  {
    input: 'WhatsApp Image 2026-07-24 at 2.29.47 PM.jpeg',
    output: 'logo-1z-realty.jpg',
    // 1Z Realty - dark circle on instagram grid
    left: 130, top: 520, width: 450, height: 450,
  },
  {
    input: 'WhatsApp Image 2026-07-24 at 2.29.47 PM (1).jpeg',
    output: 'logo-astrologer-ramaraju.jpg',
    // Astrologer Ramaraju - white circle
    left: 55, top: 445, width: 600, height: 640,
  },
  {
    input: 'WhatsApp Image 2026-07-24 at 2.29.47 PM (2).jpeg',
    output: 'logo-sri-mahalakshmi-traders.jpg',
    // Sri Mahalakshmi Traders - colorful circle
    left: 35, top: 475, width: 640, height: 650,
  },
  {
    input: 'WhatsApp Image 2026-07-24 at 2.29.47 PM (3).jpeg',
    output: 'logo-vjpt.jpg',
    // VJPT Trustworthy Products - white circle
    left: 130, top: 490, width: 455, height: 480,
  },
  {
    input: 'WhatsApp Image 2026-07-24 at 2.31.37 PM.jpeg',
    output: 'logo-divya-jewelers.jpg',
    // Divya Jewelers - gold circle on black
    left: 130, top: 430, width: 460, height: 500,
  },
  {
    input: 'WhatsApp Image 2026-07-24 at 2.32.26 PM.jpeg',
    output: 'logo-avigna.jpg',
    // Avigna Sarees and Dress - pink rectangle
    left: 0, top: 500, width: 712, height: 530,
  },
];

async function cropLogos() {
  for (const logo of logos) {
    const inputPath = join(inputDir, logo.input);
    const outputPath = join(outputDir, logo.output);
    
    try {
      const metadata = await sharp(inputPath).metadata();
      console.log(`Processing ${logo.output}: ${metadata.width}x${metadata.height}`);
      
      // Clamp values to image bounds
      const left = Math.max(0, logo.left);
      const top = Math.max(0, logo.top);
      const width = Math.min(logo.width, metadata.width - left);
      const height = Math.min(logo.height, metadata.height - top);
      
      await sharp(inputPath)
        .extract({ left, top, width, height })
        .resize(400, 400, { fit: 'cover', position: 'centre' })
        .jpeg({ quality: 90 })
        .toFile(outputPath);
      
      console.log(`✅ Saved ${logo.output}`);
    } catch (err) {
      console.error(`❌ Error processing ${logo.input}:`, err.message);
    }
  }
  console.log('\nAll logos processed!');
}

cropLogos();
