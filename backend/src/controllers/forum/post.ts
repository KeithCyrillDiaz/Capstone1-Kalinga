import express from 'express'
import { createPost, deletePost } from '../../models/forum/forum';
import randomatic from 'randomatic'

interface NewPost {
    post_ID: string;
    DonorOwnerID: string;
    RequestorOwnerID: string;
    content: string;
}

let newPost: NewPost;

export const addForumPost = async (req: express.Request, res: express.Response) => {
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
        const post_ID = randomatic('Aa0', 20);

        if(req.body.userType === "Donor"){
            newPost = {
                post_ID: post_ID,
                DonorOwnerID: req.body.ownerID,
                RequestorOwnerID: null,
                content: req.body.content,
            }
        } else{
            newPost = {
                post_ID: post_ID,
                DonorOwnerID: null,
                RequestorOwnerID: req.body.ownerID,
                content: req.body.content,
            }
        } 

        const addPost = await createPost(newPost)

        if(!addPost) {
            console.log("Failed creating Post")
            return res.json({
                messages: {
                    code: 1,
                    message: "Failed creating Post"
                }
            }).status(400)
        }
        console.log("Result: ", addPost)
        console.log("Succesfully added Post")
        return res.json({
            messages: {
                code: 0,
                message: "Successfully added post"
            },
            addPost
        }).status(200)

    } catch(error) {
        console.log("Error: ", error)
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            },
            error
        }). status(500)
    }
}


export const removePost = async (req: express.Request, res: express.Response) => {
    try{
        console.log("req.params: ", req.params)
        console.log("req.params.post_ID", req.params.post_ID)

        if(!req.params.post_ID){
            console.log("Invalid Input")
            return res.json({
                messages: {
                    code: 1,
                    message: "Invalid Input"
                }
            }).status(400)
        }

        const removePost = await deletePost(req.params.post_ID)
        
        if(!removePost){
            console.log("Failed to Delete Post")
            return res.json({
                messages: {
                    code: 1,
                    message: "Failed to Delete Post"
                }
            }).status(400)
        }

        console.log("Result: ", removePost)
        console.log("Successfully Deleted Post")
        return res.json({
            messages: {
                code: 0,
                message: "Successfully Deleted Post"
            },
            removePost
        }).status(200)

    } catch(error){
        console.log("Error: ", error)
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            },
            error
        }). status(500)
    }
}


