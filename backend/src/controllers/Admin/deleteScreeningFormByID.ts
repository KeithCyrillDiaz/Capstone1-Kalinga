import express from 'express'
import { getScreeningFormByStatusAndUserType, 
    updateStatusScreeningForm, 
    softDeleteScreeningForm 
} from '../../models/ApplyAsDonor'

export const updateStatus = async (req: express.Request, res: express.Response) => {
    try{    

        const {status} = req.body
        const { id } = req.params
        if(!id){
            console.log("Invalid Id")
            return res.status(400).json({
                messages: {
                    code: 0,
                    message: "Invalid Id"
                }
            })
        }
        console.log("status: ", status)
        const validStatuses = ['Rejected', 'Approved']
        if(!status ||!validStatuses.includes(status)) {
            console.log("Invalid Status")
            return res.status(400).json({
                messages: {
                    code: 1,
                    message:"Invalid Status"
                }
            })
        }
        const updateScreeningForm = await updateStatusScreeningForm(id, status)

        if(!updateScreeningForm){
            return res.json({
                messages: {
                    code: 1,
                    message: "None Exisiting Applicant"
                }
            }).status(400)
        }
     
        if((updateScreeningForm.status == "Pending" )){
            console.log("Failed to update Applicant Form")
            return res.json({
                messages: {
                    code: 1,
                    message: "Failed to update Applicant Form"
                }
            }).status(400)
        }
        if(updateScreeningForm.status === "Rejected"){
            console.log("Rejected Applicant Successfully")
        } else console.log("Approved Applicant Successfully")
        
        return res.json({
            messages: {
                code: 0,
                message: " Delete Applicant Successfully"
            },
            updateScreeningForm
        }).status(200)

    } catch (error) {
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }
        }).status(500)
    }
}

export const fetchPendingScreeningForm = async (req: express.Request, res: express.Response) => {
    try{    
        const { userType } = req.params
        const { status } = req.body
        console.log("status", status)
        const validStatuses = ['Rejected', 'Approved', 'Pending']
        if(!status || !validStatuses.includes(status)) {
            console.log("Invalid Status")
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "Invalid Status"
                }
            })
        }
        const validUserTypes = ['Donor', 'Requestor']
        if(!userType || !validUserTypes.includes(userType)) {
            console.log("Invalid UserType")
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "Invalid UserType"
                }
            })
        }
        
        const screeningForms = await getScreeningFormByStatusAndUserType(userType, status)

        console.log("result: ", screeningForms)
        if(screeningForms.length === 0){
            console.log(`No ${status} Screening Forms at the moment`)
            return res.status(204).json({
                messages: {
                    code: 1,
                    message: `No ${status} Screening Forms at the moment`
                },
            })
        }
        console.log(`Retrieved ${status} Screening Forms Successfully`)
        return res.status(200).json({
                  messages: {
                code: 0,
                message: `Retrieved ${status} Screening Forms Successfully`
            },
            screeningForms
        })

    } catch (error) {
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }
        }).status(500)
    }
}

export const softDeleteScreeningFormByID = async (req: express.Request, res: express.Response) => {
    try{    
        const { id } = req.params
       
        if(!id) {
            console.log("Invalid Id, Bad Request")
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "Invalid Id, Bad Request"
                }
            })
        }
        const screeningForms = await softDeleteScreeningForm(id, "Deleted")
        
        if(!screeningForms){
            console.log(`No Deleted Screening Forms at the moment`)
            return res.status(204).json({
                messages: {
                    code: 1,
                    message: `No Deleted Screening Forms at the moment`
                },
            })
        }
        return res.status(200).json({
            messages: {
                code: 0,
                message: `Retrieved Deleted Screening Forms Successfully`
            },
            screeningForms
        })

    } catch (error) {
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }
        }).status(500)
    }
}

