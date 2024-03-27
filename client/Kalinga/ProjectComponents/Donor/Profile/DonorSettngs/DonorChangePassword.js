import React from "react";
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
import Header from "./Header";

export default function ChangePasswordScreen() {
  return (
    <SafeAreaView style={bodyStyle.main}>
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
          <TextInput
            style={{
              backgroundColor: "#FFF1EB",
              elevation: 5,
              borderWidth: 1,
              borderColor: "#E60965",
              borderRadius: 5,
              minHeight: 52,
              paddingHorizontal: 16,
              fontSize: 16,
              color: "#E60965",
            }}
            placeholder="Enter your current password"
          />
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
          <TextInput
            style={{
              backgroundColor: "#FFF1EB",
              elevation: 5,
              borderWidth: 1,
              borderColor: "#E60965",
              borderRadius: 5,
              minHeight: 52,
              paddingHorizontal: 16,
              fontSize: 16,
              color: "#E60965",
            }}
            placeholder="Enter your new password"
          />
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <TouchableOpacity onPress={() => {}}>
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
  },
});
