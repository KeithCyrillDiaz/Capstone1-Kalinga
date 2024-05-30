import express from "express"
import AppointmentModel, { getAppointmentByDonorID } from "../../models/Donor/DonorSetAppointmentModel"
import { createNotification } from "../../models/Notification/Notification"
import app from "../../../api"


export const sendUpdateStatusAppointmentNotification = async (
    req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {

        const { AppointmentDonorID } = req.params
        const { DonationStatus, selectedDate, selectedTime } = req.body

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
                    content: `Your appointment has been approved. Please proceed to your chosen milk bank location at the designated date and time to begin the donation process. Thank you!`,
                    milkBank: Appointment.location,
                    date: selectedDate,
                    time: selectedTime
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
                    milkBank: Appointment.location,
                    date: selectedDate ?? Appointment.selectedDate,
                    time: selectedTime ?? Appointment.selectedTime
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


export const checkAppointment = async (req: express.Request, res: express.Response) => {
    try{
        const { status } = req.body;
        const { id } = req.params

        if (!id || !status){
            console.log("Bad Request")
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "Bad Request"
                }
            })
        }

        const appointment = await AppointmentModel.findOne({Donor_ID: id, DonationStatus: status})
        if(!appointment){
            console.log("No Appointment Found")
            return res.status(404).json({
                messages: {
                    code: 1,
                    message: "No Appointment Found"
                }
            })
        }

        console.log("Retrieved Appointment")
        return res.status(200).json({
            messages: {
                code: 0,
                message: "Retrieved Appointment"
            },
            appointment
        })

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