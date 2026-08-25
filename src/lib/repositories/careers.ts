import { CareerPosition } from '@/types'

export const careersData: CareerPosition[] = [
  {
    slug: 'senior-frontend-engineer',
    title: 'Ingénieur Frontend Créatif Senior',
    department: 'Ingénierie',
    type: 'CDI / Temps plein',
    location: 'Dakar, Sénégal (Hybride / Remote)',
    experience: '3+ Ans',
    summary: 'Nous recherchons un ingénieur frontend passionné par React moderne, Next.js, les animations soignées GSAP/Framer et les micro-interactions engageantes.',
    responsibilities: [
      'Concevoir et développer des applications web haute performance et des expériences digitales immersives avec Next.js, React et TypeScript.',
      'Implémenter des micro-interactions fluides, des transitions de pages soignées et des animations réactives au scroll via GSAP et Framer Motion.',
      'Collaborer étroitement avec les designers UI/UX pour transcrire fidèlement les design systems Figma en code de production irréprochable.',
      'Optimiser les Web Vitals, les performances de rendu et l’adaptabilité multi-écrans.',
    ],
    requirements: [
      'Excellente maîtrise de TypeScript, React 19, Next.js App Router et Tailwind CSS.',
      'Sens aiguisé de la typographie, des espacements, des courbes d’animation et de l’harmonie visuelle.',
      'Expérience solide avec les API REST, GraphQL et les pipelines CI/CD modernes.',
      'Grande autonomie, rigueur méthodologique et passion pour le travail bien fait.',
    ],
    perks: [
      'Rémunération attractive & primes sur objectifs',
      'Politique de travail hybride / flexible',
      'Matériel Apple MacBook Pro de dernière génération fourni',
      'Budget annuel de formation continue & participation à des conférences tech',
    ],
  },
  {
    slug: 'lead-ui-ux-product-designer',
    title: 'Designer UI/UX Produit',
    department: 'Design',
    type: 'CDI / Temps plein',
    location: 'Dakar, Sénégal (Hybride)',
    experience: '2+ Ans',
    summary: 'Rejoignez notre studio créatif pour concevoir des parcours utilisateurs intuitifs, des design systems Figma complets et des interfaces inoubliables.',
    responsibilities: [
      'Piloter la recherche utilisateur, la cartographie des parcours, le wireframing et le prototypage interactif pour nos clients.',
      'Bâtir et documenter des design systems évolutifs avec tokens typographiques et bibliothèques de composants modulaires.',
      'Mener des sessions de tests d’usabilité et itérer rapidement sur la base des retours qualitatifs et quantitatifs.',
      'Accompagner les développeurs frontend lors des phases d’intégration et de recette.',
    ],
    requirements: [
      'Maîtrise absolue de Figma, des Auto-Layouts, des Variables et des Composants avec Variantes.',
      'Portfolio démontrant une réflexion UX solide et une exécution UI de haut niveau.',
      'Compréhension des contraintes d’intégration web (grilles responsives, flexbox, sémantique HTML).',
      'Excellente communication orale et écrite en français et anglais.',
    ],
    perks: [
      'Liberté créative sur des projets d’envergure pour des leaders africains et internationaux',
      'Environnement de studio pluridisciplinaire stimulant et bienveillant',
      'Couverture santé & mutuelle d’entreprise',
      'Accès privilégié aux masterclasses et au réseau de mentorat SPARKlearn',
    ],
  },
  {
    slug: 'junior-devops-cloud-intern',
    title: 'Stage Ingénierie DevOps & Cloud',
    department: 'Infrastructure',
    type: 'Stage de fin d’études / Pré-embauche',
    location: 'Dakar, Sénégal',
    experience: 'Débutant / Étudiant',
    summary: 'Un stage tremplin pour les profils ambitieux désireux de se spécialiser dans les infrastructures cloud, la conteneurisation Docker et le déploiement continu.',
    responsibilities: [
      'Contribuer à la configuration des workflows automatisés GitHub Actions et des environnements de staging/production.',
      'Assurer le suivi des métriques de disponibilité, des journaux applicatifs et des sauvegardes de bases de données.',
      'Participer à la conteneurisation des services applicatifs sous Docker et à l’administration des serveurs Linux.',
    ],
    requirements: [
      'Connaissances de base de la ligne de commande Linux, de Git et des réseaux.',
      'Forte curiosité et désir d’apprendre les architectures cloud modernes (AWS, Vercel, Supabase, Docker).',
      'Esprit d’analyse, rigueur et structure intellectuelle.',
    ],
    perks: [
      'Mentorat personnalisé au quotidien avec nos ingénieurs DevOps seniors',
      'Opportunité concrète d’embauche en CDI à l’issue du stage',
      'Indemnité mensuelle motivante et environnement de travail moderne',
    ],
  },
]

export const careersRepository = {
  async getAll(): Promise<CareerPosition[]> {
    return careersData
  },
  async getBySlug(slug: string): Promise<CareerPosition | null> {
    return careersData.find((c) => c.slug === slug) || null
  },
}
