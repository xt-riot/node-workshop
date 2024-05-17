import { Mongoose } from 'mongoose';
import { accountModel } from '../database/models/account.model';
import { transactionModel } from '../database/models/transaction.model';

function getAccount(id: string) {
  return accountModel.findOne({ id });
}

function getAllAccounts() {
  return accountModel.aggregate([
    {
      $group: {
        _id: null,
        totalAssets: { $sum: '$balance' },
        totalAccounts: { $count: {} },
      },
    },
  ]);
}

function getTransaction(id: string) {
  return transactionModel.findOne({ id });
}

function getTransactionBySourceAccount(id: string, source: string) {
  return transactionModel.findOne({ id, sourceAccountId: source });
}

function getAllTransactionsBySourceAccount(source: string) {
  return transactionModel.find({ source });
}

function getAllTransactions<T>(options?: T) {
  return transactionModel.find({}, { _id: 0, ...(options ?? {}) });
}

function createAccount(personalInfo: {
  firstName: string;
  lastName: string;
  email: string;
  country?: string;
  currency?: string;
}) {
  return accountModel.create(personalInfo);
}

function createTransaction(
  amount: number,
  currency: string,
  sourceAccountId: string,
  targetAccountId: string
) {
  return transactionModel.create({
    amount,
    currency,
    sourceAccountId,
    targetAccountId,
  });
}

export default {
  getAccount,
  getAllAccounts,
  getTransaction,
  getTransactionBySourceAccount,
  getAllTransactionsBySourceAccount,
  getAllTransactions,
  createAccount,
  createTransaction,
};

export const initialiseDatabase = async (mongoose: Mongoose) => {
  const host = process.env.MONGO_HOST;
  const port = process.env.MONGO_PORT;
  const database = process.env.MONGO_INITDB_DATABASE;
  const user = process.env.MONGO_USER;
  const password = process.env.MONGO_PASSWORD;
  if (!host || !port || !database || !user || !password) {
    throw new Error('Cannot construct the connection to the database.');
  }
  const uri = `mongodb://${host}:${port}/${database}`;
  mongoose.set('strictQuery', false);
  await mongoose.connect(uri, {
    user,
    pass: password,
  });
};
