// Build rasterised icon fallbacks from public/icons/icon.svg.
// Generates: favicon.ico (16+32), favicon-16.png, favicon-32.png,
// apple-touch-icon.png (180), icon-192.png and icon-512.png for the
// manifest. Run after any SVG tweak:
//   node scripts/build-icons.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const svgPath = resolve(root, 'public/icons/icon.svg');
const outDir = resolve(root, 'public/icons');

const svg = readFileSync(svgPath);

// 16x16 and 32x32 PNGs for browser tab favicon fallback.
const png16 = await sharp(svg, { density: 384 })
  .resize(16, 16, { fit: 'contain', background: '#ffffff' })
  .png()
  .toBuffer();
const png32 = await sharp(svg, { density: 384 })
  .resize(32, 32, { fit: 'contain', background: '#ffffff' })
  .png()
  .toBuffer();

// PNG raster of the maskable SVG (Android adaptive icon).
const maskableSvg = readFileSync(resolve(outDir, 'icon-maskable.svg'));
const pngMaskable = await sharp(maskableSvg, { density: 512 })
  .resize(512, 512, { fit: 'contain', background: '#ffffff' })
  .png()
  .toBuffer();

// 180x180 apple touch icon (Home Screen on iOS).
const png180 = await sharp(svg, { density: 512 })
  .resize(180, 180, { fit: 'contain', background: '#ffffff' })
  .png()
  .toBuffer();

// 192 and 512 PNG fallbacks for the manifest.
const png192 = await sharp(svg, { density: 512 })
  .resize(192, 192, { fit: 'contain', background: '#ffffff' })
  .png()
  .toBuffer();
const png512 = await sharp(svg, { density: 512 })
  .resize(512, 512, { fit: 'contain', background: '#ffffff' })
  .png()
  .toBuffer();

writeFileSync(resolve(outDir, 'favicon-16.png'), png16);
writeFileSync(resolve(outDir, 'favicon-32.png'), png32);
writeFileSync(resolve(root, 'public/apple-touch-icon.png'), png180);
writeFileSync(resolve(outDir, 'icon-192.png'), png192);
writeFileSync(resolve(outDir, 'icon-512.png'), png512);
writeFileSync(resolve(outDir, 'icon-maskable.png'), pngMaskable);

// Build a real .ico with both 16 and 32 frames. We hand-pack the ICO
// container because sharp doesn't write .ico directly. Each PNG sits
// inside an ICONDIRENTRY, the 16x16 first, then 32x32.
const ICONDIR = Buffer.alloc(6);
ICONDIR.writeUInt16LE(0, 0);     // reserved
ICONDIR.writeUInt16LE(1, 2);     // type: 1 = icon
ICONDIR.writeUInt16LE(2, 4);     // count of images

const dirEntry16 = Buffer.alloc(16);
dirEntry16.writeUInt8(16, 0);    // width 16
dirEntry16.writeUInt8(16, 1);    // height 16
dirEntry16.writeUInt8(0, 2);     // colours (0 = no palette)
dirEntry16.writeUInt8(0, 3);     // reserved
dirEntry16.writeUInt16LE(1, 4);  // colour planes
dirEntry16.writeUInt16LE(32, 6); // bits per pixel
dirEntry16.writeUInt32LE(png16.length, 8);  // size in bytes
dirEntry16.writeUInt32LE(6 + 16 * 2, 12);   // offset: header + 2 entries

const dirEntry32 = Buffer.alloc(16);
dirEntry32.writeUInt8(32, 0);    // width 32
dirEntry32.writeUInt8(32, 1);    // height 32
dirEntry32.writeUInt8(0, 2);
dirEntry32.writeUInt8(0, 3);
dirEntry32.writeUInt16LE(1, 4);
dirEntry32.writeUInt16LE(32, 6);
dirEntry32.writeUInt32LE(png32.length, 8);
dirEntry32.writeUInt32LE(6 + 16 * 2 + png16.length, 12);

const ico = Buffer.concat([ICONDIR, dirEntry16, dirEntry32, png16, png32]);
writeFileSync(resolve(root, 'public/favicon.ico'), ico);

console.log('Wrote:');
console.log('  public/favicon.ico           (16+32 multi-size ICO)');
console.log('  public/icons/favicon-16.png  (16x16)');
console.log('  public/icons/favicon-32.png  (32x32)');
console.log('  public/apple-touch-icon.png  (180x180)');
console.log('  public/icons/icon-192.png    (192x192)');
console.log('  public/icons/icon-512.png    (512x512)');
console.log('  public/icons/icon-maskable.png (512x512, Android adaptive)');
