import express from 'express'
import { getDonorById, getRequestorById, updateDonorDp, updateRequestorDp} from '../../models/users'
import { passEncryption } from '../../helpers/passwordEncryption'
export const updateProfileImagelink = async (req: express.Request, res: express.Response) => {
    try{
        const { id } = req.params 
        const { link, path, userType } = req.body

        if(!id || !link || !path || !userType) {
            console.log("Bad Request")
            return res.json({
                messages: {
                    code: 1,
                    message: "Bad Request"
                }
            }).status(400)
        }

        const existingUser = userType === "Donor" ? await getDonorById(id) : await getRequestorById(id)

        if(!existingUser){
            console.log("User Not Found")
            return res.json({
                messages: {
                    code: 1,
                    message: "User Not Found"
                }
            }).status(404)
        }
        console.log("Updating DPLink for user with id:", id, "to link:", link);
        const result = userType === "Donor" ? await updateDonorDp(id, link) : await updateRequestorDp(id, link)

        if(!result){
            console.log("Failed to update DP Link")
            return res.json({
                messages: {
                    code: 1,
                    message: "Failed to update DP Link"
                }
            }).status(404)
        }
        console.log("resultDP: ", result)
        console.log("Successfully Updated Dp")
        return res.json({
            messages: {
                code: 0,
                message: "Successfully Updated Dp"
            },
            result
        }).status(200)

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



export const checkCredentials = async (req: express.Request, res: express.Response) => {
    try{
            const { id } = req.params
         const{ email, pass, userType } = req.body

         if(!id || !email || !pass || !userType){
            console.log("Invalid Inputs, Bad Request")
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "Invalid Inputs, Bad Request"
                }
            })
         }

         const existingUser = userType === "Donor" ? await getDonorById(id) : await getRequestorById(id)
         if(!existingUser){
            console.log("Non Existing User")
            return res.status(404).json({
                messages: {
                    code: 1,
                    message: "Non Existing User"
                }
            })
         }

         const { salt, password }  = existingUser
         const encryptedPass = passEncryption(salt, pass)
         if(password !== encryptedPass){
            console.log("Invalid Password")
            return res.status(401).json({
                messages: {
                    code: 1,
                    message: "Invalid Password"
                }
            })
         }

         console.log ("Valid Password")
         return res.status(200).json({
            messages: {
                code: 0,
                message: "Valid Password"
            }
        })


    } catch (error){
        console.log("Internal Server Error")
        return res.status(500).json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            },
            error
        })
    }
}