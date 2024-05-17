import { z } from 'zod'

export const createAccountInputSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    country: z.string().optional()
}).strict()

export const createAccountOutputSchema = z.string()

export type CreateAccountInputType = z.infer<typeof createAccountInputSchema>
export type CreateAccountOutputType = z.infer<typeof createAccountOutputSchema>