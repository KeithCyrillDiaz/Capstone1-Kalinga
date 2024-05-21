
import React from 'react';
import { createMaterialTopTabNavigator, } from '@react-navigation/material-top-tabs';
import { View, Text, StatusBar, StyleSheet, } from 'react-native';

import DonationHome from './MyDonations.js';
import Ongoing from './OngoingDonations.js';
import Completed from './CompletedDonations.js';
import { globalHeader } from '../../../../styles_kit/globalHeader.js';

const Tab = createMaterialTopTabNavigator();

const MyDonationTabs = ({route}) => {
    const userInformation = route.params.data
    const token = route.params.token
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
                <View style = {globalHeader.SmallHeader}>
                    <Text style = {globalHeader.SmallHeaderTitle}>My Donations</Text>
                </View>

                <Tab.Navigator
                    screenOptions={{
                        tabBarStyle: {
                            borderBottomWidth: 1,
                            borderBottomColor:  "#E60965",
                        },
                        tabBarItemStyle: {
                            backgroundColor: "#f5f5f5",
                        },
                        tabBarLabelStyle: {
                            fontFamily: "Open-Sans-Bold",
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderWidth: 1,
                            borderColor: "#E60965",
                            fontSize: 12,
                            borderRadius: 10,
                        },
                        tabBarActiveTintColor: "black",
                        tabBarInactiveTintColor: "#E60965",
                    }}
                >
                    <Tab.Screen 
                        name="Overall"
                        component={DonationHome} 
                        initialParams={{ userInformation: userInformation, token: token }}
                        options={{
                            tabBarLabel: 'Overall' ,
                        }}
                    />
                    <Tab.Screen 
                        name="Pending"
                        component={Ongoing} 
                        initialParams={{ userInformation: userInformation, token: token }}
                        options= {{
                            tabBarLabel: 'Ongoing',
                        }}
                    />
                    <Tab.Screen
                        name="Completed"
                        component={Completed} 
                        initialParams={{ userInformation: userInformation, token: token }}
                        options={{
                            tabBarLabel: "Completed",
                        }}
                    />
                </Tab.Navigator>
        </View>
    );
}

export default MyDonationTabs;
const styles = StyleSheet.create ({
    container: {
      flex: 1,
      backgroundColor: "#FFF8EB",
    },

  });