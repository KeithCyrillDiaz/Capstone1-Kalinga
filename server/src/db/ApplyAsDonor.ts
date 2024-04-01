import mongoose from 'mongoose';

// const moment = require('moment');
// const currentTime = moment();
// const formattedTime = currentTime.format('YYYY-MM-DD HH:mm:ss');
//console.log(formattedTime);


const screeningFormSchema = new mongoose.Schema({

    Screening_ID: {type: Number},
    Applicant_ID: {type: Number},
    fullName: {type: String},
    Age: {type: String},
    birthday: {type: String},
    email: {type: String},
    address: {type: String},
    contactNumber: {type: String},
    homeAddress: {type: String},

    //Infant Information
    NameOfChild: {type: String},
    BirthWeight: {type: String},
    Sex: {type: String},
    childAge: {type: Number},
    DateOfBirth: {type: String},
    AgeOfGestation: {type: String},
    MedicalCondition: {type: String},

    TypeOfDonor:{type: String},
    QA: {type: String},
    QB: {type: String},
    Q1: {type: String},
    Q2: {type: String},

    // Medical History
    MH1: {type: String},
    MH2: {type: String},
    MH3: {type: String},
    MH4: {type: String},
    MH5: {type: String},
    MH6: {type: String},
    MH7: {type: String},
    MH8: {type: String},
    MH9: {type: String},
    MH10: {type: String},
    MH11: {type: String},
    MH12: {type: String},
    MH13: {type: String},
    MH14: {type: String},

    //SexualHistory
    SH1: {type: String},
    SH2: {type: String},

    //
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
 

});

const imageSchema = new mongoose.Schema({
    fieldname: {type: String}, 
    id: {type: String}, 
    timeStamp: {type: String}, 
    originalname: {type: String}, 
    encoding: {type: String}, 
    mimetype: {type: String}, 
    destination: {type: String}, 
    filename: {type: String}, 
    path: {type: String}, 
    size: {type: Number}, 
    uploadedAt: {type: String}, 
  
})


// interface imageData{
//    [key:string]: {
//         uri: string,
//         name: string,
//         type: string,
//         userType: string
//    }
    
// }

// const imageDataSchema = new mongoose.Schema<imageData>({}, {strict: false})

// export const MedicalRequirementsImagesModel = mongoose.model<imageData>('MedicalRequirements', imageDataSchema)

export const MedicalRequirementsImagesModel = mongoose.model('DonorMRImages', imageSchema)

export const createMedicalRequirementImages = (values: Record<string, any>) => new MedicalRequirementsImagesModel(values).save().then((MedicalRequirements) => MedicalRequirements.toObject())

export const screeningFormModel = mongoose.model('ScreenignForm', screeningFormSchema)
export const createScreeningForm = (values: Record<string, any>) => new screeningFormModel(values).save().then((ScreeningForm) => ScreeningForm.toObject())
export const getScreeningFormByName = (fullName: string) => screeningFormModel.findOne({fullName})
export const getScreeningFormByApplicantID = (Applicant_ID: number) => screeningFormModel.findOne({Applicant_ID})
export const getScreeningFormByMaxApplicantID = () => screeningFormModel.findOne({}).sort({ Applicant_ID: -1 }).limit(1).select('Applicant_ID');
export const getScreeningFormByMaxScreeningID = () => screeningFormModel.findOne({}).sort({ Screening_ID: -1 }).limit(1).select('Screening_ID');
export const getScreeningFormByScreeningID = (Screening_ID: number) => screeningFormModel.findOne({Screening_ID})
//export const deleteUserById = (id: string) => userModel.findOneAndDelete({_id: id})
