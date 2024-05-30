import express, { Request, Response, NextFunction } from 'express';
import AppointmentModel from '../../../models/Donor/DonorSetAppointmentModel';

const updateDonationStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { AppointmentDonorID } = req.params;
  const { DonationStatus } = req.body;
  const { selectedDate } = req.body;
  const { selectedTime } = req.body;

  try {
    const donation = await AppointmentModel.findOneAndUpdate(
      { AppointmentDonorID: AppointmentDonorID }, 
      { $set: {DonationStatus: DonationStatus, selectedDate: selectedDate, selectedTime: selectedTime }}, 
      { new: true }
    );

    console.log('Appointment Donor ID', AppointmentDonorID);
    console.log('Donation Status', DonationStatus);

    if (!donation) {
       res.status(404).json({ error: 'Donation not found' });
       return; // Add return statement to exit the function after sending response
    }

    res.json({ message: 'Donation status updated successfully', donation });

    next()
  } catch (error) {
    console.error('Error updating donation status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { updateDonationStatus };
