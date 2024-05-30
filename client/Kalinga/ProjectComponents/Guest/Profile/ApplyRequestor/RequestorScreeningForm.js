import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, TextInput, ScrollView, SafeAreaView, Alert, Modal, FlatList} from 'react-native';
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { useNavigation } from '@react-navigation/native';
import randomatic from 'randomatic';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { BASED_URL } from '../../../../MyConstants.js';
import phil from "philippine-location-json-for-geer";
import ProvincesData from '../Provinces.json'
import { sexData, medicalConditionData} from '../ageofGestationData.js'
import { globalStyles } from '../../../../styles_kit/globalStyles.js';

const ApplyAs_DonorISF = () => {

  // console.log("Regions: ", phil.regions)
  const [dateToday, setDateToday] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDate1Picker, setShowDate1Picker] = useState(false);
  const [userBirthday, setUserBirthDay] = useState("")
  const [userAge, setUserAge] = useState("")
  const [value, setValue] = useState(null);
  const [textFocus, setTextFocus] = useState(false)
  
  //validation
  const [isAgeValid, setIsAgeValid] = useState(true)
  const [isChildAgeValid, setIsChildAgeValid] = useState(true)
  const [isEmailExisted, setIsEmailExisted] = useState(false)
  const [isEmailValid, setIsEmailValid]= useState(false)
  const [isFormFilled, setIsFormFilled] = useState(false)
  const [isChildTooOld, setChildIsTooOld] = useState(false)
  const [invalidContactNumber, setInvalidContactNumber] = useState(false)

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

  //Modal
  const [openGestationInfo, setOpenGestationInfo] = useState(false)

  const applicantId = randomatic('Aa0', 20) + Date.now();
  const [screeningFormData, setScreeningFormData] = useState({
    Applicant_ID: applicantId,
    userType: "Requestor",
    fullName: '',
    Municipality: '',
    barangay: '',
    Age: '',
    birthDate: '',
    email:  '',
    contactNumber: '',
    homeAddress: '',
    sex: '',
    childName: '',
    childAge: '',
    childBirthDate: '',
    birthWeight: '',
    RFR: '',
});


const checkForm= (value) => {
  let keysToCheck = [
    'Applicant_ID',
    'userType',
    'Municipality',
    'barangay',
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
        if(!isFormFilled)console.log('All values until medical condition are valid');
        setIsFormFilled(true)
    } else {
      if(isFormFilled)console.log('Some values until medical condition are empty');
        setIsFormFilled(false)
    }
}


   const handleDateChange = (event, selectedDate, info) => {
    if(info !== "Personal"){
      setShowDate1Picker(false);
    } else setShowDatePicker(false);
    
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
    if (parseInt(finalAge) > 1 && info === "infant") {
      Alert.alert(
        "Age Restriction Notice",
        "We're sorry, but milk banks only accept infants up to 1 year old. Your baby exceeds this age limit."
      );
      setChildIsTooOld(true)
    }

    if(parseInt(finalAge) === 1 && info === "infant") {
      Alert.alert(
        "Take Note",
        "Some milk banks will only accept infants who are newborn up to 5 months old."
      );
      setChildIsTooOld(false)
    }
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
  
        if(result > 5 && info === "infant") {
          Alert.alert(
            "Take Note",
            "Some milk banks will only accept infants who are newborn up to 5 months old."
          );
        }
        if(result === 0 ){
          const childAge = dayToday - childDay
          setChildIsTooOld(false)
          if( childAge === 0) return finalAge = "New Born"
          else return finalAge = childAge + " days"
    
        }
        setChildIsTooOld(false)
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


// useEffect(() => {
//   console.log('Screening Form Data:', screeningFormData);
// }, [screeningFormData]);

const handleChangeText = (name, value) => {

  if(name === "birthWeight" && /[^0-9]/.test(value))return

  if (name === "contactNumber" && /[^0-9]/.test(value)){
    console.log("number: ", value)
    setInvalidContactNumber(true)
    return
  } else if (name === "contactNumber" && value.length !== 11){
    if(!invalidContactNumber)setInvalidContactNumber(true)
  } else {
    setInvalidContactNumber(false)
}
  console.log("value:", value)
  if (
    name === "email" &&
    value.includes("@") &&
    (value.endsWith(".com") || value.endsWith(".ph")) &&
    (value.match(/\.com/g) || []).length <= 1 && // Ensure there's at most one occurrence of ".com"
    (value.match(/\.ph/g) || []).length <= 1 // Ensure there's at most one occurrence of ".ph"
  ) {
    console.log("Email: ", value);
    setIsEmailValid(true);
    checkEmail(value);
  } else if (name === "email") {
    setIsEmailValid(false);
  }
  setScreeningFormData({ ...screeningFormData, [name]: value });

    return
};





  const navigation = useNavigation();

  const navigatePage = (Page, Data) => {
    console.log("check Screening Form: ", screeningFormData)
    if(!checkAgeValidity()) return
    checkForm("ScreeningForm")
    if(!isFormFilled) {
      Alert.alert("Invalid Form", "Please complete the form first")
      return
    }
    navigation.navigate(Page, Data); // Navigate to the Login screen
};


const handledSaveSex = (value) => {
  setScreeningFormData({
    ...screeningFormData,
    sex: value
  })
}
const checkEmail = async (email) => {
  const response = await axios.get(`${BASED_URL}/kalinga/checkEmail/${email}`)
  if(response.data.messages.code === 1){
    console.log(response.data.messages.message)
    setIsEmailExisted(true)
    return
  } else {
    console.log("Email is valid")
    setIsEmailExisted(false)
  }
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

const checkAgeValidity = () => {
  const {Age, childAge} = screeningFormData
  const motherAge = parseInt(Age)
  const infantAge = parseInt(childAge)
  if(motherAge < 13) {
    if(isAgeValid)Alert.alert("Invalid Mother Age"," Please input your proper birthday")
    setIsAgeValid(false)
    return false
  } else  setIsAgeValid(true)

  if(childAge.includes("days") || childAge.includes("months")){
    setIsChildAgeValid(true)
    return true
  }

  if(childAge > 1 ){
    setIsChildAgeValid(false)
    return false
  }
  
  setIsAgeValid(true)
  setIsChildAgeValid(true)
  return true
}


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

  if(name === "Barangay"){
    console.log("Barangay: ", result)
    setScreeningFormData(prevFormData => ({
      ...prevFormData,
      barangay: result
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
  if(!city.toLowerCase().includes("city")) return city
  if(!city.toLowerCase().includes("of")) return city
  const cityArray = city.toLowerCase().split("of")
  if(cityArray[0].includes("city")){
    const cityName = cityArray[1] + " " + cityArray[0]
    const result = uncapitalizedString(cityName)
    console.log(result)
    return result
  }
}



useEffect(() => {
  //checkForm
  checkForm("Screening Form")
}, [
  screeningFormData.fullName,
  screeningFormData.birthDate,
  screeningFormData.email,
  screeningFormData.contactNumber,
  screeningFormData.barangay,
  screeningFormData.Municipality,
  screeningFormData.homeAddress,
  screeningFormData.childName,
  screeningFormData.birthWeight,
  screeningFormData.sex,
  screeningFormData.childBirthDate
])

useEffect(() => {
  checkAgeValidity()
},[screeningFormData.birthDate, screeningFormData.childBirthDate])

useEffect(() => {
  if(screeningFormData.email !== ""){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(screeningFormData.email)){
      setIsEmailValid(false)
    } 
  }
},[screeningFormData.email])

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

  return (
    
    <View style={globalStyles.defaultBackgroundColor}>
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

        
        <View style={[styles.inputFullNameContainer]}>
          <TextInput
            placeholder="Full name"
            placeholderTextColor={"#E60965"}
            style={styles.inputField}
            onChangeText={(value) => handleChangeText('fullName', value)}
          />
        </View>

        <View style={styles.inputRowContainer}>
            <View style={[styles.inputAgeContainer]}>
              <TextInput
                placeholder="Age"
                style={{
                  flex: 1,
                  color: '#E60965', // Text color
                  fontSize: 16, // Font size
                  paddingVertical: 10,
                  marginLeft: 10, // Vertical padding
                  textAlign: "left",
                  fontFamily: "Open-Sans-Regular"
                }}
                editable={false}
                keyboardType="numeric"
                value={"Age: " + screeningFormData.Age}
              />
            </View>

            <View style={[styles.inputBirthdayContainer]}> 
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
                placeholderTextColor={"#E60965"}
                style={[styles.inputField, {color: userBirthday === "" ? 'gray': '#E60965',}]}
                editable={false}
                value = {userBirthday}
              />
              <AntDesign 
              onPress={() => setShowDatePicker(true)} 
              style = {{position: "absolute", right: 10}} 
              name="calendar" size={24} 
              color="#E60965" />
            </View>
        </View>
        {!isAgeValid && screeningFormData.birthDate !=="" && (
            <Text 
              style = {{
              alignSelf: "flex-end",
              marginRight: "20%",
              color: "red"}}>Please enter a valid Birthday</Text>
          )}
        <View style={[styles.inputEmailAddressContainer]}>
          <TextInput
            placeholder="Email Address"
            placeholderTextColor={"#E60965"}
            style={styles.inputField}
            onChangeText={(value) => handleChangeText('email', value)}
            keyboardType="email-address"
          />
        </View>
        {isEmailExisted && isEmailValid && (
          <Text 
          style = {{
            marginLeft: "10%", 
            marginTop: 5, 
            marginBottom: -10, 
            color: "red"}}>Email is already existing</Text>
        )}

        {!isEmailValid && screeningFormData.email !=="" && (
          <Text 
          style = {{
            marginLeft: "10%", 
            marginTop: 5, 
            marginBottom: -10, 
            color: "red"}}>Please enter a valid email address </Text>
        )}
        <View style={[styles.inputPhoneNumberContainer]}>
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor={"#E60965"}
            style={styles.inputField}
            maxLength={11}
            onChangeText={(value) => handleChangeText('contactNumber', value)}
            keyboardType="numeric"
            value={screeningFormData.contactNumber}
          />
        
        </View>
        {invalidContactNumber && (
           <Text 
           style = {{
             marginLeft: "10%", 
             marginTop: 5, 
             marginBottom: -10, 
             color: "red"}}>Please enter a valid 11-digit contact number</Text>
        )}
       
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
        <View style = {[styles.addressDropdown]}>
            
            <Dropdown
                disable={listProvinces === null}
                style={[, isProvincesFocus && { borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={[styles.selectedTextStyle, { marginTop: !provinceCode.includes("1339") ? 30 : 10, paddingTop: 10}]}
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
                  console.log(item.label)
                  // console.log(phil.provinces)
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
        <Text style = {{
          marginTop: 15,
          marginLeft: 40,
          marginBottom: -10,
          fontSize: 15,
          fontFamily: "Open-Sans-SemiBold",
          color: "#E60965"
          }}>Complete Address </Text>
        <View style={[styles.inputHomeAddressContainer, { elevation: 5 }]}>
            <TextInput
            placeholder="Home Address"
            placeholderTextColor={"#E60965"}
            style={styles.inputHomeAddressField}
            multiline={true}
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

        <Text style={styles.infantinfoText}>Infant Information</Text>

        <View style={[styles.inputPhoneNumberContainer, { elevation: 5 }]}>
          <TextInput
            placeholder="Name of Child"
            placeholderTextColor={"#E60965"}
            style={styles.inputField}
            onChangeText={(value) => handleChangeText('childName', value)}
          />
        </View>
        <View style={styles.inputRowContainer1}>
         
            <View style={[styles.inputBirthWeightContainer, { elevation: 5 }]}>
            <TextInput
              placeholder="Birth Weight (kg)"
              placeholderTextColor={"#E60965"}
              style={styles.inputField}
              maxLength={2}
              onChangeText={(value) => handleChangeText('birthWeight', value)}
              keyboardType="numeric"
              value={screeningFormData.birthWeight}
            />
            </View>
          <View style={[styles.inputSexContainer, { elevation: 5 }]}>
            <Dropdown
                style={[styles.sexDropdown, openSexDropdown  && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={[styles.selectedTextStyle, {marginTop: 45}]}
                data={sexData}
                labelField="label"
                valueField="value"
                placeholder={'Sex'}
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
                placeholderTextColor={"#E60965"}
                style={[styles.inputField]}
                editable={false}
                value = {screeningFormData.childBirthDate}
              />
              <AntDesign 
                onPress={() => setShowDate1Picker(true)} 
                style = {{position: "absolute", right: 10}} 
                name="calendar" size={24} 
                color="#E60965"
              />
            </View>
            
          </View>
          <View style={[styles.inputAgeContainer1, { elevation: 5 }]}>
            <TextInput
                placeholder="Age"
                placeholderTextColor={"#E60965"}
                style={styles.inputField}
                onChangeText={(value) => handleChangeText('childAge', value)}
                value = {screeningFormData.childAge}
               editable={false}
              />
           
          </View>
                           
        </View>
        {!isChildAgeValid && screeningFormData.childBirthDate !=="" && (
          <Text 
            style = {{
            alignSelf: "flex-start",
            marginLeft: "10%",
            color: "red"}}>Please enter a valid Birthday</Text>
        )}
        <View style = {{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 15,
          borderRadius: 18,
          borderColor: '#E60965',
          backgroundColor: '#FFFFFF',
          elevation: 5,
          width: "82%",
          alignSelf: "center",
          marginLeft: -10,
          paddingRight: "5%",
          elevation:7
          }}>
          {/* <View style={styles.inputAgeOfGestationContainer}>
            <Dropdown
                style={[{marginTop: 5, marginRight: 10}, isGestationFocus && { borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
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
            <TextInput
              placeholder="Age of Gestation"
              style={styles.inputField}
                          onChangeText={(value) => handleChangeText('ageOfGestation', value)}
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
            </TouchableOpacity>*/}
   
        </View> 

        {/* <View style={styles.medicalConditionStyle} >
                           <Dropdown
                            style={[ isGestationFocus && { borderColor: 'blue'}]}
                            placeholderStyle={[styles.placeholderStyle, {marginLeft: 16}]}
                            selectedTextStyle={[styles.selectedTextStyle, {marginTop: 20, paddingTop: 15}]}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={medicalConditionData}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            subField="children"
                            placeholder={'Medical Condition'}
                            searchPlaceholder="Search..."
                            value={gestationValue}
                            onFocus={() => setIsGestationFocus(true)}
                            onBlur={() => setIsGestationFocus(false)}
                            onChange={item => {
                              setGestationValue
                              handleChangeText('medicalCondition', item.label)
                              setIsGestationFocus(false);
                            }}
                          />
                    </View> */}
       
        

        <View style={[styles.buttonContainer, { elevation: 5 }]}>
          <TouchableOpacity style={[
            styles.nextButton, 
              { 
                opacity: isEmailExisted || !isFormFilled || isChildTooOld ? 0.5 : 1
              }
            ]}
            // disabled = {isEmailExisted || screeningFormData.email === "" || isChildTooOld }
            onPress={() => navigatePage("RequestorMedicalAbstract", {screeningFormData: screeningFormData})}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
        </View>
      </SafeAreaView>
      </ScrollView>

    <Modal 
    transparent ={true}
    animationType='slide'
    visible = {openGestationInfo}
    onRequestClose={() => setOpenGestationInfo(!openGestationInfo)}
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
            // borderWidth: 1,
            borderColor: "#E60965",
            borderRadius: 17,
            elevation: 7
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
    </View>
  


  );
};

const styles = StyleSheet.create({


  container: {
    backgroundColor: '#FFF8EB',
    flex: 1,
  },

  medicalConditionStyle: {
    borderRadius: 20,
    borderColor: "#E60965",
    backgroundColor:"white",
    width: "82%",
    paddingRight: 15,
    paddingVertical: 4,
    marginTop: 10,
    elevation: 5,
    alignSelf: "center",
    marginLeft: -10,
    elevation: 7,
  },


  sexDropdown: {
    marginHorizontal: 10
  },

  addressDropdown: {
    backgroundColor: '#FFFFFF',
    marginRight: "12%", 
    marginLeft: "7%",
    marginTop: "5%",
    flex: 1,
    paddingVertical: 10,
    borderRadius: 18,
    borderColor: '#E60965',
    elevation: 5,
    justifyContent: "center",
    paddingRight: "3%",
    elevation: 7,
    width:"81%"
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
    marginLeft: 10,
    color: '#E60965',
    fontFamily: "Open-Sans-Regular"
  },

  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 10,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    color: '#E60965',
    fontFamily: "Open-Sans-Regular"
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

    IndicatedPage: {
      height: 7,
      borderRadius: 7,
      width: 50,
      backgroundColor: "#F94892",
      marginTop: "10%",
      marginHorizontal: "1%",
      elevation:7
  },

  pageIndicator: {
      height: 7,
      borderRadius: 7,
      width: 50,
      backgroundColor: "white",
      marginTop: "10%",
      marginHorizontal: "1%",
      elevation:7
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
    fontFamily: "Open-Sans-Regular"
  },
  inputHomeAddressField:{
    flex: 1,
    color: '#E60965', // Text color
    fontSize: 16, // Font size
    paddingVertical: 10, // Vertical padding
    paddingLeft: 10, // Add padding on the left to move text to the right
    textAlignVertical: 'top', // Position the text at the top of the input field
    fontFamily: "Open-Sans-Regular"
  },
  inputFullNameContainer: {
    borderRadius: 18, // Border radius
    borderColor: '#E60965', // Border color
    backgroundColor: '#FFFFFF', // Background color
    width: '80%',
    marginTop: 15, // Adjust margin top to reduce the space between the text and the input field
    height: 45, // Adjust height
    marginLeft: 30, // Move the input field to the right
    elevation:7
  },
  inputRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 45,
    marginTop: 5,
  },
  inputAgeContainer: {
    borderRadius: 18, // Border radius
    borderColor: '#E60965', // Border color
    backgroundColor: '#FFFFFF', // Background color
    width: '25%',
    marginTop: 15, // Adjust margin top to reduce the space between the text and the input field
    height: 45, // Adjust height
    marginLeft: -15, // Move the input field to the right
    elevation:7
  },
  inputBirthdayContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18, // Border radius
    borderColor: '#E60965', // Border color
    backgroundColor: '#FFFFFF', // Background color
    width: '75%',
    marginTop: 15, // Adjust margin top to reduce the space between the text and the input field
    height: 45, // Adjust height
    marginLeft: 15, // Move the input field to the right
    elevation:7
  },
  inputEmailAddressContainer: {
    borderRadius: 18, // Border radius
    borderColor: '#E60965', // Border color
    backgroundColor: '#FFFFFF', // Background color
    width: '80%', // Adjust the width as needed
    marginTop: 15, // Adjust margin top to reduce the space between the text and the input field
    height: 45, // Adjust height
    marginLeft: 30, // Move the input field to the right
    elevation:7
  },
  inputPhoneNumberContainer: {
    borderRadius: 18, // Border radius
    borderColor: '#E60965', // Border color
    backgroundColor: '#FFFFFF', // Background color
    width: '80%', // Adjust the width as needed
    marginTop: 15, // Adjust margin top to reduce the space between the text and the input field
    height: 45, // Adjust height
    marginLeft: 30, // Move the input field to the right
    elevation:7,
    fontFamily: "Open-Sans-Regular",
  },
  inputHomeAddressContainer: {
    borderRadius: 18, // Border radius
    borderColor: '#E60965', // Border color
    backgroundColor: '#FFFFFF', // Background color
    width: '80%', // Adjust the width as needed
    marginTop: 15, // Adjust margin top to reduce the space between the text and the input field
    height: 90, // Adjust height
    marginLeft: 30, // Move the input field to the right
    elevation:7
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
    borderRadius: 18, // Border radius
    borderColor: '#E60965', // Border color
    backgroundColor: '#FFFFFF', // Background color
    width: '30%',
    marginTop: 15, // Adjust margin top to reduce the space between the text and the input field
    height: 45, // Adjust height
    marginLeft: 20, // Move the input field to the right
    elevation:7
  },
inputSexContainer: {
  borderRadius: 18, // Border radius
  borderColor: '#E60965', // Border color
  backgroundColor: '#FFFFFF', // Background color
  width: '50%', // Adjust width as needed
  marginTop: 15, // Adjust margin top to reduce the space between the text and the input field
  height: 45, // Adjust height
  marginLeft: 20, // Move the input field to the right
  justifyContent: "center",
  elevation:7
},
inputRowContainer2: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginHorizontal: 45,
  marginTop: 5,
},
inputBirthdateContainer1: {
  borderRadius: 18,
  borderColor: '#E60965',
  backgroundColor: '#FFFFFF',
  width: '70%', // Adjust width as needed
  marginTop: 15,
  height: 45, // Adjust height
  marginLeft: -15,
  elevation:7
},
  inputBirthWeightContainer: {
  borderRadius: 18,
  borderColor: '#E60965',
  backgroundColor: '#FFFFFF',
  width: '50%', // Adjust width as needed
  marginTop: 15,
  height: 45, // Adjust height,
  marginLeft: -15,
  elevation:7
},
  inputAgeOfGestationContainer: {
  width: '95%',
  height: 45, // Adjust height
  backgroundColor: "white",
  borderRadius: 18,

},

buttonContainer: {
  alignItems: 'center', // Center items horizontally
  marginTop: 5, // Adjust margin as needed
  marginBottom: 10,
},

nextButton: {
  paddingHorizontal: 35,
  paddingVertical: 5,
  borderRadius: 20,
  backgroundColor: '#E60965',
  marginVertical: 20,
  alignItems: 'center',
},
nextButtonText: {
  fontWeight: 'bold',
  fontSize: 14,
  color: 'white',
  textAlign: "center"
},
});

export default ApplyAs_DonorISF;
