import { z } from 'zod';

export const getAllTransactionInputSchema = z.record(z.string(), z.never());

export const getAllTransactionOutputSchema = z.array(
  z
    .object({
      amount: z.number(),
      currency: z.string(),
      sourceAccountId: z.string(),
      targetAccountId: z.string(),
      createdAt: z.date(),
    })
    .strict()
);

export type GetAllTransactionInputType = z.infer<
  typeof getAllTransactionInputSchema
>;
export type GetAllTransactionOutputSchema = z.infer<
  typeof getAllTransactionOutputSchema
>;
