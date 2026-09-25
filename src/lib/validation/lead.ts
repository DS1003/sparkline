import { z } from 'zod'

// Schema for Newsletter Subscription (Footer)
export const newsletterSchema = z.object({
  email: z.string().trim().email('Veuillez fournir une adresse e-mail valide.'),
  source: z.string().optional().default('footer'),
  honeypot: z.string().optional(), // Anti-spam bot trap
})

export type NewsletterInput = z.infer<typeof newsletterSchema>

// Schema for Contact & Project Inquiries (Landing & /contact Page)
export const leadSchema = z.object({
  name: z.string().trim().min(2, 'Le nom doit contenir au moins 2 caractères.'),
  email: z.string().trim().email('Veuillez fournir une adresse e-mail valide.'),
  phone: z.string().trim().optional(),
  company: z.string().trim().optional(),
  services: z.array(z.string()).min(1, 'Veuillez sélectionner au moins un domaine d’intervention.').default(['Applications Web & Mobile']),
  inquiryType: z.string().optional(),
  budget: z.string().optional().default('5M - 15M FCFA'),
  preferredDate: z.string().optional(),
  message: z.string().trim().min(10, 'Votre message doit contenir au moins 10 caractères pour nous permettre de bien cerner votre besoin.'),
  source: z.string().default('landing'),
  honeypot: z.string().optional(), // Anti-spam bot trap
})

export type LeadInput = z.infer<typeof leadSchema>

// Schema for Admin Lead Status & Notes update
export const updateLeadSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'WON', 'ARCHIVED']).optional(),
  internalNotes: z.string().optional(),
})

export type UpdateLeadInput = z.infer<typeof updateLeadSchema>
