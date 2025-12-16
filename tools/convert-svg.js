const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

(async () => {
  const imagesDir = path.join(__dirname, '..', 'assets', 'images');
  const outDir = path.join(imagesDir, 'optimized');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Sizes to produce (width in px)
  const sizes = [1200, 800, 400];
  const svgFiles = fs.readdirSync(imagesDir).filter(f => f.toLowerCase().endsWith('.svg'));
  if (svgFiles.length === 0) {
    console.log('No SVG files found in', imagesDir);
    process.exit(0);
  }

  for (const file of svgFiles) {
    const input = path.join(imagesDir, file);
    const name = path.basename(file, '.svg');
    for (const w of sizes) {
      const pngOut = path.join(outDir, `${name}-${w}.png`);
      const webpOut = path.join(outDir, `${name}-${w}.webp`);
      try {
        await sharp(input, { density: 300 })
          .resize({ width: w })
          .png({ compressionLevel: 9, adaptiveFiltering: true })
          .toFile(pngOut);
        await sharp(input, { density: 300 })
          .resize({ width: w })
          .webp({ quality: 80 })
          .toFile(webpOut);
        console.log(`Wrote ${pngOut} and ${webpOut}`);
      } catch (err) {
        console.error('Error converting', input, err.message);
      }
    }

    // small icon (120px)
    const iconPng = path.join(outDir, `${name}-120.png`);
    const iconWebp = path.join(outDir, `${name}-120.webp`);
    try {
      await sharp(input, { density: 300 })
        .resize({ width: 120 })
        .png({ compressionLevel: 9 })
        .toFile(iconPng);
      await sharp(input, { density: 300 })
        .resize({ width: 120 })
        .webp({ quality: 80 })
        .toFile(iconWebp);
      console.log(`Wrote ${iconPng} and ${iconWebp}`);
    } catch (err) {
      console.error('Error converting icon for', input, err.message);
    }
  }
  console.log('All done. Files written to', outDir);
})();
