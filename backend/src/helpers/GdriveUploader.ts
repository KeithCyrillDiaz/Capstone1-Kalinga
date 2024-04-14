import { google } from "googleapis";
import fs from "fs";
import authorize from "../config/Gdrive";

// UPLOAD FILES
export const UploadFiles = async (fileObject:any, folder_id:any) => {
  try {
    console.log("fileObject.originalname", fileObject.originalname)
    console.log("fileObject.path", fileObject.path)
    const { data } = await google.drive({ version: "v3", auth: authorize }).files.create({
        media: {
          mimeType: fileObject.mimeType,
          body: fs.createReadStream(fileObject.path),
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
