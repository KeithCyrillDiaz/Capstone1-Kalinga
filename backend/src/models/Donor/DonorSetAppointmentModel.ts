import { time } from 'console';
import mongoose, { Schema, Document } from 'mongoose';
import randomatic from 'randomatic';

export interface Appointment extends Document {
  userType: string;
  AppointmentDonorID: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  homeAddress: string;
  medicalCondition?: string;
  milkAmount?: string;
  selectedDate: string;
  selectedTime: string;
  location: string;
}

const AppointmentSchema: Schema = new Schema({
  userType: { type: String },
  AppointmentDonorID: { type: String, default: () => randomatic('Aa0', 20) },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  homeAddress: { type: String, required: true },
  medicalCondition: String,
  milkAmount: String,
  selectedDate: { type: String, required: true },
  selectedTime: { type: String, required: true },
  location: { type: String, required: true },
});

const AppointmentModel = mongoose.model<Appointment>('Appointment', AppointmentSchema);
export const getAppointmentDonorID = (AppointmentDonorID: string) => AppointmentModel.findOne({AppointmentDonorID})

export default AppointmentModel;