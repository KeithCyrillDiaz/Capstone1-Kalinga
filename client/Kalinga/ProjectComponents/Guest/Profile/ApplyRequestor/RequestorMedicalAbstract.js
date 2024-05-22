//Guest EducLibrary
import React, { useState } from "react";
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

const RequestorMedicalAbstract = ({route}) => {

  const { screeningFormData } = route.params;
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState({});
  const [selectedFile, setSelectedFile] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [fileContainer, setFileContainer] = useState(false)
  const [scrollableHorizontal, setScrollableHorizontal] = useState(false)
  const [imageContainer, setImageContainer] = useState(false)

  const navigatePage = (Page, Data, SI, SF) => {
    if(Object.keys(selectedImage).length + Object.keys(selectedFile).length < 7){
        Alert.alert(
          "Incomplete Medical Requirements",
          "Please upload all the required documents to proceed."
        );
        return
    }
    navigation.navigate(Page, Data, SI, SF);

  };

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



  return (

      <SafeAreaView style = {globalStyles.defaultBackgroundColor}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Apply as Requestor</Text>
            </View>
          <ScrollView 
            // style = {globalStyles.ScrollView}
            overScrollMode='never'
            nestedScrollEnabled={true}
        
          >
              <View style = {styles.container}>
                <View style = {globalStyles.flex_Row}>
                    <View style = {styles.pageIndicator}/>
                    <View style = {styles.IndicatedPage}/>
                    <View style = {styles.pageIndicator}/>
                </View>
               
                <Text style = {[styles.MainTitle, {marginVertical: 20,}]}>Medical Abstract of Infant</Text>
              </View>
              
              <View style = {styles. attachmentContainer}>
                <Text style={styles.newLabel}>
                    Clinical History
                </Text>
                  <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <View style={styles.iconContainer}>
                      <TouchableOpacity style = {{ backgroundColor: "pink", padding:4, borderRadius: 7}} onPress={()=>handleImageUpload('Clinical History')}>
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
                      <TouchableOpacity style = {{ backgroundColor: "pink", padding:4, borderRadius: 7}} onPress={()=>handleImageUpload('Presenting Complaint')}>
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
                      <TouchableOpacity style = {{ backgroundColor: "pink", padding:4, borderRadius: 7}} onPress={()=>handleImageUpload('Clinical Findings')}>
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
                      <TouchableOpacity style = {{ backgroundColor: "pink", padding:4, borderRadius: 7}} onPress={()=>handleImageUpload('Diagnosis')}>
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
                      <TouchableOpacity style = {{ backgroundColor: "pink", padding:4, borderRadius: 7}} onPress={()=>handleImageUpload('Treatments and Intervensions')}>
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
                      <TouchableOpacity style = {{ backgroundColor: "pink", padding:4, borderRadius: 7}} onPress={()=>handleImageUpload('Prescription')}>
                        <AntDesign name="picture" size={27} color="#E60965" />
                      </TouchableOpacity>
                        <Text style={styles.verticalLine}>|</Text>
                        <TouchableOpacity style = {{ backgroundColor: "pink", padding: 5, borderRadius: 7}} onPress={()=>handleFileUpload('Prescription')}>
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
                      <TouchableOpacity style = {{ backgroundColor: "pink", padding:4, borderRadius: 7}} onPress={()=>handleImageUpload('Government_ID')}>
                        <AntDesign name="picture" size={27} color="#E60965" />
                      </TouchableOpacity>
                        <Text style={styles.verticalLine}>|</Text>
                        <TouchableOpacity style = {{ backgroundColor: "pink", padding: 5, borderRadius: 7}} onPress={()=>handleFileUpload('Government_ID')}>
                        <AntDesign name="file1" size={24} color="#E60965" />
                      </TouchableOpacity>
                  </View>
                    
                </View>
            </View>
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
                    marginHorizontal: "5%",
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
                      {opacity: Object.keys(selectedImage).length + Object.keys(selectedFile).length < 7 ? 0.5 : 1}
                    ]} 
                    onPress={() => navigatePage("RequestorReasonForRequesting", 
                    {
                      screeningFormData: screeningFormData, 
                      selectedImage: selectedImage,
                      selectedFile: selectedFile,
                    }
                    )}>

                        <Text style = {styles.label}>Next</Text>
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
      borderColor: "#E60965",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginBottom: 17,
      width: "90%",
      alignSelf: "center",
      backgroundColor: "white",
      elevation: 7
   
  },

    newLabel: {
      color: "#E60965",
      fontSize: 15,
      fontFamily: "Open-Sans-SemiBold",
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
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

  export default RequestorMedicalAbstract;

  