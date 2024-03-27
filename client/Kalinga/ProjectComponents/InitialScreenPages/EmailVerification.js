import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const EmailVerification = () => {
    const navigation = useNavigation(); 

    const handleBackButton = () => {
        navigation.goBack(); 
    };

    const handleSendCode = () => {
        console.log("Send Code");
    };

    const handleSubmitButton = () => {
        navigation.navigate('EmailVerificationCode'); 
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
                    <Text style={styles.SecondText}>Hi! please click the button below to verify your email address to register your account. Put the code in the next page</Text>

                    <Image
                        source={require('../../assets/Email_verification.png')}style={styles.image}
                     />

                    <TouchableOpacity style={styles.SubmitButton} onPress={handleSubmitButton}>
                        <Text style={styles.SubmitButtonText}>Send</Text>
                    </TouchableOpacity>

                
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
        </LinearGradient>
    );
}

export default EmailVerification;

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
        marginBottom: 80,
        textAlign: 'center'
    },
    SecondText: {
        fontSize: 17,
        color: '#E60965',
        bottom: 70,
        marginHorizontal: 42,
        alignContent: 'center'
    },
    SubmitButton: {
        backgroundColor: "#F94892",
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 50,
        marginBottom: 10,
        top: 100

    },
    SubmitButtonText: {
        color: "white",
        fontSize: 20,
    },
});
