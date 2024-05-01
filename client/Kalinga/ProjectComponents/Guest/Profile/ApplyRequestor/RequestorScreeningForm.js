import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, TextInput, ScrollView, SafeAreaView, Alert} from 'react-native';
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { useNavigation } from '@react-navigation/native';
import randomatic from 'randomatic';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';

const ApplyAs_DonorISF = () => {

  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];
  
  const [selectedItem, setSelectedItem] = useState("")

  const [birthdate, setBirthdate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userBirthday, setUserBirthDay] = useState("")

   const handleDateChange = (name, selectedDate) => {
    console.log("Date: ", selectedDate)
    if(selectedDate > birthdate){
      Alert.alert("Invalid Birthdate", "Please input yopur proper birthday")
      return
    }
    console.log("Result: ", selectedDate - birthdate)
    const currentDate = selectedDate || birthdate;
    setShowDatePicker(false);

    const currentDatetoString = currentDate.toISOString()
    const birthDateArray = currentDatetoString.split("T")
    const splitbirthDateArray = birthDateArray[0].split("-")
    const Month = setMonth(splitbirthDateArray[1])
    const FormmattedBirthday = Month + " " + splitbirthDateArray[2]+ " " + splitbirthDateArray[0]
    // console.log("FormmattedBirthday: ", FormmattedBirthday)
    setUserBirthDay(FormmattedBirthday);
    birthdateFormat(currentDate)
    // setScreeningFormData({ ...screeningFormData, [name]: value });
    // birthDate
  };

  const setMonth = (num) => {
    console.log("num: ", num)
         if(num === "01") return "January"
    else if(num === "02") return "February"
    else if(num === "03") return "March"
    else if(num === "04") return "April"
    else if(num === "05") return "May"
    else if(num === "06") return "June"
    else if(num === "07") return "July"
    else if(num === "08") return "August"
    else if(num === "09") return "September"
    else if(num === "10") return "October"
    else if(num === "11") return "November"
    else if(num === "12") return "December"
    else "Invalid Month"

  }

  const applicantId = randomatic('Aa0', 20);
  const [screeningFormData, setScreeningFormData] = useState({
    Applicant_ID: applicantId,
    userType: "Requestor",
    fullName: '',
    Age: '',
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

const handleSelectItem = (item) => {
  setSelectedItem(item);
};

const handleChangeText = (name, value) => {
  console.log("value: ", value)
  setScreeningFormData({ ...screeningFormData, [name]: value });
};

  // const formatBirthday = (text) => {
  //   if (text.length === 2 || text.length === 5) {
  //     if (text.charAt(text.length - 1) !== '/') {
  //       text += '/';
  //     }
  //   }
  //   setBirthday(text);
  // };

  const navigation = useNavigation();

  const navigatePage = (Page, Data) => {
    navigation.navigate(Page, Data); // Navigate to the Login screen
};

const [value, setValue] = useState(null);
const [isFocus, setIsFocus] = useState(false);

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
              editable={false}
              onChangeText={(value) => handleChangeText('Age', value)}
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.inputBirthdayContainer, { elevation: 5 }]}> 
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={birthdate}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
            />
            )}
            <TextInput 
              onPress={() => setShowDatePicker(true)}
              placeholder="Birthdate"
              style={[styles.inputField]}
              onChangeText={(value) => handleChangeText('birthDate', value)}
              editable={false}
              value = {userBirthday}
            />
            <AntDesign onPress={() => setShowDatePicker(true)} style = {{position: "absolute", right: 10}} name="calendar" size={24} color="black" />
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
        <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
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

  dropdown: {
    height: 20,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
    width: '20%',
    marginTop: 15, // Adjust margin top to reduce the space between the text and the input field
    height: 45, // Adjust height
    marginLeft: -15, // Move the input field to the right
  },
  inputBirthdayContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5, // Border width
    borderRadius: 18, // Border radius
    borderColor: '#E60965', // Border color
    backgroundColor: '#FFFFFF', // Background color
    width: '80%',
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
