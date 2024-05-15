//Guest EducLibrary
import React, { useState, useEffect } from "react";
import { 
  ScrollView, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar,
  StyleSheet,
  TextInput, 
  TouchableOpacity,
  Alert,
  Modal,
  FlatList
} from 'react-native';
import { globalStyles } from "../../../../styles_kit/globalStyles.js";
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { useNavigation } from '@react-navigation/native';
import randomatic from 'randomatic';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import { BASED_URL } from "../../../../MyConstants.js";
import phil from "philippine-location-json-for-geer";
import ProvincesData from '../Provinces.json'
import { GestationData, GestationExplanation, sexData} from "../ageofGestationData.js";


const DonorScreeningForm = () => {

    const navigation = useNavigation();

  const navigatePage = (Page, data) => {
    console.log("check Screening Form: ", screeningFormData)
    if(!checkName)return
    if(!checkAgeValidity()) return
    checkForm("Screening Form")
    if(!isFormFilled) {
      Alert.alert("Invalid Form", "Please complete the form first")
      return
    }
    navigation.navigate(Page, data);
  };

  const applicantId = randomatic('Aa0', 20) + Date.now();

  const [screeningFormData, setScreeningFormData] = useState({
    Applicant_ID: applicantId ,
    userType: "Donor",
    Municipality: '',
    fullName: '',
    Age: '',
    birthDate: '',
    email: '',
    contactNumber: '',
    homeAddress: '',
    childName: '',
    childAge: '',
    sex: '',
    childBirthDate: '',
    birthWeight: '',
    ageOfGestation: '',
    typeOfDonor: '',
    QA: '',
    QB: '',
    QB_Reason: '',
    Q1: '',
    Q2: '',
    MH1: '',
    MH2: '',
    MH2_Reason: '',
    MH3: '',
    MH4: '',
    MH5: '',
    MH6: '',
    MH7: '',
    MH8: '',
    MH8_Reason: '',
    MH9: '',
    MH10: '',
    MH11: '',
    MH12: '',
    MH13: '',
    MH14: '',
    MH14_Reason: '',
    SH1: '',
    SH2: '',

});

// Handler to update the state with the entered values
const [value, setValue] = useState(null);
const [textFocus, setTextFocus] = useState(false)

//validity
const [isEmailExisted, setIsEmailExisted] = useState(false)
const [isFormFilled, setIsFormFilled] = useState(false)
const [isEmailValid, setIsEmailValid]= useState(false)
const [isAgeValid, setIsAgeValid] = useState(true)
const [isChildAgeValid, setIsChildAgeValid] = useState(true)

 //Dropdowns
 const [openSexDropdown, setOpenSexDropdown] = useState(false)
 const [isRegionFocus, setIsRegionFocus] = useState(false);
 const [isMunicipalityFocus, setIsMunicipalityFocus] = useState(false);
 const [isProvincesFocus, setIsProvincesFocus] = useState(false);
 const [isBarangayFocus, setIsBarangayFocus] = useState(false);
 const [isGestationFocus, setIsGestationFocus] = useState(false)

 //Places
 const [listProvinces, setListProvinces] = useState(null)
 const [listCity, setListCity] = useState(null)
 const [listBarangays, setListBarangays] = useState(null)

 //Values
 const [regionCode, setRegionCode] = useState("")
 const [provinceCode, setProvinceCode] = useState("")
 const [municipalityCode, setMunicipalityCode] = useState("")
 const [barangayCode, setBarangayCode] = useState("")
 const [gestationValue, setGestationValue] = useState("")

//BirthDay
 const [dateToday, setDateToday] = useState(new Date());
 const [dateSelected, setDateSelected] = useState(new Date())
 const [showDatePicker, setShowDatePicker] = useState(false);
 const [showDate1Picker, setShowDate1Picker] = useState(false);
 const [userBirthday, setUserBirthDay] = useState("")

 //Modal
 const [openGestationInfo, setOpenGestationInfo] = useState(false)

const handledSaveSex = (value) => {
  setScreeningFormData({
    ...screeningFormData,
    sex: value
  })
}

const checkForm = (value) => {
  let keysToCheck = [
    'Applicant_ID',
    'userType',
    'Municipality',
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
    ];

    if(value === "Address") {
      keysToCheck = [
        'Municipality',
        'Barangay',
      ]
      const isFormDataValid = keysToCheck.every(key => address[key].trim() !== '');
      if(isFormDataValid) return true
      else return false
    }

    const isFormDataValid = keysToCheck.every(key => screeningFormData[key].trim() !== '');

    if (isFormDataValid) {
        console.log('All values values of forms are valid');
        setIsFormFilled(true)
    } else {
        console.log('Some values until are empty');
        setIsFormFilled(false)
    }
}


const checkEmail = async (email) => {
  const response = await axios.get(`${BASED_URL}/kalinga/checkEmail/${email}`)
  if(response.data.messages.code === 1){
    console.log(response.data.messages.message)
    setIsEmailExisted(true)
    return
  } else setIsEmailExisted(false)
  return
}

const getProvnincesByRegCode = (id) => ProvincesData.filter(province => province.reg_code === id);
const fetchProvinces = (region_code) => {
  const provinces = getProvnincesByRegCode(region_code)
  const provincesList = provinces.map(province => ({ label: province.name, value: province.prov_code}))
  setListProvinces(provincesList)
  return
}

// const getMunicipalityByProvCode = (id) => citiesData.filter(province => province.prov_code === id);

const fetchMunicipality = (prov_code) => {

  // const municipality = getMunicipalityByProvCode(prov_code)
  const municipality = phil.getCityMunByProvince(prov_code)
  const municipalityList  = municipality.map(city => ({ label: city.name, value: city.mun_code}))
  const municipalitySortedData = municipalityList.sort((a, b) => a.label.toLowerCase() < b.label.toLowerCase() ? -1 : a.label.toLowerCase() > b.label.toLowerCase() ? 1 : 0);
  setListCity(municipalitySortedData)
  return
}

const fetchBarangays = (city_code) => {
  const barangays = phil.getBarangayByMun(city_code)
  const barangayList = barangays.map(barangay => ({ label: barangay.name, value: barangay.brgy_code}))
  const barangaySortedData = barangayList.sort((a, b) => a.label.toLowerCase() < b.label.toLowerCase() ? -1 : a.label.toLowerCase() > b.label.toLowerCase() ? 1 : 0);
  setListBarangays(barangaySortedData)
  return
}

const [address, setAddress] = useState({
  Municipality: "",
  Barangay: ""
})

// console.log("Form: ", screeningFormData)
const updateAddress = (label, name) => {
  
  let data = label;

  if (label.toLowerCase().includes("city")) {
    data = formatCity(label); // format City
  }

  const result = uncapitalizedString(data);
  // console.log("result: ", result);
  if(name === "Municipality"){
    console.log("City: ", result)
    setScreeningFormData(prevFormData => ({
      ...prevFormData,
      [name]: result
    }))
  }
  setAddress(prevAddress => {
    const updatedAddress = {
      ...prevAddress,
      [name === "Municipality" ? "Municipality" : "Barangay"]: result
    };
    return updatedAddress;
  });
};


const uncapitalizedString = (string) => {
  const trimmedString = string.trim();
  const formattedString = trimmedString.toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
  return formattedString
}

const formatCity = (city) => {
  if(!city) return
  if(!city.toLowerCase().includes("city")) return
  const cityArray = city.toLowerCase().split("of")
  if(cityArray[0].includes("city")){
    const cityName = cityArray[1] + " " + cityArray[0]
    const result = uncapitalizedString(cityName)
    console.log(result)
    return result
  }
}


const handleChangeText = (name, value) => {
  setScreeningFormData({ ...screeningFormData, [name]: value });
    if(name === "email" && value.includes("@") && (value.endsWith("com") || value.endsWith("ph"))){
      console.log("Email: ", value)
      setIsEmailValid(true)
      checkEmail(value)
    }
    return
};


const checkAgeValidity = () => {
  const {Age, childAge} = screeningFormData
  if(childAge.includes("days") || childAge.includes("months"))return
  const motherAge = parseInt(Age)
  const infantAge = parseInt(childAge)
  if(motherAge < 13) {
    Alert.alert("Invalid Mother Age"," Please input your proper birthday")
    setIsAgeValid(false)
    return
  }

  if(motherAge <= infantAge && Age !== "" && childAge !== ""){
    Alert.alert("Invalid Ages"," Please input the proper birthday")
    setIsAgeValid(false)
    setIsChildAgeValid(false)
    return false
  }

  if(motherAge - infantAge <= 12){
    Alert.alert("Invalid Infant Age","The age difference between the infant and the mother should be at least 13 years.")
      setIsAgeValid(false)
      setIsChildAgeValid(false)
      return false
  }

 
  setIsAgeValid(true)
  setIsChildAgeValid(true)
  return true
}

// const checkChildAgeValidty = (selectedDate, currentDate) => {
//   const childDate = new Date(selectedDate)
//   const dateToday = new Date(currentDate)
//   const yearOfChild = childDate.getFullYear()
//   const yearToday = dateToday.getFullYear()

//   if(yearOfChild !== yearToday) {
//     setIsChildAgeValid(false)
//     return
//   }

//   // const monthToday = dateToday.getMonth()
//   // const childMonth = childDate.getMonth()

//   // const result = parseInt(monthToday) - childMonth()
//   // console.log("result, ", result)
//   // if(result > 6){
//   //   Alert.alert("Sorry", "This milkbank only accepts New born Babies up to 5 month old Babies")
//   //   setIsChildAgeValid(false)
//   //   return
//   // }
// }

const checkName = () => {
  const { fullName } = screeningFormData
  console.log(fullName)
  if(fullName === "") return false
  
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if(!nameRegex.test(fullName)) {
    Alert.alert("Invalid Full Name","Please Input your proper name")
    return false
  }
  return true
}

const handleDateChange = (event, selectedDate, info) => {
    if(info !== "Personal"){
    setShowDate1Picker(false);
  } else setShowDatePicker(false);

  if(selectedDate === dateToday)return

  // if(info === "infant")checkChildAgeValidty(selectedDate, dateToday)

  if(selectedDate > dateToday){
    Alert.alert("Invalid Birthdate", "Please input your proper birthday")
    return
  }
  
  setDateSelected(selectedDate)
  
  const age = calculateAge(selectedDate, dateToday, info)
  const birthDate =  formatBirthday(selectedDate)

  if(info === "infant") {
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
  const currentDatetoString = date.toISOString()
  const birthDateArray = currentDatetoString.split("T")
  const splitbirthDateArray = birthDateArray[0].split("-")
  const Month = setMonth(splitbirthDateArray[1])
  const getDay = splitbirthDateArray[2].toString()
  let newDay = ""
  if(getDay.startsWith("0")){
    newDay = parseInt(getDay).toString();
  } else newDay = getDay

  const FormmattedBirthday = Month + " " + newDay + ", " + splitbirthDateArray[0]
  return FormmattedBirthday
}

const calculateAge = (birthDay, currentDate, info) => {
  const differences = currentDate - birthDay;
  console.log("differences: ", differences)
  const age = Math.floor(differences / (1000 * 60 * 60 * 24 * 365.25));
  let finalAge = age.toString()

  if(finalAge === "0" && info === "infant") {

    finalAge  = parseInt(age.toString()) > 1
    ? age.toString() + " yrs old" 
    : age.toString() + " yr old"

    const childYear = birthDay.getFullYear();
    const yearToday = currentDate.getFullYear();
    const childMonth= birthDay.getMonth();
    const monthToday = currentDate.getMonth();
    const childDay = birthDay.getDate();
    const dayToday = currentDate.getDate();

      const result = childYear === yearToday 
      ? monthToday - childMonth
      : (monthToday + 12) - childMonth

      finalAge = result > 1 ? result + " months" : result + " month" 

      if(result === 0 ){
        const childAge = dayToday - childDay

        if( childAge === 0) return finalAge = "New Born"
        else return finalAge = childAge + " days"
      }
  
  }
    
  return finalAge
}

const setMonth = (num) => {
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

useEffect(() => {
  if(screeningFormData.email !== ""){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(screeningFormData.email)){
      setIsEmailValid(false)
    } 
  }
},[screeningFormData.email])

useEffect(() => {
  checkAgeValidity()
},[screeningFormData.birthDate, screeningFormData.childBirthDate])


//update screening form after address data changes
useEffect(() => {
  // console.log("check Address after function: ", address)
  if (checkForm("Address")) {
    setScreeningFormData(prevData => ({
      ...prevData,
      homeAddress: address.Barangay + " " + address.Municipality
    }));
  }
}, [address.Barangay, address.Municipality])

useEffect(() => {
  //checkForm
  checkForm("Screening Form")
}, [screeningFormData.ageOfGestation])

  return (
    

      <SafeAreaView style = {styles.SafeArea}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Apply as Donor</Text>
            </View>
          <ScrollView 
            style = {globalStyles.ScrollView}
            overScrollMode='never'
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
               <View style={styles.rectanglesContainer}>
                    <View style={styles.rectangleIndicator}></View>
                    <View style={styles.rectangle}></View>
                    <View style={styles.rectangle}></View>
                    <View style={styles.rectangle}></View>
                    <View style={styles.rectangle}></View>
                </View>

                <Text style = {styles.title}>Initial Screening Form</Text>

                

              <View style = {styles.flex_start}>
                <Text style = {globalStyles.titleParagraph}>Personal Information</Text>
              </View>
              <View style = {styles.container}>
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Full Name"
                        placeholderTextColor="#E60965"
                        onChangeText={(value) => handleChangeText('fullName', value)}
                    />
                    <View style = {{
                      flexDirection: "row",
                      marginHorizontal: "4%",

                    }}>
                    <TextInput
                        style={styles.ageInputField}
                        placeholder="Age"
                        placeholderTextColor="#E60965"
                        editable={false}
                        value = {"Age: " + screeningFormData.Age}
                    />
                     {showDatePicker && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={dateSelected === new Date() ? dateToday : dateSelected}
                        mode="date"
                        display="spinner"
                        onChange={(event, value) => handleDateChange(event, value, "Personal")}
                      />
                      )}
                    <View 
                      style = {{
                      flexDirection: "row", 
                      alignItems: "center", 
                      width: "70%", 
                      alignSelf: "center",
                      }}>
                      <TextInput
                       
                          style={[styles.birthDayInputField, {width: "100%", marginLeft: 0, marginRight: 0}]}
                          placeholder="Birth Date"
                          placeholderTextColor="#E60965"
                          editable={false}
                          value = {"Birthday: " + userBirthday}
                      />
                      <AntDesign 
                      onPress={() => setShowDatePicker(true)} 
                      style = {{position: "absolute", right: 20}} 
                      name="calendar" size={24} 
                      color="#E60965" 
                      />
                    </View>
                    </View>
                             {!isAgeValid && screeningFormData.birthDate !=="" && (
                             <Text 
                                style = {{
                                alignSelf: "flex-end",
                                marginRight: "20%",
                                color: "red"}}>Please enter a valid Birthday</Text>
                            )}
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Email Address"
                        placeholderTextColor="#E60965"
                        onChangeText={(value) => handleChangeText('email', value)}
                    />
                    {isEmailExisted && isEmailValid && (
                      <Text 
                      style = {{
                        alignSelf: "flex-start",
                        marginLeft: "10%",
                        color: "red"}}>Email is already existing</Text>
                    )}
                    {!isEmailValid && screeningFormData.email !=="" && (
                      <Text 
                      style = {{
                        alignSelf: "flex-start",
                        marginLeft: "10%",
                        color: "red"}}>Please enter a valid email address </Text>
                    )}
                     <TextInput
                        style={styles.BiginputField}
                        placeholder="Contact Number"
                        placeholderTextColor="#E60965"
                        keyboardType="numeric"
                        onChangeText={(value) => handleChangeText('contactNumber', value)}
                    />

                      <View style = {styles.addressDropdown}>
                        <Dropdown
                          style={[, isRegionFocus && { borderColor: 'blue'}]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={[styles.selectedTextStyle, {marginTop: 20, paddingTop: 15}]}
                          inputSearchStyle={styles.inputSearchStyle}
                          data={phil.regions.map(region => ({ label: region.name, value: region.reg_code }))}
                          search
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder={'Select Region'}
                          searchPlaceholder="Search..."
                          value={regionCode}
                          onFocus={() => setIsRegionFocus(true)}
                          onBlur={() => setIsRegionFocus(false)}
                          onChange={item => {
                            setRegionCode(item.value);
                            fetchProvinces(item.value)
                            setIsRegionFocus(false);
                          }}
                        />
                      </View>
                      <View style = {[styles.addressDropdown, {height: 50, paddingVertical: 10}]}>
                        <Dropdown
                            disable={listProvinces === null}
                            style={[, isProvincesFocus && { borderColor: 'blue'}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={[styles.selectedTextStyle, { marginTop:30, paddingTop: 10}]}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={listProvinces === null ? phil.provinces.map(province => ({ label: province.name, value: province.prov_code})) : listProvinces}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select Provinces'}
                            searchPlaceholder="Search..."
                            value={provinceCode}
                            onFocus={() => setIsProvincesFocus(true)}
                            onBlur={() => setIsProvincesFocus(false)}
                            onChange={item => {
                              setProvinceCode(item.value);
                              fetchMunicipality(item.value)
                              setIsProvincesFocus(false);
                            }}
                          />
                      </View>

                      <View style = {styles.addressDropdown}>
                        <Dropdown
                            style={[, isMunicipalityFocus && { borderColor: 'blue'}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={[styles.selectedTextStyle, {paddingTop: 25}]}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={listCity === null ? phil.city_mun.map(city => ({ label: city.name, value: city.mun_code })) : listCity}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select Municipality'}
                            searchPlaceholder="Search..."
                            value={municipalityCode}
                            onFocus={() => setIsMunicipalityFocus(true)}
                            onChange={item => {
                              setMunicipalityCode(item.value);
                              fetchBarangays(item.value)
                              updateAddress(item.label, "Municipality")
                              setIsMunicipalityFocus(false);
                            }}
                          />
                      </View>
                        

                      <View style = {styles.addressDropdown}>
                        <Dropdown
                          disable = {listBarangays === null}
                          style={[, isBarangayFocus && { borderColor: 'blue'}]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={[styles.selectedTextStyle, {paddingTop: 25}]}
                          inputSearchStyle={styles.inputSearchStyle}
                          data={listBarangays === null ? phil.barangays.map(barangay => ({ label: barangay.name, value: barangay.reg_code })) : listBarangays}
                          search
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder={'Select Barangay'}
                          searchPlaceholder="Search..."
                          value={barangayCode}
                          onFocus={() => setIsBarangayFocus(true)}
                          onBlur={() => setIsBarangayFocus(false)}
                          onChange={item => {
                            setBarangayCode(item.value);
                            updateAddress(item.label, "Barangay")
                            setIsBarangayFocus(false);
                          }}
                        />
                      </View>
                    <View style = {{
                      marginTop: 5, 
                      flex: 1, 
                      width: "90%"
                      }}>
                      <Text style={{ color: "#E60965", fontSize: 14, marginLeft: 10, fontFamily: "Open-Sans-SemiBold"}}>Complete Address:</Text>
                      <TextInput
                          style={[styles.BiginputField, {width: "100%"}]}
                          placeholder="Complete Home Address"
                          multiline={true}
                          placeholderTextColor="#E60965"
                          onChangeText={(value) => {
                            handleChangeText('homeAddress', value),
                            setTextFocus(false)
                          }}
                          value = {screeningFormData.homeAddress}
                          onFocus={() => setTextFocus(true)}
                          onBlur={() => setTextFocus(false)}
                          selection={{ start: textFocus && (screeningFormData.homeAddress === (address.Barangay + " " + address.Municipality) ) ? 0 : -1}} // Set the cursor at the start
                        /> 
                    </View>
                   
                    
              </View>

              <View style = {styles.flex_start}>
                <Text style = {styles.subtitle}>Infant Information</Text>
              </View>
              <View style = {styles.container}>
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Full Name of Child"
                        placeholderTextColor="#E60965"
                        onChangeText={(value) => handleChangeText('childName', value)}
                    />
                    <View style = {globalStyles.flex_Row}>
                    <TextInput
                        style={styles.SmallinputField}
                        placeholder="Birth Weight (kg)"
                        placeholderTextColor="#E60965"
                        keyboardType="numeric"
                        onChangeText={(value) => handleChangeText('birthWeight', value)}
                    />
                     <View style ={styles.sexInputField}>
                      <Dropdown
                          style={[ openSexDropdown  && { borderColor: 'blue'}]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.sexSelectedTextStyle}
                          data={sexData}
                          labelField="label"
                          valueField="value"
                          placeholder={!openSexDropdown ? 'Sex' : '...'}
                          searchPlaceholder="Search..."
                          value={value}
                          onFocus={() => setOpenSexDropdown(true)}
                          onBlur={() => setOpenSexDropdown(false)}
                          onChange={item => {
                            setValue(item.value);
                            handledSaveSex(item.label);
                            setOpenSexDropdown(false);
                          }}
                        />
                     </View>
                    </View>

                    <View style = {
                      { 
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "92%",
                     
                      }}>
                    <TextInput
                        style={styles.ageInfantInputField}
                        placeholder="Age:"
                        placeholderTextColor="#E60965"
                        value={screeningFormData.childAge}
                        editable={false}
                        
                    />
                    {showDate1Picker && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={dateSelected === new Date() ? dateToday : dateSelected}
                        mode="date"
                        display="spinner"
                        onChange={(event, value) => handleDateChange(event, value, "infant")}
                      />
                    )}
                    <TextInput
                        style={[styles.birthDayInputField,
                          {
                            marginHorizontal: 0,
                            width: "70%"
                          }
                        ]}
                        placeholder="Birth Date: MM/DD/YY"
                        placeholderTextColor="#E60965"
                        editable={false}
                        value = {"Birthday: " + screeningFormData.childBirthDate}
                    />
                     <AntDesign 
                        onPress={() => setShowDate1Picker(true)} 
                        style = {{position: "absolute", right: 15}} 
                        name="calendar" size={24} 
                        color="#E60965"
                      />
                 
                    </View>
                            {!isChildAgeValid && screeningFormData.childBirthDate !=="" && (
                             <Text 
                                style = {{
                                alignSelf: "flex-end",
                                marginRight: "20%",
                                color: "red"}}>Please enter a valid Birthday</Text>
                            )}
                    <View 
                      style = {{
                        flex: 1,
                        flexDirection: "row",
                        borderWidth: 1,
                        borderRadius: 20,
                        borderColor: "#E60965",
                        backgroundColor:"white",
                        width: "91%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingRight: 15,
                        paddingVertical: 4,
                        elevation: 5,
                        marginTop: 7,
                      }}
                    >
                        <View
                        style={styles.ageOfGestationDropDown}
                        >
                           <Dropdown
                            style={[ isGestationFocus && { borderColor: 'blue'}]}
                            placeholderStyle={[styles.placeholderStyle, {marginLeft: 16}]}
                            selectedTextStyle={[styles.selectedTextStyle, {marginTop: 20, paddingTop: 15}]}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={GestationData}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            subField="children"
                            placeholder={'Age of Gestation'}
                            searchPlaceholder="Search..."
                            value={gestationValue}
                            onFocus={() => setIsGestationFocus(true)}
                            onBlur={() => setIsGestationFocus(false)}
                            onChange={item => {
                              setGestationValue
                              handleChangeText('ageOfGestation', item.label)
                              setIsGestationFocus(false);
                            }}
                          />

                        </View>
                      <TouchableOpacity
                        onPress={() => setOpenGestationInfo(true)}
                        style = {{zIndex: 10}}
                      >
                          <AntDesign
                          name="questioncircle" 
                          size={24} 
                          color="#EB7AA9" 
                          />
                        </TouchableOpacity>
              
                    </View>
                    
              </View>

              <View style = {globalStyles.center}>

                    <TouchableOpacity 
                      style={[
                        styles.AgreebuttonContainer,
                        {opacity: isEmailExisted || !isFormFilled || !isEmailValid ? 0.5 : 1}
                      ]}
                      disabled = {isEmailExisted || screeningFormData.email === "" || !isEmailValid} 
                      onPress={() => navigatePage("DonorScreeningForm2", { screeningFormData: screeningFormData })}
                    >
                      <Text style={styles.label}>Next</Text>
                    </TouchableOpacity>
             
              </View>

        </ScrollView>
    <Modal 
    transparent ={true}
    animationType='slide'
    visible = {openGestationInfo}
    onRequestClose={() => setOpenGestationInfo(false)}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
        <View     
          style = {{
            backgroundColor: "white",
            height: "60%",
            width: "80%",
            borderWidth: 1,
            borderColor: "#E60965",
            borderRadius: 17
          }}>
            <TouchableOpacity
             onPress={() => setOpenGestationInfo(false)}
             style = {{zIndex: 10}}
            >
              <AntDesign
              style = {{
                position: "absolute",
                right: 10,
                top: 10,
                zIndex: 10
              }}
              name="closecircle" 
              size={24} 
              color="#E36A91" 
              />
            </TouchableOpacity>
            
           <FlatList
           overScrollMode='never'
            data={[{ key: '1' }]} // Dummy data, as FlatList requires data
            renderItem={({ item }) => (
              <View style={{ padding: 10, paddingRight: 20 }}>
                <GestationExplanation/>
              </View>
            )}
            keyExtractor={item => item.key}
          />
        </View>
        

      </View>
        
    </Modal>

           
            

      </SafeAreaView>

    )
  }

  const styles = StyleSheet.create ({

    addressDropdown: {
      borderWidth: 1,
      borderRadius: 20,
      borderColor: "#E60965",
      paddingVertical: 5,
      width: "90%",
      marginVertical: "1.5%",
      color: "#E60965",
      backgroundColor: "#FFFFFF",
      elevation: 5,
      paddingRight: 10,
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
      fontSize: 14,
      marginLeft: 20,
      color: "#E60965",

    },
  
    selectedTextStyle: {
      fontSize: 14,
      marginLeft: 15,
      height: 70,
      justifyContent: "center",
      alignItems: "center",
      color: '#E60965',
    },

    sexSelectedTextStyle: {
      fontSize: 13,
      marginLeft: 10,
      justifyContent: "center",
      alignItems: "center",
      color: '#E60965',
    },
  
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    flex_start: {
      flex: 1,
      // backgroundColor: "pink",
      marginHorizontal: 30
      
    }, 

    SafeArea: {
        flex: 1,
        backgroundColor: '#FFF8EB',
        
        width: '100%',
        height: "100%"
    },


    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: "yellow"
      },
  

    label: {
        color: "white",
        fontFamily: "Open-Sans-Bold",
        fontSize: 15,

    },
    rectanglesContainer: {
        flexDirection: "row",
        marginTop: "10%",
        //backgroundColor: "red",
        height: 10,
        justifyContent: "center"
    },

    rectangle: {
      width: 50,
      height: 4, 
      backgroundColor: '#FFEECC', // Color for Rectangle F94892
      borderRadius: 10,
      marginHorizontal: 5,
    },

    rectangleIndicator: {
      width: 50,
      height: 4, 
      backgroundColor: '#F94892', // Color for Rectangle F94892
      borderRadius: 10,
      marginHorizontal: 5,
    },

    title: {
        textAlign: 'center', // Center align the text
        marginTop: 20, // Adjust margin top as needed
        fontSize: 20, // Adjust the font size
        fontWeight: 'bold', // Apply bold font weight
        color: '#E60965',
        marginBottom: 30,
      },

    subtitle: {
        fontFamily: 'Open-Sans-Bold',
        fontSize: 20,
        color: '#E60965',
        marginTop: "5%",
        marginBottom: "2%"
    },

    AgreebuttonContainer:{
        backgroundColor: "#E60965",
        paddingHorizontal: 37,
        borderRadius: 20,
        justifyContent: "center",
        paddingVertical: 5,
        marginTop: "-25%"
    },
    

    text: {
        fontFamily: "Open-Sans-Regular",
        fontSize: 15,
        textAlign: "justify",
        marginTop: "5%",
    },

    ageInfantInputField: {
      borderWidth: 1,
      borderRadius: 20,
      borderColor: "#E60965",
      paddingVertical: 5,
      paddingLeft:20,
      width: "27%",
      color: "#E60965",
      backgroundColor: "#FFFFFF",
      elevation: 5,
    },

    sexInputField: {
      width: "35%",
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderRadius: 20,
      borderColor: "#E60965",
      elevation: 5,
      paddingHorizontal: 10,
    },

    ageInputField: {
      borderWidth: 1,
      borderRadius: 20,
      borderColor: "#E60965",
      paddingVertical: 5,
      paddingHorizontal: 20,
      width: "25%",
      marginVertical: "1.5%",
      marginRight: "3%",
      color: "#E60965",
      backgroundColor: "#FFFFFF",
      elevation: 5,
    },

    birthDayInputField: {
      borderWidth: 1,
      borderRadius: 20,
      borderColor: "#E60965",
      paddingVertical: 5,
      paddingHorizontal: 20,
      width: "70%",
      marginVertical: "1.5%",
      marginHorizontal: "3%",
      color: "#E60965",
      backgroundColor: "#FFFFFF",
      elevation: 5,
    },
      ageOfGestationDropDown: {
        width: "90%",
        color: "#E60965",
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
      },

      BiginputField: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#E60965",
        paddingVertical: 7,
        paddingHorizontal: 20,
        width: "90%",
        marginVertical: "1.5%",
        color: "#E60965",
        backgroundColor: "#FFFFFF",
        elevation: 5
    },

    medicalConditionStyle: {
      borderWidth: 1,
      borderRadius: 20,
      borderColor: "#E60965",
      backgroundColor:"white",
      width: "91%",
      paddingRight: 15,
      paddingVertical: 4,
      marginTop: 10,
      elevation: 5
    },


    SmallinputField: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#E60965",
        paddingVertical: 5,
        paddingHorizontal: 20,
        width: "63%",
        marginVertical: "1.5%",
        marginRight: "3%",
        color: "#E60965",
        backgroundColor: "#FFFFFF",
        elevation: 5,
    },

   
  })

  export default DonorScreeningForm;

  