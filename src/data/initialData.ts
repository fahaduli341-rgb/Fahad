import { Project, SkillCategory, Recommendation } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'PulseTask - Realtime Cloud Task Hub',
    description: 'Collaborative task management platform with instant Firestore sync, role-based project boards, and status tracking.',
    category: 'Firebase Apps',
    tags: ['React', 'TypeScript', 'Firestore', 'Tailwind CSS', 'Vercel'],
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=900&q=80',
    liveUrl: 'https://example.com/pulsetask',
    githubUrl: 'https://github.com/fahad-dev/pulsetask',
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'Aura Commerce - Dynamic Web Storefront',
    description: 'High-performance e-commerce catalog featuring real-time cart persistence, responsive product filtering, and payment ready UI.',
    category: 'Full Stack',
    tags: ['React 19', 'Tailwind CSS', 'Express', 'Firebase', 'Vercel'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    liveUrl: 'https://example.com/auracommerce',
    githubUrl: 'https://github.com/fahad-dev/auracommerce',
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'DevSync - Live Code & Snippet Vault',
    description: 'Developer utility for saving and organizing code snippets with syntax highlighting, search, and cloud backup.',
    category: 'Web Tools',
    tags: ['TypeScript', 'Firestore DB', 'Tailwind CSS', 'Vite'],
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
    liveUrl: 'https://example.com/devsync',
    githubUrl: 'https://github.com/fahad-dev/devsync',
    featured: false,
  },
  {
    id: 'proj-4',
    title: 'NextGen SaaS Marketing Experience',
    description: 'Ultra-fast responsive landing page optimized for conversion, featuring interactive pricing calculators and dark mode.',
    category: 'Frontend',
    tags: ['React', 'Tailwind CSS', 'Motion', 'Vercel'],
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80',
    liveUrl: 'https://example.com/saas-landing',
    githubUrl: 'https://github.com/fahad-dev/saas-landing',
    featured: false,
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Development',
    description: 'Building responsive, pixel-perfect, and accessible user interfaces.',
    skills: [
      { name: 'React 19', level: 'Core Stack', icon: 'Code', highlight: true },
      { name: 'TypeScript', level: 'Primary', icon: 'FileCode2', highlight: true },
      { name: 'Tailwind CSS', level: 'Core Stack', icon: 'Palette', highlight: true },
      { name: 'JavaScript (ESNext)', level: 'Advanced', icon: 'Braces' },
      { name: 'HTML5 & Responsive UI', level: 'Expert', icon: 'Layout' },
      { name: 'Vite / Build Tools', level: 'Proficient', icon: 'Zap' },
    ],
  },
  {
    title: 'Backend & Cloud Database',
    description: 'Connecting web frontends to scalable cloud databases and APIs.',
    skills: [
      { name: 'Firebase Firestore', level: 'Core DB', icon: 'Database', highlight: true },
      { name: 'Firebase Auth & Rules', level: 'Security', icon: 'ShieldCheck', highlight: true },
      { name: 'Node.js & Express', level: 'Backend', icon: 'Server' },
      { name: 'REST APIs & CRUD', level: 'Integration', icon: 'Network' },
      { name: 'Real-time Listeners', level: 'Live Sync', icon: 'Activity' },
    ],
  },
  {
    title: 'Deployment & DevOps Workflow',
    description: 'Taking web applications from code to live custom & free domains.',
    skills: [
      { name: 'Vercel Production Deploy', level: 'Live Edge', icon: 'Globe', highlight: true },
      { name: 'Git & GitHub Versioning', level: 'Workflow', icon: 'GitBranch', highlight: true },
      { name: 'Custom Domain Setup', level: 'DNS / SSL', icon: 'Link' },
      { name: 'Performance Optimization', level: 'Core Web Vitals', icon: 'Gauge' },
    ],
  },
];

export const INITIAL_RECOMMENDATIONS: Recommendation[] = [];

