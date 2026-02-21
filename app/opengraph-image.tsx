import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Arhaan Gupta - Product Designer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
const COLORS = {
  bg: '#0B0B0C',
  ink: '#EDEDED',
  electric: '#66A3FF',
  electricSoft: '#7EC7FF',
  muted: 'rgba(255, 255, 255, 0.56)',
  line: 'rgba(102, 163, 255, 0.42)',
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: COLORS.bg,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            width: 760,
            height: 760,
            borderRadius: '50%',
            left: '50%',
            top: '34%',
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(circle, rgba(102,163,255,0.16) 0%, rgba(102,163,255,0.05) 38%, rgba(11,11,12,0) 74%)',
          }}
        />

        {/* Hero lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(to bottom, rgba(102,163,255,0) 0%, rgba(102,163,255,0) 58%, rgba(102,163,255,0.03) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 1700,
            height: 240,
            borderTop: `3px solid ${COLORS.line}`,
            borderRadius: '50% / 100%',
            bottom: -130,
            left: -220,
            opacity: 0.9,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 1700,
            height: 250,
            borderTop: `3px solid ${COLORS.line}`,
            borderRadius: '50% / 100%',
            bottom: -40,
            left: -300,
            opacity: 0.7,
          }}
        />

        {/* Hero copy */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 10,
            marginTop: -20,
            maxWidth: 980,
            paddingLeft: 48,
            paddingRight: 48,
          }}
        >
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              color: COLORS.ink,
            }}
          >
            I&apos;m <span style={{ color: COLORS.electricSoft }}>Arhaan</span>.
          </div>
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              color: COLORS.ink,
            }}
          >
            I <span style={{ color: COLORS.electricSoft }}>design</span> &amp;{' '}
            <span style={{ color: COLORS.electricSoft }}>build</span>
          </div>
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              color: COLORS.ink,
            }}
          >
            human-centred products.
          </div>
        </div>

        {/* Badge */}
        <div
          style={{
            position: 'absolute',
            bottom: 108,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(12, 16, 22, 0.58)',
            color: COLORS.muted,
            fontSize: 28,
            fontWeight: 500,
            padding: '12px 28px',
            letterSpacing: '0.02em',
          }}
        >
          Design × Psychology × AI
        </div>
      </div>
    ),
    { ...size }
  );
}
