import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios'
import { BASED_URL } from '../../MyConstants';
import Spinner from 'react-native-loading-spinner-overlay';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import the icon
const LogIn = () => {

    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 
    let result;

    const handleLogIn = async () => {

  
        // Regular expression to check for special characters
        const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
        
        if(username === "" || password === "") {
            Alert.alert('Invalid Credentials', 'Please Enter Username or Password');
            return;
        }
        // Check if email contains special characters
        if (specialCharsRegex.test(username)) {
            Alert.alert('Invalid Email', 'Email cannot contain special characters');
            return;
        }
    
        // Check if password contains special characters
        if (specialCharsRegex.test(password)) {
            Alert.alert('Invalid Password', 'Password cannot contain special characters');
            return;
        }
    
        // Proceed with login request
        try {
            setIsLoading(true);
            const LogIn = await axios.post(`${BASED_URL}/kalinga/adminLoginIn`, {username, password});

            if (LogIn.status === 200) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'AdminMenu' }],
                    })
                );
            } 
        } catch (error) {
                Alert.alert('Login Failed', 'Invalid email or password');
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <LinearGradient
            colors={['#EF5487', '#EB90AC', '#E690AA', '#E36A91', '#EB7AA9']}
            style={styles.gradient}
        >
            <SafeAreaView style={styles.container}>
                <Spinner
                    visible={isLoading} // Show spinner when isLoading is true
                    textContent={'Processing...'}
                    textStyle={{ color: '#FFF' }}
                />
                <ScrollView contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator = {false}
                >
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
                        placeholder="Username"
                        placeholderTextColor="#F94892"
                        onChangeText={setUsername}
                        value={username}
                    />
                     <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#F94892"
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry={!showPassword} // Show password if showPassword is true
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.togglePassword}>
                            <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#E60965" />
                        </TouchableOpacity>
                     </View>
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
    passwordContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center', 
        marginBottom: 10, 
    },
    togglePassword: {
        position: 'absolute', 
        bottom: 18,
        right: 10, 
    },
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
      alignSelf: "center"
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
        marginTop: 10,
        marginHorizontal: "17%",
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
        color: "#E60965"
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
