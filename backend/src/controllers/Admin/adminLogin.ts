import express from 'express'

export const AdminLogIn = async (req: express.Request, res: express.Response) => {
    try{
        if(!process.env.USERNAMEE || !process.env.PASSWORD){
            return res.status(500).json({
                messages: {
                    code: 1,
                    messages: "env credentials missing"
                }
            })
        }

        if(!req.body.username || !req.body.password){
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "Invalid Input"
                }
            })
        }
        if(process.env.USERNAMEE !== req.body.username || process.env.PASSWORD !== req.body.password){
            return res.status(400).json({
                messages: {
                    code: 1,
                    message: "Invalid Credentials"
                }
            })
        } 
        return res.status(200).json({
            messages: {
                code: 0,
                message: "Log In Successfully"
            }
        })


    }catch(error){
        res.status(500).json({
            messages: {
                code: 1,
                message: "Invalid Credentials"
            },
            error
        })
    }
}