import Router from 'express';
import Branch from '../models/Branch.js';


const router = Router();

router.get('/', async (req, res) => {
  const { city } = req.query;

  try {
    const branches = await Branch.find({ city: { $regex: new RegExp(city, 'i') } });
    res.status(200).json({ success: true, branches });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching branches', error });
  }
});

router.post('/', async (req, res) => {
    const { city, address } = req.body;
  
    if (!city || !address) {
      return res.status(400).json({ success: false, message: 'Both city and address are required' });
    }
  
    try {
      const newBranch = new Branch({ city, address });
      await newBranch.save();
  
      res.status(201).json({ success: true, message: 'Branch added successfully', branch: newBranch });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error adding branch', error });
    }
});
export default router;