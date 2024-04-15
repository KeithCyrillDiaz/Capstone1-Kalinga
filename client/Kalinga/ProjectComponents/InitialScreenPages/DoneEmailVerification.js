import React, { useState } from 'react';
import { Image,View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';



const DoneEmailVerification = () => {
    const navigation = useNavigation(); 

    const handleHomeButton = () => {
        navigation.navigate('DonorApproved'); 
    };

    return (
        <LinearGradient
            colors={['#EF5487', '#EB90AC', '#E690AA', '#E36A91', '#EB7AA9']}
            style={styles.gradient}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Octicons name="verified" size={150} color="#FFF8EB" />
                </View>
                <Text style={styles.text}>Done Email Verification</Text>
                <Text style={styles.text}>Your account has been verified successfully!</Text>
                <TouchableOpacity style={styles.button} onPress={handleHomeButton}>
                    <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </LinearGradient>
    );
}

export default DoneEmailVerification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        marginHorizontal: 50,
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#F94892",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 50,
        marginBottom: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
    },
});
