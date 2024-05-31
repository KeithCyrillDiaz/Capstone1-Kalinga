import React, { useState, useEffect } from 'react';
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
import OtpInputEmail from '../InitialScreenPages/OtpInputEmail'; 
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios'
import { BASED_URL } from '../../MyConstants';
import { LoadingSpinner } from '../uploader/LoadingSpinner';
import { CheckToken } from './checktoken';
import { Uploading } from '../uploader/Uploading'
import { uploadDpInFirebase } from '../uploader/fireBaseUploader'
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from "@react-native-async-storage/async-storage";

const VerifyNewEmail = ({route}) => {

    const { userInformation, userName, token, selectedImage } = route.params
    const navigation = useNavigation(); 
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false)


    //uploaderModal
    const [progressBar, setProgressBar] = useState(0)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [imageUri, setIMageUri] = useState("")
    const [loaderLabel, setLoaderLabel] = useState("")

     //Hooks from firebase import
    const [axiosResponse, setAxiosResponse] = useState("")
    const [link, setLink] = useState("")
    const [imagePath, setImagePath] = useState("")
    const [resultDp, setResultDP] = useState({})

        const handleBackButton = () => {
        navigation.goBack(); 
    };
    

    const handleResendCode = async () => {
        try {
            const response = await axios.post(`${BASED_URL}/kalinga/sendVerifCodeNewEmail/${userInformation.email}`,null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            await CheckToken({navigation: navigation, message: response.data.messages.message})
            if(response.data.messages.code === 0){
                Alert.alert("Success", "A verification code has been sent to your email.");
            }
        } catch (error) {
          console.log("Error: ", error);
          setIsLoading(false)
          if (error.message.includes('Network')) {
            Alert.alert("Network Error", "Please check your internet connection and try again.");
          } else {
            Alert.alert("Error", "Failed to send the email. Please try again later.");
          }
        } finally {
            setIsLoading(false)
        }
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

            setIsLoading(true)
            const Valid = await axios.get(`${BASED_URL}/kalinga/checkCode/${code}`)
            setIsLoading(false)
            if(Valid.data.messages.code === 1){
                Alert.alert(
                    "Invalid Code",
                    "The code entered is incorrect. Please try again.",
                    [{ text: "OK", onPress: () => console.log("OK Pressed") }]
                );
                return
            } 
            Alert.alert(
                "Verified Email",
                "Congratulations, kindly press Okay to update your details",
                [{ text: "Okay", onPress: async () => await saveDetails()}]
            );
        }

        const saveDetails = async () => {
            try{
             
        
                setIsLoading(true)
                console.log("Updating user Information")
                const result = await axios.post(`${BASED_URL}/kalinga/updateUserInformation`,
                {
                    userData: userInformation
                },
                {
                    headers: {
                    Authorization: `Bearer ${token}`
                    }
                }
                )
                console.log(result.data.messages.message)
                await CheckToken({navigation: navigation, message: result.data.messages.message})
                console.log("Verified!")
                console.log("selectedImage: ", selectedImage)
                if(Object.keys(selectedImage).length !== 0)await uploadImage();
        
                else if("result: ", result.data.messages.code === 0){
                    await AsyncStorage.setItem('userInformation', JSON.stringify(result.data.result))
                    Alert.alert(
                        "Successfully Updated",
                        "User details have been successfully updated",
                        [{ text: "OK", onPress: async () => {
                            if(userInformation.userType === "Donor") navigation.replace(`DonorEditPersonalScreen`, {userInformation: userInformation, userName: userName, token: token})
                            else navigation.replace(`RequestorEditPersonalScreen`, {userInformation: userInformation, userName: userName, token: token})
                        }}]
                    );
                    
                } else {
                    console.log("Error: ", result.data.messages.message)
                    return
                } 
            } catch(error){
                navigation.goBack()
                console.log("Error: ", error)
            } finally {
                setIsLoading(false)
            }
        
        }

    const handleOtpChange = (newOtp) => {
        setOtp(newOtp);
        console.log(newOtp)
      };

    
      const uploadImage = async () => {
        try{
          console.log("setUploadingImage(true)")
          setUploadingImage(true)
          console.log("Number of properties in selectedImage: ", Object.keys(selectedImage).length);
      
                  if(Object.keys(selectedImage).length === 1){
      
                    const response = await axios.get(`${BASED_URL}/kalinga/verifyToken`, {
                      headers: {
                        Authorization: `Bearer ${token}`
                      }
                    });
                    if(response.data.messages.message === "Unauthorized User"){
                      setAxiosResponse(response.data.messages.message)
                      return
                    }
                  
                    for (const key in selectedImage) {
                      const imageData = selectedImage[key];
      
                     const result = await uploadDpInFirebase({
                        id: userInformation.userType === "Donor" ? userInformation.Donor_ID : userInformation.Requestor_ID,
                        userType: userInformation.userType,
                        nameOfUser: userInformation.fullName,
                        purpose: "DP",
                        URI: imageData.uri,
                        setImage: setIMageUri,
                        setLabel: setLoaderLabel,
                        percent: setProgressBar,
                        token: token,
                        setResponse: setAxiosResponse,
                        setLink: setLink,
                        setPath: setImagePath,
                      });
                      await AsyncStorage.setItem('userInformation', JSON.stringify(result))
                        Alert.alert(
                            "Successfully Updated",
                            "User details have been successfully updated",
                            [{ text: "OK", onPress: async () => {
                                if(userInformation.userType === "Donor") navigation.replace(`DonorEditPersonalScreen`, {userInformation: result, userName: userName, token: token})
                                else navigation.replace(`RequestorEditPersonalScreen`, {userInformation: result, userName: userName, token: token})
                            }}]
                        );
                    }
                    
                    return
                  }
        }catch (error){
          console.log("error: ", error)
        } finally {
          setUploadingImage(false)
        }
       }

       const storeDPInAsyncStorage = async () => {
        if(link === "" && imagePath === "") return
        console.log("storing DP details in Async")
        await AsyncStorage.setItem('DPLink', link)
        await AsyncStorage.setItem('Image_ID', imagePath)
     }

       useEffect(() => {
        storeDPInAsyncStorage()
      },[link])
     

    useEffect(() => {
        handleResendCode()
    },[])

    useEffect (() => {
        if(axiosResponse === "Unauthorized User") CheckToken({navigation: navigation, message: axiosResponse})
       },[axiosResponse])


    return (
        <LinearGradient
            colors={['#EF5487', '#EB90AC', '#E690AA', '#E36A91', '#EB7AA9']}
            style={styles.gradient}
        >
        <SafeAreaView style={styles.container}>
            {uploadingImage && (
                <Uploading 
                progress={progressBar} 
                Image={imageUri}
                label={loaderLabel}
                />
            )}
            <Spinner 
                visible = {isLoading}
                textContent={'Processing...'}
                textStyle={{ color: '#FFF' }}
            />
            <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
                <MaterialIcons name="arrow-back" size={28} color="white" />
                <Text style={styles.goBackText}>Go back</Text>
            </TouchableOpacity>
            <LoadingSpinner loading={isLoading}/>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.SecondContainer}
                >
                    <Text style={styles.FirstText}>Email Verification</Text>
                    <Text style={styles.SecondText}>Please enter the code that sent to</Text>
                    <Text style={styles.ThirdText}>{`${userInformation.email}`}</Text>

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

export default VerifyNewEmail;

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
        zIndex: 10
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
        backgroundColor: '#f5f5f5',
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
