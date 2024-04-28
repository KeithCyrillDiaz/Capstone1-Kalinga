import React from 'react';
//import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import GuestMilkBank from '../ProjectComponents/Guest/GuestDashboard/Explore/GuestMilkBank.js';
import GuestExplore from '../ProjectComponents/Guest/GuestDashboard/Explore/ExploreFinal.js';

import DonorExplore from '../ProjectComponents/Donor/Dashboard/Explore/DonorExplore.js';
import DonorMilkBank from '../ProjectComponents/Donor/Dashboard/Explore/DonorMilkBank.js';

import RequestorExplore from '../ProjectComponents/Requestor/Dashboard/Explore/RequestorExplore.js';
import RequestorMilkBank from '../ProjectComponents/Requestor/Dashboard/Explore/RequestorMilkBank.js';

import { MaterialIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator()

const RequestorTabsExploreAndMIlkBank = ({userType}) => {
    userType = "Requestor"
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
                    name = {"Explore"}
                    component={
                        userType === "Guest" ? GuestExplore  // If statement. It heavy relies on the value of usertype
                        : userType === "Donor" ? DonorExplore
                        : RequestorExplore // Else condition
                    }
                    //component = {GuestHome} // palitan niyo to bai
                    options={{
                        tabBarIcon: ({focused}) => (
                            <MaterialIcons 
                            name="explore"  
                            size = {focused ? 37 : 30} 
                            color = {focused ? '#E60965' : 'black'} />  
                        )
                    }}
                />
                <Tab.Screen
                    name = {'Milk Banks'} 
                    component={
                        userType === "Guest" ? GuestMilkBank  // If statement. It heavy relies on the value of usertype
                        : userType === "Donor" ? DonorMilkBank
                        : RequestorMilkBank // Else condition
                    }
                    options={{
                        tabBarIcon: ({focused}) => (
                            <AntDesign 
                            name = {"user"}
                            size = {focused ? 37 : 30}
                            color = {focused ? '#E60965' : 'black'}
                            />
                        )
                    }}
                />
            </Tab.Navigator>
    );

}

export default RequestorTabsExploreAndMIlkBank;