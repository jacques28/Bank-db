import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Not connected to MongoDB:", err);
  });
  
const balanceSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Balance = mongoose.model('Balance', balanceSchema);

export default Balance;
