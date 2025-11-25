import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const dynamic = 'force-static';
export const alt = 'LogAnalytics — Local-First Log Intelligence';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo area */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '120px',
              height: '120px',
              background: 'white',
              borderRadius: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
          >
            <svg width="80" height="80" viewBox="0 0 40 40" fill="none">
              <rect x="8" y="10" width="18" height="2.5" rx="1.25" fill="#2563eb" />
              <rect x="8" y="16" width="14" height="2.5" rx="1.25" fill="#2563eb" opacity="0.8" />
              <rect x="8" y="22" width="16" height="2.5" rx="1.25" fill="#2563eb" opacity="0.6" />
              <path d="M28 28 L30 25 L32 26 L34 22" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <circle cx="28" cy="28" r="1.5" fill="#2563eb" />
              <circle cx="30" cy="25" r="1.5" fill="#2563eb" />
              <circle cx="32" cy="26" r="1.5" fill="#2563eb" />
              <circle cx="34" cy="22" r="1.5" fill="#2563eb" />
            </svg>
          </div>
          <div style={{ color: 'white', fontSize: '72px', fontWeight: 'bold' }}>
            LogAnalytics
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            color: 'rgba(255,255,255,0.95)',
            fontSize: '42px',
            fontWeight: '600',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: '1.3',
          }}
        >
          Parse Apache, Nginx & AWS Logs in Your Browser
        </div>

        {/* Badge */}
        <div
          style={{
            marginTop: '40px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '50px',
            fontSize: '28px',
            fontWeight: '600',
            backdropFilter: 'blur(10px)',
          }}
        >
          🔒 100% Local • DuckDB-Wasm Powered
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
