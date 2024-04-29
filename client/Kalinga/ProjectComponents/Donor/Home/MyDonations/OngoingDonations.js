import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { SafeAreaView, Text, View,ScrollView, StatusBar, StyleSheet, TouchableOpacity, Image, ActivityIndicator, TextInput} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios'; // Import axios for API requests
import { format } from 'date-fns';

import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

import { globalHeader } from '../../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';

import Tabs from './MyDonationsTabs.js';



const Tab = createBottomTabNavigator()



const OngoingDonations = () => {
 
  const navigation = useNavigation();
  const route = useRoute();
  const Donor_ID ='dHphY4FyVPlOCHAtCG3a';
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    homeAddress: '',
    medicalCondition: '',
    milkAmount: '',
    location: '',
    selectedDate: selectedDate.toISOString(),
    selectedTime: selectedTime.toISOString(),
});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
      try {
          const response = await axios.get(`http://192.168.254.106:7000/kalinga/getOngoingDonation/${Donor_ID}`);
          const responseData = response.data;

          const formDataFromResponse = responseData.DonationData[0];
  
          setFormData(formDataFromResponse);

          setLoading(false); 
      } catch (error) {
          console.log('Error fetching data:', error);
          setLoading(false); 
      }
  };

  if (loading) {
      return <ActivityIndicator size="large" color="#E60965" />;
  }

  const navigatePage = (Page) => {
      navigation.navigate(Page); // Navigate to the Login screen
  };



    return (
             <SafeAreaView style = {styles.container}>
                <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
               
                <ScrollView
                 overScrollMode='never'
                 nestedScrollEnabled={true}
                >
            {formData && (
            <View style={styles.container}>
              <TextInput
                style={[styles.BiginputField, { color: '#E60965' }]}
                placeholder="Full Name"
                placeholderTextColor="#E60965"
                value={`Full Name: ${formData.fullName || ''}`}
                editable={false}
              />
              <TextInput
                style={[styles.BiginputField, { color: '#E60965' }]}
                placeholder="Phone Number"
                placeholderTextColor="#E60965"
                value={`Phone Number: ${formData.phoneNumber || ''}`}
                editable={false}
              />
              <TextInput
                style={[styles.BiginputField, { color: '#E60965' }]}
                placeholder="Email Address"
                placeholderTextColor="#E60965"
                value={`Email Address: ${formData.emailAddress || ''}`}
                editable={false}
              />
              <TextInput
                style={[styles.BiginputField, { color: '#E60965' }]}
                placeholder="Home Address"
                placeholderTextColor="#E60965"
                value={`Home Address: ${formData.homeAddress || ''}`}
                editable={false}
              />
              <TextInput
                style={[styles.BiginputField, { color: '#E60965' }]}
                placeholder="Medical Condition (If Applicable)"
                placeholderTextColor="#E60965"
                value={`Medical Condition (If Applicable): ${formData.medicalCondition || ''}`}
                editable={false}
              />
              <TextInput
                style={[styles.BiginputField, { color: '#E60965' }]}
                placeholder="Amount of Milk to be Donated"
                placeholderTextColor="#E60965"
                value={`Amount of Milk to be Donated: ${formData.milkAmount || ''}`}
                editable={false}
              />
              <View>
              <Text style={styles.AdminDate}>Date</Text>
              </View>
              <View style={styles.BiginputField}>
                        <TextInput
                            style={{ flex: 1, color: '#E60965' }}
                            placeholder="Date"
                            placeholderTextColor="#E60965"
                            value={format(formData.selectedDate, 'MM/dd/yyyy')}
                            editable={false}
                        />
                        <FontAwesome5 name="calendar-alt" size={20} color="#E60965" style={styles.icon} />
                    </View>

                    <View>
                        <Text style={styles.AdminTime}>Time</Text>
                    </View>
                    <View style={styles.BiginputField}>
                        <TextInput
                            style={{ flex: 1, color: '#E60965' }}
                            placeholder="Time"
                            placeholderTextColor="#E60965"
                            value={format(formData.selectedTime, 'HH:mm')}

                            editable={false}
                        />
                        <MaterialIcons name="access-time-filled" size={24} color="#E60965" style={styles.icon2} />
                    </View>
              <View>
                    <Text style={styles.AdminMilkLocation}>Milk Bank Location</Text>
                </View>
                <View style={styles.BiginputField}>
                <TextInput
                    style={{ flex: 1, color: '#E60965' }} // Set flex to 1 to allow TextInput to take up remaining space
                    placeholder="location"
                    placeholderTextColor="#E60965"
                    value={formData.location || ''}
                    editable={false}
                />
                <FontAwesome6 name="hospital" size={24} color="#E60965" style={styles.icon3} />
                </View>
                </View>
              )}
                      
                </ScrollView>
        
            </View>
        
    );

}

const styles = StyleSheet.create ({
  container: {
    paddingTop: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF8EB'
},
    
  center: {
    alignItems: 'center',
    marginTop: '5%',
},
AdminDate:{
marginRight: '80%',   
paddingVertical: 5 ,
color: '#E60965',
fontSize: 18
},
AdminTime:{
 marginRight: '80%' ,   
paddingVertical: 5 ,
color: '#E60965',
fontSize: 18


},
AdminMilkLocation:{
    marginRight: '50%' ,   
   paddingVertical: 5, 
   color: '#E60965',
   fontSize: 18


   },
   BiginputField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor:'white',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E60965',
    paddingVertical: 5,
    paddingHorizontal: 20,
    width: 320,
    marginBottom: 15
},
BiginputFieldHome: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor:'white',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E60965',
    paddingVertical: 5,
    paddingHorizontal: 20,
    width: 320,
    height: 75,
    marginBottom: 15
},
icon: {
    marginLeft: 180 // Adjust the margin right for the icon
},
icon2: {
    marginLeft: 200 // Adjust the margin right for the icon
},
icon3: {
    marginLeft: 10 // Adjust the margin right for the icon
},
});

export default OngoingDonations;