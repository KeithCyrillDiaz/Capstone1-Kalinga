//Guest Home
import React, {useState } from 'react';
import { ScrollView,Text, View, StatusBar, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { useNavigation, useFocusEffect, CommonActions } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { globalHeader } from '../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../styles_kit/globalStyles.js';
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import { BASED_URL } from '../../../MyConstants.js';


const DonorHome = ({route}) => {

    const token = route.params.token
    // console.log("route.params.userInformation: ", route.params.userInformation.fullName)
    const [userInformation, setUserInformation] = useState(route.params.userInformation)
    const storeInAsync = async () => {
      await AsyncStorage.setItem('userInformation', JSON.stringify(userInformation))
      await AsyncStorage.setItem('token', token)
    }
    

    const nameArray = userInformation.fullName.split(' ')
    
    if (nameArray[0].endsWith(',')) {
      UserName = nameArray[1];
    } else {
      UserName = nameArray[0];
    }

    const navigation = useNavigation();
    
    const navigatePage = async (Page) => {

      if(Page === "ValidUserExplore"){
        const result = await checkLocationPermission()
        console.log("result: ", result)
        if(!result)return
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
        navigation.navigate("DonorLocationScreen")
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
      try{

        const response = await axios.post(`${BASED_URL}/kalinga/tokenLogin/${userInformation.Donor_ID}`,
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
            
    useFocusEffect(
      React.useCallback(() => {
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
        >
              <View style = {styles.flex_start}>
                <Text style = {styles.title}>Donor's Dashboard</Text>
              </View>
              <View style = {styles.flex_Row}>

                <TouchableOpacity style = {globalStyles.smallBackgroundBox} onPress={() => navigatePage("ValidUserExplore")}>
                    <MaterialIcons name="location-pin" size={70} color="#E60965" />
                    <View style = {styles.LabelCenter}>
                      <Text style = {styles.Label}>Milk Bank Locator</Text>
                      <Text style = {styles.subLabel}>Easily find human milk banks near you</Text>
                    </View>
                </TouchableOpacity>
                
                  <TouchableOpacity style = {globalStyles.smallBackgroundBox}  onPress={() => navigatePage("Donor Educational Library")}>
                    <Ionicons name="book" size={70} color="#E60965" />
                    <View style = {styles.LabelCenter}>
                      <Text style = {styles.Label}>Educational Library</Text>
                      <Text style = {styles.subLabel}>Explore our educational articles on breastfeeding and maternal health</Text>
                    </View>
                  </TouchableOpacity>
                

              </View>

              <View style = {styles.flex_Row}>
                <TouchableOpacity style = {globalStyles.smallBackgroundBox} onPress={() => navigatePage("Chat Assistance")}>
                <FontAwesome5 name="robot" size={70} color="#E60965"/>
                  <View style = {styles.LabelCenter}>
                    <Text style = {styles.Label}>Instant Messaging</Text>
                    <Text style = {styles.subLabel}>Chat with our chatbot for quick respond to FAQs </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style = {globalStyles.smallBackgroundBox} onPress={() => navigatePage("DonorForum", userInformation)}>
                <MaterialIcons name="forum" size={70} color="#E60965" />
                  <View style = {styles.LabelCenter}>
                    <Text style = {styles.Label}>Forum</Text>
                    <Text style = {styles.ShortLabel}>Engage with user discussions</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style = {styles.flex_Row}>
                <TouchableOpacity style = {globalStyles.smallBackgroundBox} onPress={() => navigatePage("SetAnAppointment")}>
                <Ionicons name="calendar" size={70} color="#E60965" />
                  <View style = {styles.LabelCenter}>
                    <Text style = {styles.Label}>Make a Donation</Text>
                    <Text style = {styles.subLabel}>Ready to donate? Set an appointment</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style = {globalStyles.smallBackgroundBox} onPress={() => navigatePage("MyDonationTabs")}>
                  <SimpleLineIcons name="graph" size={70} color="#E60965"s />
                  <View style = {styles.LabelCenter}>
                    <Text style = {styles.Label}>My Donations</Text>
                    <Text style = {styles.subLabel}>View Milk Donation History</Text>
                  </View>
                </TouchableOpacity>
              </View>
       
        </ScrollView>
      </View>
        
      )
  }


  const styles = StyleSheet.create({


    flex_start:{ 
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
  
  })
  
export default DonorHome;

