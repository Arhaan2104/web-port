export interface CaseStudyOverview {
  headline: string;
  problem: string;
  solution: string;
  outcomes: string[];
  tools: string[];
  role: string;
  timeline: string;
  liveSiteUrl?: string;
}

export interface CaseStudy {
  problem: string;
  solution: string;
  gallery: string[];
  results: string[];
  liveSiteUrl: string;
  overview?: CaseStudyOverview;
}

export interface Project {
  id: string;
  title: string;
  tag: string;
  description: string;
  image: string;
  href: string;
  featured?: boolean;
  year?: string;
  role?: string;
  technologies?: string[];
  highlights?: string[];
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  {
    id: 'ticvision',
    title: 'TicVision',
    tag: 'Healthcare',
    description:
      'Data-Driven Care for Tourette Syndrome. 400+ downloads, piloted with 13 clinicians.',
    image: '/images/TicVision Project Image.png',
    href: '/work/ticvision',
    featured: true,
    year: '2025',
    role: 'Product Designer',
    technologies: ['Figma', 'React Native', 'Expo', 'Redux', 'SQLite'],
    highlights: [
      '400+ downloads on the U.S. App Store',
      'Clinician portal piloted with 13 U.S. clinicians',
      '60+ clinician conversations',
      'Presented at TicCon 2025',
    ],
    caseStudy: {
      problem:
        'People with tic disorders don\'t have a good way to track what\'s happening over time. Most rely on memory at doctor visits, and clinicians want longitudinal data but have no practical tool to collect it between appointments.',
      solution:
        'Designed a mobile app that lets people log tics in under 30 seconds — capturing type, severity, mood, and triggers. A companion clinician portal gives doctors context before appointments even start. We piloted it with 13 clinicians across the U.S.',
      gallery: [
        '/images/TicVision Project Image.png',
      ],
      results: [
        '400+ downloads on the U.S. App Store',
        'Clinician portal piloted with 13 U.S. clinicians',
        '60+ clinician conversations',
        'Presented at TicCon 2025',
      ],
      liveSiteUrl: 'https://www.ticvision.io',
      overview: {
        headline: 'Mobile tic disorder tracking app — 400+ downloads, piloted with 13 clinicians',
        problem: 'People with tic disorders rely on memory at doctor visits. Clinicians want longitudinal data but have no practical tool for collecting it between appointments.',
        solution: 'A mobile app that lets people log tics in under 30 seconds — capturing type, severity, mood, and triggers. A companion clinician portal gives doctors context before appointments even start.',
        outcomes: [
          '400+ downloads on the U.S. App Store',
          'Clinician portal piloted with 13 U.S. clinicians',
          '60+ clinician conversations',
          'Presented at TicCon 2025',
        ],
        tools: ['Figma', 'React Native', 'Expo', 'Redux', 'Victory Native', 'SQLite'],
        role: 'Product Designer',
        timeline: 'Jan 2025 — Present',
        liveSiteUrl: 'https://www.ticvision.io',
      },
    },
  },
  {
    id: 'coralehr',
    title: 'CoralEHR',
    tag: 'Healthcare AI',
    description:
      'AI-native EHR for behavioral health — scratchpad-to-note pipeline, patient management, and treatment planning. Built at USC x Techstars.',
    image: '/images/Coral Project Image.png',
    href: '/work/coralehr',
    featured: true,
    year: '2024',
    role: 'Co-founder — Product Design & Engineering',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Claude API', 'AWS'],
    highlights: [
      'Working product with 2 active design partners',
      'AI-powered clinical note generation via Claude API',
      'USC x Techstars Founder Catalyst program',
      'HIPAA-compliant architecture on AWS',
    ],
    caseStudy: {
      problem:
        'Clinicians spend a disproportionate amount of time on documentation. Most EHR software treats note-taking as form-filling — structured templates that don\'t match how clinicians actually think during a session.',
      solution:
        'Built a scratchpad-to-note pipeline. Clinicians jot fragments during sessions, then an AI draft structures them into a proper clinical note. They review and edit before saving — the AI assists, it doesn\'t replace. The rest is a full patient management platform: charts, treatment plans, billing, and messaging.',
      gallery: [
        '/images/Coral Project Image.png',
      ],
      results: [
        'Working product with 2 active design partners',
        'AI-powered note generation via Claude API',
        'USC x Techstars Founder Catalyst program',
        'HIPAA-compliant architecture on AWS',
      ],
      liveSiteUrl: 'https://www.coralehr.com',
      overview: {
        headline: 'AI-native EHR for behavioral health clinicians',
        problem: 'Clinicians spend disproportionate time on documentation. EHRs treat note-taking as form-filling that doesn\'t match how clinicians think during sessions.',
        solution: 'A scratchpad-to-note pipeline where clinicians jot fragments during sessions, then AI structures them into clinical notes. Plus full patient management: charts, treatment plans, billing, messaging.',
        outcomes: [
          'Working product with 2 active design partners',
          'AI-powered note generation via Claude API',
          'USC x Techstars Founder Catalyst program',
          'HIPAA-compliant architecture on AWS',
        ],
        tools: ['React', 'TypeScript', 'Tailwind CSS', 'Claude API', 'AWS'],
        role: 'Co-founder — Product Design & Engineering',
        timeline: 'Active — 2 design partners',
        liveSiteUrl: 'https://www.coralehr.com',
      },
    },
  },
  {
    id: 'studbud',
    title: 'StudBud',
    tag: 'EdTech AI',
    description:
      'AI study assistant that syncs with Google Classroom — chat with course content, generate flashcards and quizzes. 60 users in first 3 days.',
    image: '/images/studbud Project Image..png',
    href: '/work/studbud',
    featured: true,
    year: '2025',
    role: 'Designer & Developer (Solo)',
    technologies: ['Next.js', 'TypeScript', 'Google Classroom API', 'OpenAI', 'PostgreSQL + pgvector'],
    highlights: [
      '60 users in first 3 days (organic)',
      '5 AI study tools from one content pipeline',
      'Full document ingestion with OCR fallback',
      'Privacy-first: read-only access, one-click deletion',
    ],
    caseStudy: {
      problem:
        'Students have all their course content in Google Classroom, but no way to interact with it for studying. The tools that exist — Quizlet, ChatGPT — aren\'t connected to their courses.',
      solution:
        'Built a pipeline that syncs Google Classroom, ingests every material, and makes it queryable through AI. Generates flashcards, quizzes, practice exams, concept maps, and study plans — all grounded in actual coursework.',
      gallery: ['/images/studbud Project Image..png'],
      results: [
        '60 users in first 3 days (organic)',
        '5 AI study tools from one content pipeline',
        'Full document ingestion with OCR fallback',
        'Privacy-first: read-only access, one-click deletion',
        'Designed and built end-to-end as a solo project',
      ],
      liveSiteUrl: 'https://www.studbudai.com',
      overview: {
        headline: 'AI study assistant synced with Google Classroom — 60 users in first 3 days',
        problem: "Students have course content in Google Classroom but no way to interact with it for studying. Existing tools aren't connected to their courses.",
        solution: 'Built a pipeline that syncs Google Classroom, ingests every material, and makes it queryable through AI. Generates flashcards, quizzes, practice exams, concept maps, and study plans.',
        outcomes: [
          '60 users in first 3 days (organic)',
          '5 AI study tools from one content pipeline',
          'Full document ingestion with OCR fallback',
          'Privacy-first: read-only access, one-click deletion',
          'Designed and built end-to-end as a solo project',
        ],
        tools: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Google Classroom API', 'OpenAI', 'PostgreSQL + pgvector', 'Prisma', 'Vercel'],
        role: 'Designer & Developer (Solo)',
        timeline: '2025',
        liveSiteUrl: 'https://www.studbudai.com',
      },
    },
  },
  // Additional non-featured projects
  {
    id: 'leanspark',
    title: 'LeanSpark',
    tag: 'Startup Tools',
    description:
      'Lean startup validation toolkit — helps founders test ideas faster with structured experiments.',
    image: '/images/leasnparkimg.png',
    href: 'https://www.leansparkbook.com',
    featured: false,
    year: '2024',
    role: 'Product Designer',
    technologies: ['Figma', 'React', 'TypeScript'],
    highlights: [],
  },
  {
    id: 'flowatlas',
    title: 'FlowAtlas',
    tag: 'Productivity',
    description:
      'Visual workflow mapping tool for teams — turn messy processes into clear, shareable flows.',
    image: '/images/flowatlasimg.png',
    href: 'https://www.flowatlasai.com',
    featured: false,
    year: '2024',
    role: 'Product Designer',
    technologies: ['Figma', 'Next.js', 'TypeScript'],
    highlights: [],
  },
];

// Helper function to get featured projects
export const getFeaturedProjects = () => {
  return projects.filter((project) => project.featured);
};

// Helper function to get project by ID
export const getProjectById = (id: string) => {
  return projects.find((project) => project.id === id);
};

// Helper function to get projects by tag
export const getProjectsByTag = (tag: string) => {
  return projects.filter((project) =>
    project.tag.toLowerCase().includes(tag.toLowerCase())
  );
};

// Helper function to get the next featured project (for CTA navigation)
export const getNextProject = (currentId: string) => {
  const featured = projects.filter((p) => p.featured);
  const currentIndex = featured.findIndex((p) => p.id === currentId);
  if (currentIndex === -1) return undefined;
  return featured[(currentIndex + 1) % featured.length];
};

// Helper function to get the previous featured project (for keyboard navigation)
export const getPrevProject = (currentId: string) => {
  const featured = projects.filter((p) => p.featured);
  const currentIndex = featured.findIndex((p) => p.id === currentId);
  if (currentIndex === -1) return undefined;
  return featured[(currentIndex - 1 + featured.length) % featured.length];
};