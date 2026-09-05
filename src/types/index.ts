// Global Entity Types for SPARKLINE Multi-Page Architecture

export interface Project {
  slug: string
  title: string
  client: string
  category: string
  categories?: string[]
  type?: string
  year: string
  summary: string
  description: string
  challenge: string
  solution: string
  impact: string
  deliverables: string[]
  technologies: string[]
  url?: string
  coverImage?: string
  galleryImages?: string[]
  testimonial?: {
    quote: string
    author: string
    role: string
  }
}

export interface ServiceItem {
  slug: string
  number: string
  title: string
  tagline: string
  summary: string
  description: string
  capabilities: string[]
  process: {
    step: string
    title: string
    description: string
  }[]
  technologies: string[]
  deliverables: string[]
  relatedProjects: string[] // project slugs
}

export interface TeamMember {
  slug: string
  name: string
  role: string
  email?: string
  phone?: string
  department?: string
  bio: string
  specialties: string[]
  skills: string[]
  experienceYears: number
  avatar?: string
  socials?: {
    linkedin?: string
    github?: string
    instagram?: string
    twitter?: string
  }
}

export interface Article {
  slug: string
  title: string
  summary: string
  category: string
  author: string
  authorRole: string
  publishedAt: string
  readTime: string
  content: string[]
  tags: string[]
}

export interface Masterclass {
  slug: string
  title: string
  institution: string
  location: string
  date: string
  status: 'upcoming' | 'completed'
  attendeesCount: number
  description: string
  topics: string[]
  speaker?: string
  speakerRole?: string
  speakerAvatar?: string
  coverImage?: string
  category?: string
}

export interface Formation {
  slug: string
  title: string
  level: string
  duration: string
  format: string
  summary: string
  description: string
  curriculum: {
    module: string
    topics: string[]
  }[]
  prerequisites: string[]
}

export interface CareerPosition {
  slug: string
  title: string
  department: string
  type: string
  location: string
  experience: string
  summary: string
  responsibilities: string[]
  requirements: string[]
  perks: string[]
}
