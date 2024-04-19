import mongoose from 'mongoose';

const reqMedAbstractFormSchema = new mongoose.Schema({
    Applicant_ID: { type: String },
    clinicalHistory: { type: String },
    complaint: { type: String },
    clinicalFindings: { type: String },
    diagnosis: { type: String },
    treatment: { type: String },

});

export const reqMedAbstractFormModel = mongoose.model('req_MedAbstractForm', reqMedAbstractFormSchema);
export const createReqMedAbstract = (values: Record<string, any>) => new reqMedAbstractFormModel(values).save().then((medAbstract) => medAbstract.toObject())
export const getMedicalAbstractById = (Applicant_ID: string) => reqMedAbstractFormModel.findOne({Applicant_ID})
//export const getReqScreenForm = ( ) => reqScreenFormModel.find();
//export const getRequestorByEmail = (email: string) => reqScreenFormModel.findOne({email});
//export const getReqScreenFormByReqID = (req_ID: string) => reqScreenFormModel.findOne({req_ID});
