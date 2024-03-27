import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';

export default function Header() {
  
       return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
           <Text style={styles.headerTitle}>Good Day!</Text>
           <Text style={styles.h2}>Discover the power of breastmilk for your baby's health and well-being.</Text>
         </View>
        </SafeAreaView>
         
       );
     };
    
   
const styles = StyleSheet.create ({
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