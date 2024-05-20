import { Request, Response } from "express";
import RequestModel from "../../models/Requestor/RequestorRequestModel";

export const getApprovedRequests = async (req: Request, res: Response) => {
  try {
    const { Requestor_ID } = req.params; // Assuming Requestor_ID is passed in URL params

    const ApprovedRequests = await RequestModel.find({
      RequestStatus: "Ongoing",
      Requestor_ID: Requestor_ID, // Assuming Requestor_ID is a valid field in your document
    });

    if (!ApprovedRequests || ApprovedRequests.length === 0) {
      console.log("No Approved Request ");
      return res
        .json({
          messages: {
            success: false,
            error: "No pending requests found",
          },
        })
        .status(204);
    }

    console.log("Retrieve Approved Request ");
    return res.status(200).json({
      messages: {
        success: true,
      },
      RequestData: ApprovedRequests,
    });
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    return res.status(500).json({
      messages: {
        success: false,
      },
      error: "Error fetching pending requests",
    });
  }
};
