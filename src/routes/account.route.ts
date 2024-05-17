import { Route } from './index';
import { createAccount } from '../controllers/accounts/create.controller';
import { getTotalAssets } from '../controllers/accounts/getTotalAssets.controller';
import { CreateAccountInputType, CreateAccountOutputType, createAccountInputSchema, createAccountOutputSchema } from '../schemas/accounts/create.schema';
import { GetTotalAssetsInputType, GetTotalAssetsOutputSchema, getTotalAssetsInputSchema, getTotalAssetsOutputSchema } from '../schemas/accounts/getTotalAssets.schema';

const create: Route<CreateAccountInputType, CreateAccountOutputType> = {
  method: 'POST',
  path: '/createAccount',
  schema: {
    input: createAccountInputSchema,
    output: createAccountOutputSchema,
  },
  handler: createAccount,
  hooks: [
    (req, res, next) => {
      console.log('This is a hook');
      next();
    },
  ],
};

const getBankAssets: Route<GetTotalAssetsInputType, GetTotalAssetsOutputSchema> = {
  method: 'GET',
  path: '/getTotalAssets',
  schema: {
    input: getTotalAssetsInputSchema,
    output: getTotalAssetsOutputSchema,
  },
  handler: getTotalAssets,
};

export default [
  create,
  getBankAssets,
];