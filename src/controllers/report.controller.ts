import { Request } from 'express';
import { ReportInputType, ReportOutputType } from '../schemas/report.schema';
import { getTotalAssets } from './accounts/getTotalAssets.controller';
import { getAllTransactions } from './transactions/getAll.controller';

export async function reportController(request: Request<{}, {}, ReportInputType>): Promise<ReportOutputType> {
  const transactions = await getAllTransactions(request);
  const bankAssets = await getTotalAssets(request);

  return {
    ...bankAssets,
    transactions,
  };
}