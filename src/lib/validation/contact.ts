import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  inquiryType: z.enum(['project', 'general', 'training', 'partnership', 'career'], {
    required_error: 'Please select an inquiry type.',
  }),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
