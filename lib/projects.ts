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
}

export const projects: Project[] = [
  {
    id: 'ticvision',
    title: 'TicVision',
    tag: 'Healthcare',
    description:
      'Supportive tracking for tics used by 15 clinicians and 300+ downloads.',
    image: '/images/placeholder.svg',
    href: '/work/ticvision',
    featured: true,
    year: '2024',
    role: 'Product Design Lead',
    technologies: ['React Native', 'TypeScript', 'Firebase', 'TensorFlow'],
    highlights: [
      '300+ active users across iOS and Android',
      'Used by 15 clinicians in treatment programs',
      '4.8/5 average rating on app stores',
      'Reduced tic tracking time by 70%',
    ],
  },
  {
    id: 'coralehr',
    title: 'CoralEHR',
    tag: 'Healthcare AI',
    description:
      'Lightweight, AI-native clinician workflow with calm, usable UX.',
    image: '/images/placeholder.svg',
    href: '/work/coralehr',
    featured: true,
    year: '2024',
    role: 'Product Designer',
    technologies: ['Next.js', 'TypeScript', 'OpenAI', 'PostgreSQL'],
    highlights: [
      'Reduced documentation time by 40%',
      'AI-powered clinical note generation',
      'HIPAA-compliant architecture',
      'Intuitive workflow for 100+ clinicians',
    ],
  },
  {
    id: 'leanspark',
    title: 'LeanSpark',
    tag: 'EdTech',
    description:
      'A crisp reading app/site for the LeanSpark book with interactive visuals.',
    image: '/images/placeholder.svg',
    href: '/work/leanspark',
    featured: true,
    year: '2023',
    role: 'Full Stack Designer',
    technologies: ['React', 'D3.js', 'Node.js', 'MongoDB'],
    highlights: [
      '10,000+ readers worldwide',
      'Interactive data visualizations',
      'Responsive reading experience',
      '95% completion rate for readers',
    ],
  },
  // Additional non-featured projects
  {
    id: 'mindscape',
    title: 'MindScape',
    tag: 'Mental Health',
    description:
      'A meditation and mindfulness platform designed for accessibility.',
    image: '/images/placeholder.svg',
    href: '/work/mindscape',
    featured: false,
    year: '2023',
    role: 'UX Designer',
    technologies: ['React', 'Web Audio API', 'Node.js'],
    highlights: [
      'Accessible design for visual impairments',
      'Custom audio experiences',
      '5,000+ daily active users',
    ],
  },
  {
    id: 'dataflow',
    title: 'DataFlow',
    tag: 'Analytics',
    description:
      'Real-time data visualization dashboard for enterprise analytics.',
    image: '/images/placeholder.svg',
    href: '/work/dataflow',
    featured: false,
    year: '2022',
    role: 'Product Designer',
    technologies: ['Vue.js', 'D3.js', 'WebSockets'],
    highlights: [
      'Processing 1M+ data points/second',
      'Custom visualization library',
      'Used by Fortune 500 companies',
    ],
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