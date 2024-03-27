// Requestor Profile
import  React, { useState, useEffect } from 'react';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
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
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


export default function RequestorProfile() {
    const [fullName, setFullName] = useState('');
    const [inputValue, setInputValue] = useState('');
  
    const handleInputChange = (text) => {
      setInputValue(text); // Update the local inputValue
    };
  
    const handleSubmit = () => {
      console.log('FullName:', inputValue); // Log the input value when the button is pressed
      setFullName(inputValue); // Update the fullName state
      setInputValue(''); // Clear the input field
    };

    const handleBackPress = () => {
        console.log("Back button pressed");
      };

      
    const navigation = useNavigation();
    
    const navigatePage = (Page) => {
        navigation.navigate(Page); // Navigate to the Login screen
        

    };
  
    return (
      <SafeAreaView style={globalStyles.container}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style={globalHeader.SmallHeader}>
                <TouchableOpacity onPress={handleBackPress}>
                    <AntDesign name="arrowleft" size={24} color="white" style={{position: 'absolute', top: 5, left: -180}}/>
                </TouchableOpacity>
                
                <Text style={globalHeader.SmallHeaderTitle}>Make a Request</Text>
            </View>

            <ScrollView>
            <View style={{ flex: 1 }}> 
                <View style={styles.textAndImage}>
                    <Text style={styles.text}>Need milk for your little one? Pen down your request now and let our community of caring donors support your child's nourishment journey.</Text>
                    <Image source={require('../../../../assets/makereq.png')} style={styles.image}></Image>
                </View>

                <View style={styles.body}>
                    <Text style={styles.bodyNote}>Note: All fields marked with (*) are required</Text>
                     <TextInput
                        style={styles.form1}
                        value={inputValue}
                        placeholder="Full Name *"
                        placeholderTextColor="#E60965"
                        onChangeText={handleInputChange}
                        />

                    <TextInput
                        style={styles.form1}
                        value={inputValue}
                        placeholder="Phone Number *"
                        placeholderTextColor="#E60965"
                        onChangeText={handleInputChange}
                        />          

                    <TextInput
                        style={styles.form1}
                        value={inputValue}
                        placeholder="Email Address *"
                        placeholderTextColor="#E60965"
                        onChangeText={handleInputChange}
                        />    

                    <TextInput
                        style={styles.form2}
                        value={inputValue}
                        placeholder="Home Address *"
                        placeholderTextColor="#E60965"
                        onChangeText={handleInputChange}
                        />       

                    <TextInput
                        style={styles.form1}
                        value={inputValue}
                        placeholder="Medical Condition (if applicable)"
                        placeholderTextColor="#E60965"
                        onChangeText={handleInputChange}
                        />    

                    <TextInput
                        style={styles.form1}
                        value={inputValue}
                        placeholder="Amount of milk to be requested (mL) *"
                        placeholderTextColor="#E60965"
                        onChangeText={handleInputChange}
                        />   

                    <TextInput
                        style={styles.form2}
                        value={inputValue}
                        placeholder="Reason for Requesting *"
                        placeholderTextColor="#E60965"
                        onChangeText={handleInputChange}
                        />   

                    <Text style={styles.bodyNote}>Note: Maximum of 3 images or files per field.</Text>

                    <View style = {styles.uploadContainer}>
                        <Text style = {styles.uploadContainerTitle}>Attach Prescription *</Text>
                    </View>
                            
                </View>
                <TouchableOpacity style={styles.reqButton} onPress={() => navigatePage("MakeRequest2")}>
                    <Text style={{ color: 'white' }}>Make a Request</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

            
            

        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8EB',
  },

  SmallHeader: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center', // Center the content vertically
    padding: 10,
    marginTop: 5,
  },

  textAndImage: {
    alignItems: 'center',

    margin: 25,
    marginTop: 15,
  },

  text: {
    fontSize: 15,
    fontFamily: 'OpenSans-Regular',
    color: '#E60965',
    textAlign: 'center',
    marginTop: 5
  }, 
  
  image: {
    width: 200,
    height: 200,
    margin: 20,
    marginBottom: 3,
  },

  bodyNote: {
    fontSize: 10,
    fontFamily: 'OpenSans-Regular',
    color: '#E60965',
    marginLeft: 30,
    marginBottom: 10,
  },

  bodyForm: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  form1: {
    height: 35,
    fontFamily: "OpenSans-Regular",
    borderColor: '#E60965', // Border color
    borderWidth: 1, // Border width
    borderRadius: 10, // Border radius
    paddingHorizontal: 10,
    marginBottom: 5,
    width: '90%',
    alignSelf: 'center', // Center the input horizontally
    backgroundColor: '#fff', // Background color
  },

  form2: {
    height: 70,
    fontFamily: "OpenSans-Regular",
    borderColor: '#E60965', // Border color
    borderWidth: 1, // Border width
    borderRadius: 10, // Border radius
    paddingHorizontal: 10,
    marginBottom: 5,
    width: '90%',
    alignSelf: 'center', // Center the input horizontally
    backgroundColor: '#fff', // Background color
  },
  
  uploadContainer: {
    height: 45,
    fontFamily: "OpenSans-Regular",
    borderColor: '#E60965', // Border color
    borderWidth: 1, // Border width
    borderRadius: 10, // Border radius
    paddingHorizontal: 10,
    marginBottom: 5,
    width: '70%',
    alignSelf: 'center', // Center the input horizontally
    backgroundColor: '#fff', // Background color
    
  },

  uploadContainerTitle: {
    color: '#E60965',
    margin: 15,
    marginLeft: 2,
  },

  reqButton: {
    backgroundColor: '#E60965',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 100,
    margin: 20,
  }
});

