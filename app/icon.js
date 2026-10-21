import { ImageResponse } from 'next/og';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #7c5cff, #19c3b2)',
          color: 'white',
          fontSize: 150,
          fontWeight: 800,
          letterSpacing: 4,
        }}
      >
        <div>FML</div>
        <div style={{ fontSize: 90 }}>👟</div>
      </div>
    ),
    { ...size }
  );
}
