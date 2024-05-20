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
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, CommonActions } from '@react-navigation/native';
import { globalStyles } from "../../../../styles_kit/globalStyles";

export default function LocationScreen() {


  const [locationEnabled, setLocationEnabled] = useState(false);
  const navigation = useNavigation()

  const getPermission = async () => {
    const result = await AsyncStorage.getItem("LocationPermission")
    console.log("result: ", result)
    if(result === "true") setLocationEnabled(true)
    else setLocationEnabled(false)
  
    return
  }

  const handlePermission = async (value) => {
    try{
      console.log("value", value)
      if(value === true){
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status)
        if (status !== 'granted') {
          Alert.alert(
            "Location Access Denied",
            "To use this feature, please grant permission to access your location in your device settings."
          );
          await AsyncStorage.setItem("LocationPermission", "false")
          setLocationEnabled(false)
          return
        } else {
          Alert.alert(
            "Permission Granted: Please Restart the App",
            "Thank you for granting permission. Please restart the app to apply the changes."
          );
          await AsyncStorage.setItem("LocationPermission", "true")
        }
      }
      await AsyncStorage.setItem("LocationPermission", value.toString())
      setLocationEnabled(value)
      return
    } catch (error) {
      Alert.alert(
        "Location Permission Error",
        "There was an issue while requesting location permission. Please try again."
      );
    }
      
    } 


useEffect(() => {
  getPermission()
},[])


  return (
    <SafeAreaView style={globalStyles.defaultBackgroundColor}>
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
            backgroundColor: "white",
            opacity: 1,
            marginHorizontal: 24,
            elevation: 7,
            padding: 24,
            borderRadius: 17,
          }}>
          <View style={{ alignItems: "center", flexDirection: "row", gap: 24 }}>
            <Switch
              thumbColor={"#E60965"}
              value={locationEnabled}
              onValueChange={(newValue) =>  handlePermission(newValue)}
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
