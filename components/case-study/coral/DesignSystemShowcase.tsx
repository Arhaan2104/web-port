'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

/* ─── data ─── */
const coralPalette = [
  { token: '--coral-100', hex: '#FFF3F1', usage: 'Light bg' },
  { token: '--coral-200', hex: '#FFDAD4', usage: 'Hover borders' },
  { token: '--coral-500', hex: '#F36A59', usage: 'Primary accent' },
  { token: '--coral-600', hex: '#EB5E4E', usage: 'Active states' },
  { token: '--coral-700', hex: '#B91C1C', usage: 'Pressed' },
];

const inkPalette = [
  { token: '--ink-900', hex: '#111827', usage: 'Headings' },
  { token: '--ink-700', hex: '#344054', usage: 'Section titles' },
  { token: '--ink-600', hex: '#475467', usage: 'Body text' },
  { token: '--ink-500', hex: '#667085', usage: 'Labels' },
  { token: '--ink-400', hex: '#98A2B3', usage: 'Muted' },
];

const surfacePalette = [
  { token: '--bg-canvas', hex: '#FAFBFC', usage: 'Page bg' },
  { token: '--card-bg', hex: '#FFFFFF', usage: 'Card surfaces' },
  { token: '--line-200', hex: '#E9EDF3', usage: 'Dividers' },
  { token: '--radius', hex: '', usage: '10px base', value: '10px' },
];

const shadows = [
  { level: 'Rest', value: '0 1px 2px rgba(16,24,40,0.03)' },
  { level: 'Hover', value: '0 4px 12px rgba(16,24,40,0.08)' },
  { level: 'Elevated', value: '0 25px 50px -12px rgba(0,0,0,0.15)' },
];

const radii = [
  { label: 'Cards', value: '24px' },
  { label: 'Buttons', value: '9999px' },
  { label: 'Modals', value: '16px' },
  { label: 'Inputs', value: '10px' },
];

/* ─── swatch ─── */
const Swatch: React.FC<{
  hex: string;
  token: string;
  usage: string;
  value?: string;
}> = ({ hex, token, usage, value }) => (
  <div className="flex flex-col gap-2">
    {hex ? (
      <div
        className="w-full aspect-square rounded-xl border border-white/[0.06]"
        style={{ backgroundColor: hex }}
      />
    ) : (
      <div className="w-full aspect-square rounded-xl border border-white/[0.06] bg-white/[0.03] flex items-center justify-center">
        <span className="text-white/40 text-sm font-mono">{value}</span>
      </div>
    )}
    <div>
      <p className="text-[10px] text-white/40 font-mono truncate">{token}</p>
      {hex && <p className="text-[10px] text-white/25 font-mono">{hex}</p>}
      <p className="text-[10px] text-white/20 font-urbanist mt-0.5">{usage}</p>
    </div>
  </div>
);

/* ─── main ─── */
const DesignSystemShowcase: React.FC = () => {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 space-y-10"
    >
      {/* Coral Palette */}
      <div>
        <p className="eyebrow mb-4">Coral Palette</p>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {coralPalette.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>
      </div>

      {/* Ink Palette */}
      <div>
        <p className="eyebrow mb-4">Ink Palette</p>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {inkPalette.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>
      </div>

      {/* Surface & Structure */}
      <div>
        <p className="eyebrow mb-4">Surface & Structure</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {surfacePalette.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>
      </div>

      {/* Elevation */}
      <div>
        <p className="eyebrow mb-4">Elevation</p>
        <div className="grid grid-cols-3 gap-4">
          {shadows.map((s) => (
            <div key={s.level} className="flex flex-col items-center gap-3">
              <div
                className="w-full aspect-[4/3] rounded-2xl bg-white"
                style={{ boxShadow: s.value }}
              />
              <div className="text-center">
                <p className="text-xs text-white/50 font-urbanist font-medium">{s.level}</p>
                <p className="text-[10px] text-white/20 font-mono mt-0.5 break-all">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div>
        <p className="eyebrow mb-4">Typography</p>
        <div className="space-y-2">
          {[
            { weight: 400, label: 'Regular', sample: 'The quick brown fox jumps' },
            { weight: 500, label: 'Medium', sample: 'The quick brown fox jumps' },
            { weight: 600, label: 'Semibold', sample: 'The quick brown fox jumps' },
            { weight: 700, label: 'Bold', sample: 'The quick brown fox jumps' },
          ].map((t) => (
            <div key={t.weight} className="flex items-baseline gap-4">
              <span className="text-[10px] text-white/25 font-mono w-16 shrink-0">{t.weight}</span>
              <span className="text-[10px] text-white/30 font-urbanist w-16 shrink-0">{t.label}</span>
              <span
                className="text-white/60 text-sm"
                style={{
                  fontWeight: t.weight,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                {t.sample}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-white/20 font-mono mt-3">
          System stack · -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto · 10–18px
        </p>
      </div>

      {/* Border Radii */}
      <div>
        <p className="eyebrow mb-4">Border Radii</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {radii.map((r) => (
            <div key={r.label} className="flex flex-col items-center gap-2">
              <div
                className="w-full aspect-[3/2] border border-white/[0.12] bg-white/[0.03]"
                style={{ borderRadius: r.value }}
              />
              <div className="text-center">
                <p className="text-xs text-white/50 font-urbanist font-medium">{r.label}</p>
                <p className="text-[10px] text-white/25 font-mono">{r.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DesignSystemShowcase;
