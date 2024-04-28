import React, { useState } from "react";
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
import { MaterialIcons } from "@expo/vector-icons";

export default function LocationScreen() {
  const [locationEnabled, setLocationEnabled] = useState(false);

  return (
    <SafeAreaView style={bodyStyle.main}>
      <ScrollView contentContainerStyle={bodyStyle.container}>
        <StatusBar />
        <Header title="Location" />

        <View
          style={{
            paddingHorizontal: 16,
            alignItems: "center",
            marginVertical: 24,
          }}>
          <View style={{ flexDirection: "row", marginBottom: 12 }}>
            <MaterialIcons name="location-pin" size={48} color={"#E60965"} />
            <Text
              style={{ fontSize: 32, color: "#E60965", fontWeight: "bold" }}>
              Location
            </Text>
          </View>

          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "#E60965",
              fontWeight: "600",
            }}>
            To locate milk banks near you, Please enable location services
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#FFF4DD",
            opacity: 1,
            marginHorizontal: 24,
            elevation: 5,
            padding: 24,
            borderRadius: 10,
          }}>
          <View style={{ alignItems: "center", flexDirection: "row", gap: 24 }}>
            <Switch
              thumbColor={"#E60965"}
              value={locationEnabled}
              onValueChange={(newValue) => setLocationEnabled(newValue)}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#E60965",
                width: 200,
              }}>
              Kalinga can access your location with this permission
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
