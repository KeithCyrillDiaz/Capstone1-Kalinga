import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Feather } from '@expo/vector-icons';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import axios from 'axios';


const expoIpAddress = process.env.EXPO_IP_ADDRESS;
if(expoIpAddress === "") console.log("empty")
// const expoIpAddress = "192.168.1.104";

// const expoIpAddress = Config.EXPO_IP_ADDRESS;
   

const Tab = createMaterialTopTabNavigator();



const SearchBar = () => {
    return (
        <View style={styles.searchContainer}>
            <Feather name="search" size={24} color="black" style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Search Donors"
                placeholderTextColor="#777"
            />
        </View>
    );
};


const FirstScreen = ({route}) => {
    
    console.log("datas: ", expoIpAddress)
    const Applicant_ID = route.params.screeningformId
    // console.log("FS id: ", Applicant_ID)
    const [screeningFormID, setScreeningFormID] = useState({})
    const navigation = useNavigation();

    const navigatePage = (Page) => {
        navigation.navigate(Page); // Navigate to the Login screen
    }

    useEffect(()=>{
       
        const fetchscreeningForm = async () => {
           try {
                console.log("test",Applicant_ID)
                const response = await axios.get(`http://${expoIpAddress}:7000/kalinga/getScreeningFormsID/${Applicant_ID}`)
                // console.log( "test", response.data.screeningForm)
                setScreeningFormID(response.data.screeningForm)
                // console.log("ScreeningFormID: ", screeningFormID)

           } catch(error) {

           }

        }
        fetchscreeningForm();
    },[])

    return (
        <ScrollView
         contentContainerStyle={styles.scrollContainer}
         overScrollMode='never'
         >
            <View style={styles.tabContent}>
            <Text style = {styles.title}>Initial Screening Form</Text>
            {/* <Text style = {styles.title}>{EXPO_IP_ADDRESS}</Text> */}

           

            <View style = {styles.screeningFormcontainer}>

                <Text style = {[
                    globalStyles.titleParagraph, {alignSelf: "flex-start",
                    }]}>Personal Information
                </Text>

                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Full Name"
                        placeholderTextColor="#E60965"
                        value={"Name: " + screeningFormID.fullName}
                        editable={false}
                    />
                    <View style = {styles.flex_Row}>
                        <TextInput
                            style={styles.ageInputField}
                            placeholder="Age"
                            placeholderTextColor="#E60965"
                            value={"Age: " + screeningFormID.Age}
                            editable={false}
                        />
                        <TextInput
                            style={styles.birthDateInputField}
                            placeholder="Birth Date"
                            placeholderTextColor="#E60965"
                            value={"Birthday: " + screeningFormID.birthDate}
                            editable={false}
                        />
                    </View>
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Email Address"
                        placeholderTextColor="#E60965"
                        value={"Email: " + screeningFormID.email}
                        editable={false}
                    />
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Contact Number"
                        placeholderTextColor="#E60965"
                        value={"Contact Number: " + screeningFormID.contactNumber}
                        editable={false}
                    />
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Home Address"
                        placeholderTextColor="#E60965"
                        value={"Address: " + screeningFormID.homeAddress}
                        editable={false}
                    /> 

                <Text style = {[
                    globalStyles.titleParagraph, {alignSelf: "flex-start"
                    }]}>Infant Information

                </Text>
                    <View style = {styles.flex_Row}>

                    <TextInput
                        style={styles.birthDateInputField}
                        placeholder="Birthdate"
                        placeholderTextColor="#E60965"
                        value={"Birthday: " + screeningFormID.childBirthDate}
                        editable={false}
                    />
                    
                    <TextInput
                        style={styles.childSexInputField}
                        placeholder="Sex"
                        placeholderTextColor="#E60965"
                        value={"Sex: " + screeningFormID.sex}
                        editable={false}
                    />
                    </View>

                    <View style = {styles.flex_Row}>

                    <TextInput
                        style={styles.ageInputField}
                        placeholder="Age"
                        placeholderTextColor="#E60965"
                        value={"Age: " + screeningFormID.childAge}
                        editable={false}
                    />

                    <TextInput
                        style={styles.birthDateInputField }
                        placeholder="Birth Weight"
                        placeholderTextColor="#E60965"
                        value={"Birth Weight: " + screeningFormID.birthWeight}
                        editable={false}
                    />
                   
                   
                    </View>
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Age of Gestation"
                        placeholderTextColor="#E60965"
                        value={"Age of Gestation: " + screeningFormID.ageOfGestation}
                        editable={false}
                    />
                </View>


            </View>
    </ScrollView>
    );
};

const SecondScreen = ({route}) => {
    const navigation = useNavigation();
    const Applicant_ID = route.params.screeningformId

    const [medicalAbstractForm, setMedicalAbstractForm] = useState({})

    const fetchMedicalAbstract = async () => {
        const response = await axios.get(`http://${expoIpAddress}:7000/kalinga/getMedicalAbstractByID/${Applicant_ID}`)
        setMedicalAbstractForm(response.data.medicalAbstract)
    }

    useEffect(() => {
        fetchMedicalAbstract();
    },[])

    const navigatePage = (Page) => {
        navigation.navigate(Page); // Navigate to the Login screen
    }
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style = {styles.Medicalcontainer}>

            <View style={styles.tabContent}>
            <Text style = {styles.title}>Medical Abstract of Infant</Text>
              </View>
              
              <View style = {globalStyles.flex_start1}>
                <Text style = {globalStyles.titleParagraph}>Clinical History</Text>
                </View>
              <View style = {styles.container}>
                    <TextInput
                        style={styles.BiginputField1}
                        value={medicalAbstractForm.clinicalHistory}
                        editable={false}
                    />         
              </View>

              <View style = {globalStyles.flex_start1}>
                <Text style = {globalStyles.titleParagraph}>Presenting Complaint</Text>
              </View>
              <View style = {styles.container}>
                    <TextInput
                        style={styles.BiginputField1}
                        value={medicalAbstractForm.complaint}
                        editable={false}
                    />         
              </View>

              <View style = {globalStyles.flex_start1}>
                <Text style = {globalStyles.titleParagraph}>Clinical Findings</Text>
              </View>
              <View style = {styles.container}>
                    <TextInput
                        style={styles.BiginputField1}
                        value={medicalAbstractForm.clinicalFindings}
                        editable={false}
                    />         
              </View>

              <View style = {globalStyles.flex_start1}>
                <Text style = {globalStyles.titleParagraph}>Diagnostics</Text>
              </View>
              <View style = {styles.container}>
                    <TextInput
                        style={styles.BiginputField1}
                        value={medicalAbstractForm.diagnosis}
                        editable={false}
                    />         
              </View>

              <View style = {globalStyles.flex_start1}>
                <Text style = {globalStyles.titleParagraph}>Treatment and Interventions</Text>
              </View>
              <View style = {styles.container}>
                    <TextInput
                        style={styles.BiginputField1}
                        value={medicalAbstractForm.treatment}
                        editable={false}
                    />         
              </View>

              <View style={styles.AdminButton}>
                    <TouchableOpacity onPress={() => navigatePage("")}>
                        <View style={styles.ApprovebuttonContainer}>
                            <Text style={styles.label}>Approve</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigatePage("")}>
                        <View style={styles.DeclinebuttonContainer}>
                            <Text style={styles.label}>Decline</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const RequestorInitialScreeningFormPage1 = ({route}) => {

    const screeningformId = route.params
   
    const navigation = useNavigation();

    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Requestor Verification</Text>
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
                <Tab.Screen name="Screening Form" component={FirstScreen} initialParams={{screeningformId} } />
                <Tab.Screen name="Medical Requirements" component={SecondScreen} initialParams={{screeningformId}} />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    flex_Row: {
        width: "95%",
        flexDirection: "row",
        justifyContent: "space-between",

    },
    scrollContainer: {
        backgroundColor: '#FFF8EB',
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent:"center",
        // backgroundColor: "pink"
    },

    screeningFormcontainer: {
        // backgroundColor: "pink",
        flex: 1,
        marginHorizontal: "10%",
        alignItems: "center"
    },

    Medicalcontainer:{
        flex: 1,
        // backgroundColor: 'pink',
        justifyContent:"center",
        alignSelf: "center",

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
    },

    text: {
        fontFamily: "Open-Sans-Regular",
        fontSize: 15,
        textAlign: "justify",
        marginTop: "5%",
    },

    BiginputField1: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#E60965",
        paddingVertical: 5,
        paddingLeft: 15,
        width: 300,
        marginVertical: 10,
        color: "#E60965",
        backgroundColor: "white"
    },
    
    BiginputField: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#E60965",
        paddingVertical: 5,
        paddingLeft: 15,
        width: 300,
        marginVertical: 10,
        color: "#E60965",
        backgroundColor: "white"

    },

    ageInputField:{
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#E60965",
        paddingVertical: 5,
        paddingLeft: 15,
        width: 90,
        marginVertical: 10,
        justifyContent: "center",
        color: "#E60965",
        backgroundColor: "white",
    },

    birthDateInputField :{
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

    SmallinputField: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#E60965",
        paddingVertical: 5,
        paddingLeft: 15,
        width: 130,
        marginVertical: 10,
        justifyContent: "center",
        color: "#E60965",
        backgroundColor: "white",
    },
    title:{
        color: "#E60965",
        fontWeight: "bold",
        marginVertical: 20,
        fontSize: 20

    },
    ApprovebuttonContainer: {
        backgroundColor: '#E60965',
        paddingHorizontal: 37,
        borderRadius: 20,
        paddingVertical: 5,
        marginHorizontal: 10,
        marginBottom: 15

        
    },
    DeclinebuttonContainer: {
        backgroundColor: '#E60965',
        paddingHorizontal: 37,
        borderRadius: 20,
        paddingVertical: 5,
        marginHorizontal: 10,
        marginBottom: 15


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

export default RequestorInitialScreeningFormPage1;