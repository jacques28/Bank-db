// import Router from 'express';
// import User from '../models/User.js';
// import 'dotenv/config';

// const router = Router();



// router.post('/', async (req, res) => {
//   try {
//     const { userID } = req.body;

//     if (!userID) {
//       return res.status(400).json({ success: false, message: 'User ID is required' });
//     }

//     const existingUser = await User.findOne({ userID });

//     if (existingUser) {
//       return res.status(400).json({ success: false, message: 'User ID already exists' });
//     }

//     const newUser = new User({ userID });
//     await newUser.save();

//     res.status(201).json({ success: true, message: 'User created successfully', data: newUser });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error creating user', error });
//   }
// });



// router.post('/login', async (req, res) => {
//   try {
//     const { userID } = req.body;

//     if (!userID) {
//       return res.status(400).json({ success: false, message: 'User ID is required' });
//     }

//     const existingUser = await User.findOne({ userID });

//     if (existingUser) {
//       return res.status(200).json({ success: true, message: 'User ID is valid' });
//     } else {
//       return res.status(400).json({ success: false, message: 'Invalid User ID' });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error processing login request', error });
//   }
// });



// export default router;


import Router from 'express';
import Transaction from '../models/Transaction.js';
import 'dotenv/config';
import User from '../models/User.js';

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


router.post('/login', async (req, res) => {
  try {
    const { userID } = req.body;

    if (!userID) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    const existingUser = await User.findOne({ userID });

    if (existingUser) {
      return res.status(200).json({ success: true, message: 'User ID is valid' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid User ID' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error processing login request', error });
  }
});

export default router;
