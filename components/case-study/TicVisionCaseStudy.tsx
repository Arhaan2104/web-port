'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { fadeUp } from '@/lib/motion';
import type { Project } from '@/lib/projects';
import { getNextProject, getPrevProject } from '@/lib/projects';
import CaseStudyTabs from './CaseStudyTabs';
import CaseStudyResources from './CaseStudyResources';
import ClinicianPortalShowcase from '@/components/case-study/ticvision/ClinicianPortalShowcase';
import MobileScreenGallery from '@/components/case-study/ticvision/MobileScreenGallery';
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

interface TicVisionCaseStudyProps {
  project: Project;
}

const TicVisionCaseStudy: React.FC<TicVisionCaseStudyProps> = ({ project }) => {
  const nextProject = getNextProject('ticvision');
  const prevProject = getPrevProject('ticvision');
  const resources = project.caseStudy?.resources ?? [];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <ScrollProgressBar />
      <BackNav />

      {/* ── HERO ── */}
      <CaseStudyHero
        tag="Healthcare"
        title="TicVision"
        titleClassName="bg-gradient-to-r from-[#66A3FF] to-[#A9CCFF] bg-clip-text text-transparent"
        subtitle="Data-driven care for Tourette syndrome"
        meta={[
          { label: 'Role', value: 'Product Designer' },
          { label: 'Team', value: '3' },
          { label: 'Timeline', value: 'Jan 2025 — Present' },
          { label: 'Platform', value: 'Mobile + Web' },
        ]}
        readingTime={7}
      />

      {/* ── HERO IMAGE ── */}
      <motion.section
        className="px-6 md:px-12 lg:px-24 mb-20 md:mb-32"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="max-w-6xl mx-auto">
          <MobileScreenGallery
            screens={[{ src: '/images/TicVision SS/IMG_3744.PNG', label: 'Mobile App' }]}
            desktopScreen={{ src: '/images/TicVision SS/clinician-portal.png', label: 'Clinician Portal' }}
            size="hero"
          />
        </div>
      </motion.section>

      {/* ── TABS ── */}
      <CaseStudyTabs overview={project.caseStudy!.overview!} resources={resources}>

      <SectionDivider />

      {/* ── OVERVIEW ── */}
      <Section>
        <SideLabel label="Overview">
          <div className="space-y-6">
            <Body>
              Tourette&apos;s affects an estimated 4 million people in the U.S. and Europe, and many more worldwide, yet most still lack access to continuous, personalized care.
            </Body>
            <Body>
              TicVision is a mobile and web-based platform that helps individuals with Tourette&apos;s track their tics and gives clinicians structured insights into patient symptoms. Patients log tic intensity, triggers, and moods in the app while clinicians access this data through a secure portal to tailor treatment.
            </Body>
            <Body>
              TicVision also acts as a self-monitoring tool for people without a doctor or therapist. I led design end-to-end and worked with two engineers to ship the product, reach 400+ downloads, and pilot the clinician portal with 13 doctors across the U.S.
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

      {/* App screens */}
      <Section>
        <ImageShowcase
          src="/images/TicVision SS/Screenshot 2026-02-14 at 8.16.07 AM.png"
          label="Full Design System"
          description="Complete Figma file showing all screens — onboarding, tic tracking, analytics, settings, and clinician portal."
          aspect="aspect-square"
        />
      </Section>

      {/* ── THE PROBLEM ── */}
      <Section variant="highlighted">
        <SideLabel label="The Problem">
          <div className="space-y-6">
            <Body>
              Tourette&apos;s affects an estimated 4 million people in the U.S. and Europe, and many more worldwide. Even with that scale, continuous and personalized care is still hard to access for many patients.
            </Body>
            <Body>
              People often rely on memory during appointments, and clinicians told us they lacked structured longitudinal symptom data between visits.
            </Body>
            <Body>
              Existing trackers also miss the exact data needed for care: tic intensity, triggers, moods, and patterns over time that can support treatment decisions.
            </Body>
          </div>
        </SideLabel>
      </Section>

      <Section>
        <Callout>
          &ldquo;Existing health trackers aren&apos;t built for this. They don&apos;t capture the specific combination of data that matters.&rdquo;
        </Callout>
      </Section>

      {/* ── MY ROLE ── */}
      <Section>
        <SideLabel label="My Role">
          <Body>
            I was the product designer on a team of three. I owned research, UX, UI, and prototyping, and worked closely with our engineers on implementation. I also helped build parts of the app in React Native.
          </Body>
        </SideLabel>
      </Section>

      {/* ── RESEARCH ── */}
      <Section>
        <SideLabel label="Research">
          <div className="space-y-6">
            <Body>
              I did secondary research into tic disorders, existing tracking methods, and clinical workflows around tic management. I conducted interviews with people who have tic disorders, parents, and caregivers to understand how they currently track and what they wish existed.
            </Body>
            <Body>
              As the product grew, we piloted the clinician portal with 13 doctors and had dozens more conversations. Those conversations shaped the product significantly — and ultimately changed our direction entirely.
            </Body>
          </div>
        </SideLabel>
      </Section>

      <SectionDivider />

      {/* ── DESIGN ── */}
      {/* Tic Logging */}
      <Section>
        <SideLabel label="Design">
          <div className="space-y-4">
            <h3 className="text-lg text-ink font-urbanist font-semibold">Tic logging in under 30 seconds</h3>
            <p className="text-white/75 font-urbanist leading-relaxed">
              The core action in the app is logging a tic. Each entry captures up to six data points: tic type, date, time of day, severity, mood, and triggers. That&apos;s a lot of information, so the design challenge was making it fast enough that people would actually do it consistently.
            </p>
            <p className="text-white/75 font-urbanist leading-relaxed">
              I used progressive disclosure — required fields (tic type, date, severity) come first, and optional context (mood, triggers, notes) is available but not in the way. The time of day auto-detects based on when you&apos;re logging.
            </p>
          </div>
        </SideLabel>
      </Section>

      {/* Tic Selection Grid */}
      <Section>
        <SideLabel label=" ">
          <div className="space-y-4">
            <h3 className="text-lg text-ink font-urbanist font-semibold">Tic selection grid</h3>
            <p className="text-white/75 font-urbanist leading-relaxed">
              There are 19 default tic types (15 motor, 4 vocal), plus the ability to create custom ones. I organized these as a tappable grid rather than a scrollable list. You see everything at once, tap, and move on. Custom tics persist across sessions so the app adapts to each person over time.
            </p>
          </div>
        </SideLabel>
      </Section>

      <Section>
        <MobileScreenGallery
          screens={[
            { src: '/images/TicVision SS/screenshot-2.png', label: 'Tic Tracking Form' },
            { src: '/images/TicVision SS/screenshot-3.png', label: 'Tic Selection Grid' },
          ]}
        />
      </Section>

      {/* Mood Wheel */}
      <Section>
        <SideLabel label=" ">
          <div className="space-y-4">
            <h3 className="text-lg text-ink font-urbanist font-semibold">The mood wheel</h3>
            <p className="text-white/75 font-urbanist leading-relaxed">
              Instead of a dropdown or a list for mood selection, I designed a circular mood wheel that you rotate to select from nine options. A dropdown felt too clinical. A grid of emoji-style options felt too casual for a health context. The wheel sits in between — it&apos;s interactive enough to feel intentional, but simple enough to use quickly.
            </p>
          </div>
        </SideLabel>
      </Section>

      {/* Severity Slider */}
      <Section>
        <SideLabel label=" ">
          <div className="space-y-4">
            <h3 className="text-lg text-ink font-urbanist font-semibold">Severity slider</h3>
            <p className="text-white/75 font-urbanist leading-relaxed">
              Severity is rated 0–10 on a gradient slider that shifts from green to yellow to red. The color does most of the communication — you don&apos;t need to think about what &quot;7 out of 10&quot; means when the visual is already telling you. This was a deliberate choice to reduce the cognitive load of quantifying something that&apos;s hard to put a number on.
            </p>
          </div>
        </SideLabel>
      </Section>

      <Section>
        <MobileScreenGallery
          screens={[
            { src: '/images/TicVision SS/screenshot-4.png', label: 'Mood Wheel' },
            { src: '/images/TicVision SS/screenshot-2.png', label: 'Severity Slider' },
          ]}
        />
      </Section>

      {/* Data & Analytics */}
      <Section>
        <SideLabel label=" ">
          <div className="space-y-4">
            <h3 className="text-lg text-ink font-urbanist font-semibold">Data & analytics</h3>
            <p className="text-white/75 font-urbanist leading-relaxed">
              The analytics screen breaks down tic data across four dimensions: time of day, mood, triggers, and tic frequency. Each uses the chart type that fits — pie charts for proportional breakdowns, bar charts for frequency comparisons, and a line chart on the home screen for weekly trends.
            </p>
            <p className="text-white/75 font-urbanist leading-relaxed">
              The goal was to help people notice things they wouldn&apos;t notice on their own. &quot;I tic more in the evenings.&quot; &quot;Stress is my most common trigger.&quot; These are the kinds of insights that are hard to see in the moment but become obvious in the data.
            </p>
          </div>
        </SideLabel>
      </Section>

      {/* Onboarding */}
      <Section>
        <SideLabel label=" ">
          <div className="space-y-4">
            <h3 className="text-lg text-ink font-urbanist font-semibold">Onboarding</h3>
            <p className="text-white/75 font-urbanist leading-relaxed">
              The onboarding is 8 steps, which sounds like a lot. But each step personalizes the app — selecting your most common moods, your known triggers, your notification preferences, and optionally connecting with a doctor. I sequenced it so each screen feels like the app is learning about you rather than just collecting data. Everything can be updated from settings later.
            </p>
          </div>
        </SideLabel>
      </Section>

      <Section>
        <MobileScreenGallery
          screens={[
            { src: '/images/TicVision SS/screenshot-5.png', label: 'Analytics' },
            { src: '/images/TicVision SS/screenshot-6.png', label: 'Onboarding' },
          ]}
        />
      </Section>

      {/* Offline-First */}
      <Section>
        <SideLabel label=" ">
          <div className="space-y-4">
            <h3 className="text-lg text-ink font-urbanist font-semibold">Offline-first</h3>
            <p className="text-white/75 font-urbanist leading-relaxed">
              Tics don&apos;t wait for WiFi. The app works fully offline — tics save locally and sync in the background when a connection is available. If sync fails, it retries with increasing intervals. After repeated failures, users can see what failed and retry manually. This was important because logging needed to feel instant and reliable, regardless of where you are.
            </p>
          </div>
        </SideLabel>
      </Section>

      <SectionDivider />

      {/* ── CLINICIAN PORTAL ── */}
      <Section>
        <SideLabel label="Clinician Portal">
          <div className="space-y-6">
            <Body>
              Alongside the patient app, we built a secure companion web portal where clinicians can view their patients&apos; tic data. Patients connect with their doctor through a 6-digit code in the app, and once linked, the clinician gets access to structured symptom logs.
            </Body>
            <Body>
              We designed this around the reality that most people see their neurologist once every few months — the portal gives the doctor context before the appointment even starts.
            </Body>
            <Body>
              We piloted this with 13 clinicians across the U.S. and had conversations with 60+ more.
            </Body>
            <a
              href="https://demo.ticvision.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-electric hover:gap-3 transition-all duration-200 font-urbanist font-medium"
            >
              View demo.ticvision.io
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </SideLabel>
      </Section>

      <Section>
        <ClinicianPortalShowcase />
      </Section>

      <SectionDivider />

      {/* ── OUTCOMES ── */}
      <Section variant="highlighted">
        <motion.p
          variants={fadeUp}
          className="eyebrow mb-8 bg-gradient-to-r from-[#66A3FF] to-[#A9CCFF] bg-clip-text text-transparent"
        >
          Outcomes
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <StatCard metric="400+" description="downloads on the U.S. App Store" index={0} />
          <StatCard metric="13" description="U.S. clinicians piloted the portal" index={1} />
          <StatCard metric="60+" description="clinician conversations about tic disorder workflows" index={2} />
          <StatCard metric="TicCon 2025" description="Presented at the conference" index={3} />
        </div>

        <div className="space-y-8">
          <ImageShowcase
            src="/images/TicVision SS/Screenshot 2026-02-14 at 8.27.11 AM.png"
            label="User Feedback"
            description="Real voices from TicVision users — messages, testimonials, and impact stories."
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
              Working on TicVision taught me a lot about designing for a medical context — the weight of getting things right when someone is trusting you with their health data, and how much you learn from putting something real in front of people.
            </Body>
            <Body>
              The biggest lesson came from the clinician side. We built TicVision as a patient-facing tool, but through piloting the doctor portal and speaking with 60+ clinicians, a pattern kept coming up: the problem wasn&apos;t that patients lacked a tracking tool — it was that clinical workflows for managing tic disorders were fragmented and manual. Doctors were excited about receiving patient data, but what they really needed was a better system on their end.
            </Body>
            <Body>
              That feedback led us to pivot to CoralEHR, where we&apos;re taking everything we learned from TicVision — the patient data model, the clinician relationships, the understanding of the space — and building for the provider workflow directly.
            </Body>
            <Callout>
              I don&apos;t think of the pivot as TicVision failing. It worked — it just showed us where the bigger problem was.
            </Callout>
            <Link
              href="/work/coralehr"
              className="inline-flex items-center gap-2 text-electric hover:gap-3 transition-all duration-200 font-urbanist font-medium"
            >
              This work continues at CoralEHR
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </SideLabel>
      </Section>

      {/* ── TOOLS ── */}
      <Section>
        <SideLabel label="Tools">
          <ToolStack tools={['Figma', 'React Native', 'Expo', 'Redux', 'Victory Native', 'SQLite']} />
        </SideLabel>
      </Section>

      {/* ── CTA ── */}
      <CaseStudyCTA
        liveSiteUrl="https://www.ticvision.io"
        liveSiteLabel="Visit TicVision"
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

export default TicVisionCaseStudy;
