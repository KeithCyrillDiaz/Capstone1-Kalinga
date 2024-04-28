//Guest Profile
import React from 'react';
import { ScrollView,Text, View, SafeAreaView,StatusBar} from 'react-native';
import { globalStyles } from '../../../styles_kit/globalStyles.js';
import { Entypo } from '@expo/vector-icons';
import { globalHeader } from '../../../styles_kit/globalHeader.js';


const GuestProfile = () => {

    const FirstParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    const SecondParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    const ThridParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    return (

      <SafeAreaView>
        <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Education Library</Text>
            </View>

            <ScrollView>
            <View style={globalStyles.container}>
              <Entypo name="location-pin" size={24} color="black" />

              <Text style = {globalStyles.paragraphText}>{FirstParagraph}</Text>
              <Text style = {globalStyles.paragraphText}>{FirstParagraph}</Text>
              <Text style = {globalStyles.paragraphText}>{FirstParagraph}</Text>
              <Text style = {globalStyles.paragraphText}>{FirstParagraph}</Text>
              <Text style = {globalStyles.paragraphText}>{FirstParagraph}</Text>
              <Text style = {globalStyles.paragraphText}>{FirstParagraph}</Text>
              <Text style = {globalStyles.paragraphText}>{FirstParagraph}</Text>
              <Text style = {globalStyles.paragraphText}>{FirstParagraph}</Text>
              <Text style = {globalStyles.paragraphText}>{FirstParagraph}</Text>
              <Text style = {globalStyles.paragraphText}>{FirstParagraph}</Text>
              <Text style = {globalStyles.paragraphText}>{FirstParagraph}</Text>
              <Text style = {globalStyles.paragraphText}>{FirstParagraph}</Text>
              <Text style = {globalStyles.paragraphText}>{FirstParagraph}</Text>
              <Text style = {globalStyles.paragraphText}>{FirstParagraph}</Text>
              <Text style = {globalStyles.paragraphText}>{FirstParagraph}</Text>
              <Text style = {globalStyles.paragraphText}>{FirstParagraph}</Text>
              <Text style = {globalStyles.paragraphText}>{FirstParagraph}</Text>
              <Text style = {globalStyles.paragraphText}>{FirstParagraph}</Text>
              <Text style = {globalStyles.paragraphText}>{FirstParagraph}</Text>
            </View>
        </ScrollView>
      </SafeAreaView>
      
        
      )
  }

  
export default GuestProfile;