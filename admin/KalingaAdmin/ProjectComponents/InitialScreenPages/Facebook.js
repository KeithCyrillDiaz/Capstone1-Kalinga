import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Facebook = () => {
    const navigation = useNavigation(); 

    const handleBackButton = () => {
        navigation.goBack(); 
    };

    const handleContinueButton = () => {
        navigation.navigate('FacebookContinue'); 
    };

    const handleCancelButton = () => {
        navigation.navigate('EmailVerificationCode'); 
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
                    <Text style={styles.FirstText}>Login with Facebook</Text>
                    <Text style={styles.SecondText}>Connect your account with Facebook</Text>

                    <TouchableOpacity style={styles.ContinueButton} onPress={handleContinueButton}>
                        <Text style={styles.ButtonText}>Continue with Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.CancelButton} onPress={handleCancelButton}>
                        <Text style={styles.ButtonText}>Cancel</Text>
                    </TouchableOpacity>

                
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Facebook;

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
        backgroundColor: '#FFE5EC',
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
        marginBottom: 120,
        textAlign: 'center'
    },
    SecondText: {
        fontSize: 17,
        color: '#E60965',
        bottom: 120,
        marginHorizontal: 50,
        alignContent: 'center'
    },
    ContinueButton: {
        backgroundColor: "#FFE5EC",
        borderColor: "#E60965", 
        borderWidth: 1, 
        paddingHorizontal: 50,
        paddingVertical: 10,
        marginBottom: 10,
        bottom: 50
    },
    CancelButton: {
        backgroundColor: "#FFE5EC",
        borderColor: "#E60965",
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 110,
        marginBottom: 10,
        bottom: 50
    },
    ButtonText: {
        color: "#E60965",
        fontSize: 20,
    },
});
