import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Embed the source image so it stretches to fill the square (no crop).
const imageSrc = `data:image/jpeg;base64,${readFileSync(
  join(process.cwd(), 'public', 'app_image.jpg')
).toString('base64')}`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <img
        src={imageSrc}
        width={size.width}
        height={size.height}
        style={{ objectFit: 'fill' }}
      />
    ),
    { ...size }
  );
}
