import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
          fontSize: 54,
          fontWeight: 800,
          letterSpacing: 2,
        }}
      >
        <div>FML</div>
        <div style={{ fontSize: 34 }}>👟</div>
      </div>
    ),
    { ...size }
  );
}
