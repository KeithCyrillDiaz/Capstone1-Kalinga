import mongoose from "mongoose";


const QCGHDonorAppointmentConfigSchema = new mongoose.Schema({
    fullName: {type: Boolean, default: true},
    phoneNumber: {type: Boolean, default: true},
    emailAddress: {type: Boolean, default: true},
    homeAddress: {type: Boolean, default: true},
    milkAmount: {type: Boolean, default: true},
    placeholder: { 
        type: {
            fullName: String,
            phoneNumber: String,
            emailAddress: String,
            homeAddress: String,
            milkAmount: String,
        }, default: {
            fullName: "Full Name",
            phoneNumber: "Phone Number",
            emailAddress: "Email Address",
            homeAddress: "Complete Address",
            milkAmount: "Amount of milk to be donated (ml)",
        }
},
})

const QCGHRequestorAppointmentConfigSchema = new mongoose.Schema({

    fullName: {type: Boolean, default: true},
    phoneNumber: {type: Boolean, default: true},
    emailAddress: {type: Boolean, default: true},
    homeAddress: {type: Boolean, default: true},
    ReasonForRequesting: {type: Boolean, default: true},
    infantInformation: {type: Boolean, default: true},
    childBirthDate: {type: Boolean, default: true},
    milkAmount: {type: Boolean, default: true},
    placeholder: { 
        type: {
            fullName: String,
            phoneNumber: String,
            emailAddress: String,
            homeAddress: String,
            ReasonForRequesting: String,
            childBirthDate: String,
            milkAmount: String,
        }, default: {
            fullName: "Full Name",
            phoneNumber: "Phone Number",
            emailAddress: "Email Address",
            homeAddress: "Complete Address",
            ReasonForRequesting: "Reason for Requesting",
            childBirthDate: "Child Birthday",
            milkAmount: "Amount of Milk to be requested",
        }
    },
    options: {
        type:{
            milkAmount: [String]
        },
        default: {
            milkAmount: ["100ml", "200ml"]
        }
    }
})

export const QCGHDonorAppointmentConfigModel = mongoose.model("DonorConfigurations", QCGHDonorAppointmentConfigSchema);
export const QCGHRequestorAppointmentConfigModel = mongoose.model("RequestorConfigurations", QCGHRequestorAppointmentConfigSchema);

export const createQCGHDonorAppointment = (values = {}) => new QCGHDonorAppointmentConfigModel(values).save().then((result) => result.toObject());
export const createQCGHRequestorAppointment = (values = {}) => new QCGHRequestorAppointmentConfigModel(values).save().then((result) => result.toObject());