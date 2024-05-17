import { Route } from './index';
import { createTransaction } from '../controllers/transactions/create.controller';
import { getAllTransactions } from '../controllers/transactions/getAll.controller';
import {
  CreateTransactionInputType,
  CreateTransactionOutputSchema,
  createTransactionInputSchema,
  createTransactionOutputSchema,
} from '../schemas/transactions/create.schema';
import {
  GetAllTransactionInputType,
  GetAllTransactionOutputSchema,
  getAllTransactionInputSchema,
  getAllTransactionOutputSchema,
} from '../schemas/transactions/getAll.schema';

const create: Route<CreateTransactionInputType, CreateTransactionOutputSchema> =
  {
    method: 'POST',
    path: '/createTransaction',
    schema: {
      input: createTransactionInputSchema,
      output: createTransactionOutputSchema,
    },
    handler: createTransaction,
    hooks: [
      (req, res, next) => {
        console.log('This is a hook');
        next();
      },
    ],
  };

const getAll: Route<GetAllTransactionInputType, GetAllTransactionOutputSchema> =
  {
    method: 'GET',
    path: '/getTransaction',
    schema: {
      input: getAllTransactionInputSchema,
      output: getAllTransactionOutputSchema,
    },
    handler: getAllTransactions,
  };

export default [create, getAll];

// export default {
//     [Symbol.iterator]: function* () {
//         yield create
//     }
// }
