import React, { useState } from 'react';
import { Image,View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';



const DoneEmailVerification = () => {
    const navigation = useNavigation(); 

    const handleBackButton = () => {
        navigation.goBack(); 
    };


    const handleHomeButton = () => {
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
            <View style={styles.imageContainer}>
            <Octicons name="verified" size={150} color="#FFF8EB" />
            </View>
            <Text style={styles.FirstText}>Done Email Verification</Text>
            <Text style={styles.SecondText}>Your account has been verified successfully!</Text>

            <TouchableOpacity style={styles.HomeButton} onPress={handleHomeButton}>
                        <Text style={styles.HomeButtonText}>Home</Text>
            </TouchableOpacity>
        </SafeAreaView>
        </LinearGradient>
    );
}

export default DoneEmailVerification;

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
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150
    },
    Image:
    {
        height: 100,
        width: 100
    },
    FirstText: {
        marginHorizontal: 50,
        fontSize: 25,
        color: 'white',
        marginTop: 30,
        textAlign: 'center'
    },
    SecondText: {
        fontSize: 15,
        color: 'white',
        top:10,
        marginHorizontal: 55,
        alignContent: 'center'
    },
    ThirdText: {
        fontSize: 15,
        color: 'white',
        bottom: 150,
        marginHorizontal: 50,
        alignContent: 'center'
    },
    HomeButton: {
        backgroundColor: "#F94892",
        marginHorizontal: 130,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 50,
        marginBottom: 20,
        top: 100
    },
    HomeButtonText: {
        color: "white",
        fontSize: 20,
        justifyContent: 'center'
    },
});
