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
import { uploadDpInFirebase,deleteFolderContents } from '../../../uploader/fireBaseUploader'
import { globalStyles } from "../../../../styles_kit/globalStyles";
import { InputPasswordModal } from "../../../Authorization/InputPasswordModal";
import { CheckToken } from "../../../Authorization/checktoken";
import { AddressPicker } from "../../../modal/AddressPicker";


export default function EditPersonalScreen({route}) {
  
 const {userName, userInformation, token } = route.params
 const navigate = useNavigation()
 const [userData, setUserData] = useState(userInformation)
 const [selectedImage, setSelectedImage] = useState({});
 const [profilePic, setProfilePic] = useState("")
 const [isLoading, setIsloading] = useState(false)
 const [pageReady, setPageReady] = useState(false)

 const [onEdit, setOnEdit] = useState(false)

 //validation
 const [isEmailExisting, setIsEmailExisting] = useState(false)
 const [isEmailValid, setIsEmailValid] = useState(true)
 const [isFormFilled, setIsFormFilled] = useState(true)


  //uploaderModal
  const [progressBar, setProgressBar] = useState(0)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageUri, setIMageUri] = useState("")
  const [loaderLabel, setLoaderLabel] = useState("")

  //Hooks from firebase import
  const [axiosResponse, setAxiosResponse] = useState("")
  const [link, setLink] = useState("")
  const [imagePath, setImagePath] = useState("")
  const [resultDp, setResultDP] = useState({})

  //Modals
  const [showInputPassword, setShowInputPassword] = useState(false)
  const [showAddressPicker, setShowAddressPicker] = useState(false)

  const state = navigate.getState();


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

              const imagesToBeDeleted = userInformation.userType + "/" + userInformation.fullName + "/" + "Profile-Pictures/" + "Images"
        
            // Delete old files to overwrite
              if(imagesToBeDeleted){
                await deleteFolderContents({
                  folderPath: imagesToBeDeleted
                })
              }
            
              for (const key in selectedImage) {
                const imageData = selectedImage[key];

               const result = await uploadDpInFirebase({
                  id: userInformation.Requestor_ID,
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
                  setPath: setImagePath,
                });
                await AsyncStorage.setItem('userInformation', JSON.stringify(result))
                Alert.alert(
                    "Successfully Updated",
                    "User details have been successfully updated",
                );
              }

              setSelectedImage({})
              return
            }
  }catch (error){
    console.log("error: ", error)
  } finally {
    fetchDP()
    setUploadingImage(false)
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
    setProfilePic(selectedImage.ProfilePicture.uri)
  } else if(result) {
    setProfilePic(result)
  } else setProfilePic("")
  const checkImage_ID = await AsyncStorage.getItem("Image_ID")
  if(!checkImage_ID){
    if(userInformation.Image_ID) await AsyncStorage.setItem("Image_ID", userInformation.Image_ID)
  }
}

const checkForm = () => {
  let keysToCheck = [
    'mobileNumber',
    'email',
    'homeAddress',
    ];

    const isFormDataValid = keysToCheck.every(key => userData[key].trim() !== '');

    if (isFormDataValid) {
        if(!isFormFilled)console.log('All values until medical condition are valid');
        setIsFormFilled(true)
        
    } else {
      if(isFormFilled)console.log('Some values until medical condition are empty');
        setIsFormFilled(false)
    }
}

useEffect(() => {
  storeDPInAsyncStorage()
  fetchDP()
},[selectedImage])

useEffect(() => {
  if(Object.keys(selectedImage) !== 0)setSelectedImage({})
},[])

useEffect(()=> {
  checkForm()
},[userData.email, userData.mobileNumber, userData.homeAddress])

const checkEmail = async (email) => {
  const response = await axios.get(`${BASED_URL}/kalinga/checkEmail/${email}`)
  if(response.data.messages.code === 1){
    console.log(response.data.messages.message)
    setIsEmailExisting(true)
    return
  } else setIsEmailExisting(false)
  return
}
  const handleChangeText = (name, value) => {
    const validNumber = /^[0-9]*$/
    if(name === "mobileNumber" && !validNumber.test(value))return

    if(name === "email" && value.includes("@") && (value.endsWith("com") || value.endsWith("ph"))){
      if(value === userInformation.email){
        setIsEmailExisting(false)
        setIsEmailValid(true)
      } else {
        console.log("Email: ", value)
        setIsEmailValid(true)
        checkEmail(value)
      }
    
    } else if(name === "email") {
      setIsEmailValid(false)
      setIsEmailExisting(false)
    }

    setUserData({
      ...userData,
      [name]: value
    })
  }

const saveDetails = async () => {
  try{
      console.log("userInformation.email: ", userInformation.email)
      console.log("userData.email: ", userData.email)
      if(userInformation.email !== userData.email){
        navigate.replace(`VerifyNewEmail`, {userInformation: userData, userName: userName, token: token, selectedImage: selectedImage})
        return
      }
    setIsloading(true)
      console.log("Updating user Information")
      const result = await axios.post(`${BASED_URL}/kalinga/updateUserInformation`,
      {
        userData: userData
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      console.log(result.data.messages.message)
      setIsloading(false)
      await CheckToken({navigation: navigate, message: result.data.messages.message})
      if(Object.keys(selectedImage).length !== 0)await uploadImage();

      else if("result: ", result.data.messages.code === 0){
        setUserData(result.data.result)
        const updatedData = result.data.result
        console.log("updatedData: ", updatedData)
        await AsyncStorage.setItem('userInformation', JSON.stringify(updatedData))
      } else {
        console.log("Error: ", result.data.messages.message)
        return
      } 
    
    
      Alert.alert("Successfully Updated", " User details have been successfully updated")
      setOnEdit(false)
  } catch(error) {
    console.log("Error: ", error)
    if(error)Alert.alert('Network error', `Please check your internet connection`)
        else
        Alert.alert('Something went wrong', "Please try again later")
  } finally {
    fetchData();
    fetchDP()
    setIsloading(false)
  }

}

 const fetchData = async () => {
  if(!isLoading)setIsloading(true)

  try{
    const userInformationToString = await AsyncStorage.getItem('userInformation')
    if(userInformationToString !== null ) {
      const userInformation = JSON.parse(userInformationToString);
      setUserData(userInformation)
    }
  } catch(error) {
    console.log("Error getting userInfo async")
  } finally {
    setIsloading(false)
    setPageReady(true)
  }
 }

 useEffect(()=>{
  fetchData()
 },[])


 const confirmation = () => {
    Alert.alert('Confirmation','Are you sure you want to save these details?',
    [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => saveDetails(),
      },
    ]
  )
    
 }

 const handleSubmitAddress = (formData) => {
  setShowAddressPicker(false)
  console.log("TEst: ", formData)
  setUserData(formData)

 }

  if(pageReady) {
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
          {showInputPassword && (
            <InputPasswordModal 
            onClose={() => setShowInputPassword(false)}
            email = {userInformation.email}
            id={userInformation.Requestor_ID}
            userType={userInformation.userType}
            token = {token}
            navigation={navigate}
            onValid = {() => {
              setOnEdit(true);
              setShowInputPassword(false)
            }}
            />
          )}
           {showAddressPicker &&(
            <AddressPicker
            data={userData}
            visible={showAddressPicker}
            onClose={() => setShowAddressPicker(false)}
            onSubmit={handleSubmitAddress}
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
              {onEdit && (
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
              <Text style={fontStyle.subHeader}>Requestor</Text>
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
                  editable={false}
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
              editable={false}
              />
            </View>
          </View>
          <View style={{ paddingHorizontal: 16 }}>
            <View style={inputStyle.container}>
              <Text style={inputStyle.label}>Phone Number: </Text>
              <TextInput style={inputStyle.primary} 
               maxLength={11}
               keyboardType="numeric"
               value = {userData.mobileNumber}
               onChangeText={(text) => handleChangeText('mobileNumber', text)}
              editable={onEdit}
              />
            </View>
          </View>
          <View style={{ paddingHorizontal: 16 }}>
            <View style={inputStyle.container}>
              <Text style={inputStyle.label}>Email: </Text>
              <TextInput style={inputStyle.primary} 
               value = {userData.email}
               onChangeText={(text) => handleChangeText('email', text)}
              editable={onEdit}
              />
            </View>
            {isEmailExisting && userData.email!=="" && (
              <Text style ={{
                color: "red",
                fontFamily: "Open-Sans-Regular",
                fontSize: 15,
                marginLeft: 17
              }}>Email is already existing</Text>
            )}
             {!isEmailValid && (
              <Text style ={{
                color: "red",
                fontFamily: "Open-Sans-Regular",
                fontSize: 15,
                marginLeft: 17
              }}>Please enter a valid email address</Text>
            )}
          </View>
          <View style={{ paddingHorizontal: 16 }}>
            <TouchableOpacity 
            disabled={!onEdit}
            onPress={() => setShowAddressPicker(true)}
            style={[inputStyle.container, {height: 50}]}>
              <Text style={inputStyle.label}>Address:</Text>
              <Text style={[inputStyle.primary, {minHeight:20}]}>{userData.homeAddress}</Text>
            </TouchableOpacity>
          </View>
          
             {onEdit && (
               <View style ={{
                flexDirection: "row", 
                alignItems: "center",
                justifyContent: "center",
                gap: 27,
                marginTop: 7,
                paddingBottom: 17,
                }}>
                  <TouchableOpacity
                  disabled={isEmailExisting || !isEmailValid || !isFormFilled}
                  onPress={() => confirmation()}>
                    <View style={[buttonStyle.edit,
                    {opacity: isEmailExisting || !isEmailValid || !isFormFilled ? 0.5 : 1}

                    ]}>
                      <Text
                        style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
                        Save
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    //reset everything
                    fetchData()
                    setSelectedImage({})
                    setOnEdit(false)
                    setIsEmailValid(true)
                    setIsEmailExisting(false)
                    }}>
                    <View style={buttonStyle.cancel}>
                      <Text
                        style={{ color: "#E60965", fontSize: 16, fontWeight: "bold" }}>
                        Cancel
                      </Text>
                    </View>
                  </TouchableOpacity>
              </View>
             )}
  
         {!onEdit && (
           <View
           style={{
             width: "100%",
             justifyContent: "center",
             alignItems: "center",
             paddingBottom: 17
           }}>
           <TouchableOpacity onPress={() => setShowInputPassword(true)}>
             <View style={buttonStyle.primary}>
               <Text
                 style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
                 Edit
               </Text>
             </View>
           </TouchableOpacity>
         </View>
         )}
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
  edit: {
    marginTop: 12,
    backgroundColor: "#E60965",
    padding: 12,
    paddingHorizontal: 32,
    minWidth: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    elevation: 7,
  },

  cancel: {
    marginTop: 12,
    backgroundColor: "white",
    padding: 12,
    paddingHorizontal: 32,
    minWidth: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    elevation: 7,
  },

  primary: {
    marginTop: 12,
    backgroundColor: "#E60965",
    padding: 12,
    paddingHorizontal: 32,
    minWidth: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    elevation: 7,
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
