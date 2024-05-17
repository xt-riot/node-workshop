import { Request } from 'express';
import { GetAllTransactionInputType, GetAllTransactionOutputSchema } from '../../schemas/transactions/getAll.schema';

export async function getAllTransactions(request: Request<{}, {}, GetAllTransactionInputType>): Promise<GetAllTransactionOutputSchema> {
  const transactions = await request.db.getAllTransactions({
    // currency: 1, // uncomment to get currency in the response
    amount: 1,
    sourceAccountId: 1,
    targetAccountId: 1,
    createdAt: 1,
  });

  return transactions.map(transaction => transaction.toJSON());
}