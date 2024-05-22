import { Request, Response } from 'express';
import AppointmentModel from '../../../models/Donor/DonorSetAppointmentModel';

export const getTotalPendingAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
    const pendingCount = await AppointmentModel.countDocuments({ DonationStatus: 'Pending' });
    res.status(200).json({ totalPendingAppointments: pendingCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending appointments count', error });
  }
};