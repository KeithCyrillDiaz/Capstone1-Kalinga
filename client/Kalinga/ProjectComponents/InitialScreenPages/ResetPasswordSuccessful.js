import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ResetPasswordSuccessful = () => {
    const navigation = useNavigation(); 

    const handleBackButton = () => {
        navigation.goBack(); 
    };

    const handleLogInButton = () => {
        navigation.navigate('LogIn'); 
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
                    <Text style={styles.FirstText}>Successful password reset!</Text>
                  
                    <View style={styles.iconContainer}>
                        <Image
                            source={require('../../assets/envelop_check.png')} 
                            style={styles.image}
                        />   
                    </View>
                    <Text style={styles.SecondText}>You can use now your new password to login to your account</Text>

                    <TouchableOpacity style={styles.LogInButton} onPress={handleLogInButton}>

                        <Text style={styles.LogInButtonText}>Log In</Text>
                    </TouchableOpacity>


                
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ResetPasswordSuccessful;

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
        marginHorizontal: 50,
        alignContent: 'center'
    },
    iconContainer:
    {
        bottom: 50
    },
    image: {
        bottom: 25, 
    },
    LogInButton: {
        backgroundColor: "#FFEECC",
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 50,
        marginBottom: 10,
        top: 40

    },
    LogInButtonText: {
        color: "#E60965",
        fontSize: 20,
    },
    HandleCode: {
        color: "white",
        fontSize: 15,
        marginBottom: 10,
        top: 100
    },
});
