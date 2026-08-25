export interface Service {
  id: string
  number: string
  title: string
  description: string
  details: string[]
}

export const services: Service[] = [
  {
    id: 'digital-solutions',
    number: '01',
    title: 'Solutions digitales',
    description:
      'Développement de plateformes, sites web, applications web, applications mobiles, solutions métier et produits numériques sur mesure et évolutifs.',
    details: [
      'Sites web institutionnels',
      'Applications web & SaaS',
      'Applications mobiles iOS & Android',
      'Plateformes e-commerce',
      'Outils métier internes',
      'Architectures cloud & API',
    ],
  },
  {
    id: 'ui-ux-design',
    number: '02',
    title: 'Design UI/UX & Produit',
    description:
      "Conception d'expériences utilisateurs intuitives, interfaces modernes, prototypes interactifs et systèmes de design pérennes.",
    details: [
      'Recherche utilisateur (UX Research)',
      'Parcours utilisateurs & Architecture',
      'Wireframes & Prototypage haute fidélité',
      'Design Systems sur mesure',
      'Interfaces responsives & accessibles',
      'Stratégie de produit numérique',
    ],
  },
  {
    id: 'branding-communication',
    number: '03',
    title: 'Identité visuelle & Communication',
    description:
      "Création d'identités de marque fortes et distinctives, stratégies de communication globale, contenus digitaux et supports de communication engageants.",
    details: [
      'Identité de marque & Charte graphique',
      'Logo & Systèmes visuels',
      'Stratégie de communication digitale',
      'Campagnes digitales & Réseaux sociaux',
      'Création de contenus éditoriaux',
      'Supports print & Brand merchandise',
    ],
  },
  {
    id: 'audiovisual',
    number: '04',
    title: 'Production audiovisuelle & Voix off',
    description:
      'Production vidéo complète, contenus promotionnels percutants, storytelling immersif, motion design et services de voix off professionnelles.',
    details: [
      'Production vidéo & Réalisation',
      'Films institutionnels & Publicités',
      'Motion Design & Animation 2D/3D',
      'Voix off professionnelle & Sound design',
      'Couverture vidéo événementielle',
      'Storytelling de marque',
    ],
  },
  {
    id: 'training',
    number: '05',
    title: 'Formation & Renforcement des compétences',
    description:
      'Programmes de formation personnalisés autour du numérique, du développement, du design UI/UX et des nouvelles technologies pour équipes et professionnels.',
    details: [
      'Compétences numériques fondamentales',
      'Développement web & mobile',
      'Design UI/UX & Outils modernes',
      'Intelligence artificielle & Automatisation',
      'Ateliers immersifs en entreprise',
      'Programmes de montée en compétences',
    ],
  },
]
