import mongoose from 'mongoose';

const DonorSchema = new mongoose.Schema({

    Donor_ID: {type:  String},
    DPLink:  {type: String},
    Image_ID: {type: String},
    Blocked: {type: String, default: "No"},
    userName: {type: String},
    MilkAmountDonated: {type: Number},
    fullName: {type: String},
    birthDate: {type: String},
    email: {type: String, required: true},
    password: {
            type: String,
            required: true,
        },
    salt: {type: String},
    age: {type: String},
    address: {type: String},
    birthday: {type: String},
    mobileNumber: {type: String},
    homeAddress: {type: String},
    municipality: {type: String},
    NumberPost: {type: String},
    Badge_ID: [{ type: String }],
    Community_ID: [{ type: String }],
    Post_ID: [{ type: String }],
    BookMark_ID: [{ type: String }],
    userType: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});


const RequestorSchema = new mongoose.Schema({

    Requestor_ID: {type: String},
    DPLink:  {type: String},
    Image_ID: {type: String},
    userName: {type: String},
    Blocked: {type: String, default: "No"},
    MilkAmountReceived: {type: Number},
    fullName: {type: String},
    birthDate: {type: String},
    email: {type: String, required: true},
    password: {
            type: String,
            required: true,
        },
    salt: {type: String},
    age: {type: String},
    address: {type: String},
    birthday: {type: String},
    mobileNumber: {type: String},
    homeAddress: {type: String},
    municipality: {type: String},
    RFR: {type: String},
    NumberPost: {type: String},
    Badge_ID: [{ type: String }],
    Community_ID: [{ type: String }],
    Post_ID: [{ type: String }],
    BookMark_ID: [{ type: String }],
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
export const updateDonorPassword = (Donor_ID: string, Password: string, salt: string) => DonorModel.findOneAndUpdate({Donor_ID}, { $set: { password: Password, salt: salt, updatedAt: Date.now()} }, { new: true })
export const updateDonorDetails = (Donor_ID: string, userDetails: any) => DonorModel.findOneAndUpdate({Donor_ID}, { $set: userDetails }, { new: true })
export const updateDonorProfilePic = (Donor_ID: string, link: string, id: string) => DonorModel.findOneAndUpdate({Donor_ID}, { $set: {DPLink: link, Image_ID: id} }, { new: true })
export const BlockedDonor = (Donor_ID: string) => DonorModel.findOneAndUpdate({Donor_ID}, {$set: {Blocked: "Yes"}}, {new: true})
export const getBlockedDonors = () => DonorModel.find({Blocked: "Yes"})


export const getRequestor = () => RequestorModel.find()
export const updateRequestorPassword=(Requestor_ID: string, Password: string, salt: string) => RequestorModel.findOneAndUpdate({Requestor_ID}, { $set: { password: Password, salt: salt } }, { new: true })
export const updateRequestorDetails=(Requestor_ID: string, userDetails: any) => RequestorModel.findOneAndUpdate({Requestor_ID}, { $set: userDetails }, { new: true })
export const updateRequestorProfilePic = (Requestor_ID: string, link: string, id: string) => RequestorModel.findOneAndUpdate({Requestor_ID}, { $set: {DPLink: link, Image_ID: id} }, { new: true })
export const getRequestorByEmail = (email: string) => RequestorModel.findOne({email})
export const getRequestorById = (Requestor_ID: string) => RequestorModel.findOne({Requestor_ID})
export const createRequestor = (values: Record<string, any>) => new RequestorModel(values).save().then((donor) => donor.toObject())
export const getBlockedRequestors = () => RequestorModel.find({Blocked: "Yes"})
export const BlockedRequestor = (Requestor_ID: string) => RequestorModel.findOneAndUpdate({Requestor_ID}, {$set: {Blocked: "Yes"}}, {new: true})

//export const deleteUserById = (id: string) => userModel.findOneAndDelete({_id: id})

