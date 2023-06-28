import Router from 'express';
import User from '../models/User.js';

const router = Router();

router.get('/', async (req, res) => {
  const { userID } = req.query;

  if (!userID) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  try {
    const user = await User.findOne({ userID });

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, balance: user.balance });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching balance', error });
  }
});

export default router;

