import { Request, Response } from 'express';
import AppointmentModel from '../../../models/Donor/DonorSetAppointmentModel';

export const updateOngoingDonation = async (req: Request, res: Response) => {
  const { AppointmentDonorID } = req.params;

  try {
    // Find the appointment by AppointmentDonorID and update DonationStatus
    const updatedAppointment = await AppointmentModel.findOneAndUpdate(
      { AppointmentDonorID: AppointmentDonorID },
      { $set: { DonationStatus: 'Ongoing' } },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'DonationStatus updated to Ongoing', appointment: updatedAppointment });
  } catch (error) {
    console.error('Error updating DonationStatus:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
