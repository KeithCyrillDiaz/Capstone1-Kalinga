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
    const { data } = await google
      .drive({ version: "v3", auth: authorize })
      .files.delete({
        fileId: fileID,
      });

    return data;
  } catch (err) {
    console.log(err);
  }
};
