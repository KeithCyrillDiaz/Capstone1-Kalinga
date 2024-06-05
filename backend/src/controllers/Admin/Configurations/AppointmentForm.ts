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
        const {
            amountOfMilkDonatedField
        } = req.body

        

        if(typeof amountOfMilkDonatedField !== 'boolean') {
            console.log("invalid value of amountOfMilkDonatedField")
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "Bad Request"
                }
            })
        }
        const updateResult = await QCGHDonorAppointmentConfigModel.findOneAndUpdate(
            {}, 
            { amountOfMilkDonatedField },
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
        
        const {
            reasonForRequestingField,
            infantInformationField,
            infantBirthDayField,
            amountOfMilkRequestedField,
            reasonForRequestingPlaceHolder,
            infantBirthDayPlaceHolder,
            amountOfMilkRequestedPlaceHolder,
            amountOfMilkOptions
        } = req.body

        const updates = req.body

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