import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Not connected to MongoDB:", err);
  });

const transactionSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  type: { type: String, required: true, enum: ['deposit', 'withdraw'] },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
