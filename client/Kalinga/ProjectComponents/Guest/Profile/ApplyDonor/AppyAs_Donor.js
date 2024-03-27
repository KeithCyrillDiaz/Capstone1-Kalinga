// try lang, guest profile e2. ung 1st page

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  const handleHomePress = () => {
    console.log("Home button pressed");
  };
  const handleMessagePress = () => {
    console.log("Message button pressed");
  };
  const handleProfilePress = () => {
    console.log("Profile button pressed");
  };
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.topBorder}>
          <Text style={styles.profileText}>Profile</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={require('./assets/profile.png')} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.userText}>Guest User</Text>
        <Text style={styles.statusText}>Not Verified</Text>
      </View>
      <View style={styles.applyasdonorContainer}>
        <View style={styles.donorContainer}>
          <Image source={require('./assets/apply.png')} style={styles.applyicon} />
          <Text style={styles.applyText}>Apply as Donor</Text>
        </View>
        <TouchableOpacity onPress={() => console.log("Back button pressed")} style={styles.backButton}>
          <FontAwesome name="chevron-right" size={24} color="#E60965" />
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>
      <View style={styles.requestmilkContainer}>
        <View style={styles.requestContainer}>
        <Image source={require('./assets/request.png')} style={styles.requesticon} />
        <Text style={styles.requestText}>Request Milk</Text>
       </View>
      <TouchableOpacity onPress={() => console.log("Back button pressed")} style={styles.backButtonNew}>
        <FontAwesome name="chevron-right" size={24} color="#E60965" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.bottomBorder}>
      <View style={styles.iconbuttonContainer}>
      <TouchableOpacity onPress={handleHomePress} style={styles.iconButton}>
          <Image source={require('./assets/home.png')} style={styles.icon} />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMessagePress} style={styles.iconButton}>
          <Image source={require('./assets/message.png')} style={styles.icon} />
          <Text style={styles.iconText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProfilePress} style={styles.iconButton}>
          <Image source={require('./assets/profile1.png')} style={styles.icon} />
          <Text style={styles.iconText}>Profile</Text>
          <View style={styles.line2}></View>
        </TouchableOpacity>
      </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  topBorder: {
    backgroundColor: '#E60965',
    height: 70,
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    marginTop: 40,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: -18,
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
  applyasdonorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  donorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  applyicon: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginRight: 5,
  },
  applyText: {
    paddingTop: 5,
    paddingLeft: 25,
    fontSize: 20,
    color: '#E60965',
    fontWeight: 'bold',
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

  requestmilkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 8,
    alignItems: 'center',
  },
  requestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requesticon: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginRight: 5,
  },
  requestText: {
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
  iconbuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10, 
  },
  icon: {
    marginTop: 10,
    resizeMode: 'contain',
    width: '70%', 
    height: '70%',
  },
  iconButton: {
    flex: 1,
    alignItems: 'center',
  },
  iconText: {
    fontSize: 10,
    color: '#E60965',
    marginTop: 0, 
  },
  line2: {
    height: 2,
    borderRadius: 1,
    backgroundColor: '#E60965', 
    width: 40, 
  },
  bottomBorder: {
    backgroundColor: 'white',
    height: 90,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 0,
    borderWidth: 3,
    borderColor: '#E60965',
    position: 'absolute',
    bottom: 0,
  },
});