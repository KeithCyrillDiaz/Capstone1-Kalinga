import React, {useState, useEffect} from "react";
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
  Alert
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "./Header";
import axios from 'axios'
import { BASED_URL } from "../../../../MyConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditPersonalScreen({route}) {
  
 const userInformation = route.params.userInformation
 const userName = route.params.userName

 const [userData, setUserData] = useState(userInformation)

 const saveDetails = async () => {
      try{
        const result = await axios.post(`${BASED_URL}/kalinga/updateUserInformation`,{
          userData: userData
        })
        console.log(result.data.messages.message)
        if("result: ", result.data.messages.code === 0){
          setUserData(result.data.result)
          const updatedData = result.data.result
          await AsyncStorage.setItem('userInformation', JSON.stringify(updatedData))
        }

      } catch(error) {
        if(error)Alert.alert('Network error', `Please check your internet connection`)
            else
            Alert.alert('Something went wrong', "Please try again later")
      }

 }

 const fetchData = async () => {
  const userInformationToString = await AsyncStorage.getItem('userInformation')
  if(userInformationToString !== null ) {
    const userInformation = JSON.parse(userInformationToString);
    setUserData(userInformation)
  }
 }

 useEffect(()=>{

  fetchData();

 },[])

 const confirmation = () => {
    Alert.alert('Confirmation','Are you sure you want to save these Details?',
    [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => saveDetails(),
      },
    ]
  )
    
 }

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
            <Text style={fontStyle.header}>{userName}</Text>
            <Text style={fontStyle.subHeader}>Requestor</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", paddingHorizontal: 16, gap: 16 }}>
          <View
            style={{
              width: Dimensions.get("screen").width / 2.3,
            }}>
            <View style={inputStyle.container}>
              <Text style={inputStyle.label}>Age: </Text>
              <TextInput style={inputStyle.primary} 
                value={userData.age}
                onChangeText={(text) =>
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    age: text,
                  }))
                }
              />
            </View>
          </View>

          <View
            style={{
              width: Dimensions.get("screen").width / 2.3,
            }}>
            <View style={inputStyle.container}>
              <Text style={inputStyle.label}>Gender: </Text>
              <TextInput style={inputStyle.primary}
                value={"Female"} 
                onChangeText={(text) =>
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    Gender: text,
                  }))
                }
                editable={false}
              />
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          <View style={inputStyle.container}>
            <Text style={inputStyle.label}>Birthday: </Text>
            <TextInput style={inputStyle.primary} 
             value = {userData.birthDate}
             onChangeText={(text) =>
              setUserData((prevUserData) => ({
                ...prevUserData,
                birthDate: text,
              }))
            }
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={inputStyle.container}>
            <Text style={inputStyle.label}>Phone Number: </Text>
            <TextInput style={inputStyle.primary} 
             value = {userData.mobileNumber}
             onChangeText={(text) =>
              setUserData((prevUserData) => ({
                ...prevUserData,
                mobileNumber: text,
              }))
            }
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={inputStyle.container}>
            <Text style={inputStyle.label}>Email: </Text>
            <TextInput style={inputStyle.primary} 
             value = {userData.email}
             onChangeText={(text) =>
              setUserData((prevUserData) => ({
                ...prevUserData,
                email: text,
              }))
            }
            editable={false}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={inputStyle.container}>
            <Text style={inputStyle.label}>Address: </Text>
            <TextInput style={inputStyle.primary} 
             value = {userData.homeAddress}
             onChangeText={(text) =>
              setUserData((prevUserData) => ({
                ...prevUserData,
                homeAddress: text,
              }))
            }
            />
          </View>
        </View>

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <TouchableOpacity onPress={() => confirmation()}>
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
    gap: 7,
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
