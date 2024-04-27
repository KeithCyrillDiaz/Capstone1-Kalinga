import express from 'express'
import { createPost, deletePost, getPosts, getPostsById } from '../../models/forum/forum';
import randomatic from 'randomatic'
import { getDonorById, getRequestorById } from '../../models/users';
import mongoose from 'mongoose';
interface NewPost {
    post_ID: string;
    DonorOwnerID?: mongoose.Types.ObjectId;
    RequestorOwnerID?: mongoose.Types.ObjectId;
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
            const existingUser = await getDonorById(req.body.ownerID)
            if(!existingUser){
                console.log("Non Existing User")
                return res.json({
                    messages: {
                        code: 1,
                        message: "Non Existing User"
                    }
                }).status(400)
            }
            newPost = {
                post_ID: post_ID,
                DonorOwnerID: existingUser._id,
                content: req.body.content,
            }
        } else {
            const existingUser = await getRequestorById(req.body.ownerID)
            if(!existingUser){
                console.log("Non Existing User")
                return res.json({
                    messages: {
                        code: 1,
                        message: "Non Existing User"
                    }
                }).status(400)
            }
            newPost = {
                post_ID: post_ID,
                RequestorOwnerID: existingUser._id,
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
        const checkPost = await getPostsById(req.params.post_ID)
        if(!checkPost){
            console.log("Non Existing Post")
            return res.json({
                messages: {
                    code: 1,
                    message: "Non Existing Post"
                }
            }).status(400)
        }

        if(checkPost.comments_ID){
            checkPost.comments_ID.map(commentID =>{
                console.log("comment_ID: ",commentID)
            })
        }


        // const removePost = await deletePost(req.params.post_ID)
        
        // if(!removePost){
        //     console.log("Failed to Delete Post")
        //     return res.json({
        //         messages: {
        //             code: 1,
        //             message: "Failed to Delete Post"
        //         }
        //     }).status(400)
        // }

        // console.log("Result: ", removePost)
        // console.log("Successfully Deleted Post")
        // return res.json({
        //     messages: {
        //         code: 0,
        //         message: "Successfully Deleted Post"
        //     },
        //     removePost
        // }).status(200)

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


export const fetchposts = async (req: express.Request, res: express.Response) => {
    try {   
        const fetchPosts = await getPosts()
        if (!fetchPosts) {
            console.log("Error fetching posts")
            return res.json({
                messages: {
                    code: 1,
                    message: "Error fetching posts"
                }
            }).status(400)
        }
        console.log("Results: ", fetchPosts)
        console.log("Successfully fetch posts")
        return res.json({
            messages:{
                code: 0,
                message: "Successfully fetch posts"
            },
            fetchPosts
           
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


