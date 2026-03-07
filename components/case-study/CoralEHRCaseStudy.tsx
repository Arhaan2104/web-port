'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import type { Project } from '@/lib/projects';
import { getNextProject, getPrevProject } from '@/lib/projects';
import GlassCard from '@/components/ui/GlassCard';
import DesignSystemShowcase from '@/components/case-study/coral/DesignSystemShowcase';
import CaseStudyResources from './CaseStudyResources';
import CaseStudyTabs from './CaseStudyTabs';
import {
  ScrollProgressBar,
  BackNav,
  CaseStudyHero,
  Section,
  SideLabel,
  Body,
  Callout,
  StatCard,
  SectionDivider,
  ImageShowcase,
  ToolStack,
  CaseStudyCTA,
} from './shared';

interface CoralEHRCaseStudyProps {
  project: Project;
  lockFullCaseStudy?: boolean;
}

const CoralEHRCaseStudy: React.FC<CoralEHRCaseStudyProps> = ({ project, lockFullCaseStudy = false }) => {
  const nextProject = getNextProject('coralehr');
  const prevProject = getPrevProject('coralehr');
  const resources = project.caseStudy?.resources ?? [];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <ScrollProgressBar />
      <BackNav />

      {/* ── HERO ── */}
      <CaseStudyHero
        tag="Healthcare AI"
        title="CoralEHR"
        titleClassName="bg-gradient-to-r from-[#F36A59] to-[#FFB3A8] bg-clip-text text-transparent"
        subtitle="AI-native EHR for private-pay behavioral health"
        meta={[
          { label: 'Role', value: 'Co-founder — Product Design & Engineering' },
          { label: 'Website', value: 'www.coralehr.com', href: 'https://www.coralehr.com' },
          { label: 'Program', value: 'USC x Techstars Founder Catalyst' },
          { label: 'Status', value: 'Working product, 2 active design partners' },
          { label: 'Stack', value: 'React · TypeScript · Tailwind CSS · Claude API · AWS' },
        ]}
        readingTime={6}
      />

      {/* ── HERO IMAGE ── */}
      <motion.section
        className="px-6 md:px-12 lg:px-24 mb-20 md:mb-32"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="max-w-6xl mx-auto">
          <GlassCard className="relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-white/[0.06]">
            <iframe
              src="https://demo.coralehr.com"
              title="CoralEHR Interactive Demo"
              className="h-full w-full border-0"
              allow="clipboard-write"
              loading="lazy"
            />
          </GlassCard>
        </div>
      </motion.section>

      {/* ── TABS ── */}
      <CaseStudyTabs
        overview={project.caseStudy!.overview!}
        resources={resources}
        lockFullCaseStudy={lockFullCaseStudy}
        lockOverview={lockFullCaseStudy}
      >

      <SectionDivider />

      {/* ── CONTEXT ── */}
      <Section>
        <SideLabel label="Context">
          <div className="space-y-6">
            <Body>
              Clinicians spend a disproportionate amount of time on documentation. Most EHR software treats note-taking as a form-filling exercise — structured templates that don&apos;t match how clinicians actually think during a session.
            </Body>
            <Body>
              CoralEHR came out of the USC x Techstars Founder Catalyst program. We have two active design partners who use the product and give us direct feedback on what works and what doesn&apos;t in their day-to-day practice.
            </Body>
          </div>
        </SideLabel>
      </Section>

      {resources.length > 0 && (
        <Section>
          <SideLabel label="Product in the Wild">
            <CaseStudyResources resources={resources} />
          </SideLabel>
        </Section>
      )}

      {/* ── MISMATCH DIAGRAM ── */}
      <Section>
        <ImageShowcase
          label="Mismatch Diagram"
          description="Simple diagram showing 'fragmented thinking during session' on the left, 'structured clinical note expected after' on the right, with a gap between them. Clean Figma diagram or whiteboard-style sketch."
        />
      </Section>

      {/* ── THE CORE PROBLEM ── */}
      <Section variant="highlighted">
        <SideLabel label="The Problem">
          <div className="space-y-6">
            <Body>
              During a session, clinicians think in fragments — quick observations, keywords, partial thoughts. But EHRs expect polished, structured notes (SOAP, DAP, Progress) after the fact. There&apos;s a gap between how information is captured and how it needs to be recorded.
            </Body>
            <Body>
              We heard this directly from our design partners. One described it as &quot;writing the report after the conversation is already gone from your head.&quot;
            </Body>
          </div>
        </SideLabel>
      </Section>

      <Section>
        <Callout attribution="Design partner">
          &ldquo;Writing the report after the conversation is already gone from your head.&rdquo;
        </Callout>
      </Section>

      {/* ── WHAT I BUILT ── */}
      <Section variant="highlighted">
        <SideLabel label="What I Built">
          <div className="space-y-6">
            <Body>
              A scratchpad-to-note pipeline. Clinicians jot fragments into a working memory scratchpad during sessions. When they&apos;re ready, they select which fragments to include, pick a note format, and an AI draft structures it into a proper clinical note. They review and edit before saving — the AI assists, it doesn&apos;t replace.
            </Body>
            <Body>
              The rest of the system is a full patient management platform: patient charts, treatment plans, billing, appointment history, assessments, and messaging — all designed around progressive disclosure so the interface stays calm until you need depth.
            </Body>
          </div>
        </SideLabel>
      </Section>

      {/* ── PIPELINE IMAGE ── */}
      <Section>
        <ImageShowcase
          label="Scratchpad-to-Note Pipeline"
          description="3-panel sequence: (1) Scratchpad with working memory cells filled in, (2) AI Draft modal with cells selected and note type chosen, (3) Generated Preview showing a structured SOAP note. Annotate with step numbers or subtle arrows."
        />
      </Section>

      {/* ── DESIGN DECISIONS ── */}
      <Section>
        <SideLabel label="Design Decisions">
          <div className="space-y-12">
            {/* Cards over tables */}
            <div className="space-y-4">
              <h3 className="text-lg text-ink font-urbanist font-semibold">Cards over tables</h3>
              <p className="text-white/75 font-urbanist leading-relaxed">
                The patient chart uses a card-based layout. Each card — billing, history, risk factors, treatment plan — shows a summary and links deeper. This keeps the overview scannable without hiding information behind extra clicks.
              </p>
            </div>
          </div>
        </SideLabel>
      </Section>

      {/* Patient chart image */}
      <Section>
        <ImageShowcase
          label="Patient Chart"
          description="Patient chart page showing the 2-column card grid — PatientInfo, Billing, History, Treatment Plan, Risk Factors, Recent Note Summary all visible."
        />
      </Section>

      <Section>
        <SideLabel label=" ">
          <div className="space-y-12">
            {/* Consistent interaction language */}
            <div className="space-y-4">
              <h3 className="text-lg text-ink font-urbanist font-semibold">Consistent interaction language</h3>
              <p className="text-white/75 font-urbanist leading-relaxed">
                Every clickable card has the same hover behavior — subtle shadow lift, coral border hint, chevron nudge. Small thing, but it makes the interface feel predictable. Our design partners never had to ask &quot;is this clickable?&quot; — it just communicated.
              </p>
            </div>
          </div>
        </SideLabel>
      </Section>

      {/* Optional: Card hover states */}
      <Section>
        <ImageShowcase
          label="Card Hover States (Optional)"
          description="Side-by-side of a card in rest state vs. hover state, showing the shadow/border change. Can skip if the hero screenshot is strong enough."
          aspect="aspect-[16/7]"
        />
      </Section>

      <Section>
        <SideLabel label=" ">
          <div className="space-y-12">
            {/* AI as draft */}
            <div className="space-y-4">
              <h3 className="text-lg text-ink font-urbanist font-semibold">AI as a draft, not an answer</h3>
              <p className="text-white/75 font-urbanist leading-relaxed">
                The AI modal explicitly labels output as &quot;Generated Preview&quot; with a review step before anything is saved. Clinicians stay in control. In healthcare, auto-saving AI output isn&apos;t just bad UX — it&apos;s a liability.
              </p>
            </div>
          </div>
        </SideLabel>
      </Section>

      <Section>
        <Callout>
          In healthcare, auto-saving AI output isn&apos;t just bad UX — it&apos;s a liability.
        </Callout>
      </Section>

      {/* AI Draft modal image */}
      <Section>
        <ImageShowcase
          label="AI Draft Modal"
          description="AI Draft modal showing the Generated Preview section with content, the 'Create Note' button at the bottom, and the review framing visible. Shows the human-in-the-loop design."
        />
      </Section>

      <Section>
        <SideLabel label=" ">
          <div className="space-y-4">
            <h3 className="text-lg text-ink font-urbanist font-semibold">Warm color system</h3>
            <p className="text-white/75 font-urbanist leading-relaxed">
              I went with coral instead of the typical clinical blue. Healthcare software doesn&apos;t have to feel cold. The palette is intentionally approachable while staying professional.
            </p>
          </div>
        </SideLabel>
      </Section>

      <SectionDivider />

      {/* ── DESIGN SYSTEM ── */}
      <Section>
        <SideLabel label="Design System">
          <div className="space-y-6">
            <Body>
              Built a small but consistent token system: coral palette (5 stops from #FFF3F1 to #B91C1C), neutral ink scale for text hierarchy, three elevation levels, and a unified radius language. Every card, modal, and button follows the same rules.
            </Body>
          </div>
        </SideLabel>
      </Section>

      <Section>
        <DesignSystemShowcase />
      </Section>

      {/* Token table */}
      <Section>
        <motion.div variants={fadeUp} className="overflow-x-auto">
          <table className="w-full text-sm font-urbanist">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left text-xs text-white/50 uppercase tracking-[0.15em] pb-3 pr-8">Token</th>
                <th className="text-left text-xs text-white/50 uppercase tracking-[0.15em] pb-3 pr-8">Value</th>
                <th className="text-left text-xs text-white/50 uppercase tracking-[0.15em] pb-3">Usage</th>
              </tr>
            </thead>
            <tbody className="text-white/70">
              {[
                ['Coral 100–700', '#FFF3F1 → #B91C1C', 'Accent, buttons, borders'],
                ['Ink 400–900', '#98A2B3 → #111827', 'Text hierarchy'],
                ['Card radius', '24px', 'All card surfaces'],
                ['Button radius', '9999px (pill)', 'All actions'],
                ['Modal radius', '16px', 'All dialogs'],
                ['Rest shadow', '0 1px 2px rgba(16,24,40,0.03)', 'Default state'],
                ['Hover shadow', '0 4px 12px rgba(16,24,40,0.08)', 'Interactive lift'],
              ].map(([token, value, usage], i) => (
                <tr key={i} className="border-b border-white/[0.03]">
                  <td className="py-3 pr-8 text-white/[0.55] font-mono text-xs">{token}</td>
                  <td className="py-3 pr-8 font-mono text-xs">{value}</td>
                  <td className="py-3">{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </Section>

      <SectionDivider />

      {/* ── ENGINEERING ── */}
      <Section>
        <SideLabel label="Engineering">
          <div className="space-y-6">
            <Body>
              This isn&apos;t a Figma file — it&apos;s a shipped application. React 18 with TypeScript strict mode, Zustand for client state, React Query for server state, and a real integration with the Claude API for note generation, running on AWS.
            </Body>
            <Body>
              I designed and built the frontend end-to-end, which meant making tradeoffs between what looked ideal and what was practical to ship and maintain.
            </Body>
          </div>
        </SideLabel>
      </Section>

      {/* Optional architecture diagram */}
      <Section>
        <ImageShowcase
          label="Architecture (Optional)"
          description="Simple architecture diagram: React → Zustand/React Query → Claude API → AWS Lambda. Include only if targeting design engineering roles."
          aspect="aspect-[16/7]"
        />
      </Section>

      <SectionDivider />

      {/* ── TRY IT ── */}
      <Section>
        <SideLabel label="Try It">
          <div className="space-y-4">
            <Body>
              CoralEHR is a live product. Explore the clinician portal below.
            </Body>
            <a
              href="https://www.coralehr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-electric hover:gap-3 transition-all duration-200 font-urbanist font-medium"
            >
              Visit coralehr.com
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </SideLabel>
      </Section>

      {/* ── WHAT'S NEXT ── */}
      <Section>
        <SideLabel label="What&apos;s Next">
          <ul className="space-y-3">
            {[
              'Expanding beyond our two design partners to a wider pilot',
              'Deeper FHIR R4 integration for interoperability with existing systems',
              'Accessibility audit — keyboard navigation works but screen reader support needs attention',
              'Smarter AI context — pulling in previous notes and treatment plan goals to inform drafts',
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-white/75 font-urbanist">
                <span className="text-electric/60 mt-1.5 shrink-0">—</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </SideLabel>
      </Section>

      {/* ── WHAT I LEARNED ── */}
      <Section variant="highlighted">
        <SideLabel label="What I Learned">
          <Body>
            Building in healthcare is slow on purpose. Every design decision gets pressure-tested by clinicians who have strong opinions about their workflows — and they should. Working with our design partners taught me that the gap between &quot;looks right&quot; and &quot;works in a 15-minute session&quot; is wider than you&apos;d expect. The product is better for it.
          </Body>
        </SideLabel>
      </Section>

      {/* ── TOOLS ── */}
      <Section>
        <SideLabel label="Tools">
          <ToolStack tools={['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'React Query', 'Claude API', 'AWS']} />
        </SideLabel>
      </Section>

      {/* ── CTA ── */}
      <CaseStudyCTA
        liveSiteUrl="https://www.coralehr.com"
        liveSiteLabel="Visit Live Site"
        nextProject={nextProject ? {
          title: nextProject.title,
          tag: nextProject.tag,
          href: nextProject.href,
          image: nextProject.image,
        } : undefined}
        prevProject={prevProject ? {
          title: prevProject.title,
          tag: prevProject.tag,
          href: prevProject.href,
          image: prevProject.image,
        } : undefined}
      />

      </CaseStudyTabs>
    </div>
  );
};

export default CoralEHRCaseStudy;
