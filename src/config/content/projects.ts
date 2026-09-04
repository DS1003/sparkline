export interface Project {
  id: string
  title: string
  category: string
  description: string
  year: string
  image?: string
}

export const projects: Project[] = [
  {
    id: 'amfpr',
    title: 'AMFPR',
    category: 'Site Institutionnel',
    description:
      'Une plateforme institutionnelle moderne pour fédérer les femmes engagées de la Présidence de la République du Sénégal autour d\'actions solidaires.',
    year: '2026',
  },
  {
    id: 'ndakaru',
    title: 'NDAKARU',
    category: 'Plateforme E-commerce',
    description:
      'Écosystème e-commerce headless haute performance conçu pour maximiser les conversions mobiles au Sénégal et en Afrique de l’Ouest.',
    year: '2024',
  },
  {
    id: 'teranga',
    title: 'TERANGA',
    category: 'Tableau de bord SaaS',
    description:
      'Plateforme analytique intelligente offrant des métriques financières et opérationnelles en temps réel pour les entreprises régionales.',
    year: '2024',
  },
  {
    id: 'baobab',
    title: 'BAOBAB',
    category: 'Identité de marque & Plateforme',
    description:
      'Identité visuelle complète et plateforme digitale interactive pour une startup fintech innovante.',
    year: '2024',
  },
  {
    id: 'sunu',
    title: 'SUNU',
    category: 'Application Mobile Santé',
    description:
      'Plateforme de santé et téléconsultation connectant patients et professionnels de santé à travers tout le Sénégal.',
    year: '2023',
  },
  {
    id: 'jamm',
    title: 'JAMM',
    category: 'Application Web Collaborative',
    description:
      'Espace de travail et de gestion de projets tout-en-un conçu pour les équipes créatives et d’ingénierie distribuées.',
    year: '2023',
  },
]
