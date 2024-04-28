// Requestor Profile
import  React, { useState, useEffect } from 'react';
import { globalStyles } from '../../../styles_kit/globalStyles';
import { globalHeader } from "../../../styles_kit/globalHeader.js";
import * as Font from 'expo-font';
import { 
  ScrollView, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function RequestorProfile() {
  const handleHomePress = () => {
    console.log("Home button pressed");
  };
  const handleProfilePress = () => {
    console.log("Profile button pressed");
  };

    return (
      <SafeAreaView style={globalStyles.container}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style={globalHeader.SmallHeader}>
                <Text style={globalHeader.SmallHeaderTitle}>Profile</Text>
            </View>
            <View style={{ flex: 1 }}>
            <View style={styles.profileIcon}>
              <Ionicons name="person-circle-outline" size={150} color="#E60965"  />
              <MaterialIcons name="verified" size={35} color="#EB7AA9" style={{position: 'absolute', top: 100, right: 140}}/>
            </View>
            <View style={styles.profileText}>
              <Text style={styles.userText}>Guest User</Text>
              <Text style={styles.statusText}>Requestor</Text>
            </View>

            <View style={styles.menuContainer}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="bookmark-multiple-outline" size={30} color="#E60965" />
                <Text style={styles.menuText}>Saved Articles</Text>
              </View>
              <TouchableOpacity onPress={() => console.log("Back button pressed")} style={styles.backButton}>
                <FontAwesome name="chevron-right" size={24} color="#E60965" />
              </TouchableOpacity>
            </View>
            <View style={styles.line}></View>

            <View style={styles.menuContainer}>
              <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="baby-bottle-outline" size={30} color="#E60965" />
              <Text style={styles.menuText}>Saved Milk Banks</Text>
            </View>
            <TouchableOpacity onPress={() => console.log("Back button pressed")} style={styles.backButtonNew}>
              <FontAwesome name="chevron-right" size={24} color="#E60965" />
              </TouchableOpacity>
            </View>
            <View style={styles.line}></View>

            <View style={styles.menuContainer}>
              <View style={styles.iconContainer}>
              <MaterialIcons name="settings" size={30} color="#E60965" />
              <Text style={styles.menuText}>Settings</Text>
            </View>
            <TouchableOpacity onPress={() => console.log("Back button pressed")} style={styles.backButtonNew}>
              <FontAwesome name="chevron-right" size={24} color="#E60965" />
              </TouchableOpacity>
            </View>
        
            <View style={styles.navBarBorder}>
            <View style={styles.navBar}>
            <TouchableOpacity onPress={handleHomePress} style={styles.navBarButton}>
              <Feather name="home" size={45} color="white"/>
              <Text style={styles.iconText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleProfilePress} style={styles.navBarButton}>
              <Ionicons name="notifications-outline" size={50} color="white" style={{marginLeft: 10}}/>
              <Text style={styles.iconText}>Notifications</Text >
              <View style={styles.line2}></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleProfilePress} style={styles.navBarButton}>
              <MaterialIcons name="person-outline" size={50} color="white"  />
              <Text style={styles.iconText}>Profile</Text>
              <View style={styles.line2}></View>
            </TouchableOpacity>
            </View>
            </View>
          <StatusBar style="auto" />
          </View>

        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8EB',
  },

  profileIcon: {
    alignItems: 'center',
    //position: 'relative',
  },

  profileText: {
    alignItems: 'center',
    marginTop: -5,
  },

  userText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#E60965',
  },

  statusText: {
    fontSize: 18,
    color: '#E60965',
  },

  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  
  backButton: {
    marginRight: 10,
    paddingTop: 5,
    paddingRight: 10,
  },

  line: {
    marginTop: 10,
    borderBottomColor: '#E60965',
    borderBottomWidth: 0.5,
  },

  menuText: {
    paddingTop: 5,
    paddingLeft: 25,
    fontSize: 20,
    color: '#E60965',
    fontWeight: 'bold',
  },

  backButtonNew: {
    marginRight: 10,
    paddingTop: 5,
    paddingRight: 10,
  },

  line2: {
    height: 2,
    borderRadius: 1,
    backgroundColor: '#E60965', 
    width: 40, 
  },

   navBarBorder: {
    backgroundColor: '#E60965',
    height: 90,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 0,
    position: 'absolute',
    bottom: 0,
  },

  navBar: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center', // Center the content vertically
    padding: 10,
    marginTop: 5,
  },
  
  navBarButton: {
    justifyContent: 'center',
    marginLeft: 15, // Add space between buttons
    marginRight: 15, // Add space between buttons
  },

  iconText: {
    fontSize: 12,
    color: 'white',
    marginTop: 0, 
    marginLeft: 10,
  },
});

