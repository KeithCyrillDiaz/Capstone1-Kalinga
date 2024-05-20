import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Linking } from 'react-native';
import { globalStyles } from '../../../styles_kit/globalStyles';

import Header from './GuestHeader';

import { useNavigation } from '@react-navigation/native';

export default function GuestHome() {
  const navigation = useNavigation();
  const navigatePage = (Page) => {
    navigation.navigate(Page); // Navigate to the Login screen
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        style = {globalStyles.scrollView}
        overScrollMode='never'
        nestedScrollEnabled={true}>
          
    
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={() => navigatePage("Guest Explore")} style={styles.rowButton}>
          <View style={styles.buttonRowContainer}>
            <MaterialIcons name="location-on" size={100} color="#E60965"/>
            <Text style={styles.button_H1}>Milk Bank Locator</Text>
            <Text style={styles.button_H2}>Easily find human milk banks near you</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigatePage("Guest Educational Library")} style={styles.rowButton}>
          <View style={styles.buttonRowContainer}>
            <FontAwesome5 style={styles.book} name="book-open" size={80} color="#E60965" />
            <Text style={styles.educ}>Educational Library</Text>
            <Text style={styles.button_H2}>Explore our educational articles</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigatePage("Instant Messages")} style={styles.rowButton}>
          <View style={styles.buttonRowContainer}>
            <MaterialCommunityIcons name="robot" size={100} color="#E60965" />
            <Text style={styles.button_H1}>Instant Chat</Text>
            <Text style={styles.button_H2}>Chatbot assistance for FAQs</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={styles.bodyTitle}>News and Updates</Text>

        <View style={styles.columnContainer}>
          <View  style={styles.colButton}>
            <View style={styles.buttonColContainer}>
              <Text style={styles.button_H1_1}>04-08-2024 : Milk letting activity @ Apolonio Samson Health Center</Text>
              <Text style={styles.button_H2_1}>Maraming salamat sa ating mga breastfeeding mothers na nag-donate sa milk letting activity ngayong araw. Maraming salamat din sa ating district nutritionist...</Text>
              <Text style={styles.seeMoreButton} onPress={() => Linking.openURL('https://www.facebook.com/QC.HUMANMILKBANK/posts/pfbid0etkfqMfdv8GjngmoAKrNTq4NNu2daxuEmc65XA1sPUUJdoK37a5BSsfooFD9iRPWl')}>
                See More...
              </Text>
            </View>
          </View>

          <View style={styles.columnContainer}>
            <View  style={styles.colButton}>
              <View style={styles.buttonColContainer}>
                <Text style={styles.button_H1_1}>04-08-2024 : QCHMB HOLIDAY ADVISORY</Text>
                <Text style={styles.button_H2_1}>Here is our Office schedule for this coming week:
                    April 9,2024 ( Tues/Araw ng kagitingan)...
                    </Text>
                <Text style={styles.seeMoreButton} onPress={() => Linking.openURL('https://www.facebook.com/QC.HUMANMILKBANK/posts/pfbid02vyBtkWhEuKMtvERHmetX5zLNFTsjfrt1u1FuizDouYxYoSVVPuRShNQAeW1KLxbRl')}>
                  See More...
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.columnContainer}>
            <View  style={styles.colButton}>
            <View style={styles.buttonColContainer}>
              <Text style={styles.button_H1_1}>04-05-2024 : Milk letting activity @ Banlat Health Center</Text>
              <Text style={styles.button_H2_1}>Maraming salamat sa ating mga breastfeeding mothers na nag-donate sa milk letting activity ngayong araw. Maraming salamat din sa ating district nutritionist...</Text>
              <Text style={styles.seeMoreButton} onPress={() => Linking.openURL('https://www.facebook.com/QC.HUMANMILKBANK/posts/pfbid07VnSx5DWHStAGd72zVjyK2UQqpg4q3aVUAowLg2G6sD6h1U3RBi72RZBVoESheEAl')}>
                See More...
              </Text>
            </View>
          </View>
        </View>
      </View>

      
    </View>
    </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  educ: {
    fontFamily: 'OpenSans_Condensed-Bold',
    color: '#E60965',
    fontSize: 15,
  },

  book: {
    marginTop: 10,
    marginBottom: 10,
  },
  
  container: {
    flex: 1,
    backgroundColor: '#FFF8EB',
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },

  rowButton: {
    flex: 3,
    marginHorizontal: 5,
  },

  buttonRowContainer: {
    backgroundColor: '#FFE5EC',
    borderColor: '#E60965',
    borderWidth: 1,
    width: "100%",
    aspectRatio: 7 / 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginTop: 10,
    marginBottom: 10,
  },

  button_H1: {
    fontFamily: 'OpenSans_Condensed-Bold',
    color: '#E60965',
    fontSize: 15,
    paddingTop: 5,
  },

  button_H2: {
    fontFamily: 'OpenSans-Regular',
    color: '#E60965',
    textAlign: "center",
    fontSize: 10
  },

  button_H1_1: {
    fontFamily: 'OpenSans_Condensed-Bold',
    color: '#E60965',
    fontSize: 15,
  },

  button_H2_1: {
    fontFamily: 'OpenSans-Regular',
    color: '#E60965',
    textAlign: "justify",
    fontSize: 12,
    paddingTop: 5,
    margin:5
  },

  seeMoreButton: {
    textDecorationLine: 'underline',
    fontFamily: 'OpenSans-Regular',
    color: '#E60965',
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: "right",
    paddingTop: 15,
  },

  bodyTitle: {
    fontFamily: 'OpenSans_Condensed-Bold',
    color: '#E60965',
    fontSize: 25,
    paddingTop: 5,
    padding: 10,
  },

  columnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  colButton: {
    marginVertical: 5,
  },

  buttonColContainer: {
    backgroundColor: '#FFE5EC',
    width: "95%",
    borderColor: '#E60965',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'left',
    padding: 15,
    elevation: 5,
    marginVertical: 3,
  },

  bottomBorder: {
    backgroundColor: '#E60965',
    height: 90,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 0,
    position: 'absolute',
    bottom: 0,
  },

  iconbuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
    marginLeft: 120,
    marginRight: 120,
  },

  iconText: {
    fontSize: 12,
    color: 'white',
    marginTop: 0,
    marginLeft: 10,
  },

});
