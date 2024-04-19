import React, { useState } from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    TextInput, 
    StyleSheet, 
    SafeAreaView, 
    ScrollView, 
    KeyboardAvoidingView, 
    Platform,
    Alert
 } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios'
import { BASED_URL } from '../../MyConstants';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const LogIn = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isloading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false); 

    const handleForgotPassword = () => {
        navigation.navigate('ResetPassword');
    };
    const clearAsyncStorage = async () => {
        const keysToRemove = ['Applicant_ID', 'userType', 'isRegistered'];
        await AsyncStorage.multiRemove(keysToRemove);
      };

    const handleLogIn = async () => {
        // Check if email or password is empty
        if (!email.trim() || !password.trim()) {
            Alert.alert('Empty Fields', 'Please enter both email and password.');
            return;
        }
        const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (specialCharacters.test(password) || password.includes(' ')) {
            Alert.alert('Invalid Password', 'Passwords cannot contain special characters and spaces');
            return;
        }
        // Check for email format validity
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }
    
        // Proceed with login if inputs are valid
        try {
            setIsLoading(true)
            const result = await axios.post(`${BASED_URL}/kalinga/userLogin`, {
                email: email,
                password: password
            });
    
            if (result.data.messages.code !== 0) {
                Alert.alert('Login Failed', 'Invalid Password or Email');
                
            } else{
                const registeredUserType = result.data.userType;
                console.log("User is a " + registeredUserType);
                await AsyncStorage.setItem('userType', registeredUserType)
                let Applicant_ID = ""
                if(registeredUserType === "Donor"){
                    Applicant_ID = await AsyncStorage.getItem('DonorApplicant_ID')
                } else Applicant_ID = await AsyncStorage.getItem('RequestorApplicant_ID')
                
                if(Applicant_ID !== null || Applicant_ID !== undefined){
                await clearAsyncStorage();
                }
    
                // Reset navigation to MainTabs screen with user type parameter
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'MainTabs', params: { userType: registeredUserType } }],
                    })
                );
            }
        } catch (error) {
            // Handle error response from server
            console.error('Login Error:', error);
            Alert.alert('Login Failed', 'An error occurred while logging in. Please try again later.');
        } finally {
            setIsLoading(false)
        }
    };

    const handleGoogleIconClick = () => {
        navigation.navigate('EmailVerification');
    };

    const handleFbIconClick = () => {
        navigation.navigate('Facebook');
    };

    const navigatePage = (Page) =>{
        navigation.replace(Page)
    }

    return (
        <LinearGradient
            colors={['#EF5487', '#EB90AC', '#E690AA', '#E36A91', '#EB7AA9']}
            style={styles.gradient}
            
        >
            <Spinner 
                visible = {isloading}
                textContent={'Processing...'}
                textStyle={{ color: '#FFF' }}
            />
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
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
                    <Text style={styles.SubTitle}>Welcome Back!</Text>
                    <Text style={styles.LogInText}>Log In to your account</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        placeholderTextColor="#F94892"
                        onChangeText={setEmail}
                        value={email}
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
                    <TouchableOpacity onPress={handleForgotPassword}>
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
                        <Text style={styles.logInButtonText}>Log In</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress = {() => {navigatePage('GuestTabs')}}>
                    <Text style = {styles.guest}>Log In as Guest?</Text>
                </TouchableOpacity>

                <View style={styles.lineContainer}>
                    <View style={styles.line} />
                    <Text style={styles.lineText}>Or connect with</Text>
                    <View style={styles.line} />
                </View>

                <View style={styles.socialButtons}>
                    <TouchableOpacity onPress={handleGoogleIconClick}>
                        <Image
                            source={require('../../assets/Google_Icon.png')}
                            style={styles.socialImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleFbIconClick}>
                        <Image
                            source={require('../../assets/fb_Icon.png')}
                            style={styles.socialImage}
                        />
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

    guest: {
        textAlign: "center",
        marginTop: "2%",
        color: '#E60965',
        fontSize: 13,
        textDecorationLine: "underline"

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
        marginHorizontal: "17%",
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
        color: '#E60965',
    },
    buttonContainer: {
        marginTop: 10,
        alignItems: 'center',
        width: '100%',
    },
    forgotPassword: {
        color: '#E60965',
        fontSize: 12,
        marginTop: -10,
        textDecorationLine: "underline"
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
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        
    },
    line: {
        borderBottomColor: 'white',
        borderBottomWidth: 0.5,
        flex: 1,
    },
    lineText: {
        marginHorizontal: 10,
        color: 'white',
        fontSize: 16,
    },
    socialButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        
    },
    socialImage: {
        width: 30,
        height: 30,
        marginHorizontal: 10
       
    },
    createAccountContainer: {
        marginTop: 20, 
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    NewUser: {
        color: 'white',
        fontSize: 12,
        
       
    },
});
