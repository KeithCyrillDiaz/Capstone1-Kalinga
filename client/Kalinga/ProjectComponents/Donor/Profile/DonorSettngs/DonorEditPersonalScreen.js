import React from "react";
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
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "./Header";

export default function EditPersonalScreen() {
  return (
    <SafeAreaView style={bodyStyle.main}>
      <ScrollView contentContainerStyle={bodyStyle.container}>
        <StatusBar />
        <Header title="Personal Information" />

        <View
          style={{
            width: "100%",
            paddingHorizontal: 24,
            alignItems: "center",
          }}>
          <View style={{ position: "relative" }}>
            <Image
              source={require("../../../../assets/Profile_icon.png")}
              style={{
                width: 127,
                height: 127,
                borderWidth: 1,
                borderRadius: 100,
                marginBottom: 16,
                borderColor: "#E60965",
              }}
            />

            <MaterialIcons
              name="camera-alt"
              size={48}
              color="#E60965"
              style={{ position: "absolute", bottom: 16, right: -5 }}
            />
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 12,
            }}>
            <Text style={fontStyle.header}>Rogine Cubelo</Text>
            <Text style={fontStyle.subHeader}>Requestor</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", paddingHorizontal: 16, gap: 16 }}>
          <View
            style={{
              width: Dimensions.get("screen").width / 2.3,
            }}>
            <View style={inputStyle.container}>
              <Text style={inputStyle.label}>Age</Text>
              <TextInput style={inputStyle.primary} />
            </View>
          </View>

          <View
            style={{
              width: Dimensions.get("screen").width / 2.3,
            }}>
            <View style={inputStyle.container}>
              <Text style={inputStyle.label}>Gender</Text>
              <TextInput style={inputStyle.primary} />
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          <View style={inputStyle.container}>
            <Text style={inputStyle.label}>Birthdate</Text>
            <TextInput style={inputStyle.primary} />
          </View>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={inputStyle.container}>
            <Text style={inputStyle.label}>Phone Number</Text>
            <TextInput style={inputStyle.primary} />
          </View>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={inputStyle.container}>
            <Text style={inputStyle.label}>Email</Text>
            <TextInput style={inputStyle.primary} />
          </View>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={inputStyle.container}>
            <Text style={inputStyle.label}>Address</Text>
            <TextInput style={inputStyle.primary} />
          </View>
        </View>

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <TouchableOpacity onPress={() => {}}>
            <View style={buttonStyle.primary}>
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                Save
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
    gap: 16,
  },
});

const inputStyle = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "#E60965",
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 13,
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
