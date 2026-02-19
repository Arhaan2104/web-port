'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import SectionEyebrow from '@/components/ui/SectionEyebrow';

/* ─── flow node ─── */
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
        ? 'bg-[#F36A59]/10 border-[#F36A59]/30 text-[#F36A59]'
        : 'bg-white/[0.04] border-white/[0.08] text-white/70'
      }
    `}
  >
    {label}
    {sub && <span className="text-white/[0.45] ml-1.5 text-xs font-normal">{sub}</span>}
  </div>
);

const Arrow: React.FC<{ direction?: 'right' | 'down' }> = ({ direction = 'right' }) => (
  <span className={`text-white/20 text-lg shrink-0 ${direction === 'down' ? 'rotate-90' : ''}`}>
    →
  </span>
);

const DownArrow: React.FC = () => (
  <div className="flex justify-center">
    <span className="text-white/20 text-lg">↓</span>
  </div>
);

const WorkflowDiagram: React.FC = () => {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 overflow-x-auto"
    >
      {/* Title */}
      <SectionEyebrow className="mb-8">Clinician Workflow — Before State</SectionEyebrow>

      <p className="text-[10px] text-white/30 font-urbanist mb-2 md:hidden">Scroll horizontally to explore →</p>
      <div className="flex flex-col gap-6 min-w-[520px]">
        {/* Row 1: Login → Dashboard */}
        <div className="flex items-center gap-3">
          <Node label="Login" />
          <Arrow />
          <Node label="Dashboard" sub="Tasks / Schedule / Glance Cards" />
        </div>

        {/* Connector down */}
        <DownArrow />

        {/* Row 2: Patient List → Patient Chart */}
        <div className="flex items-center gap-3 md:pl-8">
          <Node label="Patient List" />
          <Arrow />
          <Node label="Patient Chart" sub="Info / Billing / History / Risk" />
        </div>

        {/* Connector down */}
        <DownArrow />

        {/* Row 3: Notes Shell — HIGHLIGHTED */}
        <div className="flex items-center gap-3 md:pl-16">
          <Node label="Scratchpad" highlight />
          <Arrow />
          <Node label="AI Draft" highlight />
          <Arrow />
          <Node label="Note Editor" highlight />
        </div>

        <div className="hidden lg:flex justify-end">
          <div className="flex items-center gap-2">
            <div className="w-6 h-px bg-[#F36A59]/30" />
            <span className="text-[#F36A59]/50 text-xs font-urbanist whitespace-nowrap">
              core differentiator
            </span>
          </div>
        </div>

        {/* Connector down */}
        <DownArrow />

        {/* Row 4: Treatment Plan / Forms / Reports */}
        <div className="flex items-center gap-3 md:pl-16">
          <Node label="Treatment Plan" />
          <span className="text-white/15">/</span>
          <Node label="Forms" />
          <span className="text-white/15">/</span>
          <Node label="Reports" />
        </div>
      </div>

      {/* Data flow annotation */}
      <div className="mt-10 pt-6 border-t border-white/[0.04]">
        <p className="text-xs text-white/25 font-urbanist tracking-wide">
          <span className="text-white/40">Data flow:</span>{' '}
          Working Memory cells → AI generates SOAP/DAP/Progress → Clinician reviews → Note saved
        </p>
      </div>

      {/* Sidebar structure */}
      <div className="mt-6 flex gap-6">
        <p className="text-xs text-white/25 font-urbanist tracking-wide">
          <span className="text-white/40">Sidebar:</span>{' '}
          Main · Clinical · Integrations
        </p>
      </div>
    </motion.div>
  );
};

export default WorkflowDiagram;
