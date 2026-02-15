'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

/* ─── data ─── */
const creamPalette = [
  { token: '--cream-50', hex: '#FAF8F5', usage: 'Page background' },
  { token: '--cream-100', hex: '#F5F0EB', usage: 'Card hover' },
  { token: '--cream-200', hex: '#EDE7DF', usage: 'Borders' },
];

const inkPalette = [
  { token: '--ink-900', hex: '#1A1814', usage: 'Headings' },
  { token: '--ink-700', hex: '#3D3A35', usage: 'Body text' },
  { token: '--ink-500', hex: '#6B6760', usage: 'Muted' },
  { token: '--ink-400', hex: '#9C978F', usage: 'Labels' },
];

const accentPalette = [
  { token: '--sage', hex: '#6B7F6B', usage: 'Primary actions' },
  { token: '--sage-light', hex: '#8FA98F', usage: 'Hover states' },
  { token: '--terracotta', hex: '#C4705A', usage: 'Secondary / destructive' },
  { token: '--terracotta-light', hex: '#D4917E', usage: 'Hover / muted' },
];

const screenshots = [
  {
    src: '/images/StudBud SS/Screenshot 2026-02-14 at 8.04.21 AM.png',
    label: 'Dashboard',
  },
  {
    src: '/images/StudBud SS/Screenshot 2026-02-14 at 8.04.44 AM.png',
    label: 'AI Chat with Citations',
  },
  {
    src: '/images/StudBud SS/Screenshot 2026-02-14 at 8.04.31 AM.png',
    label: 'To-Do with AI Steps',
  },
  {
    src: '/images/StudBud SS/Screenshot 2026-02-14 at 8.05.18 AM.png',
    label: 'Settings & Data Deletion',
  },
];

/* ─── swatch ─── */
const Swatch: React.FC<{
  hex: string;
  token: string;
  usage: string;
}> = ({ hex, token, usage }) => (
  <div className="flex flex-col gap-2">
    <div
      className="w-full aspect-square rounded-xl border border-white/[0.06]"
      style={{ backgroundColor: hex }}
    />
    <div>
      <p className="text-[10px] text-white/40 font-mono truncate">{token}</p>
      <p className="text-[10px] text-white/25 font-mono">{hex}</p>
      <p className="text-[10px] text-white/20 font-urbanist mt-0.5">{usage}</p>
    </div>
  </div>
);

/* ─── main ─── */
const VisualDesignShowcase: React.FC = () => {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 space-y-10"
    >
      {/* Cream Palette */}
      <div>
        <p className="text-xs text-white/50 font-urbanist uppercase tracking-[0.15em] mb-4">Cream Palette</p>
        <div className="grid grid-cols-3 gap-3">
          {creamPalette.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>
      </div>

      {/* Ink Palette */}
      <div>
        <p className="text-xs text-white/50 font-urbanist uppercase tracking-[0.15em] mb-4">Ink Palette</p>
        <div className="grid grid-cols-4 gap-3">
          {inkPalette.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>
      </div>

      {/* Accent Palette */}
      <div>
        <p className="text-xs text-white/50 font-urbanist uppercase tracking-[0.15em] mb-4">Accent Palette</p>
        <div className="grid grid-cols-4 gap-3">
          {accentPalette.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>
      </div>

      {/* Typography */}
      <div>
        <p className="text-xs text-white/50 font-urbanist uppercase tracking-[0.15em] mb-4">Typography Pairing</p>
        <div className="space-y-6">
          {/* Headline font */}
          <div className="space-y-2">
            <p className="text-[10px] text-white/25 font-mono">Instrument Serif — Headlines</p>
            <p
              className="text-[28px] text-white/70 leading-tight"
              style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
            >
              Good morning, Arhaan
            </p>
          </div>

          {/* Body font */}
          <div className="space-y-2">
            <p className="text-[10px] text-white/25 font-mono">DM Sans — Body & UI</p>
            <div className="space-y-1.5">
              {[
                { weight: 400, label: 'Regular', sample: 'Study smarter, not harder — powered by your own coursework.' },
                { weight: 500, label: 'Medium', sample: 'AI Chat with citations from your actual materials.' },
                { weight: 600, label: 'Semibold', sample: 'Flashcards · Quizzes · Study Plans' },
              ].map((t) => (
                <div key={t.weight} className="flex items-baseline gap-4">
                  <span className="text-[10px] text-white/25 font-mono w-12 shrink-0">{t.weight}</span>
                  <span className="text-[10px] text-white/30 font-urbanist w-16 shrink-0">{t.label}</span>
                  <span
                    className="text-white/60 text-sm leading-relaxed"
                    style={{
                      fontWeight: t.weight,
                      fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    }}
                  >
                    {t.sample}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-white/20 font-mono">
            Instrument Serif × DM Sans · warm editorial pairing
          </p>
        </div>
      </div>

      {/* Card Styling */}
      <div>
        <p className="text-xs text-white/50 font-urbanist uppercase tracking-[0.15em] mb-4">Card Styling</p>
        <div className="grid grid-cols-2 gap-4">
          {/* Rest state */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-full aspect-[4/3] rounded-2xl border"
              style={{
                backgroundColor: '#FAF8F5',
                borderColor: '#EDE7DF',
                boxShadow: '0 1px 3px rgba(26,24,20,0.04)',
              }}
            >
              <div className="p-4 h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-2 w-16 rounded-full" style={{ backgroundColor: '#EDE7DF' }} />
                  <div className="h-2 w-24 rounded-full" style={{ backgroundColor: '#EDE7DF' }} />
                </div>
                <div className="h-2 w-12 rounded-full" style={{ backgroundColor: '#6B7F6B', opacity: 0.3 }} />
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-white/50 font-urbanist font-medium">Rest</p>
              <p className="text-[10px] text-white/20 font-mono mt-0.5">shadow-sm · cream bg</p>
            </div>
          </div>

          {/* Hover state */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-full aspect-[4/3] rounded-2xl border"
              style={{
                backgroundColor: '#F5F0EB',
                borderColor: '#6B7F6B',
                borderWidth: '1.5px',
                boxShadow: '0 4px 12px rgba(26,24,20,0.08)',
              }}
            >
              <div className="p-4 h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-2 w-16 rounded-full" style={{ backgroundColor: '#EDE7DF' }} />
                  <div className="h-2 w-24 rounded-full" style={{ backgroundColor: '#EDE7DF' }} />
                </div>
                <div className="h-2 w-12 rounded-full" style={{ backgroundColor: '#6B7F6B', opacity: 0.5 }} />
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-white/50 font-urbanist font-medium">Hover</p>
              <p className="text-[10px] text-white/20 font-mono mt-0.5">shadow-md · sage border</p>
            </div>
          </div>
        </div>
      </div>

      {/* Screenshot Gallery */}
      <div>
        <p className="text-xs text-white/50 font-urbanist uppercase tracking-[0.15em] mb-4">Product in Action</p>
        <div className="grid grid-cols-2 gap-3">
          {screenshots.map((shot) => (
            <div key={shot.label} className="group relative overflow-hidden rounded-xl ring-1 ring-white/[0.06]">
              <div className="relative aspect-[16/10]">
                <Image
                  src={shot.src}
                  alt={shot.label}
                  fill
                  className="object-cover brightness-[0.88] transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3 pt-8">
                <p className="text-[11px] text-white/80 font-urbanist font-medium">{shot.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default VisualDesignShowcase;
