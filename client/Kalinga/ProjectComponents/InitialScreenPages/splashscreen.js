// SplashScreen.js

import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import KalingaSplashScreen from './../../assets/KalingaSplashScreen.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { BASED_URL } from '../../MyConstants'
const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const fetchData = async () => {
        // Get isFirstTime value from AsyncStorage
        const isFirstTime = await AsyncStorage.getItem('isFirstTime');
        // Check if isFirstTime is null or undefined (first time)
        if (isFirstTime === null || isFirstTime === undefined || isFirstTime === "true") {
          // Set isFirstTime to false
          await AsyncStorage.setItem('isFirstTime', 'false');
          // Navigate to onboard screen
          navigation.replace('Onboard');
        } else {
          await AsyncStorage.setItem('DonorApplicant_ID', 'VEKQ9JNpRkKTf2jnQfhk')
          const pending = await AsyncStorage.getItem('Pending')
          const userType = await AsyncStorage.getItem('userType')
            console.log("userType: ", userType)
            console.log("Pending: ", pending)
          if(pending === "True"){
              const DonorApplicant_ID = await AsyncStorage.getItem('DonorApplicant_ID')
              console.log("DonorApplicant_ID: ", DonorApplicant_ID)
              const RequestorApplicant_ID = await AsyncStorage.getItem('RequestorApplicant_ID')
              console.log("RequestorApplicant_ID: ", RequestorApplicant_ID)
              let Applicant_ID = "";
              if(DonorApplicant_ID !== null || DonorApplicant_ID !== undefined) Applicant_ID = DonorApplicant_ID
              else if (RequestorApplicant_ID !== null || RequestorApplicant_ID !== undefined)Applicant_ID = RequestorApplicant_ID
              try{
                const result = await axios.get(`${BASED_URL}/kalinga/isApproved/${Applicant_ID}`)
                if(result.data.messages.code === 0){
                  console.log("result.data.userType: ", result.data.userType)
                  Alert.alert(`Congratualtions!`, `You have been approved as ${result.data.userType}!`,
                  [{text: 'Ok', onPress: () => navigation.replace('SetPassword', {email: null, Applicant_ID: null, userType: result.data.userType})}])
                } else{
                  console.log("Application is still Pending")
                  navigation.replace('LogIn');
                }
              }catch (error) {
                console.log("error")
              }
          } else{
            navigation.replace('LogIn');
          }
        }
    };

    // Call fetchData function after 2000ms (2 seconds)
    const timer = setTimeout(fetchData, 2000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);
  
  return (
    <View style={styles.container}>
      <Image source={KalingaSplashScreen} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
