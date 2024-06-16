// Requestor Profile
import  React, { useState, useEffect } from 'react';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { Dropdown } from 'react-native-element-dropdown';
import {GestationData, GestationExplanation, sexData, medicalConditionData} from '../../../Guest/Profile/ageofGestationData.js'

import { 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  Dimensions,
  Image,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'; // Correct import
import * as ImagePicker from 'expo-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import ImageZoom from 'react-native-image-pan-zoom';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { BASED_URL } from '../../../../MyConstants.js';


export default function RequestorProfile({route}) {

  const userInformation = route.params.data
  const Requestor_ID = route.params.data.Requestor_ID

  const [isFormFilled, setIsFormFilled] = useState(false)
  const [selectedImage, setSelectedImage] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [scrollableHorizontal, setScrollableHorizontal] = useState(false)
  const [imageContainer, setImageContainer] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [form, setForm] = useState({})

   //Dropdowns
   const [isGestationFocus, setIsGestationFocus] = useState(false)
   const [gestationValue, setGestationValue] = useState("")

  let city

  const fetchScreeningForm = async () => {
    setIsLoading(true)
    try{
      const response = await axios.get(`${BASED_URL}/kalinga/getScreeningFormsApplicant_ID/${Requestor_ID}`)
      console.log(response.data.messages.message)
      if(response.data.screeningForms){
        setForm(response.data.screeningForms)
        setFormData(prevForm => ({
          ...prevForm,
          childBirthDate: response.data.screeningForms.childBirthDate,
          ReasonForRequesting: response.data.screeningForms.RFR,
        }))
        
      }
    } catch(error) {
      console.log("Error Fetching screening form", error)
    } finally {
      setIsLoading(false)
    }

  }
  const [formData, setFormData] = useState({
    Requestor_ID: Requestor_ID,
      userType: "Requestor",
      RequestStatus: "Pending",
      barangay: userInformation.barangay || '',     
      fullName: userInformation.fullName,
      phoneNumber: userInformation.mobileNumber,
      emailAddress: userInformation.email,
      homeAddress: userInformation.homeAddress,
      childBirthDate: '',
      city: 'Quezon CIty',
      milkBank: "",
      milkAmount: '',
      ReasonForRequesting: '',
  });

  const getCity = () => {

    if(userInformation.homeAddress.endsWith("City")){
      const addressArray = userInformation.homeAddress.split(" ")
      if( addressArray[addressArray.length - 1] === "City")
        city = addressArray[addressArray.length - 2] + " " + addressArray[addressArray.length - 1]
    }
    return
  }
  
  
 

  useEffect(() => {
    fetchScreeningForm();
    getCity();
  },[])


  const checkForm = () => {
    console.log("formData: ", formData)
    let keysToCheck = [
      'fullName',
      'phoneNumber',
      'emailAddress',
      'homeAddress',
      'childBirthDate',
      'city',
      'milkBank',
      'milkAmount',
      'ReasonForRequesting',
      ];
      const isFormDataValid = keysToCheck.every(key => formData[key].trim() !== '');
  
      if (isFormDataValid) {
          console.log('All values until medical condition are valid');
          setIsFormFilled(true)
          
      } else {
          console.log('Some values until medical condition are empty');
          setIsFormFilled(false)
      }
  }

  useEffect(()=> {
    checkForm()
  },[
    formData.ReasonForRequesting,
    formData.city,
    formData.milkBank,
    formData.milkAmount
  ])

  const handleInputChange = (field, value) => {
   if (field === 'city') {
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

  const navigation = useNavigation();
  const handleBackPress = () => {
      navigation.goBack()
  };

  

  const navigatePage = (page) => {
    setFormData(prevData => ({
      ...prevData,
      RequestStatus: 'Pending',
    }));
    checkForm()
    console.log(formData)
    if(!isFormFilled){
      if(!isFormFilled)
        Alert.alert("Form Incomplete", "Please complete all required fields.");
      else
        Alert.alert("Image Required", "Please upload your prescription.");
      return
    }
    navigation.navigate(page, { formData: formData });
};

const handleChange = (name, value) => {
  setFormData(prevData => ({
    ...prevData,
    [name]: value,
  }));
};

if(!isLoading){
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
              <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
              />

              <View style={styles.body}>
              <Text 
                style = {{
                  marginLeft: 20,
                  color: "#E60965",
                  fontSize: 20,
                  fontFamily: "Open-Sans-Bold",
                  marginBottom: 10,

                }}
                >Personal Information</Text>
                  <Text style={styles.bodyNote}>Note: Bold fields are not editable.</Text>
                  <TextInput
                  style={[styles.form1, {fontFamily:"Open-Sans-SemiBold"}]}
                  value={formData.fullName}
                  placeholder="Full Name *"
                  placeholderTextColor="#E60965"
                  onChangeText={(text) => handleInputChange('fullName', text)}
                  editable={false}
              />
              <TextInput
                  style={[styles.form1, {fontFamily:"Open-Sans-SemiBold"}]}
                  value={formData.phoneNumber}
                  placeholder="Phone Number *"
                  placeholderTextColor="#E60965"
                  maxLength={11}
                  onChangeText={(text) => handleInputChange('phoneNumber', text)}
                  editable={false}
                  
              />
              <TextInput
                  style={[styles.form1, {fontFamily:"Open-Sans-SemiBold"}]}
                  value={formData.emailAddress}
                  placeholder="Email Address *"
                  placeholderTextColor="#E60965"
                  onChangeText={(text) => handleInputChange('emailAddress', text)}
                  editable={false}
              />
              <TextInput
                  style={[styles.form2, {fontFamily:"Open-Sans-SemiBold"}]}
                  value={formData.homeAddress}
                  multiline={true}
                  placeholder="Home Address *"
                  placeholderTextColor="#E60965"
                  onChangeText={(text) => handleInputChange('homeAddress', text)}
                  editable={false}
              />
               
              <TextInput
                      style={styles.form2}
                      value={formData.ReasonForRequesting}
                      placeholder="Reason for Requesting *"
                      placeholderTextColor="#E60965"
                      onChangeText={(text) => handleInputChange('ReasonForRequesting', text)}
                      /> 
                {/* <View style={styles.dropdownContainer1}>
                  <Picker
                    selectedValue={formData.ageOfGestation}
                    style={{ height: 30, width: "100%", color: '#E60965',}}
                    onValueChange={(text) => handleInputChange('ageOfGestation', text)} 
                  >
                    <Picker.Item label="Select Age of Gestation" value="" />
                    <Picker.Item label="Early Term" value="Early Term" />
                    <Picker.Item label="Full Term" value="Full Term" />
                    <Picker.Item label="Late Term" value="Late Term" />
                    <Picker.Item label="Post Term" value="Post Term" />
                  </Picker>
              </View> */}
       

            <TextInput
                  style={[styles.form1, {fontFamily:"Open-Sans-SemiBold"}]}
                  value={formData.city}
                  editable={false}
              />

              <Text 
                style = {{
                  marginLeft: 20,
                  color: "#E60965",
                  fontSize: 20,
                  fontFamily: "Open-Sans-Bold",
                  marginTop:20,
                  marginBottom: 10,

                }}
                >Infant Information</Text>
                <TextInput
                  style={[styles.form1, {paddingLeft: 25, fontFamily: "Open-Sans-SemiBold"}]}
                  value={formData.childBirthDate}
                  placeholder="Child Birthday *"
                  placeholderTextColor="#E60965"
                  onChangeText={(text) => handleInputChange('emailAddress', text)}
                  editable={false}
              />         
    
                  <View style={styles.dropDown}>
                    <Picker
                      selectedValue={formData.milkBank}
                      style ={{color: '#E60965'}}
                      onValueChange={(itemValue) =>
                        handleChange("milkBank", itemValue)
                  
                      }
                      >
                      <Picker.Item label="Choose Milk Bank" value="" />
                      <Picker.Item label="Quezon City General Hospital - Human Milk Bank" value="Quezon City General Hospital - Human Milk Bank" />
                  </Picker>
                </View>   
                
            <View style={styles.dropDown}>
                  <Picker
                      selectedValue={formData.milkAmount}
                      style ={{
                        color: '#E60965', 
                      }}
                      onValueChange={(itemValue) =>
                        handleChange("milkAmount", itemValue)
                      }
                      >
                      <Picker.Item label="Amount of Milk to be requested" value="" />
                      <Picker.Item label="100 ml" value="100" />
                      <Picker.Item label="200 ml" value="200" />
                  </Picker>              
            </View>
                    

                  {/* <TouchableOpacity onPress={() => handleImageUpload("Prescription")} style = {styles.uploadContainer}>
                      <Text style = {styles.uploadContainerTitle}>Attach Prescription *</Text>
                  </TouchableOpacity> */}

                  {imageContainer && (
                    <View  style = {{
                      height: 150,
                      marginBottom: 20,
                      borderWidth: 1,
                      backgroundColor: "white",
                      paddingLeft: 10,
                      paddingRight: 10,
                      borderColor: "#E60965",
                      borderRadius: 15,
                      elevation: 5,
                      marginTop: 20,
                      marginHorizontal: "10%",
                      alignItems: "center"
                      }}>
                      <ScrollView 
                        showsHorizontalScrollIndicator={true}
                        overScrollMode='never'
                        horizontal={scrollableHorizontal}
                      contentContainerStyle={{ flexDirection: 'row', }}
                    >
                        {Object.entries(selectedImage).map(([attachmentType, value]) => (
                                  <TouchableOpacity
                                      key={attachmentType}
                                      onPress={() => {
                                          setSelectedImageUrl(value.uri);
                                          setModalVisible(true);
                                      }}
                                  >
                                      <View style={{ marginHorizontal: 5 , alignItems: "center"}}>
                                          <Text style ={{
                                            textAlign: "center",
                                            color: "#E60965",
                                            marginTop: 7,
                                        
                                          }}>{attachmentType}</Text>
                                          <Image
                                              source={{ uri: value.uri }}
                                              style={{ width: 100, height: 100, marginTop: 7, resizeMode: 'cover',}}
                                          />
                                      </View>
                                  </TouchableOpacity>
                              ))}

                      </ScrollView>
                  </View>
              )}
          
                          
              </View>
              <TouchableOpacity style={styles.reqButton} onPress={() => navigatePage("SetMethod")}>
                  <Text style={{ color: 'white' }}>Next</Text>
              </TouchableOpacity>
          </View>
      </ScrollView>

      <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                <ImageZoom
                    cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height}
                    imageWidth={Dimensions.get('window').width}
                    imageHeight={Dimensions.get('window').height * 1} // Adjust the height as needed
                    enableSwipeDown={true}
                    onSwipeDown={() => setModalVisible(false)} // Close modal on swipe down
                    style={{ backgroundColor: 'black' }} // Set background color to black to avoid seeing the underlying content
                >
                    <Image
                        source={{ uri: selectedImageUrl }}
                        style={{ width: '100%', height: '100%' }}
                    />
                </ImageZoom>
                    <TouchableHighlight
                        style={styles.closeButton}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableHighlight>
                </View>
            </Modal>

            <Spinner
            visible={isLoading}
            textContent={'Loading...'}
            textStyle={{ color: '#FFF' }}
          />
    

          
          

      </SafeAreaView>
);
}
   
}

const styles = StyleSheet.create({

  dropDown: {
    fontFamily: "OpenSans-Regular",
    borderColor: '#E60965', // Border color
    borderRadius: 10, // Border radius
    paddingHorizontal: 10,
    marginBottom: 5,
    width: '90%',
    alignSelf: 'center', // Center the input horizontally
    backgroundColor: '#fff', // Background color
    elevation:7,
    marginVertical: 7,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF8EB',
  },

  inputAgeOfGestationContainer: {
    width: '95%',
    height: 45, // Adjust height
    backgroundColor: "white",
    borderRadius: 18,
  
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
    fontSize: 12,
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
    width: "90%",
    alignSelf: "center",
    paddingVertical: 3
  },

 
  form1: {
    paddingVertical:7,
    borderColor: '#E60965', // Border color
    borderRadius: 10, // Border radius
    paddingHorizontal: 10,
    marginBottom: 5,
    width: '90%',
    alignSelf: 'center', // Center the input horizontally
    backgroundColor: '#fff', // Background color
    elevation: 7,
    color: '#E60965',
    fontFamily: "OpenSans-Regular",
    marginVertical: 7,
  },

  form2: {
    height: 70,
    fontFamily: "OpenSans-Regular",
    borderColor: '#E60965', // Border color
    borderRadius: 10, // Border radius
    paddingHorizontal: 10,
    marginBottom: 5,
    width: '90%',
    alignSelf: 'center', // Center the input horizontally
    backgroundColor: 'white', // Background color
    color: '#E60965',
    fontFamily: "OpenSans-Regular",
    elevation:7,
    marginVertical: 7,
  },

  
  uploadContainer: {
    fontFamily: "OpenSans-Regular",
    borderColor: '#E60965', // Border color
    borderWidth: 1, // Border width
    borderRadius: 10, // Border radius
    marginBottom: 5,
    width: '70%',
    alignSelf: 'center', // Center the input horizontally
    backgroundColor: '#fff', // Background color
    padding: 10
  },

  uploadContainerTitle: {
    color: '#E60965',
    textAlign: "center",
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
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        height:10,
        paddingBottom: 50,
        marginVertical: 7,
},

dropdownContainer1: {
  borderColor: '#E60965',
  borderRadius: 10,
  paddingHorizontal: 10,
  marginBottom: 5,
  width: '90%',
  alignSelf: 'center',
  backgroundColor: '#fff',
  height:10,
  paddingBottom: 50,
  elevation:7,
  color: '#E60965',
  fontFamily: "OpenSans-Regular",
  marginVertical:7,
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

