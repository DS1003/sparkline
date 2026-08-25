import { Masterclass, Formation } from '@/types'

export const masterclassesData: Masterclass[] = [
  {
    slug: 'modern-web-architecture-ucad',
    title: 'Masterclass : Architecture Web Moderne & Next.js en Production',
    institution: 'Université Cheikh Anta Diop (UCAD) - ESP',
    location: 'Dakar, Sénégal',
    date: 'Mars 2024',
    status: 'completed',
    attendeesCount: 120,
    description: 'Une session technique intensive initiant les étudiants ingénieurs au rendu Edge, aux Server Components et aux flux de travail full-stack modernes.',
    topics: ['Architecture Next.js App Router', 'Server Actions & Mutations', 'Déploiement Edge & Cache mondial', 'Parcours de carrière en ingénierie web'],
  },
  {
    slug: 'ui-ux-design-systems-esmti',
    title: 'Masterclass : Concevoir des Design Systems d’Entreprise sur Figma',
    institution: 'ESMT Dakar',
    location: 'Dakar, Sénégal',
    date: 'Mai 2024',
    status: 'completed',
    attendeesCount: 85,
    description: 'Masterclass pratique sur la structuration de design systems tokenisés, les auto-layouts avancés et la collaboration fluide avec les développeurs.',
    topics: ['Design Tokens & Modes de variables', 'Architecture de composants & Variantes', 'Normes d’accessibilité WCAG', 'Pipelines du Design au Code'],
  },
  {
    slug: 'ai-assisted-engineering-community',
    title: 'Masterclass : Développement assisté par IA & Nouveaux Workflows',
    institution: 'Dakar Tech Community Hub',
    location: 'Dakar, Sénégal',
    date: 'Octobre 2024',
    status: 'upcoming',
    attendeesCount: 200,
    description: 'Explorer comment les outils d’IA générative et de programmation agentique permettent aux développeurs africains de bâtir des produits mondiaux plus rapidement.',
    topics: ['Prototypage assisté par LLM', 'Prompt Engineering pour bases de code', 'Génération automatisée de tests', 'Ingénierie IA responsable'],
  },
]

export const formationsData: Formation[] = [
  {
    slug: 'fullstack-web-modern',
    title: 'Bootcamp Ingénierie Web Full-Stack Moderne',
    level: 'Intermédiaire',
    duration: '8 Semaines (Intensif)',
    format: 'Bootcamp',
    summary: 'Maîtrisez Next.js 15, TypeScript, Tailwind CSS et la conception de bases de données PostgreSQL performantes.',
    description: 'Un cursus pratique complet dans lequel vous concevez et déployez 3 applications web prêtes pour la production avec authentification, déploiements continus et paiements en ligne.',
    curriculum: [
      { module: 'Module 1 : TypeScript Avancé & React Moderne', topics: ['Typage strict TypeScript', 'Hooks React 19 & concurrence', 'Gestion d’état avancée'] },
      { module: 'Module 2 : Immersion Next.js App Router', topics: ['Server vs Client Components', 'Routage & Layouts imbriqués', 'Streaming & Suspense'] },
      { module: 'Module 3 : Bases de Données & Ingénierie d’API', topics: ['PostgreSQL & ORM Prisma', 'Architecture d’API REST & GraphQL', 'Authentification sécurisée'] },
      { module: 'Module 4 : Déploiement & Bonnes Pratiques Prod', topics: ['Déploiement Vercel Edge', 'Pipelines CI/CD GitHub Actions', 'Optimisation SEO & Core Web Vitals'] },
    ],
    prerequisites: ['Bases solides en HTML, CSS et JavaScript'],
  },
  {
    slug: 'product-ui-ux-mastery',
    title: 'Formation d’Excellence UI/UX & Design Systems',
    level: 'Tous niveaux',
    duration: '6 Semaines',
    format: 'Bootcamp',
    summary: 'Apprenez à concevoir des produits digitaux mémorables, de la recherche utilisateur jusqu’au design system Figma complet.',
    description: 'Destinée aux designers et développeurs souhaitant perfectionner leur sens du détail UI, la psychologie ergonomique, le responsive design et les micro-interactions.',
    curriculum: [
      { module: 'Module 1 : Recherche Utilisateur & Wireframes', topics: ['Découverte du besoin & personas', 'Architecture de l’information', 'Wireframing basse fidélité'] },
      { module: 'Module 2 : Richesse Visuelle & Typographie', topics: ['Échelles typographiques', 'Palettes de couleurs & contrastes', 'Systèmes de grilles et rythme spatial'] },
      { module: 'Module 3 : Design Systems sous Figma', topics: ['Principes d’Atomic Design', 'Tokens de design & bibliothèques', 'Prototypage interactif avancé'] },
      { module: 'Module 4 : Tests d’Usabilité & Passation Dev', topics: ['Méthodes de tests utilisateurs', 'Documentation pour développeurs', 'Création d’un portfolio d’impact'] },
    ],
    prerequisites: ['Aucune expérience préalable requise. Un ordinateur avec Figma installé.'],
  },
  {
    slug: 'corporate-digital-transformation',
    title: 'Formation Entreprises : Montée en Compétences Digitales',
    level: 'Avancé',
    duration: 'Sur mesure (2 à 5 jours)',
    format: 'Entreprise',
    summary: 'Ateliers sur mesure pour équipes métiers, chefs de projet et dirigeants modernisant leurs outils numériques.',
    description: 'Nous formons vos équipes à la gestion de produit agile, à la communication digitale percutante, au pilotage par la donnée et à l’automatisation des workflows.',
    curriculum: [
      { module: 'Module 1 : Stratégie Produit & Méthodes Agiles', topics: ['Roadmaps de produits digitaux', 'Suivi des indicateurs clés (KPI)', 'Rythme de livraison en sprints'] },
      { module: 'Module 2 : Outils Numériques & Automatisation', topics: ['Automatisations no-code/low-code', 'CRM modernes & outils de flux', 'Collaboration cloud sécurisée'] },
    ],
    prerequisites: ['Conçu pour les équipes en entreprise, startups et organisations.'],
  },
]

export const sparklearnRepository = {
  async getOverview() {
    return {
      masterclassesCount: 12,
      studentsTrained: 650,
      activeBootcamps: 3,
      partnerInstitutions: 8,
    }
  },
  async getMasterclasses(): Promise<Masterclass[]> {
    return masterclassesData
  },
  async getFormations(): Promise<Formation[]> {
    return formationsData
  },
  async getFormationBySlug(slug: string): Promise<Formation | null> {
    return formationsData.find((f) => f.slug === slug) || null
  },
}
