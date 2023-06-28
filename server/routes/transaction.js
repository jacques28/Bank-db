import Router from 'express';
import User from '../models/User.js'
import Transaction from '../models/Transaction.js';

const router = Router();

router.get('/', async (req, res) => {
  const { userID } = req.query;

  if (!userID) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  try {
    const transactions = await Transaction.find({ userID });
    res.status(200).json({ success: true, transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching transactions', error });
  }
});

router.post('/', async (req, res) => {
  const { userID, type, amount } = req.body;

  if (!userID || !type || !amount) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ userID });

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    if (type === 'withdraw' && user.balance < amount) {
      return res.status(400).json({ success: false, message: 'Insufficient balance' });
    }

    const newTransaction = new Transaction({ userID, type, amount });
    await newTransaction.save();

    if (type === 'deposit') {
      user.balance += amount;
    } else {
      user.balance -= amount;
    }

    await user.save();

    res.status(201).json({ success: true, message: 'Transaction added successfully', transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding transaction', error });
  }
});



export default router;
