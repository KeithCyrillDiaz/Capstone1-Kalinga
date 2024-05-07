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
import { useNavigation, useRoute } from '@react-navigation/native'; // Correct import

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import randomatic from 'randomatic';
import { BackHandler } from 'react-native';




export default function RequestorProfile() {

  const Requestor_ID = randomatic('Aa0', 20);

  const [formData, setFormData] = useState({
    Requestor_ID: Requestor_ID,
    userType: "Requestor",
    RequestStatus: "Pending",
      fullName: '',
      phoneNumber: '',
      emailAddress: '',
      homeAddress: '',
      city: '',
      medicalCondition: '',
      milkAmount: '',
      BabyCategory: '',
      ReasonForRequesting: '',
  });
  const handleInputChange = (field, value) => {
    if (field === 'BabyCategory') {
      console.log("Baby Category Value:", value);
      setFormData({ ...formData, BabyCategory: value }); // Update only BabyCategory
    } else if (field === 'city') {
      setFormData({ ...formData, city: value }); // Update only city
    } else {
      setFormData({ ...formData, [field]: value });
    }
  
  
  
    // Perform validation checks for required fields and show alerts if not valid
    if (field === 'fullName' && value.trim() === '') {
      Alert.alert('Full Name is required');
    } else if (field === 'phoneNumber' && !/^[0-9]+$/.test(value)) {
      Alert.alert('Phone Number must contain only numbers');
    } else if (field === 'emailAddress' && value.trim() === '') {
      Alert.alert('Email Address is required');
    } else if (field === 'homeAddress' && value.trim() === '') {
      Alert.alert('Home Address is required');
    } else if (field === 'milkAmount' && !/^[0-9]+$/.test(value)) {
      Alert.alert('Milk Amount must contain only numbers');
    } else if (field === 'ReasonForRequesting' && value.trim() === '') {
      Alert.alert('Reason for Requesting is required');
    }
  };

  const handleBackPress = () => {
      console.log("Back button pressed");
  };

  const navigation = useNavigation();

  const navigatePage = () => {
    setFormData(prevData => ({
      ...prevData,
      RequestStatus: 'Pending',
    }));
    navigation.navigate('MakeRequestReceipt', { formData: formData, BabyCategory: formData.BabyCategory, city: formData.city});
};

const handleChange = (name, value) => {
  setFormData(prevData => ({
    ...prevData,
    [name]: value,
  }));
};

useEffect(() => {
  const backAction = () => {
    navigation.navigate('Requestor Tabs'); // Navigate to AdminMenu screen on back button press
    return true; // Prevent default back button behavior (e.g., app exit)
  };

  const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

  return () => backHandler.remove(); // Cleanup the event listener on component unmount
}, []);

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
                    value={formData.fullName}
                    placeholder="Full Name *"
                    placeholderTextColor="#E60965"
                    onChangeText={(text) => handleInputChange('fullName', text)}
                />
                <TextInput
                    style={styles.form1}
                    value={formData.phoneNumber}
                    placeholder="Phone Number *"
                    placeholderTextColor="#E60965"
                    onChangeText={(text) => handleInputChange('phoneNumber', text)}
                />
                <TextInput
                    style={styles.form1}
                    value={formData.emailAddress}
                    placeholder="Email Address *"
                    placeholderTextColor="#E60965"
                    onChangeText={(text) => handleInputChange('emailAddress', text)}
                />
                <TextInput
                    style={styles.form2}
                    value={formData.homeAddress}
                    placeholder="Home Address *"
                    placeholderTextColor="#E60965"
                    onChangeText={(text) => handleInputChange('homeAddress', text)}

                
                />

                  <View style={styles.dropdownContainer1}>
                                  <Picker
                                selectedValue={formData.city}
                                style={{ height: 30, width: "100%", color: '#E60965'}}
                                onValueChange={(text) => handleInputChange('city', text)} // Update BabyCategory state

                              >
                                <Picker.Item label="Select City" value="" />
                                <Picker.Item label="Manila City" value="Manila City" />
                                <Picker.Item label="Quezon City" value="Quezon City" />
                              </Picker>
                              </View>

                <TextInput
                    style={styles.form1}
                    value={formData.medicalCondition}
                    placeholder="Medical Condition (if applicable)"
                    placeholderTextColor="#E60965"
                    onChangeText={(text) => handleInputChange('medicalCondition', text)}
                />
            <View style={styles.bodyForm1}>
                    <TextInput
                        style={styles.form3}
                        value={formData.milkAmount}
                        placeholder="Amount of milk to be requested (mL) *"
                        placeholderTextColor="#E60965"
                        onChangeText={(text) => handleInputChange('milkAmount', text)}
                    />
              
                  <View style={styles.dropdownContainer}>
                  <Picker
                    selectedValue={formData.BabyCategory} // Use formData.BabyCategory as the selected value
                    onValueChange={(text) => handleInputChange('BabyCategory', text)} // Update BabyCategory state
                    style={styles.dropdown}
                  >
                    <Picker.Item label="Baby Category" value="Baby Category" />
                    <Picker.Item label="Healthy Baby" value="Healthy " style={styles.dropdownItem} />
                    <Picker.Item label="Sick Baby" value="Sick " style={styles.dropdownItem} />
                    <Picker.Item label="Medically Fragile Baby" value="Medically Fragile" style={styles.dropdownItem} />
                    <Picker.Item label="Preterm Baby" value="Preterm " style={styles.dropdownItem} />
                  </Picker>
                </View>
              </View>
          

                    <TextInput
                        style={styles.form2}
                        value={formData.ReasonForRequesting}
                        placeholder="Reason for Requesting *"
                        placeholderTextColor="#E60965"
                        onChangeText={(text) => handleInputChange('ReasonForRequesting', text)}
                        />   

                    <Text style={styles.bodyNote}>Note: Maximum of 3 images or files per field.</Text>

                    <View style = {styles.uploadContainer}>
                        <Text style = {styles.uploadContainerTitle}>Attach Prescription *</Text>
                    </View>
                            
                </View>
                <TouchableOpacity style={styles.reqButton} onPress={() => navigatePage("MakeRequestReceipt")}>
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

  bodyForm1:{
    flexDirection: "row",
    alignSelf:"center",
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

  form3:{
    height: 52,
    fontFamily: "OpenSans-Regular",
    borderColor: '#E60965', // Border color
    borderWidth: 1, // Border width
    borderRadius: 10, // Border radius
    paddingHorizontal: 10,
    marginBottom: 5,
    width: '30%',
    alignSelf: 'center', // Center the input horizontally
    backgroundColor: '#fff',
    justifyContent: "space-between"
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
        height:10,
        marginLeft: 20,
        paddingBottom: 50

},

dropdownContainer1: {
  borderWidth: 1,
  borderColor: '#E60965',
  borderRadius: 10,
  paddingHorizontal: 10,
  marginBottom: 5,
  width: '90%',
  alignSelf: 'center',
  backgroundColor: '#fff',
  height:10,
  paddingBottom: 50

},


dropdown: {
  height: 10,
  color: '#E60965',



},

dropdownItem: {
  fontFamily: 'OpenSans-Regular',
  color: '#E60965',
  
}
});

