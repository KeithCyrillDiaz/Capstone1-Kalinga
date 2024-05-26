import { Request, Response } from 'express';
import AppointmentModel, { Appointment } from '../../models/Donor/DonorSetAppointmentModel';
import { DonorModel, RequestorModel } from '../../models/users';

const createAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      method,
      city,
      Donor_ID,
      DonationStatus,
      userType,
      AppointmentDonorID,
      fullName,
      phoneNumber,
      emailAddress,
      homeAddress,
      medicalCondition,
      milkAmount,
      location,
      DonorRemark,
      barangay
    } = req.body;

    // Retrieve barangay if not provided
    let userBarangay = barangay;
    if (!userBarangay) {
      if (userType === 'Donor') {
        const donor = await DonorModel.findOne({ Donor_ID });
        if (donor) {
          userBarangay = donor.barangay;
        }
      } else if (userType === 'Requestor') {
        const requestor = await RequestorModel.findOne({ Requestor_ID: Donor_ID });
        if (requestor) {
          userBarangay = requestor.barangay;
        }
      }
    }

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
      method,
      selectedDate: new Date(),
      selectedTime: new Date(),
      location,
      DonorRemark,
      barangay: userBarangay // Ensure barangay is included here
    });

    res.status(201).json(newAppointment);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
};

export { createAppointment };
