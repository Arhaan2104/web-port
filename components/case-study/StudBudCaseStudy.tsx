'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import type { Project } from '@/lib/projects';
import { getNextProject, getPrevProject } from '@/lib/projects';
import CaseStudyTabs from './CaseStudyTabs';
import ArchitectureDiagram from '@/components/case-study/studbud/ArchitectureDiagram';
import VisualDesignShowcase from '@/components/case-study/studbud/VisualDesignShowcase';
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

interface StudBudCaseStudyProps {
  project: Project;
}

const StudBudCaseStudy: React.FC<StudBudCaseStudyProps> = ({ project }) => {
  const nextProject = getNextProject('studbud');
  const prevProject = getPrevProject('studbud');

  return (
    <div className="min-h-screen pt-28 pb-20">
      <ScrollProgressBar />
      <BackNav />

      {/* ── HERO ── */}
      <CaseStudyHero
        tag="EdTech AI"
        title="StudBud"
        subtitle="An AI study assistant that syncs with Google Classroom."
        meta={[
          { label: 'Role', value: 'Designer & Developer (Solo)' },
          { label: 'Stack', value: 'Next.js · TypeScript · Google Classroom API · OpenAI · PostgreSQL + pgvector' },
          { label: 'Status', value: 'Live product, 60 users in first 3 days' },
          { label: 'Platform', value: 'Web' },
        ]}
        readingTime={8}
      />

      {/* ── HERO IMAGE ── */}
      <motion.section
        className="px-6 md:px-12 lg:px-24 mb-20 md:mb-32"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="max-w-6xl mx-auto">
          <ImageShowcase
            src="/images/StudBud SS/Screenshot 2026-02-14 at 8.04.21 AM.png"
            label="Hero"
            description="Full-width screenshot of the dashboard with multiple synced courses, upcoming deadlines, and material counts. Pick the view with the most content visible."
            priority
          />
        </div>
      </motion.section>

      {/* ── TABS ── */}
      <CaseStudyTabs overview={project.caseStudy!.overview!}>

      <SectionDivider />

      {/* ── OVERVIEW ── */}
      <Section>
        <SideLabel label="Overview">
          <div className="space-y-6">
            <Body>
              StudBud connects to Google Classroom and turns course materials — PDFs, slides, docs, announcements — into study tools: flashcards, quizzes, practice exams, concept maps, study plans, and an AI chat grounded in your actual coursework.
            </Body>
            <Body>
              I designed and built the entire thing solo. Frontend, backend, API integrations, deployment. It picked up 60 users in the first three days through word of mouth — no paid marketing.
            </Body>
            <Body>
              The starting point was simple: Google Classroom organizes assignments and announcements well, but it does nothing to help you study the material itself. Students end up switching between disconnected tools — copying text into ChatGPT, manually making Quizlet decks, re-reading slides — with no tool that actually knows what they&apos;re studying.
            </Body>
          </div>
        </SideLabel>
      </Section>

      {/* ── THE PROBLEM ── */}
      <Section variant="highlighted">
        <SideLabel label="The Problem">
          <div className="space-y-6">
            <Body>
              Students have all their course content in Google Classroom, but no way to interact with it. Studying means manually re-reading materials, building your own flashcards, or hoping someone shared useful notes.
            </Body>
            <Body>
              The tools that exist aren&apos;t connected to your courses. Quizlet doesn&apos;t know your syllabus. ChatGPT doesn&apos;t know what class you&apos;re in. You&apos;re always copying content between tools, and the AI has no context about what you&apos;re actually studying for.
            </Body>
            <Body>
              From an HCI perspective, this is a gulf of execution problem — the gap between what students want to do (study their course material effectively) and what their tools let them do (organize assignments, or chat with a generic AI). The intent and the interface don&apos;t meet.
            </Body>
          </div>
        </SideLabel>
      </Section>

      <Section>
        <Callout>
          Quizlet doesn&apos;t know your syllabus. ChatGPT doesn&apos;t know what class you&apos;re in.
        </Callout>
      </Section>

      {/* Problem diagram */}
      <Section>
        <ImageShowcase
          label="Problem Diagram (Optional)"
          description="Simple diagram: Google Classroom (content sits here) → gap → Student (studies over here with separate, disconnected tools). Or skip if the text carries it."
          aspect="aspect-[16/8]"
        />
      </Section>

      {/* ── WHAT I BUILT ── */}
      <Section variant="highlighted">
        <SideLabel label="What I Built">
          <div className="space-y-6">
            <Body>
              A pipeline that syncs Google Classroom courses, ingests and indexes every attached material, and makes it all queryable through AI.
            </Body>
            <div className="space-y-4">
              <p className="text-white/75 font-urbanist leading-relaxed">
                <span className="text-ink font-medium">The sync layer.</span> Sign in with Google, read-only permissions. Courses, assignments, announcements, and materials are indexed automatically. The system handles PDFs (with OCR fallback for scanned documents), Google Docs, Slides, YouTube transcripts, and external links. No grades — ever. Privacy was a core constraint, not a feature added later.
              </p>
              <p className="text-white/75 font-urbanist leading-relaxed">
                <span className="text-ink font-medium">AI Chat with citations.</span> Ask a question about any course and get an answer drawn from your actual materials — your syllabus, your lecture slides, your assigned readings — with traceable sources. The retrieval uses vector similarity search with a keyword fallback, so it handles both conceptual questions and specific lookups.
              </p>
              <p className="text-white/75 font-urbanist leading-relaxed">
                <span className="text-ink font-medium">Study toolkit.</span> Five tools, each generated from your real course content:
              </p>
              <ul className="space-y-2 ml-4">
                {[
                  'Flashcards — key terms and concepts, with a spaced repetition mechanic',
                  'Multiple-choice quizzes — 5–8 questions with explanations for each answer',
                  'Study plans — day-by-day schedules that factor in your upcoming due dates',
                  'Practice exams — multi-section exams with mixed question types and point values',
                  'Concept maps — interactive node graphs showing how topics relate to each other',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-white/75 font-urbanist">
                    <span className="text-electric/60 mt-1.5 shrink-0">—</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-white/75 font-urbanist leading-relaxed">
                Everything is course-scoped. You can chat within one course or across all of them.
              </p>
            </div>
          </div>
        </SideLabel>
      </Section>

      {/* Product breadth */}
      <Section>
        <ImageShowcase
          src="/images/StudBud SS/Screenshot 2026-02-14 at 8.06.46 AM.png"
          label="Product Breadth"
          description="2–3 screenshots showing the breadth — AI chat with a cited answer, flashcard view mid-flip, and either the quiz or concept map. Side by side or in a light mockup frame."
          aspect="aspect-[16/8]"
        />
      </Section>

      <SectionDivider />

      {/* ── DESIGN DECISIONS ── */}
      {/* Read-only by design */}
      <Section>
        <SideLabel label="Design Decisions">
          <div className="space-y-4">
            <h3 className="text-lg text-ink font-urbanist font-semibold">Read-only by design</h3>
            <p className="text-white/75 font-urbanist leading-relaxed">
              Google Classroom API access is read-only. StudBud never modifies assignments, never posts on behalf of students, never touches grades. This was a deliberate product decision, not a technical limitation — students need to trust that connecting their account won&apos;t break anything.
            </p>
            <p className="text-white/75 font-urbanist leading-relaxed">
              One-click data deletion reinforces this. Revoke access in settings and everything is gone: courses, materials, embeddings, conversations, your account. The backend revokes the OAuth token, cascade-deletes all related data, and destroys the session. No dark patterns — just a clear explanation of what gets removed, and a confirm button.
            </p>
          </div>
        </SideLabel>
      </Section>

      <Section>
        <ImageShowcase
          src="/images/StudBud SS/Screenshot 2026-02-14 at 8.05.18 AM.png"
          label="Trust Design"
          description="The Google sign-in permissions screen or the data deletion flow in settings — the InfoTip that explains exactly what gets deleted."
        />
      </Section>

      {/* Dashboard as home base */}
      <Section>
        <SideLabel label=" ">
          <div className="space-y-4">
            <h3 className="text-lg text-ink font-urbanist font-semibold">Dashboard as home base</h3>
            <p className="text-white/75 font-urbanist leading-relaxed">
              The dashboard answers one question: what do I need to focus on right now?
            </p>
            <p className="text-white/75 font-urbanist leading-relaxed">
              It shows upcoming deadlines (next 5 assignments with relative dates), course cards with item counts and recent activity, and sync status. Most student tools bury you in features or settings. I wanted the first screen to be immediately useful — a time-based greeting, your upcoming work, and quick actions to sync, add files, or change which courses are visible.
            </p>
            <p className="text-white/75 font-urbanist leading-relaxed">
              The information hierarchy is intentional: deadlines first (time-sensitive), then course overviews (browsable), then hidden courses (out of the way). The most actionable content is always visible, and everything else is reachable but not competing for attention.
            </p>
          </div>
        </SideLabel>
      </Section>

      <Section>
        <ImageShowcase
          src="/images/StudBud SS/Screenshot 2026-02-14 at 8.04.21 AM.png"
          label="Dashboard"
          description="Dashboard — courses with material counts, due-soon assignments with relative dates, course cards."
        />
      </Section>

      {/* Citation-first AI */}
      <Section>
        <SideLabel label=" ">
          <div className="space-y-4">
            <h3 className="text-lg text-ink font-urbanist font-semibold">Citation-first AI</h3>
            <p className="text-white/75 font-urbanist leading-relaxed">
              Every AI answer links back to the specific material it came from. This was the hardest design problem — making citations feel useful without making the answer feel academic or cluttered.
            </p>
            <p className="text-white/75 font-urbanist leading-relaxed">
              Answers render cleanly as text. Below each response, a collapsible &quot;Sources&quot; button reveals color-coded chips — terracotta for assignments, sage for announcements, neutral for materials. Each chip shows a source index, truncated title, and type badge. Click to expand and see the full title, course name, and direct links to the material in Classroom and Drive.
            </p>
            <p className="text-white/75 font-urbanist leading-relaxed">
              The key insight: citations need to be available but not intrusive. Students want to verify an answer occasionally, not parse footnotes on every response. Hiding sources by default and revealing them on demand keeps the chat conversational while maintaining transparency.
            </p>
          </div>
        </SideLabel>
      </Section>

      <Section>
        <ImageShowcase
          src="/images/StudBud SS/Screenshot 2026-02-14 at 8.04.44 AM.png"
          label="AI Chat"
          description="AI chat — question, answer, collapsed 'Sources (3)' button, and one expanded source card showing title + course + links."
        />
      </Section>

      {/* Study tools that write themselves */}
      <Section>
        <SideLabel label=" ">
          <div className="space-y-4">
            <h3 className="text-lg text-ink font-urbanist font-semibold">Study tools that write themselves</h3>
            <p className="text-white/75 font-urbanist leading-relaxed">
              The flashcard, quiz, exam, plan, and concept map generators require almost no input. Select a course, optionally enter a topic, pick a tool. That&apos;s it.
            </p>
            <p className="text-white/75 font-urbanist leading-relaxed">
              Students don&apos;t want to configure study tools — they want to start studying. Every extra input field or setting is friction between &quot;I should review for this exam&quot; and actually reviewing. The AI handles the rest using whatever materials have been indexed for that course.
            </p>
            <p className="text-white/75 font-urbanist leading-relaxed">
              During generation, a loading overlay shows rotating contextual messages and a timer, so the wait feels purposeful rather than broken. Recent sessions are saved locally, so you can pick up where you left off.
            </p>
          </div>
        </SideLabel>
      </Section>

      <Section>
        <ImageShowcase
          src="/images/StudBud SS/Screenshot 2026-02-14 at 8.04.31 AM.png"
          label="Study Tools"
          description="Flashcard or quiz view — show the output (a card mid-flip, or a quiz question with options), not the setup screen. The point is that setup is minimal."
        />
      </Section>

      {/* First-sync onboarding */}
      <Section>
        <SideLabel label=" ">
          <div className="space-y-4">
            <h3 className="text-lg text-ink font-urbanist font-semibold">First-sync onboarding</h3>
            <p className="text-white/75 font-urbanist leading-relaxed">
              The first time a user syncs, the system needs to fetch courses, sync materials, and ingest documents — which takes time. Rather than showing a blank loading screen, the sync overlay includes a step-by-step progress bar, the current course being synced, and a 5-slide product tour carousel that auto-advances while the user waits.
            </p>
            <p className="text-white/75 font-urbanist leading-relaxed">
              This turns a potentially frustrating wait into a brief orientation. By the time the sync finishes, the user already understands what the product does.
            </p>
          </div>
        </SideLabel>
      </Section>

      <Section>
        <ImageShowcase
          src="/images/StudBud SS/Screenshot 2026-02-14 at 8.08.21 AM.png"
          label="Onboarding"
          description="The SyncOverlay with progress bar and product tour carousel. Shows onboarding design thinking."
        />
      </Section>

      <SectionDivider />

      {/* ── ENGINEERING ── */}
      <Section>
        <SideLabel label="Engineering">
          <div className="space-y-6">
            <Body>
              Built on Next.js 16 with TypeScript. PostgreSQL with pgvector for vector storage and similarity search.
            </Body>
            <div className="space-y-4">
              <p className="text-white/75 font-urbanist leading-relaxed">
                <span className="text-ink font-medium">Ingestion pipeline.</span> Materials are fetched via the Google Classroom and Drive APIs, processed by type (pdf-parse for PDFs, Google Cloud Vision for scanned documents, youtube-transcript for videos, Cheerio for links), chunked with overlap to preserve context, embedded with OpenAI&apos;s text-embedding-3-small, and stored as vectors in Postgres.
              </p>
              <p className="text-white/75 font-urbanist leading-relaxed">
                <span className="text-ink font-medium">Retrieval.</span> Chat queries use cosine similarity search against the vector store, with a keyword fallback (ILIKE search with stop-word filtering) when vector results are sparse. The top results, along with item metadata like due dates and course names, form the context window for GPT-4.1.
              </p>
              <p className="text-white/75 font-urbanist leading-relaxed">
                <span className="text-ink font-medium">Study tools.</span> All five tools use structured JSON Schema outputs from GPT-4.1, fed by the same retrieval pipeline. The only difference is the prompt and output schema.
              </p>
              <p className="text-white/75 font-urbanist leading-relaxed">
                <span className="text-ink font-medium">Reliability.</span> Per-course sync failures don&apos;t block other courses. Attachments retry up to 3 times with failure reason tracking. A cron job runs every 5 minutes to pick up pending ingestions. Non-retryable failures (unsupported file types, unreachable links) are tracked separately so they don&apos;t clog the retry queue.
              </p>
            </div>
            <Body>
              The whole thing runs as a single Next.js deployment on Vercel. No microservices. I optimized for shipping speed and iteration — get it in front of students, see what they use, improve from there.
            </Body>
          </div>
        </SideLabel>
      </Section>

      {/* Architecture diagram */}
      <Section>
        <ArchitectureDiagram />
      </Section>

      <SectionDivider />

      {/* ── VISUAL DESIGN ── */}
      <Section>
        <SideLabel label="Visual Design">
          <div className="space-y-6">
            <Body>
              The interface uses a warm, editorial aesthetic — intentionally different from the typical SaaS look.
            </Body>
            <div className="space-y-4">
              <p className="text-white/75 font-urbanist leading-relaxed">
                Cream backgrounds (#FAF8F5) with a subtle noise texture, ink-dark text (#1A1814). Earthy accent palette: sage green for primary actions, terracotta for secondary and destructive actions. Instrument Serif for headlines, DM Sans for body text — gives it a slightly editorial feel without being precious about it.
              </p>
              <p className="text-white/75 font-urbanist leading-relaxed">
                Framer Motion for page transitions and micro-interactions (stagger animations on lists, scale on press, hover lifts on cards). Mobile-first: bottom tab bar with safe-area support, touch gestures on flashcards (swipe to navigate), keyboard shortcuts on desktop.
              </p>
              <p className="text-white/75 font-urbanist leading-relaxed">
                The goal was to feel calm. Most productivity tools are visually loud — bright colors, dense layouts, notification badges everywhere. StudBud is a study tool; it should feel like a quiet workspace, not a dashboard.
              </p>
            </div>
          </div>
        </SideLabel>
      </Section>

      {/* Visual design showcase */}
      <Section>
        <VisualDesignShowcase />
      </Section>

      {/* ── OUTCOMES ── */}
      <Section variant="highlighted">
        <motion.p
          variants={fadeUp}
          className="text-xs text-white/50 font-urbanist uppercase tracking-[0.15em] mb-8"
        >
          Outcomes
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <StatCard metric="60" description="users in the first 3 days (organic, word of mouth)" index={0} />
          <StatCard metric="5" description="AI study tools from a single content pipeline" index={1} />
          <StatCard metric="Full ingestion" description="PDFs, Google Docs/Slides, YouTube transcripts, links, scanned docs (OCR)" index={2} />
          <StatCard metric="Privacy-first" description="read-only access, zero grade data, one-click deletion" index={3} />
          <StatCard metric="Solo" description="designed and built end-to-end as a solo project" index={4} />
        </div>

        <div className="space-y-8">
          <ImageShowcase
            label="User Feedback (Optional)"
            description="Real messages, DMs, or reactions from students. These carry more weight than any metric."
            aspect="aspect-[16/8]"
          />
        </div>
      </Section>

      <SectionDivider />

      {/* ── WHAT I LEARNED ── */}
      <Section>
        <SideLabel label="What I Learned">
          <div className="space-y-6">
            <Body>
              The fastest way to validate a product idea is to build it and put it in front of people. StudBud went from idea to 60 users in under a week because the value was immediately clear — students could feel the difference between asking ChatGPT a vague question and asking an AI that actually knows their coursework.
            </Body>
            <Body>
              The other takeaway: privacy isn&apos;t something you bolt on. Making read-only access and one-click deletion part of the product from day one meant I never had to have the &quot;but what about our data&quot; conversation. Students signed up because they trusted it wouldn&apos;t interfere with their Classroom.
            </Body>
            <Body>
              From a design perspective, the most useful lesson was about progressive disclosure in AI interfaces. The temptation is to show everything — all the sources, all the metadata, all the confidence signals. But the right default is clean output with evidence available on demand. Trust is built by making transparency easy to access, not by forcing it into every interaction.
            </Body>
            <Callout>
              The right default is clean output with evidence available on demand.
            </Callout>
          </div>
        </SideLabel>
      </Section>

      {/* ── TOOLS ── */}
      <Section>
        <SideLabel label="Tools">
          <ToolStack tools={['Next.js 16', 'TypeScript', 'Tailwind CSS 4', 'Framer Motion', 'Google Classroom API', 'Google Drive API', 'Google Cloud Vision', 'OpenAI', 'PostgreSQL + pgvector', 'Prisma', 'Vercel']} />
        </SideLabel>
      </Section>

      {/* ── CTA ── */}
      <CaseStudyCTA
        liveSiteUrl="https://www.studbudai.com"
        liveSiteLabel="Visit StudBud"
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

export default StudBudCaseStudy;
