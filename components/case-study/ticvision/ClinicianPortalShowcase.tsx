'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

const portalViews = [
  {
    src: '/images/TicVision SS/Screenshot 2026-02-14 at 8.12.02 AM.png',
    label: 'Distribution',
    caption: 'Radar charts for time of day, mood correlation, and triggers',
  },
  {
    src: '/images/TicVision SS/Screenshot 2026-02-14 at 8.12.19 AM.png',
    label: 'Trends',
    caption: 'Tic intensity over time with per-type filtering',
  },
  {
    src: '/images/TicVision SS/Screenshot 2026-02-14 at 8.12.26 AM.png',
    label: 'All Tics Data',
    caption: 'Searchable table with CSV, Excel, and PDF export',
  },
  {
    src: '/images/TicVision SS/Screenshot 2026-02-14 at 8.12.35 AM.png',
    label: 'Key Insights',
    caption: 'AI-generated clinical analysis with treatment recommendations',
  },
];

const ClinicianPortalShowcase: React.FC = () => {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 space-y-8"
    >
      {/* Title */}
      <p className="text-xs text-white/50 font-urbanist uppercase tracking-[0.15em]">
        Clinician Portal — Doctor&apos;s View
      </p>

      {/* 2×2 Portal Views Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portalViews.map((view) => (
          <div key={view.label} className="group space-y-2.5">
            <div className="relative overflow-hidden rounded-xl ring-1 ring-white/[0.06]">
              <div className="relative aspect-[16/10]">
                <Image
                  src={view.src}
                  alt={view.label}
                  fill
                  className="object-cover brightness-[0.88] transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Tab label overlay */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-[10px] text-white/80 font-urbanist font-medium uppercase tracking-[0.1em]">
                  {view.label}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-white/[0.45] font-urbanist leading-relaxed">{view.caption}</p>
          </div>
        ))}
      </div>

      {/* Generated Report */}
      <div className="space-y-3 pt-4 border-t border-white/[0.04]">
        <p className="text-xs text-white/50 font-urbanist uppercase tracking-[0.15em]">
          Generated Report
        </p>
        <div className="group relative overflow-hidden rounded-xl ring-1 ring-white/[0.06]">
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/TicVision SS/Screenshot 2026-02-14 at 8.14.19 AM.png"
              alt="Generated Patient Tic Report"
              fill
              className="object-cover object-top brightness-[0.92] transition-transform duration-500 group-hover:scale-[1.01]"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
        </div>
        <p className="text-[11px] text-white/[0.45] font-urbanist leading-relaxed">
          AI-generated patient tic report — executive summary, phenotype clustering, anomalous events, and full tic log. Exportable as PDF for clinical records.
        </p>
      </div>
    </motion.div>
  );
};

export default ClinicianPortalShowcase;
