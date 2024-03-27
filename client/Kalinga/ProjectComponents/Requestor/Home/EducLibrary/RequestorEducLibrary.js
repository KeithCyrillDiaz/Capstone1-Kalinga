//Donor EducLibrary
import React from "react";
import { 
  ScrollView, 
  Text, View, 
  SafeAreaView, 
  StatusBar,
  StyleSheet
} from 'react-native';
import { globalStyles } from "../../../../styles_kit/globalStyles.js";
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';



const DonorEducLibrary = () => {

  //const { width, height } = Dimensions.get('window');
  
  const FirstParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

  const SecondParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

  const ThridParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

  return (
      <SafeAreaView style = {globalStyles.SafeArea}>

          <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Education Library</Text>
            </View>
            
          <ScrollView style = {globalStyles.ScrollView}>
              <View style = {styles.flex_start}>
                <Text style = {globalStyles.titleParagraph}>Categories</Text>
              </View>

              <View style={styles.container}>
                <View style = {globalStyles. EducLibraryBox}>
                  <Text style = {globalStyles. EducLibraryBox_Title}>BreastFeeding Basics</Text>
                </View>
                <View style = {globalStyles. EducLibraryBox}>
                  <Text style = {globalStyles. EducLibraryBox_Title}>Breast Milk Nutrition</Text>
                </View>
                <View style = {globalStyles. EducLibraryBox}>
                  <Text style = {globalStyles. EducLibraryBox_Title}>Breast Pumping and Storing</Text>
                </View>
                <View style = {globalStyles. EducLibraryBox}>
                  <Text style = {globalStyles. EducLibraryBox_Title}>Common Breast Feeding Challenges</Text>
                </View>
                <View style = {globalStyles. EducLibraryBox}>
                  <Text style = {globalStyles. EducLibraryBox_Title}>Health and Wellness</Text>
                </View>
                <View style = {globalStyles. EducLibraryBox}>
                  <Text style = {globalStyles. EducLibraryBox_Title}>Stories and Experiences</Text>
                </View>
              </View>

            
              </ScrollView>
      </SafeAreaView>

    )
  }

  const styles = StyleSheet.create ({
    container: {
      flex: 1,
      backgroundColor: '#FFE7DA',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },

    flex_start: {
      flex: 1,
      //justifyContent: "center"
      alignItems: "flex-start",
      marginLeft: "5%",
      marginVertical: "2.5%"
    }

  })

  export default DonorEducLibrary;

  