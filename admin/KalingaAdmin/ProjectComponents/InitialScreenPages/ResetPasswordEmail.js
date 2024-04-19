import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ResetPasswordEmail = () => {
    const navigation = useNavigation(); 

    const handleBackButton = () => {
        navigation.goBack(); 
    };

    const handleContinueButton = () => {
        navigation.navigate('ResetPasswordSuccessful'); 
    };

    const handleResend = () => {
        console.log("Send Code");
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
                <MaterialIcons name="arrow-back" size={28} color="#E60965" />
                <Text style={styles.goBackText}>Go back</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.SecondContainer}
                >
                    <Text style={styles.FirstText}>Email has been sent!</Text>
                    <Text style={styles.SecondText}>Check your emeil for retrieving your account.</Text>

                    <View style={styles.iconContainer}>
                        <Icon name="envelope" size={120} color="white" />
                    </View>

                    <TouchableOpacity style={styles.ContinueButton} onPress={handleContinueButton}>
                        <Text style={styles.ContinueButtonText}>Continue</Text>
                    </TouchableOpacity>

                    <View style={styles.resendContainer}> 
                        <TouchableOpacity onPress={handleResend}>
                            <Text style={styles.HandleCode}>
                                Didn’t received the code?{' '}
                                <Text style={{ textDecorationLine: 'underline', color: 'white' }}>Resend</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>

                
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ResetPasswordEmail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
        color: '#E60965',
        fontSize: 20
    },
    scrollContainer: {
        flexGrow: 1,
    },
    SecondContainer: {
        backgroundColor: '#E60965',
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
        fontSize: 35,
        color: 'white',
        marginBottom: 80,
        textAlign: 'center'
    },
    SecondText: {
        fontSize: 18,
        color: 'white',
        bottom: 70,
        marginHorizontal: 42,
        alignContent: 'center'
    },
    ThirdText: {
        fontSize: 12,
        color: 'white',
        bottom: 70,
        marginHorizontal: 40,
        alignContent: 'center'
    },
    FifthText:{
        fontSize: 18,
        color: 'white',
        top: 40,
        marginHorizontal: 30,
        alignContent: 'center',
        justifyContent: 'center'
    },
    Sixthtext:{
        fontSize: 18,
        color: 'white',
        top: 40,
        marginHorizontal: 30,
        alignContent: 'center',
    },
    iconContainer:
    {
        bottom: 50
    },
    ContinueButton: {
        backgroundColor: "#FFEECC",
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 50,
        marginBottom: 10,
        top: 40

    },
    ContinueButtonText: {
        color: "#E60965",
        fontSize: 20,
    },
    HandleCode: {
        color: "white",
        fontSize: 15,
        marginBottom: 10,
        top: 100
    },
    resendContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
});
