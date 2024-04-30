import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Linking, StyleSheet, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios'
import { BASED_URL } from '../../../../MyConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SetPasswordDonor = ({route}) => {
   
    console.log("email: ", route.params.email)
    let forgotPassEmail = route.params.email;
    console.log("forgotPassEmail: ", forgotPassEmail)
    let passApplicant_ID = route.params.Applicant_ID
    console.log("passApplicant_ID: ", passApplicant_ID)
    let passUserType = route.params.userType
    console.log("passUserType: ", passUserType)
    const [Password, setPassword] = useState('');    
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true); // State to toggle password visibility
    const [Applicant_ID, setApplicant_ID] = useState('');  
    const navigation = useNavigation(); 

    const handleBackButton = () => {
        navigation.goBack(); 
    };
    const clearAsyncStorage = async (Applicant_ID) => {
        console.log("ID to be cleared: ", Applicant_ID)
        const keysToRemove = [Applicant_ID, 'userType', 'isRegistered'];
        await AsyncStorage.multiRemove(keysToRemove);
        let otherApplicant_ID;
        const RequestorApplicant_ID = await AsyncStorage.getItem('RequestorApplicant_ID')
        const DonorApplicant_ID = await AsyncStorage.getItem('DonorApplicant_ID')
        if (RequestorApplicant_ID === null && DonorApplicant_ID === null) {
           const Pending =  await AsyncStorage.setItem('Pending', 'false');
           console.log("setPending: ", Pending)
        }
      }

      const handleSubmitButton = async () => {
        const invalidCharacters = /[^a-zA-Z0-9]/;
        if(!Applicant_ID  && forgotPassEmail === null){
            Alert.alert('Invalid Applicant ID', 'Please enter your Applicant ID.');
            return;
        }
        if(!Applicant_ID && forgotPassEmail === null){
            if(Applicant_ID.includes(' ') && forgotPassEmail === null){
                console.log("test")
                Alert.alert('Invalid Applicant ID', 'Applicant_ID cannot contain spaces.');
                return;
            }
        }
       
        if(invalidCharacters.test(Applicant_ID) && forgotPassEmail === null){
            Alert.alert('Invalid Applicant ID', 'Applicant ID must not contain special characters.');
            return;
        }
 


        if(!Password){
            Alert.alert('Invalid Password', 'Please enter your password. Password cannot be empty.');
            return;
        }
        if(Password.length < 8){
            Alert.alert('Password Too Short', 'Your password must be at least 8 characters long. Please enter a longer password.');
            return;
        }
        if (Password !== confirmPassword) {
            Alert.alert('Passwords do not match', 'Please make sure your passwords match.');
            return;
        }

        if(!passApplicant_ID)setApplicant_ID(passApplicant_ID) // for approved user who forgot their passwords
        const result = await axios.post(`${BASED_URL}/kalinga/setPassword`, {
            Applicant_ID: Applicant_ID,
            password: Password,
            email: forgotPassEmail,
        });
        console.log("result.data.messages.code: ", result.data.messages.code)
        if(result.data.messages.code === 1){
            Alert.alert("Set Password Failed", `${result.data.messages.message}`)
            return
        }
        else if (result.data.messages.code === 0) {
            const Pending = await AsyncStorage.getItem('Pending')
            if(Pending === "True"){
                console.log("Pending: ",Pending)
                if(passUserType === "Donor"){
                    await clearAsyncStorage('DonorApplicant_ID')
                }
                else{
                    await clearAsyncStorage('RequestorApplicant_ID')
                }
            }
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'LogIn' }],
                })
            );
        }
      }

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
                <View
                    style={styles.SecondContainer}
                >
                    <Text style={styles.FirstText}>Set Your Password</Text>

                    <View style={styles.inputContainer}>
                {forgotPassEmail === null && (
                    <TextInput
                    style={styles.input}
                    placeholder="Input Applicant ID "
                    placeholderTextColor="#F94892"
                    onChangeText={setApplicant_ID}
                    value={Applicant_ID}
                    />
                )}
                     <View style={styles.passwordInput1}>
                        <TextInput
                            style={styles.input}
                            placeholder="Input Password"
                            placeholderTextColor="#F94892"
                            onChangeText={setPassword}
                            value={Password}
                            secureTextEntry={hidePassword} // Toggle password visibility
                        />
                        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} style={styles.passwordToggle}>
                            <MaterialIcons name={hidePassword ? 'visibility-off' : 'visibility'} size={24} color="#F94892" />
                        </TouchableOpacity>
                    </View>
                   <View style={styles.passwordInput}>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            placeholderTextColor="#F94892"
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                            secureTextEntry={hidePassword} // Toggle password visibility
                        />
                        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} style={styles.passwordToggle}>
                            <MaterialIcons name={hidePassword ? 'visibility-off' : 'visibility'} size={24} color="#F94892" />
                        </TouchableOpacity>
                    </View>
                   

                    </View>
                    <TouchableOpacity style={styles.SubmitButton} onPress={handleSubmitButton}>
                        <Text style={styles.SubmitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            
  
        </SafeAreaView>
        </LinearGradient>
    );
}

export default SetPasswordDonor;

const styles = StyleSheet.create({

    passwordInput: {
        position: 'relative',
        marginBottom: '10%',
    },
    passwordInput1: {
        position: 'relative',
    },
    passwordToggle: {
        position: 'absolute',
        right: 10,
        top: '40%',
        transform: [{ translateY: -12 }],
    },
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
        paddingLeft:10,
        color: "#E60965"
    },

    input1: { 
        height: 40,
        borderRadius: 15,
        backgroundColor: '#FFE5EC',
        marginBottom: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
        paddingLeft:10,
        color: "#E60965"
    },
});
