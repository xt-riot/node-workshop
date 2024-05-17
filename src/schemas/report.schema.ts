import { z } from 'zod'
import { getTotalAssetsOutputSchema } from './accounts/getTotalAssets.schema'
import { getAllTransactionOutputSchema } from './transactions/getAll.schema'

export const reportInputSchema = z.record(z.string(), z.never())

export const reportOutputSchema = z.intersection(getTotalAssetsOutputSchema, z.object({
    transactions: getAllTransactionOutputSchema
}).strict())

export type ReportInputType = z.infer<typeof reportInputSchema>
export type ReportOutputType = z.infer<typeof reportOutputSchema>