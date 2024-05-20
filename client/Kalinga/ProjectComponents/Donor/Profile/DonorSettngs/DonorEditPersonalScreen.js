import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "./Header";
import axios from 'axios'
import { BASED_URL } from "../../../../MyConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Uploading } from '../../../uploader/Uploading'
import { uploadDpInFirebase } from '../../../uploader/fireBaseUploader'
import { globalStyles } from "../../../../styles_kit/globalStyles";

export default function EditPersonalScreen({route}) {
  
 const {userName, userInformation, token} = route.params
 const navigate = useNavigation()
 const [userData, setUserData] = useState(userInformation)
 const [selectedImage, setSelectedImage] = useState({});
 const [profilePic, setProfilePic] = useState("")
 const [isLoading, setIsloading] = useState(false)


  //uploaderModal
  const [progressBar, setProgressBar] = useState(0)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageUri, setIMageUri] = useState("")
  const [loaderLabel, setLoaderLabel] = useState("")

  //Hooks from firebase import
  const [axiosResponse, setAxiosResponse] = useState("")
  const [link, setLink] = useState("")
  const [imagePath, setImagePath] = useState("")


 const sessionExpired = async() => {
  await AsyncStorage.multiRemove(['token', 'userInformation', 'DPLink', 'Image_ID']);
  Alert.alert("Session Expired", "Your session has expired. Please log in again.", [
    {
      text: "OK",
      onPress: () => navigate.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'LogIn' }],
        })
      ),
    },
  ]);
  return
 }

 useEffect (() => {
  if(axiosResponse === "Unauthorized User") sessionExpired()
 },[axiosResponse])

 const storeDPInAsyncStorage = async () => {
    if(link === "" && imagePath === "") return
    console.log("storing DP details in Async")
    await AsyncStorage.setItem('DPLink', link)
    await AsyncStorage.setItem('Image_ID', imagePath)
    setProfilePic(link)
 }
 
 const uploadImage = async () => {
  try{
    setUploadingImage(true)
    console.log("Number of properties in selectedImage: ", Object.keys(selectedImage).length);

            if(Object.keys(selectedImage).length === 1){

              const response = await axios.get(`${BASED_URL}/kalinga/verifyToken`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              if(response.data.messages.message === "Unauthorized User"){
                setAxiosResponse(response.data.messages.message)
                return
              }
            
              for (const key in selectedImage) {
                const imageData = selectedImage[key];

                await uploadDpInFirebase({
                  id: userInformation.Donor_ID,
                  userType: userInformation.userType,
                  nameOfUser: userInformation.fullName,
                  purpose: "DP",
                  URI: imageData.uri,
                  setImage: setIMageUri,
                  setLabel: setLoaderLabel,
                  percent: setProgressBar,
                  token: token,
                  setResponse: setAxiosResponse,
                  setLink: setLink,
                  setPath: setImagePath
                });
              }
              setSelectedImage({})
              return
            }
  }catch (error){
    console.log("error: ", error)
  } finally {
    fetchDP()
  }
 }

 const handleImageUpload = async () => {
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

      if (!result.canceled && result.assets && result.assets.length > 0) {
          let fileType = ''
        result.assets.forEach(image => {
          if (image.type === 'image' || !image.type.includes('/')) {
                    fileType = image.type + "/jpeg"
          } else {
            fileType = image.type
          }
        });

        setSelectedImage({
            [`ProfilePicture`]: ({
              uri: result.assets[0].uri,
              name: userName, 
              type: result.assets[0].type,
            })
        });
     
    }
  } catch (error) {
      Alert.alert('Error', 'Failed to pick an image.');
  }
};

const fetchDP = async () => {
  const result = await AsyncStorage.getItem('DPLink')
  if(selectedImage.ProfilePicture){
    console.log("selectedImage.ProfilePicture.uri: ", selectedImage.ProfilePicture.uri)
    setProfilePic(selectedImage.ProfilePicture.uri)
  } else if(result) {
    setProfilePic(result)
  } else setProfilePic("")
  const checkImage_ID = await AsyncStorage.getItem("Image_ID")
  if(!checkImage_ID){
    if(userInformation.Image_ID) await AsyncStorage.setItem("Image_ID", userInformation.Image_ID)
  }
}

useEffect(() => {
  storeDPInAsyncStorage()
  fetchDP()
  setUploadingImage(false)
},[selectedImage])

useEffect(() => {
  if(Object.keys(selectedImage) !== 0)setSelectedImage({})
},[])

const saveDetails = async () => {
  try{

    if(userData !== userInformation){
      console.log("Updating user Information")
      const result = await axios.post(`${BASED_URL}/kalinga/updateUserInformation`,{
        userData: userData
      })
      console.log(result.data.messages.message)
      if("result: ", result.data.messages.code === 0){
        setUserData(result.data.result)
        const updatedData = result.data.result
        await AsyncStorage.setItem('userInformation', JSON.stringify(updatedData))
      } else console.log("Error: ", result.data.messages.message)
    }
    uploadImage();

  } catch(error) {
    console.log("Error: ", error)
    if(error)Alert.alert('Network error', `Please check your internet connection`)
        else
        Alert.alert('Something went wrong', "Please try again later")
  } finally {
    fetchDP()
  }

}

 const fetchData = async () => {
  setIsloading(true)
  const userInformationToString = await AsyncStorage.getItem('userInformation')
  if(userInformationToString !== null ) {
    const userInformation = JSON.parse(userInformationToString);
    setUserData(userInformation)
  }
  setIsloading(false)
 }

 useEffect(()=>{

  fetchData();

 },[])

 const confirmation = () => {
    Alert.alert('Confirmation','Are you sure you want to save these Details?',
    [
      {
        text: 'No',
        onPress: () => {
          setSelectedImage({}),
          setUserData(userInformation)
        },
      },
      {
        text: 'Yes',
        onPress: () => saveDetails(),
      },
    ]
  )
    
 }

  return (
    <SafeAreaView style={globalStyles.defaultBackgroundColor}>
      <ScrollView contentContainerStyle={bodyStyle.container}>
        <StatusBar />
        <Header title="Personal Information" />
        
        <ScrollView
         overScrollMode="false"
         style = {{
           flex: 1,
         }}
        >
        {uploadingImage && (
          <Uploading 
            progress={progressBar} 
            Image={imageUri}
            label={loaderLabel}
          />
        )}

        <View
          style={{
            width: "100%",
            paddingHorizontal: 24,
            alignItems: "center",
          }}>
          <View style={{ position: "relative" }}>
            <Image
              source={
                !selectedImage.ProfilePicture && profilePic === "" 
                ? require("../../../../assets/Profile_icon.png") 
                : profilePic === "" 
                ? require("../../../../assets/Profile_icon.png") 
                : selectedImage.ProfilePicture 
                ? {uri: selectedImage.ProfilePicture.uri} 
                : { uri: profilePic }}
              style={{
                width: 127,
                height: 127,
                borderWidth: 1,
                borderRadius: 100,
                marginBottom: 16,
                borderColor: "#E60965",
              }}
            />
            {!selectedImage.ProfilePicture && (
              <TouchableOpacity onPress={()=> handleImageUpload()} >
                <MaterialIcons
                name="camera-alt"
                size={48}
                color="#E60965"
                style={{ position: "absolute", bottom: 16, right: -5 }}
                />
              </TouchableOpacity>
            
            )}
           
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 12,
            }}>
            <Text style={fontStyle.header}>{userName}</Text>
            <Text style={fontStyle.subHeader}>Donor</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", paddingHorizontal: 16, gap: 16 }}>
          <View
            style={{
              width: Dimensions.get("screen").width / 2.3,
            }}>
            <View style={inputStyle.container}>
              <Text style={inputStyle.label}>Age: </Text>
              <TextInput style={inputStyle.primary} 
                value={userData.age}
                onChangeText={(text) =>
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    age: text,
                  }))
                }
              />
            </View>
          </View>

          <View
            style={{
              width: Dimensions.get("screen").width / 2.3,
            }}>
            <View style={inputStyle.container}>
              <Text style={inputStyle.label}>Gender: </Text>
              <TextInput style={inputStyle.primary}
                value={"Female"} 
                onChangeText={(text) =>
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    Gender: text,
                  }))
                }
                editable={false}
              />
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          <View style={inputStyle.container}>
            <Text style={inputStyle.label}>Birthday: </Text>
            <TextInput style={inputStyle.primary} 
             value = {userData.birthDate}
             onChangeText={(text) =>
              setUserData((prevUserData) => ({
                ...prevUserData,
                birthDate: text,
              }))
            }
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={inputStyle.container}>
            <Text style={inputStyle.label}>Phone Number: </Text>
            <TextInput style={inputStyle.primary} 
             value = {userData.mobileNumber}
             onChangeText={(text) =>
              setUserData((prevUserData) => ({
                ...prevUserData,
                mobileNumber: text,
              }))
            }
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={inputStyle.container}>
            <Text style={inputStyle.label}>Email: </Text>
            <TextInput style={inputStyle.primary} 
             value = {userData.email}
             onChangeText={(text) =>
              setUserData((prevUserData) => ({
                ...prevUserData,
                email: text,
              }))
            }
            editable={false}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={inputStyle.container}>
            <Text style={inputStyle.label}>Address: </Text>
            <TextInput style={[inputStyle.primary, {width: "80%"}]} 
             multiline={true}
             value = {userData.homeAddress}
             onChangeText={(text) =>
              setUserData((prevUserData) => ({
                ...prevUserData,
                homeAddress: text,
              }))
            }
            />
          </View>
        </View>

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <TouchableOpacity onPress={() => confirmation()}>
            <View style={buttonStyle.primary}>
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                Save
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        </ScrollView>


        <Spinner 
          visible = {isLoading}
          textContent={'Processing...'}
          textStyle={{ color: '#FFF' }}
        />


        
      </ScrollView>
    </SafeAreaView>
  );
}
const bodyStyle = StyleSheet.create({
  main: {
    backgroundColor: "#FFF8EB",
    flex: 1,
  },

  container: {
    borderWidth: 1,
    borderColor: "black",
    height: "100%",
    gap: 16,
  },
});

const inputStyle = StyleSheet.create({
  container: {
    overflow: "hidden",
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 13,
    backgroundColor: "white",
    elevation: 7,
    marginVertical: 7,

  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F94892",
  },

  primary: {
    minHeight: 48,
    width: "100%",
    fontSize: 18,
    fontWeight: "bold",
    color: "#E60965",
  },
});

const fontStyle = StyleSheet.create({
  title: {
    color: "#E60965",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  header: { color: "#E60965", fontSize: 22, fontWeight: "bold" },
  subHeader: { fontSize: 18, color: "#F94892" },
  navigation: {},
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
