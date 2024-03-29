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



const AppointmentConfirmation = () => {
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
                <Text style={styles.title}>Appointment Confirmation</Text>
                <View style={styles.container}>
                <TextInput
                        style={styles.BiginputField}
                        placeholder="Full Name"
                        placeholderTextColor="#E60965"
                    />
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Phone Number"
                        placeholderTextColor="#E60965"
                    />
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Email Address"
                        placeholderTextColor="#E60965"
                    />
                    <TextInput
                        style={styles.BiginputFieldHome}
                        placeholder="Home Address"
                        placeholderTextColor="#E60965"
                    />
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Medical Condition (If Applicable)"
                        placeholderTextColor="#E60965"
                    />
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Amount of milk to be donated"
                        placeholderTextColor="#E60965"
                    />
                    <View>
                        <Text style={styles.AdminDate}>Date</Text>
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
                        <Text style={styles.AdminTime}>Time</Text>
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

                <View style={styles.AdminButton}>
                    <TouchableOpacity onPress={() => navigatePage("DonorInitialScreeningFormPage2")}>
                        <View style={styles.ConfirmbuttonContainer}>
                            <Text style={styles.label}>Confirm</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigatePage("DonorInitialScreeningFormPage2")}>
                        <View style={styles.CancelbuttonContainer}>
                            <Text style={styles.label}>Cancel</Text>
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
    title: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E60965',
        marginBottom: 20,
    },
    
    ConfirmbuttonContainer: {
        backgroundColor: '#E60965',
        paddingHorizontal: 37,
        borderRadius: 20,
        paddingVertical: 5,
        marginHorizontal: 10

        
    },
    CancelbuttonContainer: {
        backgroundColor: '#E60965',
        paddingHorizontal: 37,
        borderRadius: 20,
        paddingVertical: 5,
        marginHorizontal: 10

     
    },
    AdminButton:{
        flexDirection: "row",
        justifyContent:"center",
        marginTop: 20
    },
    label: {
        color: 'white',
        fontFamily: 'Open-Sans-Bold',
        fontSize: 15,
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

export default AppointmentConfirmation;
