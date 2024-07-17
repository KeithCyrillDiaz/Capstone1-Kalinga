import mongoose, { Schema, Document } from 'mongoose';
import randomatic from 'randomatic';
import { RequestorModel } from '../../models/users'; // Adjust the path accordingly

// Define a custom validator for numeric fields
const numericValidator = {
  validator: (value: string) => /^\d+$/.test(value), // Checks if the value contains only digits
  message: 'Only numeric values are allowed.',
};

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
  milkBank: string;
  milkAmount?: string;
  BabyCategory: string;
  ReasonForRequesting: string;
  RequestID: string;
  Date: string;
  Time: string;
  createAt: Date;
  RequestRemark: string;
  barangay?: string; // Include the barangay field
  method: string
  noQCID: string
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
      validator: (value: string) => /^\d+$/.test(value), // Validate using regex for numbers only
      message: 'Phone number must contain only numbers.',
    },
  },
  emailAddress: { type: String, required: true },
  homeAddress: { type: String, required: true },
  city: { type: String, required: true },
  medicalCondition: { type: String },
  milkBank: { type: String, required: true },
  milkAmount: {
    type: String,
    validate: {
      validator: (value: string) => /^\d+$/.test(value), // Validate using regex for numbers only
      message: 'Milk amount must contain only numbers.',
    },
  },
  BabyCategory: { type: String },
  ReasonForRequesting: { type: String, required: true },
  RequestID: { type: String, default: () => randomatic('Aa0', 20) }, // Assuming RequestID is autogenerated
  Date: { type: String },
  Time: { type: String },
  createdAt: { type: Date, default: Date.now },
  RequestRemark: { type: String },
  barangay: { type: String }, // New field for barangay
  method: {type: String},
  noQCID: {type: String},
}, {strict: false});

// Define and export the Mongoose model based on the schema
const RequestModel = mongoose.model<Request>('Request', RequestSchema);

// Function to create a request
export const createRequest = async (requestDetails: Record<string, any>) => {
  const { Requestor_ID, userType } = requestDetails;
  let barangay = '';

  if (userType === 'Requestor') {
    const requestor = await RequestorModel.findOne({ Requestor_ID });
    if (requestor) {
      barangay = requestor.barangay;
    }
  }

  requestDetails.barangay = barangay;
  const request = new RequestModel(requestDetails);
  return request.save().then((req) => req.toObject());
};

// Export existing functions
export const getRequestByRequestID = (id: string) => RequestModel.findOne({ RequestID: id });

// Export the RequestModel
export default RequestModel;
