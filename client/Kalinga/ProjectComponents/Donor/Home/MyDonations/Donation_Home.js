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



const DonationHome = () => {


  const FirstParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse'

  const SecondParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

  const ThridParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

  return (
      <SafeAreaView style = {globalStyles.SafeArea}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>My Donations</Text>
            </View>
          <ScrollView
           style = {globalStyles.ScrollView}
           overScrollMode='never' // Disable the over-scroll effect or the Jelly effect when reaching the end of the scroll
           nestedScrollEnabled={true} // Enable nested scrolling
           
           >
            <View style = {styles.container}>
                
            </View>
            
            
         </ScrollView>
      </SafeAreaView>

    )
    
  }

  const styles = StyleSheet.create ({


  })

  export default DonationHome;

  