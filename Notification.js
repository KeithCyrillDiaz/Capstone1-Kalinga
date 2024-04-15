import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Switch,
} from "react-native";
import Header from "./Header";

export default function NotificationScreen() {
  return (
    <SafeAreaView style={bodyStyle.main}>
      <ScrollView contentContainerStyle={bodyStyle.container}>
        <StatusBar />
        <Header title="Notification" />

        <View style={{ paddingHorizontal: 16 }}>
          <Text
            style={{
              fontSize: 24,
              color: "#E60965",
              fontWeight: "bold",
              paddingHorizontal: 16,
              paddingVertical: 16,
            }}>
            Notification
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#FFF1EB",
            opacity: 1,
            marginHorizontal: 24,
            elevation: 5,
            padding: 24,
            borderRadius: 10,
          }}>
          <View style={{ alignItems: "center", flexDirection: "row", gap: 24 }}>
            <Switch thumbColor={"#E60965"} />
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#E60965" }}>
              New Articles
            </Text>
          </View>

          <View style={{ alignItems: "center", flexDirection: "row", gap: 24 }}>
            <Switch thumbColor={"#E60965"} />
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#E60965" }}>
              Push notification
            </Text>
          </View>

          <View style={{ alignItems: "center", flexDirection: "row", gap: 24 }}>
            <Switch thumbColor={"#E60965"} />
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#E60965" }}>
              Message notification
            </Text>
          </View>

          <View style={{ alignItems: "center", flexDirection: "row", gap: 24 }}>
            <Switch thumbColor={"#E60965"} />
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#E60965" }}>
              Message reminders
            </Text>
          </View>

          <View style={{ alignItems: "center", flexDirection: "row", gap: 24 }}>
            <Switch thumbColor={"#E60965"} />
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#E60965" }}>
              Show in lockscreen
            </Text>
          </View>
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
