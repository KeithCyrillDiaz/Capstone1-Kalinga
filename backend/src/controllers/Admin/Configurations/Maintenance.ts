import express from 'express'
import { MaintenanceModel, createMaintenanceModel } from '../../../models/KalingaConfiguration/Maintenance';

interface IMaintenance {
    maintenanceStatus: boolean;
}

export const checkMaintenanceStatus = async (req: express.Request, res: express.Response) => {
    try {

        const result = await MaintenanceModel.findOne()
        let maintenance: IMaintenance;
        if (!result) {
            maintenance = await createMaintenanceModel({});
        } else {
            maintenance = result.toObject();
        }
        
        if(maintenance.maintenanceStatus === true) {
            console.log("Ongoing Maintenance")
            return res.status(200).json({
                messages: {
                    code: 0,
                    message: "Ongoing Maintenance"
                },
                maintenance
            })
        }

        console.log("Maintenance is not ongoing at the moment")
        return res.status(200).json({
            messages: {
                code: 1,
                message: "Maintenance is not ongoing at the moment"
            },
            maintenance
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


export const updateMaintenanceStatus = async (req: express.Request, res: express.Response) => {
    try {
        const { status } = req.body
        if(typeof status !== 'boolean') {
            console.log( "Bad Reqeust - updateMaintenanceStatus")
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "Bad Request"
                }
            })
        }

        const result = await MaintenanceModel.findOneAndUpdate(
            {},
            {$set: {maintenanceStatus: status}},
            {new: true, upsert: true}
        )

        if(!result){
            console.log("Failed to update maintenance status")
            return res.status(304).json({
                messages: {
                    code: 1,
                    message: "Failed to update"
                }
            })
        }
        
        console.log("Successfully updated maintenance status")
        return res.status(200).json({
            messages: {
                code: 0,
                message: "Successfully updated maintenance status"
            },
        })
        
    } catch (error) {
        console.log ("Internal Server Error - updateMaintenanceStatus")
        return res.json({
            messages: {
                code: 2,
                message: "Internal Server Error"
            },
            error
        }).status(500)
    }
}
