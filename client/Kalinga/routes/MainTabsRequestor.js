import React from 'react';
//import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


import GuestProfile from '../ProjectComponents/Guest/GuestDashboard/GuestProfile.js';
import GuestHome from '../ProjectComponents/Guest/GuestDashboard/GuestHome.js';
 
import DonorHome from '../ProjectComponents/Donor/Dashboard/Home.js';
import DonorProfile from '../ProjectComponents/Donor/Dashboard/DonorProfile.js';
import DonorNotification from '../ProjectComponents/Donor/Dashboard/Notifications.js';

import RequestorHome from '../ProjectComponents/Requestor/Dashboard/Home.js';
import RequestorProfile from '../ProjectComponents/Requestor/Dashboard/Profile.js';
import RequestorNotification from '../ProjectComponents/Requestor/Dashboard/Notifications.js'


const Tab = createBottomTabNavigator()


const MainTabs = ({route}) => {
   
    const userType = route.params.userType;
    console.log("userType: ", userType)
    return (
        
            <Tab.Navigator
                screenOptions={{
                    headerTitle: "",
                    headerStyle: {
                    height:0, //To avoid the header exceeding on the status bar of the phone
                    },
                    tabBarActiveTintColor: '#E60965',
                    tabBarLabelStyle: {
                        color: 'white',
                        fontSize: 12,
                        fontFamily: "Open-Sans-Bold"

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
                        backgroundColor: '#E60965'
                      },
                }}
            >
                <Tab.Screen 
                    name = {"Home"}
                    component={
                        userType === "Requestor" ? RequestorHome // If statement. It heavy relies on the value of usertype
                        : DonorHome
                         // Else condition
                    }
                    //component = {GuestHome} // palitan niyo to bai
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Feather 
                            name = {'home'} 
                            size = {focused ? 37 : 30}
                            color = {focused ? 'white' : 'white'}
                            />
                        )
                    }}
                />
                <Tab.Screen 
                    name = {"Notification"}
                    component={
                        userType === "Requestor" ? RequestorNotification  // If statement. It heavy relies on the value of usertype
                        : DonorNotification // Else condition
                    }
                    //component = {GuestHome} // palitan niyo to bai
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Ionicons 
                            name = {'notifications-outline'} 
                            size = {focused ? 37 : 30}
                            color = {focused ? 'white' : 'white'}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name = {'Profile'} 
                    component={
                        userType === "Requestor" ? RequestorProfile   // If statement. It heavy relies on the value of usertype
                        : DonorProfile
                    }
                    options={{
                        tabBarIcon: ({focused}) => (
                            <AntDesign 
                            name = {"user"}
                            size = {focused ? 37 : 30}
                            color = {focused ? 'white' : 'white'}
                            />
                        )
                    }}
                />
            </Tab.Navigator>
    );

}

export default MainTabs;