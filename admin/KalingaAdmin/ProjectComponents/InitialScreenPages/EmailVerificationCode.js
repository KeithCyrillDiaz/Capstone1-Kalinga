import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OtpInputEmail from './OtpInputEmail'; 
import { LinearGradient } from 'expo-linear-gradient';


const EmailVerificationCode = () => {
    const navigation = useNavigation(); 

    const handleBackButton = () => {
        navigation.goBack(); 
    };

    const handleResendCode = () => {
        console.log("Send Code");
    };

    const handleSendButton = () => {
        navigation.navigate('DoneEmailVerification'); 
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
                    <Text style={styles.FirstText}>Email Verification</Text>
                    <Text style={styles.SecondText}>Please enter the code that sent to</Text>
                    <Text style={styles.ThirdText}>roginecubelo@gmail.com</Text>

                    <OtpInputEmail />

                    <TouchableOpacity onPress={handleResendCode}>
                        <Text style={styles.NoCode}>
                            No code receive?{' '}
                            <Text style={{ textDecorationLine: 'underline', color: '#E60965' }}>Resend code here?</Text>
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.SendButton} onPress={handleSendButton}>
                        <Text style={styles.SendButtonText}>Send</Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
        </LinearGradient>
    );
}

export default EmailVerificationCode;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
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
        color: '#E60965',
        marginBottom: 150,
        textAlign: 'center'
    },
    SecondText: {
        fontSize: 15,
        color: '#E60965',
        bottom: 150,
        marginHorizontal: 50,
        alignContent: 'center'
    },
    ThirdText: {
        fontSize: 15,
        color: '#E60965',
        bottom: 150,
        marginHorizontal: 50,
        alignContent: 'center'
    },
    NoCode:
    {
        fontSize: 15,
        color: '#E60965',
        bottom: 90,
        right: 20,
        alignContent: 'center',
        justifyContent: 'center'
    },
    SendButton: {
        backgroundColor: "#E60965",
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 50,
        marginBottom: 20,
        top: 100
    },
    SendButtonText: {
        color: "white",
        fontSize: 20,
    },
});
