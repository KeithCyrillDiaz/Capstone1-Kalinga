import mongoose from 'mongoose'
import randomatic from 'randomatic'
import moment from 'moment'

const feedBackSchema = new mongoose.Schema({
    
    feedBack_ID: {type: String, default: () => randomatic('A0', 7) + moment().format("YYYYMMDDHHmmss") },
    RequestorOwnerID: {type: mongoose.Schema.Types.ObjectId, ref: "Requestor"},
    DonorOwnerID: {type: mongoose.Schema.Types.ObjectId, ref: "Donor"},
    userType: {type: String, required: true},
    stars: {type: Number},
    content: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}

})

export const FeedBackModel = mongoose.model("FeedBack", feedBackSchema)

export const createFeedBack = (values: Record<string, any>) => new FeedBackModel(values).save().then((result) => result.toObject())
export const getFeedBackByUserType = (userType: string) => FeedBackModel.find({userType}).populate("RequestorOwnerID").populate("DonorOwnerID")
export const getDonorFeedbacksByStars = (num: number) => FeedBackModel.find({starts: num}).populate("DonorOwnerID")
export const getRequestorFeedbacksByStars = (num: number) => FeedBackModel.find({starts: num}).populate("RequestorOwnerID")

// feedBackSchema.pre('save', function(next) {
//     const timestamp = moment().format("YYYYMMDDHHmmss"); // Current timestamp
//     const randomString = randomatic('A0', 7);
//     this.feedBack_ID = randomString + timestamp;
//     next();
// });