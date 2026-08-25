import { Article } from '@/types'

export const articlesData: Article[] = [
  {
    slug: 'designing-for-african-digital-economy',
    title: 'Concevoir des produits digitaux pour le prochain milliard d’utilisateurs en Afrique',
    summary: 'Pourquoi la performance brute, les parcours de paiement Mobile Money et la résilience sur faible bande passante sont des fondamentaux incontournables.',
    category: 'UI/UX & Stratégie',
    author: 'Seydina Mouhammad Diop',
    authorRole: 'Lead UI/UX & Full Stack',
    publishedAt: 'Août 2024',
    readTime: '6 min de lecture',
    tags: ['Design UX', 'Tech Afrique', 'Mobile First', 'Stratégie'],
    content: [
      'La transformation digitale en Afrique ne consiste pas à répliquer des formules toutes faites de la Silicon Valley, mais à résoudre des problématiques concrètes et locales avec une empathie sans compromis.',
      'La latence réseau mobile et la diversité des terminaux font que la moindre micro-optimisation du poids frontend dicte directement les taux de conversion commerciale. Un délai de 100 ms peut représenter des milliers de transactions abandonnées.',
      'En intégrant nativement les briques de paiement locales (telles que Wave et Orange Money) et en concevant des interfaces légères privilégiant une typographie lisible et percutante, les produits numériques africains modernes peuvent rivaliser avec les meilleurs standards mondiaux.',
      'Chez SPARKLINE, nous architecturons chaque interface avec une vision edge-first : rapidité fulgurante sur réseaux mobiles contraints, zones d’interaction tactiles intuitives et parcours de conversion sans friction.',
    ],
  },
  {
    slug: 'why-headless-architecture-wins',
    title: 'Pourquoi les marques modernes adoptent le commerce headless avec Next.js',
    summary: 'Une analyse architecturale du découplage entre l’expérience frontend et les monolithes backend pour une vitesse, une sécurité et une liberté créative maximales.',
    category: 'Ingénierie',
    author: 'Serigne Fallou Seck',
    authorRole: 'Architecture Web & DevOps',
    publishedAt: 'Juillet 2024',
    readTime: '5 min de lecture',
    tags: ['Architecture', 'Next.js', 'E-commerce', 'DevOps'],
    content: [
      'Les plateformes e-commerce monolithiques deviennent fréquemment des goulots d’étranglement pour les équipes marketing créatives tout comme pour la vélocité technique des ingénieurs.',
      'Les architectures headless découplent complètement la couche de présentation de la logique métier. En exploitant Next.js App Router à la périphérie (edge), les marques bénéficient de transitions de page instantanées, d’une personnalisation dynamique et d’un référencement naturel d’excellence.',
      'De plus, une architecture headless permet d’intégrer facilement plusieurs processeurs de paiement, des flux d’inventaire en temps réel et des moteurs de recommandation par IA via des API GraphQL ou REST standardisées sans jamais devoir reconstruire le frontend.',
    ],
  },
  {
    slug: 'the-art-of-design-systems',
    title: 'Bâtir des Design Systems pérennes : Des tokens de design au code de production',
    summary: 'Comment les tokens de design unifiés et les bibliothèques de composants partagés réconcilient vision créative et rigueur d’ingénierie logicielle.',
    category: 'Design Systems',
    author: 'Ndiaga Lo',
    authorRole: 'Full Stack & UI Designer',
    publishedAt: 'Juin 2024',
    readTime: '4 min de lecture',
    tags: ['Design Systems', 'Figma', 'Tailwind CSS', 'Frontend'],
    content: [
      'Un design system n’est pas un simple kit UI statique sous Figma ; c’est un contrat de communication vivant entre le design de produit et le développement logiciel.',
      'En définissant des tokens de design centralisés pour les couleurs, échelles typographiques, espacements et courbes d’animation, les organisations éliminent toute incohérence visuelle et accélèrent drastiquement la cadence de déploiement.',
      'Associé à Tailwind CSS et à des bibliothèques de composants modulaires en React, chaque nouvel écran peut être assemblé sans régression visuelle tout en garantissant une accessibilité irréprochable.',
    ],
  },
]

export const insightsRepository = {
  async getAll(): Promise<Article[]> {
    return articlesData
  },
  async getBySlug(slug: string): Promise<Article | null> {
    return articlesData.find((a) => a.slug === slug) || null
  },
  async getFeatured(): Promise<Article[]> {
    return articlesData.slice(0, 2)
  },
  async getByCategory(category: string): Promise<Article[]> {
    if (!category || category === 'All') return articlesData
    return articlesData.filter((a) => a.category.toLowerCase().includes(category.toLowerCase()))
  },
}

export const articlesRepository = insightsRepository

