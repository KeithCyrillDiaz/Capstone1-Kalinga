//Guest Home
import React from 'react';
import { ScrollView,Text, View, StatusBar, TouchableOpacity} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { globalHeader } from '../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../styles_kit/globalStyles.js';


const GuestHome = () => {

    const FirstParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    const SecondParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    const ThridParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    return (
      <View style={globalStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
              <View style = {globalHeader.BigHeader}>
              <Text style = {globalHeader.BigHeaderTitle}>Good Day!</Text>
                  <Text style = {globalHeader.SubTitle}>Discover the power of breastmilk for your baby's health and well-being.</Text>
              </View>
        <ScrollView>
            <View style={globalStyles.container}>
           
              <View style = {globalStyles.flexRow}>
                <View style = {globalStyles.smallBackgroundBox}>
                  <Entypo name="location-pin" size={50} color="#E60965" />
                  <View style = {globalStyles.center}>
                    <Text style = {globalStyles.Label}>Milk Bank Locator</Text>
                  </View>
                </View>
                <View style = {globalStyles.smallBackgroundBox}>
                  <FontAwesome5 name="book-open" size={50} color="#E60965"/>
                  <View style = {globalStyles.center}>
                    <Text style = {globalStyles.Label}>Educational Library</Text>
                  </View>
                </View>
                <View style = {globalStyles.smallBackgroundBox}>
                  <FontAwesome5 name="robot" size={50} color="#E60965" />
                  <View style = {globalStyles.center}>
                    <Text style = {globalStyles.Label}>Instant Chat</Text>
                  </View>
                </View>
              </View>
              <View style = {globalStyles.leftFlexBox}>
                <Text style = {globalStyles.titleParagraph}>News and Updates</Text>
              </View>
              

              <Text style = {globalStyles.paragraphText}>{FirstParagraph}</Text>
              <Text style = {globalStyles.paragraphText}>{FirstParagraph}</Text>
              <Text style = {globalStyles.paragraphText}>{FirstParagraph}</Text>
              
            </View>
            <View style={globalStyles.bottomBorder}>
                <View style={globalStyles.iconbuttonContainer}>
                <TouchableOpacity onPress={() => navigatePage("Guest Home")} style={globalStyles.iconButton}>
                  <Feather name="home" size={45} color="white"/>
                  <Text style={globalStyles.iconText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigatePage("Guest Profile")}style={globalStyles.iconButton}>
                  <MaterialIcons name="person-outline" size={50} color="white" />
                  <Text style={globalStyles.iconText}>Profile</Text>
                  <View style={globalStyles.line2}></View>
                </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="auto" />

        </ScrollView>
      </View>
        
      )
  }

  
export default GuestHome;

