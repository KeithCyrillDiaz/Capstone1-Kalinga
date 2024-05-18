// Import necessary modules
import { Request, Response } from 'express';
import AppointmentModel from '../../models/Donor/DonorSetAppointmentModel';

// Controller function to fetch request status
export const getDonationStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all requests from the database using Mongoose
    const appointments = await AppointmentModel.find();

    // Check if any requests exist
    if (!appointments || appointments.length === 0) {
      res.status(404).json({ error: 'No requests found' });
      return;
    }

    // For simplicity, let's assume we want the first request's status
    const DonationStatus = appointments[0].DonationStatus;

    // Extract and send the RequestStatus in the response
    res.status(200).json({ RequestStatus: DonationStatus });
  } catch (error) {
    console.error('Error fetching request status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Export the controller function
export default getDonationStatus;
