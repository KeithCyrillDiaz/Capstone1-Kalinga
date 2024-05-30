
import React, { useState } from 'react'
import { storage } from '../../fireBaseConfig'; 
import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import axios from 'axios';
import { BASED_URL } from '../../MyConstants';


export const deleteFolderContents = async ({folderPath}) => {
  const folderRef = ref(storage, folderPath);

  try {
    // List all files and folders in the specified folder path
    const listResult = await listAll(folderRef);

    // Create an array of promises to delete each file
    const deletePromises = listResult.items.map(itemRef => deleteObject(itemRef));
    await Promise.all(deletePromises);

    console.log(`All files in folder ${folderPath} have been deleted.`);
  } catch (error) {
    console.error('Error deleting folder contents: ', error);
    throw error;
  }
};


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
        console.log("userId", userId)
        if(setImage && setLabel && percent){
            const uri = type === "File" ? "" : URI
            const label = type === "File" ? "Uploading Files..." : "Uploading Images..."
            setLabel(label)
            setImage(uri)
        }
       

        const fileType = type === "File" ? "Files/" : "Images/";
        const secondFolder = purpose === "Application" 
          ? "Application/" 
          : purpose === "DP" || purpose === "ProfilePicture"
          ? "Profile-Pictures/"
          : purpose === "Request" 
          ? "Request/"
          : purpose === "Donate" 
          ? "Donate/"
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
              purpose: purpose,
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

export const uploadDpInFirebase = async ({
  id,
  userType,
  nameOfUser,
  purpose,
  URI,
  setImage,
  setLabel,
  percent,
  token,
  setResponse,
  setLink,
  setPath,
}) => {
  return new Promise(async (resolve, reject) => {
    try {

      if(setImage && setLabel && percent){
          const label = "Updating Profile Picture..."
          setLabel(label)
          setImage(URI)
      }
     

      const fileType = "Images/";
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
          setPath(filePath)
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setLink(downloadURL)
          const result = await uploadImageDataInDatabase({
            id: id,
            link: downloadURL,
            path: filePath,
            userType: userType,
            token: token,
            setHook: setResponse,
          });
          resolve(result); // Resolve the promise when upload and database update are complete
        } catch (error) {
          console.error('Error getting download URL: ', error);
          reject(error);
        }
      });
    } catch (error) {
      console.error('Error Uploading Profile Pic in Firebase: ', error);
      reject(error);
    }
  });
}


export const uploadImageDataInDatabase = async ({id, link, path, userType, token, setHook}) => {
  try {
    const response = await axios.patch(`${BASED_URL}/kalinga/updateProfilePicture/${id}`,
      {
        userType,
        link,
        path
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setHook(response.data.messages.message);
    if(response.data.messages.code === 0 ){
      return response.data.result; // Return the result
    } else {
      return {};
    }
  } catch (error) {
    console.log("Error Uploading Image Data in Database", error);
    return {};
  }
}