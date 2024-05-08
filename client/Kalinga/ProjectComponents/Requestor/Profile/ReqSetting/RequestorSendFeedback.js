import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert
} from "react-native";
import { Fontisto, FontAwesome6 } from "@expo/vector-icons";
import Header from "./Header";
import { useNavigation } from '@react-navigation/native';

export default function SendFeedback({ rating }) {
  const [currentStar, setCurrentStar] = useState(rating);

  const handleStarPress = (selectedStar) => {
    setCurrentStar(selectedStar);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
          {i <= currentStar ? (
            <Fontisto name="star" size={32} color="#E60965" />
          ) : (
            <FontAwesome6 name="star" size={32} color="#E60965" />
          )}
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const navigate = useNavigation()
    
  useEffect(() => {
    Alert.alert(
      "Sorry, this feature is not yet available right now.",
      "Rest assured, our team is hard at work developing new features to better serve our community. Your continued support means the world to us. Thank you for your patience!",
      [
        {
          text: "Okay",
          onPress: () => navigate.goBack("RequestorSettingScreen")
        }
      ]
    );
    return
  }, [])

  return (
    <SafeAreaView style={bodyStyle.main}>
      <ScrollView stickyHeaderIndices={[1]}>
        <StatusBar />
        <Header title="Send Feedback" />

        <Text
          style={{
            color: "#E60965",
            paddingHorizontal: 16,
            fontSize: 24,
            fontWeight: "bold",
            marginVertical: 16,
            fontWeight: "bold",
          }}>
          We would like your feedback to improve our app.
        </Text>

        <View
          style={{
            gap: 16,
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 16,
          }}>
          {renderStars()}
        </View>

        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text
            style={{
              color: "#E60965",
              fontWeight: "600",
              marginBottom: 8,
              fontSize: 16,
              textAlign: "center",
            }}>
            Please leave your feedback below:
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
                textAlignVertical: "top",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
              placeholder="Enter your feedback"
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 24,
        }}>
        <TouchableOpacity onPress={() => {}}>
          <View style={buttonStyle.primary}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Submit
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
