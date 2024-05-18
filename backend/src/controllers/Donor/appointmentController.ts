import { Request, Response } from 'express';
import AppointmentModel, { Appointment } from '../../models/Donor/DonorSetAppointmentModel';
import randomatic from 'randomatic'

// Controller to create a new appointment
const createAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const {city, Donor_ID,DonationStatus, userType, AppointmentDonorID, fullName, phoneNumber, emailAddress, homeAddress, medicalCondition, milkAmount, location, DonorRemark} = req.body;
   

    const newAppointment: Appointment = await AppointmentModel.create({
      Donor_ID,
      DonationStatus,
      userType,
      AppointmentDonorID,
      fullName,
      phoneNumber,
      emailAddress,
      homeAddress,
      city,
      medicalCondition,
      milkAmount,
      selectedDate: new Date(),
      selectedTime: new Date(),
      location,
      DonorRemark

    });

    res.status(201).json(newAppointment);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
};


export { createAppointment };
