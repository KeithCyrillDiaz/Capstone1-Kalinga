// Frontend: App.js

import React, { useState, useEffect } from 'react';
import { View, Button, Image, Alert, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function App() {
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState({});
  

  const handleImageUpload = async (attachmentType) => {
    try {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [Dimensions.get('window').width, Dimensions.get('window').height],
            quality: 1,
            multiple: true, 
        });

        if (!result.cancelled && result.assets && result.assets.length > 0) {
          setSelectedImage(prevState => ({
              ...prevState,
            
              // [attachmentType]: result.assets[0].uri
              // [attachmentType]: ({
                uri: result.assets[0].uri,
                // name: result.assets[0].name,
                type: result.assets[0].type
              // })
              
          }));
          // console.log("results: ", result.assets[0].uri);
          // console.log("selectedImage after update:", selectedImage);
          const numberOfObjects = Object.keys(selectedImage).length;
          // if (numberOfObjects >= 3) setScrollableHorizontal(true);
          // console.log("numberofObjects:", numberOfObjects)
          // setImageContainer(true)
      }
          
          // console.log("results: ", result.assets[0].uri)
          // console.log("selectedImage after update:", selectedImage);
          // console.log("selectedImage:", selectedImage)

          // console.log("results: ", result.assets[0].uri)
          //   setSelectedImage(result.assets[0].uri);
          // console.log("selectedImage:", selectedImage)  
        
    } catch (error) {
        Alert.alert('Error', 'Failed to pick an image.');
    }

    // console.log("selectedImage:", JSON.stringify(selectedImage, null, 2));
};


useEffect(() => {
  console.log("selectedImage:", JSON.stringify(selectedImage, null, 2));
}, [selectedImage]);


const selectedImages = {
    "HepaB": {
      "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKalinga-af65754e-b276-4374-b355-875428704307/ImagePicker/c269951b-57c5-437a-80c2-f0ebf5de8002.jpeg",
      "name": "HepaB",
      "type": "image"
    },
    "HIV": {
      "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKalinga-af65754e-b276-4374-b355-875428704307/ImagePicker/ef253a16-8a2a-4745-acb4-f1e2a0b824c7.jpeg",
      "name": "HIV",
      "type": "image"
    }
  };

  
const uploadImage = async (imageUri) => {
  const formData = new FormData();
  formData.append('image', {
    uri: selectedImage.uri,
    type: 'image/jpeg', // or the MIME type of your image
    name: 'image.jpg',
  });

  try {
    const response = await fetch('http://192.168.1.104:7000/kalinga/addMedicalRequirementsAsImage', {
      method: 'POST',
      body: formData,
    });
    if (!response.data){
      throw new Error('Failed to upload image');
    }
    console.log('Image uploaded successfully');
  } catch (error) {
    console.error('Error uploading image:', error.message);
  }
};

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Pick an image from camera roll" onPress={handleImageUpload} />
      <Button title="Upload image" onPress={uploadImage}/>
    </View>
  );
}
