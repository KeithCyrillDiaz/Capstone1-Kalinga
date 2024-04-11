
import React, {useState, useEffect} from 'react';
import * as Font from 'expo-font';
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { EXPO_IP_ADDRESS, REACT_NATIVE_EXPO_IP_ADDRESS} from '@env'
import Config from 'react-native-config'

import MedicalHistory from './screens/Admin/ScreeningForm/Donor/MedicalHistory.js'
import AdminMedicalHistory2 from './screens/Admin/ScreeningForm/Donor/AdminMedicalHistory2.js'
import DonorInitialScreeningFormPage1 from './screens/Admin/ScreeningForm/Donor/DonorInitialScreeningFormPage1.js'
import DonorInitialScreeningFormPage2 from './screens/Admin/ScreeningForm/Donor/DonorInitialScreeningFormPage2.js'
import DonorInitialScreeningFormPage3 from './screens/Admin/ScreeningForm/Donor/DonorInitialScreeningFormPage3.js'
import DonorInitialScreeningFormPage4 from './screens/Admin/ScreeningForm/Donor/DonorInitialScreeningFormPage4.js'
import AdminApprovedDonor from './screens/Admin/ScreeningForm/Donor/AdminApprovedDonor.js'
import AdminDeclinedDonor from './screens/Admin/ScreeningForm/Donor/AdminDeclinedDonor.js'

import LoginAdmin from './screens/Admin/LoginAdmin';
import AdminMenu from './screens/Admin/AdminMenu';
//import Header from './screens/Admin/header';
import AdminDashboard from './screens/Admin/AdminDashboard';
import AdminUser from './screens/Admin/AdminUser';
import AdminMilkbanks from './screens/Admin/AdminMilkbanks';
import DonorUserVerification from './screens/Admin/ScreeningForm/Donor/DonorUserVerification.js'; 
import DonorUploadAdmin from './screens/Admin/ScreeningForm/Donor/DonorUploadAdmin.js';   //<Stack.Screen name="RequestorVerification" component={RequestorVerification} />
//import RequestorVerification from './screens/Admin/RequestorVerification'; 
import DonorAppointmentConfirmation from './screens/Admin/ScreeningForm/Donor/DonorAppointmentConfirmation.js';
import RequestorRequestConfirmation from './screens/Admin/ScreeningForm/Requestor/RequestorRequestConfirmation.js'

import RequestorInitialScreeningFormPage1 from './screens/Admin/ScreeningForm/Requestor/RequestorInitialScreeningFormPage1.js'
import RequestorUserVerification from './screens/Admin/ScreeningForm/Requestor/RequestorUserVerification.js';   //<Stack.Screen name="RequestorVerification" component={RequestorVerification} />
import AdminApprovedRequestor from './screens/Admin/ScreeningForm/Requestor/AdminApprovedRequestor.js'
import AdminDeclinedRequestor from './screens/Admin/ScreeningForm/Requestor/AdminDeclinedRequestor.js'


const getFonts = async () => {
  await Font.loadAsync({
    'Open-Sans-Bold': require('./assets/Fonts/OpenSans_Condensed-Bold.ttf'),
    'Open-Sans-Regular': require('./assets/Fonts/OpenSans_Condensed-Regular.ttf'),
    'Kurale': require('./assets/Fonts/Kurale-Regular.ttf'),
    'Inter-Bold': require('./assets/Fonts/Inter-Bold.ttf'),
    'Inter-Regular': require('./assets/Fonts/Inter-Regular.ttf'),
    'OpenSans_Condensed-Bold': require('./assets/Fonts/OpenSans_Condensed-Bold.ttf'),
    'OpenSans_Condensed-Regular': require('./assets/Fonts/OpenSans_Condensed-Regular.ttf'),
    'OpenSans-Regular': require('./assets/Fonts/OpenSans-Regular.ttf'),
    'Open-Sans-SemiBold': require('./assets/Fonts/OpenSans-SemiBold.ttf'),
    'Open-Sans-Light': require('./assets/Fonts/OpenSans-Light.ttf'),
    'Inter-Regular': require('./assets/Fonts/Inter-Regular.ttf'),
  });
};

export default function App() {
 
  const [fontsLoaded,  setFontsLoaded] = useState(false);

  useEffect(() => {
    const expoIpAddress = Config.EXPO_IP_ADDRESS;
    if(expoIpAddress === undefined){
      console.log("empty")
    } else  console.log("expo ", expoIpAddress)
    console.log("ip COnfig", Config.TEST)
    async function loadFonts() {
      await getFonts();
      setFontsLoaded(true); 
    
    }
    loadFonts();
  }, []);

  if (fontsLoaded) {
    const Stack = createStackNavigator();
    return (
      
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginAdmin" screenOptions={{ headerShown: false }}>

             {/*Admin*/}
             {/* <Stack.Screen name="Medical Abstract" component={MedicalAbstract} />
             <Stack.Screen name="Reason For Requesting" component={ReasonForRequesting} /> */}
             <Stack.Screen name="LoginAdmin" component={LoginAdmin} />
             <Stack.Screen name="DonorUserVerification" component={DonorUserVerification} />
             <Stack.Screen name="AdminMenu" component={AdminMenu} />
             <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
             <Stack.Screen name="AdminUser" component={AdminUser} />
             <Stack.Screen name="AdminMilkbanks" component={AdminMilkbanks} />
             <Stack.Screen name="DonorInitialScreeningFormPage1" component={DonorInitialScreeningFormPage1} />
             <Stack.Screen name="DonorInitialScreeningFormPage2" component={DonorInitialScreeningFormPage2} />
             <Stack.Screen name="DonorInitialScreeningFormPage3" component={DonorInitialScreeningFormPage3} />
             <Stack.Screen name="DonorInitialScreeningFormPage4" component={DonorInitialScreeningFormPage4} />
             <Stack.Screen name="AdminMedicalHistory2" component={AdminMedicalHistory2} />
             <Stack.Screen name="DonorUploadAdmin" component={DonorUploadAdmin} />
             <Stack.Screen name="DonorAppointmentConfirmation" component={DonorAppointmentConfirmation} />
             <Stack.Screen name="AdminApprovedDonor" component={AdminApprovedDonor}/>
             <Stack.Screen name="AdminDeclinedDonor" component={AdminDeclinedDonor}/>



             <Stack.Screen name="RequestorRequestConfirmation" component={RequestorRequestConfirmation} />
             <Stack.Screen name="RequestorInitialScreeningFormPage1" component={RequestorInitialScreeningFormPage1} />
             <Stack.Screen name="RequestorUserVerification" component={RequestorUserVerification} />
             <Stack.Screen name="AdminApprovedRequestor" component={AdminApprovedRequestor}/>
             <Stack.Screen name="AdminDeclinedRequestor" component={AdminDeclinedRequestor}/>
      


            </Stack.Navigator>
        </NavigationContainer>
      
    ) 
  
  } else {
    return null; 
  }

}



