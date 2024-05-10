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
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Header from "./Header";
import { useNavigation } from '@react-navigation/native';

export default function HelpAndSupportSuccess({route}) {

 const {userInformation, UserName, token} = route.params
  const navigate = useNavigation()
 const buttonClick = () => {
  navigate.goBack("RequestorSettingScreen", {userInformation: userInformation, UserName: UserName, token: token})
 }

  return (
    <SafeAreaView style={bodyStyle.main}>
      <ScrollView stickyHeaderIndices={[1]}>
        <StatusBar />
        <Header title="Help and Support" />

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 64,
          }}>
          <View style={{ marginBottom: 24 }}>
            <FontAwesome name="thumbs-o-up" size={140} color="#E60965" />
            <Text
              style={{
                color: "#E60965",
                fontSize: 48,
                fontWeight: "bold",
                fontWeight: "bold",
                textAlign: "center",
              }}>
              Done!
            </Text>
          </View>

          <Text
            style={{
              textAlign: "center",
              paddingHorizontal: 52,
              color: "#E60965",
            }}>
            Thank you for submitting your report. We would like to assure you
            that we have received it and are taking necessary actions. We will
            address this matter as soon as possible and keep you updated on any
            developments.
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
