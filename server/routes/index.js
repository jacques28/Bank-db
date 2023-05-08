import Router from "express";
import Account from '../models/Account.js';
import 'dotenv/config';


/* GET home page. */
const router = Router();


// router.post('/', (req, res) => {
//   console.log('Received POST request:', req.body);
//   res.status(200).send('POST request tracked successfully!');
// });



// router.post('/', function(req, res, next) {
// Account.create(req.body).then(function (account){
//   res.send(account);
// }).catch(next);
// })

router.post('/', async (req, res) => {
  try {
    const { accountNumber, accountType, accountHolder, balance } = req.body;

    if (!accountNumber) {
      return res.status(400).json({ message: 'Account number is required' });
    }

    const existingAccount = await Account.findOne({ accountNumber });

    if (existingAccount) {
      return res.status(400).json({ message: 'Account number already exists' });
    }

    const newAccount = new Account({
      accountNumber,
      accountType,
      accountHolder,
      balance,
    });

    await newAccount.save();

    res.status(201).json({ message: 'Account created successfully', data: newAccount });
  } catch (error) {
    res.status(500).json({ message: 'Error creating account', error });
  }
});


router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.find({});
    res.json(accounts);
  } catch (error) {
    next(error);
  }
});





export default router;
