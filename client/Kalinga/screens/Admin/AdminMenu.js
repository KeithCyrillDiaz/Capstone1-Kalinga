import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';



const AdminMenu = () => {
    const navigation = useNavigation(); 

    
    const handleLogIn = () => {
        navigation.navigate('LoginAdmin');
    };

    const handleDashboard = () => {
        navigation.navigate('AdminDashboard');
    };

    const handleUser = () => {
        navigation.navigate('AdminUser');
    };

    const handleMilkbanks = () => {
        navigation.navigate('AdminMilkbanks');
    };

    const handleDonorVerification = () => {
        navigation.navigate('DonorUserVerification');
    };

    const handleRequestorVerification = () => {
        navigation.navigate('RequestorUserVerification');
    };

    




    return (
        <SafeAreaView style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Menu</Text>
              </View>
                <View style={styles.Buttoncontainer}>
                    <TouchableOpacity style={styles.MenuButton} onPress={handleDashboard}>
                        <View style={styles.buttonContent}>
                            <Octicons name="graph" size={24} color="#E60965" style={styles.icon} /> 
                            <Text style={styles.MenuButtonText}>Dashboard</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.MenuButton} onPress={handleMilkbanks}>
                            <View style={styles.buttonContent}>
                                <Image
                                    source={require('../../assets/milk.png')}
                                    style={styles.icon}
                                />
                                <Text style={styles.MenuButtonText}>Milk Banks</Text>
                            </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.MenuButton} onPress={handleUser}>
                        <View style={styles.buttonContent}>
                            <FontAwesome5 name="user" size={24} color="#E60965" style={styles.icon}/>
                            <Text style={styles.MenuButtonText}>Verified Users</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.MenuButton} onPress={handleDonorVerification}>
                            <View style={styles.buttonContent}>
                            <Image
                                    source={require('../../assets/Donor.png')}
                                    style={styles.icon}
                                />                                
                                <Text style={styles.MenuButtonText}>Donor's Verification</Text>
                            </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.MenuButton} onPress={handleRequestorVerification}>
                            <View style={styles.buttonContent}>
                            <Image
                                    source={require('../../assets/Requestor.png')}
                                    style={styles.icon}
                                />                                
                                <Text style={styles.MenuButtonText}>Requestor's Verification</Text>
                            </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.SignOutButton} onPress={handleLogIn}>
                            <View style={styles.buttonContent}>
                                <Octicons name="sign-out" size={24} color="#E60965" style={styles.icon} />
                                <Text style={styles.SignOutButtonText}>Sign out</Text>
                            </View>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
      
    )
}

export default AdminMenu;

const styles = StyleSheet.create ({
    header: {
       marginTop:30,
       paddingVertical: 20,
       backgroundColor: '#E60965',
       borderBottomLeftRadius: 30,
       borderBottomRightRadius: 30,
       elevation: 30,
       justifyContent: 'center',
       alignContent: 'center'
 
    },
    headerTitle: {
       fontFamily: 'Kurale-Regular',
       fontSize:20,
       color: 'white',
       textAlign: 'center',
       fontWeight: '700'

 
    },
    container:{
        flex: 1,
        backgroundColor: '#FFF8EB',

    },
    Buttoncontainer:{
        marginTop: 25,
    },
    MenuButton: {
        backgroundColor: 'white',
        marginHorizontal: 60,
        width: '70%',
        paddingVertical: 10,
        borderRadius: 50,
        borderColor: '#E60965',
        borderWidth: 1,
        marginTop: 10,

    },
    MenuButtonText: {
        color: '#E60965',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '700'
    },
    buttonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
    },

    SignOutButton: {
        backgroundColor: 'white',
        marginHorizontal: 60,
        width: '70%',
        paddingVertical: 10,
        borderRadius: 50,
        borderColor: '#E60965',
        borderWidth: 1,
        marginTop: 100,

    },
    SignOutButtonText: {
        color: '#E60965',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '700'
    },
    icon: {
        paddingRight: 10, 
        width: 30,  // Set your desired width
        height: 30,
    },
 })