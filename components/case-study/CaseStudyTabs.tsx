'use client';

import React, { Suspense, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { CaseStudyOverview } from '@/lib/projects';
import CaseStudyOverviewPanel from './CaseStudyOverviewPanel';

type ViewTab = 'overview' | 'full';

interface CaseStudyTabsProps {
  overview: CaseStudyOverview;
  children: React.ReactNode;
}

function CaseStudyTabsFallback() {
  return (
    <div className="sticky top-20 z-40 px-6 md:px-12 lg:px-24 py-4 bg-obsidian-base shadow-[0_-20px_20px_20px_#0B0B0C]">
      <div className="max-w-5xl mx-auto flex justify-center">
        <div className="inline-flex rounded-full p-1.5 bg-white/[0.03] border border-white/[0.08]">
          <div className="px-7 py-2.5 text-base font-urbanist font-medium rounded-full text-ink bg-white/[0.08] border border-white/[0.12]">
            Overview
          </div>
          <div className="px-7 py-2.5 text-base font-urbanist font-medium rounded-full text-white/40">
            Full Case Study
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseStudyTabsInner({ overview, children }: CaseStudyTabsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeTab: ViewTab = searchParams.get('view') === 'full' ? 'full' : 'overview';

  const handleTabChange = useCallback((tab: ViewTab) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === 'overview') {
      params.delete('view');
    } else {
      params.set('view', tab);
    }
    const newPath = params.toString() ? `${pathname}?${params}` : pathname;
    router.replace(newPath, { scroll: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams, pathname, router]);

  const tabs = [
    { key: 'overview' as const, label: 'Overview' },
    { key: 'full' as const, label: 'Full Case Study' },
  ];

  return (
    <>
      {/* Sticky tab bar */}
      <div className="sticky top-20 z-40 px-6 md:px-12 lg:px-24 py-4 bg-obsidian-base shadow-[0_-20px_20px_20px_#0B0B0C]">
        <div className="max-w-5xl mx-auto flex justify-center">
          <LayoutGroup>
            <div className="inline-flex rounded-full p-1.5 bg-white/[0.03] border border-white/[0.08]">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={cn(
                    'relative px-7 py-2.5 text-base font-urbanist font-medium rounded-full transition-colors duration-200',
                    activeTab === tab.key ? 'text-ink' : 'text-white/40 hover:text-white/60'
                  )}
                >
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="case-study-tab-indicator"
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.12]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <CaseStudyOverviewPanel overview={overview} />
          </motion.div>
        ) : (
          <motion.div
            key="full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function CaseStudyTabs(props: CaseStudyTabsProps) {
  return (
    <Suspense fallback={<CaseStudyTabsFallback />}>
      <CaseStudyTabsInner {...props} />
    </Suspense>
  );
}
