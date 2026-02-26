import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  subject: z
    .string()
    .min(4, 'Subject must be at least 4 characters')
    .max(200, 'Subject is too long'),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(5000, 'Message is too long'),
})

export type ContactSchema = z.infer<typeof contactSchema>
