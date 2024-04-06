import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import randomatic from 'randomatic';

const ApplyAs_DonorISF = () => {
  
  const applicantId = randomatic('Aa0', 20);
  const [screeningFormData, setScreeningFormData] = useState({
    Applicant_ID: applicantId,
    userType: "Requestor",
    fullName: '',
    age: '',
    birthDate: '',
    email: '',
    contactNumber: '',
    homeAddress: '',
    sex: '',
    childAge: '',
    childBirthDate: '',
    birthWeight: '',
    ageOfGestation: '',
    RFR: '',
});

const handleChangeText = (name, value) => {
  setScreeningFormData({ ...screeningFormData, [name]: value });
};

  const formatBirthday = (text) => {
    if (text.length === 2 || text.length === 5) {
      if (text.charAt(text.length - 1) !== '/') {
        text += '/';
      }
    }
    setBirthday(text);
  };

  const navigation = useNavigation();

  const navigatePage = (Page, Data) => {
    navigation.navigate(Page, Data); // Navigate to the Login screen
};

  return (
    
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
     

            <View style ={globalHeader.SmallHeader}>
                <Text style = {globalHeader.SmallHeaderTitle}>Apply as Requestor</Text>

            </View>

      <ScrollView
      overScrollMode='never'
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      >
      <SafeAreaView>

              <View style = {{alignItems: "center"}}>
                <View style = {{flexDirection: "row"}}>
                    <View style = {styles.IndicatedPage}/>
                    <View style = {styles.pageIndicator}/>
                    <View style = {styles.pageIndicator}/>
                </View>
        
               
                <Text style = {styles.title}>Initial Screening Form</Text>
              </View>

      <View style={styles.InformationContainer}>
 
        <Text style={styles.personalinfoText}>Personal Information</Text>

        
        <View style={[styles.inputFullNameContainer, { elevation: 5 }]}>
          <TextInput
            placeholder="Full name"
            style={styles.inputField}
            onChangeText={(value) => handleChangeText('fullName', value)}
          />
        </View>

        <View style={styles.inputRowContainer}>
        <View style={[styles.inputAgeContainer, { elevation: 5 }]}>
            <TextInput
              placeholder="Age"
              style={styles.inputField}
             
              onChangeText={(value) => handleChangeText('age', value)}
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.inputBirthdayContainer, { elevation: 5 }]}>
            <TextInput
              placeholder="Birthdate"
              style={styles.inputField}
             
              onChangeText={(value) => handleChangeText('birthDate', value)}
              

            />
          </View>
        </View>

        <View style={[styles.inputEmailAddressContainer, { elevation: 5 }]}>
          <TextInput
            placeholder="Email Address"
            style={styles.inputField}
           
            onChangeText={(value) => handleChangeText('email', value)}
            keyboardType="email-address"
          />
        </View>

        <View style={[styles.inputPhoneNumberContainer, { elevation: 5 }]}>
          <TextInput
            placeholder="Phone Number"
            style={styles.inputField}
            
            onChangeText={(value) => handleChangeText('contactNumber', value)}
            keyboardType="phone-pad"
          />
        </View>

        <View style={[styles.inputHomeAddressContainer, { elevation: 5 }]}>
          <TextInput
            placeholder="Home Address"
            style={styles.inputHomeAddressField}
           
            onChangeText={(value) => handleChangeText('homeAddress', value)}
          />
        </View>

        <Text style={styles.infantinfoText}>Infant Information</Text>
        <View style={styles.inputRowContainer1}>
            <View style={[styles.inputAgeContainer1, { elevation: 5 }]}>
              <TextInput
                placeholder="Age"
                style={styles.inputField}
             
                onChangeText={(value) => handleChangeText('childAge', value)}
               
              />
            </View>
          <View style={[styles.inputSexContainer, { elevation: 5 }]}>
              <TextInput
                placeholder="Sex"
                style={styles.inputField}
                onChangeText={(value) => handleChangeText('sex', value)}
              />
          </View>
        </View>

        <View style={styles.inputRowContainer2}>
          <View style={[styles.inputBirthdateContainer1, { elevation: 5 }]}>
            <TextInput
              placeholder="Birthdate"
              style={styles.inputField}
             
              onChangeText={(value) => handleChangeText('childBirthDate', value)}
         
            
            />
          </View>

          <View style={[styles.inputBirthWeightContainer, { elevation: 5 }]}>
            <TextInput
              placeholder="Birth Weight (kg)"
              style={styles.inputField}
              
              onChangeText={(value) => handleChangeText('birthWeight', value)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={[styles.inputAgeOfGestationContainer, { elevation: 5 }]}>
          <TextInput
            placeholder="Age of Gestation"
            style={styles.inputField}
           
            onChangeText={(value) => handleChangeText('ageOfGestation', value)}
          />
        </View>

        <View style={[styles.buttonContainer, { elevation: 5 }]}>
          <TouchableOpacity style={[styles.nextButton, { width: 150 }]}onPress={() => navigatePage("RequestorMedicalAbstract", {screeningFormData: screeningFormData})}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
        </View>
      </SafeAreaView>
      </ScrollView>
    </View>
  


  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8EB',
    flex: 1,
  },

    IndicatedPage: {
      height: 4,
      width: 50,
      backgroundColor: "#F94892",
      marginTop: "10%",
      marginHorizontal: "1%",
  },

  pageIndicator: {
      height: 4,
      width: 50,
      backgroundColor: "#FFEECC",
      marginTop: "10%",
      marginHorizontal: "1%",
  },

  title: {
      fontFamily: 'Open-Sans-Bold',
      fontSize: 20,
      color: '#E60965',
      marginVertical: "5%"
  },

  header: {
    ...globalHeader.HeaderContainer,
  },
  headerContent: {
    ...globalHeader.SmallHeader,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginLeft: 20,
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
    marginLeft: -37,
  },
  headerTitleText: {
    ...globalHeader.SmallHeaderTitle,
  },
  rectanglesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    marginTop: 20,
  },
  rectangle1: {
    width: 40,
    height: 4, 
    backgroundColor: '#F94892', // Color for Rectangle 1
    borderRadius: 10,
  },
  rectangle2: {
    width: 40,
    height: 4, 
    backgroundColor: '#FFEECC', // Color for Rectangle 2
    borderRadius: 10,
  },
  rectangle3: {
    width: 40,
    height: 4, 
    backgroundColor: '#FFEECC', // Color for Rectangle 3
    borderRadius: 10,
  },
  rectangle4: {
    width: 40,
    height: 4, 
    backgroundColor: '#FFEECC', // Color for Rectangle 4
    borderRadius: 10,
  },
  rectangle5: {
    width: 40,
    height: 4, 
    backgroundColor: '#FFEECC', // Color for Rectangle 5
    borderRadius: 10,
  },

  InformationContainer:{
    justifyContent: 'center',
    alignContent: 'center',
    // backgroundColor: "pink",
    marginLeft: 10,
  },
  isfText:{
    textAlign: 'center', // Center align the text
    marginTop: 30, // Adjust margin top as needed
    fontSize: 20, // Adjust the font size
    fontWeight: 'bold', // Apply bold font weight
    color: '#E60965', // Apply color to the text
  },
  personalinfoText:{
    textAlign: 'left', // Center align the text
    marginTop: 15, // Adjust margin top as needed
    paddingLeft: 30, // Increase left padding to move text to the right
    fontSize: 20, // Adjust the font size
    fontWeight: 'bold', // Apply bold font weight
    color: '#E60965', // Apply color to the text
  },
  inputField: {
    flex: 1,
    color: '#E60965', // Text color
    fontSize: 16, // Font size
    paddingVertical: 10, // Vertical padding
    paddingLeft: 10, // Add padding on the left to move text to the right
  },
  inputHomeAddressField:{
    flex: 1,
    color: '#E60965', // Text color
    fontSize: 16, // Font size
    paddingVertical: 10, // Vertical padding
    paddingLeft: 10, // Add padding on the left to move text to the right
    textAlignVertical: 'top', // Position the text at the top of the input field
  },
  inputFullNameContainer: {
    borderWidth: 0.5, // Border width
    borderRadius: 18, // Border radius
    borderColor: '#E60965', // Border color
    backgroundColor: '#FFFFFF', // Background color
    width: '80%',
    marginTop: 15, // Adjust margin top to reduce the space between the text and the input field
    height: 45, // Adjust height
    marginLeft: 30, // Move the input field to the right
  },
  inputRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 45,
    marginTop: 5,
  },
  inputAgeContainer: {
    borderWidth: 0.5, // Border width
    borderRadius: 18, // Border radius
    borderColor: '#E60965', // Border color
    backgroundColor: '#FFFFFF', // Background color
    width: '50%',
    marginTop: 15, // Adjust margin top to reduce the space between the text and the input field
    height: 45, // Adjust height
    marginLeft: -15, // Move the input field to the right
  },
  inputBirthdayContainer: {
    borderWidth: 0.5, // Border width
    borderRadius: 18, // Border radius
    borderColor: '#E60965', // Border color
    backgroundColor: '#FFFFFF', // Background color
    width: '50%',
    marginTop: 15, // Adjust margin top to reduce the space between the text and the input field
    height: 45, // Adjust height
    marginLeft: 15, // Move the input field to the right
  },
  inputEmailAddressContainer: {
    borderWidth: 0.5, // Border width
    borderRadius: 18, // Border radius
    borderColor: '#E60965', // Border color
    backgroundColor: '#FFFFFF', // Background color
    width: '80%', // Adjust the width as needed
    marginTop: 15, // Adjust margin top to reduce the space between the text and the input field
    height: 45, // Adjust height
    marginLeft: 30, // Move the input field to the right
  },
  inputPhoneNumberContainer: {
    borderWidth: 0.5, // Border width
    borderRadius: 18, // Border radius
    borderColor: '#E60965', // Border color
    backgroundColor: '#FFFFFF', // Background color
    width: '80%', // Adjust the width as needed
    marginTop: 15, // Adjust margin top to reduce the space between the text and the input field
    height: 45, // Adjust height
    marginLeft: 30, // Move the input field to the right
  },
  inputHomeAddressContainer: {
    borderWidth: 0.5, // Border width
    borderRadius: 18, // Border radius
    borderColor: '#E60965', // Border color
    backgroundColor: '#FFFFFF', // Background color
    width: '80%', // Adjust the width as needed
    marginTop: 15, // Adjust margin top to reduce the space between the text and the input field
    height: 90, // Adjust height
    marginLeft: 30, // Move the input field to the right
  },
  infantinfoText:{
    textAlign: 'left', // Center align the text
    marginTop: 15, // Adjust margin top as needed
    paddingLeft: 30, // Increase left padding to move text to the right
    fontSize: 20, // Adjust the font size
    fontWeight: 'bold', // Apply bold font weight
    color: '#E60965', // Apply color to the text
  },
  inputRowContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 45,
    marginTop: 5,
  },
inputAgeContainer1: {
    borderWidth: 0.5, // Border width
    borderRadius: 18, // Border radius
    borderColor: '#E60965', // Border color
    backgroundColor: '#FFFFFF', // Background color
    width: '50%',
    marginTop: 15, // Adjust margin top to reduce the space between the text and the input field
    height: 45, // Adjust height
    marginLeft: -15, // Move the input field to the right
  },
inputSexContainer: {
  borderWidth: 0.5, // Border width
  borderRadius: 18, // Border radius
  borderColor: '#E60965', // Border color
  backgroundColor: '#FFFFFF', // Background color
  width: '50%', // Adjust width as needed
  marginTop: 15, // Adjust margin top to reduce the space between the text and the input field
  height: 45, // Adjust height
  marginLeft: 20, // Move the input field to the right
},
inputRowContainer2: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginHorizontal: 45,
  marginTop: 5,
},
inputBirthdateContainer1: {
  borderWidth: 0.5,
  borderRadius: 18,
  borderColor: '#E60965',
  backgroundColor: '#FFFFFF',
  width: '50%', // Adjust width as needed
  marginTop: 15,
  height: 45, // Adjust height
  marginLeft: -15,
},
  inputBirthWeightContainer: {
  borderWidth: 0.5,
  borderRadius: 18,
  borderColor: '#E60965',
  backgroundColor: '#FFFFFF',
  width: '50%', // Adjust width as needed
  marginTop: 15,
  height: 45, // Adjust height
  marginLeft: 20,
},
  inputAgeOfGestationContainer: {
  borderWidth: 0.5,
  borderRadius: 18,
  borderColor: '#E60965',
  backgroundColor: '#FFFFFF',
  width: '80%',
  marginTop: 15,
  height: 45, // Adjust height
  marginLeft: 30,
},

buttonContainer: {
  alignItems: 'center', // Center items horizontally
  marginTop: 5, // Adjust margin as needed
  marginBottom: 10,
},

nextButton: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  backgroundColor: '#E60965',
  marginTop: 20,
  alignItems: 'center',
},
nextButtonText: {
  fontWeight: 'bold',
  paddingBottom: 5,
  fontSize: 20,
  alignItems: 'center',
  color: 'white',
},
});

export default ApplyAs_DonorISF;
