import React, {useState, useEffect} from 'react'
import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import ProvincesData from '../Guest/Profile/Provinces.json'
import phil from "philippine-location-json-for-geer";
import { Dropdown } from 'react-native-element-dropdown';


export const AddressPicker = ({data, onClose, onSubmit, visible}) => {

const [screeningFormData, setScreeningFormData] = useState({
    ...data,
    homeAddress:""
})
const [address, setAddress] = useState({
    Municipality: "",
    Barangay: ""
  })
  
  const [textFocus, setTextFocus] = useState(false)

//Dropdowns
 const [isRegionFocus, setIsRegionFocus] = useState(false);
 const [isMunicipalityFocus, setIsMunicipalityFocus] = useState(false);
 const [isProvincesFocus, setIsProvincesFocus] = useState(false);
 const [isBarangayFocus, setIsBarangayFocus] = useState(false);

 //Values
 const [regionCode, setRegionCode] = useState("")
 const [provinceCode, setProvinceCode] = useState("")
 const [municipalityCode, setMunicipalityCode] = useState("")
 const [barangayCode, setBarangayCode] = useState("")
 const [gestationValue, setGestationValue] = useState("")

 //Places
 const [listProvinces, setListProvinces] = useState(null)
 const [listCity, setListCity] = useState(null)
 const [listBarangays, setListBarangays] = useState(null)


 const getProvnincesByRegCode = (id) => ProvincesData.filter(province => province.reg_code === id);
 const fetchProvinces = (region_code) => {
   const provinces = getProvnincesByRegCode(region_code)
   const provincesList = provinces.map(province => ({ label: province.name, value: province.prov_code}))
   setListProvinces(provincesList)
   return
 }

 const fetchMunicipality = (prov_code) => {

    // const municipality = getMunicipalityByProvCode(prov_code)
    const municipality = phil.getCityMunByProvince(prov_code)
    const municipalityList  = municipality.map(city => ({ label: city.name, value: city.mun_code}))
    const municipalitySortedData = municipalityList.sort((a, b) => a.label.toLowerCase() < b.label.toLowerCase() ? -1 : a.label.toLowerCase() > b.label.toLowerCase() ? 1 : 0);
    setListCity(municipalitySortedData)
    return
  }
  const uncapitalizedString = (string) => {
    const trimmedString = string.trim();
    const formattedString = trimmedString.toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
    return formattedString
  }

  const fetchBarangays = (city_code) => {
    const barangays = phil.getBarangayByMun(city_code)
    const barangayList = barangays.map(barangay => ({ label: barangay.name, value: barangay.brgy_code}))
    const barangaySortedData = barangayList.sort((a, b) => a.label.toLowerCase() < b.label.toLowerCase() ? -1 : a.label.toLowerCase() > b.label.toLowerCase() ? 1 : 0);
    setListBarangays(barangaySortedData)
    return
  }
  
  const formatCity = (city) => {
    console.log("city: ", city)
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
  
  const handleChangeText = (name, value) => {
    setScreeningFormData({ ...screeningFormData, [name]: value });
  };

  const checkForm = (value) => {
    if(value === "Address") {
      keysToCheck = [
        'Municipality',
        'Barangay',
      ]
      const isFormDataValid = keysToCheck.every(key => address[key].trim() !== '');
      if(isFormDataValid) return true
      else return false
    }
  }

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
            
            <Modal
            transparent={true} 
            animationType='slide'
            visible={true}
            onRequestClose={onClose}
            >
                 <View style={styles.container}>
                    <View style = {styles.modal}>
                        <Text style = {styles.title}>Select Your Address</Text>
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
                               disable = {listCity === null}
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
                            <Text style={{ color: "#E60965", fontSize: 16, marginLeft: 10, fontFamily: "Open-Sans-SemiBold"}}>Complete Address:</Text>
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
                        <View style={{flexDirection: "row", gap: 17}}>
                            <TouchableOpacity 
                            style={[styles.button, {backgroundColor: '#E60965',}]} 
                            onPress={() => onSubmit(screeningFormData)}>
                                <Text style={{ color: "white", fontFamily: "Open-Sans-Regular", fontSize: 15}}> Submit </Text>
                            </TouchableOpacity>
                            <TouchableOpacity  
                            style={[styles.button, {backgroundColor: 'white',}]}  
                            onPress={onClose}>
                                <Text style={{ color: '#E60965', fontFamily: "Open-Sans-Regular", fontSize: 15}}> Cancel </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: '#E60965',
        fontFamily: "Open-Sans-Bold",
        fontSize: 17,
        marginBottom: 7
    },

    modal: {
        backgroundColor: "#f5f5f5",
        borderWidth: 1,
        borderColor: '#E60965',
        flex: 1,
        maxHeight: 430,
        maxWidth: 300,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 17,
        paddingVertical: 20,
    },
    button: {
        marginVertical: 10,
        paddingVertical: 7,
        paddingHorizontal: 17,
        elevation: 7,
        borderRadius: 7,
    },

    BiginputField: {
        borderRadius: 20,
        borderColor: "#E60965",
        paddingVertical: 7,
        paddingHorizontal: 20,
        width: "90%",
        marginVertical: "1.5%",
        color: "#E60965",
        backgroundColor: "#FFFFFF",
        elevation: 7,
        fontFamily: "Open-Sans-Regular",
        fontSize: 16, 
        height: 40,
        maxHeight: 60,
    },

    addressDropdown: {
        elevation: 7,
        borderRadius: 20,
        borderColor: "#E60965",
        paddingVertical: 5,
        width: "90%",
        marginVertical: "1.5%",
        color: "#E60965",
        backgroundColor: "#FFFFFF",
        elevation: 5,
        paddingRight: 10,
        fontSize: 16, 
        fontFamily: "Open-Sans-Regular"
      },
     
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 16, 
      },
      placeholderStyle: {
        marginLeft: 20,
        color: "#E60965",
        fontSize: 16, 
        fontFamily: "Open-Sans-Regular"
      },
    
      selectedTextStyle: {
        fontSize: 16, 
        marginLeft: 15,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
        color: '#E60965',
        fontFamily: "Open-Sans-Regular"
      },
})