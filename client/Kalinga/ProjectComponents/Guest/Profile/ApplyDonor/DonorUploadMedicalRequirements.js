//Guest Home
import React, { useState, useEffect } from 'react';
import { ScrollView,Text, View, StatusBar, StyleSheet, TouchableOpacity, Alert, Dimensions, Image, Modal, TouchableHighlight} from 'react-native';
import { globalStyles } from "../../../../styles_kit/globalStyles.js";
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import ImageZoom from 'react-native-image-pan-zoom';
import { BASED_URL } from '../../../../MyConstants.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Uploading } from '../../../uploader/Uploading.js';
import { UploadImageOrFileToFirebase } from '../../../uploader/fireBaseUploader.js'
import { ImagePickerModal } from '../../../modal/ImagePickerModal.js';
const DonorUploadMedicalRequirements = ({route}) => {

  const { screeningFormData } = route.params;

  const [selectedImage, setSelectedImage] = useState({});
  const [selectedFile, setSelectedFile] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [fileContainer, setFileContainer] = useState(false)
  const [scrollableHorizontal, setScrollableHorizontal] = useState(false)
  const [imageContainer, setImageContainer] = useState(false)
  const navigation = useNavigation();

  //uploaderModal
  const [progressBar, setProgressBar] = useState(0)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageUri, setIMageUri] = useState("")
  const [loaderLabel, setLoaderLabel] = useState("")

  //imagePicker
  const [showImagePicker, setShowImagePicker] = useState(false)
  const [selectedType, setSelectedType] = useState("")

  const confirmation = () => {
    Alert.alert('Confirmation','Are you sure you want to submit your Application?',
    [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () =>  navigatePage("EmailVerification", screeningFormData),
      },
    ]
  )
    
 }


  const navigatePage = async (Page, Data) => {
    try {
     if(Object.keys(selectedImage).length + Object.keys(selectedFile).length < 5){
      Alert.alert(
        "Incomplete Medical Requirements",
        "Please upload all the required documents to proceed."
      );
      return
     }
     
     setUploadingImage(true)
        // Send POST request to the specified URL with the form data
        const postScreeningForm = await axios.post(`${BASED_URL}/kalinga/addScreeningForm`, 
              screeningFormData,
        );
        // Log successful response from the backend

        console.log('Data saved successfully:', postScreeningForm.data);

        for (const key in selectedImage) {
          const imageData = selectedImage[key];
          
        await UploadImageOrFileToFirebase({
          URI: imageData.uri, 
          requirmentType: imageData.name,
          purpose: "Application",
          type: "Image",
          userType: "Donor", 
          userId: screeningFormData.Applicant_ID,
          nameOfUser: screeningFormData.fullName,
          percent: setProgressBar, // for uploading with loader
          setImage: setIMageUri, // for uploading with loader
          setLabel: setLoaderLabel  // for uploading with loader
        });
        }


        for (const key in selectedFile) {
          const fileData = selectedFile[key];
          
          await UploadImageOrFileToFirebase({
            URI: fileData.uri, 
            requirmentType: fileData.requirementType,
            purpose: "Application",
            type: "File",
            userType: "Donor", 
            userId:screeningFormData.Applicant_ID,
            nameOfUser: screeningFormData.fullName,
            percent: setProgressBar,// for uploading with loader
            setImage: setIMageUri, // for uploading modal
            setLabel: setLoaderLabel // for uploading with loader
          });
        }

          await AsyncStorage.setItem('Pending', 'True')
          await AsyncStorage.setItem('DonorApplicant_ID', screeningFormData.Applicant_ID)
          setUploadingImage(false)

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: Page, params: Data } ], 
            })
          );
          return
    } catch (error) {
        // Handle error if the request fails
        console.error('Error saving data:', error);
    } 
};

const chooseImagePicker = async (value) => {
  setShowImagePicker(false)
  if(value === "Camera"){
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
          console.error('Camera permission not granted');
          return;
      }
      
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [Dimensions.get('window').width, Dimensions.get('window').height],
        quality: 1,
      });

      return result
  } else {
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

      return result
  }
 
}

  const handleImageUpload = async (attachmentType, value) => {
    try {

        console.log("attachmentType: ", attachmentType)
        console.log("value: ", value)
       const result = await chooseImagePicker(value)
  
        if (!result.canceled && result.assets && result.assets.length > 0) {
          delete selectedFile[attachmentType]
          if(Object.keys(selectedFile).length===0)setFileContainer(false)
            let fileType = ''
          result.assets.forEach(image => {

            if (image.type === 'image' || !image.type.includes('/')) {
                      fileType = image.type + "/jpeg"

            } else {

              fileType = image.type

            }
          });

          setSelectedImage(prevState => ({
              ...prevState,
            

              [attachmentType]: ({
                uri: result.assets[0].uri,
                name: attachmentType, 
                type: fileType,
                userType: "Donor",
                owner: screeningFormData.fullName,
                ownerID: screeningFormData.Applicant_ID
            
              })
              
          }));

          const numberOfObjects = Object.keys(selectedImage).length;
          if (numberOfObjects >= 3) setScrollableHorizontal(true);

          setImageContainer(true)
      }
          
        
    } catch (error) {
        Alert.alert('Error', 'Failed to pick an image.');
    }
};

const handleFileUpload = async (attachmentType) => {
  try {
    const result = await DocumentPicker.getDocumentAsync();
    if (!result.canceled && result.assets && result.assets.length > 0) {
        delete selectedImage[attachmentType]
        if(Object.keys(selectedImage).length===0)setImageContainer(false)
        if(Object.keys(selectedImage).length < 3)setScrollableHorizontal(false)
        let fileName
            if (
              result.assets[0].mimeType === "application/pdf" ||
              result.assets[0].mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ) {
              if (result.assets[0].mimeType === "application/pdf") {
                  fileName = attachmentType + ".pdf";
                  fileType = result.assets[0].mimeType;
              } else {

                  fileType = "application/docx";
                  fileName = attachmentType + ".docx";
              }
          } else {
              fileName = attachmentType;
          }
        // Create a new object to hold the updated selected file state
        const updatedSelectedFile = {
            ...selectedFile,
            [attachmentType]: {
                // name: screeningFormData.fullName + "_" + attachmentType + result.assets[0].type,
                name: result.assets[0].name,
                uri: result.assets[0].uri,
                type: fileType,
                userType: "Donor",
                owner: screeningFormData.fullName,
                size: result.assets[0].size,
                requirementType: attachmentType,
                ownerID: screeningFormData.Applicant_ID
            }
        };
        // Update the selectedFile state
        setSelectedFile(updatedSelectedFile);
        // console.log("updatedSelectedFile:", updatedSelectedFile)
        setFileContainer(true)
    }
}catch (error) {
      Alert.alert('Error', 'Failed to pick a file.');
    }
  };
  

  //DO NOT DELETE THIS FOR CHECKING

// useEffect(() => {
//   console.log("selectedImage:", JSON.stringify(selectedImage, null, 2));
// }, [selectedImage]);

// useEffect(() => {
//   console.log("selectedFile:", JSON.stringify(selectedFile, null, 2));
// }, [selectedFile]);

// useEffect(() => {
//   console.log("formData:", JSON.stringify(uploadedFiles, null, 2));
// }, [uploadedFiles]);


  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  
};


    return (
      <View style={globalStyles.container}>
         <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Apply as Donor</Text>
            </View>
        <ScrollView 
        showsVerticalScrollIndicator = {false}
        overScrollMode='never'
        style={styles.body}>

          {uploadingImage && (
             <Uploading 
             progress={progressBar} 
             Image={imageUri}
             label={loaderLabel}
            //  onClose = {() => setUploadingImage(false)}
            />
          )}
           {showImagePicker && (
              <ImagePickerModal
              onSelect = {handleImageUpload}
              type= {selectedType} 
              onClose={() => setShowImagePicker(false)}/>
          )}

            <View style={styles.rectanglesContainer}>
                <View style={styles.rectangle}></View>
                <View style={styles.rectangle}></View>
                <View style={styles.rectangle}></View>
                <View style={styles.rectangle}></View>
                <View style={styles.rectangleIndicator}></View>
            </View>

            <Text style = {styles.title}> Upload Medical Requirements </Text>
            <Text style = {styles.note}> Note: Please make sure that your images are clear</Text>
            

            <View style = {styles. attachmentContainer}>
                <Text style={styles.label}>
                    Attach Hepa B Test Result
                </Text>
                <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <View style={styles.iconContainer}>
                        <TouchableOpacity 
                        style = {{ backgroundColor: "pink", padding:4, borderRadius: 7}} 
                        onPress={()=>{
                          setSelectedType('HepaB')
                          setShowImagePicker(true)
                          }}
                        >
                          <AntDesign name="picture" size={27} color="#E60965" />
                        </TouchableOpacity>
                        <Text style={styles.verticalLine}>|</Text>
                        <TouchableOpacity style = {{ backgroundColor: "pink", padding: 5, borderRadius: 7}} onPress={()=> handleFileUpload('HepaB')}>
                          <AntDesign name="file1" size={24} color="#E60965"/>
                        </TouchableOpacity>
                    </View>
                   
                   
                </View>
            </View>

            <View style = {styles. attachmentContainer}>
                <Text style={styles.label}>
                  Attach HIV 1 & 2 Test Result
                </Text>
                <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <View style={styles.iconContainer}>
                        <TouchableOpacity 
                        style = {{ backgroundColor: "pink", padding:4, borderRadius: 7}} 
                        onPress={()=>{
                          setSelectedType('HIV')
                          setShowImagePicker(true)
                          }}
                        >
                          <AntDesign name="picture" size={27} color="#E60965" />
                        </TouchableOpacity>
                        <Text style={styles.verticalLine}>|</Text>
                        <TouchableOpacity style = {{ backgroundColor: "pink", padding: 5, borderRadius: 7}}  onPress={()=> handleFileUpload('HIV')}>
                          <AntDesign name="file1" size={24} color="#E60965"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style = {styles. attachmentContainer}>
                <Text style={styles.label}>
                    Attach Syphillis Test Result
                </Text>
                <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <View style={styles.iconContainer}>
                        <TouchableOpacity 
                        style = {{ backgroundColor: "pink", padding:4, borderRadius: 7}} 
                        onPress={()=>{
                          setSelectedType('Syphillis')
                          setShowImagePicker(true)
                          }}
                        >
                          <AntDesign name="picture" size={27} color="#E60965" />
                        </TouchableOpacity>
                        <Text style={styles.verticalLine}>|</Text>
                        <TouchableOpacity style = {{ backgroundColor: "pink", padding: 5, borderRadius: 7}}  onPress={()=> handleFileUpload('Syphillis')} >
                          <AntDesign name="file1" size={24} color="#E60965"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style = {styles. attachmentContainer}>
                <Text style={styles.label}>
                    Attach Pregnancy Booklet
                </Text>
                <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <View style={styles.iconContainer}>
                        <TouchableOpacity style = {{ backgroundColor: "pink", padding:4, borderRadius: 7}} 
                        onPress={()=>{
                          setSelectedType('Pregnancy Book')
                          setShowImagePicker(true)
                          }}
                        >
                          <AntDesign name="picture" size={27} color="#E60965" />
                        </TouchableOpacity>
                        <Text style={styles.verticalLine}>|</Text>
                        <TouchableOpacity style = {{ backgroundColor: "pink", padding: 5, borderRadius: 7}}  
                        onPress={()=> handleFileUpload('Pregnancy Book')}>
                          <AntDesign name="file1" size={24} color="#E60965"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style = {styles. attachmentContainer}>
                <Text style={styles.label}>
                    Government ID 
                </Text>
                <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <View style={styles.iconContainer}>
                        <TouchableOpacity 
                        style = {{ backgroundColor: "pink", padding:4, borderRadius: 7}}  
                        onPress={()=>{
                          setSelectedType('Government_ID')
                          setShowImagePicker(true)
                          }}
                        >
                          <AntDesign name="picture" size={27} color="#E60965" />
                        </TouchableOpacity>
                        <Text style={styles.verticalLine}>|</Text>
                        <TouchableOpacity style = {{ backgroundColor: "pink", padding: 5, borderRadius: 7}}  onPress={()=> handleFileUpload('Government_ID')} >
                          <AntDesign name="file1" size={24} color="#E60965"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
                        {/* <Text style = {{ 
                          textAlign: "center", 
                          color:"#E60965", 
                          fontSize: 17, 
                          marginBottom: 10, 
                          marginTop: 10,
                          fontFamily: "Open-Sans-SemiBold"
                          
                          }}> Uploaded Files and Images</Text> */}
            {imageContainer && (
                  <View  style = {{
                    height: 150,
                    marginBottom: 20,
                    backgroundColor: "white",
                    paddingLeft: 10,
                    paddingRight: 10,
                    borderColor: "#E60965",
                    borderRadius: 15,
                    elevation: 7,
                    marginTop: 20,
                    }}>
                    <ScrollView 
                      showsHorizontalScrollIndicator={true}
                      overScrollMode='never'
                    horizontal={scrollableHorizontal}
                    contentContainerStyle={{ flexDirection: 'row', }}
                  >
                      {Object.entries(selectedImage).map(([attachmentType, value]) => (
                                <TouchableOpacity
                                    key={attachmentType}
                                    onPress={() => {
                                        setSelectedImageUrl(value.uri);
                                        setModalVisible(true);
                                    }}
                                >
                                    <View style={{ marginHorizontal: 5 , alignItems: "center"}}>
                                        <Text style ={{
                                          textAlign: "center",
                                          color: "#E60965",
                                          marginTop: 7,
                                      
                                        }}>{attachmentType}</Text>
                                        <Image
                                            source={{ uri: value.uri }}
                                            style={{ width: 100, height: 100, marginTop: 7, resizeMode: 'cover',}}
                                        />
                                    </View>
                                </TouchableOpacity>
                            ))}

                    </ScrollView>
                </View>
            )}
            
           

            {fileContainer && (
                      <View  style={{ 
                        paddingVertical: 20,
                        borderColor: "#E60965",
                        backgroundColor: "white",
                        width: "100%",
                        borderRadius: 15,
                        elevation: 7,
                  
                        }}>
                          {Object.entries(selectedFile).map(([attachmentType,  file]) => {
                          if (attachmentType !== "uri" && attachmentType !== "type") {
                          return (
                              <View key={attachmentType} 
                              style={{ 
                                flexDirection: "row", 
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "center"
                                }}>

                                  <View style = {styles.fileType}>
                                    <Text style = {{color: "#E60965", fontFamily: "Open-Sans-Bold"}}>{attachmentType}: </Text>
                                  </View>
                                  <View style = {styles.fileName}>
                                    <Text style= {{width: 170}}>{file.name}</Text>
                                  </View>
                              </View>
                          );
                          }
                          return null; // Return null for other entries
                          })}

                       </View>
            )}
           
          

            <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                      setModalVisible(!modalVisible);
                  }}
              >
                  <View style={styles.modalContainer}>
                  <ImageZoom
                      cropWidth={Dimensions.get('window').width}
                      cropHeight={Dimensions.get('window').height}
                      imageWidth={Dimensions.get('window').width}
                      imageHeight={Dimensions.get('window').height * 1} // Adjust the height as needed
                      enableSwipeDown={true}
                      onSwipeDown={() => setModalVisible(false)} // Close modal on swipe down
                      style={{ backgroundColor: 'black' }} // Set background color to black to avoid seeing the underlying content
                  >
                      <Image
                          source={{ uri: selectedImageUrl }}
                          style={{ width: '100%', height: '100%' }}
                      />
                  </ImageZoom>
                      <TouchableHighlight
                          style={styles.closeButton}
                          onPress={() => {
                              setModalVisible(!modalVisible);
                          }}
                      >
                          <AntDesign name="close" size={24} color="black" />
                      </TouchableHighlight>
                  </View>
              </Modal>

            <TouchableOpacity onPress={toggleCheckbox} style={styles.checkbox}>
                {isChecked ? <AntDesign name="checksquare" size={17} color="#E60965" /> 
                : <Fontisto name="checkbox-passive" size={17} color="#E60965" />}
                <Text style={styles.checkBoxLabel}>I have read the Donation Terms and Condition</Text>
            </TouchableOpacity>

            {/*Approved.js*/}
            <TouchableOpacity 
            style={[
              styles.button, 
              { opacity: (isChecked && Object.keys(selectedImage).length + Object.keys(selectedFile).length >= 5) ? 1 : 0.5 } // Apply opacity based on conditions
            ]}
            disabled={!isChecked} // Disable the button based on conditions
            onPress={() =>confirmation()}
          > 
            <Text style={styles.buttonTitle}>Submit</Text>
          </TouchableOpacity>

           
        </ScrollView>

      </View>
        
      )
  }


  const styles = StyleSheet.create({

    fileType: {

      width: "37%",
      paddingVertical: 5,
      // borderWidth: 1,
      // borderColor: "#E60965",
      marginVertical: 3,

    },

    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  },
  modalContent: {
      width: '80%',
      aspectRatio: 1,
      backgroundColor: 'white',
      borderRadius: 10,
      overflow: 'hidden',
  },
  closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 1,
  },

    body: {
        flex: 1,
        // backgroundColor: "pink",
        width: "88%"
    },

    button: {
        backgroundColor: "#E60965",
        width: 100,
        alignSelf: "center",
        marginVertical: 30,
        paddingVertical: 7,
        borderRadius: 30,
        
      },
  
      buttonTitle: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 15,
        fontFamily: "Open-Sans-SemiBold",
      },

    title: {
      textAlign: 'center', // Center align the text
      marginTop: 20, // Adjust margin top as needed
      fontSize: 20, // Adjust the font size
      fontWeight: 'bold', // Apply bold font weight
      color: '#E60965',
      marginBottom: 20
    },

    note: {
      color: '#E60965',
      fontFamily: "Open-Sans-SemiBold",
      marginBottom: 10,
      fontSize: 13
    },
    
    row: {
      flexDirection: "row"
    },

    rowAlignment: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },

    iconContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 5,
      marginLeft: 10,
    },


    attachmentContainer: {
      backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        borderColor: "#E60965",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 17,
        elevation: 7,
        backgroundColor: "#FFFFFF"
    },

    label: {
        color: "#E60965",
        fontSize: 15,
        fontFamily: "Open-Sans-SemiBold",
    },

    rectanglesContainer: {
      flexDirection: "row",
      marginTop: "10%",
      //backgroundColor: "red",
      height: 10,
      justifyContent: "center"
  },

  rectangle: {
    width: 50,
    height: 7, 
    backgroundColor: 'white', // Color for Rectangle F94892
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 7
  },

  rectangleIndicator: {
    width: 50,
    height: 7, 
    backgroundColor: '#F94892', // Color for Rectangle F94892
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 7
  },

    verticalLine: {
      fontSize: 37,
      marginTop: -10,
      color: "#E60965",
    },

    checkbox: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
      marginTop: 20,
    },

    checkBoxLabel: {
      marginLeft: 5,
      color: "#E60965",
      fontSize: 13,
      fontFamily: "Open-Sans-Regular",
    }

  })
  
export default DonorUploadMedicalRequirements;

