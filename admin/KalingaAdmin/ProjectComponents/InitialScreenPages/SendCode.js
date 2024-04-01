import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const SendCode = () => {
    const navigation = useNavigation(); 
    const handleBackButton = () => {
        navigation.goBack(); 
    };

    const handleSendCode = () => {
        console.log("Send Code");
    };

    const handleNextButton = () => {
        navigation.navigate('MobileNumber'); 
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
                    <Text style={styles.FirstText}>By clicking the send code, we’ll send you a code through your number to continue.</Text>
                    <Text style={styles.SecondText}>Phone Number</Text>
                    <View style={styles.phoneNumberContainer}>
                        <Text style={styles.phoneNumberPrefix}>+63</Text>

                        <TextInput
                            style={styles.phoneNumberInput}
                            placeholder="Enter your phone number"
                            placeholderTextColor="black"
                            keyboardType="phone-pad"
                        />
                    </View>
                    <TouchableOpacity onPress={handleSendCode}>
                        <Text style={styles.Thirdtext}>Send Code</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.NextButton} onPress={handleNextButton}>
                        <Text style={styles.NextButtonText}>Next</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
        </LinearGradient>
    );
}

export default SendCode;

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
        fontSize: 25,
        color: '#E60965',
        bottom: 50,
        textAlign: 'center'
    },
    SecondText: {
        fontSize: 15,
        color: '#E60965',
        marginBottom: 10,
        right: 90
    },
    phoneNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E60965',
        borderRadius: 25,
        width: '80%',
        height: 50,
        marginBottom: 20,
    },
    phoneNumberInput: {
        flex: 1,
        marginLeft: 10,
    },
    phoneNumberPrefix: {
        marginLeft: 20,
        marginRight: 5,
        color: 'black', 
    },
    
    Thirdtext: {
        color: '#E60965',
        marginBottom: 20,
    },
    NextButton: {
        backgroundColor: "#F94892",
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 50,
        marginBottom: 20,
    },
    NextButtonText: {
        color: 'white',
        fontSize: 20,
    },
    gradient: {
        flex: 1,
    },
});
