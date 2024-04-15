import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Feather } from '@expo/vector-icons';
import { globalHeader } from '../../styles_kit/globalHeader';
import axios from 'axios';
import { BASED_URL } from '../../MyConstants';


const Tab = createMaterialTopTabNavigator();



const SearchBar = () => {
    return (
        <View style={styles.searchContainer}>
            <Feather name="search" size={24} color="black" style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Search Donors"
                placeholderTextColor="#777"
            />
        </View>
    );
};


const FirstScreen = ({}) => {
    const navigation = useNavigation();

    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchDonorAppointments = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${BASED_URL}/kalinga/getAppointmentByUserType/Donor`);
            setAppointments(response.data.appointment); // Assuming the data structure has an 'appointment' key containing the array
        } catch (error) {
            console.error('Error fetching donor appointments:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDonorAppointments();
    }, []);

    const handleViewPress = (appointment) => {
        console.log("id", appointment.AppointmentDonorID);
        navigation.navigate('DonorAppointmentConfirmation', { formData: appointment.AppointmentDonorID });
    };
    
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.tabContent}>
            <SearchBar />
            <View style={styles.DonorContainer}>
                <View style={styles.donorInfoContainer}>
                    <Text>Name</Text>
                </View>
                <View style={styles.donorInfoContainer}>
                    <Text>Phone Number</Text>
                </View>
            </View>
            <View style={styles.lineContainer}>
                <View style={styles.line} />
            </View>

            {appointments.map((appointment, index) => (
                <View key={index} style={styles.DonorSecondContainer}>
                    <View style={styles.donorInfoSecondContainer}>
                        <Text>{appointment.fullName}</Text>
                    </View>
                    <View style={styles.donorInfoSecondContainer}>
                        <Text>{appointment.phoneNumber}</Text>
                    </View>
                    <TouchableOpacity style={styles.logInButton} onPress={() => handleViewPress(appointment)}>
                        <Text style={styles.logInButtonText}>View</Text>
                    </TouchableOpacity>

                </View>
            ))}
        </View>
    </ScrollView>
);
}; 


const SecondScreen = () => {
    const navigation = useNavigation();

    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMakeRequest = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${BASED_URL}/kalinga/getRequestByUserType/Requestor`);
            setRequests(response.data.request); // Assuming the data structure has an 'appointment' key containing the array
        } catch (error) {
            console.error('Error fetching:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMakeRequest();
    }, []);

    const handleViewPress = (request) => {
        console.log("id", request.RequestID);
        navigation.navigate('RequestorRequestConfirmation', { formData: request.RequestID });
    };
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.tabContent}>
                <SearchBar />
                <View style={styles.RequestorContainer}>
                    <View style={styles.RequestorInfoContainer}>
                        <Text>Name</Text>
                    </View>
                    <View style={styles.RequestorInfoContainer}>
                        <Text>Phone Number</Text>
                    </View>
                    <View style={styles.RequestorInfoContainer}>
                        <Text>Category</Text>
                    </View>
                </View>
                <View style={styles.lineContainer}>
                    <View style={styles.line} />
                </View>


                {requests.map((request, index) => (
                <View key={index} style={styles.RequestorSecondContainer}>
                    <View style={styles.RequestorInfoSecondContainer}>
                        <Text>{request.fullName}</Text>
                    </View>
                    <View style={styles.RequestorInfoSecondContainer}>
                        <Text>{request.phoneNumber}</Text>
                    </View>
                    <View style={styles.RequestorInfoSecondContainer}>
                        <Text>{request.BabyCategory}</Text>
                    </View>
                    <TouchableOpacity style={styles.logInButton} onPress={() => handleViewPress(request)}>
                        <Text style={styles.logInButtonText}>View</Text>
                    </TouchableOpacity>

                </View>
            ))}



                
            </View>
        </ScrollView>
    );
};

const AdminUser = () => {
    const navigation = useNavigation();

    

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style={globalHeader.SmallHeader}>
                <Text style={globalHeader.SmallHeaderTitle}>Appointment</Text>
            </View>

            <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: {
                        fontSize: 16,
                        fontWeight: 'bold',
                    },
                    tabBarStyle: {
                        backgroundColor: '#FFF8EB',
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: '#E60965',
                    },
                }}
            >
                <Tab.Screen name="Donors" component={FirstScreen} />
                <Tab.Screen name="Requestors" component={SecondScreen} />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#E60965',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 30,
        alignItems: 'center',
        marginTop: 30,
        paddingVertical: 20
    },
    headerTitle: {
        fontFamily: 'Kurale-Regular',
        fontSize: 20,
        color: 'white',
        alignSelf: "center",
        fontWeight: '700',
    },
    menuIcon: {
        marginLeft: 20,
        marginRight: 20,
    },
    tabContent: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF8EB',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF8EB',
    },
    searchContainer: {
        backgroundColor: '#FFF8EB',
        width: '100%',
        paddingVertical: 5,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center', // Center the content horizontally
        borderRadius: 10,
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    searchIcon: {
        position: 'absolute',
        left: 15,
        top: '60%',
        transform: [{ translateY: -12 }],
        color: '#E60965'
    },
    searchInput: {
        flex: 1,
        paddingLeft: 35, // Adjust this value to provide space for the icon
        paddingVertical: 2,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E60965',
        borderRadius: 10,
    },
    DonorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginRight: 60
        
    },
    donorInfoContainer: {
        alignItems: 'center',
        flex: 1
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        borderBottomColor: '#E60965',
        borderBottomWidth: 0.2,
        flex: 1,
    },
    DonorSecondContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        marginRight: 5
    },
    donorInfoSecondContainer: {
        alignItems: 'center',
        flex: 1
    },
    RequestorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginRight: 50
    },
    RequestorInfoContainer: {
        alignItems: 'center',
        flex: 1
    },
    RequestorSecondContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        marginRight: 5
     

    },
    RequestorInfoSecondContainer: {
        alignItems: 'center',
        flex:1


        
    },
    logInButton: {
        backgroundColor: 'white',
        height: '90%',
        width: "15%",
        borderRadius: 50,
        borderColor: '#E60965',
        borderWidth: 1,
        alignItems: 'center',
    },
    logInButtonText: {
        color: '#E60965',
        fontSize: 15,

    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20
    },
});

export default AdminUser;