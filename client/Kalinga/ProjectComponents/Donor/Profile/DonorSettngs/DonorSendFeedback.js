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
import { Fontisto, FontAwesome6 } from "@expo/vector-icons";
import Header from "./Header";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { BASED_URL } from "../../../../MyConstants";
import { globalStyles } from "../../../../styles_kit/globalStyles";
import { LoadingSpinner } from "../../../uploader/LoadingSpinner";

export default function SendFeedback({route}) {

  const { userInformation, token, userName } = route.params

  const [currentStar, setCurrentStar] = useState(0);
  const [loading, setLoading] = useState(false)

  const handleStarPress = (selectedStar) => {
    setCurrentStar(selectedStar);
  };

  const [feedback, setFeedBack] = useState("")

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
          {i <= currentStar ? (
            <Fontisto name="star" size={32} color="#E60965" />
          ) : (
            <FontAwesome6 name="star" size={32} color="#E60965" />
          )}
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const navigate = useNavigation()
  
  useEffect(() => {
    console.log(currentStar)
    console.log(feedback)
  },[currentStar])

  const confirmation = () => {
    if(currentStar < 3 && feedback.length === 0 ){
      Alert.alert(
        "Please Provide Feedback",
        "If you have suggestions or encounter issues, please let us know. Your feedback helps us improve the app."
      )
      return
    }
    if(currentStar < 3 && feedback.length < 20 ){
      Alert.alert(
        "Provide More Detailed Feedback",
        "We value your input! To help us better understand your experience, please provide feedback with at least 20 characters."
      );
      return
    }

    Alert.alert(
      "Confirmation",
      "Are you sure you want to submit your Feedback?",
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
      setLoading(true)
      const id = userInformation.Donor_ID
      const response = await axios.post(`${BASED_URL}/kalinga/createFeedback/${id}`,
      { 
        stars: currentStar,
        content: feedback,
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
     
  
    } catch(error){
      console.log("Error Uploading Bug Report", error)
      Alert.alert(
        "Something Went wrong",
        "There was an issue submitting your bug report. Please try again later."
      );
    } finally {
      setLoading(false)
      if(currentStar < 3){
        navigate.replace("DonorSendFeedbackFailed", {userInformation: userInformation, UserName: userName, token: token})
        return
      }
      else {
        navigate.replace("DonorSendFeedbackSuccess", {userInformation: userInformation, UserName: userName, token: token})
        return
      }
    }
  }
  

  return (
    <SafeAreaView style={globalStyles.defaultBackgroundColor}>
      <ScrollView stickyHeaderIndices={[1]}>
        <StatusBar />
        <Header title="Send Feedback" />
        <LoadingSpinner loading={loading}/>
        <Text
          style={{
            color: "#E60965",
            paddingHorizontal: 16,
            fontSize: 24,
            fontWeight: "bold",
            marginVertical: 16,
            fontWeight: "bold",
          }}>
          We would like your feedback to improve our app.
        </Text>

        <View
          style={{
            gap: 16,
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 16,
          }}>
          {renderStars()}
        </View>

        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text
            style={{
              color: "#E60965",
              fontWeight: "600",
              marginBottom: 8,
              fontSize: 16,
              textAlign: "center",
            }}>
            Please leave your feedback below:
          </Text>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              elevation: 10,
              padding: 16,
              fontSize: 16,
              color: "#E60965",
              borderRadius:17,
            }}>
            <TextInput
              numberOfLines={10}
              multiline={true}
              style={{
                textAlignVertical: "top",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
              placeholder="Enter your feedback"
              onChangeText={(text) => setFeedBack(text)}
              value = {feedback}
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 24,
        }}>
        <TouchableOpacity onPress={() => confirmation()}>
          <View style={buttonStyle.primary}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Submit
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
