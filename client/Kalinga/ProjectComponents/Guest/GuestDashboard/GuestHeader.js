import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import { globalHeader } from '../../../styles_kit/globalHeader';
import { globalStyles } from '../../../styles_kit/globalStyles';

export default function Header() {
  
       return (
       <View style = {{marginTop: "5%"}}>
         <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
              <View style = {styles.BigHeader}>
              <Text style = {globalHeader.BigHeaderTitle}>Good Day!</Text>
                  <Text style = {globalHeader.SubTitle}>Discover the power of breastmilk for your baby's health and well-being.</Text>
              </View>
       </View>
         
       );
     };
    
   
const styles = StyleSheet.create ({

   BigHeader: {
      backgroundColor: '#E60965', // Set the background color of the header
      borderRadius: 34,
      paddingTop: "10%",
      paddingBottom: "7%",
      marginTop: "-10%",
      width: '100%', // the size will depend on the screen, this is better so it will look the same on all phones
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
   
  },

   header: {
      height: 180,
      backgroundColor: '#E60965',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      elevation: 30,
   },
   headerTitle: {
      padding: 30,
      paddingBottom: 0,
      fontFamily: 'Kurale-Regular',
      color: 'white',
      fontSize: 50,
      padding: 15,
      marginLeft: 10,
      marginTop: '8%',
   },
   h2: {
      color: 'white',
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      paddingLeft: 30,
      paddingTop: 5,

   }
})