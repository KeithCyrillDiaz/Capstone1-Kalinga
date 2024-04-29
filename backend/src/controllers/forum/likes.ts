import express from 'express'
import { getPostsById, updateRequestorLikes, updateDonorLikes, removeDonorLikes, removeRequestorLikes, getCommentById, updateCommentDonorLikes, updateCommentRequestorLikes, removeCommentDonorLikes, removeCommentRequestorLikes } from '../../models/forum/forum'
import { getDonorById, getRequestorById } from '../../models/users'
import moment from 'moment'
export const updatePostLikes = async (req: express.Request, res: express.Response) => {
    try{

        console.log("req.body: ", req.body)
        console.log("req.params: ", req.params)
        console.log("req.params.reactor_ID: ", req.params.reactor_ID)
        console.log("req.body.post_ID: ", req.body.post_ID)
        const userType = req.body.userType 

        if(!req.params.reactor_ID || !req.body.post_ID || !userType){
            console.log("Invalid Input")
            return res.json({
                messages: {
                    code: 1,
                    message: "Invalid Input"
                }
            }).status(400)
        }
            
        const fetchPost = await getPostsById(req.body.post_ID)
        if(!fetchPost){
            console.log("None Existing Post")
            return res.json({
                messages: {
                    code: 1,
                    message: "None Existing Post"
                }
            }).status(400)
        }
         
        let existingUser: any;
   
     
        if(userType === "Donor"){
            existingUser = await getDonorById(req.params.reactor_ID)
        } else {
            existingUser = await getRequestorById(req.params.reactor_ID)
        }

        if(!existingUser){
            console.log("Non Existing User")
            return res.json({
                messages: {
                    code: 1,
                    message: "Non Existing User"
                }
            }).status(400)
        }

        console.log("Existing User: ", existingUser)
        const userObjectId = existingUser._id
        const currentTime = moment().toDate()
        let result: any
        if(userType === "Donor"){
            result = await updateDonorLikes(req.body.post_ID, userObjectId, currentTime)
        } else result = await updateRequestorLikes(req.body.post_ID, userObjectId, currentTime)

        if(!result) {
            console.log( "Failed to update Likes")
            return res.json({
                messages: {
                    code: 1,
                    message: "Failed to update Likes"
                }
            }).status(400)
        }
        
        console.log("Result: ", result)
        console.log("Successfully Updated Post likes")

        return res.json({
            messages: {
                code: 0,
                message: "Successfully Updated Post likes"
            },
            result
        })

    }catch(error){
        console.log("Error: ", error)
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }
        }).status(500)
    }
}


export const removeLikes = async(req: express.Request, res: express.Response) => {
    try {
        console.log("Params: ", req.params)
        console.log( "body: ", req.body)
        const reactor_ID = req.params.reactor_ID;
        const post_ID = req.body.post_ID
        const userType = req.body.userType

        if(!reactor_ID || !post_ID || !userType){
            console.log("Invalid Input")
            return res.json({
                messages: {
                    code: 1,
                    message: "Invalid Input"
                }
            }).status(400)
        }

        const checkPosts = await getPostsById(post_ID)
        if(!checkPosts){
            console.log("Non Existing Posts")
            return res.json({
                messages: {
                    code: 1,
                    message: "Non Existing Posts"
                }
            }).status(400)
        }

        let existingUser: any;
     
        if(userType === "Donor"){
            existingUser = await getDonorById(reactor_ID)
        } else {
            existingUser = await getRequestorById(reactor_ID)
        }

        if(!existingUser){
            console.log("Non Existing User")
            return res.json({
                messages: {
                    code: 1,
                    message: "Non Existing User"
                }
            }).status(400)
        }

        console.log("objectId: ", existingUser._id)
        const objectId = existingUser._id
        const time = moment().toDate()
        let result: any
        if(userType === "Donor"){
            result = await removeDonorLikes(post_ID, objectId, time)
        } else result = await removeRequestorLikes(post_ID, objectId, time)

        if(!result){
            console.log("User has not liked the post")
            return res.json({
                messages: {
                    code: 1,
                    message: "User has not Liked the post"
                }
            }).status(400)
        }

        console.log("Result: ", result)
        console.log("Remove Post Like Successfully")

        return res.json({
            messages: {
                code: 0,
                message: "Remove Post Like Successfully"
            },
            result
        }).status(200)

    } catch (error){
        console.log(" Error: ", error)
        return res.json({
            messages:{
                code: 1,
                message: "Internal Server Error"
            },
            error
        }).status(500)
    }
}


export const addCommentLikes = async(req: express.Request, res: express.Response) => {
    try {

        const reactor_ID = req.params.reactor_ID
        const comment_ID = req.body.comment_ID
        const post_ID = req.body.post_ID
        const userType = req.body.userType

        if(!reactor_ID || !comment_ID || !userType) {
            console.log("Invalid Input")
            return res.json({
                messages: {
                    code: 1,
                    message: "Invalid Input"
                }
            }).status(400)
        }

        const checkPost = await getPostsById(post_ID)
        if(!checkPost){
            console.log("Non Existing Post")
            return res.json({
                messages: {
                    code: 1,
                    message: "Non Existing Post"
                }
            }).status(400)
        }

        const checkComment = await getCommentById(comment_ID)
        if(!checkComment){
            console.log("Non Existing Comment")
            return res.json({
                messages: {
                    code: 1,
                    message: "Non Existing Comment"
                }
            }).status(400)
        }

        let existingUser: any;
      
     
        if(userType === "Donor"){
            existingUser = await getDonorById(reactor_ID)
        } else {
            existingUser = await getRequestorById(reactor_ID)
        }

        if(!existingUser){
            console.log("Non Existing User")
            return res.json({
                messages: {
                    code: 1,
                    message: "Non Existing User"
                }
            }).status(400)
        }

        console.log("objectId: ", existingUser._id)
        const ObjectId = existingUser._id
        const time  = moment().toDate()
        let result: any
        if(userType === "Donor"){
            result = await updateCommentDonorLikes(comment_ID, ObjectId, time)
        } else result = await updateCommentRequestorLikes(comment_ID, ObjectId, time)

        if(!result) {
            console.log("User has Not Like the post")
            return res.json({
                messages:{
                    code: 1,
                    message: "User has Not Like the post"
                }
            }).status(400)
        }

        console.log("Result: ", result)
        console.log("Successfully updated comment like")
        
        return res.json({
            messages: {
                code: 0,
                message: "Successfully updated comment like"
            },
            result
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

export const removeCommentLikes = async(req: express.Request, res: express.Response) => {
    try{
        console.log("params: ", req.params)
        console.log("body: ", req.body)

        const reactor_ID = req.params.reactor_ID
        const post_ID = req.body.post_ID
        const comment_ID = req.body.comment_ID
        const userType = req.body.userType

        if(!reactor_ID || !post_ID || !comment_ID || !userType){
            console.log("Invalid input")
            return res.json({
                messages: {
                    code: 1,
                    message: "Invalid Input"
                }
            }).status(400)
        }

        const checkPosts = await getPostsById(post_ID)
        if(!checkPosts){
            console.log("Non Existing Post")
            return res.json({
                messages: {
                    code: 1,
                    message: "Non Existing Post"
                }
            }).status(400)
        }

        const checkComment = await getCommentById(comment_ID)
        if(!checkComment){
            console.log("Non Existing Comment")
            return res.json({
                messages: {
                    code: 1,
                    message: "Non Existing Comment"
                }
            }).status(400)
        }
        
        let existingUser: any;
        if(userType === "Donor"){
            existingUser = await getDonorById(reactor_ID)
        } else existingUser = await getRequestorById(reactor_ID)

        if(!existingUser){
            console.log("Non Existing User")
            return res.json({
                messages: {
                    code: 1,
                    message: "Non Existing User"
                }
            }).status(400)
        }

        let result: any;
        console.log("ObjectId: ", existingUser._id)
        const ObjectId = existingUser._id
        const time  = moment().toDate()
        if(userType === "Donor"){
            result = await removeCommentDonorLikes(comment_ID, ObjectId, time)
        } else result = await removeCommentRequestorLikes(comment_ID, ObjectId, time)

        if(!result){
            console.log("Failed removing comment like")
            return res.json({
                messages: {
                    code: 1,
                    message: "Failed removing comment like"
                }
            }).status(400)
        }

        console.log("Result: ", result)
        console.log("Succesfully removed comment like")

        return res.json({
            messages: {
                code: 0,
                message: "Successfully remove comment like"
            },
            result
        }).status(200)

    } catch(error){
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