import { Masterclass, Formation } from '@/types'

export const masterclassesData: Masterclass[] = [
  {
    slug: 'modern-web-architecture-ucad',
    title: 'Architecture Web Moderne & Next.js en Production',
    institution: 'ESP Dakar — UCAD',
    location: 'Dakar, Sénégal',
    date: 'Mars 2024',
    status: 'completed',
    attendeesCount: 120,
    category: 'Ingénierie & Cloud',
    speaker: 'Ndiaga Lo',
    speakerRole: 'Lead Software Architect',
    speakerAvatar: '/images/brand/Ndiaga.png',
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop',
    description: 'Une session technique intensive initiant les étudiants ingénieurs au rendu Edge, aux Server Components et aux flux de travail full-stack modernes.',
    topics: ['Architecture Next.js App Router', 'Server Actions & Mutations', 'Déploiement Edge & Cache mondial', 'Parcours ingénieur web'],
  },
  {
    slug: 'ui-ux-design-systems-esmti',
    title: 'Design Systems d’Entreprise sur Figma Pro',
    institution: 'ESMT Dakar',
    location: 'Dakar, Sénégal',
    date: 'Mai 2024',
    status: 'completed',
    attendeesCount: 85,
    category: 'UI/UX & Design',
    speaker: 'Fanta Ndao Tine',
    speakerRole: 'Lead Product Designer',
    speakerAvatar: '/images/brand/Fanta.png',
    coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    description: 'Masterclass pratique sur la structuration de design systems tokenisés, les auto-layouts avancés et la collaboration fluide avec les développeurs.',
    topics: ['Design Tokens & Variables', 'Architecture de composants', 'Accessibilité WCAG', 'Passation Design to Code'],
  },
  {
    slug: 'ai-assisted-engineering-community',
    title: 'Développement Assisté par IA & Workflows Agentiques',
    institution: 'Dakar Tech Community Hub',
    location: 'Dakar, Sénégal',
    date: 'Octobre 2024',
    status: 'upcoming',
    attendeesCount: 200,
    category: 'Intelligence Artificielle',
    speaker: 'Seydina Mohamed Diop',
    speakerRole: 'Tech Lead & AI Engineer',
    speakerAvatar: '/images/brand/Seydina.png',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop',
    description: 'Explorer comment les outils d’IA générative et de programmation agentique permettent aux développeurs africains de bâtir des produits mondiaux plus rapidement.',
    topics: ['Prototypage assisté par LLM', 'Workflows Agentiques modernes', 'Génération automatisée de tests', 'Ingénierie IA responsable'],
  },
  {
    slug: 'fintech-mobile-payments-dakar',
    title: 'FinTech : Intégration Wave & Paiements Mobiles',
    institution: 'Ensup Afrique',
    location: 'Dakar, Sénégal',
    date: 'Novembre 2024',
    status: 'upcoming',
    attendeesCount: 150,
    category: 'FinTech & Systèmes',
    speaker: 'Serigne Fallou Seck',
    speakerRole: 'Senior Backend Engineer',
    speakerAvatar: '/images/brand/Serigne fallou.png',
    coverImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop',
    description: 'Architecture des passerelles de paiement Wave, Orange Money et Stripe : webhooks idempotents, sécurité bancaire et résilience transactionnelle.',
    topics: ['Webhooks & Idempotence', 'Sécurité des transactions', 'APIs Wave & OM', 'Architecture Haute Disponibilité'],
  },
  {
    slug: 'tech-leadership-product-direction',
    title: 'Tech Leadership & Direction Produit en Startup',
    institution: 'SupdeCo Dakar Incubateur',
    location: 'Dakar, Sénégal',
    date: 'Décembre 2024',
    status: 'upcoming',
    attendeesCount: 95,
    category: 'Stratégie & Leadership',
    speaker: 'Le Collectif SPARKLINE',
    speakerRole: 'Directeurs Techniques & Stratèges',
    speakerAvatar: '/images/brand/Ndiaga.png',
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop',
    description: 'De l’idée au produit scalable : structuration d’équipes tech, choix des architectures logicielles et gouvernance agile pour dominer son marché.',
    topics: ['Roadmaps de scalabilité', 'Management d’équipes tech', 'Choix des stacks modernes', 'Culture de l’excellence'],
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
