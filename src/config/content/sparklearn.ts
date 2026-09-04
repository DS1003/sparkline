export const sparklearn = {
  name: 'Sparklearn',
  tagline: 'La connaissance est aussi une étincelle.',
  description:
    'Chez Sparkline, nous croyons que la transmission des connaissances est également une source de transformation. Sparklearn est notre initiative éducative dédiée au renforcement des compétences numériques et à l’autonomisation de la prochaine génération de créateurs et bâtisseurs.',
  activities: [
    {
      id: 'masterclasses',
      title: 'Masterclasses gratuites',
      description:
        'Organisées dans les universités, grandes écoles, centres de formation et communautés pour faciliter l’accès aux compétences clés du numérique.',
      goals: [
        'Accès universel aux compétences digitales',
        'Renforcement de l’employabilité des jeunes',
        'Culture de l’apprentissage continu',
        'Expériences pratiques et mentorat',
      ],
    },
    {
      id: 'training',
      title: 'Formations personnalisées',
      description:
        'Programmes sur mesure conçus pour les étudiants, professionnels, organisations et entreprises en quête de perfectionnement.',
      goals: [
        'Parcours pour étudiants & reconversions',
        'Développement professionnel continu',
        'Ateliers d’équipe en entreprise',
        'Formations certifiantes sur mesure',
      ],
    },
  ],
}

export interface Stat {
  id: string
  value: number
  suffix: string
  label: string
  description: string
}

export const stats: Stat[] = [
  {
    id: 'projects',
    value: 10,
    suffix: '+',
    label: 'Projets réalisés',
    description: 'Des solutions digitales stratégiques pour divers secteurs.',
  },
  {
    id: 'clients',
    value: 10,
    suffix: '+',
    label: 'Clients accompagnés',
    description: 'Des startups audacieuses aux institutions établies.',
  },
  {
    id: 'satisfaction',
    value: 98,
    suffix: '%',
    label: 'Satisfaction client',
    description: 'Un engagement absolu envers l’excellence et l’impact.',
  },
  {
    id: 'experience',
    value: 3,
    suffix: '+',
    label: 'Années d’impact',
    description: 'Bâtir des expériences numériques pérennes et durables.',
  },
]

export const approach = [
  {
    id: 'discover',
    number: '01',
    title: 'Comprendre',
    description:
      'Nous commençons par analyser votre vision, vos défis et vos objectifs à travers une recherche approfondie et des ateliers collaboratifs.',
  },
  {
    id: 'strategize',
    number: '02',
    title: 'Structurer',
    description:
      'Nous définissons une feuille de route claire qui aligne vos ambitions métier avec les solutions technologiques les plus pertinentes.',
  },
  {
    id: 'design',
    number: '03',
    title: 'Concevoir',
    description:
      'Nous créons des expériences centrées utilisateur avec des interfaces intuitives, une identité visuelle forte et des interactions fluides.',
  },
  {
    id: 'build',
    number: '04',
    title: 'Développer',
    description:
      'Nous développons des plateformes robustes et évolutives selon les meilleurs standards de l’ingénierie logicielle moderne.',
  },
  {
    id: 'launch',
    number: '05',
    title: 'Déployer & Évoluer',
    description:
      'Nous mettons en ligne, mesurons les performances et optimisons en continu pour accompagner durablement votre croissance.',
  },
]
