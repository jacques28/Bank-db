import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Not connected to MongoDB:", err);
  });

const branchSchema = new mongoose.Schema({
  city: String,
  address: String,
});

const Branch = mongoose.model('Branch', branchSchema);

export default Branch;
