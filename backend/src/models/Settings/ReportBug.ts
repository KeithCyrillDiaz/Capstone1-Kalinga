import mongoose from 'mongoose'


const reportBugSchema = new mongoose.Schema({

    ReportBugID: {type: String, required: true},
    DonorOwnerID: {type: mongoose.Schema.Types.ObjectId, ref: "Donor"},
    RequestorOwnerID: {type: mongoose.Schema.Types.ObjectId, ref: "Requestor"},
    topic: {type: String},
    Resolved: {type: String, default: "No"},
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}

})

export const ReportBugModel = mongoose.model("reportBug", reportBugSchema)

export const createReportBugs = (values: Record<string, any>) => new ReportBugModel(values).save().then((result)=> result.toObject())
export const getReportBugsByResolved = (status: string) => ReportBugModel.find({Resolved: status}).populate('DonorOwnerID').populate('RequestorOwnerID')
export const getReportBugsByDonorOwnerId = (id: string) => ReportBugModel.find({DonorOwnerID: id})
export const getReportBugsByRequestorOwnerId = (id: string) => ReportBugModel.find({RequestorOwnerID: id})
export const deleteReportBugsById = (id: string) => ReportBugModel.findOneAndDelete({ReportBugID: id})
export const updateResolvedOfReport = (id: string) => ReportBugModel.findOneAndUpdate({ReportBugID: id}, {$set: {Resolved: "Yes"}}, {new: true})