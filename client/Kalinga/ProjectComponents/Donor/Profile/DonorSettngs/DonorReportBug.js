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
import { MaterialIcons } from "@expo/vector-icons";
import Header from "./Header";

export default function ReportBug() {
  return (
    <SafeAreaView style={bodyStyle.main}>
      <ScrollView stickyHeaderIndices={[1]}>
        <StatusBar />
        <Header title="Report a Bug" />

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
              elevation: 5,
              borderWidth: 1,
              borderColor: "#E60965",
              minHeight: 52,
              paddingHorizontal: 16,
              fontSize: 16,
              color: "#E60965",
            }}
            placeholder="Enter your topic"
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
          <TouchableOpacity onPress={() => {}}>
            <View style={buttonStyle.primary}>
              <MaterialIcons name="upload" size={24} color={"white"} />
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                Upload a photo
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 24,
          }}>
          <TouchableOpacity onPress={() => {}}>
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
