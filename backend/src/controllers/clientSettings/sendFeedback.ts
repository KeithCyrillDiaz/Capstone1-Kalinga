import express from 'express'
import { createFeedBack, getFeedBackByUserType } from '../../models/Settings/FeedBack'
import { getDonorById, getRequestorById } from '../../models/users'

export const generateFeedback = async (req: express.Request, res: express.Response) => {
    try {

        // console.log(req.params)
        // console.log(req.body)

        const { id } = req.params
        const {content, userType, stars} = req.body
        
        if(!id || !content || !userType || !stars) {
            console.log("Bad Requests")
            return res.json({
                messages: {
                    code: 1,
                    message: "Bad Requests"
                }
            }).status(400)
        }

        const existingUser = userType === "Donor" ? await getDonorById(id) : await getRequestorById(id)

        if(!existingUser){
            console.log("Non Existing User")
            return res.json({
                messages: {
                    code: 1,
                    message: "Non Existing User"
                }
            }).status(404)
        }

        let newFeedback
        if(userType === "Donor"){
            newFeedback = {
                DonorOwnerID: existingUser._id,
                name: existingUser.fullName,
                content: content,
                stars: parseInt(stars),
                userType: userType,
            }
        } else {
            newFeedback = {
                RequestorOwnerID: existingUser._id,
                name: existingUser.fullName,
                content: content,
                stars: parseInt(stars),
                userType: userType,
            }
        }

        const result = await createFeedBack(newFeedback)

        if(!result){
            console.log("Failed to create Feedback")
            return res.json({
                messages: {
                    code: 1,
                    message:"Failed to create Feedback"
                }
            }).status(304)
        }

        console.log("Successfully Created Feedback")
        return res.json({
            messages: {
                code: 0,
                message: "Successfully Created Feedback"
            },
            result
        }).status(201)

    } catch(error) {
        console.log("Internal Server Error", error)
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }, 
            error
        }).status(500)
    }
}


export const fetchFeedBackByUserType = async (req: express.Request, res: express.Response) => {

    try{
          const { userType } = req.params

          if(!userType) {
            console.log("Bad Request")
            return res.json({
                messages: {
                    code: 1,
                    message: "Bad Request"
                }
            }).status(400)
          }
          const result = await getFeedBackByUserType(userType)

          if(result.length === 0){
            console.log("No Existing Feedback")
            return res.json({
                messages: {
                    code: 1,
                    message: "No Existing Feedback"
                }
            }).status(304)
          }

          console.log("Successfully Fetched Feedbacks")

          return res.json({
            messages: {
                code: 0,
                message: "Successfully Fetched Feedbacks"
            },
            result
          }).status(200)

    } catch(error) {
        console.log("Internal Server Error", error)
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }, 
            error
        }).status(500)
    }
}
