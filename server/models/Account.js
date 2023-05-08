import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Not connected to MongoDB:", err);
  });

  const AccountSchema = new mongoose.Schema({
    accountNumber: {
      type: String,
      required: true,
      unique: true,
    },
    accountType: {
      type: String,
      required: true,
      enum: ['savings', 'checking', 'business'],
    },
    accountHolder: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  });
    

const Account = mongoose.model('Account', AccountSchema);
export default Account;