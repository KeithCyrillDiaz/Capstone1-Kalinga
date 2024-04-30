import { google } from "googleapis";
import fs from "fs";
import authorize from "../config/Gdrive";
import { Readable } from 'stream';

// UPLOAD FILES
export const UploadFiles = async (fileObject:any, folder_id:any) => {
  try {
    const { data } = await google.drive({ version: "v3", auth: authorize }).files.create({
        media: {
          mimeType: fileObject.mimeType,
          // body: fs.createReadStream(fileObject.path),
          body: Readable.from(fileObject.buffer), // Read from buffer using Readable.from()
        }, 
        requestBody: {
          name: fileObject.originalname,
          parents: [folder_id],
        },
        fields: "id, name",
      });

    return data;
  } catch (err) {
    console.log(err);
  }
};

// DELETE FILES
export const DeleteFiles = async (fileID: any) => {
  try {
    console.log("fileID: ", fileID)
    const { data } = await google
      .drive({ version: "v3", auth: authorize })
      .files.delete({
        fileId: fileID,
      });
    console.log("File deleted successfully In Gdrive");
    return data;
  } catch (err) {
    console.log("Error Deleting Files in Gdrive:", err.message); // Log the specific error message
    throw new Error("Failed to delete file in Gdrive");
  }
};

