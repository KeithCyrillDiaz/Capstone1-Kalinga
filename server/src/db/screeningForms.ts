import mongoose from 'mongoose';

// const moment = require('moment');
// const currentTime = moment();
// const formattedTime = currentTime.format('YYYY-MM-DD HH:mm:ss');
//console.log(formattedTime);


const screeningFormSchema = new mongoose.Schema({

    //Personal Information
    fullName: {type: String},
    Screening_ID: {type: Number},
    Applicant_ID: {type: Number},
    CompleteName: {type: String},
    email:{type: String},
    parentAge: {type: String},
    address: {type: String},
    birthday: {type: String},
    contactNumber: {type: String},
    homeAddress: {type: String},

    //Infant Information
    NameOfChild: {type: String},
    childAge: {type: String},
    Sex: {type: String},
    DateOfBirth: {type: String},
    BirthWeight: {type: String},
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


// const tokenSchema = new mongoose.Schema({

//     token: {type: String},
//     createdAt: { type: Date},
//     expiry: {type:String} 
 

// });

// const adminSchema = new mongoose.Schema({

//     username: {type: String},
//     password: {type: String},
 
// });


export const screeningFormModel = mongoose.model('ScreenignForm', screeningFormSchema)
export const createScreeningForm = (values: Record<string, any>) => new screeningFormModel(values).save().then((ScreeningForm) => ScreeningForm.toObject())
export const getScreeningFormByApplicantID = (Applicant_ID: string) => screeningFormModel.findOne({Applicant_ID})
//export const deleteUserById = (id: string) => userModel.findOneAndDelete({_id: id})
