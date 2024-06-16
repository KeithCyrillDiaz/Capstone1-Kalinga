import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LoadingSpinner } from '../../../uploader/LoadingSpinner.js';
import { getFormFormat } from '../../../../Kalinga_API/AppointmentFormConfiguration.js';


const SetDateTimeLocation = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { formData } = route.params || {};
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    //validity
    const [invalidTime, setInvalidTime] = useState(false)
    const [invalidDate, setInvalidDate] = useState(false)

    const [location, setLocation] = useState('');
    const [newForm, setNewForm ] = useState(formData)
    const { AppointmentDonorID } = route.params || {};
    const Appointment_DonorID = randomatic('Aa0', 20);
  

    const checkTime = (time) => {

        const timeNow = new Date()
        const dateNow = timeNow.getDate()
        console.log(time)
        console.log(timeNow)
        if(time < timeNow && dateNow >= selectedDate.getDate()) {
        
            console.log("Invalid Time")
            Alert.alert(
                "Invalid Time",
                "Please choose a proper time for your appointment")
                setInvalidTime(true)
            return
        }
        const startingWorkingHours = new Date();
        startingWorkingHours.setHours(8, 0, 0, 0) // set working Time to 8am
        const endingWorkingHours = new Date()
        endingWorkingHours.setHours(17, 0, 0, 0)// set working Time to 5pm

        const checkTimeNow = timeNow.getTime()// for checking current time
        const chosenTime = time.getTime()
        const startingTime = startingWorkingHours.getTime()
        const endingTime = endingWorkingHours.getTime()

        const result = checkTimeNow - endingTime
        console.log("result: ", result)

        // const day = time.getDate()
        // console.log("day: ",day )

        if(chosenTime < startingTime || chosenTime > endingTime ){
            console.log("Milk Banks are not available outside working hours")
            Alert.alert(
                "Milk Banks Availability",
                "Milk Banks are only available during working hours from 8:00 AM to 5:00 PM.")
            setInvalidTime(true)
            return false
        }
        setInvalidTime(false)
        return true
    }
    const checkDate = (date) => {
    
        if (date) {
            const day = date.getDate()
            const dayToday = new Date().getDate()
            if(day < dayToday){
                console.log("Invalid Date")
                Alert.alert(
                    "Invalid Date",
                    "Please choose a proper date for your appointment")
                setInvalidDate(true)
                return
            }
            const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                console.log("Milk Banks are not available during weekends")
                Alert.alert(
                    "Milk Banks Availability",
                    "Milk Banks are only available during weekdays")
                setInvalidDate(true)
                return false
            }   
            setInvalidDate(false)
            return true
        }
    }
    const handleDateChange = (event, selectedDate) => {
      setShowDatePicker(Platform.OS === 'ios');
      checkDate(selectedDate)
      setSelectedDate(selectedDate);
    };
  
    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(Platform.OS === 'ios');
        checkTime(selectedTime)
        setSelectedTime(selectedTime);
    };
    
    const checkForm = () => {
        // console.log("Test", newForm.location
        if (newForm.method === "") {
            Alert.alert('Missing Information', 'Please input a delivery method.');
            return;
        }
        if(invalidDate) {
            Alert.alert(
                "Milk Banks Availability",
                "Milk Banks are only available during weekdays")
            return
        }
        if(invalidTime){
            Alert.alert(
                "Milk Banks Availability",
                "Milk Banks are only available during working hours from 8:00 AM to 5:00 PM.")
            return
        }
        if(newForm.location === undefined) {
            Alert.alert("Invalid Milk Bank", "Please select a milk bank before proceeding.")
            return
        }
        handleAppointmentCreation()
    }
    const handleAppointmentCreation = async () => {
      
        const appointmentData = {
          ...newForm,
          selectedDate: selectedDate.toISOString(),
          selectedTime: selectedTime.toISOString(),
        };
      
        try {
            // Simulate API call or any processing
            console.log('Appointment data:', appointmentData);
            navigation.navigate('AppointmentUploads', { formData: appointmentData });
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
          const [loading, setLoading] = useState(false)
          const [deliveryCategories, setDeliveryCategories] = useState([
            "In house",
            "Pick-up"
          ])
          const fetchDeliveryMethodCategories = async () => {
            setLoading(true)
            const result = await getFormFormat({navigation: navigation})
            setLoading(false)
            if(!result) return
            const {donationAppointmentConfig} = result
            if(!donationAppointmentConfig)return
            console.log("donationAppointmentConfig: ", donationAppointmentConfig)
            const { method } = donationAppointmentConfig.options
            setDeliveryCategories(method)
            console.log("method: ", method)
          }
        useEffect(() => {
            fetchDeliveryMethodCategories()
        },[])

    return (
        <View style={globalStyles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style={globalHeader.SmallHeader}>
                <Text style={globalHeader.SmallHeaderTitle}>Set Appointment</Text>
            </View>

            <ScrollView overScrollMode='never' nestedScrollEnabled={true}>
                <View style={styles.container}>
                    <LoadingSpinner loading={loading}/>
                    <Text style={[styles.AdminDate,{width: "100%", marginLeft: 5,}]}>Delivery Method</Text>
                    <View style={styles.BiginputField}>
                        <Picker
                        selectedValue={newForm.method}
                        style={{ height: 30, width: "90%", color: '#E60965'}}
                        onValueChange={(itemValue) =>
                        handleChange("method", itemValue)
                        }
                        >
                        <Picker.Item label="Method of Delivery" value="" />
                        {deliveryCategories.map((category, index) => (
                            <Picker.Item key={index} label={category} value={category} />
                        ))}
                    </Picker>
                        <MaterialCommunityIcons name="truck-delivery" size={30} style={{flexShrink:0}} color='#E60965' />
                    </View>
                    
           

                    {/* <Text style={[styles.AdminDate,{width: "100%", marginLeft: 5,}]}>Method of Delivery</Text>
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
                    )} */}

                    {/* <View>
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
                            value={selectedTime || new Date()}
                            mode="time"
                            display="default"
                            onChange={handleTimeChange}
                        />
                    )} */}

                    <Text style={[styles.AdminMilkLocation]}>Milk Bank Location</Text>
                    <View style={[styles.BiginputField, {paddingLeft: 0,}]}>
                         <Picker
                            selectedValue={newForm.location}
                            style={{ height: 30, width: "90%", color: '#E60965', fontFamily: "Kurale"}}
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

                    <TouchableOpacity onPress={() => checkForm()}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.label}>Next</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};
export default SetDateTimeLocation;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputText: {
        color: '#E60965',
        fontFamily:"Kurale"
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
        backgroundColor:'white',
        borderRadius: 17,
        paddingVertical: 7,
        paddingHorizontal: 20,
        width: 320,
        marginBottom: 40,
        elevation: 5,

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

