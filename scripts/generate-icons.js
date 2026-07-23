const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const SRC  = path.join(ROOT, 'public', 'icon.svg');

const icons = [
  { out: 'public/icons/icon-72x72.png',   size: 72  },
  { out: 'public/icons/icon-96x96.png',   size: 96  },
  { out: 'public/icons/icon-128x128.png', size: 128 },
  { out: 'public/icons/icon-144x144.png', size: 144 },
  { out: 'public/icons/icon-152x152.png', size: 152 },
  { out: 'public/icons/icon-192x192.png', size: 192 },
  { out: 'public/icons/icon-384x384.png', size: 384 },
  { out: 'public/icons/icon-512x512.png', size: 512 },
  { out: 'public/apple-touch-icon.png',   size: 180 },
  { out: 'public/favicon.ico',            size: 32  },
];

async function generate() {
  const generated = [];
  const failed    = [];

  for (const { out, size } of icons) {
    const dest = path.join(ROOT, out);
    try {
      await sharp(SRC)
        .resize(size, size)
        .png()
        .toFile(dest);
      generated.push(out);
    } catch (err) {
      failed.push({ out, err: err.message });
    }
  }

  // --- Maskable 512x512 ---
  // SVG icon rendered at 410px (80% of 512 = the safe zone inner area),
  // then composited onto a 512x512 #0a0a0a background (20% padding each side).
  const CANVAS = 512;
  const INNER  = Math.round(CANVAS * 0.8); // 410px — icon fills the safe zone

  try {
    const iconBuf = await sharp(SRC)
      .resize(INNER, INNER)
      .png()
      .toBuffer();

    const offset = Math.round((CANVAS - INNER) / 2); // 51px each side

    await sharp({
      create: {
        width:      CANVAS,
        height:     CANVAS,
        channels:   4,
        background: { r: 10, g: 10, b: 10, alpha: 1 }, // #0a0a0a
      },
    })
      .composite([{ input: iconBuf, top: offset, left: offset }])
      .png()
      .toFile(path.join(ROOT, 'public/icons/icon-512x512-maskable.png'));

    generated.push('public/icons/icon-512x512-maskable.png');
  } catch (err) {
    failed.push({ out: 'public/icons/icon-512x512-maskable.png', err: err.message });
  }

  // Summary
  console.log('\n=== Icon generation results ===\n');
  for (const f of generated) {
    const size = fs.statSync(path.join(ROOT, f)).size;
    console.log(`  ✓  ${f}  (${(size / 1024).toFixed(1)} KB)`);
  }
  if (failed.length) {
    console.log('\nFailed:');
    for (const { out, err } of failed) {
      console.log(`  ✗  ${out}: ${err}`);
    }
  }
  console.log(`\n${generated.length} files generated, ${failed.length} failed.\n`);
}

generate().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
