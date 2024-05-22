import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView,  Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { globalStyles } from '../../../styles_kit/globalStyles';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './GuestHeader';


export default function GuestHome() {
  const navigation = useNavigation();

  const [userType, setUserType] = useState('')
  const [donor_ID,  setDonor_ID] = useState('')
  const [requestor_ID, setRequestor_ID] = useState('')

  const navigatePage = (Page) => {
    if(Page === "LogIn"){
      navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{ name: Page }],
        })
    );
    return
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
    <View style={styles.container}>
      <Header />
      <View
        style = {[globalStyles.scrollView, {alignItems: "center", justifyContent: "center"}]}
        overScrollMode='never'
        nestedScrollEnabled={true}>
          
      <View style={styles.boxRowContainer}>
        <TouchableOpacity style={styles.box} onPress={() => navigatePage("Guest Explore")} >
              <MaterialIcons style={{flexShrink: 0}} name="location-on" size={70} color="#E60965" />   
              <Text style={styles.boxTitle}>Milk Bank Locator</Text>     
              <Text style={styles.boxMinitext}>Easily find human milk banks near you</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigatePage("Instant Messages")} >
              <MaterialCommunityIcons style={{flexShrink: 0}} name="robot" size={70} color="#E60965" />                
              <Text style={styles.boxTitle}> Instant Chat</Text>
              <Text style={styles.boxMinitext}>Chatbot assistance for FAQs</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.boxRowContainer}>
        <TouchableOpacity style={styles.box} onPress={() => navigatePage("ApplyAsRequestorStack")} >
              <FontAwesome5 style={{flexShrink: 0}} name="hand-holding-water" size={70} color="#E60965" />   
              <Text style={styles.boxTitle}>{userType !== "Requestor" ? "Apply as Requestor" : "You're already a Requestor"}</Text>     
              <Text style={styles.boxMinitext}>Request breast milk for your infant's needs.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigatePage("ApplyAsDonorStack")} >
              <FontAwesome style={{flexShrink: 0}} name="handshake-o" size={70} color="#E60965" />               
              <Text style={styles.boxTitle}>{userType !== "Donor" ? "Apply as Donor" : "You're already a Donor"}</Text>
              <Text style={styles.boxMinitext}>Offer your surplus breast milk for donation.</Text>
        </TouchableOpacity>
      </View>



    </View>
      
    </View>
  );
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


  educ: {
    fontFamily: 'OpenSans_Condensed-Bold',
    color: '#E60965',
    fontSize: 15,
  },

  book: {
    marginTop: 10,
    marginBottom: 10,
  },
  
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },

  rowButton: {
    flex: 3,
    marginHorizontal: 5,
  },

  buttonRowContainer: {
    backgroundColor: '#FFE5EC',
    borderColor: '#E60965',
    borderWidth: 1,
    width: "100%",
    aspectRatio: 7 / 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginTop: 10,
    marginBottom: 10,
  },

  button_H1: {
    fontFamily: 'OpenSans_Condensed-Bold',
    color: '#E60965',
    fontSize: 15,
    paddingTop: 5,
  },

  button_H2: {
    fontFamily: 'OpenSans-Regular',
    color: '#E60965',
    textAlign: "center",
    fontSize: 10
  },

  button_H1_1: {
    fontFamily: 'OpenSans_Condensed-Bold',
    color: '#E60965',
    fontSize: 15,
  },

  button_H2_1: {
    fontFamily: 'OpenSans-Regular',
    color: '#E60965',
    textAlign: "justify",
    fontSize: 12,
    paddingTop: 5,
    margin:5
  },

  seeMoreButton: {
    textDecorationLine: 'underline',
    fontFamily: 'OpenSans-Regular',
    color: '#E60965',
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: "right",
    paddingTop: 15,
  },

  bodyTitle: {
    fontFamily: 'OpenSans_Condensed-Bold',
    color: '#E60965',
    fontSize: 25,
    paddingTop: 5,
    padding: 10,
  },

  columnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  colButton: {
    marginVertical: 5,
  },

  buttonColContainer: {
    backgroundColor: '#FFE5EC',
    width: "95%",
    borderColor: '#E60965',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'left',
    padding: 15,
    elevation: 5,
    marginVertical: 3,
  },

  bottomBorder: {
    backgroundColor: '#E60965',
    height: 90,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 0,
    position: 'absolute',
    bottom: 0,
  },

  iconbuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
    marginLeft: 120,
    marginRight: 120,
  },

  iconText: {
    fontSize: 12,
    color: 'white',
    marginTop: 0,
    marginLeft: 10,
  },

});
