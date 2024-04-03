//Guest EducLibrary
import React, { useState } from "react";
import { 
  ScrollView, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar,
  StyleSheet,
  TextInput, 
  TouchableOpacity,
} from 'react-native';
import { globalStyles } from "../../../../styles_kit/globalStyles.js";
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { useNavigation } from '@react-navigation/native';
import randomatic from 'randomatic';


const DonorScreeningForm = () => {

    const navigation = useNavigation();

  const navigatePage = (Page, data) => {
    // Navigate to the next screen by route name
   console.log(data)
    navigation.navigate(Page, data);
  };

  const applicantId = randomatic('Aa0', 20);

  

  const [screeningFormData, setScreeningFormData] = useState({
    applicantId: applicantId,
    userType: "Donor",
    fullName: '',
    age: '',
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
    medicalCondition: '',
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
    MH7_Reason: '',
    MH8: '',
    MH9: '',
    MH10: '',
    MH11: '',
    MH12: '',
    MH13: '',
    MH13_Reason: '',
    MH14: '',
    SH1: '',
    SH2: '',

});

// Handler to update the state with the entered values
const handleChangeText = (name, value) => {
    setScreeningFormData({ ...screeningFormData, [name]: value });
};

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
                    <View style = {globalStyles.flex_Row}>
                    <TextInput
                        style={styles.ageInputField}
                        placeholder="Age"
                        placeholderTextColor="#E60965"
                          keyboardType="numeric"
                        onChangeText={(value) => handleChangeText('age', value)}
                    />
                    <TextInput
                        style={styles.birthDayInputField}
                        placeholder="Birth Date: MM/DD/YY"
                        placeholderTextColor="#E60965"
                        onChangeText={(value) => handleChangeText('birthDate', value)}
                    />
                    </View>
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Email Address"
                        placeholderTextColor="#E60965"
                        onChangeText={(value) => handleChangeText('email', value)}
                    />
                     <TextInput
                        style={styles.BiginputField}
                        placeholder="Contact Number"
                        placeholderTextColor="#E60965"
                        keyboardType="numeric"
                        onChangeText={(value) => handleChangeText('contactNumber', value)}
                    />
                     <TextInput
                        style={styles.BiginputField}
                        placeholder="Home Address"
                        placeholderTextColor="#E60965"
                        onChangeText={(value) => handleChangeText('homeAddress', value)}
                    /> 
                    
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
                    <TextInput
                        style={styles.SmallinputField}
                        placeholder="Age: (Yr/Month)"
                        placeholderTextColor="#E60965"
                        onChangeText={(value) => handleChangeText('childAge', value)}
                    />
                    </View>

                    <View style = {globalStyles.flex_Row}>
                    <TextInput
                        style={styles.sexInputField}
                        placeholder="Sex"
                        placeholderTextColor="#E60965"
                        onChangeText={(value) => handleChangeText('sex', value)}
                        
                    />
                    <TextInput
                        style={styles.birthDayInputField}
                        placeholder="Birth Date: MM/DD/YY"
                        placeholderTextColor="#E60965"
                  
                        onChangeText={(value) => handleChangeText('childBirthDate', value)}
                    />
                    </View>
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Age of Gestation (Months)"
                        placeholderTextColor="#E60965"
                        keyboardType="numeric"
                        onChangeText={(value) => handleChangeText('ageOfGestation', value)}
                    />
                     <TextInput
                        style={styles.BiginputField}
                        placeholder="Medical Condition"
                        placeholderTextColor="#E60965"
                        onChangeText={(value) => handleChangeText('medicalCondition', value)}
                    />
                    
              </View>

              <View style = {globalStyles.center}>

                    <TouchableOpacity 
                      style={styles.AgreebuttonContainer} 
                      onPress={() => navigatePage("DonorScreeningForm2", { screeningFormData: screeningFormData })}
                    >
                      <Text style={styles.label}>Next</Text>
                    </TouchableOpacity>
             
            </View>

        </ScrollView>

           
            

      </SafeAreaView>

    )
  }

  const styles = StyleSheet.create ({

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

    BiginputField: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#E60965",
        paddingVertical: 5,
        paddingHorizontal: 20,
        width: "90%",
        marginVertical: "1.5%",
        color: "#E60965",
        backgroundColor: "#FFFFFF",
        elevation: 5
    },

    sexInputField: {
      borderWidth: 1,
      borderRadius: 20,
      borderColor: "#E60965",
      paddingVertical: 5,
      paddingHorizontal: 20,
      width: "25%",
      marginVertical: "1.5%",
      marginHorizontal: "3%",
      color: "#E60965",
      backgroundColor: "#FFFFFF",
      elevation: 5,
    },

    ageInputField: {
      borderWidth: 1,
      borderRadius: 20,
      borderColor: "#E60965",
      paddingVertical: 5,
      paddingHorizontal: 20,
      width: "23%",
      marginVertical: "1.5%",
      marginHorizontal: "3%",
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

    SmallinputField: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#E60965",
        paddingVertical: 5,
        paddingHorizontal: 20,
        width: "47%",
        marginVertical: "1.5%",
        marginHorizontal: "3%",
        color: "#E60965",
        backgroundColor: "#FFFFFF",
        elevation: 5,
    },

   
  })

  export default DonorScreeningForm;

  