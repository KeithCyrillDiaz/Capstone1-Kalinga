import express from 'express'
import { getRequestByRequestID } from '../../models/Requestor/RequestorRequestModel';
import { createNotification } from '../../models/Notification/Notification';



export const sendRequestsNotification = async (
    req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {

        const { RequestID } = req.params
        const { RequestStatus } = req.body

        const allowedStatuses = ["Decline", "Ongoing"];

            if (!RequestID || !RequestStatus || !allowedStatuses.includes(RequestStatus))
                {
                    console.log("Invalid Input, bad Request")
                    return res.json({
                        messages: {
                            code: 1,
                            messages: "Invalid Input, bad Request"
                        }
                    }).status(400)
                }

            const Request = await getRequestByRequestID(RequestID)

            if(!Request ){
                console.log("Non Existing Request ")
                return res.json({
                    messages: {
                        code: 1,
                        message: "Non Existing Request "
                    }
                }).status(404)
            }

            let newNotification
            if (RequestStatus === "Approved") {
                newNotification = {
                    ownerID: Request.Requestor_ID,
                    title: "Request Approved",
                    content: `Your request for milk has been approved by the milk bank. You can now proceed to collect your milk.`,
                    milkBank: Request.milkBank
                };
            } else if (RequestStatus === "Decline") {
                newNotification = {
                    ownerID: Request.Requestor_ID,
                    title: "Request Declined",
                    content: `Unfortunately, your request for milk has been declined by the Milk Bank.`,
                    milkBank: Request.milkBank
                };
            }
            
            const result = await createNotification(newNotification)

            if(!result) {
                console.log("Failed to create Notification")
                return res.json({
                    messages: {
                        code: 1,
                        message: "Failed to create Notification"
                    }
                }).status(201)
            }
            console.log("Notification: ", result)
            console.log("Successfully Send Notification")
            next()

    } catch (error) {
        console.log("Internal Server Error", error)
        return res.json({
            message: {
                code: 1,
                message: "Internal Server Error"
            },
            error
        }).status(500)
    }   
}
