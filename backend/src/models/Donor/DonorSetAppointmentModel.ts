import mongoose, { Schema, Document } from 'mongoose';
import randomatic from 'randomatic';

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
  phoneNumber: string; // Changed from String to { type: String, required: true, validate: numericValidator }
  emailAddress: string;
  city: string;
  homeAddress: string;
  medicalCondition?: string;
  milkAmount?: string; // Changed from String to { type: String, required: true, validate: numericValidator }
  selectedDate: string; 
  selectedTime: string;
  location: string;
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
  medicalCondition: String,
  milkAmount: { type: String, required: true, validate: numericValidator },
  selectedDate: { type: String, required: true },
  selectedTime: { type: String, required: true },
  location: { type: String, required: true },
});

const AppointmentModel = mongoose.model<Appointment>('Appointment', AppointmentSchema);
export const getAppointmentByDonorID = (AppointmentDonorID: string) =>
  AppointmentModel.findOne({ AppointmentDonorID });

export default AppointmentModel;
