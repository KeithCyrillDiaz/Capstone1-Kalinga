import express from 'express';
import { screeningFormModel } from '../db/screeningForms'; // Import your MongoDB model

const router = express.Router();

// API endpoint to get all screening forms
router.get('/getScreeningForms', async (req, res) => {
  try {
    const screeningForms = await screeningFormModel.find(); // Fetch all screening forms
    res.status(200).json(screeningForms); // Send the screening forms as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
