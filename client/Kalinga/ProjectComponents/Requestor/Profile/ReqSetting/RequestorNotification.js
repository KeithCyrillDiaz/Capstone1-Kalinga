import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Switch,
  Alert
} from "react-native";
import Header from "./Header";
import { useNavigation } from '@react-navigation/native';

export default function NotificationScreen() {
  const [newArticles, setNewArticles] = useState(false);
  const [pushNotification, setPushNotification] = useState(false);
  const [messageNotification, setMessageNotification] = useState(false);
  const [messageReminders, setMessageReminders] = useState(false);
  const [showInLockscreen, setShowInLockscreen] = useState(false);

  const navigate = useNavigation()
    
  useEffect(() => {
    Alert.alert(
      "Sorry, this feature is not yet available right now.",
      "Rest assured, our team is hard at work developing new features to better serve our community. Your continued support means the world to us. Thank you for your patience!",
      [
        {
          text: "Okay",
          onPress: () => navigate.goBack()
        }
      ]
    );
  }, [])

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
          <ToggleSwitch
            value={newArticles}
            onToggle={() => setNewArticles(!newArticles)}
            label="New Articles"
          />
          <ToggleSwitch
            value={pushNotification}
            onToggle={() => setPushNotification(!pushNotification)}
            label="Push Notification"
          />
          <ToggleSwitch
            value={messageNotification}
            onToggle={() => setMessageNotification(!messageNotification)}
            label="Message Notification"
          />
          <ToggleSwitch
            value={messageReminders}
            onToggle={() => setMessageReminders(!messageReminders)}
            label="Message Reminders"
          />
          <ToggleSwitch
            value={showInLockscreen}
            onToggle={() => setShowInLockscreen(!showInLockscreen)}
            label="Show in Lockscreen"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const ToggleSwitch = ({ value, onToggle, label }) => {
  return (
    <View style={{ alignItems: "center", flexDirection: "row", gap: 24 }}>
      <Switch thumbColor={"#E60965"} value={value} onValueChange={onToggle} />
      <Text style={{ fontSize: 18, fontWeight: "600", color: "#E60965" }}>
        {label}
      </Text>
    </View>
  );
};

const bodyStyle = StyleSheet.create({
  main: {
    backgroundColor: "#FFF1EB",
    flex: 1,
  },

  container: {
    borderWidth: 1,
    borderColor: "black",
    height: "100%",
    gap: 16,
  },
});
