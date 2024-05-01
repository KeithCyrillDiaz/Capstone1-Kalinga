import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, TextInput, ScrollView, SafeAreaView, Alert} from 'react-native';
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { useNavigation } from '@react-navigation/native';
import randomatic from 'randomatic';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { BASED_URL } from '../../../../MyConstants.js';


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

  const [dateToday, setDateToday] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDate1Picker, setShowDate1Picker] = useState(false);
  const [userBirthday, setUserBirthDay] = useState("")
  const [userAge, setUserAge] = useState("")
  const [isEmailExisted, setIsEmailExisted] = useState(false)

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

const [isFormFilled, setIsFormFilled] = useState(false)
const checkForm = () => {
  const keysToCheck = [
    'Applicant_ID',
    'userType',
    'fullName',
    'Age',
    'birthDate',
    'email',
    'contactNumber',
    'homeAddress',
    'childName',
    'childAge',
    'sex',
    'childBirthDate',
    'birthWeight',
    'ageOfGestation',
    'medicalCondition'
    ];

    const isFormDataValid = keysToCheck.every(key => screeningFormData[key].trim() !== '');

    if (isFormDataValid) {
        console.log('All values until medical condition are valid');
        setIsFormFilled(true)
    } else {
        console.log('Some values until medical condition are empty');
        setIsFormFilled(false)
    }
}
   const handleDateChange = (event, selectedDate, info) => {
    if(selectedDate > dateToday){
      Alert.alert("Invalid Birthdate", "Please input your proper birthday")
      setShowDatePicker(false);
      setShowDate1Picker(false)
      return
    }
    if(info !== "Personal"){
      setShowDate1Picker(false);
    } else setShowDatePicker(false);
  
    setDateSelected(selectedDate)
    const age = calculateAge(selectedDate, dateToday)
    const birthDate =  formatBirthday(selectedDate)
    console.log("info: ", info)
    if(info === "infant") {
      console.log("infant", info)
      setScreeningFormData({ 
        ...screeningFormData, 
        childAge: age,
        childBirthDate: birthDate
      });
      return
    }
  setScreeningFormData({ 
    ...screeningFormData, 
    Age: age,
    birthDate: birthDate
  
  });
  setUserBirthDay(birthDate)
  };

  const formatBirthday = (date) => {
    console.log("SelectedDate: ", date)
    const currentDatetoString = date.toISOString()
    const birthDateArray = currentDatetoString.split("T")
    const splitbirthDateArray = birthDateArray[0].split("-")
    const Month = setMonth(splitbirthDateArray[1])
    const getDay = splitbirthDateArray[2].toString()
    let newDay = ""
    if(getDay.startsWith("0")){
      newDay = parseInt(getDay).toString();
      console.log("newDay: ", newDay)
    } else newDay = getDay
  
    const FormmattedBirthday = Month + " " + newDay + ", " + splitbirthDateArray[0]
    return FormmattedBirthday
  }

  const calculateAge = (birthDay, currentDate) => {
    const differenceMs = currentDate - birthDay;
    const age = Math.floor(differenceMs / (1000 * 60 * 60 * 24 * 365.25));
    setUserAge(age.toString())
    return age.toString()
  }

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


// useEffect(() => {
//   console.log('Screening Form Data:', screeningFormData);
// }, [screeningFormData]);
const handleSelectItem = (item) => {
  setSelectedItem(item);
};

const handleChangeText = (name, value) => {
  setScreeningFormData({ ...screeningFormData, [name]: value });

  if(name === "email" && value.includes("@") && (value.endsWith("com") || value.endsWith("ph"))){
    console.log("Email: ", value)
    checkEmail(value)
  }
  checkForm()
  return
};
  const navigation = useNavigation();

  const navigatePage = (Page, Data) => {
    navigation.navigate(Page, Data); // Navigate to the Login screen
};

const [value, setValue] = useState(null);
const [isFocus, setIsFocus] = useState(false);

const checkEmail = async (email) => {
  const response = await axios.get(`${BASED_URL}/kalinga/checkEmail/${email}`)
  if(response.data.messages.code === 1){
    console.log(response.data.messages.message)
    setIsEmailExisted(true)
    return
  } else setIsEmailExisted(false)
  return
}

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
              style={{
                flex: 1,
                color: userAge === "" ? 'gray': '#E60965', // Text color
                fontSize: 16, // Font size
                paddingVertical: 10, // Vertical padding
                textAlign: "center",
              }}
              editable={false}
              keyboardType="numeric"
              value={"Age: " + userAge}
            />
          </View>

          <View style={[styles.inputBirthdayContainer, { elevation: 5 }]}> 
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateSelected === new Date() ? dateToday : dateSelected}
              mode="date"
              display="spinner"
              onChange={(event, value) => handleDateChange(event, value, "Personal")}
            />
            )}
            <TextInput 
              placeholder="Birthdate"
              style={[styles.inputField, {color: userBirthday === "" ? 'gray': '#E60965',}]}
              editable={false}
              value = {userBirthday}
            />
            <AntDesign 
            onPress={() => setShowDatePicker(true)} 
            style = {{position: "absolute", right: 10}} 
            name="calendar" size={24} 
            color="black" />
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
        {isEmailExisted && (
          <Text 
          style = {{
            marginLeft: "10%", 
            marginTop: 5, 
            marginBottom: -10, 
            color: "red"}}>Email is already existing!</Text>
        )}
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
         
            <View style={[styles.inputBirthWeightContainer, { elevation: 5 }]}>
            <TextInput
              placeholder="Birth Weight (kg)"
              style={styles.inputField}
              
              onChangeText={(value) => handleChangeText('birthWeight', value)}
              keyboardType="numeric"
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
          {showDate1Picker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateSelected === new Date() ? dateToday : dateSelected}
              mode="date"
              display="spinner"
              onChange={(event, value) => handleDateChange(event, value, "infant")}
            />
            )}
            <View style = {{
              flexDirection: "row",
              alignItems: "center"
            }}>
              <TextInput
                placeholder="Birthdate"
                style={[styles.inputField]}
                editable={false}
                value = {screeningFormData.childBirthDate}
              />
              <AntDesign 
                onPress={() => setShowDate1Picker(true)} 
                style = {{position: "absolute", right: 10}} 
                name="calendar" size={24} 
                color="black"
              />
            </View>
            
          </View>

          <View style={[styles.inputAgeContainer1, { elevation: 5 }]}>
            <TextInput
                placeholder="Age"
                style={styles.inputField}
                onChangeText={(value) => handleChangeText('childAge', value)}
                value = {screeningFormData.childAge}
               
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
          <TouchableOpacity style={[
            styles.nextButton, 
              { 
                width: 150,
                opacity: isEmailExisted || !isFormFilled ? 0.5 : 1
              }
            ]}
            disabled = {isEmailExisted || !isFormFilled}
            onPress={() => navigatePage("RequestorMedicalAbstract", {screeningFormData: screeningFormData})}>
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
    width: '25%',
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
    width: '75%',
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
    width: '30%',
    marginTop: 15, // Adjust margin top to reduce the space between the text and the input field
    height: 45, // Adjust height
    marginLeft: 20, // Move the input field to the right
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
  width: '70%', // Adjust width as needed
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
  height: 45, // Adjust height,
  marginLeft: -15,
},
  inputAgeOfGestationContainer: {
  borderWidth: 0.5,
  borderRadius: 18,
  borderColor: '#E60965',
  backgroundColor: '#FFFFFF',
  width: '82%',
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
