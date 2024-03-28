//Guest Home
import React, { useState } from 'react';
import { ScrollView,Text, View, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import { globalStyles } from "../../../../styles_kit/globalStyles.js";
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const DonorUploadMedicalRequirements = () => {


  const navigation = useNavigation();

  const navigatePage = (Page) => {
    // Navigate to the next screen by route name
    navigation.navigate(Page);
  };

  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
};


    return (
      <View style={globalStyles.container}>
         <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Apply as Donor</Text>
            </View>
        <View style={styles.body}>

            <View style={styles.rectanglesContainer}>
                <View style={styles.rectangle}></View>
                <View style={styles.rectangle}></View>
                <View style={styles.rectangle}></View>
                <View style={styles.rectangle}></View>
                <View style={styles.rectangleIndicator}></View>
            </View>
         
            <Text style = {styles.title}> Upload Medical Requirements </Text>
            <Text style = {styles.note}> Note: Select your answer by ticking the circle</Text>

            <View style = {styles. attachmentContainer}>
                <Text style={styles.label}>
                    Attach Hepa B Test Result
                </Text>
                <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <TouchableOpacity style={styles.iconContainer}>
                      <AntDesign name="picture" size={27} color="#E60965" />
                      <Text style={styles.verticalLine}>|</Text>
                      <AntDesign name="file1" size={24} color="#E60965" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style = {styles. attachmentContainer}>
                <Text style={styles.label}>
                  Attach HIV 1 & 2 Test Result
                </Text>
                <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <TouchableOpacity style={styles.iconContainer}>
                      <AntDesign name="picture" size={27} color="#E60965" />
                      <Text style={styles.verticalLine}>|</Text>
                      <AntDesign name="file1" size={24} color="#E60965" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style = {styles. attachmentContainer}>
                <Text style={styles.label}>
                    Attach Syphillis Test Result
                </Text>
                <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <TouchableOpacity style={styles.iconContainer}>
                      <AntDesign name="picture" size={27} color="#E60965" />
                      <Text style={styles.verticalLine}>|</Text>
                      <AntDesign name="file1" size={24} color="#E60965" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style = {styles. attachmentContainer}>
                <Text style={styles.label}>
                    Attach Pregnancy Booklet
                </Text>
                <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <TouchableOpacity style={styles.iconContainer}>
                      <AntDesign name="picture" size={27} color="#E60965" />
                      <Text style={styles.verticalLine}>|</Text>
                      <AntDesign name="file1" size={24} color="#E60965" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style = {styles. attachmentContainer}>
                <Text style={styles.label}>
                    Government ID 
                </Text>
                <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <TouchableOpacity style={styles.iconContainer}>
                      <AntDesign name="picture" size={27} color="#E60965" />
                      <Text style={styles.verticalLine}>|</Text>
                      <AntDesign name="file1" size={24} color="#E60965" />
                    </TouchableOpacity>
                </View>
            </View>

      

            <TouchableOpacity onPress={toggleCheckbox} style={styles.checkbox}>
                {isChecked ? <AntDesign name="checksquare" size={17} color="#E60965" /> 
                : <Fontisto name="checkbox-passive" size={17} color="#E60965" />}
                <Text style={styles.checkBoxLabel}>I have read the Donation Terms and Condition</Text>
            </TouchableOpacity>

            {/*Approved.js*/}
            <TouchableOpacity style={[styles.button, { opacity: isChecked ? 1 : 0.5 }]} disabled={!isChecked} onPress={() => navigatePage("DonorApproved")}> 
                        <Text style={styles.buttonTitle}>Submit</Text>
            </TouchableOpacity>

     

        </View>

      </View>
        
      )
  }


  const styles = StyleSheet.create({

    body: {
        flex: 1,
        // backgroundColor: "pink",
        width: "85%"
    },

    button: {
        backgroundColor: "#E60965",
        width: 100,
        alignSelf: "center",
        marginVertical: 30,
        paddingVertical: 7,
        borderRadius: 30,
      },
  
      buttonTitle: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 15,
        fontFamily: "Open-Sans-SemiBold",
      },

    title: {
      textAlign: 'center', // Center align the text
      marginTop: 20, // Adjust margin top as needed
      fontSize: 20, // Adjust the font size
      fontWeight: 'bold', // Apply bold font weight
      color: '#E60965',
      marginBottom: 20
    },

    note: {
      color: '#E60965',
      fontFamily: "Open-Sans-Light",
      marginBottom: 10,
      fontSize: 13
    },
    
    row: {
      flexDirection: "row"
    },

    rowAlignment: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },

    iconContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFEECC",
      paddingHorizontal: 5,
      marginLeft: 10,
    },


    attachmentContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: "#E60965",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 17,
       
        backgroundColor: "#FFFFFF"
    },

    label: {
        color: "#E60965",
        fontSize: 15,
        fontFamily: "Open-Sans-SemiBold",
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

    verticalLine: {
      fontSize: 37,
      marginTop: -10,
      color: "#E60965",
    },

    checkbox: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
      marginTop: 20,
    },

    checkBoxLabel: {
      marginLeft: 5,
      color: "#E60965",
      fontSize: 13,
      fontFamily: "Open-Sans-Regular",
    }

  })
  
export default DonorUploadMedicalRequirements;

