Image optimization and conversion (SVG -> PNG / WebP)

This project includes a small Node.js script that converts all SVGs in `assets/images` into optimized PNG and WebP images at multiple sizes.

Requirements
- Node.js (v14+ recommended)
- npm

Install and run (PowerShell)

```powershell
Set-Location -Path "C:\Users\home\Desktop\DemoWeb"
npm install
npm run convert
```

What it does
- Reads all `.svg` files in `assets/images`
- Produces PNG and WebP versions at widths: `1200`, `800`, `400`, and `120` (icons)
- Outputs files to `assets/images/optimized`

ImageMagick alternative (if you prefer)

If you have ImageMagick installed (the `magick` command), you can run a single-line conversion for one file, for example:

```powershell
magick -density 300 "assets/images/service-asset.svg" -resize 1200 "assets/images/optimized/service-asset-1200.png"
magick -density 300 "assets/images/service-asset.svg" -resize 1200 "assets/images/optimized/service-asset-1200.webp"
```

Batch example (PowerShell):

```powershell
Set-Location -Path "C:\Users\home\Desktop\DemoWeb\assets\images"
New-Item -ItemType Directory -Force -Path .\optimized | Out-Null
Get-ChildItem -Filter *.svg | ForEach-Object {
  $name = $_.BaseName
  magick -density 300 $_.FullName -resize 1200 "optimized\${name}-1200.png"
  magick -density 300 $_.FullName -resize 800 "optimized\${name}-800.png"
  magick -density 300 $_.FullName -resize 400 "optimized\${name}-400.png"
  magick -density 300 $_.FullName -resize 120 "optimized\${name}-120.png"
}
```

Notes
- `sharp` produces high-quality raster output and is fast. The Node script is cross-platform.
- If your SVGs reference local fonts or external resources, sharp may need higher `density` or font fallback; the script sets `density: 300` to improve quality.

If you want, I can also:
- Run the conversions here (if you prefer and allow installing dependencies), or
- Tune the output sizes/quality, or
- Create `optimized/` versions in multiple formats (e.g., `avif`) instead of/in addition to WebP.
