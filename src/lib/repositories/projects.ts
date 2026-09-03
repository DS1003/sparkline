import { Project } from '@/types'

export const projectsData: Project[] = [
  {
    slug: 'mbor-store',
    title: 'MBOR Store',
    client: 'MBOR Business Store',
    category: 'Plateforme E-commerce',
    year: '2024',
    summary: 'Une plateforme e-commerce moderne et performante pour une marque de sport et de lifestyle dynamique, conçue pour convertir.',
    description: 'MBOR avait besoin d’une boutique en ligne capable de retranscrire l’énergie de sa marque tout en offrant une expérience d’achat fluide et ultra-rapide pour ses équipements sportifs.',
    challenge: 'Créer une expérience immersive qui valorise les collections de maillots et d’équipements, tout en intégrant des solutions de paiement adaptées au marché local et en supportant de forts pics de trafic lors des lancements.',
    solution: 'Nous avons développé une architecture headless propulsée par Next.js, offrant des temps de chargement instantanés. Le design audacieux met en valeur les produits avec une navigation intuitive.',
    impact: 'Hausse de 120 % des ventes en ligne lors du premier trimestre et une augmentation significative de l’engagement sur mobile.',
    deliverables: ['Boutique e-commerce headless', 'Design UI/UX audacieux', 'Intégration paiements locaux', 'Système de gestion de catalogue'],
    technologies: ['Next.js', 'Tailwind CSS', 'Shopify', 'Framer Motion'],
    coverImage: '/images/projects/mbor-store.png',
    galleryImages: [
      '/images/projects/mbor-store.png',
    ],
  },
  {
    slug: 'fidele-construction',
    title: 'Fidele Construction',
    client: 'FIDELE SARL',
    category: 'Identité & Plateforme',
    year: '2023',
    summary: 'Identité visuelle forte et présence numérique institutionnelle pour un leader du secteur de la construction et de l’ingénierie.',
    description: 'FIDELE SARL souhaitait moderniser son image de marque pour refléter son expertise, son envergure sur les grands chantiers et son engagement envers l’innovation dans la construction.',
    challenge: 'Traduire la solidité et l’ingénierie de précision de l’entreprise à travers une plateforme digitale corporate capable de présenter des projets d’infrastructure complexes.',
    solution: 'Refonte complète de l’identité visuelle et création d’un site vitrine haut de gamme, intégrant des galeries immersives de leurs réalisations architecturales et des études de cas détaillées.',
    impact: 'Positionnement de marque renforcé auprès des partenaires institutionnels et augmentation des demandes de devis qualifiées B2B.',
    deliverables: ['Refonte de l’identité visuelle', 'Site vitrine corporate', 'Stratégie de contenu', 'Portefeuille de projets interactif'],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Sanity CMS'],
    coverImage: '/images/projects/fidele-construction.png',
    galleryImages: [
      '/images/projects/fidele-construction.png',
    ],
  },
  {
    slug: 'baraka-electronics',
    title: 'Baraka',
    client: 'Baraka Store',
    category: 'Plateforme E-commerce',
    year: '2024',
    summary: 'Refonte de l’expérience d’achat omnicanale pour une chaîne de magasins spécialisée dans l’électronique, les smartphones et les gadgets.',
    description: 'Afin d’accompagner sa croissance physique, Baraka souhaitait offrir à ses clients une vitrine en ligne premium permettant de consulter les stocks, comparer les appareils et commander en toute simplicité.',
    challenge: 'Gérer un catalogue vaste et en constante évolution, tout en offrant une recherche ultra-rapide et un parcours d’achat sans friction, particulièrement sur smartphone.',
    solution: 'Mise en place d’une plateforme e-commerce optimisée avec une recherche intelligente, des filtres dynamiques, et un design épuré mettant en valeur les produits technologiques.',
    impact: 'Une expérience d’achat unifiée qui a permis de doubler le taux de rétention client et de simplifier considérablement le click-and-collect.',
    deliverables: ['Plateforme E-commerce', 'Moteur de recherche avancé', 'Optimisation Mobile-first', 'Intégration Click & Collect'],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Algolia', 'PostgreSQL'],
    coverImage: '/images/projects/baraka-tech.png',
    galleryImages: [
      '/images/projects/baraka-tech.png',
    ],
  },
  {
    slug: 'wer-asset',
    title: 'Wër Asset Manager',
    client: 'Wër Asset',
    category: 'Tableau de bord SaaS',
    year: '2024',
    summary: 'Une solution SaaS complète pour la maintenance et la gestion des équipements industriels, combinant application mobile et tableau de bord d’analyse.',
    description: 'Wër Asset est une plateforme innovante conçue pour numériser la maintenance industrielle, permettant aux techniciens d’intervenir sur le terrain et aux gestionnaires de suivre la santé des équipements en temps réel.',
    challenge: 'Remplacer des processus papier fastidieux par une solution numérique intuitive, capable de fonctionner en milieu industriel (scans QR code) tout en consolidant des données complexes dans un dashboard central.',
    solution: 'Développement d’une application mobile pour les techniciens (suivi d’interventions, scan de machines) couplée à un tableau de bord web puissant offrant des graphiques prédictifs et le suivi du MTTR.',
    impact: 'Réduction de 35 % des temps d’arrêt machine et optimisation drastique de la planification des équipes de maintenance.',
    deliverables: ['Dashboard d’analyse SaaS', 'Application mobile technicien', 'Système de scan QR Code', 'Génération de rapports automatisés'],
    technologies: ['Next.js', 'React Native', 'Tailwind CSS', 'Recharts', 'Node.js', 'PostgreSQL'],
    coverImage: '/images/projects/wer-asset.png',
    galleryImages: [
      '/images/projects/wer-asset.png',
    ],
  },
  {
    slug: 'bay-sa-warr',
    title: 'Plateforme Bay Sa Warr',
    client: 'Fabira Agro-Food',
    category: 'Application Mobile',
    year: '2023',
    summary: 'Marketplace agro-alimentaire connectant les producteurs locaux aux consommateurs, valorisant les produits naturels et bio.',
    description: 'Le projet Bay Sa Warr par Fabira vise à créer un pont numérique direct entre les cultivateurs, transformateurs locaux et les clients finaux, pour promouvoir une alimentation saine et authentique.',
    challenge: 'Créer une plateforme facile d’utilisation pour des vendeurs parfois peu numérisés, tout en offrant aux consommateurs une expérience d’achat rassurante et transparente sur l’origine des produits.',
    solution: 'Conception d’une application mobile intuitive "vendeurs premium" et d’une vitrine d’achat épurée, mettant en avant la qualité des produits (sirops, poudres, huiles) grâce à une identité visuelle chaleureuse.',
    impact: 'Digitalisation réussie d’une dizaine de coopératives agricoles et création d’un nouveau canal de vente direct très rentable.',
    deliverables: ['Application mobile E-commerce', 'Portail Vendeurs', 'Design UI/UX chaleureux', 'Système de gestion des commandes'],
    technologies: ['React Native', 'Next.js', 'Firebase', 'Tailwind CSS'],
    coverImage: '/images/projects/bay-sa-warr.png',
    galleryImages: [
      '/images/projects/bay-sa-warr.png',
    ],
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
