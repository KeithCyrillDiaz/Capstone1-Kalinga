import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert
} from "react-native";
import Header from "./Header";
import { useNavigation } from '@react-navigation/native';
import { BASED_URL } from '../../../../MyConstants'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from "axios";
import { globalStyles } from "../../../../styles_kit/globalStyles";

export default function ChangePasswordScreen({route}) {

  const {token, userInformation} = route.params
  

  const navigation = useNavigation()
  const [showPassword, setShowPassword] = useState(false)

  const navigate = (Page) => {
    navigation.navigate(Page, {token: token})
  }

  const [passwords, setPasswords] = useState({
    newPassword: "",
    oldPassword: ""
  })

  const handleChangeText = (name, value) => {
    setPasswords({
      ...passwords,
      [name]: value
    })
    return
  }
  const submit = async () => {
    console.log(passwords)

    const { newPassword, oldPassword} = passwords


    if (newPassword.includes(" ") || oldPassword.includes(" ")) {
      Alert.alert("Invalid Password", "Password cannot contain spaces.");
      return;
    }
  
    // Check if the new password has at least 8 characters
    if (newPassword.length < 8 || oldPassword.length < 8) {
      Alert.alert("Invalid Password", "Password must be at least 8 characters.");
      return;
    }

    if(newPassword === oldPassword) {
      Alert.alert(
        "Passwords Match",
        "The new password must not match the current password."
      );
      return
    }

    try {

      const id = userInformation.Requestor_ID
      const { newPassword, oldPassword} = passwords

      const response = await axios.patch(`${BASED_URL}/kalinga/updatePassword/${id}`,
      {
        currentPassword: oldPassword,
        password: newPassword,
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
        if(response.data.messages.message === "Unauthorized User"){
          await AsyncStorage.multiRemove(['token', 'userInformation', 'DPLink', 'Image_ID']);
          Alert.alert("Session Expired", "Your session has expired. Please log in again.", [
            {
              text: "OK",
              onPress: () => navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'LogIn' }],
                })
              ),
            },
          ]);
        }
        if(response.data.messages.message === "Password not match"){
          Alert.alert(
            "Invalid Old Password",
            "The old password you entered does not match the current password."
          );
          return
        }
        return
      }
      console.log("Updated Password Successfully")
      Alert.alert(
        "Password Updated",
        "Your password has been updated successfully."
      );

      navigation.goBack()

    } catch(error) {
      console.log("Change password Error", error)
      Alert.alert("Something Went Wrong",  "We apologize for the inconvinience. Please try again later")
    }
  }

  return (
    <SafeAreaView style={globalStyles.defaultBackgroundColor}>
      <ScrollView contentContainerStyle={bodyStyle.container}>
        <StatusBar />
        <Header title="Change Password" />

        <View
          style={{
            paddingHorizontal: 16,
            alignItems: "flex-start",
            marginVertical: 16,
          }}>
          <Text style={{ fontSize: 24, color: "#E60965", fontWeight: "bold" }}>
            Change Password
          </Text>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          <Text
            style={{
              color: "#F94892",
              fontWeight: "600",
              marginBottom: 8,
              fontSize: 16,
            }}>
            Current Password
          </Text>

          <View style = {passwordStyle.container}>
            <TextInput
            style={{
              color: "#E60965",
              width: "100%",
              minHeight: 52,
              fontSize: 16
            }}
            placeholder="Enter your current password"
            onChangeText={(text) => handleChangeText("oldPassword", text)}
            value = {passwords.oldPassword}
            secureTextEntry={!showPassword}
          />
           <TouchableOpacity
            style = {{
              position: "absolute",
              right: 10,
            }}
            onPress={() => setShowPassword(!showPassword)}>
                <MaterialCommunityIcons
                  name={showPassword ?  "eye" : "eye-off" }
                  size={24}
                  color="#E60965"
                  style={{ paddingHorizontal: 12 }}
                />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigate("ResetPassword")}>
            <Text style={{color: "#F94892", fontWeight: "600", fontSize: 13, marginLeft: 7, marginTop: 3}}>Forgot your Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          <Text
            style={{
              color: "#F94892",
              fontWeight: "600",
              marginBottom: 8,
              fontSize: 16,
            }}>
            New Password
          </Text>
          <View style = {passwordStyle.container}>
            <TextInput
            style={{
              color: "#E60965",
              width: "100%",
              minHeight: 52,
              fontSize: 16
            }}
            placeholder="Enter your new password"
            onChangeText={(text) => handleChangeText("newPassword", text)}
            value = {passwords.newPassword}
            secureTextEntry={!showPassword}
          />
           <TouchableOpacity
            style = {{
              position: "absolute",
              right: 10,
            }}
            onPress={() => setShowPassword(!showPassword)}>
                <MaterialCommunityIcons
                  name={showPassword ?  "eye" : "eye-off" }
                  size={24}
                  color="#E60965"
                  style={{ paddingHorizontal: 12 }}
                />
            </TouchableOpacity>
          </View>
          <Text style={{color: "#F94892", fontWeight: "600", fontSize: 13, marginLeft: 7, marginTop: 3}}>Passwords must be at least 8 characters</Text>
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <TouchableOpacity onPress={() => submit()}>
          <View style={buttonStyle.primary}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Update Password
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const passwordStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
      backgroundColor: "white",
      elevation: 10,
      borderRadius: 17,
      minHeight: 52,
      paddingHorizontal: 16,
      fontSize: 16,
      alignItems: "center",
      position: "relative"
  }
})
const bodyStyle = StyleSheet.create({
  main: {
    backgroundColor: "#FFF8EB",
    flex: 1,
    paddingBottom: 24,
  },

  container: {
    height: "100%",
    gap: 16,
    marginBottom: 24,
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
    marginBottom: 40
  },
});
