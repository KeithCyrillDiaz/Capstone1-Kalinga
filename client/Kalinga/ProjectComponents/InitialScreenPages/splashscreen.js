// SplashScreen.js

import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import KalingaSplashScreen from './../../assets/KalingaSplashScreen.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { BASED_URL } from '../../MyConstants'
import {CommonActions } from'@react-navigation/native';
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
            // Alert.alert("Running Server", `Your app is running at ${BASED_URL}`)
          const pending = await AsyncStorage.getItem('Pending')
          const userType = await AsyncStorage.getItem('userType')
            console.log("userType: ", userType)
            console.log("Pending: ", pending)
          if(pending === "True"){
              const DonorApplicant_ID = await AsyncStorage.getItem('DonorApplicant_ID')
              console.log("DonorApplicant_ID: ", DonorApplicant_ID)
              const RequestorApplicant_ID = await AsyncStorage.getItem('RequestorApplicant_ID')
              console.log("RequestorApplicant_ID: ", RequestorApplicant_ID)
              // if(DonorApplicant_ID && RequestorApplicant_ID){
              //   try{
              //     const donorApplication = await axios.get(`${BASED_URL}/kalinga/isApproved/${DonorApplicant_ID}`)
              //     if()
              //   }catch(error){
              //     console.log("Error Checking Application")
              //   }
              // }
              let Applicant_ID = "";
              if(DonorApplicant_ID !== null && DonorApplicant_ID !== undefined) Applicant_ID = DonorApplicant_ID
              else Applicant_ID = RequestorApplicant_ID
              console.log("Applicant_ID: " ,Applicant_ID)
              if(Applicant_ID === "") return
              try{
                const result = await axios.get(`${BASED_URL}/kalinga/isApproved/${Applicant_ID}`)
                console.log("Message: ",result.data.messages.message)
                if((result.data.messages.message === "Non existing Applicant" || result.data.messages.message === "Applicant is Deleted") && DonorApplicant_ID === Applicant_ID) await AsyncStorage.removeItem('DonorApplicant_ID')
                else if((result.data.messages.message === "Non existing Applicant" || result.data.messages.message === "Applicant is Deleted") && RequestorApplicant_ID === Applicant_ID) await AsyncStorage.removeItem('RequestorApplicant_ID')
                if(result.data.messages.code === 0){
                    console.log(result.data.messages.message)
                    console.log("result.data.userType: ", result.data.userType)
                    Alert.alert(`Congratulations!`, `You have been approved as ${result.data.userType}!`,
                    [{text: 'Ok', onPress: () => navigation.replace('SetPassword', {email: null, Applicant_ID: null, userType: result.data.userType})}])
                    return
                  }else{
                    console.log(result.data.messages.message)
                    checkToken()
                  }
                const checkDonorID = await AsyncStorage.getItem('DonorApplicant_ID')
                const checkRequestorID = await AsyncStorage.getItem('RequestorApplicant_ID')
                if(checkRequestorID){
                  try{
                    const result = await axios.get(`${BASED_URL}/kalinga/isApproved/${checkRequestorID}`)
                    console.log("Message: ",result.data.messages.message)
                    if((result.data.messages.message === "Non existing Applicant" || result.data.messages.message === "Applicant is Deleted") && DonorApplicant_ID === Applicant_ID) await AsyncStorage.removeItem('RequestorApplicant_ID')
                      if(result.data.messages.code === 0){
                        console.log(result.data.messages.message)
                        console.log("result.data.userType: ", result.data.userType)
                        Alert.alert(`Congratulations!`, `You have been approved as ${result.data.userType}!`,
                        [{text: 'Ok', onPress: () => navigation.replace('SetPassword', {email: null, Applicant_ID: null, userType: result.data.userType})}])
                        return
                      } else{
                        console.log(result.data.messages.message)
                        checkToken()
                      }
                  } catch(error){
                    console.log("Error checking Requestor Application")
                  }
                }
                if(!checkDonorID && !checkRequestorID) await AsyncStorage.removeItem('Pending')
              }catch (error) {
                checkToken()
              }
          } else {
            checkToken()
          }
        }
    };

    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token")
      if(!token) {
        await AsyncStorage.multiRemove(['token', 'userInformation', 'DPLink', 'Image_ID']);
        navigation.dispatch(
          CommonActions.reset({
              index: 0,
              routes: [{ name: 'LogIn'}],
          })
        );
        return
      }
      else {
        console.log("token: ", token)
          const userInformationString = await AsyncStorage.getItem('userInformation');
          if(userInformationString === null){
            await AsyncStorage.multiRemove(['token', 'DPLink', 'Image_ID']);
            navigation.dispatch(
              CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'LogIn'}],
              })
            );
            return
          } 
          const userInformation = JSON.parse(userInformationString)
          console.log("test", userInformation)
          navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'MainTabs', params: { userInformation: userInformation, token: token } }],
            })
          );
        return
      }
      
    }
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
