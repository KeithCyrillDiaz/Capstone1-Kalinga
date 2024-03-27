import { StatusBar } from 'expo-status-bar';
import  React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Header from './GuestHeader';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';

export default function GuestHome( onPress ) {
  const handleMilkBankLoc = () => {
    navigation.navigate('Guest Home');
  };
  const handleEducLib = () => {
    navigation.navigate('Guest Home');
  };
  const handleInstantChat = () => {
    navigation.navigate('Guest Home');
  };
  const handleHomePress = () => {
    navigation.navigate('Guest Home');
  };
  const handleMessagePress = () => {
    console.log("Message button pressed");
  };
  const handleProfilePress = () => {
    console.log("Profile button pressed");
  };
  const navigation = useNavigation();
  const navigatePage = (Page) => {
    navigation.navigate(Page); // Navigate to the Login screen
};
  
      return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={() => navigatePage("Guest Explore")} style={styles.rowButton}> 
            <View style={styles.buttonRowContainer}>
              <MaterialIcons name="location-on" size={100} color="#E60965"/>
              <Text style={styles.button_H1}>Milk Bank Locator</Text>
              <Text style={styles.button_H2}>Easily find human milk</Text>
              <Text style={styles.button_H2_1}>banks near you</Text>
            </View>
          </TouchableOpacity> 
          <TouchableOpacity onPress={() => navigatePage("Guest Educational Library")} style={styles.rowButton}>
            <View style={styles.buttonRowContainer}>
              <FontAwesome5 name="book-open" size={80} color="#E60965" />
              <Text style={styles.button_H1}>Educational Library</Text>
              <Text style={styles.button_H2}>Explore our</Text>
              <Text style={styles.button_H2_1}>educational articles</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigatePage("Instant Messages")} style={styles.rowButton}>
            <View style={styles.buttonRowContainer}>
              <MaterialCommunityIcons name="robot" size={100} color="#E60965" />
              <Text style={styles.button_H1}>Instant Chat</Text>
              <Text style={styles.button_H2}>Chatbot assistance</Text>
              <Text style={styles.button_H2_1}>for FAQs</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <Text style={styles.bodyTitle}>News and Updates</Text>

          <View style={styles.columnContainer}>
          <TouchableOpacity onPress={onPress} style={styles.colButton}> 
            <View style={styles.buttonColContainer}>
              <Text style={styles.button_H1}>Quezon City Milk Bank Milk Letting Activity</Text>
              <Text style={styles.button_H2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse </Text>
            </View>
          </TouchableOpacity> 
          <TouchableOpacity onPress={onPress} style={styles.colButton}> 
            <View style={styles.buttonColContainer}>
              <Text style={styles.button_H1}>Quezon City Day Free Medical Check Up</Text>
              <Text style={styles.button_H2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse </Text>
            </View>
          </TouchableOpacity> 
          <TouchableOpacity onPress={onPress} style={styles.colButton}> 
            <View style={styles.buttonColContainer}>
              <Text style={styles.button_H1}>Quezon City Day Free Medical Check Up</Text>
              <Text style={styles.button_H2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse </Text>
            </View>
          </TouchableOpacity> 
         
        </View>
      </View>

      <View style={styles.bottomBorder}>
        <View style={styles.iconbuttonContainer}>
        <TouchableOpacity onPress={() => navigatePage("Guest Home")} style={styles.iconButton}>
          <Feather name="home" size={45} color="white"/>
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigatePage("Guest Profile")}style={styles.iconButton}>
          <MaterialIcons name="person-outline" size={50} color="white" />
          <Text style={styles.iconText}>Profile</Text>
          <View style={styles.line2}></View>
        </TouchableOpacity>
        </View>
      </View>
        <StatusBar style="auto" />

    </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8EB',
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center', 
    marginVertical: 5, 
  },

  rowButton: {
    flex: 3, 
    marginHorizontal: 5, 
  },

  buttonRowContainer: {
    backgroundColor:'#FFE5EC',
    borderColor: '#E60965',
    borderWidth: 1,
    width: "100%",
    aspectRatio: 7 / 10, 
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginTop: 10,
    marginBottom: 10,
  },

  button_H1: {
    fontFamily: 'OpenSans_Condensed-Bold',
    color: '#E60965',
    fontSize: 17,
    paddingTop: 5,
  },

  button_H2: {
    fontFamily: 'OpenSans-Regular',
    color: '#E60965',
    fontSize: 12,
  },

  button_H2_1: {
    fontFamily: 'OpenSans-Regular',
    color: '#E60965',
    fontSize: 12,
  },

  bodyTitle: {
    fontFamily: 'OpenSans_Condensed-Bold',
    color: '#E60965',
    fontSize: 25,
    paddingTop: 5,
    padding: 10,
  },

   columnContainer: {
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    
  },

  buttonColContainer: {
    backgroundColor: '#FFE5EC',
    width: "95%", 
    aspectRatio: 8 / 2, 
    borderColor: '#E60965',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'left', 
    padding: 15,
    elevation: 5,
    marginVertical: 5, 
  },

  bottomBorder: {
    backgroundColor: '#E60965',
    height: 90,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 0,
    position: 'absolute',
    bottom: 0,
  },

  iconbuttonContainer: {
    flexDirection: 'row',
    
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
    marginLeft: 120,
    marginRight: 120,
  },

  iconText: {
    fontSize: 12,
    color: 'white',
    marginTop: 0, 
    marginLeft: 10,
  },

});