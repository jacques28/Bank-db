import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Not connected to MongoDB:", err);
  });
  
const userSchema = new mongoose.Schema({
  userID: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', userSchema);

export default User;