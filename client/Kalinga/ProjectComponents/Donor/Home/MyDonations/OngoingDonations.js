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
import { useFocusEffect, useParams } from '@react-navigation/native';
import axios from 'axios'; // Import axios for API requests
import { format } from 'date-fns';
import { BASED_URL } from '../../../../MyConstants.js';

import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import { getDateTime } from '../../../functions/formatDateAndTime.js';


const OngoingDonations = ({route}) => {

  const userInformation = route.params.userInformation
  const token = route.params.token
  const Donor_ID = userInformation.Donor_ID;
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [formData, setFormData] = useState(null);

 
 const fetchData = async () => {
      try {
        setLoading(true);    
          const response = await axios.get(`${BASED_URL}/kalinga/getOngoingDonation/${Donor_ID}`);
          console.log("response: ", response.data.messages.message)
          if(response.data.messages.code === 1) {
            setFormData([])
            return
          }
          const responseData = response.data;
          const formDataFromResponse = responseData.ongoingDonation;
          console.log("response: ", formDataFromResponse)
          const { time, date } = getDateTime({data: formDataFromResponse[0]})
          setTime(time)
          setDate(date)
          setFormData(formDataFromResponse);

      } catch (error) {
          console.log('Error fetching data:', error);
          
      } finally {
        setLoading(false); 
      }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  if (loading) {
      return <ActivityIndicator size="large" color="#E60965" />;
  }


    return (
             <SafeAreaView style = {globalStyles.defaultBackgroundColor}>
                <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
                {!loading && formData && formData.length === 0 && (
                       <View style ={{
                          backgroundColor: "white",
                          width: "90%",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingHorizontal:7,
                          paddingVertical:17,
                          elevation:7,
                          borderRadius: 17,
                          marginTop: "7%",
                          alignSelf: "center"
                        }}>
                    <Text style={{
                        fontFamily: "Open-Sans-SemiBold",
                        color:  '#E60965',
                    }}>No ongoing donations at the moment.</Text>
                  </View>
                 
                )}
            {formData && formData.length !== 0 && (
                <ScrollView    
                overScrollMode='never'
                nestedScrollEnabled={true}
                contentContainerStyle={{
                  alignItems:"center",
                  justifyContent: "center",
                  paddingVertical: "7%",
                }}
                style={{
                  alignSelf: "center"
                }}
                >
                <TextInput
                  style={[styles.BiginputField, { color: '#E60965' }]}
                  placeholder="Full Name"
                  placeholderTextColor="#E60965"
                  value={`Full Name: ${formData[0].fullName}`}
                  editable={false}
                />
                <TextInput
                  style={[styles.BiginputField, { color: '#E60965' }]}
                  placeholder="Phone Number"
                  placeholderTextColor="#E60965"
                  value={`Phone Number: ${formData[0].phoneNumber || ''}`}
                  editable={false}
                />
                <TextInput
                  style={[styles.BiginputField, { color: '#E60965' }]}
                  placeholder="Email Address"
                  placeholderTextColor="#E60965"
                  value={`Email Address: ${formData[0].emailAddress || ''}`}
                  editable={false}
                />
                <TextInput
                  style={[styles.BiginputField, { color: '#E60965' }]}
                  placeholder="Home Address"
                  placeholderTextColor="#E60965"
                  value={`Home Address: ${formData[0].homeAddress || ''}`}
                  editable={false}
                />
                <TextInput
                  style={[styles.BiginputField, { color: '#E60965' }]}
                  placeholder="Medical Condition (If Applicable)"
                  placeholderTextColor="#E60965"
                  value={`Medical Condition (If Applicable): ${formData[0].medicalCondition || ''}`}
                  editable={false}
                />
                <TextInput
                  style={[styles.BiginputField, { color: '#E60965' }]}
                  placeholder="Amount of Milk to be Donated"
                  placeholderTextColor="#E60965"
                  value={`Amount of Milk to be Donated: ${formData[0].milkAmount || ''}`}
                  editable={false}
                />

                <View>
                <Text style={styles.AdminDate}>Date</Text>
                </View>
                <View style={styles.BiginputField}>
                          <TextInput
                              style={{color: '#E60965'}}
                              placeholder="Date"
                              multiline={true}
                              placeholderTextColor="#E60965"
                              value={`Date: ${date}`}                            
                              editable={false}
                          />
                          <FontAwesome5 name="calendar-alt" size={20} color="#E60965" style={styles.icon} />
                      </View>
  
                      <View>
                          <Text style={styles.AdminTime}>Time</Text>
                      </View>
                      <View style={styles.BiginputField}>
                          <TextInput
                              style={{color: '#E60965'}}
                              placeholder="Time"
                              multiline={true}
                              placeholderTextColor="#E60965"
                              value={`Time: ${time}`}
                              editable={false}
                          />
                          <MaterialIcons name="access-time-filled" size={24} color="#E60965" style={styles.icon2} />
                      </View>
                <View>
                      <Text style={styles.AdminMilkLocation}>Milk Bank Location</Text>
                  </View>
                  <View style={styles.BiginputField}>
                  <TextInput
                      style={{color: '#E60965', width: "90%"}} // Set flex to 1 to allow TextInput to take up remaining space
                      placeholder="location"
                      multiline={true}
                      placeholderTextColor="#E60965"
                      value={formData[0].location || ''}
                      editable={false}
                  />
                  <FontAwesome6 name="hospital" size={24} color="#E60965" />
                  </View>
                  </ScrollView>
            )}
            </SafeAreaView>
        
    );

}

const styles = StyleSheet.create ({
  container: {
    paddingTop: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5'
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
    backgroundColor:'white',
    borderRadius: 10,
    borderColor: '#E60965',
    paddingVertical: 5,
    paddingHorizontal: 20,
    width: 320,
    marginBottom: 15,
    elevation:10,
    justifyContent: "space-between"
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

});

export default OngoingDonations;