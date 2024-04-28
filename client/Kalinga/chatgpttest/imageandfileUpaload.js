import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, Dimensions} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

const UploadScreen = () => {
  const [selectedImage, setSelectedImage] = useState({});
  const [selectedFile, setSelectedFile] = useState({});

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
      });
      console.log("Image picker result:", result);

      if (!result.cancelled && result.assets.length > 0) {
        const uri = result.assets[0].uri;

        setSelectedImage(prevState => ({
            ...prevState,
           [attachmentType]: uri
        }))
        console.log("uri:", uri);
        console.log("success:", selectedImage);
        // setSelectedImage(uri);
    } else {
        console.log("Image selection cancelled or no assets found.");
    }
      // if (!result.cancelled) {
      //   setSelectedImage(result.uri);
      // }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick an image.');
    }
  };

  const handleFileUpload = async (attachmentType) => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      console.log("Document picker result:", result);
      // console.log("success:", result.assets[0].uri);
      if (!result.assets.uri) {
        console.log("test:", result.assets[0].uri);
        // setSelectedFile(result.uri);
        setSelectedFile(prevState => ({
            ...prevState,
            [attachmentType]: result.assets[0].uri,
            name: result.assets[0].name
        }));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick a file.');
    }
  };

  useEffect(() => {
    console.log("selectedFile:", JSON.stringify(selectedFile, null, 2));
  }, [selectedFile]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={()=> handleImageUpload('hepaB')}>
        <Text>Select Image</Text>
      </TouchableOpacity>
      {/* {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />} */}

      <TouchableOpacity onPress={()=> handleFileUpload('hepaB')}>
        <Text>Select File</Text>
      </TouchableOpacity>
      {selectedFile && (
        <Text>{selectedFile.name}</Text>
      )}
    </View>
  );
};

export default UploadScreen;