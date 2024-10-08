import mongoose from 'mongoose';


const screeningFormSchema = new mongoose.Schema({

    Applicant_ID: {type: String},
    Screening_ID: {type: String},
    userType: {type: String},
    isDeleted: {type: String, default: "notDeleted"},
    status: {type: String, default: "Pending"},
    
    fullName: {type: String},
    Age: {type: String},
    birthDate: {type: String},
    email: {type: String},
    contactNumber: {type: String},
    homeAddress: {type: String},
    Municipality:{type: String},
    barangay:{type: String},

    //Infant Information
    childName: {type: String},
    birthWeight: {type: String},
    sex: {type: String},
    childAge: {type: String},
    childBirthDate: {type: String},
    ageOfGestation: {type: String},
    medicalCondition: {type: String},

    typeOfDonor:{type: String},
    QA: {type: String},
    QB: {type: String},
    Q1: {type: String},
    Q2: {type: String},

    // Medical History
    MH1: {type: String},
    MH2: {type: String},
    MH2_Reason: {type: String},
    MH3: {type: String},
    MH4: {type: String},
    MH5: {type: String},
    MH6: {type: String},
    MH7: {type: String},
    MH8: {type: String},
    MH8_Reason: {type: String},
    MH9: {type: String},
    MH10: {type: String},
    MH11: {type: String},
    MH12: {type: String},
    MH13: {type: String},
    MH14: {type: String},
    MH14_Reason: {type: String},
    MH15: {type: String},

    //SexualHistory
    SH1: {type: String},
    SH2: {type: String},

    //Requestor
    RFR: {type: String},
    //
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    

});

const imageSchema = new mongoose.Schema({
    fieldname: { type: String }, 
    originalname: { type: String }, 
    encoding: { type: String }, 
    mimetype: { type: String }, 
    destination: { type: String }, 
    filename: { type: String }, 
    path: { type: String }, 
    size: { type: Number }, 
    link: {type: String},
    gdriveId: {type: String},
    gdriveName: {type: String},
    uploadedAt: { type: String }, 
    userType: { type: String }, // Add userType field if needed
    owner: { type: String }, // Add owner field if needed
    ownerID: { type: String },
    purpose: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

const fileSchema = new mongoose.Schema({
    fieldname: { type: String }, 
    originalname: { type: String }, 
    encoding: { type: String }, 
    mimetype: { type: String }, 
    destination: { type: String }, 
    filename: { type: String }, 
    path: { type: String }, 
    size: { type: Number }, 
    link: {type: String},
    gdriveId: {type: String},
    gdriveName: {type: String},
    uploadedAt: { type: String }, 
    userType: { type: String }, // Add userType field if needed
    owner: { type: String }, // Add owner field if needed
    ownerID: { type: String },
    purpose: { type: String },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});


export const MedicalRequirementsImagesModel = mongoose.model('Images', imageSchema)
export const MedicalRequirementsFilesModel = mongoose.model('Files', fileSchema)
export const screeningFormModel = mongoose.model('Screening Forms', screeningFormSchema)

export const createMedicalRequirementFiles = (values: Record<string, any>) => new MedicalRequirementsFilesModel(values).save().then((MedicalRequirements) => MedicalRequirements.toObject())


export const createMedicalRequirementImages = (values: Record<string, any>) => new MedicalRequirementsImagesModel(values).save().then((MedicalRequirements) => MedicalRequirements.toObject())

export const getMRImage = (ownerID: string, purpose: string) => MedicalRequirementsImagesModel.find({ownerID, purpose})
export const getMRFile = (ownerID: string, purpose: string) => MedicalRequirementsFilesModel.find({ownerID, purpose})
export const deleteMRImages = (ownerID: string, purpose: string) => MedicalRequirementsImagesModel.deleteMany({ownerID, purpose})
export const deleteMRFiles = (ownerID: string, purpose: string) => MedicalRequirementsFilesModel.deleteMany({ownerID, purpose})


export const createScreeningForm = (values: Record<string, any>) => new screeningFormModel(values).save().then((ScreeningForm) => ScreeningForm.toObject())

export const getScreeningFormByUserType = (userType: string) => screeningFormModel.find({userType: userType, isDeleted: {$ne: "Deleted"}})
export const getScreeningFormByName = (fullName: string) => screeningFormModel.findOne({fullName})
export const getScreeningFormByApplicantID = (Applicant_ID: string) => screeningFormModel.findOne({Applicant_ID})
export const getScreeningFormByEmail = (email: string) => screeningFormModel.findOne({email})
export const getEmailValidity = (email: string, status: string) => screeningFormModel.findOne({email, status})
export const updateStatusScreeningForm = (Applicant_ID: string, Status: string) => screeningFormModel.findOneAndUpdate({Applicant_ID}, {$set: {status: Status}}, {new: true})
export const softDeleteScreeningForm = (Applicant_ID: string, Status: string) => screeningFormModel.findOneAndUpdate({Applicant_ID}, {$set: {isDeleted: Status}}, { new: true } ).then((ScreeningForm) => ScreeningForm.toObject())
export const getScreeningFormByMaxApplicantID = () => screeningFormModel.findOne({}).sort({ Applicant_ID: -1 }).limit(1).select('Applicant_ID');
export const getScreeningFormByMaxScreeningID = () => screeningFormModel.findOne({}).sort({ Screening_ID: -1 }).limit(1).select('Screening_ID');
export const getScreeningFormByScreeningID = (Screening_ID: string) => screeningFormModel.findOne({Screening_ID})
export const getScreeningFormByStatusAndUserType = (userType: string, status: string) => screeningFormModel.find({userType, status})
export const updateScreeningFormDetails = (id: string, newDetails: any) => screeningFormModel.findOneAndUpdate({Applicant_ID: id}, {$set: newDetails}, {new: true})

//export const deleteUserById = (id: string) => userModel.findOneAndDelete({_id: id})
