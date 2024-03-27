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



const CompletedDonations = () => {


  const FirstParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse'

  const SecondParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

  const ThridParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

  return (
      <SafeAreaView style = {styles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
              <View style = {globalHeader.SmallHeader}>
                  <Text style = {globalHeader.SmallHeaderTitle}>My Donations</Text>
              </View>

           <ScrollView
           style = {globalStyles.ScrollView}
           overScrollMode='never' // Disable the over-scroll effect or the Jelly effect when reaching the end of the scroll
           nestedScrollEnabled={true} // Enable nested scrolling
           
           >
            <View style = {globalStyles.container}>
                <View style = {styles.row}>
                    
                    <TouchableOpacity>
                      <Text style = {styles.ongoingButton}>
                        Ongoing
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <Text style = {styles.completedButton}>
                        Completed
                      </Text>
                    </TouchableOpacity>

                </View>

                <View style = {styles.logoContainer}>
                  <Text>
                    Logo
                  </Text>
                 
                </View>
                <View style = {styles.flex}>
                  <Text style = {styles.caption}>
                      Any ongoing transaction will appear here
                  </Text>
                </View>
               
            </View>


            
         </ScrollView>
      </SafeAreaView>

    )
    
  }

  const styles = StyleSheet.create ({

    container: {

      backgroundColor: "white",
      height: "100%"
    },
    row: {
      //backgroundColor: "gray",
      flexDirection: "row",
      width: "90%",
      paddingTop: "7%",
      paddingBottom: "4%",
      borderBottomWidth: 1,
      borderColor: "#FFACC7"
  },

  ongoingButton: {
    
    marginHorizontal: 10,
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: "#FFE5EC",
    color: "#E60965",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E60965",
   
  },

  completedButton: {

    backgroundColor: "#E60965",
    color: "white",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 45,
    paddingHorizontal: 40,
    paddingVertical: 15,
   
  },

  logoContainer: {
    marginTop: "40%",
    backgroundColor: "pink",
    height: 200,
    width: 200,

  },

  caption: {
    fontFamily: "Open-Sans-SemiBold",
    color: "#E60965",
    fontSize: 17,
    textAlign: "center",
    marginTop: 20,
  },

  flex: {
    //backgroundColor: "gray",
    width: "70%"
  }

  })

  export default CompletedDonations;

  