import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ResetPassword = () => {
    const navigation = useNavigation(); 

    const handleBackButton = () => {
        navigation.goBack(); 
    };

    const handleRememberPassword = () => {
        navigation.navigate('LogIn');
    };

    const handleSubmitButton = () => {
        navigation.navigate('ResetPasswordEmail'); 
    };

    const [Email, setEmail] = useState('');

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
                    <Text style={styles.FirstText}>Forgot Password</Text>
                    <Text style={styles.SecondText}>Email Address Here</Text>
                    <Text style={styles.ThirdText}>Enter the email address that connected to your account.</Text>

                    <View style={styles.iconContainer}>
                        <Icon name="envelope" size={120} color="white" />
                    </View>
                    <View style={styles.EmailInput}>
                        <TextInput
                        style={styles.TextInputStyle}
                        placeholder="Email"
                        placeholderTextColor="black"
                        onChangeText={setEmail}
                        value={Email}
                    />
                    </View>

                    <TouchableOpacity onPress={handleRememberPassword}>
                        <Text style={styles.RememberPasswordText}>Remember password? Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.SubmitButton} onPress={handleSubmitButton}>
                        <Text style={styles.SubmitButtonText}>Send</Text>
                    </TouchableOpacity>

                
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ResetPassword;

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
    iconContainer:
    {
        bottom: 50
    },
    EmailInput: {
        width: '80%',
        height: 35,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 10,
        bottom: '10%',
        backgroundColor: "white",
        shadowColor: 'black', 
        shadowOffset: { width: 0, height: 5 }, 
        shadowOpacity: 0.10,
        shadowRadius: 10, 
        elevation: 10, 
    },
    RememberPasswordText: {
        color: "white",
        fontSize: 12,
        marginBottom: 10,
        bottom: 30
    },
    SubmitButton: {
        backgroundColor: "#FFEECC",
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 50,
        marginBottom: 10,
        top: 80

    },
    SubmitButtonText: {
        color: "#E60965",
        fontSize: 20,
    },
});
