import React, { useState } from 'react';
import { ScrollView, Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput, Button, Platform } from 'react-native';
import { globalHeader } from '../../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import { useNavigation, useRoute} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons'; // Import Feather icon from Expo
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import randomatic from 'randomatic';
import { format } from 'date-fns';
import { Picker } from '@react-native-picker/picker';



const SetDateTimeLocation = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { formData } = route.params || {};
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [location, setLocation] = useState('');
    const [newForm, setNewForm ] = useState(formData)
    const { AppointmentDonorID } = route.params || {};
    const Appointment_DonorID = randomatic('Aa0', 20);
  
    const handleDateChange = (event, selectedDate) => {
      setShowDatePicker(Platform.OS === 'ios');
      setSelectedDate(selectedDate || new Date());
    };
  
    const handleTimeChange = (event, selectedTime) => {
      setShowTimePicker(Platform.OS === 'ios');
      setSelectedTime(selectedTime || new Date());
    };
  
    const handleAppointmentCreation = async () => {
        const appointmentData = {
          ...newForm,
          selectedDate: selectedDate.toISOString(),
          selectedTime: selectedTime.toISOString(),
        };
      
        try {
            // Simulate API call or any processing
            console.log('Appointment data:', appointmentData);
            navigation.navigate('AppointmentConfirmation', { formData: appointmentData });
            return
          } catch (error) {
            console.error('Error creating appointment:', error);
          }
        };

        const handleChange = (name, value) => {
            const newData = {
                ...newForm,
                [name]: value
              };
              setNewForm(newData)
          };
        
    return (
        <View style={globalStyles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style={globalHeader.SmallHeader}>
                <Text style={globalHeader.SmallHeaderTitle}>Set Appointment</Text>
            </View>

            <ScrollView overScrollMode='never' nestedScrollEnabled={true}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.AdminDate}>Choose Date</Text>
                    </View>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    
                    <View style={styles.BiginputField}>
                    <TextInput
                    style={styles.inputText}
                    placeholder="MM/DD/YYYY"
                    placeholderTextColor="#E60965"
                    value={format(selectedDate, 'MM/dd/yyyy')}
                    editable={false}
                     />
                    <FontAwesome5 name="calendar-alt" size={20} color="#E60965" style={styles.icon} />
                                
                    </View>

                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}

                    <View>
                        <Text style={styles.AdminTime}>Choose Time</Text>
                    </View>

                    <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                        <View style={styles.BiginputField}>
                        <TextInput
                        style={styles.inputText}
                        placeholder="HH:MM"
                        placeholderTextColor="#E60965"
                        value={format(selectedTime, 'HH:mm')}
                        editable={false}
                        />
                        <MaterialIcons name="access-time" size={24} color="#E60965" style={styles.icon2} />
                        </View>
                    </TouchableOpacity>

                    {showTimePicker && (
                        <DateTimePicker
                            value={selectedTime}
                            mode="time"
                            display="default"
                            onChange={handleTimeChange}
                        />
                    )}

                    <View>
                        <Text style={styles.AdminMilkLocation}>Milk Bank Location</Text>
                    </View>
                    <View style={[styles.BiginputField, {paddingLeft: 0,}]}>
                         <Picker
                            selectedValue={newForm.location}
                            style={{ height: 30, width: "90%", color: '#E60965'}}
                            onValueChange={(itemValue) =>
                            handleChange("location", itemValue)
                            }
                            >
                            <Picker.Item label="Select Milk Bank" value="" />
                            <Picker.Item 
                                label="Quezon City General Hospital - Human Milk Bank" 
                                value="Quezon City General Hospital - Human Milk Bank" 
                            />
                        </Picker>
                        <FontAwesome6 name="hospital" size={24} color="#E60965" style={styles.icon3} />
                    </View>

                    <TouchableOpacity onPress={handleAppointmentCreation}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.label}>Next</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputText: {
        color: "black"
    },
    title: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E60965',
        marginBottom: 20,
    },
  
    buttonContainer: {
        backgroundColor: '#E60965',
        paddingHorizontal: 15,
        borderRadius: 20,
        paddingVertical: 5,
        marginHorizontal: 5,
        width: 120,
        alignSelf:"center"
    },
    label: {
        color: 'white',
        fontFamily: 'Open-Sans-Bold',
        fontSize: 15,
        alignSelf: "center"
    },
    center: {
        alignItems: 'center',
        marginTop: '5%',
    },
    AdminDate:{
    marginTop: 50,
    marginRight: '60%',   
    paddingVertical: 15 ,
    color: '#E60965',
    fontSize: 25,
    fontWeight: "bold"
    },

    AdminTime:{
     marginRight: '60%' ,   
    paddingVertical: 15 ,
    color: '#E60965',
    fontSize: 25,
    fontWeight: "bold"



    },
    AdminMilkLocation:{
        marginRight: '40%' ,   
       paddingVertical: 15, 
       color: '#E60965',
       fontSize: 25,
       fontWeight: "bold"


   
       },
       BiginputField: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor:'white',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E60965',
        paddingVertical: 7,
        paddingHorizontal: 20,
        width: 320,
        marginBottom: 40,
        color: "black"
    },
    icon: {
        marginLeft: 180 // Adjust the margin right for the icon
    },
    icon2: {
        marginLeft: 220 // Adjust the margin right for the icon
    },
    icon3: {
        marginLeft: 10 // Adjust the margin right for the icon
    },
});

export default SetDateTimeLocation;
