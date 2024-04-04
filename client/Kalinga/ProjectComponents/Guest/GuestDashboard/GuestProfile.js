// Requestor Profile
import  React, { useState, useEffect } from 'react';
import { globalStyles } from "../../../styles_kit/globalStyles.js";
import { globalHeader } from "../../../styles_kit/globalHeader.js";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


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
import { AntDesign } from '@expo/vector-icons';

export default function GuestProfile() {

  const navigation = useNavigation();

  const handleHomePress = () => {
    console.log("Home button pressed");
  };
  const handleProfilePress = () => {
    console.log("Profile button pressed");
  };

  const navigatePage = (Page) => {
    navigation.navigate(Page); // Navigate to the Login screen
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
              <MaterialIcons name="verified" size={35} color="#EB7AA9" style={{position: 'absolute', top: 100, right: 100}}/>
            </View>
            <View style={styles.profileText}>
              <Text style={styles.userText}>Guest User</Text>
              <Text style={styles.statusText}>Requestor</Text>
            </View>

            <View style={styles.menuContainer}>
              
                <TouchableOpacity onPress={() => navigatePage("ApplyAsDonorStack")} >
                    <View style={styles.iconContainer}>
                      
                      <FontAwesome5 name="hand-holding-water" size={24} color="#E60965" />                
                      <Text style={styles.menuText}>Apply as Donor</Text>
           
                      <FontAwesome name="chevron-right" size={24} color="#E60965" />
                    </View>
              </TouchableOpacity>

            </View>
            <View style={styles.line}></View>

            <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => navigatePage("ApplyAsRequestorStack")} >
              <View style={styles.iconContainer}>
                <FontAwesome name="handshake-o" size={24} color="#E60965" />              
                <Text style={styles.menuText2}>Request Milk</Text>
  
                <FontAwesome name="chevron-right" size={24} color="#E60965" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.line}></View>

            
  
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
    marginRight: 40
  },

  menuText2: {
    paddingTop: 5,
    paddingLeft: 25,
    fontSize: 20,
    color: '#E60965',
    fontWeight: 'bold',
    marginRight: 50
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
    alignSelf: "center"
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

