import express from 'express'
import { getDonorById, getRequestorById } from '../../models/users'
import { createHelpAndSupportReport } from '../../models/Settings/helpAndsupport'

export const generateHelpAndSupportReport = async (req: express.Request, res: express.Response) => {
    try {

        const { id } = req.params
        const { userType, topic, content, } = req.body

        if(!id || !content || !userType || !topic) {
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

        const ObjectId = existingUser._id
        const name = existingUser.fullName
        let newReport;

        if(userType === "Donor") {
            newReport = {
                DonorOwnerID: ObjectId,
                name: name,
                userType: userType,
                topic: topic,
                content: content,
            }
        } else {
            newReport = {
                RequestorOwnerID: ObjectId,
                name: name,
                userType: userType,
                topic: topic,
                content: content,
            }
        }

        const result = await createHelpAndSupportReport(newReport)

        if(!result){
            console.log("Failed Creating Help And Support Report")
            return res.json({
                messages: {
                    code: 1,
                    message: "Failed Creating Help And Support Report"
                }
            }).status(400)
        }

        console.log("Successfully Created Report")
        return res.json({
            messages: {
                code: 0,
                message: "Successfully Created Report"
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


// export const fetchHelpAndSupportReport = async (req: )