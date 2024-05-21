import express from "express"
import { getAppointmentByDonorID } from "../../models/Donor/DonorSetAppointmentModel"
import { createNotification } from "../../models/Notification/Notification"


export const sendUpdateStatusAppointmentNotification = async (
    req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {

        const { AppointmentDonorID } = req.params
        const { DonationStatus } = req.body

        const allowedStatuses = ["Decline", "Complete", "Ongoing"];

            if (!AppointmentDonorID || !DonationStatus || !allowedStatuses.includes(DonationStatus))
                {
                    console.log("Invalid Input, bad Request")
                    return res.json({
                        messages: {
                            code: 1,
                            messages: "Invalid Input, bad Request"
                        }
                    }).status(400)
                }

            const Appointment = await getAppointmentByDonorID(AppointmentDonorID)

            if(!Appointment){
                console.log("Non Existing Appointment")
                return res.json({
                    messages: {
                        code: 1,
                        message: "Non Existing Appointment"
                    }
                }).status(404)
            }

            let newNotification
            if (DonationStatus === "Ongoing") {
                newNotification = {
                    ownerID: Appointment.Donor_ID,
                    title: `Appointment Update: Ongoing`,
                    content: `Your appointment has been approved. Please proceed to your chosen milk bank location at your selected time and date to begin the donation process. Thank you!`,
                    milkBank: Appointment.location
            };
            } else if (DonationStatus === "Decline") {
                newNotification = {
                    ownerID: Appointment.Donor_ID,
                    title: `Appointment Update: Declined`,
                    content: `Unfortunately, your appointment has been declined. If you have any questions, please contact us.`,
                    milkBank: Appointment.location
            };
            } else if (DonationStatus === "Complete") {
                newNotification = {
                    ownerID: Appointment.Donor_ID,
                    title: `Appointment Update: Completed`,
                    content: `Congratulations! Your appointment has been successfully completed. Thank you for your donation!`,
                    milkBank: Appointment.location
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
