import { Request } from 'express';
import { CreateAccountInputType, CreateAccountOutputType } from '../../schemas/accounts/create.schema';

export async function createAccount(request: Request<{}, {}, CreateAccountInputType>): Promise<CreateAccountOutputType> {
  const createdAccount = await request.db.createAccount({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    country: request.body.country,
  });
    
  return createdAccount.toJSON().id;
}