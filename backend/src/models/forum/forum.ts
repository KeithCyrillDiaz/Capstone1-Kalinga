import mongoose from 'mongoose'


const PostSchema = new mongoose.Schema({

    post_ID: {type: String, required: true},
    DonorOwnerID: {type: String, ref: "Donor"},
    RequestorOwnerID: {type: String, ref: "Requestor"},
    content:  {type: String},
    Donorlikes: [{type: String, ref: "Donor"}],
    Requestorlikes: [{type: String, ref: "Requestor"}],
    comments: [{type: String, ref: "Comment"}],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})

export const PostModel = mongoose.model('Posts', PostSchema)

export const createPost = (values: Record<string, any>) => new PostModel(values).save().then((result) => result.toObject())
export const deletePost = (post_ID: string) => PostModel.findOneAndDelete({post_ID: post_ID})


const CommentSchema = new mongoose.Schema ({
    
    post_ID: {type: String, required: true},
    comment_ID: {type: String, required: true},
    content: {type: String},
    DonorOwner: {type: String, ref: "Donor"},
    RequestorOwner: {type: String, ref: "Requestor"},
    Donorlikes: [{type: String, ref: "Donor"}],
    Requestorlikes: [{type: String, ref: "Requestor"}],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},

})

export const CommentModel = mongoose.model("comment", CommentSchema)
export const createComment = (values: Record<string, any>) => new CommentModel(values).save().then((result) => result.toObject())
export const deleteComment = (comment_ID: string) => CommentModel.findOneAndDelete({comment_ID})