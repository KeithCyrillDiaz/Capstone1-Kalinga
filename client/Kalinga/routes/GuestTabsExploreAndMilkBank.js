import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import GuestMilkBank from '../ProjectComponents/Guest/GuestDashboard/Explore/GuestMilkBank.js';
import GuestExplore from '../ProjectComponents/Guest/GuestDashboard/Explore/ExploreFinal.js';

const Tab = createBottomTabNavigator();

const GuestTabsExploreAndMIlkBank = ({ userType }) => {
  userType = "Guest"; // Not sure if this needs to be hard-coded, consider removing if not necessary

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
          backgroundColor: '#FFE0E8',
        },
        tabBarVisible: false, // Hide the navigation bar
      }}
    >
      <Tab.Screen
        name={"Explore"}
        component={GuestExplore}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="explore"
              size={focused ? 37 : 30}
              color={focused ? '#E60965' : 'black'}
            />
          )
        }}
      />
      <Tab.Screen
        name={'Milk Banks'}
        component={GuestMilkBank}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={focused ? 37 : 30}
              color={focused ? '#E60965' : 'black'}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default GuestTabsExploreAndMIlkBank;
