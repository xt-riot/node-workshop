import { Request } from 'express'
import { GetTotalAssetsInputType, GetTotalAssetsOutputSchema } from '../../schemas/accounts/getTotalAssets.schema'

export async function getTotalAssets(request: Request<{}, {}, GetTotalAssetsInputType>): Promise<GetTotalAssetsOutputSchema> {
    const totalBalanceOfAllAccounts = await request.db.getAllAccounts()
    
    return {
        totalAccounts: totalBalanceOfAllAccounts[0].totalAccounts,
        totalAssets: totalBalanceOfAllAccounts[0].totalAssets
    }
}