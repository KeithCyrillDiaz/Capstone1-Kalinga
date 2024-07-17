
//Guest EducLibrary
import React, { useState, useEffect } from "react";
import { 
  ScrollView, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Modal,
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
import ImageZoom from 'react-native-image-pan-zoom';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ValidIdInfoModal } from "./ValidIdInfoModal.js";
import { ImagePickerModal } from "../../../modal/ImagePickerModal.js";



const UploadMedicalAbstract = ({route}) => {

  const { data, methodImage, methodFile } = route.params;
  const navigation = useNavigation();
  const [screeningFormData, setScreeningFormData] = useState(data)
  
  const [selectedImage, setSelectedImage] = useState(methodImage);
  const [selectedFile, setSelectedFile] = useState(methodFile);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [fileContainer, setFileContainer] = useState(false)
  const [scrollableHorizontal, setScrollableHorizontal] = useState(false)
  const [imageContainer, setImageContainer] = useState(false)
  const [noQuezonCityId, setNoQuezonCityId] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [showValidID, setShowValidId] = useState(false)

   //imagePicker
   const [showImagePicker, setShowImagePicker] = useState(false)
   const [selectedType, setSelectedType] = useState("")


//   const noQuezonCityID = [
//     'Clinical History',
//     'Presenting Complaint',
//     'Clinical Findings',
//     'Diagnosis',
//     'Treatments and Intervensions',
//     'Prescription',
//     'Government_ID',
//     'Other Valid ID'
// ];

// const withQuezonCityID = [
//   'Clinical History',
//   'Presenting Complaint',
//   'Clinical Findings',
//   'Diagnosis',
//   'Treatments and Intervensions',
//   'Prescription',
//   'Quezon City ID',
// ];

  const navigatePage = (Page, Data, SI, SF, form) => {
    if(noQuezonCityId && Object.keys(selectedImage).length + Object.keys(selectedFile).length 
    - Object.keys(methodImage).length - Object.keys(methodFile).length < 8
      || !noQuezonCityId && Object.keys(selectedImage).length + Object.keys(selectedFile).length
      - Object.keys(methodImage).length - Object.keys(methodFile).length  < 7){
        Alert.alert(
          "Incomplete Medical Requirements",
          "Please upload all the required documents to proceed."
        );
        return
    }
    navigation.navigate(Page, Data, SI, SF, form);

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
                userType: "Requestor",
                owner: screeningFormData.fullName,
                ownerID: screeningFormData.Applicant_ID
            
              })
              
          }));

          
          const numberOfObjects = Object.keys(selectedImage).length;
          console.log("numberOfObjects: ", numberOfObjects)
          if (numberOfObjects >= 2) setScrollableHorizontal(true);

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
    if (!result.canceled && result.assets && result.assets.length > 0) {
      delete selectedImage[attachmentType]
      if(Object.keys(selectedImage).length===0)setImageContainer(false)
      if(Object.keys(selectedImage).length < 3)setScrollableHorizontal(false)
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
                userType: "Requestor",
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


// useEffect(()=> {
//   delete selectedFile[attachment]
//   if(Object.keys(selectedFile).length===0)setFileContainer(false)
// },[selectedImage])

// useEffect(()=> {
//   delete selectedImage[attachment]

// },[selectedFile])

const handlePress = (name, value) => {
  setScreeningFormData({
    ...screeningFormData,
    [name]: value
  })
}


  return (

      <SafeAreaView style = {globalStyles.defaultBackgroundColor}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Make a Request</Text>
            </View>
          <ScrollView 
            // style = {globalStyles.ScrollView}
            overScrollMode='never'
            nestedScrollEnabled={true}
        
          >
             {showImagePicker && (
              <ImagePickerModal
              onSelect = {handleImageUpload}
              type= {selectedType} 
              onClose={() => setShowImagePicker(false)}/>
            )}

            <Text style = {[styles.MainTitle, 
              {
                textAlign: "center",
                marginBottom: 10
              }
            ]}>Medical Abstract of Infant</Text>

              
<Text style = {styles.note}> Note: Please make sure that your images are clear</Text>
              <View style = {styles. attachmentContainer}>
                <Text style={styles.newLabel}>
                    Clinical History
                </Text>
                  <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <View style={styles.iconContainer}>
                      <TouchableOpacity 
                      style = {{ backgroundColor: "pink", padding:4, borderRadius: 7}} 
                      onPress={()=>{
                        setSelectedType('Clinical History')
                        setShowImagePicker(true)
                        }}
                      >
                        <AntDesign name="picture" size={27} color="#E60965" />
                      </TouchableOpacity>
                        <Text style={styles.verticalLine}>|</Text>
                        <TouchableOpacity style = {{ backgroundColor: "pink", padding: 5, borderRadius: 7}} onPress={()=>handleFileUpload('Clinical History')}>
                        <AntDesign name="file1" size={24} color="#E60965" />
                      </TouchableOpacity>
                  </View>
                    
                </View>
            </View>

            <View style = {styles. attachmentContainer}>
                <Text style={styles.newLabel}>
                  Presenting Complaint
                </Text>
                  <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <View style={styles.iconContainer}>
                      <TouchableOpacity 
                      style = {{ backgroundColor: "pink", padding:4, borderRadius: 7}} 
                      onPress={()=>{
                        setSelectedType('Presenting Complaint')
                        setShowImagePicker(true)
                        }}
                      >
                        <AntDesign name="picture" size={27} color="#E60965" />
                      </TouchableOpacity>
                        <Text style={styles.verticalLine}>|</Text>
                        <TouchableOpacity style = {{ backgroundColor: "pink", padding: 5, borderRadius: 7}} onPress={()=>handleFileUpload('Presenting Complaint')}>
                        <AntDesign name="file1" size={24} color="#E60965" />
                      </TouchableOpacity>
                  </View>
                    
                </View>
            </View>

            <View style = {styles. attachmentContainer}>
                <Text style={styles.newLabel}>
                    Clinical Findings
                </Text>
                  <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <View style={styles.iconContainer}>
                      <TouchableOpacity 
                      style = {{ backgroundColor: "pink", padding:4, borderRadius: 7}} 
                      onPress={()=>{
                        setSelectedType('Clinical Findings')
                        setShowImagePicker(true)
                        }}
                      >
                        <AntDesign name="picture" size={27} color="#E60965" />
                      </TouchableOpacity>
                        <Text style={styles.verticalLine}>|</Text>
                        <TouchableOpacity style = {{ backgroundColor: "pink", padding: 5, borderRadius: 7}} onPress={()=>handleFileUpload('Clinical Findings')}>
                        <AntDesign name="file1" size={24} color="#E60965" />
                      </TouchableOpacity>
                  </View>
                    
                </View>
            </View>

            <View style = {styles. attachmentContainer}>
                <Text style={styles.newLabel}>
                    Diagnosis
                </Text>
                  <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <View style={styles.iconContainer}>
                      <TouchableOpacity 
                      style = {{ backgroundColor: "pink", padding:4, borderRadius: 7}} 
                      onPress={()=>{
                        setSelectedType('Diagnosis')
                        setShowImagePicker(true)
                        }}
                      >
                        <AntDesign name="picture" size={27} color="#E60965" />
                      </TouchableOpacity>
                        <Text style={styles.verticalLine}>|</Text>
                        <TouchableOpacity style = {{ backgroundColor: "pink", padding: 5, borderRadius: 7}} onPress={()=>handleFileUpload('Diagnosis')}>
                        <AntDesign name="file1" size={24} color="#E60965" />
                      </TouchableOpacity>
                  </View>
                    
                </View>
            </View>

            <View style = {[styles. attachmentContainer, {}]}>
                <Text style={[styles.newLabel,{}]}>
                    Treatments and Intervensions
                </Text>
                  <View style={[styles.rowAlignment]}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <View style={[styles.iconContainer]}>
                      <TouchableOpacity 
                      style = {{ backgroundColor: "pink", padding:4, borderRadius: 7}} 
                      onPress={()=>{
                        setSelectedType('Treatments and Intervensions')
                        setShowImagePicker(true)
                        }}
                      >
                        <AntDesign name="picture" size={27} color="#E60965" />
                      </TouchableOpacity>
                        <Text style={styles.verticalLine}>|</Text>
                        <TouchableOpacity style = {{ backgroundColor: "pink", padding: 5, borderRadius: 7}} onPress={()=>handleFileUpload('Treatments and Intervensions')}>
                        <AntDesign name="file1" size={24} color="#E60965" />
                      </TouchableOpacity>
                  </View>
                    
                </View>
            </View>

            <View style = {styles. attachmentContainer}>
                <Text style={styles.newLabel}>
                    Prescription
                </Text>
                  <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <View style={styles.iconContainer}>
                      <TouchableOpacity 
                      style = {{ backgroundColor: "pink", padding:4, borderRadius: 7}} 
                      onPress={()=>{
                        setSelectedType('Prescription')
                        setShowImagePicker(true)
                        }}
                      >
                        <AntDesign name="picture" size={27} color="#E60965" />
                      </TouchableOpacity>
                        <Text style={styles.verticalLine}>|</Text>
                        <TouchableOpacity style = {{ backgroundColor: "pink", padding: 5, borderRadius: 7}} onPress={()=>handleFileUpload('Prescription')}>
                        <AntDesign name="file1" size={24} color="#E60965" />
                      </TouchableOpacity>
                  </View>
                    
                </View>
            </View>

            <Text style = {[styles.MainTitle, 
              {
                textAlign: "center",
                marginBottom: 10
              }
            ]}>Required Valid ID</Text>

            <View style={{flexDirection: "row", alignItems: "center", alignSelf: "center", marginBottom: 15}}>
              <TouchableOpacity style ={styles.checkBox} onPress={()=> {
                    handlePress("noQCID", !isChecked ? "Yes" : "No")
                    setIsChecked(!isChecked);
                    setNoQuezonCityId(!noQuezonCityId)
                    if(!noQuezonCityId){
                        delete selectedImage["Quezon City ID"] 
                        delete selectedFile["Quezon City ID"]
                        if(Object.keys(selectedFile).length===0)setFileContainer(false)
                        if(Object.keys(selectedImage).length===0)setImageContainer(false)
                    }
                     
                    else {
                      delete selectedImage["Government_ID"] 
                      delete selectedImage["Other Valid ID"] 
                      delete selectedFile["Government_ID"] 
                      delete selectedFile["Other Valid ID"] 
                      if(Object.keys(selectedFile).length===0)setFileContainer(false)
                      if(Object.keys(selectedImage).length===0)setImageContainer(false)
                    } 
                    }}>
                <Ionicons 
                name={ isChecked ? "checkbox" :"checkbox-outline"}
                size={24} 
                color="#E60965" />
              </TouchableOpacity>
              <Text style={ styles.checkBoxLabel}> Dont Have a Quezon City ID ? </Text>
            </View>
             {!noQuezonCityId && (
               <View style = {styles. attachmentContainer}>
               <Text style={styles.newLabel}>
                   Quezon City ID
               </Text>
                 <View style={styles.rowAlignment}>
                   <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                   <View style={styles.iconContainer}>
                     <TouchableOpacity 
                     style = {{ backgroundColor: "pink", padding:4, borderRadius: 7}} 
                     onPress={()=>{
                      setSelectedType('Quezon City ID')
                      setShowImagePicker(true)
                      }}
                     >
                       <AntDesign name="picture" size={27} color="#E60965" />
                     </TouchableOpacity>
                       <Text style={styles.verticalLine}>|</Text>
                       <TouchableOpacity style = {{ backgroundColor: "pink", padding: 5, borderRadius: 7}} onPress={()=>handleFileUpload('Quezon City ID')}>
                       <AntDesign name="file1" size={24} color="#E60965" />
                     </TouchableOpacity>
                 </View>
                   
               </View>
             </View>
             )}
            

             
             
            {noQuezonCityId && (
              <> 
                <View style = {styles. attachmentContainer}>
                  <Text style={styles.newLabel}>
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
                          <TouchableOpacity style = {{ backgroundColor: "pink", padding: 5, borderRadius: 7}} onPress={()=>handleFileUpload('Government_ID')}>
                          <AntDesign name="file1" size={24} color="#E60965" />
                        </TouchableOpacity>
                    </View>
                      
                  </View>
              </View>

              <View style = {styles. attachmentContainer}>
                  <Text style={styles.newLabel}>
                      Any Valid ID
                  </Text>
                    <View style={styles.rowAlignment}>
                      <TouchableOpacity onPress={() => setShowValidId(true)} style={{marginRight: 10}}>
                       <AntDesign  name="questioncircle" size={24} color="#EB7AA9" />
                      </TouchableOpacity>
                      <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                      <View style={styles.iconContainer}>
                        <TouchableOpacity 
                        style = {{ backgroundColor: "pink", padding:4, borderRadius: 7}} 
                        onPress={()=>{
                          setSelectedType('Other Valid ID')
                          setShowImagePicker(true)
                          }}
                        >
                          <AntDesign name="picture" size={27} color="#E60965" />
                        </TouchableOpacity>
                          <Text style={styles.verticalLine}>|</Text>
                          <TouchableOpacity style = {{ backgroundColor: "pink", padding: 5, borderRadius: 7}} onPress={()=>handleFileUpload('Other Valid ID')}>
                          <AntDesign name="file1" size={24} color="#E60965" />
                        </TouchableOpacity>
                    </View>
                      
                  </View>
              </View>
              <Text style={{textAlign: "center", fontFamily: "Open-Sans-Regular", color:"#E60965"}}>Note: Make sure that the Valid ID's are goverment Issued</Text>
              </> 
            )}
            
            {Object.keys(selectedImage).length !==0 && (
                  <View  style = {{
                    marginBottom: 20,
                    backgroundColor: "white",
                    paddingLeft: 10,
                    paddingRight: 10,
                    borderColor: "#E60965",
                    borderRadius: 15,
                    elevation: 5,
                    marginTop: 20,
                    marginHorizontal: "5%",
                    alignItems: "center",
                    paddingBottom: 20,
                    paddingTop: 10
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
              marginTop: 10
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
                      <Text style = {{textAlign: "left", fontWeight: "bold", width: 100, color: "#E60965",}}>{attachmentType} </Text>
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
            
                    <TouchableOpacity style = {[styles.AgreebuttonContainer,
                      {opacity: !noQuezonCityId && Object.keys(selectedImage).length + Object.keys(selectedFile).length
                        - Object.keys(methodImage).length - Object.keys(methodFile).length < 7 
                        || noQuezonCityId && Object.keys(selectedImage).length + Object.keys(selectedFile).length 
                        - Object.keys(methodImage).length - Object.keys(methodFile).length < 8
                        ? 0.5 : 1}
                    ]} 
                    onPress={() => navigatePage("MakeRequestReceipt", 
                    {
                      screeningFormData: screeningFormData, 
                      selectedImage: selectedImage,
                      selectedFile: selectedFile,
                      form: screeningFormData
                    }
                    )}>

                        <Text style = {styles.label}>Next</Text>
                    </TouchableOpacity>

              <Modal
              animationType="slide"
              transparent={true}
              visible={showValidID}
              onRequestClose={() => {
                setShowValidId(!showValidID);
            }}
              >
                <ValidIdInfoModal onClose={()=> setShowValidId(false)}/>
              </Modal>
               
            </View>
        </ScrollView>

           
            

      </SafeAreaView>

    )
  }

  const styles = StyleSheet.create ({
    note: {
      color: '#E60965',
      fontFamily: "Open-Sans-SemiBold",
      marginBottom: 10,
      fontSize: 13,
      textAlign: "center"
    },

    checkBoxLabel: {
      fontFamily: "Open-Sans-SemiBold",
      color: "#E60965",
    },

    rowAlignment: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
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
      width: "90%",
      alignSelf: "center",
      elevation:7
  },

    newLabel: {
      color: "#E60965",
      fontSize: 15,
      fontFamily: "Open-Sans-SemiBold",
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
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
        marginTop: "5%"
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
        marginTop: "-25%"
    },

    BiginputField: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#E60965",
        paddingVertical: 5,
        paddingHorizontal: 20,
        width: "90%",
        height: "100%",
        marginVertical: "1.5%",
        color: "#E60965",
        backgroundColor: "white",
        elevation: 5
      
    },

  })

  export default UploadMedicalAbstract;

  