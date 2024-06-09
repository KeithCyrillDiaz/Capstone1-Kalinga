import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import { View } from 'react-native';
import axios from 'axios';
import { BASED_URL } from '../MyConstants.js';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import DonorHome from '../ProjectComponents/Donor/Dashboard/Home.js';
import DonorProfile from '../ProjectComponents/Donor/Dashboard/DonorProfile.js';
import DonorNotification from '../ProjectComponents/Donor/Dashboard/Notifications.js';

import RequestorHome from '../ProjectComponents/Requestor/Dashboard/Home.js';
import RequestorProfile from '../ProjectComponents/Requestor/Dashboard/Profile.js';
import RequestorNotification from '../ProjectComponents/Requestor/Dashboard/Notifications.js';

const Tab = createBottomTabNavigator();

const MainTabs = ({ route }) => {
  const userInformation = route.params.userInformation;
  const token = route.params.token.trim();
  const userType = userInformation.userType;

  const [newNotifications, setNewNotifications] = useState(false);
  const navigation = useNavigation()

  const fetchNotifications = async () => {
    console.log("Fetching Notifications");
    try {
      const response = await axios.get(`${BASED_URL}/kalinga/fetchUnreadNotification/${userInformation.Requestor_ID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.messages.code === 1) {
        console.log("Error fetching Notification: ", response.data.messages.message);
        return;
      }

      setNewNotifications(response.data.newNotifications.length > 0);
      console.log(response.data.messages.message);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // Fetch every 60 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener('tabPress', (e) => {
        const targetRoute = e.target ? e.target.split('-')[0] : "";
        if (targetRoute === "Notification") {
          setNewNotifications(false);
        }
      });

      return unsubscribe;
    }, [navigation])
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: "",
        headerStyle: {
          height: 0, // To avoid the header exceeding on the status bar of the phone
        },
        tabBarActiveTintColor: '#E60965',
        tabBarLabelStyle: {
          color: 'white',
          fontSize: 12,
          fontFamily: "Open-Sans-Bold",
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
          backgroundColor: '#E60965',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={userType === 'Requestor' ? RequestorHome : DonorHome}
        initialParams={{ userInformation: userInformation, token: token }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="home"
              size={focused ? 37 : 30}
              color="white"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={userType === 'Requestor' ? RequestorNotification : DonorNotification}
        initialParams={{ userInformation: userInformation, token: token }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons
                name="notifications-outline"
                size={focused ? 37 : 30}
                color="white"
              />
              {newNotifications && (
                <FontAwesome
                  name="circle"
                  size={10}
                  color="white"
                  style={{ position: 'absolute', top: 0, right: -2 }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={userType === 'Requestor' ? RequestorProfile : DonorProfile}
        initialParams={{ userInformation: userInformation, token: token }}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={focused ? 37 : 30}
              color="white"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
