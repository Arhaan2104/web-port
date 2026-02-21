'use client';

import React, { Suspense, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { CaseStudyOverview, CaseStudyResource } from '@/lib/projects';
import CaseStudyOverviewPanel from './CaseStudyOverviewPanel';
import CaseStudyResources from './CaseStudyResources';

type ViewTab = 'overview' | 'full' | 'resources';

interface CaseStudyTabsProps {
  overview: CaseStudyOverview;
  resources?: CaseStudyResource[];
  lockFullCaseStudy?: boolean;
  children: React.ReactNode;
}

function CaseStudyTabsFallback({
  showResources = false,
  lockFullCaseStudy = false,
}: {
  showResources?: boolean;
  lockFullCaseStudy?: boolean;
}) {
  return (
    <div className="sticky top-20 z-40 px-6 md:px-12 lg:px-24 py-4 bg-obsidian-base case-tabs-shadow">
      <div className="max-w-5xl mx-auto flex justify-start md:justify-center overflow-x-auto">
        <div className="inline-flex min-w-max rounded-full p-1.5 bg-white/[0.03] border border-white/[0.08]">
          <div className="px-5 md:px-7 py-2.5 min-h-11 text-sm md:text-base font-urbanist font-medium rounded-full text-ink bg-white/[0.08] border border-white/[0.12]">
            Overview
          </div>
          <div className="px-5 md:px-7 py-2.5 min-h-11 text-sm md:text-base font-urbanist font-medium rounded-full text-white/40">
            {lockFullCaseStudy ? 'Coming Soon' : 'Full Case Study'}
          </div>
          {showResources && (
            <div className="px-5 md:px-7 py-2.5 min-h-11 text-sm md:text-base font-urbanist font-medium rounded-full text-white/40">
              Resources
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CaseStudyTabsInner({ overview, resources, lockFullCaseStudy = false, children }: CaseStudyTabsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const hasResources = Boolean(resources && resources.length > 0);
  const requestedView = searchParams.get('view');

  const activeTab: ViewTab =
    requestedView === 'full'
      ? 'full'
      : requestedView === 'resources' && hasResources
        ? 'resources'
        : 'overview';

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
    { key: 'full' as const, label: lockFullCaseStudy ? 'Coming Soon' : 'Full Case Study' },
    ...(hasResources ? [{ key: 'resources' as const, label: 'Resources' }] : []),
  ];

  return (
    <>
      {/* Sticky tab bar */}
      <div className="sticky top-20 z-40 px-6 md:px-12 lg:px-24 py-4 bg-obsidian-base case-tabs-shadow">
        <div className="max-w-5xl mx-auto flex justify-start md:justify-center overflow-x-auto">
          <LayoutGroup>
            <div className="inline-flex min-w-max rounded-full p-1.5 bg-white/[0.03] border border-white/[0.08]">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={cn(
                    'relative px-5 md:px-7 py-2.5 min-h-11 text-sm md:text-base font-urbanist font-medium rounded-full transition-colors duration-200',
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
            <CaseStudyOverviewPanel overview={overview} resources={resources} />
          </motion.div>
        ) : activeTab === 'full' ? (
          <motion.div
            key="full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {lockFullCaseStudy ? (
              <div className="px-6 md:px-12 lg:px-24 pt-12 pb-20">
                <div className="max-w-5xl mx-auto">
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-8 py-14 text-center">
                    <p className="eyebrow mb-3 text-white/50">Full Case Study</p>
                    <h3 className="text-3xl md:text-4xl font-urbanist font-semibold text-ink">Coming soon</h3>
                  </div>
                </div>
              </div>
            ) : (
              children
            )}
          </motion.div>
        ) : (
          <motion.div
            key="resources"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="px-6 md:px-12 lg:px-24 pt-12 pb-20"
          >
            <div className="max-w-5xl mx-auto">
              <CaseStudyResources resources={resources} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function CaseStudyTabs(props: CaseStudyTabsProps) {
  const showResources = Boolean(props.resources && props.resources.length > 0);
  return (
    <Suspense fallback={<CaseStudyTabsFallback showResources={showResources} lockFullCaseStudy={props.lockFullCaseStudy} />}>
      <CaseStudyTabsInner {...props} />
    </Suspense>
  );
}
