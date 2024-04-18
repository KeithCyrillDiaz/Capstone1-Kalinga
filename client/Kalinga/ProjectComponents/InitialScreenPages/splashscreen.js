// SplashScreen.js

import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import KalingaSplashScreen from './../../assets/KalingaSplashScreen.png'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get isFirstTime value from AsyncStorage
        const isFirstTime = await AsyncStorage.getItem('isFirstTime');
        // Check if isFirstTime is null or undefined (first time)
        if (isFirstTime === null || isFirstTime === undefined || isFirstTime === "true") {
          // Set isFirstTime to false
          await AsyncStorage.setItem('isFirstTime', 'false');
          // Navigate to onboard screen
          navigation.replace('Onboard');
        } else {
          const isRegistered = await AsyncStorage.getItem('isRegistered')
          const userType = await AsyncStorage.getItem('userType')
          console.log("isRegistered: ", isRegistered)
          console.log("userType: ", userType)
          const Applicant_ID = await AsyncStorage.getItem('Applicant_ID')
          console.log("Applicant_ID :", Applicant_ID)
          if(Applicant_ID !== null || Applicant_ID !== undefined){
            const isRegistered = await AsyncStorage.getItem('isRegistered')
            if(isRegistered === null || isRegistered === undefined )
            navigation.replace('setPassword');
          }
          navigation.replace('LogIn');
          // navigation.replace('Onboard');
        }
      } catch (error) {
        console.error('Error occurred while fetching data:', error);
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
