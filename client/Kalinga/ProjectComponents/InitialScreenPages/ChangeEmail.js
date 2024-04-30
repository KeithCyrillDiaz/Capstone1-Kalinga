import React from 'react';
import 
{ 
    Image, 
    Text, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    Platform, 
    StyleSheet, 
    ScrollView, } from 'react-native';
import { MaterialIcons} from '@expo/vector-icons'

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios'
import { BASED_URL } from '../../MyConstants';

const ChangeEmail = ({route}) => {

    console.log("params: ",route.params)
    screeningForm = route.params
    const navigation = useNavigation(); 

    const handleBackButton = () => {
        navigation.goBack(); 
    };

    const handleSendCode = async () => {
        console.log("ID: ",screeningForm.Applicant_ID)
        const result = await axios.post(`${BASED_URL}/kalinga/sendEmail/${screeningForm.Applicant_ID}`)
        console.log("result: ",result.data.messages.code)
        if(result.data.messages.code !== 0){
            console.log("Failed Sending Email");
            return result.data.messages.code
        }
    };

    const handleSubmitButton = () => {
        const result = handleSendCode();
        if(result === 0){
            navigation.navigate('EmailVerificationCode'); 
        } else {
            console.log("Failed Sending Email");
        }
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
                    <Text style={[styles.SecondText, {textAlign: "center"}]}>{`Hi! please click the button below to keep you updated in your ${screeningForm.userType} application. Put the code in the next page`}</Text>

                    <Image
                        source={require('../../assets/Email_verification.png')}style={styles.image}
                     />

                    <TouchableOpacity style={styles.SubmitButton} onPress={handleSubmitButton}>
                        <Text style={styles.SubmitButtonText}>Send</Text>
                    </TouchableOpacity>

                
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
        </LinearGradient>
    );
}

export default ChangeEmail;

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
        color: '#E60965',
        marginBottom: 80,
        textAlign: 'center'
    },
    SecondText: {
        fontSize: 17,
        color: '#E60965',
        bottom: 70,
        marginHorizontal: 42,
        alignContent: 'center'
    },
    SubmitButton: {
        backgroundColor: "#F94892",
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 50,
        marginBottom: 10,
        top: 100

    },
    SubmitButtonText: {
        color: "white",
        fontSize: 20,
    },
});
