import { Request } from 'express';
import {
  CreateTransactionInputType,
  CreateTransactionOutputSchema,
} from '../../schemas/transactions/create.schema';

export async function createTransaction(
  request: Request<{}, {}, CreateTransactionInputType>
): Promise<CreateTransactionOutputSchema> {
  const source = await request.db.getAccount(request.body.sourceAccountId);
  const target = await request.db.getAccount(request.body.targetAccountId);

  if (!source || !target) {
    throw new Error('Source or target account not found');
  }

  if (source.currency !== target.currency) {
    throw new Error('Currency mismatch');
  }

  if (source.balance < request.body.amount) {
    throw new Error('Insufficient funds');
  }
  source.balance -= request.body.amount;
  target.balance += request.body.amount;
  await request.db.createTransaction(
    request.body.amount,
    request.body.currency || 'EUR',
    request.body.sourceAccountId,
    request.body.targetAccountId
  );
  await source.save();
  await target.save();

  return true;
}
