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
  Alert
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "./Header";
import { useNavigation, CommonActions } from '@react-navigation/native';
import axios from 'axios'
import {BASED_URL} from '../../../../MyConstants'

export default function RequestorHelpAndSupportMessage({route}) {

  const { userInformation, token, userName } = route.params
  const navigation = useNavigation();

  const [form, setForm] = useState({
    topic: "",
    description: ""
  })

  const handleChangeText = (name, value) => {
    setForm({
      ...form,
      [name]: value
    })
  }

  const confirmation = () => {

    const { topic, description } = form;

    if (!topic.trim() || !description.trim()) {
      Alert.alert(
        "Incomplete Information",
        "Please provide both the topic and description before submitting."
      );
      return;
    }
    if(topic.length < 8 || description.length < 20){
      Alert.alert(
        "Incomplete Submission",
        "Please make sure your topic is at least 8 characters long and your description is at least 20 characters long before submitting."
      );
      return
    }

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

    try {
      const id = userInformation.Requestor_ID
      const { topic, description } = form;

      const response = await axios.post(`${BASED_URL}/kalinga/createHelpAndSupportReport/${id}`,
      { 
        topic: topic,
        content: description,
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
          return
        }
        return
      }
      console.log("Successfully Submitted Help And Support")
      Alert.alert(
        "Submission Successful",
        "Your help and support request has been successfully submitted. We will review it as soon as possible. Thank you for reaching out!"
      );
      navigation.replace("RequestorHelpAndSupportSuccess", {userInformation: userInformation, UserName: userName, token: token})
      return

    } catch(error){
      console.log("Error Uploading Bug Report", error)
      Alert.alert(
        "Something Went wrong",
        "There was an issue submitting your bug report. Please try again later."
      );
    } 
  }
  
  return (
    <SafeAreaView style={bodyStyle.main}>
      <ScrollView stickyHeaderIndices={[1]}>
        <StatusBar />
        <Header title="Help and Support" />

        <Text
          style={{
            color: "#E60965",
            paddingHorizontal: 16,
            fontSize: 24,
            fontWeight: "bold",
            marginVertical: 16,
            fontWeight: "bold",
          }}>
          Share your concern
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
              elevation: 5,
              borderWidth: 1,
              borderColor: "#E60965",
              minHeight: 52,
              paddingHorizontal: 16,
              fontSize: 16,
              color: "#E60965",
            }}
            placeholder="Enter your topic"
            onChangeText={(text) => handleChangeText("topic", text)}
            value = {form.topic}
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
            Concern Description
          </Text>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              elevation: 5,
              borderWidth: 1,
              borderColor: "#E60965",
              padding: 16,
              fontSize: 16,
              color: "#E60965",
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
              onChangeText={(text) => handleChangeText("description", text)}
              value = {form.description}
            />
          </View>
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
