import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RequestorDataPrivacy from './RequestorDataPrivacy'
import RequestorScreeningForm from './RequestorScreeningForm'
import RequestorMedicalAbstract from './RequestorMedicalAbstract';
import RequestorReasonForRequesting from './RequestorReasonForRequesting'
import RequestorApproved from './RequestorApproved'

const Stack = createStackNavigator();

const ApplyAsRequestorStack = () => {
  return (
      <Stack.Navigator initialRouteName="RequestorDataPrivacy" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RequestorDataPrivacy" component={RequestorDataPrivacy} />
        <Stack.Screen name="RequestorScreeningForm" component={RequestorScreeningForm} />
        <Stack.Screen name="RequestorMedicalAbstract" component={RequestorMedicalAbstract} />
        <Stack.Screen name="RequestorReasonForRequesting" component={RequestorReasonForRequesting} />
        <Stack.Screen name="RequestorApproved" component={RequestorApproved} />
      </Stack.Navigator>
  );
};

export default ApplyAsRequestorStack;
