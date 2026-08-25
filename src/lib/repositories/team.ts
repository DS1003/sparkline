import { TeamMember } from '@/types'

export const teamData: TeamMember[] = [
  {
    slug: 'seydina-diop',
    name: 'Seydina Mouhammad Diop',
    role: 'Développeur Full Stack & Lead UI/UX Designer',
    bio: 'Architecte principal pilotant l’ingénierie logicielle et le design d’expérience chez SPARKLINE. Passionné par les écosystèmes web ultra-performants, la typographie moderne et les interactions soignées.',
    specialties: ['Leadership technique', 'Architecture Full Stack', 'Design Systems', 'Frontend créatif', 'Design UI/UX'],
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Figma', 'PostgreSQL', 'GSAP'],
    experienceYears: 5,
    avatar: '/images/brand/Seydina.png',
    socials: {
      linkedin: 'https://linkedin.com/in/seydina-diop',
      github: 'https://github.com/seydiop07',
    },
  },
  {
    slug: 'fanta-ndao',
    name: 'Fanta Ndao',
    role: 'Développeuse Full Stack & Développeuse WordPress',
    bio: 'Spécialiste des solutions CMS personnalisées, des plateformes web robustes et du développement d’applications complètes. Dévouée à la création d’interfaces performantes et orientées résultats.',
    specialties: ['Développement web', 'WordPress sur mesure & Headless CMS', 'Plateformes digitales', 'Gestion de bases de données'],
    skills: ['WordPress', 'PHP', 'JavaScript', 'React', 'Tailwind CSS', 'MySQL', 'API REST'],
    experienceYears: 4,
    avatar: '/images/brand/Fanta.png',
  },
  {
    slug: 'ndiaga-lo',
    name: 'Ndiaga Lo',
    role: 'Développeur Full Stack & Designer UI/UX',
    bio: 'Allie rigueur d’ingénierie et empathie de conception pour livrer des produits numériques aussi intuitifs qu’infaillibles techniquement.',
    specialties: ['Développement Full Stack', 'Architecture de l’expérience utilisateur', 'Prototypage interactif', 'Design de produit'],
    skills: ['React', 'Next.js', 'TypeScript', 'Figma', 'Tailwind CSS', 'Node.js', 'GraphQL'],
    experienceYears: 4,
    avatar: '/images/brand/Ndiaga.png',
  },
  {
    slug: 'serigne-fallou-seck',
    name: 'Serigne Fallou Seck',
    role: 'Développeur Full Stack | Architecture Web | DevOps',
    bio: 'Conçoit des infrastructures serveur évolutives, des backends résilients et des pipelines CI/CD cloud garantissant une disponibilité et une vitesse de pointe.',
    specialties: ['Architecture Web', 'Ingénierie Backend', 'Infrastructure Cloud', 'DevOps & CI/CD'],
    skills: ['Node.js', 'PostgreSQL', 'Docker', 'Linux', 'AWS / Cloud', 'Next.js', 'TypeScript'],
    experienceYears: 4,
    avatar: '/images/brand/Serigne fallou.png',
  },
  {
    slug: 'mouhamed-sambe',
    name: 'Mouhamed Sambe',
    role: 'Digital Lead & Designer Multidisciplinaire',
    bio: 'Dirige la stratégie de marque visuelle, les campagnes de communication digitale et la direction artistique pour conférer aux marques une voix unique et impactante.',
    specialties: ['Direction artistique', 'Stratégie de marque', 'Identité visuelle', 'Direction Social Media', 'Campagnes digitales'],
    skills: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Stratégie de marque', 'Motion Design'],
    experienceYears: 4,
  },
  {
    slug: 'elhadji-andaw-ciss',
    name: 'Elhadji Andaw Ciss',
    role: 'Développeur Full Stack',
    bio: 'Dédié au développement d’applications web réactives, à l’intégration d’API propres et à des expériences frontend fluides pour des plateformes variées.',
    specialties: ['Développement Frontend', 'Ingénierie Backend', 'Intégration d’API', 'Architecture applicative'],
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Tailwind CSS', 'SQL'],
    experienceYears: 3,
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
