import express from 'express';
import AppointmentModel from '../../../models/Donor/DonorSetAppointmentModel';

export const getAppointmentByUsertype = async (req: express.Request, res: express.Response) => {
  try {
    console.log(req.params.userType);
    const appointment = await AppointmentModel.find({ userType: req.params.userType });
    res.status(200).json({
      messages: {
        code: 0,
        message: 'Retrieve Successfully'
      },
      appointment 
    });
    
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};