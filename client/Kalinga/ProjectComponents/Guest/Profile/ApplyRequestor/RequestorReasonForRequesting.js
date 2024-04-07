//Guest EducLibrary
import React, { useState } from "react";
import { 
  ScrollView, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity, 
  Dimensions,
  Image,
  TouchableHighlight,
  Alert
} from 'react-native';
import { globalStyles } from "../../../../styles_kit/globalStyles.js"
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { CommonActions } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import ImageZoom from 'react-native-image-pan-zoom';
import axios from 'axios';

const ReasonForRequesting = ({route}) => {
   
    const { screeningFormData } = route.params;
    const { input } = route.params;
    const [selectedImage, setSelectedImage] = useState({});
    const [selectedFile, setSelectedFile] = useState({});
    // const [uploadedFiles, setUploadedFiles] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const [fileContainer, setFileContainer] = useState(false)
    const [scrollableHorizontal, setScrollableHorizontal] = useState(false)
    const [imageContainer, setImageContainer] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const handleChangeText = (name, value) => {
      screeningFormData[name] = value
  };

    const navigation = useNavigation();
    const navigatePage = async (Page) => {

      try {
      
        setIsLoading(true);
        // Send POST request to the specified URL with the form data
        const postScreeningForm = await axios.post("http://192.168.1.104:7000/kalinga/addScreeningForm", 
          screeningFormData,
        );
        // Log successful response from the backend
        console.log('Data saved successfully:', postScreeningForm.data);

        const response = await axios.post("http://192.168.1.104:7000/req_MedAbstract", input);
  //   // Handle success response...
          
        const formData = new FormData();
        formData.append('image', selectedImage);
        if(Object.keys(selectedImage).length !== 0){
            const uploadedImages = new FormData();

            for (const key in selectedImage) {
              const imageData = selectedImage[key];
              const file = {
                uri: imageData.uri,
                type: 'image/jpeg', // Assuming all image types are JPEG
                name: `${key}.png`,
              };

              uploadedImages.append('RequestorImages', file); // Append the file directly
              uploadedImages.append(`userType`, "Requestor"); 
              uploadedImages.append(`owner`, imageData.owner);// Append userType
              uploadedImages.append(`ownerID`, imageData.ownerID);// Append userType
            }
    
            // setUploadedFiles(uploadedImages)
    
            const postImages = await axios.post("http://192.168.1.104:7000/kalinga/addMRImageRequestor", 
              uploadedImages,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
            );
            // console.log('Data saved successfully:', postImages.data);
        }
       
          // Log successful response from the backend
     
            
          if(Object.keys(selectedFile).length !== 0){

              const uploadedFiles = new FormData();

              for (const key in selectedFile) {
                const imageData = selectedFile[key];
                const file = {
                  uri: imageData.uri,
                  type: imageData.type, 
                  name: imageData.name,
                };
                uploadedFiles.append('RequestorFiles', file); // Append the file directly
                uploadedFiles.append(`userType`, "Requestor"); 
                uploadedFiles.append(`owner`, imageData.owner);// Append userType
                uploadedFiles.append(`ownerID`, imageData.ownerID);// Append userType
                uploadedFiles.append(`requirementType`, imageData.requirementType); // Append owner
              }
      
              // setUploadedFiles(uploadedFiles)
      
              const postFiles = await axios.post("http://192.168.1.104:7000/kalinga/addMRFileRequestor", 
                uploadedFiles,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }
              );
              // console.log('Data saved successfully:', postFiles.data);
          }
          
          navigation.dispatch(
            CommonActions.reset({
              index: 0, //Reset the stack to 0 so the user cannot go back
              routes: [{ name: Page }], 
            })
          );

    } catch (error) {
        // Handle error if the request fails
        setIsLoading(false);
        Alert.alert('Something Went Wrong: Please Try Again');
        console.error('Error saving data:', error);
    } finally {
      setIsLoading(false);
    }
      navigation.navigate(Page); // Navigate to the Login screen
    }


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
              let fileType = ''
            result.assets.forEach(image => {
  
              if (image.type === 'image' || !image.type.includes('/')) {
                        fileType = image.type + "/jpeg"
  
              } else {
  
                fileType = image.type
  
              }
            });
  
            console.log("fileType: ", fileType)
            setSelectedImage(prevState => ({
                ...prevState,
              
  
                [attachmentType]: ({
                  uri: result.assets[0].uri,
                  name: attachmentType, 
                  type: fileType,
                  userType: "Donor",
                  owner: screeningFormData.fullName,
                  ownerID: screeningFormData.applicantId
              
                })
                
            }));
  
            const numberOfObjects = Object.keys(selectedImage).length;
            if (numberOfObjects >= 3) setScrollableHorizontal(true);
  
            setImageContainer(true)
        }
            
          
      } catch (error) {
          Alert.alert('Error', 'Failed to pick an image.');
      }
  
      // console.log("selectedImage:", JSON.stringify(selectedImage, null, 2));
  };
  
  const handleFileUpload = async (attachmentType) => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      if (!result.cancelled && result.assets && result.assets.length > 0) {
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
                  ownerID: screeningFormData.applicantId
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



  return (

      <SafeAreaView style = {styles.SafeArea}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Apply as Requestor</Text>
            </View>
          <ScrollView 
            style = {globalStyles.ScrollView}
            overScrollMode='never'
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
        
          >
              <View style = {styles.container}>
                <View style = {globalStyles.flex_Row}>
                    <View style = {styles.pageIndicator}/>
                    <View style = {styles.pageIndicator}/>
                    <View style = {styles.IndicatedPage}/>
                </View>
              </View>
              
              <View style = {{marginLeft: 30}}>
                <Text style = {styles.title}>Reason For Requesting</Text>
              </View>
              <View style = {styles.container}>
                    <TextInput
                        style={styles.BiginputField}
                        multiline={true}
                        textAlignVertical="top" // Align text to the top vertically
                        onChangeText={(value) => handleChangeText('RFR', value)}
                    />         
              </View>


              <View style = {styles.container}>
                <Text style = {styles.MainTitle}>Upload Medical Requirements</Text>
              </View>

              <View style = {styles. attachmentContainer}>
                <Text style={styles.newLabel}>
                    Attach Prescription
                </Text>
                <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={()=>handleImageUpload('Prescription')}>
                        <AntDesign name="picture" size={27} color="#E60965" />
                      </TouchableOpacity>
                        <Text style={styles.verticalLine}>|</Text>
                        <TouchableOpacity onPress={()=>handleFileUpload('Prescription')}>
                        <AntDesign name="file1" size={24} color="#E60965" />
                      </TouchableOpacity>
                  </View>
                </View>
            </View>

            <View style = {styles. attachmentContainer}>
                <Text style={styles.newLabel}>
                    Government ID
                </Text>
                  <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <View style={styles.iconContainer}>
                      <TouchableOpacity onPress={()=>handleImageUpload('GovernmentID')}>
                        <AntDesign name="picture" size={27} color="#E60965" />
                      </TouchableOpacity>
                        <Text style={styles.verticalLine}>|</Text>
                        <TouchableOpacity onPress={()=>handleFileUpload('GovernmentID')}>
                        <AntDesign name="file1" size={24} color="#E60965" />
                      </TouchableOpacity>
                  </View>
                    
                </View>
            </View>

            {imageContainer && (
                  <View  style = {{
                    height: 150,
                    marginBottom: 20,
                    borderWidth: 1,
                    backgroundColor: "white",
                    paddingLeft: 10,
                    paddingRight: 10,
                    borderColor: "#E60965",
                    borderRadius: 15,
                    elevation: 5,
                    marginTop: 20,
                    marginHorizontal: "10%",
                    alignItems: "center"
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
                                        console.log("selectedImageUrl: ", selectedImageUrl)
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
                        borderWidth: 1,
                        backgroundColor: "white",
                        width: "80%",
                        borderRadius: 15,
                        elevation: 5,
                        alignSelf: "center",
                        alignItems: "center",
                     
                        }}>
                          {Object.entries(selectedFile).map(([attachmentType,  file]) => {
                          if (attachmentType !== "uri" && attachmentType !== "type") {
                          return (
                              <View key={attachmentType} 
                              style={{ 
                                flexDirection: "row",      
                                justifyContent: "center",
                                width: "100%"
                                }}>
                               

                                  <View style = {styles.fileType}>
                                    <Text>{attachmentType}: </Text>
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

              <Spinner
              visible={isLoading}
              textContent={'Loading...'}
              textStyle={{ color: '#FFF' }}
            />
      
           

     

              <View style = {globalStyles.center}>
                <TouchableOpacity style={[
                  styles.AgreebuttonContainer, { width: 150 },
                  (Object.keys(selectedImage).length === 0 && Object.keys(selectedFile).length === 0) && { opacity: 0.5 } 
                  ]}onPress={() => navigatePage("RequestorApprovalMessage")}
                  disabled={Object.keys(selectedImage).length === 0 && Object.keys(selectedFile).length === 0}
                  >
                  <Text style={styles.label}>Submit</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>

           
            

      </SafeAreaView>

    )
  }

  const styles = StyleSheet.create ({

    rowAlignment: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },

   
    rowAlignment: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },

    attachmentContainer: {
      // backgroundColor: "pink",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: "#E60965",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginBottom: 17,
      width: "90%",
      alignSelf: "center",
   
  },

    newLabel: {
      color: "#E60965",
      fontSize: 15,
      fontFamily: "Open-Sans-SemiBold",
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFEECC",
    paddingHorizontal: 5,
    marginLeft: 10,
  },

  verticalLine: {
    fontSize: 37,
    marginTop: -10,
    color: "#E60965",
  },


    SafeArea: {
        flex: 1,
        backgroundColor: '#FFF8EB',
        
        width: '100%',
        height: "100%"
    },


    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
        //backgroundColor: "yellow"

      },
  

    label: {
        color: "white",
        fontFamily: "Open-Sans-Bold",
        fontSize: 15,
        alignSelf: 'center'

    },

    IndicatedPage: {
        height: 4,
        width: 50,
        backgroundColor: "#F94892",
        marginTop: "10%",
        marginHorizontal: "1%",
    },

    pageIndicator: {
        height: 4,
        width: 50,
        backgroundColor: "#FFEECC",
        marginTop: "10%",
        marginHorizontal: "1%",
    },

    MainTitle: {
        fontFamily: 'Open-Sans-Bold',
        fontSize: 20,
        color: '#E60965',
        marginTop: "5%",
        marginBottom: "5%"
    },

    title: {
        fontFamily: 'Open-Sans-Bold',
        fontSize: 16,
        color: '#E60965',
        marginVertical: "4%"
    },

    AgreebuttonContainer:{
        backgroundColor: "#E60965",
        paddingHorizontal: 37,
        borderRadius: 20,
        justifyContent: "center",
        paddingVertical: 5,
        marginTop: "-40%"
    },

    BiginputField: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#E60965",
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: "90%",
        height: 300,
        marginVertical: "1.5%",
        color: "#E60965",
        backgroundColor: "white",
        elevation: 5,
    },

  })

  export default ReasonForRequesting;

  