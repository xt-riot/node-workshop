import { z } from 'zod';

export const createTransactionInputSchema = z
  .object({
    amount: z.number().positive(),
    currency: z.string().optional(),
    sourceAccountId: z.string(),
    targetAccountId: z.string(),
  })
  .strict()
  .refine(
    ({ sourceAccountId, targetAccountId }) =>
      sourceAccountId !== targetAccountId,
    {
      message: 'the same as targetAccountId. Those must be different',
      path: ['sourceAccountId'],
    }
  );

export const createTransactionOutputSchema = z.boolean();

export type CreateTransactionInputType = z.infer<
  typeof createTransactionInputSchema
>;
export type CreateTransactionOutputSchema = z.infer<
  typeof createTransactionOutputSchema
>;
