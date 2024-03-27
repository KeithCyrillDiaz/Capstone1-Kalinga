// Requestor Profile
import  React, { useState, useEffect } from 'react';
import { globalStyles } from "../../../styles_kit/globalStyles.js";
import { globalHeader } from "../../../styles_kit/globalHeader.js";
import * as Font from 'expo-font';
import { 
  ScrollView, 
  Button,
  Text, 
  View, 
  Image,
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
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
    const handleBackPress = () => {
        console.log("Back button pressed");
      };

    return (
      <SafeAreaView style={globalStyles.container}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style={globalHeader.SmallHeader}>
                <TouchableOpacity onPress={handleBackPress}>
                    <AntDesign name="arrowleft" size={24} color="white" style={{position: 'absolute', top: 5, left: -180}}/>
                </TouchableOpacity>
                
                <Text style={globalHeader.SmallHeaderTitle}>Milk Bank Locator</Text>
            </View>

            <View style={{ flex: 1 }}> 
              <Image source={require('../assets/map_pic.png')} style={styles.image}></Image>
            </View>

            <View style={styles.navBarBorder}>
            <View style={styles.navBar}>
            <TouchableOpacity onPress={handleHomePress} style={styles.navBarButton}>
              <Feather name="compass" size={45} color="white" />
              <Text style={styles.iconText}>Explore</Text>
            </TouchableOpacity>
            </View>
            </View>
          <StatusBar style="auto" />
          
          

        </SafeAreaView>    

        
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8EB',
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
  
  image: {
    width: 400,
    height: 1000
  }
});

