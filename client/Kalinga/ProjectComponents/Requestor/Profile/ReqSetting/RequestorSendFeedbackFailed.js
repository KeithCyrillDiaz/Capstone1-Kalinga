import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Header from "./Header";
import { useNavigation } from '@react-navigation/native';

export default function SendFeedbackFailed({route}) {

  const {userInformation, UserName, token} = route.params
  const navigate = useNavigation()
 const buttonClick = () => {
  navigate.goBack("RequestorSettingScreen", {userInformation: userInformation, UserName: UserName, token: token})
 }

  return (
    <SafeAreaView style={bodyStyle.main}>
      <ScrollView stickyHeaderIndices={[1]}>
        <StatusBar />
        <Header title="Send Feedback" />

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 64,
          }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}>
            <FontAwesome5 name="heart-broken" size={140} color="#E60965" />
            <Text
              style={{
                color: "#E60965",
                fontSize: 48,
                fontWeight: "bold",
                fontWeight: "bold",
                textAlign: "center",
              }}>
              Oh no!
            </Text>
          </View>

          <Text
            style={{
              textAlign: "center",
              marginTop: 24,
              paddingHorizontal: 64,
              color: "#E60965",
              fontSize: 18,
            }}>
            Please provide us with further suggestions and requests in the
            future.
          </Text>
        </View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,

          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 24,
        }}>
        <TouchableOpacity onPress={() => buttonClick()}>
          <View style={buttonStyle.primary}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Done
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
