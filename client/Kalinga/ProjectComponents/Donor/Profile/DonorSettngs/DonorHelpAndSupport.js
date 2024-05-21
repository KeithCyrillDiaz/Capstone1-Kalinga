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
  Alert
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import Header from "./Header";
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from "../../../../styles_kit/globalStyles";


export default function HelpAndSupport({route}) {

  const { userInformation, token, userName } = route.params

  const navigation = useNavigation();
  const handleSendMessage = () => {
    navigation.navigate("DonorHelpAndSupportMessage", {userInformation: userInformation, UserName: userName, token: token})
    return
  }

  return (
    <SafeAreaView style={globalStyles.defaultBackgroundColor}>
      <ScrollView stickyHeaderIndices={[1]}>
        <StatusBar />
        <Header title="Help & Support" />

        <View style={{ gap: 16, paddingHorizontal: 16 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "#E60965" }}>
            We’re here to help you with anything and everything on Kalinga
          </Text>
          <Text style={{ color: "#E60965" }}>
            Share your concern or check our frequently asked questions listed below.
          </Text>
        </View>

        <Text
          style={{
            color: "#E60965",
            paddingHorizontal: 16,
            fontSize: 18,
            fontWeight: "bold",
            marginVertical: 16,
          }}>
          FAQ
        </Text>

        <View
          style={{
            backgroundColor: '#f5f5f5',
            opacity: 1,
            marginHorizontal: 16,
            elevation: 7,
            padding: 16,
            borderRadius: 10,
            marginBottom: 16,
            gap: 16,
          }}>
          <DropdownItem
            title={"What is Kalinga App?"}
            description={
              "The Kalinga App is a dedicated platform connecting breast milk donors with recipients. It facilitates the safe and voluntary sharing of breast milk to support infants in need."
            }
          />

          <DropdownItem
            title={"How can I become a breast milk donor on Kalinga? "}
            description={
              "Start the donation process by completing the Donor Application Form and waiting for administrator verification. After approval, you can now schedule your doantion appointment. Make sure to wait for appointment confirmation before donating at the hospital."
            }
          />
          <DropdownItem
            title={"How can I become a breast milk requestor on Kalinga? "}
            description={
              "Begin by filling out the Requestor Application Form and awaiting administrator verification. Once approved, proceed to make your request by completing the request form. Then, await confirmation from the administrator."
            }
          />
          <DropdownItem
            title={"Is there any cost associated with using the Kalinga App?"}
            description={
              "Payment is only necessary when requesting for milk."
            }
          />
          <DropdownItem
            title={"How can I provide feedback or report issues with the app?"}
            description={
              "Go to Settings and navigate the 'Report Bug' or 'Send Feedback' option to write about any issues you encounter."
            }
          />
          <DropdownItem
            title={
              "Why should I choose Kalinga for breast milk donation or seeking breast milk?"
            }
            description={
              "The Kalinga App is a dedicated platform connecting breast milk donors with recipients. It facilitates the safe and voluntary sharing of breast milk to support infants in need."
            }
          />
        </View>

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 24,
          }}>
          {/* <Text style={{ color: "#E60965" }}>
            Still need assistance? Help is a mail away
          </Text> */}
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const DropdownItem = ({ title, description }) => {
  const [active, setActive] = useState(false);
  return (
    <TouchableOpacity onPress={() => setActive(!active)} style={{ gap: 16 }}>
      {/* Report bug  */}
      <View style={cardStyle.link}>
        <Text style={cardStyle.linkTitle}>{title}</Text>
        <Entypo name="chevron-down" size={24} color="#E60965" />
      </View>

      {active && (
        <View>
          <Text style={{ color: "#E60965" }}>{description}</Text>
        </View>
      )}
    </TouchableOpacity>
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
