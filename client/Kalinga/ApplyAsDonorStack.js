import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DonorDataPrivacy from './ProjectComponents/Guest/Profile/ApplyDonor/DonorDataPrivacy'
import DonorScreeningForm from './ProjectComponents/Guest/Profile/ApplyDonor/DonorScreeningForm'
import DonorScreeningForm2 from './ProjectComponents/Guest/Profile/ApplyDonor/DonorScreeningFormPage2'
import DonorMedicalHistory from './ProjectComponents/Guest/Profile/ApplyDonor/DonorMedicalHistory';
import DonorMedicalHistory2 from './ProjectComponents/Guest/Profile/ApplyDonor/DonorMedicalHistory2';
import DonorUploadMedicalRequirements from './ProjectComponents/Guest/Profile/ApplyDonor/DonorUploadMedicalRequirements';
import DonorApproved from './ProjectComponents/Guest/Profile/ApplyDonor/DonorApproved'
import SetPasswordDonor from './ProjectComponents/Guest/Profile/ApplyDonor/SetPasswordDonor'
const Stack = createStackNavigator();

const ApplyAsDonorStack = () => {
  return (
      <Stack.Navigator initialRouteName="DonorDataPrivacy" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DonorDataPrivacy" component={DonorDataPrivacy} />
        <Stack.Screen name="DonorScreeningForm" component={DonorScreeningForm} />
        <Stack.Screen name="DonorScreeningForm2" component={DonorScreeningForm2} />
        <Stack.Screen name="DonorMedicalHistory" component={DonorMedicalHistory} />
        <Stack.Screen name="DonorMedicalHistory2" component={DonorMedicalHistory2} />
        <Stack.Screen name="DonorUploadMedicalRequirements" component={DonorUploadMedicalRequirements} />
        <Stack.Screen name="DonorApproved" component={DonorApproved} />
        <Stack.Screen name="SetPasswordDonor" component={SetPasswordDonor} />
      </Stack.Navigator>
  );
};

export default ApplyAsDonorStack;
