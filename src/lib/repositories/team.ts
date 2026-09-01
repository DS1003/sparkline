import { TeamMember } from '@/types'

export const teamData: TeamMember[] = [
  {
    slug: 'ndiaga-lo',
    name: 'Ndiaga Lo',
    role: 'Développeur Full Stack & Consultant IT ServiceNow',
    email: 'ndiaga.lo@sparkline.sn',
    phone: '+221 78 528 63 30',
    department: 'Engineering',
    bio: 'Expert en ingénierie applicative et intégration IT d’entreprise. Alliant rigueur technique et maîtrise des architectures cloud et ServiceNow pour des déploiements sans faille.',
    specialties: ['Développement Full Stack', 'Consulting IT ServiceNow', 'Architecture Cloud & API', 'Intégration d’entreprise'],
    skills: ['React', 'Next.js', 'Node.js', 'ServiceNow', 'TypeScript', 'PostgreSQL', 'Docker'],
    experienceYears: 5,
    avatar: '/images/brand/Ndiaga.png',
    socials: {
      linkedin: 'https://linkedin.com/in/ndiaga-lo',
      github: 'https://github.com/ndiaga-lo',
    },
  },
  {
    slug: 'fanta-ndao-tine',
    name: 'Fanta Ndao Tine',
    role: 'Ingénieure Logiciel & Product Manager',
    email: 'fanta.tine@sparkline.sn',
    phone: '+221 78 528 63 30',
    department: 'Product & Tech',
    bio: 'Pilote la vision produit et l’ingénierie logicielle avec une approche centrée sur l’impact business et la satisfaction utilisateur. Spécialiste des architectures scalables et de la gestion de cycle de vie.',
    specialties: ['Product Management', 'Ingénierie Logicielle', 'Stratégie Produit & Roadmap', 'Architecture Digitale'],
    skills: ['Product Strategy', 'Agile / Scrum', 'TypeScript', 'React', 'Next.js', 'API Management', 'SQL'],
    experienceYears: 5,
    avatar: '/images/brand/Fanta.png',
    socials: {
      linkedin: 'https://linkedin.com/in/fanta-ndao',
      github: 'https://github.com/fanta-ndao',
    },
  },
  {
    slug: 'serigne-fallou-seck',
    name: 'Serigne Fallou Seck',
    role: 'Consultant DevOps Engineer | SRE & Fullstack',
    email: 'serignefallou.seck@sparkline.sn',
    phone: '+221 78 528 63 30',
    department: 'DevOps & SRE',
    bio: 'Architecte des infrastructures résilientes, de la haute disponibilité et de la sécurité des plateformes SPARKLINE. Expert en automatisation CI/CD, conteneurisation et observabilité.',
    specialties: ['DevOps & Cloud Automation', 'Site Reliability Engineering (SRE)', 'Kubernetes & Docker', 'Backend & Microservices'],
    skills: ['Docker', 'Kubernetes', 'Linux', 'AWS Cloud', 'Node.js', 'PostgreSQL', 'CI/CD Pipelines'],
    experienceYears: 5,
    avatar: '/images/brand/Serigne fallou.png',
    socials: {
      linkedin: 'https://linkedin.com/in/serigne-fallou-seck',
      github: 'https://github.com/fallou-seck',
    },
  },
  {
    slug: 'seydina-diop',
    name: 'Seydina Mohamed Diop',
    role: 'Développeur Fullstack & Lead UI/UX Designer',
    email: 'seydina.diop@sparkline.sn',
    phone: '+221 78 528 63 30',
    department: 'Design & Engineering',
    bio: 'Architecte digital combinant maîtrise avancée du frontend, design system et ingénierie de pointe pour concevoir des expériences utilisateurs exceptionnelles et ultra-fluides.',
    specialties: ['Lead UI/UX Design', 'Architecture Full Stack', 'Design Systems', 'Micro-interactions & 3D Web'],
    skills: ['Next.js', 'React', 'TypeScript', 'Figma', 'Tailwind CSS', 'Three.js', 'Node.js', 'PostgreSQL'],
    experienceYears: 5,
    avatar: '/images/brand/Seydina.png',
    socials: {
      linkedin: 'https://linkedin.com/in/seydina-diop',
      github: 'https://github.com/seydiop07',
    },
  },
]

export const teamRepository = {
  async getAll(): Promise<TeamMember[]> {
    return teamData
  },
  async getBySlug(slug: string): Promise<TeamMember | null> {
    return teamData.find((t) => t.slug === slug) || null
  },
}
