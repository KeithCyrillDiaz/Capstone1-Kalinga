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
            method: String,
        }, default: {
            fullName: "Full Name",
            phoneNumber: "Phone Number",
            emailAddress: "Email Address",
            homeAddress: "Complete Address",
            milkAmount: "Amount of milk to be donated (ml)",
            method: "Method of Delivery",
        }
    },
    options: {
        type:{
            method: [String]
        },
        default: {
            method: [
                "In house", 
                "Pick-Up",
            ]
        }
    }
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
    BabyCategory: {type: Boolean, default: true},


    fields: {
        type:{
            personalInformation:[{
                name: {type: String},
                placeHolder: {type: String},
                fieldBoolean: {type: Boolean}
            }],
            infantInformation: [{
                name: {type: String},
                placeHolder: {type: String},
                fieldBoolean: {type: Boolean}
            }]
        },
        default: {
            personalInformation:[
                {name: "fullName", placeHolder: "Full Name", fieldBoolean: true},
                {name: "phoneNumber", placeHolder: "Phone Number", fieldBoolean: true},
                {name: "emailAddress", placeHolder: "Email Address", fieldBoolean: true},
                {name: "homeAddress", placeHolder: "Complete Address", fieldBoolean: true},
                {name: "ReasonForRequesting", placeHolder: "Reason for Requesting", fieldBoolean: true},
    
            ],
            infantInformation: [
                {name: "childBirthDate", placeHolder: "Child Birthday", fieldBoolean: true},
                {name: "milkAmount", placeHolder: "Amount of Milk to be requested", fieldBoolean: true},
                {name: "BabyCategory", placeHolder: "Select Baby Category", fieldBoolean: true},
            ]
        }
      
    },

    placeholder: { 
        type: {
            fullName: String,
            phoneNumber: String,
            emailAddress: String,
            homeAddress: String,
            ReasonForRequesting: String,
            childBirthDate: String,
            milkAmount: String,
            BabyCategory: String,
            method: String,
        }, default: {
            fullName: "Full Name",
            phoneNumber: "Phone Number",
            emailAddress: "Email Address",
            homeAddress: "Complete Address",
            ReasonForRequesting: "Reason for Requesting",
            childBirthDate: "Child Birthday",
            milkAmount: "Amount of Milk to be requested",
            BabyCategory: "Select Baby Category",
            method: "Method of Delivery",
        }
    },
    options: {
        type:{
            milkAmount: [String],
            BabyCategory: [String],
            method: [{
                title: {type: String},
                Authorized_ID: {type: Boolean}
            }],
        },
        default: {
            milkAmount: ["100ml", "200ml"],
            BabyCategory: [
                "Well Baby", 
                "Sick Baby",
                "Medically Fragile Baby"
            ],
            method: [
                {
                    title: "Authorized Person", 
                    Authorized_ID: true
                },
                {
                    title: "Self Pick-up",
                    Authorized_ID: false
                }
            ]
        }
    }
},{strict: false})

export const QCGHDonorAppointmentConfigModel = mongoose.model("DonorConfigurations", QCGHDonorAppointmentConfigSchema);
export const QCGHRequestorAppointmentConfigModel = mongoose.model("RequestorConfigurations", QCGHRequestorAppointmentConfigSchema);

export const createQCGHDonorAppointment = (values = {}) => new QCGHDonorAppointmentConfigModel(values).save().then((result) => result.toObject());
export const createQCGHRequestorAppointment = (values = {}) => new QCGHRequestorAppointmentConfigModel(values).save().then((result) => result.toObject());