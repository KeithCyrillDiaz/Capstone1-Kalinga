import mongoose from 'mongoose';

const reqMedAbstractFormSchema = new mongoose.Schema({
    Applicant_ID: { type: String },
    clinicalHistory: { type: String },
    complaint: { type: String },
    clinicalFindings: { type: String },
    diagnosis: { type: String },
    treatmen: { type: String },

});

export const reqMedAbstractFormModel = mongoose.model('req_MedAbstractForm', reqMedAbstractFormSchema);
export const createReqMedAbstract = (values: Record<string, any>) => new reqMedAbstractFormModel(values).save().then((medAbstract) => medAbstract.toObject())
//export const getReqScreenForm = ( ) => reqScreenFormModel.find();
//export const getRequestorByEmail = (email: string) => reqScreenFormModel.findOne({email});
//export const getReqScreenFormByReqID = (req_ID: string) => reqScreenFormModel.findOne({req_ID});
