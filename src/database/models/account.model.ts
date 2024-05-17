import mongoose from 'mongoose';
import uuidv9 from 'uuid-v9';

const accountDatabaseSchema = new mongoose.Schema({
  id: { type: String, default: () => uuidv9(), unique: true },
  balance: { type: Number, required: true, default: 0 },
  currency: { type: String, required: true, default: 'EUR' },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: false },
  createdAt: { type: Date, required: true, default: Date.now },
});

export const accountModel = mongoose.model('Account', accountDatabaseSchema);