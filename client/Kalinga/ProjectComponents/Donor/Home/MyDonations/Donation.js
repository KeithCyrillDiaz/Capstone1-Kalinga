
import React from 'react';
import { createMaterialTopTabNavigator, } from '@react-navigation/material-top-tabs';
import { View, Text, StatusBar, StyleSheet, } from 'react-native';

import DonationHome from './MyDonations.js';
import Ongoing from './OngoingDonations.js';
import Completed from './CompletedDonations.js';
import { globalHeader } from '../../../../styles_kit/globalHeader.js';

const Tab = createMaterialTopTabNavigator();

const MyDonationTabs = () => {
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
                            backgroundColor: "#FFF8EB",
                        },
                        tabBarLabelStyle: {
                            fontFamily: "Open-Sans-Bold",
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderWidth: 1,
                            borderColor: "#E60965",
                            fontSize: 13,
                            borderRadius: 10,
                            backgroundColor:"#FFE5EC",
                        },
                        tabBarActiveTintColor: "black",
                        tabBarInactiveTintColor: "#E60965",
                    }}
                >
                    <Tab.Screen 
                        name="Overall"
                        component={DonationHome} 
                        options={{
                            tabBarLabel: 'Overall' ,
                        }}
                    />
                    <Tab.Screen 
                        name="Pending"
                        component={Ongoing} 
                        options= {{
                            tabBarLabel: 'Pending',
                        }}
                    />
                    <Tab.Screen
                        name="Completed"
                        component={Completed} 
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