'use client';

import Link from 'next/link';

interface BreadcrumbsProps {
  projectTitle: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ projectTitle }) => (
  <nav
    aria-label="Breadcrumb"
    className="px-6 md:px-12 lg:px-24 pt-24 pb-4"
  >
    <div className="max-w-5xl mx-auto">
      <ol className="flex items-center gap-2 text-sm font-urbanist">
        <li>
          <Link
            href="/work"
            className="text-white/50 hover:text-white/80 transition-colors duration-200"
          >
            Work
          </Link>
        </li>
        <li className="text-white/30">/</li>
        <li className="text-white/70">{projectTitle}</li>
      </ol>
    </div>
  </nav>
);

export default Breadcrumbs;
