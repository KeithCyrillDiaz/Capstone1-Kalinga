import express from 'express'
import { QCGHDonorAppointmentConfigModel, QCGHRequestorAppointmentConfigModel, createQCGHDonorAppointment, createQCGHRequestorAppointment } from '../../../models/KalingaConfiguration/AppointmentForm'


export const getAppointmentsConfiguration = async (req: express.Request, res: express.Response) => {
    try {
        const donor = await QCGHDonorAppointmentConfigModel.findOne()
        const requestor = await QCGHRequestorAppointmentConfigModel.findOne()

        let donationAppointmentConfig: {}
        let requestAppointmentConfig: {}

        if (!donor) {
            donationAppointmentConfig = await createQCGHDonorAppointment({});
        } else {
            donationAppointmentConfig = donor.toObject();
        }
    
        if (!requestor) {
            requestAppointmentConfig = await createQCGHRequestorAppointment();
        } else {
            requestAppointmentConfig = requestor.toObject();
        }

        console.log("Retrieved Forms Configurations")
        return res.status(200).json({
            messages: {
                code: 0,
                message: "Retrieved Forms Configurations"
            },
            donationAppointmentConfig,
            requestAppointmentConfig
        })
        
    } catch (error) {
        console.log ("Internal Server Error - getAppointmentsConfiguration")
        return res.json({
            messages: {
                code: 2,
                message: "Internal Server Error"
            },
            error
        }).status(500)
    }
}


export const updateDonationAppointmentsConfiguration = async (req: express.Request, res: express.Response) => {
    try {
       const updates = req.body

        const updateResult = await QCGHDonorAppointmentConfigModel.findOneAndUpdate(
            {}, 
            updates,
            { new: true, upsert: true } 
        );

        console.log("Successfully Updated Donor Form Configurations")
        return res.status(200).json({
            messages: {
                code: 0,
                message: "Successfully Updated Donor Form Configurations"
            },
            updateResult
        })
        
    } catch (error) {
        console.log ("Internal Server Error - updateDonationAppointmentsConfiguration")
        return res.json({
            messages: {
                code: 2,
                message: "Internal Server Error"
            },
            error
        }).status(500)
    }
}

export const updateRequestorAppointmentsConfiguration = async (req: express.Request, res: express.Response) => {
    try {
    
        const updates = req.body

        console.log("updates: ", updates)

        const updateResult = await QCGHRequestorAppointmentConfigModel.findOneAndUpdate(
            {}, 
            updates,
            { new: true, upsert: true } 
        );

        console.log("Successfully updated Request Appointment Form Configurations")
        return res.status(200).json({
            messages: {
                code: 0,
                message: "Successfully Updated Request Form Configurations"
            },
            updateResult
        })
        
    } catch (error) {
        console.log ("Internal Server Error - updateDonationAppointmentsConfiguration")
        return res.json({
            messages: {
                code: 2,
                message: "Internal Server Error"
            },
            error
        }).status(500)
    }
}