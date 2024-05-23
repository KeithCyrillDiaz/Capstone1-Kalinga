//Guest Home
import React, { useState, useEffect }from 'react';
import { ScrollView,Text, View, StatusBar, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { useNavigation, useFocusEffect, CommonActions } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { globalHeader } from '../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../styles_kit/globalStyles.js';
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BASED_URL } from '../../../MyConstants.js';
import axios from 'axios';

export default function RequestorHome({route}) {


    const token = route.params.token
    
    const [userInformation, setUserInformation] = useState(route.params.userInformation)
    const storeInAsync = async () => {
      await AsyncStorage.setItem('userInformation', JSON.stringify(userInformation))
      await AsyncStorage.setItem('token', token)
    }

     const nameArray =  userInformation.fullName.split(' ')
    let UserName;

    if (nameArray[0].endsWith(',')) {
      UserName = nameArray[1];
    } else {
      UserName = nameArray[0];
    }
    
    const navigation = useNavigation();

    const [requestStatus, setRequestStatus] = useState('empty'); // State to hold request status

    
    const navigatePage = async (Page) => {
        if(Page === "RequestorEducLibrary"){
          Alert.alert(
            "Sorry, this feature is not yet available right now.",
            "Rest assured, our team is hard at work developing new features to better serve our community. Your continued support means the world to us. Thank you for your patience!",
            [
              {
                text: "Okay",
              }
            ]
          );
          return
      }
      if(Page === "RequestorForum"){
        Alert.alert(
          "Sorry, this feature is not yet available right now.",
          "Rest assured, our team is hard at work developing new features to better serve our community. Your continued support means the world to us. Thank you for your patience!",
          [
            {
              text: "Okay",
            }
          ]
        );
        return
    }
        if(Page === "ValidUserExplore"){
          const result = await checkLocationPermission()
          console.log("result: ", result)
          if(!result)return
          navigation.navigate(Page, {data: userInformation, token: token, requestStatus: requestStatus});
          return
        }
        navigation.navigate(Page, {data: userInformation, token: token}); // Navigate to the Login screen
    };   
    
    const checkLocationPermission = async () => {

      const permission = await AsyncStorage.getItem("LocationPermission")
      console.log("permission: ",permission)
      if(!permission || permission === "false"){
        Alert.alert(
          "Location Access Denied",
          "To use this feature, please grant permission to access your location."
        );
        if(userInformation.userType === "Donor"){
          navigation.replace("DonorLocationScreen")
          return
        } else {
          navigation.navigate("RequestorLocationScreen")
          return
        }
        return false
      } else return true
    }

    const fetchUpdateduserInfo = async () => {
      console.log("Fetching Updated userInformation")
      console.log(userInformation.Requestor_ID)
      console.log(userInformation.userType)
      try{

        const response = await axios.post(`${BASED_URL}/kalinga/tokenLogin/${userInformation.Requestor_ID}`,
          {userType: userInformation.userType },
          { 
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
        console.log(response.data.messages.message)
        if(response.data.messages.message === "Unauthorized User"){
          await AsyncStorage.multiRemove(['token', 'userInformation', 'DPLink', 'Image_ID']);
          Alert.alert("Session Expired", "Your session has expired. Please log in again.", [
            {
              text: "OK",
              onPress: () => navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'LogIn' }],
                })
              ),
            },
          ]);
          return
        }

        setUserInformation(response.data.userInformation)
        return
      } catch(error){
        console.log("Error fetching Data: ", error) 
        return
      }
    }
    const simulateFetchRequestStatus = async () => {
      try {
          const response = await axios.get(`${BASED_URL}/kalinga/getRequestStatusOfMotherMobile/${userInformation.Requestor_ID}`);
          console.log(response.data.messages.message)
          if(response.data.messages.code === 1) return
          if(response.data.messages.message !== "No pending or ongoing Request Appointment"){
            console.log("Request Status:", response.data.appointments.RequestStatus)
            setRequestStatus(response.data.appointments.RequestStatus);
          }
          else setRequestStatus(null)

      } catch (error) {
          console.error('Error fetching request status:', error);
      }
  };


 
  const handleMakeRequest = () => {
      console.log('Current Request Status:', requestStatus);
  
      const canMakeRequest = requestStatus !== 'Pending' && requestStatus !== 'Ongoing';
      console.log('Can Make Request:', canMakeRequest); // Log the evaluation result
      navigatePage('MakeRequest'); // delete after testing
      if (canMakeRequest) {
          console.log('Navigating to MakeRequest');
          navigatePage('MakeRequest');
      } else {
          console.log('Cannot Make Request');
          Alert.alert(
              'Cannot Make Request',
              'You already have a pending or ongoing request. Please wait until it is resolved.',
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
          );
      }
  };
  useFocusEffect(
    React.useCallback(() => {
      simulateFetchRequestStatus();
      fetchUpdateduserInfo()
      storeInAsync()
    }, [])
);

    return (
      <View style={[globalStyles.container, {marginTop: "-5%"}]}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
              <View style = {globalHeader.BigHeader}>
              <Text style = {globalHeader.BigHeaderTitle}>Good Day, {UserName}!</Text>
                  <Text style = {globalHeader.SubTitle}>Discover the power of breastmilk for your baby's health and well-being.</Text>
              </View>

        <ScrollView
        overScrollMode='never' // Disable the over-scroll effect or the Jelly effect when reaching the end of the scroll
        nestedScrollEnabled={true} // Enable nested scrolling
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
        >
              <View style = {styles.flex_start}>
                <Text style = {styles.title}>Requestor's Dashboard</Text>
              </View>
              <View style = {styles.boxRowContainer}>
              
                <TouchableOpacity style = {styles.box} onPress={() => navigatePage("ValidUserExplore")}>
                    <MaterialIcons name="location-pin" size={70} color="#E60965" />
                    <Text style = {styles.boxTitle}>Milk Bank Locator</Text>
                    <Text style = {styles.subLabel}>Easily find human milk banks near you</Text>
                </TouchableOpacity>
                
                  <TouchableOpacity style = {styles.box} onPress={() => navigatePage("RequestorEducLibrary")}>
                      <Ionicons name="book" size={70} color="#E60965" />
                      <Text style = {styles.boxTitle}>Educational Library</Text>
                      <Text style = {styles.subLabel}>Explore our educational articles on breastfeeding and maternal health</Text>
                  </TouchableOpacity>
                

              </View>

              <View style = {styles.boxRowContainer}>
                <TouchableOpacity style = {styles.box} onPress={() => navigatePage("RequestorChatAssistance")}>
                    <FontAwesome5 name="robot" size={70} color="#E60965"/>
                    <Text style = {styles.boxTitle}>Instant Messaging</Text>
                    <Text style = {styles.subLabel}>Chat with our chatbot for quick respond to FAQs </Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.box} onPress={() => navigatePage("RequestorForum")}>
                    <MaterialIcons name="forum" size={70} color="#E60965" />
                    <Text style = {styles.boxTitle}>Forum</Text>
                    <Text style = {styles.ShortLabel}>Engage with user discussions</Text>
                </TouchableOpacity>
              </View>

              <View style = {styles.boxRowContainer}>
              <TouchableOpacity style={styles.box} onPress={handleMakeRequest}>
                    <Ionicons name="calendar" size={70} color="#E60965" />
                    <Text style = {styles.boxTitle}>Make Request</Text>
                    <Text style = {styles.subLabel}>Ready to Request Milk? Set an appointment</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.box} onPress={() => navigatePage("RequestTab")}>
                    <SimpleLineIcons name="graph" size={70} color="#E60965"s />
                    <Text style = {styles.boxTitle}>My Request</Text>
                    <Text style = {styles.subLabel}>View Milk Request History</Text>
                </TouchableOpacity>
              </View>
             
              
        </ScrollView>
      </View>
        
      )
  }


  const styles = StyleSheet.create({
    boxRowContainer: {
      flexDirection: "row",
      alignItems:"center",
      justifyContent:"space-evenly",
      paddingVertical:10,
      gap: 17
    },
  
    box: {
      backgroundColor: "white",
      height:170,
      maxHeight:180,
      width: 160,
      maxWidth:200,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 17,
      elevation:7
    },
    boxTitle: {
      textAlign: "center",
      fontFamily: "Open-Sans-Bold",
      fontSize: 16,
      color:"#E60965",
    },
    boxMinitext: {
      width:100,
      textAlign: "center",
      fontSize: 14,
      color:"#E60965",
      fontFamily: "Open-Sans-Regular"
    },

    flex_start:{ 
      //backgroundColor: "gray",
      flex: 1,
      marginTop: "5%",
      marginBottom: "1%",
      alignItems: "flex-start",
      justifyContent: "center",
      marginLeft: "3.5%",

    },

    flex_Row: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: "5%",
      marginRight: "5%",
      maxWidth: "90%",
    },

    title: {
      fontFamily: "Open-Sans-Bold",
      fontSize: 20,
      color: "#E60965"
    },

    Label: {
      textAlign: 'center',
      fontSize: 17,
      fontFamily: 'Open-Sans-Bold',
      color: '#E60965',
      //backgroundColor: "gray",
    },

    subLabel: {
      textAlign: 'center',
      fontSize: 13,
      fontFamily: 'Open-Sans-Regular',
      color: '#E60965',
      marginHorizontal: 10, 

      //backgroundColor: "pink",
    },

    LabelCenter: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    ShortLabel:{
      textAlign: 'center',
      fontSize: 13,
      fontFamily: 'Open-Sans-Regular',
      color: '#E60965',
      maxWidth: "100%",
    },

    navBarBorder: {
      backgroundColor: '#E60965',
      height: 90,
      width: '100%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderBottomWidth: 0,
      position: 'absolute',
      bottom: 0,
    },
  
    navBar: {
      flexDirection: 'row',
      justifyContent: 'center', // Center the content horizontally
      alignItems: 'center', // Center the content vertically
      padding: 10,
      marginTop: 5,
    },
    
    navBarButton: {
      justifyContent: 'center',
      marginLeft: 15, // Add space between buttons
      marginRight: 15, // Add space between buttons
    },
  
    iconText: {
      fontSize: 12,
      color: 'white',
      marginTop: 0, 
      marginLeft: 10,
    },


  })
  


