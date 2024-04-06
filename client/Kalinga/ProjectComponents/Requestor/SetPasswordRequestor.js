import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, Alert, } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const SetPasswordDonor = () => {
    const [Password, setPassword] = useState(''); 
    const [confirmPass, setConfirmPass] = useState('')
    const navigation = useNavigation(); 

    const handleBackButton = () => {
        navigation.goBack(); 
    };

    const handleSendCode = () => {
        console.log("Send Code");
    };

    const applicantId = "2024-04-05-123456"
    const handleSubmitButton = async () => {

        if(Password !== confirmPass){
            Alert.alert('Passwords do not match. Please try again.');
            return
        }

        const tokenResponse = await axios.get()

        try{

            const response = await axios.post("http://192.168.1.104:7000/kalinga/registerDonor", Password);

            console.log('Data saved successfully:', response.data);


        } catch (error){

        } 

        

        navigation.navigate('LogIn'); 
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
                    <Text style={styles.FirstText}>Set Your Password</Text>

                    <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Input Password"
                        placeholderTextColor="#F94892"
                        onChangeText={setPassword}
                        value={Password}
                        secureTextEntry={true}
                    />
                    </View>

                    <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Passwod"
                        placeholderTextColor="#F94892"
                        onChangeText={setConfirmPass}
                        value={confirmPass}
                        secureTextEntry={true}
                    />
                    </View>


                    <TouchableOpacity style={styles.SubmitButton} onPress={handleSubmitButton}>
                        <Text style={styles.SubmitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
        </LinearGradient>
    );
}

export default SetPasswordDonor;

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
        color: '#F94892',
        marginBottom: 80,
        textAlign: 'center'
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
    inputContainer: {
        width: '80%',
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    input: { 
        height: 40,
        borderRadius: 15,
        backgroundColor: '#FFE5EC',
        marginBottom: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
        paddingLeft:10
    },
});
