import { TeamMember } from '@/types'

export const teamData: TeamMember[] = [
  {
    slug: 'ndiaga-lo',
    name: 'Ndiaga Lo',
    role: 'Développeur Full Stack & Consultant IT ServiceNow',
    email: 'ndiagalo259@gmail.com',
    phone: '+221 78 455 99 30',
    department: 'Engineering',
    bio: 'Expert en ingénierie applicative et intégration IT d’entreprise. Alliant rigueur technique et maîtrise des architectures cloud et ServiceNow pour des déploiements sans faille.',
    specialties: ['Développement Full Stack', 'Consulting IT ServiceNow', 'Architecture Cloud & API', 'Intégration d’entreprise'],
    skills: ['React', 'Next.js', 'Node.js', 'ServiceNow', 'TypeScript', 'PostgreSQL', 'Docker'],
    experienceYears: 5,
    avatar: '/images/brand/Ndiaga.webp',
    socials: {
      linkedin: 'https://www.linkedin.com/in/ndiaga-l-4a7581139/',
      instagram: 'https://www.instagram.com/sohn.hero?igsi=MWUzNXl6dWM0dWMwNQ%3D%3D&utm_source=qr',
    },
  },
  {
    slug: 'fanta-ndao-tine',
    name: 'Fanta Ndao Tine',
    role: 'Ingénieure Logiciel & Product Manager',
    email: 'fantatine18@gmail.com',
    phone: '+221 78 528 63 30',
    department: 'Product & Tech',
    bio: 'Pilote la vision produit et l’ingénierie logicielle avec une approche centrée sur l’impact business et la satisfaction utilisateur. Spécialiste des architectures scalables et de la gestion de cycle de vie.',
    specialties: ['Product Management', 'Ingénierie Logicielle', 'Stratégie Produit & Roadmap', 'Architecture Digitale'],
    skills: ['Product Strategy', 'Agile / Scrum', 'TypeScript', 'React', 'Next.js', 'API Management', 'SQL'],
    experienceYears: 5,
    avatar: '/images/brand/Fanta.webp',
    socials: {
      linkedin: 'https://www.linkedin.com/in/fanta-tine-/',
      instagram: 'https://www.instagram.com/tina__bello?igsi=YXFnODhydGNwMzFu',
    },
  },
  {
    slug: 'serigne-fallou-seck',
    name: 'Serigne Fallou Seck',
    role: 'Consultant DevOps Engineer | SRE & Fullstack',
    email: 'seck22331@gmail.com',
    phone: '+221 78 383 00 20',
    department: 'DevOps & SRE',
    bio: 'Architecte des infrastructures résilientes, de la haute disponibilité et de la sécurité des plateformes SPARKLINE. Expert en automatisation CI/CD, conteneurisation et observabilité.',
    specialties: ['DevOps & Cloud Automation', 'Site Reliability Engineering (SRE)', 'Kubernetes & Docker', 'Backend & Microservices'],
    skills: ['Docker', 'Kubernetes', 'Linux', 'AWS Cloud', 'Node.js', 'PostgreSQL', 'CI/CD Pipelines'],
    experienceYears: 5,
    avatar: '/images/brand/Serigne fallou.webp',
    socials: {
      linkedin: 'https://www.linkedin.com/in/fadildev/',
      instagram: 'https://www.instagram.com/fadildev_44?igsi=MW9jcHVkbmQ3YnJmZw==',
    },
  },
  {
    slug: 'seydina-diop',
    name: 'Seydina Mouhammad Diop',
    role: 'Développeur Fullstack & Lead UI/UX Designer',
    email: 'mouhaleecr7@gmail.com',
    phone: '+221 78 599 35 46',
    department: 'Design & Engineering',
    bio: 'Architecte digital combinant maîtrise avancée du frontend, design system et ingénierie de pointe pour concevoir des expériences utilisateurs exceptionnelles et ultra-fluides.',
    specialties: ['Lead UI/UX Design', 'Architecture Full Stack', 'Design Systems', 'Micro-interactions & 3D Web'],
    skills: ['Next.js', 'React', 'TypeScript', 'Figma', 'Tailwind CSS', 'Three.js', 'Node.js', 'PostgreSQL'],
    experienceYears: 5,
    avatar: '/images/brand/Seydina.webp',
    socials: {
      linkedin: 'https://www.linkedin.com/in/seydina-mouhammad-diop-98546121b/',
      instagram: 'https://www.instagram.com/__seydiop__?igsi=OTFiNWFjbTZrMjdm',
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
