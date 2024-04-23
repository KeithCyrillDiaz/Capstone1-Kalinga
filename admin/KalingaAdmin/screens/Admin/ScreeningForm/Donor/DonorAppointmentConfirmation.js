import React, { useState, useEffect} from 'react';
import { ScrollView, Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput, Button, Platform, textStyle, Alert  } from 'react-native';
import { globalHeader } from '../../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons'; // Import Feather icon from Expo
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import randomatic from 'randomatic';
import { format } from 'date-fns';
import axios from 'axios'; // Import axios
import { useNavigation, useRoute } from '@react-navigation/native'; // Correct import




const DonorAppointmentConfirmation = () => {
    const route = useRoute(); // Move this line before accessing route.params
    const AppointmentDonorID = route.params;

    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false); // Add this line to define isLoading state

    
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
  
   
       
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://192.168.254.106:7000/kalinga/getAppointmentsByDonorID/${AppointmentDonorID.formData}`);
            console.log('API Response:', response.data);
            const data = response.data.Appointment;
            console.log('Fetched Data:', data);
    
            // Extract the time part from the selectedTime field
            const dateTime = new Date(data.selectedTime);
            const timePart = `${dateTime.getHours()}:${dateTime.getMinutes()}`;
    
            setFormData({
                ...data,
                selectedTime: timePart, // Only set the time part
            });
            
        } catch (error) {
            console.error('Error fetching data:', error); // Log specific error
        } finally {
            setIsLoading(false);
        }
    };

    const CustomAlert = ({ visible, onClose, onConfirm }) => (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalContainer}>
                <View style={styles.alertContainer}>
                    <Text style={styles.alertText}>
                        Are you sure you want to approve this appointment?
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={onConfirm}>
                            <Text style={[styles.buttonText, { color: '#E60965' }]}>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
    
   
    const handleApproveButtonPress = async () => {
        Alert.alert(
            'Are you sure you want to approve this appointment?',
            'Once approved, the appointment will be scheduled.',
            [
                
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            setIsLoading(true);
                            await axios.put(`http://192.168.254.106:7000/kalinga/updateDonationStatus/${AppointmentDonorID.formData}`, {
                                DonationStatus: 'Ongoing',
                            });
                            fetchData(); // Assuming fetchData updates the data in your component
                            navigation.navigate('AppointmentConfirm');
                        } catch (error) {
                            console.error('Error updating donation status:', error.response);
                        } finally {
                            setIsLoading(false);
                        }
                    },
                },

                {
                    text: 'No',
                    style: 'cancel',
                },
            ],
            { cancelable: false },
            
        );
    };

    const handleDeclineButtonPress = async () => {
        Alert.alert(
            'Are you sure you want to decline this appointment?',
            'Once confirmed, the appointment status will be changed to declined.',
            [
                
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            setIsLoading(true);
                            await axios.put(`http://192.168.254.106:7000/kalinga/updateDonationStatus/${AppointmentDonorID.formData}`, {
                                DonationStatus: 'Decline',
                            });
                            fetchData(); // Assuming fetchData updates the data in your component
                            navigation.navigate('AppointmentDecline');
                        } catch (error) {
                            console.error('Error updating donation status:', error.response);
                        } finally {
                            setIsLoading(false);
                        }
                    },
                },

                {
                    text: 'No',
                    style: 'cancel',
                },
            ],
            { cancelable: false },
            
        );
    };
    useEffect(() => {
        fetchData(); // Fetch data when component mounts
    }, []);
  
return (
        <View style={globalStyles.container}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
        <View style={globalHeader.SmallHeader}>
            <Text style={globalHeader.SmallHeaderTitle}>Set Appointment</Text>
        </View>

        <ScrollView overScrollMode='never' nestedScrollEnabled={true}>
            <Text style={styles.title}>Appointment Confirmation</Text>
           
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
                            value={format(selectedTime, 'HH:mm')}

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

                <View style={styles.AdminButton}>
                    <TouchableOpacity onPress={() => handleApproveButtonPress(AppointmentDonorID)}>
                        <View style={styles.ApprovebuttonContainer}>
                            <Text style={styles.label}>Approve</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeclineButtonPress(AppointmentDonorID)}>
                        <View style={styles.DeclinebuttonContainer}>
                            <Text style={styles.label}>Decline</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                    </View>
                )}
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
    
    ApprovebuttonContainer: {
        backgroundColor: '#E60965',
        paddingHorizontal: 37,
        borderRadius: 20,
        paddingVertical: 5,
        marginHorizontal: 10

        
    },
    DeclinebuttonContainer: {
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

export default DonorAppointmentConfirmation;
