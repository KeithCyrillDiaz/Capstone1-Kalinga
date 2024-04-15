import express from 'express';
import  AppointmentModel  from '../../../models/Donor/DonorSetAppointmentModel'; 

export const getAppointmentByDonorID = async (req: express.Request, res: express.Response) => {
  try {
    console.log ("endpoint", req.params)
    const Appointment = await AppointmentModel.findOne({AppointmentDonorID: req.params.AppointmentDonorID});

    console.log("form", Appointment);
    res.json({ Appointment });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

