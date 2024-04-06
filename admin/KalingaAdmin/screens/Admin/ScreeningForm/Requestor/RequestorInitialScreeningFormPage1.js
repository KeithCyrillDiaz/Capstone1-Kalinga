import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Feather } from '@expo/vector-icons';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';

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


const FirstScreen = ({  }) => {
    const navigation = useNavigation();

    const navigatePage = (Page) => {
        navigation.navigate(Page); // Navigate to the Login screen
    }
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.tabContent}>
            <Text style = {styles.title}>Initial Screening Form</Text>

<View style = {globalStyles.flex_start}>
  <Text style = {globalStyles.titleParagraph}>Personal Information</Text>
</View>
<View style = {styles.container}>
      <TextInput
          style={styles.BiginputField}
          placeholder="Full Name"
          placeholderTextColor="#E60965"
      />
      <View style = {globalStyles.flex_Row}>
      <TextInput
          style={styles.SmallinputField}
          placeholder="Age"
          placeholderTextColor="#E60965"
      />
      <TextInput
          style={styles.SmallinputField}
          placeholder="Birth Date"
          placeholderTextColor="#E60965"
      />
      </View>
      <TextInput
          style={styles.BiginputField}
          placeholder="Email Address"
          placeholderTextColor="#E60965"
      />
       <TextInput
          style={styles.BiginputField}
          placeholder="Contact Number"
          placeholderTextColor="#E60965"
      />
       <TextInput
          style={styles.BiginputField}
          placeholder="Home Address"
          placeholderTextColor="#E60965"
      /> 
      
</View>

<View style = {globalStyles.flex_start}>
  <Text style = {globalStyles.titleParagraph}>Infant Information</Text>
</View>
<View style = {styles.container}>
      <TextInput
          style={styles.BiginputField}
          placeholder="Name of Child"
          placeholderTextColor="#E60965"
      />
      <View style = {globalStyles.flex_Row}>
      <TextInput
          style={styles.SmallinputField}
          placeholder="Age"
          placeholderTextColor="#E60965"
      />
      <TextInput
          style={styles.SmallinputField}
          placeholder="Sex"
          placeholderTextColor="#E60965"
      />
      </View>

      <View style = {globalStyles.flex_Row}>
      <TextInput
          style={styles.SmallinputField}
          placeholder="Birth Weight"
          placeholderTextColor="#E60965"
      />
      <TextInput
          style={styles.SmallinputField}
          placeholder="Birthdate"
          placeholderTextColor="#E60965"
      />
      </View>
      <TextInput
          style={styles.BiginputField}
          placeholder="Age of Gestation"
          placeholderTextColor="#E60965"
      />
       <TextInput
          style={styles.BiginputField}
          placeholder="Medical Condition"
          placeholderTextColor="#E60965"
      />
      
</View>


            </View>
        </ScrollView>
    );
};

const SecondScreen = () => {
    const navigation = useNavigation();

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
                    />         
              </View>

              <View style = {globalStyles.flex_start1}>
                <Text style = {globalStyles.titleParagraph}>Presenting Complaint</Text>
              </View>
              <View style = {styles.container}>
                    <TextInput
                        style={styles.BiginputField1}
                    />         
              </View>

              <View style = {globalStyles.flex_start1}>
                <Text style = {globalStyles.titleParagraph}>Clinical Findings</Text>
              </View>
              <View style = {styles.container}>
                    <TextInput
                        style={styles.BiginputField1}
                    />         
              </View>

              <View style = {globalStyles.flex_start1}>
                <Text style = {globalStyles.titleParagraph}>Diagnostics</Text>
              </View>
              <View style = {styles.container}>
                    <TextInput
                        style={styles.BiginputField1}
                    />         
              </View>

              <View style = {globalStyles.flex_start1}>
                <Text style = {globalStyles.titleParagraph}>Treatment and Interventions</Text>
              </View>
              <View style = {styles.container}>
                    <TextInput
                        style={styles.BiginputField1}
                    />         
              </View>

              
              <View style = {styles.container}>
                    <TextInput
                        style={styles.BiginputField1}
                        placeholder="Prescription"
                        placeholderTextColor="#E60965"


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

const RequestorInitialScreeningFormPage1 = () => {
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
                <Tab.Screen name="Screening Form" component={FirstScreen} />
                <Tab.Screen name="Medical Requirements" component={SecondScreen} />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
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
        fontFamily: 'Kurale-Regular',
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