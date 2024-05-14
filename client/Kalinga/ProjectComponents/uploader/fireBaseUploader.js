
import React, { useState } from 'react'
import { storage } from '../../fireBaseConfig'; 
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { BASED_URL } from '../../MyConstants';

export const UploadImageOrFileToFirebase = ({
    URI, //Image or File URI
    requirmentType, // Medical Requirement Type for naming in database
    purpose, 
    type,
    userType, 
    userId, 
    nameOfUser,
    percent,  // for loader optional
    setImage, // for loader optional
    setLabel, // for loader optional
 
  }) => {
    return new Promise(async (resolve, reject) => {
      try {

        if(setImage && setLabel && percent){
            const uri = type === "File" ? "" : URI
            const label = type === "File" ? "Uploading Files..." : "Uploading Images..."
            setLabel(label)
            setImage(uri)
        }
       

        const fileType = type === "File" ? "/Files/" : "/Images/";
        const secondFolder = purpose === "Application" 
          ? "Application/" 
          : purpose === "DP" || purpose === "ProfilePicture"
          ? "Profile-Pictures/"
          : purpose === "Request" 
          ? "Request/"
          : "BugReports/";
        
        const fileName = new Date().getTime();
        const filePath = userType + "/" + nameOfUser + "/" + secondFolder + fileType;
        
      
        const response = await fetch(URI);
        const blob = await response.blob();
        
        // Upload the Image in the Firebase
        const storageRef = ref(storage, filePath + fileName);
        const uploadTask = uploadBytesResumable(storageRef, blob);
  
        uploadTask.on("state_changed", (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if(percent)percent(progress.toFixed());
        }, (error) => {
          console.error('Error uploading image: ', error);
          reject(error);
        }, async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await uploadImageOrFileDataToDatabase({
              id: userId,
              purpose: "Application",
              path: filePath + fileName, 
              url: downloadURL,
              name: requirmentType, 
              type: type
            });
            resolve(); // Resolve the promise when upload and database update are complete
          } catch (error) {
            console.error('Error getting download URL: ', error);
            reject(error);
          }
        });
      } catch (error) {
        console.error('Error fetching file: ', error);
        reject(error);
      }
    });
  };

export const uploadImageOrFileDataToDatabase = async ({id, purpose, path, url, name, type}) => {
    
    try {

        console.log(`uploading ${type} Data`)
        const response = await axios.post(`${BASED_URL}/kalinga/uploadFileOrImageDataInDatabase/${id}`,
            {
                url: url,
                path: path,
                purpose: purpose,
                name: name,
                type: type
            }
        )
        console.log(response.data.messages.message)

    } catch(error) {
        console.log(`Error uploading ${type} Data`,error)
        return
    }
}
