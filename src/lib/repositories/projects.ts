import { Project } from '@/types'

export const projectsData: Project[] = [
  {
    slug: 'ndakaru-commerce',
    title: 'NDAKARU Commerce',
    client: 'Groupe NDAKARU Retail',
    category: 'Plateforme E-commerce',
    year: '2024',
    summary: 'Un écosystème e-commerce headless conçu pour des performances extrêmes et un taux de conversion mobile optimal en Afrique de l’Ouest.',
    description: 'NDAKARU avait besoin d’une infrastructure numérique évolutive capable d’absorber d’importants pics saisonniers tout en offrant des temps de chargement instantanés et des passerelles de paiement locales.',
    challenge: 'Les plateformes existantes généraient des taux d’abandon élevés sur les réseaux mobiles 3G/4G, avec des parcours d’achat complexes dépourvus de paiements mobiles locaux (Wave, Orange Money).',
    solution: 'Nous avons développé une architecture headless sur mesure propulsée par Next.js et Tailwind CSS avec mise en cache edge et intégration directe des SDK de paiement mobile, réduisant le temps de commande de 65 %.',
    impact: 'Augmentation du taux de conversion mobile de 142 % et plus de 50 000 acheteurs actifs mensuels avec des temps de réponse inférieurs à la seconde.',
    deliverables: ['Boutique en ligne Next.js sur mesure', 'Intégration paiements Mobile Money (Wave, OM)', 'Tableau de bord de gestion des stocks', 'Design System complet'],
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Stripe & Wave API'],
    testimonial: {
      quote: 'SPARKLINE a révolutionné l’ensemble de notre chaîne de vente en ligne. La rapidité et l’expérience utilisateur sont au niveau des meilleurs standards mondiaux.',
      author: 'Amadou Fall',
      role: 'Directeur du Digital, Groupe NDAKARU',
    },
  },
  {
    slug: 'teranga-dashboard',
    title: 'TERANGA Insights',
    client: 'Teranga Analytics',
    category: 'Tableau de bord SaaS',
    year: '2024',
    summary: 'Un tableau de bord décisionnel intelligent fournissant des métriques financières en temps réel pour les entreprises africaines en forte croissance.',
    description: 'Teranga Insights apporte une visibilité claire sur les flux multi-devises et les opérations complexes grâce à une visualisation de données dynamique et la détection d’anomalies assistée par IA.',
    challenge: 'Les solutions ERP existantes étaient lentes, surchargées et inadaptées aux flux de travail des entreprises régionales.',
    solution: 'Nous avons conçu un design system modulaire avec des composants de visualisation de données interactifs, un mode sombre/clair et une synchronisation WebSocket en temps réel.',
    impact: 'Adopté par plus de 40 entreprises régionales en 6 mois, gérant plus de 12 millions de dollars de transactions suivies.',
    deliverables: ['Design System UI/UX', 'Visualisations de données interactives', 'Interface télémétrique en temps réel', 'Architecture API REST'],
    technologies: ['React 19', 'Next.js', 'Tailwind CSS', 'Recharts', 'WebSockets', 'PostgreSQL'],
    testimonial: {
      quote: 'L’interface est d’une fluidité et d’une clarté remarquables. Nos clients adorent la simplicité et la précision des rapports.',
      author: 'Fatou Diop',
      role: 'CEO, Teranga Analytics',
    },
  },
  {
    slug: 'baobab-fintech',
    title: 'BAOBAB Labs',
    client: 'Baobab Digital',
    category: 'Identité & Plateforme',
    year: '2024',
    summary: 'Système d’identité de marque complet et plateforme digitale mobile-first pour une startup fintech pionnière.',
    description: 'Des ateliers initiaux de découverte de marque à la charte graphique et aux pages de présentation interactives, nous avons façonné Baobab Labs en une marque de référence de la finance moderne.',
    challenge: 'Pénétrer un marché fintech concurrentiel exigeait d’établir immédiatement confiance, crédibilité et singularité de marque.',
    solution: 'Nous avons créé une identité visuelle distinctive avec des palettes vert émeraude et obsidienne, associées à une expérience produit 3D WebGL interactive.',
    impact: 'A aidé le client à lever 1,5 million de dollars en pré-amorçage et à inscrire 15 000 utilisateurs sur liste d’attente en 30 jours.',
    deliverables: ['Guide d’identité & Charte graphique', 'Landing page interactive', 'Maquettes UI/UX application mobile', 'Kit de présentation investisseurs'],
    technologies: ['Figma', 'Next.js', 'Tailwind CSS', 'Three.js / Canvas', 'Framer Motion'],
  },
  {
    slug: 'sunu-health',
    title: 'SUNU Santé',
    client: 'Réseau Sunu Santé',
    category: 'Application Mobile',
    year: '2023',
    summary: 'Une plateforme mobile de prise de rendez-vous médicaux et de télémédecine connectant les patients aux médecins spécialistes partout au Sénégal.',
    description: 'SUNU Santé simplifie l’accès aux soins grâce à la prise de rendez-vous instantanée, aux ordonnances numérisées et à des salles de téléconsultation sécurisées.',
    challenge: 'Combler le fossé entre cliniques urbaines et patients en zones régionales tout en garantissant la confidentialité des données médicales et l’accessibilité sur faibles bandes passantes.',
    solution: 'Création d’une Progressive Web App (PWA) ultra-légère avec mise en cache hors ligne et consultations vidéo chiffrées de bout en bout.',
    impact: 'Plus de 20 000 consultations réalisées avec un taux de satisfaction patient de 98 % dans 8 régions.',
    deliverables: ['Application mobile PWA', 'Portail praticiens & planning', 'Coffre-fort médical sécurisé', 'Parcours clinique UX'],
    technologies: ['Next.js', 'React Native', 'WebRTC', 'Tailwind CSS', 'Node.js'],
  },
  {
    slug: 'jamm-collaboration',
    title: 'JAMM Studio',
    client: 'Jamm Workspace',
    category: 'Application Web',
    year: '2023',
    summary: 'Une suite de gestion de projet collaborative conçue pour les agences digitales créatives et les équipes d’ingénierie à distance.',
    description: 'JAMM réunit la gestion des tâches, les tableaux blancs en temps réel et les outils de rétrospective agile au sein d’un espace épuré et sans distraction.',
    challenge: 'Les équipes créatives étaient dispersées sur de multiples outils de productivité déconnectés.',
    solution: 'Nous avons développé un espace de travail tout-en-un avec des tableaux Kanban en glisser-déposer, des canevas collaboratifs et des tableaux de bord personnalisables.',
    impact: 'Réduction de 40 % des réunions hebdomadaires de synchronisation chez les agences utilisatrices.',
    deliverables: ['Application web Full-Stack', 'Éditeur de canevas interactif', 'Moteur de collaboration temps réel', 'Système de permissions d’équipe'],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Socket.io', 'PostgreSQL'],
  },
]

export const projectsRepository = {
  async getAll(): Promise<Project[]> {
    return projectsData
  },
  async getBySlug(slug: string): Promise<Project | null> {
    return projectsData.find((p) => p.slug === slug) || null
  },
  async getFeatured(): Promise<Project[]> {
    return projectsData.slice(0, 3)
  },
  async getByCategory(category: string): Promise<Project[]> {
    if (!category || category === 'All') return projectsData
    return projectsData.filter((p) => p.category.toLowerCase().includes(category.toLowerCase()))
  },
}
