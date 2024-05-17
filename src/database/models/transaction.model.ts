import mongoose from 'mongoose';
import uuidv9 from 'uuid-v9';

const transactionDatabaseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, default: () => uuidv9() },
  amount: { type: Number, required: true },
  currency: { type: String, required: true, default: 'EUR' },
  sourceAccountId: { type: String, required: true },
  targetAccountId: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

export const transactionModel = mongoose.model('Transaction', transactionDatabaseSchema);