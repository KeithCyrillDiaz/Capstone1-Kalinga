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
import ImageZoom from 'react-native-image-zoom-viewer';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';


const DonorUploadMedicalRequirements = ({route}) => {

  const { screeningFormData } = route.params; // Access formData from route.params
  // console.log("Retrieve:", screeningFormData)

  const [formData, setFormData] = useState(screeningFormData);
  const [selectedImage, setSelectedImage] = useState({});
  const [selectedFile, setSelectedFile] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [fileContainer, setFileContainer] = useState(false)
  const [scrollableHorizontal, setScrollableHorizontal] = useState(false)
  const [imageContainer, setImageContainer] = useState(false)
  const navigation = useNavigation();

  const navigatePage = async (Page) => {
    try {
      console.log('navigatePage');
        // Send POST request to the specified URL with the form data
        // const postScreeningForm = await axios.post("http://192.168.1.104:7000/kalinga/addScreeningForm", 
        //       screeningFormData,
        //       // selectedImage,
        //       // selectedFile
        // );
        // console.log('Test');
        // // Log successful response from the backend
        // console.log('Data saved successfully:', postScreeningForm.data);

        const formData = new FormData();
        Object.values(selectedImage).forEach(image => {
          formData.append('file', image);
        });
        // console.log('formData: ', formData);
        formData._parts.forEach(part => {
          const [key, value] = part; // Destructure the part into key and value
          console.log(`Key: ${key}, Value: `, value);
      });
        const postImage = await axios.post("http://192.168.1.104:7000/kalinga/addMedicalRequirementsAsImage", 
        // screeningFormData,
          selectedImage
          // selectedFile
        );
        
          // Log successful response from the backend
          console.log('Data saved successfully:', postImage.data);

        // Navigate to the specified page
        navigation.navigate(Page);
    } catch (error) {
        // Handle error if the request fails
        console.error('Error saving data:', error);
    }
};

// const submitToDataBase = () => {
 
// }
   
  const handleImageUpload = async (attachmentType, id) => {
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
              [attachmentType]: ({
                uri: result.assets[0].uri,
                name: attachmentType,
                type: result.assets[0].type
              })
              
          }));
          // console.log("results: ", result.assets[0].uri);
          // console.log("selectedImage after update:", selectedImage);
          const numberOfObjects = Object.keys(selectedImage).length;
          if (numberOfObjects >= 3) setScrollableHorizontal(true);
          console.log("numberofObjects:", numberOfObjects)
          setImageContainer(true)
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

const handleFileUpload = async (attachmentType) => {
  try {
    const result = await DocumentPicker.getDocumentAsync();
    if (!result.cancelled && result.assets && result.assets.length > 0) {
        // Create a new object to hold the updated selected file state
        const updatedSelectedFile = {
            ...selectedFile,
            [attachmentType]: {
                name: result.assets[0].name,
                uri: result.assets[0].uri,
                type: attachmentType
            }
        };
        // Update the selectedFile state
        setSelectedFile(updatedSelectedFile);
        console.log("updatedSelectedFile:", updatedSelectedFile)
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

            <View style={styles.rectanglesContainer}>
                <View style={styles.rectangle}></View>
                <View style={styles.rectangle}></View>
                <View style={styles.rectangle}></View>
                <View style={styles.rectangle}></View>
                <View style={styles.rectangleIndicator}></View>
            </View>
         
            <Text style = {styles.title}> Upload Medical Requirements </Text>
            <Text style = {styles.note}> Note: Select your answer by clicking either the Icon</Text>
            

            <View style = {styles. attachmentContainer}>
                <Text style={styles.label}>
                    Attach Hepa B Test Result
                </Text>
                <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={()=>handleImageUpload('HepaB', 0)}>
                          <AntDesign name="picture" size={27} color="#E60965" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> handleFileUpload('hepaB', 0)} style  = {{

                          flexDirection: "row", alignItems: "center"
                        }}>
                          <Text style={styles.verticalLine}>|</Text>
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
                        <TouchableOpacity onPress={()=>handleImageUpload('HIV', 1)}>
                          <AntDesign name="picture" size={27} color="#E60965" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> handleFileUpload('HIV', 1)}style  = {{

                          flexDirection: "row", alignItems: "center"
                        }}>
                          <Text style={styles.verticalLine}>|</Text>
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
                        <TouchableOpacity onPress={()=>handleImageUpload('Syphillis', 2)}>
                          <AntDesign name="picture" size={27} color="#E60965" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> handleFileUpload('Syphillis', 2)} style  = {{

                          flexDirection: "row", alignItems: "center"
                        }}>
                          <Text style={styles.verticalLine}>|</Text>
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
                        <TouchableOpacity onPress={()=>handleImageUpload('Pregnancy Book')}>
                          <AntDesign name="picture" size={27} color="#E60965" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> handleFileUpload('Pregnancy Book')} style  = {{

                          flexDirection: "row", alignItems: "center"
                        }}>
                          <Text style={styles.verticalLine}>|</Text>
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
                        <TouchableOpacity onPress={()=>handleImageUpload('Government_ID')}>
                          <AntDesign name="picture" size={27} color="#E60965" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> handleFileUpload('Government_ID')} style  = {{

                          flexDirection: "row", alignItems: "center"
                        }}>
                          <Text style={styles.verticalLine}>|</Text>
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
                    borderWidth: 1,
                    backgroundColor: "white",
                    paddingLeft: 10,
                    paddingRight: 10,
                    borderColor: "#E60965",
                    borderRadius: 15,
                    elevation: 5,
                    marginTop: 20,
                    }}>
                    <ScrollView 
                      showsHorizontalScrollIndicator={false}
                      overScrollMode='never'
                    horizontal={scrollableHorizontal}
                    contentContainerStyle={{ flexDirection: 'row', }}
                  >
                      {Object.entries(selectedImage).map(([attachmentType, value]) => (
                                <TouchableOpacity
                                    key={attachmentType}
                                    onPress={() => {
                                        setSelectedImageUrl({uri: value.uri});
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
                        width: "100%",
                        borderRadius: 15,
                        elevation: 5,
                  
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
                                  {/* <Text style={{ textAlign: "center", marginRight: 20 }}>
                                      {attachmentType}: 
                                  </Text>
                                  <Text style={{ textAlign: "center" }}>
                                      {file.name}
                                  </Text> */}

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
                  {/* <ImageZoom
                      cropWidth={Dimensions.get('window').width}
                      cropHeight={Dimensions.get('window').height}
                      imageWidth={Dimensions.get('window').width}
                      imageHeight={Dimensions.get('window').height * 0.7} // Adjust the height as needed
                      enableSwipeDown={true}
                      onSwipeDown={() => setModalVisible(false)} // Close modal on swipe down
                      style={{ backgroundColor: 'black' }} // Set background color to black to avoid seeing the underlying content
                  > */}
                      <Image
                          source={{ uri: selectedImageUrl }}
                          style={{ width: '100%', height: '100%' }}
                      />
                  {/* </ImageZoom> */}
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
            <TouchableOpacity  style={[styles.button, { opacity: isChecked ? 1 : 0.5 }]} disabled={!isChecked} onPress={() => navigatePage("DonorApproved")}> 
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
      fontFamily: "Open-Sans-Light",
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
      backgroundColor: "#FFEECC",
      paddingHorizontal: 5,
      marginLeft: 10,
    },


    attachmentContainer: {
      backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: "#E60965",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 17,
        elevation: 5,
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
    height: 4, 
    backgroundColor: '#FFEECC', // Color for Rectangle F94892
    borderRadius: 10,
    marginHorizontal: 5,
  },

  rectangleIndicator: {
    width: 50,
    height: 4, 
    backgroundColor: '#F94892', // Color for Rectangle F94892
    borderRadius: 10,
    marginHorizontal: 5,
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

