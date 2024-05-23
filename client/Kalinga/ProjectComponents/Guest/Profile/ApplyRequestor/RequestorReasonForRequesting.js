//Guest EducLibrary
import React, { useState, useEffect } from "react";
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
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import { BASED_URL } from "../../../../MyConstants.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UploadImageOrFileToFirebase } from '../../../uploader/fireBaseUploader.js'
import ImageZoom from 'react-native-image-pan-zoom';
import { AntDesign } from '@expo/vector-icons';
import { Uploading } from "../../../uploader/Uploading.js";

const ReasonForRequesting = ({route}) => {
   
    const { screeningFormData, selectedImage, selectedFile } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');

    //validity
    const [isRFRMissing, setIsRFRMissing] = useState(true)

    //uploaderModal
    const [progressBar, setProgressBar] = useState(0)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [imageUri, setIMageUri] = useState("")
    const [loaderLabel, setLoaderLabel] = useState("")

    const handleChangeText = (name, value) => {
      screeningFormData[name] = value
      if(value === "")setIsRFRMissing(true)
        else setIsRFRMissing(false)
  };


  const reminder = () => {
    Alert.alert(
      "Reminder",
      "Please ensure you have the Medical Abstract of the infant ready as it is required for requesting milk.",
      [
          {
              text: 'Okay',
              onPress: () => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name:"EmailVerification", params: screeningFormData } ], 
                  })
                );
              },
          },
      ]
  );
}

  const confirmation = () => {
    const { RFR } = screeningFormData
    console.log("RFR: ", RFR)
    if(screeningFormData.RFR === ""){
      Alert.alert( "Reason for Requesting Required",
      "Please provide a reason for your request.")
      return
    } 
    Alert.alert('Confirmation','Are you sure you want to submit your Application?',
    [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => navigatePage(),
      },
    ]
  )
    
 }

 useEffect(() => {
    screeningFormData.RFR=""
 },[])



    const navigation = useNavigation();
    const navigatePage = async () => {

      try {
   
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
          userType: "Requestor", 
          userId:screeningFormData.Applicant_ID,
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
            userType: "Requestor", 
            userId:screeningFormData.Applicant_ID,
            nameOfUser: screeningFormData.fullName,
            percent: setProgressBar,// for uploading with loader
            setImage: setIMageUri, // for uploading modal
            setLabel: setLoaderLabel // for uploading with loader
          });
        }
        
          await AsyncStorage.setItem('Pending', 'True')
          await AsyncStorage.setItem('RequestorApplicant_ID', screeningFormData.Applicant_ID)
          setUploadingImage(false)
          
          reminder()
         
          return
    } catch (error) {
        // Handle error if the request fails
        Alert.alert('Something Went Wrong: Please Try Again');
        console.error('Error saving data:', error);
    } finally {

    }
}

// useEffect(() => {
//   setUploadingImage(false)
// },[])
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

      <SafeAreaView style = {globalStyles.defaultBackgroundColor}>
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

          {uploadingImage && (
             <Uploading 
             progress={progressBar} 
             Image={imageUri}
             label={loaderLabel}
            //  onClose = {() => setUploadingImage(false)}
            />
          )}
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

              {Object.keys(selectedImage).length !==0 && (
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
                    marginHorizontal: "5%",
                    alignItems: "center"
                    }}>
                    <ScrollView 
                      showsHorizontalScrollIndicator={true}
                      overScrollMode='never'
                      horizontal={Object.keys(selectedImage).length >= 2}
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

            {Object.keys(selectedFile).length !==0 && (
            <View  style={{ 
              paddingVertical: 20,
              borderColor: "#E60965",
              backgroundColor: "white",
              width: "80%",
              borderRadius: 15,
              elevation: 7,
              alignSelf: "center",
              alignItems: "center",
              }}>
                {Object.entries(selectedFile).map(([attachmentType,  file]) => {
                if (attachmentType !== "uri" && attachmentType !== "type") {
                return (
                  <View key={attachmentType} 
                  style={{ 
                    flexDirection: "row",      
                    width: "90%",
                    marginVertical: 10,
                    gap: 10
                    }}>
                    <Text style = {{textAlign: "left", fontWeight: "bold", width: 100, color: "#E60965"}}>{attachmentType} </Text>
                    <Text style= {{flex: 1}}>{file.name}</Text>

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

            
              <View style = {globalStyles.center}>
                <TouchableOpacity style={[
                  styles.AgreebuttonContainer, { 
                    width: 150, 
                    opacity: (Object.keys(selectedImage).length + Object.keys(selectedFile).length < 7) || isRFRMissing ? 0.5 : 1
                  }, 
                  
                  ]} onPress={() => confirmation()}
                  disabled={Object.keys(selectedImage).length + Object.keys(selectedFile).length < 7}
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
      height: 7,
      borderRadius: 7,
      width: 50,
      backgroundColor: "#F94892",
      marginTop: "10%",
      marginHorizontal: "1%",
      elevation:7
  },

  pageIndicator: {
      height: 7,
      borderRadius: 7,
      width: 50,
      backgroundColor: "white",
      marginTop: "10%",
      marginHorizontal: "1%",
      elevation:7
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
        borderRadius: 10,
        borderColor: "#E60965",
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: "90%",
        height: 300,
        marginVertical: "1.5%",
        color: "#E60965",
        backgroundColor: "white",
        elevation: 7,
    },

  })

  export default ReasonForRequesting;

  