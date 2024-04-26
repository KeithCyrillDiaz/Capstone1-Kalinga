import mongoose from 'mongoose'


const PostSchema = new mongoose.Schema({

    post_ID: {type: String, required: true},
    DonorOwnerID: {type: mongoose.Schema.Types.ObjectId, ref: "Donor"},
    RequestorOwnerID: {type: mongoose.Schema.Types.ObjectId, ref: "Requestor"},
    content:  {type: String},
    Donorlikes: [{type: mongoose.Schema.Types.ObjectId, ref: "Donor"}],
    Requestorlikes: [{type: mongoose.Schema.Types.ObjectId, ref: "Requestor"}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})

export const PostModel = mongoose.model('Posts', PostSchema)

export const createPost = (values: Record<string, any>) => new PostModel(values).save().then((result) => result.toObject())
export const deletePost = (post_ID: string) => PostModel.findOneAndDelete({post_ID: post_ID})
export const getPosts = () => PostModel.find().populate('DonorOwnerID').populate('RequestorOwnerID');


const CommentSchema = new mongoose.Schema ({
    
    post_ID: {type: String, required: true},
    comment_ID: {type: String, required: true},
    content: {type: String},
    DonorOwnerID: {type: mongoose.Schema.Types.ObjectId, ref: "Donor"},
    RequestorOwnerID: {type: mongoose.Schema.Types.ObjectId, ref: "Requestor"},
    Donorlikes: [{type: mongoose.Schema.Types.ObjectId, ref: "Donor"}],
    Requestorlikes: [{type: mongoose.Schema.Types.ObjectId, ref: "Requestor"}],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},

})

export const CommentModel = mongoose.model("comment", CommentSchema)
export const createComment = (values: Record<string, any>) => new CommentModel(values).save().then((result) => result.toObject())
export const deleteComment = (comment_ID: string) => CommentModel.findOneAndDelete({comment_ID})
export const getCommentsByPost_ID = (post_ID: string) => CommentModel.find({post_ID}).populate('DonorOwnerID').populate('RequestorOwnerID');