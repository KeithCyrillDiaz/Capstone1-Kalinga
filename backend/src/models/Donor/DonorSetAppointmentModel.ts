import mongoose, { Schema, Document } from 'mongoose';
import randomatic from 'randomatic';
import { DonorModel, RequestorModel } from '../../models/users'; // Adjust the path accordingly

// Define a custom validator for numeric fields
const numericValidator = {
  validator: (value: string) => /^\d+$/.test(value), // Checks if the value contains only digits
  message: 'Only numeric values are allowed.',
};

export interface Appointment extends Document {
  Donor_ID: string;
  userType: string;
  AppointmentDonorID: string;
  DonationStatus: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  city: string;
  homeAddress: string;
  barangay?: string;
  medicalCondition?: string;
  milkAmount?: string;
  selectedDate: string;
  selectedTime: string;
  location: string;
  createdAt: Date;
  DonorRemark: string;
  method: string;
}

const AppointmentSchema: Schema = new Schema({
  Donor_ID: { type: String, default: () => randomatic('Aa0', 20) },
  userType: { type: String },
  AppointmentDonorID: { type: String, default: () => randomatic('Aa0', 20) },
  DonationStatus: { type: String },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true, validate: numericValidator },
  emailAddress: { type: String, required: true },
  homeAddress: { type: String, required: true },
  city: { type: String, required: true },
  barangay: { type: String }, // New field for barangay
  medicalCondition: String,
  milkAmount: { type: String, required: true, validate: numericValidator },
  selectedDate: { type: String, required: true },
  selectedTime: { type: String, required: true },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  DonorRemark: { type: String },
  method: { type: String }
});

const AppointmentModel = mongoose.model<Appointment>('Appointment', AppointmentSchema);

export const getAppointmentByDonorID = (AppointmentDonorID: string) =>
  AppointmentModel.findOne({ AppointmentDonorID });

export const createAppointment = async (appointmentDetails: Record<string, any>) => {
  const { Donor_ID, userType } = appointmentDetails;
  let barangay = '';

  if (userType === 'Donor') {
    const donor = await DonorModel.findOne({ Donor_ID });
    if (donor) {
      barangay = donor.barangay;
    }
  } else if (userType === 'Requestor') {
    const requestor = await RequestorModel.findOne({ Requestor_ID: Donor_ID });
    if (requestor) {
      barangay = requestor.barangay;
    }
  }

  appointmentDetails.barangay = barangay;
  const appointment = new AppointmentModel(appointmentDetails);
  return appointment.save().then((appt) => appt.toObject());
};

export default AppointmentModel;
