import React, { useState } from "react";
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
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import Header from "./Header";

export default function AboutUs() {
  return (
    <SafeAreaView style={bodyStyle.main}>
      <ScrollView stickyHeaderIndices={[1]}>
        <StatusBar />
        <Header title="About Us" />

        <View
          style={{
            gap: 12,
            paddingHorizontal: 16,
            marginTop: 16,
          }}>
          <Text style={{ fontWeight: "bold", fontSize: 32, color: "#E60965" }}>
            Meet the Developers.
          </Text>
          <Text style={{ color: "#E60965", fontSize: 16 }}>
            Welcome to the heart of Kalinga! Our dedicated team of developers is
            passionate about creating a positive impact on infant health through
            the Kalinga App. Get to know the minds behind the app:
          </Text>
        </View>

        <View style={{ marginVertical: 24, gap: 16 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <DeveloperProfile name={"Alisha Arafol"} role={"Role"} />
            <DeveloperProfile name={"Rogine Cubelo"} role={"Role"} />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <DeveloperProfile name={"Beverly Somodio"} role={"Role"} />
          <DeveloperProfile name={"Keith Diaz"} role={"Role"} />
        </View>

        <DeveloperProfile name={"Jeannah Padasas"} role={"Role"} />
        <Text
          style={{
            marginVertical: 24,
            textAlign: "center",
            fontSize: 16,
            color: "#E60965",
          }}>
          Get in touch with us at KalingaApp@gmail.com
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const DeveloperProfile = ({ name, role, image }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 2,
      }}>
      <View style={{ position: "relative" }}>
        <View
          style={{
            position: "absolute",
            left: 10,
            backgroundColor: "#FFEECC",
            width: 125,
            height: 125,
            borderRadius: 100,
            marginBottom: 8,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "black",
            elevation: 5,
          }}></View>
        <View
          style={{
            backgroundColor: "#FFACC7",
            elevation: 8,

            width: 125,
            height: 125,
            borderRadius: 100,
            marginBottom: 8,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Image source={require("../../../../assets/Profile_female.png")} />
        </View>
      </View>

      <Image />

      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            color: "#E60965",
            fontWeight: 600,
          }}>
          {name}
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            color: "#E60965",
            fontWeight: 300,
          }}>
          {role}
        </Text>
      </View>
    </View>
  );
};

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

const cardStyle = StyleSheet.create({
  link: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#E60965",
  },

  linkTitle: {
    color: "#E60965",
    fontSize: 16,
    fontWeight: "600",
    width: "90%",
  },
});
