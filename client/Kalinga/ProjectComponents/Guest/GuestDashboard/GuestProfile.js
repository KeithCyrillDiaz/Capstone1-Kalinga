// Requestor Profile
import  React, { useState, useEffect } from 'react';
import { globalHeader } from "../../../styles_kit/globalHeader.js";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function GuestProfile() {

  const [userType, setUserType] = useState('')
  const [donor_ID,  setDonor_ID] = useState('')
  const [requestor_ID, setRequestor_ID] = useState('')
  const navigation = useNavigation();

  const handleHomePress = () => {
    console.log("Home button pressed");
  };
  const handleProfilePress = () => {
    console.log("Profile button pressed");
  };

  const navigatePage = (Page) => {
    if(Page === "LogIn"){
      navigation.replace(Page)
    }
    if(Page === "ApplyAsRequestorStack" && requestor_ID !== null){
      Alert.alert('Pending Requestor Applicant', 
      'Please wait while we process your application.')
      return
    }
    if((Page === "ApplyAsDonorStack" && donor_ID !== null)){
      Alert.alert('Pending Donor Applicant', 
      'Please wait while we process your application.')
      return
    }
    navigation.navigate(Page); // Navigate to the Login screen
};
const getData = async () => {
  try {
    const user = await AsyncStorage.getItem('userType');
    const donorId = await AsyncStorage.getItem('DonorApplicant_ID');
    const requestorId = await AsyncStorage.getItem('RequestorApplicant_ID');
    const pending = await AsyncStorage.getItem('Pending');
    console.log('RequestorApplicant_ID: ', requestorId);
    console.log('DonorApplicant_ID: ', donorId);
    console.log('pending: ', pending);
    setUserType(user);
    setDonor_ID(donorId);
    setRequestor_ID(requestorId);
  } catch (error) {
    console.error('Error retrieving data from AsyncStorage:', error);
  }
};

  useEffect(() => {
    getData()
    console.log("fetchData")
  },[])


    return (
      <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style={globalHeader.SmallHeader}>
                <Text style={globalHeader.SmallHeaderTitle}>Profile</Text>
            </View>
            <View style={{ flex: 1 }}>
            <View style={styles.profileIcon}>
              <Ionicons name="person-circle-outline" size={150} color="#E60965"  />
              <MaterialIcons name="verified" size={35} color="#EB7AA9" style={{position: 'absolute', top: 100, right: 100}}/>
            </View>
            <View style={styles.profileText}>
              <Text style={styles.userText}>Guest User</Text>
              <Text style={styles.statusText}>Requestor</Text>
            </View>

            <TouchableOpacity style={styles.menuContainer} onPress={() => navigatePage("ApplyAsRequestorStack")} >
                <FontAwesome style={{flexShrink: 0, marginRight: "4%"}} name="handshake-o" size={24} color="#E60965" />   
                <View style = {styles.labelAndArrowCont}>
                  <Text style={[styles.menuText, {marginRight: -10}]}>{userType !== "Requestor" ? "Apply as Requestor" : "You're already a Requestor"}</Text>
                  <FontAwesome style={{flexShrink: 0}} name="chevron-right" size={24} color="#E60965" />
                </View>           
              
              </TouchableOpacity>
            <View style={styles.line}></View>
  

                <TouchableOpacity style={styles.menuContainer} onPress={() => navigatePage("ApplyAsDonorStack")} >
                  <FontAwesome5 style={{flexShrink: 0, marginRight: "5%"}} name="hand-holding-water" size={24} color="#E60965" />                
                  <View style = {styles.labelAndArrowCont}>
                    <Text style={styles.menuText}> {userType !== "Donor" ? "Apply as Donor" : "You're already a Donor"}</Text>
                    <FontAwesome style={{flexShrink: 0}} name="chevron-right" size={24} color="#E60965" />
                  </View>
               
                </TouchableOpacity>
              <View style={styles.line}></View>
            
         
            <TouchableOpacity style={styles.menuContainer} onPress={() => navigatePage("LogIn")} >
                <Entypo style={{flexShrink: 0, marginRight: "4%"}}  name="log-out" size={30} color="#E60965" />            
                <View style = {styles.labelAndArrowCont}>
                  <Text style={styles.menuText}>Sign In</Text>
                  <FontAwesome name="chevron-right" size={24} color="#E60965" />
                </View> 
            </TouchableOpacity>
            <View style={styles.line}></View>

            </View>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8EB',
  },
  labelAndArrowCont:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
  },

  profileIcon: {
    alignItems: 'center',
    //position: 'relative',
  },

  profileText: {
    alignItems: 'center',
    marginTop: -5,
  },

  userText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#E60965',
  },

  statusText: {
    fontSize: 18,
    color: '#E60965',
  },

  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: "center",
    justifyContent: "flex-start",
    marginTop: 20,
    width: "75%",

  },

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },

  iconContainer1: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',

  },
  
  backButton: {
    marginRight: 10,
    paddingTop: 5,
    paddingRight: 10,
  },

  line: {
    marginTop: 10,
    borderBottomColor: '#E60965',
    borderBottomWidth: 0.5,
    width: "80%",
    alignSelf: "center"
  },

  menuText: {
    fontSize: 20,
    color: '#E60965',
    fontWeight: 'bold',
  },

  backButtonNew: {
    marginRight: 10,
    paddingTop: 5,
    paddingRight: 10,
  },

  line2: {
    height: 2,
    borderRadius: 1,
    backgroundColor: '#E60965', 
    width: 40, 
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
    alignSelf: "center"
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
});

