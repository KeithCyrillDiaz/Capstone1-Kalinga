import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// Import the OtpInput component
import OtpInput from './OtpInput'; // Adjust the path as needed

const MobileNumber = () => {
    const navigation = useNavigation(); // Get navigation object

    const handleBackButton = () => {
        navigation.goBack(); // Navigate back when the back button is pressed
    };

    const handleSendCode = () => {
        console.log("Send Code");
    };

    const handleSubmitButton = () => {
        navigation.navigate('MobileNumberExpired'); 
    };

    return (
        <LinearGradient
            colors={['#EF5487', '#EB90AC', '#E690AA', '#E36A91', '#EB7AA9']}
            style={styles.gradient}
        >
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
                <MaterialIcons name="arrow-back" size={28} color="white" />
                <Text style={styles.goBackText}>Go back</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.SecondContainer}
                >
                    <Text style={styles.FirstText}>Mobile No. Verification</Text>
                    <Text style={styles.SecondText}>Type 6-digit code send to your number</Text>
                    <Text style={styles.SecondText}>+6399********</Text>
                    <Text style={styles.ThirdText}>Please Enter the Authentication Code</Text>
                    <OtpInput />
                    <Text style={styles.FourthText}>Resend Code</Text>

                    <TouchableOpacity style={styles.SubmitButton} onPress={handleSubmitButton}>
                        <Text style={styles.SubmitButtonText}>Submit</Text>
                    </TouchableOpacity>

                    <Text style={styles.FifthText}>Code should arrive in a minute</Text>

                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
        </LinearGradient>
    );
}

export default MobileNumber;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 50, 
        left: 20, 
        flexDirection: 'row',
        alignItems: 'center',
    },
    goBackText: {
        marginLeft: 5,
        color: 'white',
        fontSize: 20
    },
    scrollContainer: {
        flexGrow: 1,
    },
    SecondContainer: {
        backgroundColor: '#FFF8EB',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
        height: '100%',
        marginTop:90,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingBottom: 250
    },
    FirstText: {
        marginHorizontal: 50,
        fontSize: 30,
        color: '#F94892',
        marginBottom: 80,
        textAlign: 'center'
    },
    SecondText: {
        fontSize: 15,
        color: '#F94892',
        bottom: 80,
        marginHorizontal: 50,
        alignContent: 'center'
    },
    ThirdText: {
        fontSize: 18,
        color: '#F94892',
        bottom: 60,
        marginHorizontal: 50,
        alignContent: 'center'
    },
    FourthText:{
        fontSize: 18,
        color: '#F94892',
        bottom: 50,
        marginBottom: 10,
        marginHorizontal: 50,
        right: 100,

    },
    FifthText:{
        fontSize: 18,
        color: '#F94892',
        top: 40,
        marginHorizontal: 50,
        alignContent: 'center',
        justifyContent: 'center'
    },
    SubmitButton: {
        backgroundColor: "#F94892",
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 50,
        marginBottom: 20,
    },
    SubmitButtonText: {
        color: "white",
        fontSize: 20,
    },
    gradient: {
        flex: 1,
    },
});
