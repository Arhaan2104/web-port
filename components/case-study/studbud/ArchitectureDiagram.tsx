'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

/* ─── sage-themed flow node ─── */
const Node: React.FC<{
  label: string;
  sub?: string;
  highlight?: boolean;
}> = ({ label, sub, highlight = false }) => (
  <div
    className={`
      px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap
      border transition-colors duration-200
      ${highlight
        ? 'bg-[#6B7F6B]/10 border-[#6B7F6B]/30 text-[#8FA98F]'
        : 'bg-white/[0.04] border-white/[0.08] text-white/70'
      }
    `}
  >
    {label}
    {sub && <span className="text-white/[0.45] ml-1.5 text-xs font-normal">{sub}</span>}
  </div>
);

const Arrow: React.FC = () => (
  <span className="text-white/20 text-lg shrink-0">→</span>
);

const DownArrow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={className}>
    <span className="text-white/20 text-lg">↓</span>
  </div>
);

const ArchitectureDiagram: React.FC = () => {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 overflow-x-auto"
    >
      {/* Title */}
      <p className="text-xs text-white/50 font-urbanist uppercase tracking-[0.15em] mb-8">
        Ingestion + RAG Pipeline
      </p>

      <div className="flex flex-col gap-6 min-w-[600px]">
        {/* Row 1: Data Source → Sync → Ingestion */}
        <div className="flex items-center gap-3">
          <Node label="Google Classroom API" />
          <Arrow />
          <Node label="Sync" sub="courses · assignments · materials" />
          <Arrow />
          <Node label="Ingestion" sub="PDF · Docs · Slides · YouTube · Links" highlight />
        </div>

        {/* Connector down */}
        <DownArrow className="pl-[480px]" />

        {/* Row 1.5: OCR annotation */}
        <div className="flex items-center gap-3 pl-[440px]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-px bg-[#6B7F6B]/30" />
            <span className="text-[#8FA98F]/50 text-xs font-urbanist whitespace-nowrap">
              + OCR fallback for scanned docs
            </span>
          </div>
        </div>

        {/* Row 2: Chunking → Embeddings → Vector Store */}
        <div className="flex items-center gap-3 pl-8">
          <Node label="Chunking" sub="overlap for context" />
          <Arrow />
          <Node label="text-embedding-3-small" />
          <Arrow />
          <Node label="pgvector" sub="PostgreSQL" />
        </div>

        {/* Connector down */}
        <DownArrow className="pl-[380px]" />

        {/* Row 3: RAG → LLM → Output */}
        <div className="flex items-center gap-3 pl-16 relative">
          <Node label="RAG Retrieval" highlight />
          <Arrow />
          <Node label="GPT-4.1" sub="structured JSON output" />
          <Arrow />
          <Node label="Chat + Study Tools" highlight />

          {/* Annotation */}
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden lg:block">
            <div className="flex items-center gap-2 ml-4">
              <div className="w-6 h-px bg-[#6B7F6B]/30" />
              <span className="text-[#8FA98F]/50 text-xs font-urbanist whitespace-nowrap">
                5 tools, same pipeline
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom annotations */}
      <div className="mt-10 pt-6 border-t border-white/[0.04]">
        <p className="text-xs text-white/25 font-urbanist tracking-wide">
          <span className="text-white/40">Retrieval:</span>{' '}
          Cosine similarity search → keyword fallback (ILIKE + stop-word filtering) → top-k context window
        </p>
      </div>

      <div className="mt-4 flex gap-6">
        <p className="text-xs text-white/25 font-urbanist tracking-wide">
          <span className="text-white/40">Deployment:</span>{' '}
          Single Next.js app on Vercel — no microservices
        </p>
      </div>
    </motion.div>
  );
};

export default ArchitectureDiagram;
