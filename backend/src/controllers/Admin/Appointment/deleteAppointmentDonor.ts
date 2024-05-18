import express, { Request, Response } from 'express';
import  AppointmentModel  from '../../../models/Donor/DonorSetAppointmentModel'; 


export const deleteAppointmentDonor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { AppointmentDonorID } = req.params;
    const appointment = await AppointmentModel.findOneAndDelete({ AppointmentDonorID: AppointmentDonorID });

    if (!appointment) {
       res.status(404).json({ error: 'Donation not found' });
       return; 
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error });
  }
};