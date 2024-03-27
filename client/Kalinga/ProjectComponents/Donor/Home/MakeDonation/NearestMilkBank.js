//Guest EducLibrary
import React, {useState} from "react";
import { 
  ScrollView, 
  Text, View, 
  SafeAreaView, 
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { globalStyles } from "../../../../styles_kit/globalStyles.js";
import { globalHeader } from "../../../../styles_kit/globalHeader.js";

import { FontAwesome5 } from '@expo/vector-icons';




const NearestMilkBank = () => {


  const FirstParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse'

  const SecondParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

  const ThridParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

  return (
      <SafeAreaView style = {globalStyles.SafeArea}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Set Appointment</Text>
            </View>
          <ScrollView
           style = {globalStyles.ScrollView}
           overScrollMode='never' // Disable the over-scroll effect or the Jelly effect when reaching the end of the scroll
           nestedScrollEnabled={true} // Enable nested scrolling
           
           >
            <View style = {globalStyles.container}>
              <View style = {styles.left}>
                <TouchableOpacity>
                    <Text style = {styles.textInsideButton}>
                      Choose a Date 
                    </Text>
                </TouchableOpacity>
                    <View style = {styles.row}>

                      
                      <TextInput 
                                style = {styles.TextInput}
                                placeholder="MM/DD/YYYY"
                                placeholderTextColor="#E60965"
                            />

                      <View style = {styles.icon}>
                        <TouchableOpacity>

                        <FontAwesome5 name="calendar-alt" size={27} color="#E60965" />

                        </TouchableOpacity>
                      </View>
                      

                    </View>
                  
              </View>
              <View style = {styles.left}>
                <View style = {styles.row}>
                  <TouchableOpacity>
                        <Text style = {styles.NearestMilkBankButton}>
                           Nearest Milk Bank
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style = {styles.EarliestDateButton}>
                          Earliest Date
                        </Text>

                    </TouchableOpacity>
                </View>
               
              </View>

              <View style = {styles.box}> 
                <View style = {styles.nameAndAddressContainer}>
                  <Text style = {styles.milkBankName}>
                    Makati Human Milk Bank
                  </Text>
                  <Text style = {styles.address}>
                    1126 Bangkal Health Center E. Rodriguez St. Barangay Bangkal, Makati, 1233 Metro Manila
                  </Text>
                </View>
                <View style = {styles.row}>
                  <View style = {styles.spaceBetween}>
                    <Text style = {styles.subTitle}>
                        Available Date
                    </Text>
                    <Text style = {styles.address}>
                        MM/DD/YYYY
                    </Text>
                  </View>

                  <TouchableOpacity>
                    <Text style = {styles.button}>Set Appointment</Text>
                  </TouchableOpacity>
                </View>
              </View>


              <View style = {styles.box}> 
                <View style = {styles.nameAndAddressContainer}>
                  <Text style = {styles.milkBankName}>
                    Makati Human Milk Bank
                  </Text>
                  <Text style = {styles.address}>
                    1126 Bangkal Health Center E. Rodriguez St. Barangay Bangkal, Makati, 1233 Metro Manila
                  </Text>
                </View>
                <View style = {styles.row}>
                  <View style = {styles.spaceBetween}>
                    <Text style = {styles.subTitle}>
                        Available Date
                    </Text>
                    <Text style = {styles.address}>
                        MM/DD/YYYY
                    </Text>
                  </View>

                  <TouchableOpacity>
                    <Text style = {styles.button}>Set Appointment</Text>
                  </TouchableOpacity>
                </View>
              </View>
              

              <View style = {styles.box}> 
                <View style = {styles.nameAndAddressContainer}>
                  <Text style = {styles.milkBankName}>
                    Makati Human Milk Bank
                  </Text>
                  <Text style = {styles.address}>
                    1126 Bangkal Health Center E. Rodriguez St. Barangay Bangkal, Makati, 1233 Metro Manila
                  </Text>
                </View>
                <View style = {styles.row}>
                  <View style = {styles.spaceBetween}>
                    <Text style = {styles.subTitle}>
                        Available Date
                    </Text>
                    <Text style = {styles.address}>
                        MM/DD/YYYY
                    </Text>
                  </View>

                  <TouchableOpacity>
                    <Text style = {styles.button}>Set Appointment</Text>
                  </TouchableOpacity>
                </View>
              </View>
                
            </View>
            
            
         </ScrollView>
      </SafeAreaView>

    )
    
  }

  const styles = StyleSheet.create ({

    textInsideButton: {
      backgroundColor: "#E60965",
      padding: 15,
      marginTop: 30,
      width: 150,
      borderRadius: 30,
      textAlign: "center",
      color: "white",
      fontFamily: "Open-Sans-Bold"
    },

    left: {
      //backgroundColor: "gray",
      width: "90%"
    },

    row: {
      flexDirection: "row",
      alignItems: "center"
    },

    TextInput: {
      borderWidth: 1,
      borderColor: "#E60965",
      padding: 10,
      width: 200,
      borderRadius: 10,
      marginTop: 10,
      marginRight: -40,
    },

    icon: {

      marginTop: 10,

    },

    NearestMilkBankButton: {

      backgroundColor: "#FFE5EC",
      padding: 15,
      marginTop: 30,
      width: 150,
      borderRadius: 30,
      textAlign: "center",
      color: "#E60965",
      fontFamily: "Open-Sans-Bold",
      marginRight: 10,

    },

    EarliestDateButton: {
     
      backgroundColor: "#E60965",
      borderWidth: 1,
      borderColor: "#E60965",
      padding: 15,
      marginTop: 30,
      width: 150,
      borderRadius: 30,
      textAlign: "center",
      color: "white",
      fontFamily: "Open-Sans-Bold"
    },

    box: {
      borderWidth:1,
      borderColor: "#E60965",
      borderRadius: 20,
      backgroundColor: "#FFE5EC",
      height: 190,
      marginTop: 30,
      padding: 20,
      width: "90%"
      
    },

    nameAndAddressContainer: {
      
      //backgroundColor: "gray",
      marginBottom: 30
    },

    milkBankName: {

      fontFamily: "Open-Sans-Bold",
      fontSize: 20,
      color:  "#E60965",

    },

    address: {

      color: "#E60965",
      fontFamily: "Open-Sans-Regular",
      fontSize: 12,
    },

    subTitle: {
      color: "#E60965",
      fontFamily: "Open-Sans-Bold",
      fontSize: 15,

    },

    spaceBetween: {

      //backgroundColor: "gray",
      marginRight: 50,

    },  

    button: {
      backgroundColor: "#E60965",
      padding: 15,
      width: 170,
      borderRadius: 30,
      textAlign: "center",
      color: "white",
      fontFamily: "Open-Sans-Bold",
  
    }







  })

  export default NearestMilkBank;

  