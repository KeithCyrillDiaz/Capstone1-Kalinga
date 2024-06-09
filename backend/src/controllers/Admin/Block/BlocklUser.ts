import express from 'express'
import { 
    updateBlockStatusDonor, 
    updateBlockStatusRequestor, 
    getBlockedRequestors, getBlockedDonors 
} from '../../../models/users'


export const updateBlockStatus = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        console.log ("Blocking User")
        const { id } = req.params
        const { userType, status, email} = req.body

        if(!id || !userType || !status || !email){
            console.log ("Invalid inputs, Bad Request")
            return res.json({
                messages: {
                    code: 1,
                    message: "Invalid inputs, Bad Request"
                }
            }).status(400)
        }

        const result = userType === "Donor" ? await updateBlockStatusDonor(id, status) : await updateBlockStatusRequestor(id, status)

        if(!result) {
            console.log("Failes blocking User")
            return res.json({
                messages: {
                    code: 1,
                    messages: "Failes blocking User"
                }
            }).status(400)
        }

        console.log(status === "Yes" ? "Blocked User Successfully" : "Unblocked User Successfully")
      next()

    } catch(error) {
        console.log("Internal Server Error")
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }
        }).status(500)
    }
}

export const fetchBlockUsers = async (req: express.Request, res: express.Response) => {
    try {
        console.log ("fetching Blocked Users")
        const requestors = await getBlockedRequestors()
        const donors = await getBlockedDonors()

        if(requestors.length === 0 && donors.length === 0){
            console.log("No Blocked Users")
            return res.json({
                messages: {
                    code: 1,
                    message: "No Blocked Users"
                }
            }).status(204)
        }
        console.log("Retrieving Blocked Users")
        return res.json({
            messages: {
                code: 0,
                message: "Retrieving Blocked Users"
            },
            donors,
            requestors
        })

    } catch(error) {
        console.log("Internal Server Error")
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }
        }).status(500)
    }
}
