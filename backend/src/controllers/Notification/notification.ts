import express from 'express'
import { getNotificationById, updateStatusNotification } from '../../models/Notification/Notification'

export const fetchUnreadNotification = async(req: express.Request, res: express.Response) => {
    try{
        
        const { id } = req.params

        if(!id) {
            console.log("Invalid Inputs. Bad Request")
            return res.json({
                messages: {
                    code: 1,
                    message: "Invalid Inputs. Bad Request"
                }
            }).status(400)
        }

        const notifications = await getNotificationById(id)
   
        if(notifications.length === 0) {
            console.log("No Exisiting Notification for this User")
            return res.json({
                messages: {
                    code: 1,
                    message: "No Exisiting Notification for this User"
                }
            }).status(404)
        }

        console.log("Successfully Retrieved Unread Notifications")

        return res.json({
            messages: {
                code: 0,
                message: "Successfully Retrieved Unread Notifications"
            },
            notifications
        }).status(200)

    } catch (error) {
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

export const updateNotificationStatus = async (req: express.Request, res: express.Response) => {
    try {

        const { id } = req.params

        if(!id) {
            console.log("Invalid Inputs. Bad Request")
            return res.json({
                messages: {
                    code: 1,
                    message: "Invalid Inputs. Bad Request"
                }
            }).status(400)
        }

        const notification = await updateStatusNotification(id)
   
        if(!notification) {
            console.log("No Exisiting Notification for this User")
            return res.json({
                messages: {
                    code: 1,
                    message: "No Exisiting Notification for this User"
                }
            }).status(404)
        }

        console.log("Successfully Retrieved Unread Notifications")

        return res.json({
            messages: {
                code: 0,
                message: "Successfully Retrieved Unread Notifications"
            },
            notification
        }).status(200)


    } catch (error) {
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