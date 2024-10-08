
import React, {useState, useEffect} from 'react';
import * as Font from 'expo-font';
import { Linking } from 'react-native';
import { NavigationContainer, StackActions, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { UserLocationContext } from './Context/UserLocationContext.js';



//InitialScreenPages
import SplashScreen from './ProjectComponents/InitialScreenPages/splashscreen';
import Onboarding from './ProjectComponents/InitialScreenPages/Onboarding';
import GetStarted from './ProjectComponents/InitialScreenPages/GetStarted';
import LogIn from './ProjectComponents/InitialScreenPages/LogIn';
import SendCode from './ProjectComponents/InitialScreenPages//SendCode';
import MobileNumber from './ProjectComponents/InitialScreenPages/MobileNumber';
import MobileNumberExpired from './ProjectComponents/InitialScreenPages/MobileNumberExpired';
import EmailVerification from './ProjectComponents/InitialScreenPages/EmailVerification';
import ChangeEmail from './ProjectComponents/InitialScreenPages/ChangeEmail.js';
import EmailVerificationCode from './ProjectComponents/InitialScreenPages/EmailVerificationCode';
import DoneEmailVerification from './ProjectComponents/InitialScreenPages/DoneEmailVerification';
import Facebook from './ProjectComponents/InitialScreenPages/Facebook';
import ResetPassword from './ProjectComponents/InitialScreenPages/ResetPassword';
import ResetPasswordEmail from './ProjectComponents/InitialScreenPages/ResetPasswordEmail';
import ResetPasswordCode from './ProjectComponents/InitialScreenPages/ResetPasswordCode.js';
import ResetPasswordSuccessful from './ProjectComponents/InitialScreenPages/ResetPasswordSuccessful';
import FacebookContinue from './ProjectComponents/InitialScreenPages/FacebookContinue';


//Guest
//import ApplyAsDonor from './screens/Guest/Apply_As_Donor/Approved.js'
//import Approved from './screens/Guest/Apply_As_Requestor/Approved.js' <Stack.Screen name="Approved" component={Approved} />
import DonorApproved from './ProjectComponents/Guest/Profile/ApplyDonor/DonorApproved.js'  
import RequestorApproved from './ProjectComponents/Guest/Profile/ApplyRequestor/RequestorApproved.js'
// import ApprovalMessage from './ProjectComponents/Guest/Profile/ApplyRequestor/ApprovalMessage.js'
// import MedicalAbstract from './ProjectComponents/Guest/Profile/ApplyRequestor/MedicalAbstract.js'
// import ReasonForRequesting from './ProjectComponents/Guest/Profile/ApplyRequestor/ReasonForRequesting.js'
// import ScreeningForm from './ProjectComponents/Guest/Profile/ApplyRequestor/ScreeningForm.js'
import GuestEducContents from './ProjectComponents/Guest/Home/EducContents.js'
import GuestEducLibrary from './ProjectComponents/Guest/Home/EducLibrary.js'
import InstantMess from './ProjectComponents/Guest/Home/InstantMess.js'
import GuestExplore from './ProjectComponents/Guest/GuestDashboard/NewExplore/GuestExplore.js'
import GuestHome from './ProjectComponents/Guest/GuestDashboard/GuestHome.js'
import GuestProfile from './ProjectComponents/Guest/GuestDashboard/GuestProfile.js'
import ApplyAsDonorStack from './ProjectComponents/Guest/Profile/ApplyDonor/ApplyAsDonorStack.js';
import ApplyAsRequestorStack from './ProjectComponents/Guest/Profile/ApplyRequestor/ApplyAsRequestorStack.js'



//Donor
import DonorForum from './ProjectComponents/Donor/Home/Forum/ForumPage.js'
import ChatAssistance from './ProjectComponents/Donor/Home/InstantMessaging/ChatAssistance.js'
import DonorEducContents from './ProjectComponents/Donor/Home/EducLibrary/EducContents.js'
import DonorEducLibrary from './ProjectComponents/Donor/Home/EducLibrary/EducLibrary.js'
import CompleteDonations from './ProjectComponents/Donor/Home/MyDonations/CompletedDonations.js'
// import MyDonationTabs from './ProjectComponents/Donor/Home/MyDonations/MyDonationsTabs.js'
import MyDonationTabs from './ProjectComponents/Donor/Home/MyDonations/Donation.js'
import MyDonations from './ProjectComponents/Donor/Home/MyDonations/MyDonations.js'
import OngoingDonations from './ProjectComponents/Donor/Home/MyDonations/OngoingDonations.js'
import DonorSavedArticles from './ProjectComponents/Donor/Profile/SaveArticles/DonorSavedArticles.js'
import DonorFavoriteArticles from './ProjectComponents/Donor/Profile/SaveArticles/DonorFavoriteArticles.js'
import SetAnAppointment from './ProjectComponents/Donor/Home/MakeDonation/SetAppointForm.js'
import DonorHome from './ProjectComponents/Donor/Dashboard/Home.js'
import DonorNotifications from './ProjectComponents/Donor/Dashboard/Notifications.js'
import DonorProfile from './ProjectComponents/Donor/Dashboard/DonorProfile.js'
import DonorSettingScreen from './ProjectComponents/Donor/Profile/DonorSettngs/DonorSettingScreen.js'
import DonorAboutUs from './ProjectComponents/Donor/Profile/DonorSettngs/DonorAboutUs.js'
import DonorChangePassword from './ProjectComponents/Donor/Profile/DonorSettngs/DonorChangePassword.js'
import DonorEditPersonalScreen from './ProjectComponents/Donor/Profile/DonorSettngs/DonorEditPersonalScreen.js'
import DonorHelpAndSupport from './ProjectComponents/Donor/Profile/DonorSettngs/DonorHelpAndSupport.js'
import DonorHelpAndSupportSuccess from './ProjectComponents/Donor/Profile/DonorSettngs/DonorHelpAndSupportSuccess.js'
import DonorLocationScreen from './ProjectComponents/Donor/Profile/DonorSettngs/DonorLocationScreen.js'
import DonorNotification from './ProjectComponents/Donor/Profile/DonorSettngs/DonorNotification.js'
import DonorPersonalInfoScreen from './ProjectComponents/Donor/Profile/DonorSettngs/DonorPersonalInfoScreen.js'
import DonorReportBug from './ProjectComponents/Donor/Profile/DonorSettngs/DonorReportBug.js'
import DonorReportBugSuccess from './ProjectComponents/Donor/Profile/DonorSettngs/DonorReportBugSuccess.js'
import DonorSendFeedback from './ProjectComponents/Donor/Profile/DonorSettngs/DonorSendFeedback.js'
import DonorSendFeedbackFailed from './ProjectComponents/Donor/Profile/DonorSettngs/DonorSendFeedbackFailed.js'
import DonorSendFeedbackSuccess from './ProjectComponents/Donor/Profile/DonorSettngs/DonorSendFeedbackSuccess.js'
// import SetPasswordDonor from './ProjectComponents/Donor/SetPasswordDonor.js';
import SetPasswordDonor from './ProjectComponents/Guest/Profile/ApplyDonor/SetPasswordDonor.js';
import SetDateTimeLocation from './ProjectComponents/Donor/Home/MakeDonation/SetDateTimeLocation.js'
import AppointmentConfirmation from './ProjectComponents/Donor/Home/MakeDonation/AppointmentConfirmation.js'
import DonorHelpAndSupportMessage from './ProjectComponents/Donor/Profile/DonorSettngs/DonorHelpAndSupportMessage.js'
import AppointmentConfirmationMessage from './ProjectComponents/Donor/Home/MakeDonation/AppointmentConfirmationMessage.js';
import ValidUserExplore from './ProjectComponents/Donor/Dashboard/ValidUserExporeFInal/ValidUserExplore.js'
import AppointmentUploads from './ProjectComponents/Donor/Home/MakeDonation/AppointmentUploads.js'
import VerifyNewEmail from './ProjectComponents/Authorization/VerifyNewEmail.js'


{/* Requestor */}
import RequestorForum from './ProjectComponents/Requestor/Home/Forum/RequestorForumPage.js'
import RequestorChatAssistance from './ProjectComponents/Requestor/Home/InstantMessaging/RequestorChatAssistance'
import RequestorEducContents from './ProjectComponents/Requestor/Home/EducLibrary/RequestorEducContents.js'
import RequestorEducLibrary from './ProjectComponents/Requestor/Home/EducLibrary/RequestorEducLibrary.js'
import MakeRequest from './ProjectComponents/Requestor/Home/MakeRequest/MakeRequest.js'
import MakeRequest2 from './ProjectComponents/Requestor/Home/MakeRequest/MakeRequest2'
import RequestorSettingScreen from './ProjectComponents/Requestor/Profile/ReqSetting/RequestorSettingScreen'
import RequestorAboutUs from './ProjectComponents/Requestor/Profile/ReqSetting/RequestorAboutUs'
import RequestorChangePassword from './ProjectComponents/Requestor/Profile/ReqSetting/RequestorChangePassword'
import RequestorEditPersonalScreen from './ProjectComponents/Requestor/Profile/ReqSetting/RequestorEditPersonalScreen.js'
import RequestorHelpAndSupport from './ProjectComponents/Requestor/Profile/ReqSetting/RequestorHelpAndSupport.js'
import RequestorHelpAndSupportMessage from './ProjectComponents/Requestor/Profile/ReqSetting/RequestorHelpAndSupportMessage.js'
import RequestorHelpAndSupportSuccess from './ProjectComponents/Requestor/Profile/ReqSetting/RequestorHelpAndSupportSuccess.js'
import RequestorLocationScreen from './ProjectComponents/Requestor/Profile/ReqSetting/RequestorLocationScreen.js'
import RequestorNotification from './ProjectComponents/Requestor/Profile/ReqSetting/RequestorNotification.js'
import RequestorPersonalInfoScreen from './ProjectComponents/Requestor/Profile/ReqSetting/RequestorPersonalInfoScreen.js'
import RequestorReportBug from './ProjectComponents/Requestor/Profile/ReqSetting/RequestorReportBug.js'
import RequestorReportBugSuccess from './ProjectComponents/Requestor/Profile/ReqSetting/RequestorReportBugSuccess.js'
import RequestorSendFeedback from './ProjectComponents/Requestor/Profile/ReqSetting/RequestorSendFeedback.js'
import RequestorSendFeedbackFailed from './ProjectComponents/Requestor/Profile/ReqSetting/RequestorSendFeedbackFailed.js'
import RequestorSendFeedbackSuccess from './ProjectComponents/Requestor/Profile/ReqSetting/RequestorSendFeedbackSuccess.js'
import RequestorSavedArticles from './ProjectComponents/Requestor/Profile/SaveArticles/RequestorSavedArticles.js'
import RequestorFavoriteArticles from './ProjectComponents/Requestor/Profile/SaveArticles/RequestorFavoriteArticles.js'
import ApprovedMessageRequest from './ProjectComponents/Requestor/Home/MyRequest/ApprovedMessageRequest.js';
import ApprovedTabRequest from './ProjectComponents/Requestor/Home/MyRequest/ApprovedTabRequest.js';
import RequestorProfile from './ProjectComponents/Requestor/Dashboard/Profile.js'
import MakeRequestReceipt from './ProjectComponents/Requestor/Home/MakeRequest/MakeRequestReceipt.js'
import MyRequestScreen from './ProjectComponents/Requestor/Home/MyRequest/MyRequestScreen.js';
import CompletedTabRequest from './ProjectComponents/Requestor/Home/MyRequest/CompletedTabRequest.js';
import PendingTabRequest from './ProjectComponents/Requestor/Home/MyRequest/PendingTabRequest.js';
import RequestTab from './ProjectComponents/Requestor/Home/MyRequest/Request.js'
import MakeRequestUploadMedicalAbstract from './ProjectComponents/Requestor/Home/MakeRequest/MakeRequestUploadMedicalAbstract.js'
import SetMethod from './ProjectComponents/Requestor/Home/MakeRequest/SetMethod.js'

//Requestor DUPLICATE THE DONOR PAGES
// import RequestorProfile from './ProjectComponents/Requestor/Profile/RequestorProfile.js'
// import DataPrivacyNiKit from './ProjectComponents/Guest/Profile/ApplyRequestor/DataPrivacy.js'


//Tabs
import GuestTabs from './routes/MainTabsGuest.js'
import MainTabs from './routes/MainTabs.js'
import SetPassword from './ProjectComponents/Guest/Profile/ApplyDonor/SetPasswordDonor.js';
// import GuestTabsExploreAndMilkBank from './routes/GuestTabsExploreAndMilkBank.js'


//Admin
// import MedicalHistory from './screens/Admin/ScreeningForm/Donor/MedicalHistory.js'
// import AdminMedicalHistory2 from './screens/Admin/ScreeningForm/Donor/AdminMedicalHistory2.js'
// import DonorInitialScreeningFormPage1 from './screens/Admin/ScreeningForm/Donor/DonorInitialScreeningFormPage1.js'
// import DonorInitialScreeningFormPage2 from './screens/Admin/ScreeningForm/Donor/DonorInitialScreeningFormPage2.js'
// import DonorInitialScreeningFormPage3 from './screens/Admin/ScreeningForm/Donor/DonorInitialScreeningFormPage3.js'
// import DonorInitialScreeningFormPage4 from './screens/Admin/ScreeningForm/Donor/DonorInitialScreeningFormPage4.js'


//import Header from './screens/Admin/header';
// import AdminDashboard from './screens/Admin/AdminDashboard';
// import AdminUser from './screens/Admin/AdminUser';
// import AdminMilkbanks from './screens/Admin/AdminMilkbanks';
// import DonorUserVerification from './screens/Admin/ScreeningForm/Donor/DonorUserVerification.js'; 
// import DonorUploadAdmin from './screens/Admin/ScreeningForm/Donor/DonorUploadAdmin.js';   //<Stack.Screen name="RequestorVerification" component={RequestorVerification} />
// //import RequestorVerification from './screens/Admin/RequestorVerification'; 
// import DonorAppointmentConfirmation from './screens/Admin/ScreeningForm/Donor/DonorAppointmentConfirmation.js';
// import RequestorRequestConfirmation from './screens/Admin/ScreeningForm/Requestor/RequestorRequestConfirmation.js'

// import RequestorInitialScreeningFormPage1 from './screens/Admin/ScreeningForm/Requestor/RequestorInitialScreeningFormPage1.js'
// import RequestorUserVerification from './screens/Admin/ScreeningForm/Requestor/RequestorUserVerification.js';   //<Stack.Screen name="RequestorVerification" component={RequestorVerification} />
// import ForumPage from './ProjectComponents/Donor/Home/Forum/ForumPage.js';
// import ImageViewer from './screens/Admin/ScreeningForm/Donor/ImageViewer.js';



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
  Linking.getInitialURL().then(url => {
    if (url && url.startsWith('Kalinga://')) {
      // Handle deep link here
      // Navigate to the appropriate screen or perform the required action
      return
    }
  });


  useEffect(() => {
    async function loadFonts() {
      await getFonts();
      setFontsLoaded(true); 
    
    }
    loadFonts();
  }, []);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

    })();
  }, []);

  if (fontsLoaded) {
    const Stack = createStackNavigator();
    return (
      <>
        <UserLocationContext.Provider value={{ location, setLocation }}>
        <NavigationContainer>
         
          <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        
          
            {/*InitialScreen*/}
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Onboard" component={Onboarding} /> 
            <Stack.Screen name="GetStarted" component={GetStarted} />
            <Stack.Screen name="LogIn" component={LogIn} />
      

            {/*Routes*/}
            <Stack.Screen name="MainTabs" component = {MainTabs}/>
            <Stack.Screen name="GuestTabs" component={GuestTabs} />

            <Stack.Screen name="SetPassword" component={SetPassword} />
            <Stack.Screen name="SendCode" component={SendCode} />
            <Stack.Screen name="MobileNumber" component={MobileNumber} />
            <Stack.Screen name="MobileNumberExpired" component={MobileNumberExpired} />
            <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
            <Stack.Screen name="EmailVerification" component={EmailVerification} />
            <Stack.Screen name="EmailVerificationCode" component={EmailVerificationCode} />
            <Stack.Screen name="DoneEmailVerification" component={DoneEmailVerification} />
            <Stack.Screen name="Facebook" component={Facebook} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="ResetPasswordEmail" component={ResetPasswordEmail} />
            <Stack.Screen name="ResetPasswordCode" component={ResetPasswordCode} />
            <Stack.Screen name="ResetPasswordSuccessful" component={ResetPasswordSuccessful} />
            <Stack.Screen name="FacebookContinue" component={FacebookContinue} />
            
      
            {/*Guest*/}
             <Stack.Screen name="Guest Home" component={GuestHome} />
             <Stack.Screen name="Guest Profile" component={GuestProfile} />
             <Stack.Screen name="Guest Explore" component={GuestExplore} />
             <Stack.Screen name="Guest Educational Contents" component={GuestEducContents} />
             <Stack.Screen name="Guest Educational Library" component={GuestEducLibrary} />
             <Stack.Screen name="DonorApproved" component={DonorApproved} />
             <Stack.Screen name="RequestorApproved" component={RequestorApproved} />
             <Stack.Screen name="ApplyAsDonorStack" component={ApplyAsDonorStack} />
             <Stack.Screen name="ApplyAsRequestorStack" component={ApplyAsRequestorStack}/>
             <Stack.Screen name="Instant Messages" component={InstantMess} />
         


             {/*Donor*/}
             <Stack.Screen name="DonorForum" component={DonorForum} />
             <Stack.Screen name="Chat Assistance" component={ChatAssistance} />
             <Stack.Screen name="Donor Educational Contents" component={DonorEducContents} />
             <Stack.Screen name="Donor Educational Library" component={DonorEducLibrary} />
             <Stack.Screen name="CompleteDonations" component={CompleteDonations} />
             {/* <Stack.Screen name="My Donation Tabs" component={MyDonationTabs} /> */}
             <Stack.Screen name="My Donations" component={MyDonations} />
             <Stack.Screen name="OngoingDonations" component={OngoingDonations} />
             <Stack.Screen name="DonorSavedArticles" component={DonorSavedArticles} />
             <Stack.Screen name="DonorFavoriteArticles" component={DonorFavoriteArticles} />
             <Stack.Screen name="SetAnAppointment" component={SetAnAppointment} />
             <Stack.Screen name="Donor Home" component={DonorHome} />
             <Stack.Screen name="Donor Notifications" component={DonorNotifications} />
             <Stack.Screen name="DonorProfile" component={DonorProfile} />
             <Stack.Screen name="SetPasswordDonor" component={SetPasswordDonor} />
             <Stack.Screen name="DonorSettingScreen" component={DonorSettingScreen} />
             <Stack.Screen name="DonorAboutUs" component={DonorAboutUs} />
             <Stack.Screen name="DonorChangePassword" component={DonorChangePassword} />
             <Stack.Screen name="DonorEditPersonalScreen" component={DonorEditPersonalScreen} />
             <Stack.Screen name="DonorHelpAndSupport" component={DonorHelpAndSupport} />
             <Stack.Screen name="DonorHelpAndSupportSuccess" component={DonorHelpAndSupportSuccess} />
             <Stack.Screen name="DonorLocationScreen" component={DonorLocationScreen} />
             <Stack.Screen name="DonorNotification" component={DonorNotification} />
             <Stack.Screen name="DonorPersonalInfoScreen" component={DonorPersonalInfoScreen} />
             <Stack.Screen name="DonorReportBug" component={DonorReportBug} />
             <Stack.Screen name="DonorReportBugSuccess" component={DonorReportBugSuccess} />
             <Stack.Screen name="DonorSendFeedback" component={DonorSendFeedback} />
             <Stack.Screen name="DonorSendFeedbackFailed" component={DonorSendFeedbackFailed} />
             <Stack.Screen name="DonorSendFeedbackSuccess" component={DonorSendFeedbackSuccess} />
             <Stack.Screen name="SetDateTimeLocation" component={SetDateTimeLocation} />
             <Stack.Screen name="AppointmentConfirmation" component={AppointmentConfirmation} />
             <Stack.Screen name="DonorHelpAndSupportMessage" component={DonorHelpAndSupportMessage} />
             <Stack.Screen name="AppointmentConfirmationMessage" component={AppointmentConfirmationMessage} />
             <Stack.Screen name="MyDonationTabs" component={MyDonationTabs} />
             <Stack.Screen name="ValidUserExplore" component={ValidUserExplore} />
             <Stack.Screen name="AppointmentUploads" component={AppointmentUploads} />

           
        








            {/*Requestor*/}
             <Stack.Screen name="RequestorForum" component={RequestorForum} />
             <Stack.Screen name="RequestorChatAssistance" component={RequestorChatAssistance} />
             <Stack.Screen name="RequestorEducContents" component={RequestorEducContents} />
             <Stack.Screen name="RequestorEducLibrary" component={RequestorEducLibrary} />
             <Stack.Screen name="MakeRequest" component={MakeRequest} />
             <Stack.Screen name="MakeRequest2" component={MakeRequest2} />
             <Stack.Screen name="RequestorProfile" component={RequestorProfile} />

             <Stack.Screen name="SetMethod" component={SetMethod} />
             <Stack.Screen name="RequestorSettingScreen" component={RequestorSettingScreen} />
             <Stack.Screen name="RequestorAboutUs" component={RequestorAboutUs} />
             <Stack.Screen name="RequestorChangePassword" component={RequestorChangePassword} />
             <Stack.Screen name="RequestorEditPersonalScreen" component={RequestorEditPersonalScreen} />
             <Stack.Screen name="RequestorHelpAndSupport" component={RequestorHelpAndSupport} />
             <Stack.Screen name="RequestorHelpAndSupportMessage" component={RequestorHelpAndSupportMessage} />
             <Stack.Screen name="RequestorHelpAndSupportSuccess" component={RequestorHelpAndSupportSuccess} />
             <Stack.Screen name="RequestorLocationScreen" component={RequestorLocationScreen} />
             <Stack.Screen name="RequestorNotification" component={RequestorNotification} />
             <Stack.Screen name="RequestorPersonalInfoScreen" component={RequestorPersonalInfoScreen} />
             <Stack.Screen name="RequestorReportBug" component={RequestorReportBug} />
             <Stack.Screen name="RequestorReportBugSuccess" component={RequestorReportBugSuccess} />
             <Stack.Screen name="RequestorSendFeedback" component={RequestorSendFeedback} />
             <Stack.Screen name="RequestorSendFeedbackFailed" component={RequestorSendFeedbackFailed} />
             <Stack.Screen name="RequestorSendFeedbackSuccess" component={RequestorSendFeedbackSuccess} />
             <Stack.Screen name="RequestorSavedArticles" component={RequestorSavedArticles} />
             <Stack.Screen name="RequestorFavoriteArticles" component={RequestorFavoriteArticles} />
             <Stack.Screen name="ApprovedMessageRequest" component={ApprovedMessageRequest} />
             <Stack.Screen name="ApprovedTabRequest" component={ApprovedTabRequest} />
             <Stack.Screen name="MakeRequestReceipt" component={MakeRequestReceipt} />
             <Stack.Screen name="MyRequestScreen" component={MyRequestScreen} />
             <Stack.Screen name="CompletedTabRequest" component={CompletedTabRequest} />
             <Stack.Screen name="PendingTabRequest" component={PendingTabRequest} />
             <Stack.Screen name="RequestTab" component={RequestTab} />
             <Stack.Screen name="MakeRequestUploadMedicalAbstract" component={MakeRequestUploadMedicalAbstract} />


            {/* Requestor And Donor */}
            <Stack.Screen name="VerifyNewEmail" component={VerifyNewEmail} />

            </Stack.Navigator>
        </NavigationContainer>

        </UserLocationContext.Provider>
      </>
      
    ) 
  
  } else {
    return null; 
  }

}
