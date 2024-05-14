import mongoose from "mongoose";
import randomatic from 'randomatic'
import moment from 'moment'

const helpAndSupportSchema = new mongoose.Schema({
    supportId: {type: String, default: () => randomatic('A0', 7) + moment().format("YYYYMMDDHHmmss") },
    RequestorOwnerID: {type: mongoose.Schema.Types.ObjectId, ref: "Requestor"},
    DonorOwnerID: {type: mongoose.Schema.Types.ObjectId, ref: "Donor"},
    name:{type: String},
    userType: {type: String, required: true},
    topic: {type: String, required: true},
    content: {type: String, required: true},
    resolved: {type: String, default: "No"},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

export const HelpAndSupportModel = mongoose.model("HelpAndSupport", helpAndSupportSchema)

export const createHelpAndSupportReport = (values: Record<string, any>) => new HelpAndSupportModel(values).save().then((result) => result.toObject())
export const getHelpAndSupportReportByUserType = (userType: string) => HelpAndSupportModel.find({userType, resolved: "No"})
export const getHelpAndSupportReportByResolved = () => HelpAndSupportModel.find({resolved: "Yes"})
export const updateResolvedById = (id: string) => HelpAndSupportModel.findOneAndUpdate({supportId: id}, {$set: {resolved: "yes", updatedAt: Date.now()}}, {new: true})
export const deleteHelpAndSupportReport = (id: string) => HelpAndSupportModel.findOneAndDelete({supportId: id})