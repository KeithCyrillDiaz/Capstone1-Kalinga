import { Request, Response } from 'express';
import AppointmentModel from '../../models/Donor/DonorSetAppointmentModel';

export const getCompleteDonationsTotal = async (req: Request, res: Response) => {
  try {
    const totalCompleteDonations = await AppointmentModel.countDocuments({ DonationStatus: 'Complete' });
    res.json({ totalCompleteDonations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching total complete donations' });
  }
};

export const getDeclinedDonationsTotal = async (req: Request, res: Response) => {
  try {
    const totalDeclinedDonations = await AppointmentModel.countDocuments({ DonationStatus: 'Decline' });
    res.json({ totalDeclinedDonations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching total declined donations' });
  }
};
