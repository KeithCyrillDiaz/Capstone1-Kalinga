//Guest EducLibrary
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert, // Add Alert for displaying messages
} from "react-native";
import { globalStyles } from "../../../../styles_kit/globalStyles.js";
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { useNavigation, useRoute } from '@react-navigation/native';
import SetDateTimeLocation from "./SetDateTimeLocation.js";
import randomatic from 'randomatic';


const SetAppointment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { AppointmentDonorID } = route.params || {};

  const Appointment_DonorID = randomatic('Aa0', 20);
  const Donor_ID = randomatic('Aa0', 20);


  const [formData, setFormData] = useState({
    AppointmentDonorID: Appointment_DonorID,
    Donor_ID: Donor_ID,
    userType: "Donor",
    DonationStatus: "Ongoing",
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    homeAddress: '',
    medicalCondition: '',
    milkAmount: '',

  });

  
  const validatePhoneNumber = (text) => {
    if (/^\d+$/.test(text)) {
      handleChange("phoneNumber", text);
    } else {
      Alert.alert("Error", "Please enter a valid phone number.");
    }
  };

  const validateMilkAmount = (text) => {
    if (/^\d+$/.test(text)) {
      handleChange("milkAmount", text);
    } else {
      Alert.alert("Error", "Please enter a numeric value for milk amount.");
    }
  };


  const handleChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigatePage = () => {
    setFormData(prevData => ({
      ...prevData,
      DonationStatus: 'Ongoing',
    }));
    navigation.navigate('SetDateTimeLocation', { formData: formData });
  };

  return (
    <SafeAreaView style={globalStyles.SafeArea}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
      <View style={globalHeader.SmallHeader}>
        <Text style={globalHeader.SmallHeaderTitle}>Set Appointment</Text>
      </View>
      <ScrollView
        style={globalStyles.ScrollView}
        overScrollMode="never" // Disable the over-scroll effect or the Jelly effect when reaching the end of the scroll
        nestedScrollEnabled={true} // Enable nested scrolling
        showsVerticalScrollIndicator={false}
      >
        <View style={globalStyles.container}>
          <View style={styles.center}>
            <Text style={styles.text}>
              Make a difference today! Set your donation appointment now and contribute to a meaningful cause. Your generosity can brighten lives and nurture hope.
            </Text>
          </View>

          <View>
            <Image source={require("../../../../assets/makereq.png")} style={styles.img} />
          </View>
          <View style={styles.left}>
            <Text style={styles.note}>Note: All fields marked with (*) are required</Text>
          </View>

          <View style={styles.inputField}>
            <View style={styles.spaceBetween}>
              <TextInput
                style={styles.placeholderDesign}
                placeholder="Full Name"
                placeholderTextColor="#E60965"
                onChangeText={(text) => handleChange("fullName", text)}
              />
            </View>
                    <Text style = {styles.asterix}>
                      *
                    </Text>
                </View>
                <View style={styles.inputField}>
                  <View style={styles.spaceBetween}>
                    <TextInput
                      style={styles.placeholderDesign}
                      placeholder="Phone Number"
                      placeholderTextColor="#E60965"
                      onChangeText={(text) => validatePhoneNumber(text)}
                      />
                  </View>
                      
                    <Text style = {styles.asterix}>
                      *
                    </Text>
                </View>
                <View style={styles.inputField}>
                  <View style={styles.spaceBetween}>
                    <TextInput
                      style={styles.placeholderDesign}
                      placeholder="Email Address"
                      placeholderTextColor="#E60965"
                      onChangeText={(text) => handleChange("emailAddress", text)}
                    />
                  </View>
                 
                    <Text style = {styles.asterix}>
                      *
                    </Text>
                </View>
                <View style={styles.inputField}>
                  <View style={styles.spaceBetween}>
                    <TextInput
                      style={styles.placeholderDesign}
                      placeholder="Home Address"
                      placeholderTextColor="#E60965"
                      onChangeText={(text) => handleChange("homeAddress", text)}
                    />
                  </View>
                 
                    <Text style = {styles.asterix}>
                      *
                    </Text>
                </View>
                <View style={styles.inputField}>
                  <View style={styles.spaceBetween}>
                    <TextInput
                      style={styles.placeholderDesign}
                      placeholder="Medical Condition (If Applicable)"
                      placeholderTextColor="#E60965"
                      onChangeText={(text) => handleChange("medicalCondition", text)}
                    />
                  </View>
                 
                    <Text style = {styles.asterix}>
                      *
                    </Text>
                </View>
                <View style={styles.inputField}>
                  <View style={styles.spaceBetween}>
                    <TextInput
                      style={styles.placeholderDesign}
                      placeholder="Amount of milk to be donated (ml)"
                      placeholderTextColor="#E60965"
                      onChangeText={(text) => validateMilkAmount(text)}
                      />
                  </View>
                 
                    <Text style = {styles.asterix}>
                      *
                    </Text>
                </View>
                <TouchableOpacity onPress={() => navigatePage("SetDateTimeLocation")}>
                  <Text style = {styles.button}> Set Appointment </Text>
                </TouchableOpacity>
                
            </View>
            
            
         </ScrollView>
      </SafeAreaView>

    )
    
  }

  const styles = StyleSheet.create ({


    img: {
    
        width: 200,
        height: 200,
        margin: 20,
        marginBottom: 3,
      
    },

    center: {
      //backgroundColor: "gray",
      marginHorizontal: "10%",
      marginTop: 20,
      
    },

    text: {
      textAlign: "center",
      fontFamily: "Open-Sans-Regular",
      fontSize: 15,
      color: "#E60965",
    },

    left: {
      //backgroundColor: "gray",
      marginTop: 50,
      width: "90%",
      color: "#E60965",

    },

    spaceBetween:{
      //backgroundColor: "gray",
      width: "95%"
    },

    note: {
      //textAlign: "left",
      fontFamily: "Open-Sans-Light",
      fontSize: 12,
      marginBottom: -20,
      color: "#E60965",
    },
    
    inputField: {
      //backgroundColor: "gray",
      padding: 10,
      paddingLeft: 15,
      width: "90%",
      borderWidth: 1,
      borderColor: "#E60965",
      borderRadius: 20,
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
      
    },

    placeholderDesign: {
      fontFamily: "Open-Sans-Light"
    },

    asterix: {

      marginTop: 7,
      justifyContent: "flex-end",
      fontSize: 20,
      color: "#E60965",
    },

    bigInputField: {
      height: 100,
      paddingTop: 10,
      paddingLeft: 15,
      width: "90%",
      borderWidth: 1,
      borderColor: "#E60965",
      borderRadius: 20,
      marginTop: 20,
      flexDirection: "row",

    },
    
    button: {
      backgroundColor: "#E60965",
      marginTop: 20,
      color: "white",
      paddingVertical: 7,
      paddingHorizontal: 30,
      textAlign: "center",
      borderRadius: 30,
      fontFamily: "Open-Sans-SemiBold",
      fontSize: 17,
      marginBottom: 30,
    }


  })

  export default SetAppointment;

  