import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Dimensions, 
  Image, 
  Modal, 
  TouchableHighlight
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "./Header";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import ImageZoom from 'react-native-image-pan-zoom';
import { AntDesign } from '@expo/vector-icons';
import { BASED_URL } from "../../../../MyConstants";
import { Entypo } from '@expo/vector-icons';
import { globalStyles } from "../../../../styles_kit/globalStyles";
import { LoadingSpinner } from "../../../uploader/LoadingSpinner";


export default function ReportBug({route}) {

 const { userInformation, token, userName } = route.params

  const navigate = useNavigation()
    
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [scrollableHorizontal, setScrollableHorizontal] = useState(false)
  const [imageContainer, setImageContainer] = useState(false)
  const [loading, setLoading] = useState(false)

  const [reportForm, setReportForm] = useState({
    title: "",
    content: "",
  })
  
  const handleChange = (name, value) => {
    setReportForm({
      ...reportForm,
      [name]: value
    })
  }

  const checkForm = () => {
    console.log(reportForm)
    if(reportForm.title === "" || reportForm.content === "") {
      Alert.alert("Incomplete Information", "Please provide both a title and a description of the bug before proceeding.");
      return false
    }
    return true
  }

  const uploadPhoto = async () => {

     const check = checkForm()
     if(!check) return
    try {
      setLoading(true)
      const attachmentType = `${reportForm.title}`
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

        if (!result.canceled && result.assets && result.assets.length > 0) {
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
                userType: "Requstor",
                owner: userInformation.fullName,
                ownerID: userInformation.Requstor_ID
            
              })
              
          }));

          const numberOfObjects = Object.keys(selectedImage).length;
          if (numberOfObjects >= 3) setScrollableHorizontal(true);

          setImageContainer(true)
      }
          
        
    } catch (error) {
        Alert.alert('Error', 'Failed to pick an image.');
    } finally {
      setLoading(false)
    }
};

const confirmation = () => {
  Alert.alert(
    "Confirmation",
    "Are you sure you want to submit the bug report?",
    [

      { text: "Yes", onPress: () => submit()},
      {
        text: "No",
      },

    ],
    { cancelable: false }
  );
};


const submit = async () => {
  const check = checkForm()
  if(!check) return

  try {
    const id = userInformation.Donor_ID
    const response = await axios.post(`${BASED_URL}/kalinga/createReportBug/${id}`,
    { 
      topic: reportForm.title,
      content: reportForm.content,
      userType: userInformation.userType
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    )

    if(response.data.messages.code === 1){
      console.log(response.data.messages.message)
      return
    }

    navigate.replace("DonorReportBugSuccess", {userInformation: userInformation, UserName: userName, token: token})

  } catch(error){
    console.log("Error Uploading Bug Report", error)
    Alert.alert(
      "Something Went wrong",
      "There was an issue submitting your bug report. Please try again later."
    );
  }
}

  return (
    <SafeAreaView style={globalStyles.defaultBackgroundColor}>
      <ScrollView stickyHeaderIndices={[1]}>
        <StatusBar />
        <Header title="Report a Bug" />
        <LoadingSpinner loading={loading}/>
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

        <Text
          style={{
            color: "#E60965",
            paddingHorizontal: 16,
            fontSize: 24,
            fontWeight: "bold",
            marginVertical: 16,
            fontWeight: "bold",
          }}>
          Report a bug
        </Text>

        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text
            style={{
              color: "#E60965",
              fontWeight: "600",
              marginBottom: 8,
              fontSize: 16,
            }}>
            Topic
          </Text>
          <TextInput
            style={{
              backgroundColor: "#FFFFFF",
              elevation: 7,
              minHeight: 52,
              paddingHorizontal: 16,
              fontSize: 16,
              color: "#E60965",
              borderRadius: 17
            }}
            placeholder="Enter your topic"
            onChangeText={(text) => handleChange("title", text)}
            value = {reportForm.title}

          />
        </View>

        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text
            style={{
              color: "#E60965",
              fontWeight: "600",
              marginBottom: 8,
              fontSize: 16,
            }}>
            Bug Description
          </Text>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              elevation: 7,
              padding: 16,
              fontSize: 16,
              color: "#E60965",
              borderRadius: 17
            }}>
            <TextInput
              numberOfLines={10}
              multiline={true}
              style={{
                textAlignVertical: "top", // Add this line
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
              placeholder="Enter your topic"
              onChangeText={(text) => handleChange("content", text)}
              value = {reportForm.content}
            />
          </View>
        </View>
        
        {imageContainer && (
                  <View  style = {{
                    height: 140,
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
                    alignItems: "center",
                    paddingVertical:10
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
            
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 24,
          }}>
          {/* <TouchableOpacity onPress={() => uploadPhoto()}>
            <View style={buttonStyle.primary}>
              <Entypo name="upload" size={24} color="white" />
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                Upload a photo
              </Text>
            </View>
          </TouchableOpacity> */}
        </View>

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 24,
          }}>
          <TouchableOpacity onPress={() => confirmation()}>
            <View style={buttonStyle.primary}>
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                Submit
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

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

})

const bodyStyle = StyleSheet.create({
  main: {
    backgroundColor: "#FFF8EB",
    flex: 1,
  },
});

const buttonStyle = StyleSheet.create({
  primary: {
    marginTop: 12,
    backgroundColor: "#E60965",
    padding: 12,
    paddingHorizontal: 32,
    minWidth: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    flexDirection: "row",
    gap: 16,
  },

  iconBtn: {
    backgroundColor: "#FFEECC",
    width: 48,
    height: 48,
    borderRadius: 10,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
