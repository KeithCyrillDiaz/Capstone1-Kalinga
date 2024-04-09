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
import { Picker } from '@react-native-picker/picker';



export default function RequestorProfile() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [medicalCondition, setMedicalCondition] = useState('');
  const [milkAmount, setMilkAmount] = useState('');
  const [reasonForRequesting, setReasonForRequesting] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Healthy Baby');

  const handleInputChange = (value, setter) => {
      setter(value);
  };

  const navigation = useNavigation();

  const navigatePage = (Page) => {
      navigation.navigate(Page);
  };

  const handleBackPress = () => {
      console.log("Back button pressed");
  };

  const handleSubmit = () => {
      // Handle form submission
  };

  return (
      <SafeAreaView style={globalStyles.container}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
          <View style={globalHeader.SmallHeader}>
              <TouchableOpacity onPress={handleBackPress}>
                  <AntDesign name="arrowleft" size={24} color="white" style={{ position: 'absolute', top: 5, left: -180 }} />
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
                          value={fullName}
                          placeholder="Full Name *"
                          placeholderTextColor="#E60965"
                          onChangeText={(text) => handleInputChange(text, setFullName)}
                      />
                      <TextInput
                          style={styles.form1}
                          value={phoneNumber}
                          placeholder="Phone Number *"
                          placeholderTextColor="#E60965"
                          onChangeText={(text) => handleInputChange(text, setPhoneNumber)}
                      />
                      <TextInput
                          style={styles.form1}
                          value={email}
                          placeholder="Email Address *"
                          placeholderTextColor="#E60965"
                          onChangeText={(text) => handleInputChange(text, setEmail)}
                      />
                      <TextInput
                          style={styles.form2}
                          value={homeAddress}
                          placeholder="Home Address *"
                          placeholderTextColor="#E60965"
                          onChangeText={(text) => handleInputChange(text, setHomeAddress)}
                      />
                      <TextInput
                          style={styles.form1}
                          value={medicalCondition}
                          placeholder="Medical Condition (if applicable)"
                          placeholderTextColor="#E60965"
                          onChangeText={(text) => handleInputChange(text, setMedicalCondition)}
                      />
                      <View style={styles.bodyForm1}>
                          <TextInput
                              style={styles.form3}
                              value={milkAmount}
                              placeholder="Amount of milk to be requested (mL) *"
                              placeholderTextColor="#E60965"
                              onChangeText={(text) => handleInputChange(text, setMilkAmount)}
                          />
                          <View style={styles.dropdownContainer}>
                              <Picker
                                  selectedValue={selectedCategory}
                                  onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
                                  style={styles.dropdown}
                              >
                                  <Picker.Item label="Baby Category" value="Baby Category" />
                                  <Picker.Item label="Healthy Baby" value="Healthy Baby" />
                                  <Picker.Item label="Sick Baby" value="Sick Baby" />
                                  <Picker.Item label="Medically Fragile Baby" value="Medically Fragile Baby" />
                                  <Picker.Item label="Preterm Baby" value="Preterm Baby" />
                              </Picker>
                          </View>
                      </View>
                      <TextInput
                          style={styles.form2}
                          value={reasonForRequesting}
                          placeholder="Reason for Requesting *"
                          placeholderTextColor="#E60965"
                          onChangeText={(text) => handleInputChange(text, setReasonForRequesting)}
                      />
                      <Text style={styles.bodyNote}>Note: Maximum of 3 images or files per field.</Text>
                      <View style={styles.uploadContainer}>
                          <Text style={styles.uploadContainerTitle}>Attach Prescription *</Text>
                      </View>
                  </View>
                  <TouchableOpacity style={styles.reqButton} onPress={() => navigatePage("MakeRequestReceipt")}>
                      <Text style={{ color: 'white' }}>Next</Text>
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
      justifyContent: 'center',
      alignItems: 'center',
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
  bodyForm1: {
      flexDirection: "row",
      alignSelf: "center",
  },
  form1: {
      height: 35,
      fontFamily: "OpenSans-Regular",
      borderColor: '#E60965',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 5,
      width: '90%',
      alignSelf: 'center',
      backgroundColor: '#fff',
  },
  form2: {
      height: 70,
      fontFamily: "OpenSans-Regular",
      borderColor: '#E60965',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 5,
      width: '90%',
      alignSelf: 'center',
      backgroundColor: '#fff',
  },
  form3: {
      height: 52,
      fontFamily: "OpenSans-Regular",
      borderColor: '#E60965',
      borderWidth: 1,
      borderRadius: 10,
      fontSize: 10,
      paddingHorizontal: 10,
      marginBottom: 5,
      width: '30%',
      alignSelf: 'center',
      backgroundColor: '#fff',
      justifyContent: "space-between"
  },
  uploadContainer: {
      height: 45,
      fontFamily: "OpenSans-Regular",
      borderColor: '#E60965',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 5,
      width: '70%',
      alignSelf: 'center',
      backgroundColor: '#fff',
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
  },
  dropdownContainer: {
      borderWidth: 1,
      borderColor: '#E60965',
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 5,
      width: '55%',
      alignSelf: 'center',
      backgroundColor: '#fff',
      height: 10,
      marginLeft: 20,
      paddingBottom: 50
  },
  dropdown: {
      height: 10,
      color: '#E60965',
  },
});