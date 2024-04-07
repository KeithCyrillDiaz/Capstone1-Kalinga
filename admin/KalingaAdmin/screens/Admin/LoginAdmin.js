import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios'

const LogIn = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogIn = () => {


        navigation.navigate('AdminMenu');
    };



    

    return (
        <LinearGradient
            colors={['#EF5487', '#EB90AC', '#E690AA', '#E36A91', '#EB7AA9']}
            style={styles.gradient}
        >
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.SecondContainer}
                >
                <View style={styles.ImageContainer}>
                    <Image
                        source={require('../../assets/Kalinga_Logo.png')}
                        style={styles.image}
                    />
                    <Text style={styles.Title}>KALINGA</Text>
                    <Text style={styles.SubTitle}>Admin</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Username or Email Address"
                        placeholderTextColor="#F94892"
                        onChangeText={setEmail}
                        value={email}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#F94892"
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={true}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
                        <Text style={styles.logInButtonText}>Log In</Text>
                    </TouchableOpacity>
                </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
        </LinearGradient>
    );
};

export default LogIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradient: {
        flex: 1,
    },
    ImageContainer: {
        marginTop: 70,
    },
    image: {
      
    },
    Title: {
        fontSize: 40,
        color: '#E60965',
        textAlign: 'center', // Center the text horizontally
    },

    SubTitle: {
        fontSize: 25,
        color: '#E60965',
        textAlign: 'center', // Center the text horizontally
    },
    LogInText: {
        fontSize: 13,
        color: '#E60965',
        textAlign: 'center'
    },
    inputContainer: {
        width: '100%',
        marginTop: 10,
    },
    input: {
        width: '100%', 
        height: 40,
        borderRadius: 15,
        paddingHorizontal: 10,
        backgroundColor: '#FFE5EC',
        marginBottom: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    buttonContainer: {
        marginTop: 10,
        alignItems: 'center',
        width: '100%',
    },
    logInButton: {
        backgroundColor: '#E60965',
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 50,
        marginTop: 10,

        
    },
    logInButtonText: {
        color: 'white',
        fontSize: 20,
    },
   
       

});
