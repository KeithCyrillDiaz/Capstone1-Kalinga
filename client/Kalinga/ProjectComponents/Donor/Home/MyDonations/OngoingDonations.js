import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  Text, 
  View,
  ScrollView, 
  StatusBar,
   StyleSheet, 
  Alert,
  ActivityIndicator, 
  TextInput} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios'; // Import axios for API requests
import { format } from 'date-fns';
import { BASED_URL } from '../../../../MyConstants.js';

import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';


const OngoingDonations = ({route}) => {

  const userInformation = route.params.userInformation
  const token = route.params.token
  const Donor_ID = userInformation.Donor_ID;
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
 
 const fetchData = async () => {
      try {
        setLoading(false);    
          const response = await axios.get(`${BASED_URL}/kalinga/getOngoingDonation/${Donor_ID}`);
          if(response.data.messages.code === 1) {
            Alert.alert("No Ongoing Donation", "You currently don't have any ongoing donations.");
            setFormData([])
            return
          }
          const responseData = response.data;
          const formDataFromResponse = responseData.ongoingDonation;
          getDateTime(formDataFromResponse)

          setFormData(formDataFromResponse);

      } catch (error) {
          console.log('Error fetching data:', error);
          
      } finally {
        setLoading(false); 
      }
  };

  if (loading) {
      return <ActivityIndicator size="large" color="#E60965" />;
  }

  const getDateTime = (DateAndTime) => {
    
    const date = new Date(DateAndTime[0].selectedTime);
    // Extract the date components
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-indexed, so add 1
    const day = date.getDate();

    // Extract the time components
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Format the date and time components as desired
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    setDate(formattedDate);
    setTime(formattedTime);

    console.log("Date:", formattedDate); 
    console.log("Time:", formattedTime); 
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
    return (
             <SafeAreaView style = {styles.container}>
                <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
               
                <ScrollView
                 overScrollMode='never'
                 nestedScrollEnabled={true}
                >
            
           {formData !== undefined && formData.map((data, index) => (
            <View key={index} style={styles.container}>
              <TextInput
                style={[styles.BiginputField, { color: '#E60965' }]}
                placeholder="Full Name"
                placeholderTextColor="#E60965"
                value={`Full Name: ${data.fullName}`}
                editable={false}
              />
              <TextInput
                style={[styles.BiginputField, { color: '#E60965' }]}
                placeholder="Phone Number"
                placeholderTextColor="#E60965"
                value={`Phone Number: ${data.phoneNumber || ''}`}
                editable={false}
              />
              <TextInput
                style={[styles.BiginputField, { color: '#E60965' }]}
                placeholder="Email Address"
                placeholderTextColor="#E60965"
                value={`Email Address: ${data.emailAddress || ''}`}
                editable={false}
              />
              <TextInput
                style={[styles.BiginputField, { color: '#E60965' }]}
                placeholder="Home Address"
                placeholderTextColor="#E60965"
                value={`Home Address: ${data.homeAddress || ''}`}
                editable={false}
              />
              <TextInput
                style={[styles.BiginputField, { color: '#E60965' }]}
                placeholder="Medical Condition (If Applicable)"
                placeholderTextColor="#E60965"
                value={`Medical Condition (If Applicable): ${data.medicalCondition || ''}`}
                editable={false}
              />
              <TextInput
                style={[styles.BiginputField, { color: '#E60965' }]}
                placeholder="Amount of Milk to be Donated"
                placeholderTextColor="#E60965"
                value={`Amount of Milk to be Donated: ${data.milkAmount || ''}`}
                editable={false}
              />
              <View>
              <Text style={styles.AdminDate}>Date</Text>
              </View>
              <View style={styles.BiginputField}>
                        <TextInput
                            style={{color: '#E60965' }}
                            placeholder="Date"
                            multiline={true}
                            placeholderTextColor="#E60965"
                            value={date}
                            editable={false}
                        />
                        <FontAwesome5 name="calendar-alt" size={20} color="#E60965" style={styles.icon} />
                    </View>

                    <View>
                        <Text style={styles.AdminTime}>Time</Text>
                    </View>
                    <View style={styles.BiginputField}>
                        <TextInput
                            style={{color: '#E60965' }}
                            placeholder="Time"
                            multiline={true}
                            placeholderTextColor="#E60965"
                            value={time}

                            editable={false}
                        />
                        <MaterialIcons name="access-time-filled" size={24} color="#E60965" style={styles.icon2} />
                    </View>
              <View>
                    <Text style={styles.AdminMilkLocation}>Milk Bank Location</Text>
                </View>
                <View style={styles.BiginputField}>
                <TextInput
                    style={{color: '#E60965', width: "90%" }} // Set flex to 1 to allow TextInput to take up remaining space
                    placeholder="location"
                    multiline={true}
                    placeholderTextColor="#E60965"
                    value={data.location || ''}
                    editable={false}
                />
                <FontAwesome6 name="hospital" size={24} color="#E60965" style={styles.icon3} />
                </View>
                </View>
              ))}
                      
                </ScrollView>
        
            </SafeAreaView>
        
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