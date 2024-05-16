import express from 'express'
import { getDonorById, getRequestorById } from '../../models/users'
import { createReportBugs, deleteReportBugsById, getReportBugsByResolved, updateResolvedOfReport } from '../../models/Settings/ReportBug'
import moment from 'moment'
import randomatic from 'randomatic'

export const reportBug = async (req: express.Request, res: express.Response) => {
    try {
     
        const { id } = req.params
        const { topic, content, userType } = req.body

        if(!content || !topic) {
            console.log("No Content or Topic")
            return res.json({
                messages: {
                    code: 1,
                    message: "No Content or Topic"
                }
            }).status(400)
        }
        
        let existingUser

        if(userType === "Donor")
            existingUser = await getDonorById(id)
        else existingUser = await getRequestorById(id)

        if(!existingUser) {
            console.log("Non Existing User")
            return res.json({
                messages: {
                    code: 1,
                    message: "Non Existing User"
                }
            }).status(400)
        }

        const timestamp = moment().format("YYYYMMDDHHmmss"); // Current timestamp
        const randomString = randomatic('A0', 7);
        const reportId = timestamp + randomString
        let report;

        if(userType === "Donor"){
            report = {
                ReportBugID: reportId,
                DonorOwnerID: existingUser._id,
                topic: topic,
                content: content,
                createdAt: moment().toDate(),
                updatedAt: moment().toDate()
            }
        } else {
            report = {
                ReportBugID: reportId,
                RequestorOwnerID: existingUser._id,
                topic: topic,
                content: content,
                createdAt: moment().toDate(),
                updatedAt: moment().toDate()
            }
        }
            
        const result = await createReportBugs(report)

        if(!result){
            console.log("Failed Creating Bug Report")
            return res.json({
                messages: {
                    code: 1,
                    message: "Failed Creating Bug Report"
                }
            }).status(400)
        }

        console.log("Created Bug Report Successfully")

        return res.json({
            messages: {
                code: 0,
                message: "Created Bug Report Successfully"
            },
            result
        }).status(200)


    } catch (error) {
        console.log( "Internal Server Error: ", error)
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }
        }).status(500)
    }
}

export const getReports = async (req: express.Request, res: express.Response) => {
    try{
        
        const result = await getReportBugsByResolved("No")

        if(result.length === 0){
            console.log("No exisiting Bug Reports")
            return res.json({
                message: {
                    code: 1,
                    message: "No exisiting Bug Reports"
                }
            }).status(404)
        }

        console.log("Retrieved Bug Reports Successfully")

        return res.json({
            message: {
                code: 0,
                message: "Retrieved Bug Reports Successfully"
            }, 
            result
        }).status(200)

    } catch (error) {
        console.log("Internal Server Error")
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }
        }).status(500)
    }
}


export const getResolvedReports = async (req: express.Request, res: express.Response) => {
    try{
        
        const result = await getReportBugsByResolved("Yes")

        if(result.length === 0){
            console.log("No exisiting Bug Reports")
            return res.json({
                message: {
                    code: 1,
                    message: "No exisiting Bug Reports"
                }
            }).status(404)
        }

        console.log("Retrieved Bug Reports Successfully")

        return res.json({
            message: {
                code: 0,
                message: "Retrieved Bug Reports Successfully"
            }, 
            result
        }).status(200)

    } catch (error) {
        console.log("Internal Server Error")
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            }
        }).status(500)
    }
}


export const deleteReport = async (req: express.Request, res: express.Response) => {
    try{

        const { id } = req.params

        if(!id){
            console.log("Bad Request")
            return res.json({
                messages: {
                    code: 1,
                    message: "Bad Request"
                }
            }).status(400)
        }
        
        const result = await deleteReportBugsById(id)

        if(!result) {
            console.log("Failed to delete Bug Report")
            return res.json({
                messages: {
                    code: 1,
                    message: "Failed to delete Bug Report"
                }
            }).status(304)
        }

        console.log("Successfully deleted Bug Report")
        return res.json({
            messages: {
                code: 0,
                message: "Successfully deleted Bug Report"
            },
            result
        }).status(200)

    } catch(error) {
        console.log( "Internal Server Error", error)
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error"
            },
             error
        }).status(500)
    }
}


export const updateResolved = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            console.log("Bad Request Invalid Report Bug ID");
            return res.json({
                messages: {
                    code: 1,
                    message: "Bad Request Invalid Report Bug ID",
                },
            }).status(400);
        }

        const result = await updateResolvedOfReport(id); // Pass the bug report ID to the updateResolvedOfReport function

        if (!result) {
            console.log("Failed to Update Report");
            return res.json({
                messages: {
                    code: 1,
                    message: "Failed to Update Report",
                },
            }).status(400);
        }

        console.log("Successfully Updated Report");
        return res.json({
            messages: {
                code: 0,
                message: "Successfully Updated Report",
            },
            result,
        }).status(200);
    } catch (error) {
        console.log("Internal Server Error: ", error);
        return res.json({
            messages: {
                code: 1,
                message: "Internal Server Error",
            },
            error,
        }).status(500);
    }
};