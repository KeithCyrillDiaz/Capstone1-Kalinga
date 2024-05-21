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
    const response = await axios.get(`${BASED_URL}/kalinga/getScreeningFormsApplicant_ID/${Requestor_ID}`)
    console.log(response.data.messages.message)
    if(response.data.screeningForms){
      setForm(response.data.screeningForms)
      setFormData(prevForm => ({
        ...prevForm,
        ageOfGestation: response.data.screeningForms.ageOfGestation,
        childBirthDate: response.data.screeningForms.childBirthDate,
        medicalCondition: response.data.screeningForms.medicalCondition,
      }))
    }
  }

  const [formData, setFormData] = useState({
    Requestor_ID: Requestor_ID,
      userType: "Requestor",
      RequestStatus: "Pending",
      fullName: userInformation.fullName,
      phoneNumber: userInformation.mobileNumber,
      emailAddress: userInformation.email,
      homeAddress: userInformation.homeAddress,
      ageOfGestation: '',
      childBirthDate: '',
      city: '',
      medicalCondition: '',
      milkBank: "",
      milkAmount: '',
      BabyCategory: '',
      ReasonForRequesting: userInformation.RFR,
      
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
      'ageOfGestation',
      'childBirthDate',
      'city',
      'medicalCondition',
      'milkBank',
      'milkAmount',
      'BabyCategory',
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
  },[formData.ReasonForRequesting, selectedImage])

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
    navigation.navigate(page, { selectedImage: selectedImage, formData: formData, screeningFormData: form });
};

const handleChange = (name, value) => {
  setFormData(prevData => ({
    ...prevData,
    [name]: value,
  }));
};


const handleImageUpload = async (attachmentType) => {
  try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
          return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [Dimensions.get('window').width, Dimensions.get('window').height],
          quality: 1,
          multiple: true, 
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
          let fileType = ''
        result.assets.forEach(image => {

          if (image.type === 'image' || !image.type.includes('/')) {
                    fileType = image.type + "/jpeg"

          } else {

            fileType = image.type

          }
        });
        
        setSelectedImage(prevState => ({
            ...prevState,
          
        
            [attachmentType]: ({
              uri: result.assets[0].uri,
              name: `${attachmentType}.png`, 
              type: fileType,
              userType: "Requestor",
              owner: userInformation.fullName,
              ownerID: userInformation.Requestor_ID
          
            })
            
        }));

        const numberOfObjects = Object.keys(selectedImage).length;
        if (numberOfObjects >= 3) setScrollableHorizontal(true);

        setImageContainer(true)
    }
        
      
  } catch (error) {
      Alert.alert('Error', 'Failed to pick an image.');
  }

}

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
                <Text 
                  style = {{
                    marginLeft: 20,
                    color: "#E60965",
                    fontSize: 20,
                    fontFamily: "Open-Sans-Bold",
                    marginBottom: 10,

                  }}
                  >Personal Information</Text>
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
                    multiline={true}
                    placeholder="Home Address *"
                    placeholderTextColor="#E60965"
                    onChangeText={(text) => handleInputChange('homeAddress', text)}
                />
                 
                <TextInput
                        style={styles.form2}
                        value={formData.ReasonForRequesting}
                        placeholder="Reason for Requesting *"
                        placeholderTextColor="#E60965"
                        onChangeText={(text) => handleInputChange('ReasonForRequesting', text)}
                        /> 
                  <View style={styles.dropdownContainer1}>
                    <Picker
                      selectedValue={formData.ageOfGestation}
                      style={{ height: 30, width: "100%", color: '#E60965'}}
                      onValueChange={(text) => handleInputChange('ageOfGestation', text)} // Update BabyCategory state
                    >
                      <Picker.Item label="Select Age of Gestation" value="" />
                      <Picker.Item label="Early Term" value="Early Term" />
                      <Picker.Item label="Full Term" value="Full Term" />
                      <Picker.Item label="Late Term" value="Late Term" />
                      <Picker.Item label="Post Term" value="Post Term" />
                    </Picker>
                </View>
         

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
                    style={[styles.form1, {paddingLeft: 25}]}
                    value={formData.childBirthDate}
                    placeholder="Child Birthday *"
                    placeholderTextColor="#E60965"
                    onChangeText={(text) => handleInputChange('emailAddress', text)}
                />         
                  <View
                    style={{
                      fontFamily: "OpenSans-Regular",
                      borderColor: '#E60965', // Border color
                      borderWidth: 1, // Border width
                      borderRadius: 10, // Border radius
                      paddingHorizontal: 10,
                      marginBottom: 5,
                      width: '90%',
                      alignSelf: 'center', // Center the input horizontally
                      backgroundColor: '#fff', // Background color
                    }}
                  >
                      <Picker
                        selectedValue={formData.medicalCondition}
                        style ={{color: '#E60965',}}
                        onValueChange={(itemValue) =>
                          handleChange("medicalCondition", itemValue)
                        }
                        >
                        <Picker.Item label="Medical Condition" value="" />
                        <Picker.Item label="Normal" value="Normal" />
                        <Picker.Item label="Sick" value="Sick" />
                    </Picker>
                  </View>
                  <View style={styles.dropdownContainer}>
                    <Picker
                      selectedValue={formData.BabyCategory} // Use formData.BabyCategory as the selected value
                      onValueChange={(text) => handleInputChange('BabyCategory', text)} // Update BabyCategory state
                      style={styles.dropdown}
                    >
                      <Picker.Item label="Baby Category" value="Baby Category" />
                      <Picker.Item label="Well Baby" value="Well Baby " style={styles.dropdownItem} />
                      <Picker.Item label="Sick Baby" value="Sick " style={styles.dropdownItem} />
                      <Picker.Item label="Medically Fragile Baby" value="Medically Fragile" style={styles.dropdownItem} />
                    </Picker>
                   </View> 

                    <View
                    style={{
                      fontFamily: "OpenSans-Regular",
                      borderColor: '#E60965', // Border color
                      borderWidth: 1, // Border width
                      borderRadius: 10, // Border radius
                      paddingHorizontal: 10,
                      marginBottom: 5,
                      width: '90%',
                      alignSelf: 'center', // Center the input horizontally
                      backgroundColor: '#fff', // Background color
                    }}
                  >
                      <Picker
                        selectedValue={formData.milkBank}
                        style ={{color: '#E60965',}}
                        onValueChange={(itemValue) =>
                          handleChange("milkBank", itemValue)
                        }
                        >
                        <Picker.Item label="Choose Milk Bank" value="" />
                        <Picker.Item label="Quezon City General Hospital - Human Milk Bank" value="Quezon City General Hospital - Human Milk Bank" />
                    </Picker>
                  </View>   
                  
              <View style={[styles.bodyForm1, 
                          {borderWidth: 1,
                          borderColor: '#E60965', 
                          borderRadius: 12,
                          backgroundColor: "white",
                          marginBottom:5,
                          paddingHorizontal: 10,
                          }]}>
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
                <TouchableOpacity style={styles.reqButton} onPress={() => navigatePage("MakeRequestUploadMedicalAbstract")}>
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

const styles = StyleSheet.create({
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
    width: "90%",
    alignSelf: "center",
    paddingVertical: 3
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
    width: '100%',
    alignSelf: 'center', // Center the input horizontally
    backgroundColor: '#fff',
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

