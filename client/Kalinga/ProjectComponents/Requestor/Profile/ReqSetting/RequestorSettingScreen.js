import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import Header from "./Header";
import { useNavigation } from '@react-navigation/native';


export default function SettingScreen() {

  const navigation = useNavigation(); 
  const navigatePage = (Page) => {
    navigation.navigate(Page); // Navigate to the Login screen
  }

  return (
    <SafeAreaView style={bodyStyle.main}>
      <ScrollView contentContainerStyle={bodyStyle.container}>
        <StatusBar />
        <Header title="Settings" />
        <View style={bodyStyle.section}>
          <Text style={fontStyle.title}>Account</Text>
          <View style={cardStyle.container}>
            <View
              style={{
                gap: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Image
                source={require("../../../../assets/Profile_icon.png")}
                style={{
                  width: 84,
                  height: 84,
                  borderWidth: 1,
                  borderRadius: 100,
                  borderColor: "#E60965",
                }}
              />

              <View>
                <Text style={fontStyle.header}>Rogine Cubelo</Text>
                <Text style={fontStyle.subHeader}>Personal Information</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => {}} style={buttonStyle.iconBtn}>
              <Entypo name="chevron-right" size={32} color="#E60965" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={bodyStyle.section}>
          <Text style={fontStyle.title}>General</Text>
          <View style={cardStyle.navContainer}>
            {/* Notification */}
            <TouchableOpacity onPress={() => navigatePage("Notification")} style={cardStyle.link}>
              <Text style={cardStyle.linkTitle}>Notification</Text>
              <Entypo name="chevron-right" size={24} color="#E60965" />
            </TouchableOpacity>

            {/* Location */}
            <TouchableOpacity onPress={() => navigatePage("LocationScreen")} style={cardStyle.link}>              
                <Text style={cardStyle.linkTitle}>Location</Text>
              <Entypo name="chevron-right" size={24} color="#E60965" />
            </TouchableOpacity>

            {/* Change Password */}
            <TouchableOpacity onPress={() => navigatePage("ChangePassword")} style={cardStyle.link}>
              <Text style={cardStyle.linkTitle}>Change Password</Text>
              <Entypo name="chevron-right" size={24} color="#E60965" />
              </TouchableOpacity>

            {/* Help and Support */}
            <TouchableOpacity onPress={() => navigatePage("HelpAndSupport")} style={cardStyle.link}>
              <Text style={cardStyle.linkTitle}>Help & Support</Text>
              <Entypo name="chevron-right" size={24} color="#E60965" />
              </TouchableOpacity>

            {/* About us */}
            <TouchableOpacity onPress={() => navigatePage("AboutUs")} style={cardStyle.linkEnd}>
              <Text style={cardStyle.linkTitle}>About us</Text>
              <Entypo name="chevron-right" size={24} color="#E60965" />
              </TouchableOpacity>
          </View>
        </View>

        <View style={bodyStyle.section}>
          <Text style={fontStyle.title}>Feedback</Text>
          <View style={cardStyle.navContainer}>
          <TouchableOpacity onPress={() => navigatePage("ReportBug")} style={cardStyle.link}>
              {/* Report bug  */}
              <Text style={cardStyle.linkTitle}>Report Bug</Text>
              <Entypo name="chevron-right" size={24} color="#E60965" />
        </TouchableOpacity>

            {/* Seend feedback */}
            <TouchableOpacity onPress={() => navigatePage("SendFeedback")} style={cardStyle.linkEnd}>
              <Text style={cardStyle.linkTitle}>Send Feedback</Text>
              <Entypo name="chevron-right" size={24} color="#E60965" />
              </TouchableOpacity>
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
                Log out
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
    gap: 11,
  },

  section: { paddingHorizontal: 16 },
});

const cardStyle = StyleSheet.create({
  container: {
    backgroundColor: "#FFE5EC",
    minHeight: 100,
    padding: 12,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#E60965",
    elevation: 10,
  },

  navContainer: {
    backgroundColor: "#FFE5EC",
    minHeight: 100,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E60965",
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
    elevation: 5,
  },

  link: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#E60965",
  },

  linkEnd: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    borderColor: "#E60965",
  },

  linkTitle: { color: "#E60965", fontSize: 16, fontWeight: "600" },
});

const fontStyle = StyleSheet.create({
  title: {
    color: "#E60965",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  header: { color: "#E60965", fontSize: 18, fontWeight: "bold" },
  subHeader: { fontSize: 14, color: "#F94892" },
  navigation: {},
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

const assetStyle = StyleSheet.create({
  icon: { width: 32, height: 32 },
});