import mongoose, { Schema, Document } from 'mongoose';
import randomatic from 'randomatic';

// Define the interface for the request document
export interface Request extends Document {
  Requestor_ID: string;
  userType: string;
  RequestStatus: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  homeAddress: string;
  city: string;
  medicalCondition?: string;
  milkAmount?: string;
  BabyCategory: string;
  ReasonForRequesting: string;
  RequestID: string;

}

// Define the Mongoose schema for the request
const RequestSchema: Schema = new Schema({
  Requestor_ID: { type: String, default: () => randomatic('Aa0', 20) },
  userType: { type: String },
  RequestStatus: { type: String },
  fullName: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => /^[0-9]+$/.test(value), // Validate using regex for numbers only
      message: 'Phone number must contain only numbers.',
    },
  },
  emailAddress: { type: String, required: true },
  homeAddress: { type: String, required: true },
  city: { type: String, required: true },
  medicalCondition: String,
  milkAmount: {
    type: String,
    validate: {
      validator: (value: string) => /^[0-9]+$/.test(value), // Validate using regex for numbers only
      message: 'Milk amount must contain only numbers.',
    },
  },
  BabyCategory: { type: String, required: true },
  ReasonForRequesting: { type: String, required: true },
  RequestID: { type: String, default: () => randomatic('Aa0', 20) }, // Assuming RequestID is autogenerated
});

// Define and export the Mongoose model based on the schema
const RequestModel = mongoose.model<Request>('Request', RequestSchema);

export default RequestModel;
