import { z } from 'zod';

export const getTotalAssetsInputSchema = z.record(z.string(), z.never());

export const getTotalAssetsOutputSchema = z
  .object({
    totalAccounts: z.number(),
    totalAssets: z.number(),
  })
  .strict();

export type GetTotalAssetsInputType = z.infer<typeof getTotalAssetsInputSchema>;
export type GetTotalAssetsOutputSchema = z.infer<
  typeof getTotalAssetsOutputSchema
>;
