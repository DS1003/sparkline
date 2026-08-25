import { ServiceItem } from '@/types'

export const servicesData: ServiceItem[] = [
  {
    slug: 'digital-solutions',
    number: '01',
    title: 'Digital Solutions',
    tagline: 'High-performance engineering for modern scale.',
    summary: 'Custom development of scalable, secure, and performant web and mobile applications tailored to business requirements.',
    description: 'We engineer digital products from ground-up architecture to cloud deployment. Our solutions combine clean code, high performance, and robust security to guarantee seamless user experiences.',
    capabilities: [
      'Custom Web Applications',
      'Mobile Apps (iOS & Android)',
      'Enterprise E-commerce Platforms',
      'API & Microservices Architecture',
      'Cloud Infrastructure & DevOps',
      'Performance Optimization & Audit',
    ],
    process: [
      { step: '01', title: 'Technical Discovery', description: 'Deep analysis of requirements, system architecture, scalability needs, and tech stack evaluation.' },
      { step: '02', title: 'Architecture & Prototyping', description: 'Database schema design, API contract definition, and interactive technical proof-of-concepts.' },
      { step: '03', title: 'Agile Engineering', description: 'Iterative sprint development with continuous integration, automated testing, and code reviews.' },
      { step: '04', title: 'Deployment & Scaling', description: 'Edge deployment, zero-downtime releases, server monitoring, and ongoing optimization.' },
    ],
    technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'AWS & Vercel'],
    deliverables: ['Production Source Code', 'Automated CI/CD Pipeline', 'Technical Documentation', 'API Documentation', '99.9% Uptime Guarantee'],
    relatedProjects: ['ndakaru-commerce', 'jamm-collaboration'],
  },
  {
    slug: 'ui-ux-design',
    number: '02',
    title: 'UI/UX & Product Design',
    tagline: 'Intuitive, memorable, and conversion-focused experiences.',
    summary: 'Research-driven user experience and interface design that elevates digital products and delights customers.',
    description: 'Great design is more than aesthetics—it is a strategic business multiplier. We translate complex workflows into clear, beautiful, and intuitive interfaces that reduce churn and boost engagement.',
    capabilities: [
      'UX Research & User Testing',
      'Information Architecture & Wireframing',
      'High-Fidelity Interactive Prototypes',
      'Design Systems & UI Kits',
      'Mobile-First Responsive Layouts',
      'Micro-Interactions & Motion Design',
    ],
    process: [
      { step: '01', title: 'User Research', description: 'Interviews, personas, journey mapping, and competitive benchmarking.' },
      { step: '02', title: 'Wireframes & Flows', description: 'Low-fidelity layout exploration to validate hierarchy and user paths.' },
      { step: '03', title: 'UI Craft & Design System', description: 'Pixel-perfect interfaces, typography scale, color tokens, and reusable components.' },
      { step: '04', title: 'Interactive Prototype', description: 'High-fidelity motion and interaction prototypes for user validation and developer handoff.' },
    ],
    technologies: ['Figma', 'Framer', 'Design Tokens', 'Storybook', 'Framer Motion', 'Lottie'],
    deliverables: ['Complete Figma Design System', 'Clickable Prototype', 'Component Library Tokens', 'User Research Report'],
    relatedProjects: ['teranga-dashboard', 'baobab-fintech'],
  },
  {
    slug: 'branding-communication',
    number: '03',
    title: 'Brand & Communication',
    tagline: 'Distinctive identities that command attention.',
    summary: 'Building powerful visual identities and cohesive communication systems that resonate with your audience.',
    description: 'We define the voice, vision, and visual universe of brands. From logo design and typography systems to digital campaigns, we ensure your brand stands out in competitive landscapes.',
    capabilities: [
      'Brand Identity & Guidelines',
      'Logo & Visual Systems',
      'Digital Communication Strategy',
      'Social Media Art Direction',
      'Branded Editorial Assets',
      'Marketing & Launch Campaigns',
    ],
    process: [
      { step: '01', title: 'Brand Discovery', description: 'Core values, brand positioning, audience definition, and moodboarding.' },
      { step: '02', title: 'Visual Concepting', description: 'Exploration of logos, typography combinations, color palettes, and art direction.' },
      { step: '03', title: 'Brand System Guide', description: 'Comprehensive design guidelines specifying usage across digital and print media.' },
      { step: '04', title: 'Brand Rollout', description: 'Creation of marketing collateral, social templates, and launch strategy.' },
    ],
    technologies: ['Adobe Illustrator', 'Photoshop', 'Figma', 'After Effects', 'Brand Guidelines Generator'],
    deliverables: ['Master Logo Suite (SVG/PNG/Vector)', 'Comprehensive Brand Book', 'Social Media Kit', 'Typography & Palette System'],
    relatedProjects: ['baobab-fintech'],
  },
  {
    slug: 'audiovisual',
    number: '04',
    title: 'Audiovisual & Voice',
    tagline: 'Compelling stories rendered with cinematic precision.',
    summary: 'Producing high-impact video, motion graphics, and voice-over content that captivates audiences.',
    description: 'Motion and sound create emotional connections. We produce dynamic video content, product launch animations, explainer videos, and professional voice-overs that elevate your brand story.',
    capabilities: [
      'Product Launch Videos',
      '2D & 3D Motion Graphics',
      'Brand Story Documentaries',
      'Professional Voice-Over',
      'Social Video Advertising',
      'Event Visual Animation',
    ],
    process: [
      { step: '01', title: 'Script & Storyboard', description: 'Narrative structure, concept scripting, visual style frames, and pacing.' },
      { step: '02', title: 'Production & Recording', description: 'Shooting, motion design, 3D assets, and high-fidelity audio capture.' },
      { step: '03', title: 'Post-Production', description: 'Color grading, sound design, music composition, and audio mastering.' },
      { step: '04', title: 'Multi-Format Delivery', description: 'Exporting optimized video formats tailored for web, mobile, social, and broadcast.' },
    ],
    technologies: ['Adobe Premiere Pro', 'After Effects', 'Cinema 4D', 'DaVinci Resolve', 'Logic Pro'],
    deliverables: ['4K Master Video Files', 'Social Media Cutdowns (16:9, 9:16, 1:1)', 'Motion Graphics Source Files', 'Mastered Audio Tracks'],
    relatedProjects: ['baobab-fintech'],
  },
  {
    slug: 'training',
    number: '05',
    title: 'Training & Capacity',
    tagline: 'Empowering teams with tomorrow’s digital skills.',
    summary: 'Custom digital training programs and workshops designed to upskill teams, developers, and creators.',
    description: 'Through SPARKlearn and our corporate training services, we deliver practical, project-based learning in modern web technologies, UI/UX design, and digital workflows.',
    capabilities: [
      'Corporate Team Workshops',
      'Full-Stack Web Development Bootcamps',
      'UI/UX Design Masterclasses',
      'DevOps & Modern Tooling Training',
      'Custom University Curricula',
      '1-on-1 Mentorship Programs',
    ],
    process: [
      { step: '01', title: 'Skills Assessment', description: 'Evaluating team baseline, skill gaps, and learning objectives.' },
      { step: '02', title: 'Curriculum Tailoring', description: 'Developing custom learning paths with real-world practical projects.' },
      { step: '03', title: 'Interactive Sessions', description: 'Hands-on live coding, design reviews, and collaborative workshops.' },
      { step: '04', title: 'Post-Training Support', description: 'Project reviews, skill evaluations, and ongoing mentorship resources.' },
    ],
    technologies: ['Modern JavaScript', 'React & Next.js', 'Figma', 'Git & GitHub', 'Tailwind CSS', 'API Integration'],
    deliverables: ['Custom Workshop Curriculum', 'Interactive Code Repositories', 'Session Recordings', 'Certificates of Completion'],
    relatedProjects: ['jamm-collaboration'],
  },
]

export const servicesRepository = {
  async getAll(): Promise<ServiceItem[]> {
    return servicesData
  },
  async getBySlug(slug: string): Promise<ServiceItem | null> {
    return servicesData.find((s) => s.slug === slug) || null
  },
  async getOtherServices(currentSlug: string): Promise<ServiceItem[]> {
    return servicesData.filter((s) => s.slug !== currentSlug)
  },
}
