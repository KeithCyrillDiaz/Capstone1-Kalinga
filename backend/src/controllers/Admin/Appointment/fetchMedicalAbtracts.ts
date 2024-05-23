import express from 'express'

export const fetchMedicalAbstacts = async (req: express.Request, res: express.Response) => {
    try {
        const { id } =req.params
        if(!id){
            console.log("No Id")
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "Bad Request"
                }
            })
        }

        
    } catch (error){
        console.log("Internal Server Error")
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }
        })
    }
}