import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute hook
import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DonorUploadAdmin from './DonorUploadAdmin.js';
import { BASED_URL } from '../../../../MyConstants.js';

const Tab = createMaterialTopTabNavigator();


const FirstScreen = ({route}) => {
    
    const Applicant_ID= route.params.screeningFormId
    console.log( "ID", Applicant_ID)
    const navigation = useNavigation();

    const [formData, setFormData] = useState({ });


    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASED_URL}/kalinga/getScreeningFormsApplicant_ID/${Applicant_ID}`);
            const data = response.data.screeningForms; // Assuming you expect only one record
            console.log("data", data)
            setFormData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    useEffect(() => {
        fetchData(); // Fetch data when component mounts
    }, []);

    const navigatePage = (Page) => {
        navigation.navigate(Page); // Navigate to the specified screen
    };

    const handleViewPress = (Applicant_ID) =>{
        navigation.navigate('DonorInitialScreeningFormPage2',{Applicant_ID});
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}
        overScrollMode='never'
        >
            <View style={styles.tabContent}>
                <Text style={styles.title}>Initial Screening Form</Text>

                <View style={styles.screeningFormcontainer}>

                    <Text style = {[
                        globalStyles.titleParagraph, {alignSelf: "flex-start",  marginLeft: "17%"
                        }]}>Personal Information
                    </Text>
                
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Full Name"
                        placeholderTextColor="#E60965"
                        value={"Name: " + formData.fullName}
                        editable={false}
                    />
                    <View style={styles.flex_Row}>
                        <TextInput
                            style={styles.ageInputField}
                            placeholder="Age"
                            placeholderTextColor="#E60965"
                            value={"Age: " + formData.Age}
                            editable={false}
                        />
                        <TextInput
                            style={styles.birthDateInputField}
                            placeholder="Birth Date"
                            placeholderTextColor="#E60965"
                            value={"Birthday: " + formData.birthDate}
                            editable={false}
                        />
                    </View>
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Email Address"
                        placeholderTextColor="#E60965"
                        value={"Email: " + formData.email}
                        editable={false}
                    />
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Contact Number"
                        placeholderTextColor="#E60965"
                        value={"Contact Number: " + formData.contactNumber}
                        editable={false}
                    />
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Home Address"
                        placeholderTextColor="#E60965"
                        value={"Address: " + formData.homeAddress}
                        editable={false}
                    />

                <Text style = {[
                    globalStyles.titleParagraph, {alignSelf: "flex-start", marginLeft: "17%", marginTop: 20
                    }]}>Infant Information
                </Text>

                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Name of Child"
                        placeholderTextColor="#E60965"
                        value={"Name: " + formData.childName}
                        editable={false}
                    />
                    <View style={styles.flex_Row}>

                        <TextInput
                            style={styles.childSexInputField}
                            placeholder="Sex"
                            placeholderTextColor="#E60965"
                            value={"Sex: " + formData.sex}
                            editable={false}
                        />
                    
                        <TextInput
                            style={styles.birthDateWeight}
                            placeholder="Birth Weight"
                            placeholderTextColor="#E60965"
                            value={"Birth Weight: " + formData.birthWeight}
                            editable={false}
                        />
                       
                       
                    </View>

                    <View style={styles.flex_Row}>

                         <TextInput
                            style={styles.ageInputField}
                            placeholder="Age"
                            placeholderTextColor="#E60965"
                            value={"Age: " + formData.childAge}
                            editable={false}
                        />
                            <TextInput
                            style={styles.birthDateInputField}
                            placeholder="Birthdate"
                            placeholderTextColor="#E60965"
                            value={"Birthday: " + formData.childBirthDate}
                            editable={false}
                        />
     
                    </View>
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Age of Gestation"
                        placeholderTextColor="#E60965"
                        value={"Age of Gestation: " + formData.ageOfGestation}
                        editable={false}
                    />
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Medical Condition"
                        placeholderTextColor="#E60965"
                        value={formData.medicalCondition}
                        editable={false}
                    />

                </View>
                <View style={globalStyles.center}>
                    <TouchableOpacity onPress={() => handleViewPress(Applicant_ID)}>
                        <View style={styles.AgreebuttonContainer}>
                            <Text style={styles.label}>Next</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
    

  };
  

const SecondScreen = () => {
    const route = useRoute()
  const navigation = useNavigation();

  const navigatePage = (Page) => {
      navigation.navigate(Page); // Navigate to the Login screen
  }
  return (
      <DonorUploadAdmin route ={route}/>
  );
};

const DonorInitialScreeningFormPage1 = ({route}) => {
    const screeningFormId = route.params
  const navigation = useNavigation();

  
  return (
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.headerTitle}>Donor Verification</Text>
          </View>

          <Tab.Navigator
              tabBarOptions={{
                  labelStyle: {
                      fontSize: 16,
                      fontWeight: 'bold',
                  },
                  style: {
                      backgroundColor: '#FFF8EB',
                  },
                  indicatorStyle: {
                      backgroundColor: '#E60965',
                  },
              }}
          >
              <Tab.Screen name="Screening Form" component={FirstScreen} initialParams = {{screeningFormId}} />
              <Tab.Screen name="Medical Requirements" component={SecondScreen} initialParams = {{screeningFormId}} />
          </Tab.Navigator>
      </SafeAreaView>
  );
};



const styles = StyleSheet.create({
    screeningFormcontainer: {
        // backgroundColor: "pink",
        flex: 1,
        marginHorizontal: "10%",
        alignItems: "center"
    },

    birthDateInputField :{
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#E60965",
        paddingVertical: 5,
        paddingLeft: 15,
        width: 210,
        marginVertical: 10,
        justifyContent: "center",
        color: "#E60965",
        backgroundColor: "white",  
    },
    birthDateWeight: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#E60965",
        paddingVertical: 5,
        paddingLeft: 15,
        width: 190,
        marginVertical: 10,
        justifyContent: "center",
        color: "#E60965",
        backgroundColor: "white",  
    },
    childSexInputField: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#E60965",
        paddingVertical: 5,
        paddingLeft: 15,
        width: 100,

        marginVertical: 10,
        justifyContent: "center",
        color: "#E60965",
        backgroundColor: "white",
    },


    ageInputField:{
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#E60965",
        paddingVertical: 5,
        paddingLeft: 15,
        width: 80,
        marginVertical: 10,
        justifyContent: "center",
        color: "#E60965",
        backgroundColor: "white",
    },

    flex_Row: {
        width: "95%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: "2%",

    },
  container: {
      flex: 1,
      justifyContent:"center"
  },
  Medicalcontainer:{
      flex: 1,
      backgroundColor: '#FFF8EB',
      justifyContent:"center"
  },
  header: {
      backgroundColor: '#E60965',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      elevation: 30,
      alignItems: 'center',
      marginTop: 30,
      paddingVertical: 20
  },
  headerTitle: {
      fontFamily: 'Kurale',
      fontSize: 20,
      color: 'white',
      justifyContent: "center",
  },
  menuIcon: {
      marginLeft: 20,
      marginRight: 20,
  },
  tabContent: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#FFF8EB',
  },
  container: {
      flex: 1,
      backgroundColor: '#FFF8EB',
  },
  searchContainer: {
      backgroundColor: '#FFF8EB',
      width: '100%',
      paddingVertical: 5,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center', // Center the content horizontally
      borderRadius: 10,
      flexDirection: 'row',
      paddingHorizontal: 10,
  },
  searchIcon: {
      position: 'absolute',
      left: 15,
      top: '60%',
      transform: [{ translateY: -12 }],
      color: '#E60965'
  },
  searchInput: {
      flex: 1,
      paddingLeft: 35, // Adjust this value to provide space for the icon
      paddingVertical: 2,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#E60965',
      borderRadius: 10,
  },
  DonorContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginRight: 100
  },
  donorInfoContainer: {
      flex: 1,
      alignItems: 'center',
  },
  lineContainer: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  line: {
      borderBottomColor: '#E60965',
      borderBottomWidth: 0.2,
      flex: 1,
  },
  DonorSecondContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginRight: 30
  },
  donorInfoSecondContainer: {
      flex: 1,
      alignItems: 'center',
  },
  logInButton: {
      backgroundColor: 'white',
      height: '90%',
      width: "25%",
      borderRadius: 50,
      borderColor: '#E60965',
      borderWidth: 1,
      alignItems: 'center',
  },
  logInButtonText: {
      color: '#E60965',
      fontSize: 15,

  },
  scrollContainer: {
      flexGrow: 1,
      paddingBottom: 20
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
  BiginputField: {
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "#E60965",
      paddingVertical: 5,
      paddingHorizontal: 15,
      width: 300,
      marginVertical: 10,
      marginHorizontal:50,
      color: "#E60965",
      backgroundColor: "white"

  },
  BiginputField1:{
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "#E60965",
      paddingVertical: 5,
      paddingHorizontal: 15,
      width: 300,
      marginVertical: 10,
      marginHorizontal:30,
      color: "#E60965",
      backgroundColor: "white"
  },
  SmallinputField: {
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "#E60965",
      paddingVertical: 5,
      paddingHorizontal: 20,
      width: 130,
      marginVertical: 10,
      justifyContent: "center",
      marginStart: 40,
      color: "#E60965",
      backgroundColor: "white"

  },
  title:{
      color: "#E60965",
      fontWeight: "bold",
      marginVertical: 15,
      fontSize: 20

  },
  ApprovebuttonContainer: {
      backgroundColor: '#E60965',
      paddingHorizontal: 37,
      borderRadius: 20,
      paddingVertical: 5,
      marginHorizontal: 10,
      marginBottom: 20

      
  },
  DeclinebuttonContainer: {
      backgroundColor: '#E60965',
      paddingHorizontal: 37,
      borderRadius: 20,
      paddingVertical: 5,
      marginHorizontal: 10,
      marginBottom: 20


  },
  AdminButton:{
      flexDirection: "row",
      justifyContent:"center",
      marginTop: 20
  },
  label: {
      color: 'white',
      fontFamily: 'Open-Sans-Bold',
      fontSize: 15,
  }

});

export default DonorInitialScreeningFormPage1;