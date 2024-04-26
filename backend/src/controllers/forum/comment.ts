import express from 'express'
import { createComment, deleteComment } from '../../models/forum/forum'
import randomatic from 'randomatic'
interface NewComment {
    post_ID: string,
    comment_ID: string,
    content: string,
    DonorOwner: string,
    RequestorOwner: string,
}

let newComment: NewComment

export const addForumComment = async (req: express.Request, res: express.Response) => {
    try {
        console.log(req.body)

        if(!req.body){
            console.log("Invalid Input")
            return res.json({
                messages: {
                    code: 1,
                    message: "Invalid Input"
                }
            }).status(400)
        }

        const comment_ID = randomatic('Aa0', 20);

        if(req.body.userType === "Donor"){
            newComment = {
                post_ID: req.body.post_ID,
                comment_ID: comment_ID,
                content: req.body.content,
                DonorOwner: req.body.ownerID,
                RequestorOwner: "",
            }
        } else {
            newComment = {
                post_ID: req.body.post_ID,
                comment_ID: comment_ID,
                content: req.body.content,
                DonorOwner: "",
                RequestorOwner: req.body.ownerID,
            }
        }

        const addComment = await createComment(newComment)
        
        if(!addComment) {
            console.log("Failed to Add comment")
            return res.json({
                messages: {
                    code: 1,
                    message: "Failed to Add comment"
                }
            }).status(400)
        }
        console.log("Result: ", addComment)
        console.log("Successfuly created comment")

        return res.json({
            messages: {
                code: 0,
                message: "Successfuly created comment"
            },
            addComment
        }).status(200)

    } catch(error) {
        console.log("Error: ", error)
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            },
            error
        }).status(500)
    }
}



export const removeComment = async (req: express.Request, res: express.Response) => {
    try {
        console.log("req.params: ", req.params)
        console.log("comment_ID: ", req.params.comment_ID)

        if(!req.params.comment_ID) {
            console.log("Invalid Comment_ID")
            return res.json({
                messages: {
                    code: 1,
                    message: "Invalid Comment_ID"
                }
            }).status(400)
        }

        const removeComment = await deleteComment(req.params.comment_ID)
        if(!removeComment){
            console.log("Failed to delete Comment")
            return res.json({
                messages: {
                    code: 1,
                    message: "Failed to delete Comment"
                }
            }).status(400)
        }
        console.log("Result: ", removeComment)
        console.log("Successfully to delete Comment")

        return res.json({
            messages: {
                code: 0,
                messages: "Successfully to delete Comment"
            },
            removeComment
        }).status(200)
        
    } catch(error) {
        console.log("Error: ", error)
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }, 
            error
        }).status(500)
    }
}