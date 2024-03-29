import React, { useState } from 'react';
import { ScrollView, Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput, Button, Platform } from 'react-native';
import { globalHeader } from '../../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons'; // Import Feather icon from Expo
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';



const SetDateTimeLocation = () => {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const navigatePage = (Page) => {
        navigation.navigate(Page); // Navigate to the specified screen
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios'); // Close the date picker on iOS
        setSelectedDate(selectedDate || new Date());
    };

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(Platform.OS === 'ios'); // Close the time picker on iOS
        setSelectedTime(selectedTime || new Date());
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
                            color = "#E60965"
                            placeholder="Select Date"
                            value={selectedDate.toDateString()} // Display selected date
                            placeholderTextColor="#E60965"
                            editable={false} // Disable editing
                        />
                        <FontAwesome5 name="calendar-alt" size={20} color="#E60965" style={styles.icon} />
                    </View>

                    </TouchableOpacity>

                    <View>
                        <Text style={styles.AdminTime}>Choose Time</Text>
                    </View>

                    <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                        <View style={styles.BiginputField}>
                        <TextInput
                            color = "#E60965"
                            placeholder="Select Time"
                            value={selectedTime.toLocaleTimeString()} // Display selected time
                            placeholderTextColor="#E60965"
                            editable={false} // Disable editing
                        />
                        <MaterialIcons name="access-time-filled" size={24} color="#E60965" style={styles.icon2} />
                        </View>
                    </TouchableOpacity>
                  
                    {showDatePicker && (
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                    {showTimePicker && (
                        <DateTimePicker
                            value={selectedTime}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={handleTimeChange}

                        />
                    )}
                    <View>
                        <Text style={styles.AdminMilkLocation}>Milk Bank Location</Text>
                    </View>
                    <View style={styles.BiginputField}>
                    <TextInput
                        placeholder="Quezon City General Hospital - Human Milk Bank"
                        placeholderTextColor="#E60965"
                    />
                    <FontAwesome6 name="hospital" size={24} color="#E60965" style={styles.icon3} />
                    </View>
                </View>

                    <TouchableOpacity onPress={() => navigatePage("AppointmentConfirmation")}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.label}>Next</Text>
                        </View>
                    </TouchableOpacity>
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
        paddingVertical: 5,
        paddingHorizontal: 20,
        width: 320,
        marginBottom: 40
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

export default SetDateTimeLocation;
