import mongoose from 'mongoose'
import { ppid } from 'process'


const PostSchema = new mongoose.Schema({

    post_ID: {type: String, required: true},
    DonorOwnerID: {type: mongoose.Schema.Types.ObjectId, ref: "Donor"},
    RequestorOwnerID: {type: mongoose.Schema.Types.ObjectId, ref: "Requestor"},
    content:  {type: String},
    DonorLikes: [{type: mongoose.Schema.Types.ObjectId, ref: "Donor"}],
    RequestorLikes: [{type: mongoose.Schema.Types.ObjectId, ref: "Requestor"}],
    comments_ID: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
    status: {type: String, default: "Pending"},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})

export const PostModel = mongoose.model('Posts', PostSchema)

export const createPost = (values: Record<string, any>) => new PostModel(values).save().then((result) => result.toObject())
export const deletePost = (post_ID: string) => PostModel.findOneAndDelete({post_ID: post_ID})
export const approvedPost = (id: string ) => PostModel.findOneAndUpdate({post_ID: id}, {$set: {status: "Approved"}}, {new: true})
export const getPosts = () => PostModel.find({status: "Approved"})
    .populate('DonorOwnerID')
    .populate('RequestorOwnerID')
    .populate('DonorLikes')
    .populate('RequestorLikes')
    .populate({
        path: 'comments_ID',
        populate: [
            { path: 'DonorOwnerID' },
            { path: 'RequestorOwnerID' },
            { path: 'DonorLikes' },
            { path: 'RequestorLikes' }
        ]
    });

    export const getAllPosts = () => PostModel.find()
    .populate('DonorOwnerID')
    .populate('RequestorOwnerID')
    .populate('DonorLikes')
    .populate('RequestorLikes')
    .populate({
        path: 'comments_ID',
        populate: [
            { path: 'DonorOwnerID' },
            { path: 'RequestorOwnerID' },
            { path: 'DonorLikes' },
            { path: 'RequestorLikes' }
        ]
    });


export const getPostsById = (post_ID: string) => PostModel.findOne({post_ID})
export const updateDonorLikes = (post_ID: string, Donor_id: mongoose.Types.ObjectId, time: Date) => PostModel.findOneAndUpdate({post_ID}, {$push: {DonorLikes: Donor_id}, $set: {updatedAt: time}}, {new:true})
export const removeDonorLikes = (post_ID: string, Donor_id: mongoose.Types.ObjectId, time: Date) => PostModel.findOneAndUpdate({post_ID}, {$pull: {DonorLikes: Donor_id}, $set: {updatedAt: time}}, {new:true})
export const updateRequestorLikes = (post_ID: string, Requestor_id: mongoose.Types.ObjectId, time: Date) => PostModel.findOneAndUpdate({post_ID}, {$push: {RequestorLikes: Requestor_id}, $set: {updatedAt: time}}, {new:true})
export const removeRequestorLikes = (post_ID: string, Requestor_id: mongoose.Types.ObjectId, time: Date) => PostModel.findOneAndUpdate({post_ID}, {$pull: {RequestorLikes: Requestor_id}, $set: {updatedAt: time}}, {new:true})
export const updateCommentOnPost = (post_ID: string, comment_id: mongoose.Types.ObjectId, time: Date) => PostModel.findOneAndUpdate({post_ID}, {$push:{comments_ID: comment_id}, $set: {updatedAt: time}}, {new: true})
export const removeCommentOnPost = (post_ID: string, comment_id: mongoose.Types.ObjectId, time: Date) => PostModel.findOneAndUpdate({post_ID}, {$pull: {comments_ID: comment_id}, $set: {updatedAt: time}}, {new: true})

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

export const CommentModel = mongoose.model("Comment", CommentSchema)
export const createComment = (values: Record<string, any>) => new CommentModel(values).save().then((result) => result.toObject())
export const deleteComment = (comment_ID: string) => CommentModel.findOneAndDelete({comment_ID})
export const getCommentsByPost_ID = (post_ID: string) => CommentModel.find({post_ID}).populate('DonorOwnerID').populate('RequestorOwnerID').populate("DonorLikes").populate("RequestorLikes");
export const getCommentById = (comment_ID: string) => CommentModel.findOne({comment_ID})
export const updateCommentDonorLikes = (comment_ID: string, Donor_Id: mongoose.Types.ObjectId, time: Date) => CommentModel.findOneAndUpdate({comment_ID}, {$push: {DonorLikes: Donor_Id}, $set: {updatedAt: time}}, {new: true})
export const removeCommentDonorLikes = (comment_ID: string, Donor_Id: mongoose.Types.ObjectId, time: Date) => CommentModel.findOneAndUpdate({comment_ID}, {$pull: {DonorLikes: Donor_Id}, $set: {updatedAt: time}}, {new: true})
export const updateCommentRequestorLikes = (comment_ID: string, Requestor_Id: mongoose.Types.ObjectId, time: Date) => CommentModel.findOneAndUpdate({comment_ID}, {$push: {RequestorLikes: Requestor_Id}, $set: {updatedAt: time}},  {new: true})
export const removeCommentRequestorLikes = (comment_ID: string, Requestor_Id: mongoose.Types.ObjectId, time: Date) => CommentModel.findOneAndUpdate({comment_ID}, {$pull: {RequestorLikes: Requestor_Id}, $set: {updatedAt: time}},  {new: true})