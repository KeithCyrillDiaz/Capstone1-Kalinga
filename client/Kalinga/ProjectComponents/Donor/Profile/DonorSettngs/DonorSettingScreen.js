import React, { useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import Header from "./Header";
import { useNavigation, CommonActions, useFocusEffect} from '@react-navigation/native';
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASED_URL } from "../../../../MyConstants";
export default function SettingScreen({route}) {

  const userInformation = route.params.userInformation
  const UserName = route.params.UserName
  const { token } = route.params

  const navigation = useNavigation(); 
  const deleteToken = async () => {
    const token = await AsyncStorage.getItem('token')
    if(!token){
      console.log("Unauthorized")
      navigatePage("LogIn")
      return
    }
    const result = await axios.get(`${BASED_URL}/kalinga/userLogout/${token}`)
    if(result.data.messages.code !== 0){
      console.log("Unauthorized")
      navigatePage("LogIn")
      return
    }

    await AsyncStorage.multiRemove(['token', 'userInformation', 'DPLink', 'Image_ID']);
    const checkToken = await AsyncStorage.getItem('token')
    const checkUserInfo = await AsyncStorage.getItem('userInformation')
    if(checkToken && checkUserInfo){
      console.log("Failed to delete token in Async")
      await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('userInformation')
    }
    console.log("Deleted token and user Information in Storage")
    navigatePage('LogIn')
    return
  }

  const navigatePage = (Page) => {
    if( Page === "LogIn"){
      navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{ name: Page }],
        })
    );
    return
    }
     navigation.navigate(Page, {userInformation: userInformation, userName: UserName, token: token}); // Navigate to the Login screen
  }

  const [profilePic, setProfilePic] = useState("")
  const fetchDP = async () => {
    const DPLink = await AsyncStorage.getItem("DPLink")
    if(!DPLink && !userInformation.DPLink){
      console.log("DPLink: ", DPLink)
      console.log("userInformation.DPLink: ", userInformation.DPLink)
      return
    } 
    if(!DPLink){
      setProfilePic(userInformation.DPLink)
      console.log("userInformation.DPLink: ", userInformation.DPLink)
    } else{
      setProfilePic(DPLink)
      console.log("DPLink: ", DPLink)
    }
   
  } 

  useFocusEffect(
    React.useCallback(() => {
      fetchDP(); // Fetch profile picture whenever screen comes into focus
    }, [])
  );

  return (
    <SafeAreaView style={bodyStyle.main}>
      <ScrollView contentContainerStyle={bodyStyle.container}>
        <StatusBar />
        <Header title="Settings" />
        <View style={bodyStyle.section}>
          <Text style={fontStyle.title}>Account</Text>
          <View style={cardStyle.container}>

            <View
              style={{
                gap: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Image
                source={profilePic === "" ? require("../../../../assets/Profile_icon.png") : {uri: profilePic}}
                style={{
                  width: 84,
                  height: 84,
                  borderWidth: 1,
                  borderRadius: 100,
                  borderColor: "#E60965",
                }}
              />

              <View>
                <Text style={fontStyle.header}>{UserName}</Text>
                <Text style={fontStyle.subHeader}>Personal Information</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => navigatePage("DonorEditPersonalScreen")} style={buttonStyle.iconBtn}>
              <Entypo name="chevron-right" size={32} color="#E60965" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={bodyStyle.section}>
          <Text style={fontStyle.title}>General</Text>
          <View style={cardStyle.navContainer}>
            {/* Notification */}
            <TouchableOpacity onPress={() => navigatePage("DonorNotification")} style={cardStyle.link}>
              <Text style={cardStyle.linkTitle}>Notification</Text>
              <Entypo name="chevron-right" size={24} color="#E60965" />
            </TouchableOpacity>

            {/* Location */}
            <TouchableOpacity onPress={() => navigatePage("DonorLocationScreen")} style={cardStyle.link}>              
                <Text style={cardStyle.linkTitle}>Location</Text>
              <Entypo name="chevron-right" size={24} color="#E60965" />
            </TouchableOpacity>

            {/* Change Password */}
            <TouchableOpacity onPress={() => navigatePage("DonorChangePassword")} style={cardStyle.link}>
              <Text style={cardStyle.linkTitle}>Change Password</Text>
              <Entypo name="chevron-right" size={24} color="#E60965" />
              </TouchableOpacity>

            {/* Help and Support */}
            <TouchableOpacity onPress={() => navigatePage("DonorHelpAndSupport")} style={cardStyle.link}>
              <Text style={cardStyle.linkTitle}>Help & Support</Text>
              <Entypo name="chevron-right" size={24} color="#E60965" />
              </TouchableOpacity>

            {/* About us */}
            <TouchableOpacity onPress={() => navigatePage("DonorAboutUs")} style={cardStyle.linkEnd}>
              <Text style={cardStyle.linkTitle}>About us</Text>
              <Entypo name="chevron-right" size={24} color="#E60965" />
              </TouchableOpacity>
          </View>
        </View>

        <View style={bodyStyle.section}>
          <Text style={fontStyle.title}>Feedback</Text>
          <View style={cardStyle.navContainer}>
          <TouchableOpacity onPress={() => navigatePage("DonorReportBug")} style={cardStyle.link}>
              {/* Report bug  */}
              <Text style={cardStyle.linkTitle}>Report Bug</Text>
              <Entypo name="chevron-right" size={24} color="#E60965" />
        </TouchableOpacity>

            {/* Seend feedback */}
            <TouchableOpacity onPress={() => navigatePage("DonorSendFeedback")} style={cardStyle.linkEnd}>
              <Text style={cardStyle.linkTitle}>Send Feedback</Text>
              <Entypo name="chevron-right" size={24} color="#E60965" />
              </TouchableOpacity>
           </View>
        </View>

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <TouchableOpacity onPress={() => deleteToken()}>
            <View style={buttonStyle.primary}>
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                Log out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
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
    gap: 11,
  },

  section: { paddingHorizontal: 16 },
});

const cardStyle = StyleSheet.create({
  container: {
    backgroundColor: "#FFE5EC",
    minHeight: 100,
    padding: 12,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#E60965",
    elevation: 10,
  },

  navContainer: {
    backgroundColor: "#FFE5EC",
    minHeight: 100,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E60965",
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
    elevation: 5,
  },

  link: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#E60965",
  },

  linkEnd: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    borderColor: "#E60965",
  },

  linkTitle: { color: "#E60965", fontSize: 16, fontWeight: "600" },
});

const fontStyle = StyleSheet.create({
  title: {
    color: "#E60965",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  header: { color: "#E60965", fontSize: 18, fontWeight: "bold" },
  subHeader: { fontSize: 14, color: "#F94892" },
  navigation: {},
});

const buttonStyle = StyleSheet.create({
  primary: {
    marginTop: 12,
    backgroundColor: "#E60965",
    padding: 12,
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

const assetStyle = StyleSheet.create({
  icon: { width: 32, height: 32 },
});