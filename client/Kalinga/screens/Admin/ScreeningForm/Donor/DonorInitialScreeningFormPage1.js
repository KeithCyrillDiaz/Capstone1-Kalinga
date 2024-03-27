//Guest Home
import React from 'react';
import { ScrollView,Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { globalHeader } from '../../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import { useNavigation } from '@react-navigation/native';




const DonorInitialScreeningFormPage1 = () => {

    const FirstParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    const SecondParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    const ThridParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    const UserName = "Rogine"

    
    const navigation = useNavigation(); 
  const navigatePage = (Page) => {
    navigation.navigate(Page); // Navigate to the Login screen
  }


    return (
      <View style={globalStyles.container}>
         <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Donor Verification</Text>
            </View>

        <ScrollView
        overScrollMode='never' // Disable the over-scroll effect or the Jelly effect when reaching the end of the scroll
        nestedScrollEnabled={true} // Enable nested scrolling
        >
               
               <View style = {styles.center}>
                    <View style = {styles.row}>
                        <TouchableOpacity>
                            <Text style = {styles.indicatedTabsTitle}>Screening Form</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style = {styles.tabsTitle}>Medical</Text>
                            <Text style = {styles.tabsTitle}>Requirements</Text>
                        </TouchableOpacity>
                    </View> 
               </View>
              

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
                <Text style = {styles.subtitle}>Infant Information</Text>
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

              <View style = {globalStyles.center}>
                <TouchableOpacity onPress={() => navigatePage("DonorInitialScreeningFormPage2")}>
                    <View style = {styles.AgreebuttonContainer}>
                        <Text style = {styles.label}>Next</Text>
                    </View>
                </TouchableOpacity>
            </View>
          
              
        </ScrollView>
      </View>
        
      )
  }


  const styles = StyleSheet.create({

    SafeArea: {
        flex: 1,
        backgroundColor: '#fff',
        
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
    },


    title: {
      textAlign: 'center', // Center align the text
      marginTop: 40, // Adjust margin top as needed
      fontSize: 20, // Adjust the font size
      fontWeight: 'bold', // Apply bold font weight
      color: '#E60965',
      marginBottom: 30,
    },

    note: {
      color: '#E60965',
      fontFamily: "Open-Sans-Light",
      marginTop: 20,
      fontSize: 13
    },
    

    row: {
      flexDirection: "row"
    },


    center: {
        //backgroundColor: "gray",
        alignItems: "center",
        marginTop: "5%"
    },

    tabsTitle: {
     
        color: "#E60965",
        fontFamily: "Open-Sans-Bold",
        fontSize: 20,
        marginHorizontal: 30,
        width: 120,
        textAlign: "center",

    },

    indicatedTabsTitle:{

        color: "#E60965",
        fontFamily: "Open-Sans-Bold",
        fontSize: 20,
        marginHorizontal: 30,
        width: 100,
        textAlign: "center",
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: "#E60965",

    },

    button: {
        color: "white",
        marginVertical: 50,
        alignSelf: "center",
        backgroundColor: "#E60965",
        paddingVertical: 5,
        paddingHorizontal: 30,
        fontSize: 15,
        borderRadius: 30,
        fontFamily: "Open-Sans-SemiBold"
    }

   

  })
  
export default DonorInitialScreeningFormPage1;

