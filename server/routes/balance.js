import Router from 'express';
import Balance from '../models/Balance.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const balanceData = await Balance.findOne({ userID: req.query.userID });
    if (balanceData) {
      res.status(200).json({ success: true, balance: balanceData.balance });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching balance', error });
  }
});

router.post('/', async (req, res) => {
    try {
      const { userID, amount } = req.body;
  
      if (!userID) {
        return res.status(400).json({ success: false, message: 'User ID is required' });
      }
  
      if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ success: false, message: 'Valid amount is required' });
      }
  
      const balanceData = await Balance.findOne({ userID });
  
      if (balanceData) {
        balanceData.balance += amount;
        await balanceData.save();
        res.status(200).json({ success: true, balance: balanceData.balance });
      } else {
        const newBalance = new Balance({
          userID,
          balance: amount,
        });
        await newBalance.save();
        res.status(201).json({ success: true, balance: newBalance.balance });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error adding balance', error });
    }
  });


export default router;
