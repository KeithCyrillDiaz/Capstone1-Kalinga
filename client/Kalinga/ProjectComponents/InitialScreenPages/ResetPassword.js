import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    Platform, 
    StyleSheet, 
    ScrollView,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios'
import { BASED_URL } from '../../MyConstants';
const ResetPassword = () => {
    const navigation = useNavigation(); 

    const handleBackButton = () => {
        navigation.goBack(); 
    };

    const handleRememberPassword = () => {
        navigation.navigate('LogIn');
    };

    const handleSubmitButton = async () => {
        // Check if email is empty or not in the correct format
        if(Email === ''){
            Alert.alert('Invalid Input', 'Pleaser enter your email address')
            return
        }
        if (!validateEmail(Email)) {
            if(Email.includes(' ')){
                Alert.alert('Invalid Input', 'Email must not include spaces')
                return
            }
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }
        try{
            navigation.navigate('ResetPasswordCode', {email: Email}); 
            const result = await axios.get(`${BASED_URL}/kalinga/sendCode/${Email}`)
            console.log(result.data.messages.message)
            if(result.data.messages.code !== 0){
                Alert.alert("Email Send Failed ", `${result.data.messages.message}`)
                return
            }

                
        } catch(error) {
            if(error)Alert.alert('Network error', `Please check your internet connection`)
            else
            Alert.alert('Something went wrong', "Please try again later")
        }
    };

    // Regular expression to validate email format
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const [Email, setEmail] = useState('');

    return (
        <LinearGradient
        colors={['#EF5487', '#EB90AC', '#E690AA', '#E36A91', '#EB7AA9']}
        style={{flex: 1}}
        >
        <SafeAreaView style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : null}
                            style={styles.SecondContainer}
                        >
                            <Text style={styles.FirstText}>Forgot Password</Text>
                            <Text style={styles.SecondText}>Email Address Here</Text>
                            <Text style={styles.ThirdText}>Enter the email address that connected to your account.</Text>

                            <View style={styles.iconContainer}>
                                <Icon name="envelope" size={120} color="#F94892" />
                            </View>
                            <View style={styles.EmailInput}>
                                <TextInput
                                style={styles.TextInputStyle}
                                placeholder="Email"
                                placeholderTextColor="#F94892"
                                onChangeText={setEmail}
                                value={Email}
                            />
                            </View>

                            <View style= {{flexDirection: "row", alignItems: "center", bottom: "10%"}}>
                                <Text style={styles.RememberPasswordText}>Remember password?</Text>
                                <TouchableOpacity onPress={handleRememberPassword}><Text style = {[styles.RememberPasswordText, {marginLeft: 5, textDecorationLine: "underline"}]}>Login</Text></TouchableOpacity>
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

export default ResetPassword;

const styles = StyleSheet.create({
    TextInputStyle: {
        color: "#E60965"
    },
    container: {
        flex: 1,
        backgroundColor: '#EF5487',
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
        fontSize: 35,
        color: '#F94892',
        marginBottom: 80,
        textAlign: 'center'
    },
    SecondText: {
        fontSize: 18,
        color: '#F94892',
        bottom: 70,
        marginHorizontal: 42,
        alignContent: 'center'
    },
    ThirdText: {
        fontSize: 12,
        color: '#F94892',
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
        height: 45,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#F94892',
        paddingHorizontal: 10,
        paddingVertical: 10,
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
        color: "#F94892",
        fontSize: 12,
    },
    SubmitButton: {
        backgroundColor: "#F94892",
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 50,
        marginBottom: 10,
        top: 40

    },
    SubmitButtonText: {
        color: "white",
        fontSize: 20,
        fontFamily: "Open-Sans-Bold"
    },
});
