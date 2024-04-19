import mongoose from 'mongoose';

// const moment = require('moment');
// const currentTime = moment();
// const formattedTime = currentTime.format('YYYY-MM-DD HH:mm:ss');
//console.log(formattedTime);


// const DonorSchema = new mongoose.Schema({

//     email: {type: String, required: true},
//     password: {
//             type: String,
//             required: true,
//         },
//     fullName: {type: String},
//     createdAt: {type: Date, default: Date.now},
//     updatedAt: {type: Date, default: Date.now},

// });

const DonorSchema = new mongoose.Schema({

    Donor_ID: {type:  String},
    userName: {type: String},
    MilkAmountDonated: {type: Number},
    fullName: {type: String},
    email: {type: String, required: true},
    password: {
            type: String,
            required: true,
        },
    age: {type: String},
    address: {type: String},
    birthday: {type: String},
    mobileNumber: {type: String},
    homeAddress: {type: String},
    NumberPost: {type: String},
    Badge_ID: { type: [String] },
    Community_ID: { type: [String] },
    Post_ID: { type: [String] },
    BookMark_ID: { type: [String] },
    userType: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});


const RequestorSchema = new mongoose.Schema({

    Requestor_ID: {type: String},
    userName: {type: String},
    MilkAmountReceived: {type: Number},
    fullName: {type: String},
    email: {type: String, required: true},
    password: {
            type: String,
            required: true,
        },
    age: {type: String},
    address: {type: String},
    birthday: {type: String},
    mobileNumber: {type: String},
    homeAddress: {type: String},
    NumberPost: {type: String},
    Badge_ID: { type: [String] },
    Community_ID: { type: [String] },
    Post_ID: { type: [String] },
    BookMark_ID: { type: [String] },
    userType: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});


export const DonorModel = mongoose.model('Donor', DonorSchema)
export const RequestorModel = mongoose.model('Requestor', RequestorSchema)

export const getDonor = () => DonorModel.find()
export const getDonorByEmail = (email: string) => DonorModel.findOne({email})
export const getDonorById = (Donor_ID: string) => DonorModel.findOne({Donor_ID})
export const createDonor = (values: Record<string, any>) => new DonorModel(values).save().then((donor) => donor.toObject())


export const getRequestor = () => RequestorModel.find()
export const getRequestorByEmail = (email: string) => RequestorModel.findOne({email})
export const getRequestorById = (Requestor_ID: string) => RequestorModel.findOne({Requestor_ID})
export const createRequestor = (values: Record<string, any>) => new RequestorModel(values).save().then((donor) => donor.toObject())

//export const deleteUserById = (id: string) => userModel.findOneAndDelete({_id: id})

