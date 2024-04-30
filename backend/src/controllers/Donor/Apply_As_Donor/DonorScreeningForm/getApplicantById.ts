import { Request, Response } from 'express';
import { screeningFormModel } from '../../../../models/ApplyAsDonor'; // Import your MongoDB model
import mongoose from 'mongoose';


export const getApplicantById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Extract the id parameter from the request
    console.log('Received ID:', id);

    // Ensure id is in ObjectId format
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidObjectId) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const donor = await screeningFormModel.findById(id); // Use the extracted ID to fetch donor info
    console.log('Retrieved Donor:', donor);

    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    res.status(200).json(donor); // Send the donor information as JSON response
  } catch (error) {
    console.error('Error fetching donor:', error); // Log the error message
    res.status(500).json({ message: 'Server Error' });
  }
};
