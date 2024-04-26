import mongoose from 'mongoose'


const PostSchema = new mongoose.Schema({

    post_ID: {type: String, required: true},
    DonorOwnerID: {type: mongoose.Schema.Types.ObjectId, ref: "Donor"},
    RequestorOwnerID: {type: mongoose.Schema.Types.ObjectId, ref: "Requestor"},
    content:  {type: String},
    DonorLikes: [{type: mongoose.Schema.Types.ObjectId, ref: "Donor"}],
    RequestorLikes: [{type: mongoose.Schema.Types.ObjectId, ref: "Requestor"}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})

export const PostModel = mongoose.model('Posts', PostSchema)

export const createPost = (values: Record<string, any>) => new PostModel(values).save().then((result) => result.toObject())
export const deletePost = (post_ID: string) => PostModel.findOneAndDelete({post_ID: post_ID})
export const getPosts = () => PostModel.find().populate('DonorOwnerID').populate('RequestorOwnerID').populate('DonorLikes').populate('RequestorLikes');
export const getPostsById = (post_ID: string) => PostModel.findOne({post_ID})
export const updateDonorLikes = (post_ID: string, Donor_id: mongoose.Types.ObjectId, time: Date) => PostModel.findOneAndUpdate({post_ID}, {$push: {DonorLikes: Donor_id}, $set: {updatedAt: time}}, {new:true})
export const removeDonorLikes = (post_ID: string, Donor_id: mongoose.Types.ObjectId, time: Date) => PostModel.findOneAndUpdate({post_ID}, {$pull: {DonorLikes: Donor_id}, $set: {updatedAt: time}}, {new:true})
export const updateRequestorLikes = (post_ID: string, Requestor_id: mongoose.Types.ObjectId, time: Date) => PostModel.findOneAndUpdate({post_ID}, {$push: {RequestorLikes: Requestor_id}, $set: {updatedAt: time}}, {new:true})
export const removeRequestorLikes = (post_ID: string, Requestor_id: mongoose.Types.ObjectId, time: Date) => PostModel.findOneAndUpdate({post_ID}, {$pull: {RequestorLikes: Requestor_id}, $set: {updatedAt: time}}, {new:true})

const CommentSchema = new mongoose.Schema ({
    
    post_ID: {type: String, required: true},
    comment_ID: {type: String, required: true},
    content: {type: String},
    DonorOwnerID: {type: mongoose.Schema.Types.ObjectId, ref: "Donor"},
    RequestorOwnerID: {type: mongoose.Schema.Types.ObjectId, ref: "Requestor"},
    DonorLikes: [{type: mongoose.Schema.Types.ObjectId, ref: "Donor"}],
    RequestorLikes: [{type: mongoose.Schema.Types.ObjectId, ref: "Requestor"}],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},

})

export const CommentModel = mongoose.model("comment", CommentSchema)
export const createComment = (values: Record<string, any>) => new CommentModel(values).save().then((result) => result.toObject())
export const deleteComment = (comment_ID: string) => CommentModel.findOneAndDelete({comment_ID})
export const getCommentsByPost_ID = (post_ID: string) => CommentModel.find({post_ID}).populate('DonorOwnerID').populate('RequestorOwnerID').populate("DonorLikes").populate("RequestorLikes");
export const getCommentById = (comment_ID: string) => CommentModel.findOne({comment_ID})
export const updateCommentDonorLikes = (comment_ID: string, Donor_Id: mongoose.Types.ObjectId, time: Date) => CommentModel.findOneAndUpdate({comment_ID}, {$push: {DonorLikes: Donor_Id}, $set: {updatedAt: time}}, {new: true})
export const removeCommentDonorLikes = (comment_ID: string, Donor_Id: mongoose.Types.ObjectId, time: Date) => CommentModel.findOneAndUpdate({comment_ID}, {$pull: {DonorLikes: Donor_Id}, $set: {updatedAt: time}}, {new: true})
export const updateCommentRequestorLikes = (comment_ID: string, Requestor_Id: mongoose.Types.ObjectId, time: Date) => CommentModel.findOneAndUpdate({comment_ID}, {$push: {RequestorLikes: Requestor_Id}, $set: {updatedAt: time}},  {new: true})
export const removeCommentRequestorLikes = (comment_ID: string, Requestor_Id: mongoose.Types.ObjectId, time: Date) => CommentModel.findOneAndUpdate({comment_ID}, {$pull: {RequestorLikes: Requestor_Id}, $set: {updatedAt: time}},  {new: true})