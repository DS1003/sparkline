export interface TeamMember {
  id: string
  name: string
  title: string
  description: string
  image?: string
}

export const teamMembers: TeamMember[] = [
  {
    id: 'seydina',
    name: 'Seydina M. Diop',
    title: 'Développeur Full Stack & Lead UI/UX Designer',
    description:
      'Leadership technique, architecture produit, développement full-stack, design UI/UX et expérience utilisateur.',
  },
  {
    id: 'fanta',
    name: 'Fanta Ndao',
    title: 'Développeuse Full Stack & Développeuse WordPress',
    description:
      'Développement web, intégration CMS sur mesure, plateformes digitales et mise en œuvre technique.',
  },
  {
    id: 'ndiaga',
    name: 'Ndiaga Lo',
    title: 'Développeur Full Stack & Designer UI/UX',
    description:
      'Développement full-stack, parcours utilisateurs, design d’interfaces et implémentation de fonctionnalités produit.',
  },
  {
    id: 'fallou',
    name: 'Serigne Fallou Seck',
    title: 'Développeur Full Stack | Architecture Web | DevOps',
    description:
      'Développement backend et full-stack, architecture web, infrastructures cloud et déploiement DevOps.',
  },
  {
    id: 'mouhamed',
    name: 'Mouhamed Sambe',
    title: 'Digital Lead & Designer Multidisciplinaire',
    description:
      'Communication digitale, stratégie de marque, direction artistique et création visuelle.',
  },
  {
    id: 'andaw',
    name: 'Elhadji Andaw Ciss',
    title: 'Développeur Full Stack',
    description:
      'Développement frontend, intégration d’API, backend et architecture d’applications modernes.',
  },
]
