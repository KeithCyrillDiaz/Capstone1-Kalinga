import React, { useState } from 'react';
import 
{ 
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
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OtpInputEmail from './OtpInputEmail'; 
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios'
import { BASED_URL } from '../../MyConstants';

const EmailVerificationCode = ({route}) => {

    const screeningForm = route.params.data
    console.log("screeningform: ", route.params.data)
    const navigation = useNavigation(); 
    const [otp, setOtp] = useState('');

    const handleBackButton = () => {
        navigation.goBack(); 
    };

    const handleResendCode = async () => {

        await axios.post(`${BASED_URL}/kalinga/sendEmail/${screeningForm.Applicant_ID}`)
    };

    const codeValidation = async (code) => {
        console.log("Otp: ", code)
        if (code.length !== 6) {
            // Display an alert for invalid code
            Alert.alert(
                "Invalid Code",
                "Please enter a 6-digit code.",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            );
            return;
        }
        const Valid = await axios.get(`${BASED_URL}/kalinga/checkCode/${code}`)
        if(Valid.data.messages.code === 0){
            console.log("Verified!")
            navigation.dispatch(
                CommonActions.reset({
                  index: 0, //Reset the stack to 0 so the user cannot go back
                  routes: [{ name: "DoneEmailVerification"} ], // Replace 'Login' with the name of your login screen
                })
              );
        }
    }
    const handleOtpChange = (newOtp) => {
        setOtp(newOtp);
        console.log(newOtp)
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
                    <Text style={styles.FirstText}>Email Verification</Text>
                    <Text style={styles.SecondText}>Please enter the code that sent to</Text>
                    <Text style={styles.ThirdText}>{`${screeningForm.email}`}</Text>

                    <OtpInputEmail onOtpChange={handleOtpChange} />

                        <TouchableOpacity style = {{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.NoCode]}>
                                No code receive?{' '}
                            </Text>
                            <TouchableOpacity onPress={handleResendCode}>
                                <Text style={{ textDecorationLine: 'underline', color: '#E60965'}}>Resend code here</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                       
    
                    <TouchableOpacity style={styles.SendButton} onPress={() => codeValidation(otp)}>
                        <Text style={styles.SendButtonText}>Send</Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
        </LinearGradient>
    );
}

export default EmailVerificationCode;

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
        justifyContent: 'start',
        alignItems: 'center',
        height: '100%',
        marginTop:90,
        paddingVertical: "20%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    FirstText: {
        marginHorizontal: 50,
        fontSize: 30,
        marginBottom: "2%",
        color: '#E60965',
        textAlign: 'center'
    },
    SecondText: {
        fontSize: 15,
        color: '#E60965',
        marginHorizontal: 50,
        alignContent: 'center'
    },
    ThirdText: {
        fontSize: 15,
        color: '#E60965',
        marginBottom: "20%",
        marginHorizontal: 50,
        alignContent: 'center'
    },
    NoCode:
    {
        fontSize: 15,
        color: '#E60965',
        alignContent: 'center',
        justifyContent: 'center'
    },
    SendButton: {
        backgroundColor: "#E60965",
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 50,
        marginBottom: 20,
        top: 100
    },
    SendButtonText: {
        color: "white",
        fontSize: 20,
    },
});
