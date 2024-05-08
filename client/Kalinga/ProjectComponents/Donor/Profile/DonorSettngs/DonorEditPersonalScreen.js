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
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "./Header";
import { BASED_URL } from "../../../../MyConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import ImageZoom from 'react-native-image-pan-zoom';
import Spinner from 'react-native-loading-spinner-overlay';


export default function EditPersonalScreen({route}) {

  const userInformation = route.params.userInformation
 const userName = route.params.userName
 
 const [userData, setUserData] = useState(userInformation)
 const [selectedImage, setSelectedImage] = useState({});
 const [profilePic, setProfilePic] = useState("")
 const [isLoading, setIsloading] = useState(false)


 const uploadImage = async () => {
  try{
    setIsloading(true)
    console.log("Number of properties in selectedImage: ", Object.keys(selectedImage).length);

            if(Object.keys(selectedImage).length === 1){
              const uploadedImages = new FormData();
              const image = {
                uri: selectedImage.ProfilePicture.uri,
                type: 'image/jpeg', 
                name: `${userData.fullName}.png`,
              }
             
             
              uploadedImages.append('ProfilePicture', image); 
              uploadedImages.append(`userType`, "Donor"); 
              uploadedImages.append(`owner`, userData.fullName);// Append userType
              uploadedImages.append(`ownerID`, userData.Donor_ID);// Append userType
              const Image_ID = await AsyncStorage.getItem("Image_ID")
              if(Image_ID){
                uploadedImages.append('Image_ID', Image_ID)
              }

              console.log("imageData: ", uploadedImages)
              console.log("selectedImage: ",selectedImage )
          
              const result = await axios.post(`${BASED_URL}/kalinga/uploadDP`, uploadedImages, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
              await AsyncStorage.setItem('DPLink', result.data.link)
              await AsyncStorage.setItem('Image_ID', result.data.Image_ID)
               console.log(result.data.messages.message)
               if(result.data.messages.code === 0){
                console.log(result.data.messages.message)
                console.log("link: ", result.data.link)
                console.log("Image_ID: ", result.data.Image_ID)
                setProfilePic(result.data.link)
                setSelectedImage({})
                
               }
            }
  }catch (error){
    console.log("error: ", error)
  } finally {
    fetchDP()
    setIsloading(false)
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
  const checkImage_ID = await AsyncStorage.getItem("Image_ID")
  if(!checkImage_ID){
    if(userInformation.Image_ID) await AsyncStorage.setItem("Image_ID", userInformation.Image_ID)
  }
  const result = await AsyncStorage.getItem('DPLink')
  if(selectedImage.ProfilePicture){
    console.log("profilePicS: ", result)
    setProfilePic(selectedImage.ProfilePicture.uri)
  } else if(result) {
    setProfilePic(result)
    console.log("profilePicR: ", result)
  } else if(userInformation.Image_ID){
    setProfilePic(userInformation.Image_ID)
    console.log("profilePicU: ", userInformation.Image_ID)
  } else setProfilePic("")

  console.log("profilePic: ", profilePic)

}

useEffect(() => {
  fetchDP()
},[selectedImage])


 const saveDetails = async () => {
      try{
        if(userData !== userInformation){
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
        return
      } catch(error) {
        console.log("Error: ", error)
        if(error)Alert.alert('Network error', `Please check your internet connection`)
            else
            Alert.alert('Something went wrong', "Please try again later")
      }

 }

 const fetchData = async () => {
  const userInformationToString = await AsyncStorage.getItem('userInformation')
  if(userInformationToString !== null ) {
    const userInformation = JSON.parse(userInformationToString);
    setUserData(userInformation)
  }
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
    <SafeAreaView style={bodyStyle.main}>
      <ScrollView contentContainerStyle={bodyStyle.container}>
        <StatusBar />
        <Header title="Personal Information" />


        <ScrollView
        overScrollMode="false"
        style = {{
          flex: 1,
        }}
        >
          <View
            style={{
              width: "100%",
              paddingHorizontal: 24,
              alignItems: "center",
            }}>
            <View style={{ position: "relative" }}>
              <Image
                source={!selectedImage.ProfilePicture && profilePic === "" ? require("../../../../assets/Profile_icon.png") : profilePic === "" ? require("../../../../assets/Profile_icon.png") : { uri: profilePic }}
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
                <Text style={inputStyle.label}>Age:</Text>
                <TextInput style={inputStyle.primary} 
                value={userData.age}
                onChangeText={(text) =>
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    age: text,
                  }))
                }/>
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
                    age: text,
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
              value={userData.birthDate}
              onChangeText={(text) =>
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  birthDate: text,
                }))
              } />
            </View>
          </View>
          <View style={{ paddingHorizontal: 16 }}>
            <View style={inputStyle.container}>
              <Text style={inputStyle.label}>Phone Number: </Text>
              <TextInput style={inputStyle.primary}
              value={userData.mobileNumber}
              onChangeText={(text) =>
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  mobileNumber: text,
                }))
              } />
            </View>
          </View>
          <View style={{ paddingHorizontal: 16 }}>
            <View style={inputStyle.container}>
              <Text style={inputStyle.label}>Email: </Text>
              <TextInput style={inputStyle.primary} 
              value={userData.email}
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
              multiline = {true} 
              value={userData.homeAddress}
              onChangeText={(text) =>
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  homeAddress: text,
                }))
              }/>
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
    borderWidth: 1.5,
    borderColor: "#E60965",
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 13,
    backgroundColor: "white",
    elevation: 5,
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
    minWidth: 150,
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
