
import React from 'react';
import { createMaterialTopTabNavigator, } from '@react-navigation/material-top-tabs';
import { View, Text, StatusBar, StyleSheet, } from 'react-native';

import MyRequestScreen from './MyRequestScreen.js';
import PendingTabRequest from './PendingTabRequest.js';
import ApprovedTabRequest from './ApprovedTabRequest.js';
import CompletedTabRequest from './CompletedTabRequest.js';

import { globalHeader } from '../../../../styles_kit/globalHeader.js';

const Tab = createMaterialTopTabNavigator();

const RequestTab = () => {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
                <View style = {globalHeader.SmallHeader}>
                    <Text style = {globalHeader.SmallHeaderTitle}>My Request</Text>
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
                            paddingHorizontal: 10,
                            paddingVertical: 14,
                            borderWidth: 1,
                            borderColor: "#E60965",
                            fontSize: 15,
                            borderRadius: 10,
                            backgroundColor:"#FFE5EC",
                        },
                        tabBarActiveTintColor: "black",
                        tabBarInactiveTintColor: "#E60965",
                    }}
                >
                    <Tab.Screen 
                        name="Overall"
                        component={MyRequestScreen} 
                        options={{
                            tabBarLabel: 'Overall' ,
                        }}
                    />
                   
                     <Tab.Screen 
                        name="Approved"
                        component={ApprovedTabRequest} 
                        options= {{
                            tabBarLabel: 'Approved',
                        }}
                    />
                    <Tab.Screen
                        name="Completed"
                        component={CompletedTabRequest} 
                        options={{
                            tabBarLabel: "Completed",
                        }}
                    />
                </Tab.Navigator>
        </View>
    );
}

export default RequestTab;
const styles = StyleSheet.create ({
    container: {
      flex: 1,
      backgroundColor: "#FFF8EB",
    },

  });