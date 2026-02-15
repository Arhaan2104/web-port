import { notFound } from 'next/navigation';
import { getProjectById, projects } from '@/lib/projects';
import CaseStudyLayout from '@/components/case-study/CaseStudyLayout';
import CoralEHRCaseStudy from '@/components/case-study/CoralEHRCaseStudy';
import TicVisionCaseStudy from '@/components/case-study/TicVisionCaseStudy';
import StudBudCaseStudy from '@/components/case-study/StudBudCaseStudy';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects
    .filter((p) => p.caseStudy)
    .map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectById(slug);
  if (!project || !project.caseStudy) return {};

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectById(slug);

  if (!project || !project.caseStudy) {
    notFound();
  }

  let content;
  if (slug === 'coralehr') {
    content = <CoralEHRCaseStudy project={project} />;
  } else if (slug === 'ticvision') {
    content = <TicVisionCaseStudy project={project} />;
  } else if (slug === 'studbud') {
    content = <StudBudCaseStudy project={project} />;
  } else {
    content = <CaseStudyLayout project={project} />;
  }

  return (
    <div className="relative z-[2]">
      {/* Solid background column behind reading area — masks the grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="mx-auto h-full w-full max-w-6xl bg-obsidian-base"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)',
          }}
        />
      </div>
      <div className="relative">{content}</div>
    </div>
  );
}
