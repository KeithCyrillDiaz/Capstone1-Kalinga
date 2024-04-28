import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Ongoing from './OngoingDonations.js';
import Completed from './CompletedDonations.js';

const Tab = createBottomTabNavigator()

const MyDonationTabs = () => {
    return (
            <Tab.Navigator
                screenOptions={{
                    headerTitle: "",
                    headerStyle: {
                        height: 40, //To avoid the header exceeding on the status bar of the phone
                    },
                    tabBarActiveTintColor: '#E60965',
                    tabBarLabelStyle: {
                        color: '#E60965',
                        fontSize: 12,

                    },
                    tabBarStyle: {
                        borderTopWidth: 2,
                        borderLeftWidth: 2,
                        borderRightWidth: 2,
                        borderTopColor: '#E60965',
                        borderRightColor: '#E60965',
                        borderLeftColor: '#E60965',
                        height: 70,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        backgroundColor: '#FFE0E8'
                      },
                }}
            >
                <Tab.Screen 
                    name = {"Ongoing"}
                    component={Ongoing} 
                />
                <Tab.Screen
                    name = {'Completed'} 
                    component={Completed} 
                />
            </Tab.Navigator>

            
    );

}

export default MyDonationTabs;