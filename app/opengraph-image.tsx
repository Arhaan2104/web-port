import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Arhaan Gupta - Product Designer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0B0B0C',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(102, 163, 255, 0.08) 0%, transparent 70%)',
          }}
        />
        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#EDEDED',
            letterSpacing: '-0.02em',
            marginBottom: 16,
          }}
        >
          Arhaan Gupta
        </div>
        {/* Title */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: '#66A3FF',
            letterSpacing: '0.05em',
          }}
        >
          Product Designer & Design Engineer
        </div>
        {/* Domain */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.4)',
            marginTop: 24,
            letterSpacing: '0.1em',
          }}
        >
          arhaang.com
        </div>
      </div>
    ),
    { ...size }
  );
}
