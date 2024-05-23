import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity,
  StatusBar, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import { globalStyles } from "../../../../styles_kit/globalStyles.js";
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { useNavigation } from '@react-navigation/native';
import RequestorDataPrivacyPolicyText from './RequestorDataPrivacyText.js';

const RequestorDataPrivacy = () => {
  const [agreeButtonText, setAgreeButtonText] = useState('Agree');
  const [disagreeButtonText, setDisagreeButtonText] = useState('Disagree');

  // const handleAgreeButtonPress = () => {
  //   console.log('Agree button pressed');
  //   setAgreeButtonText('Agreed');
  // };

  // const handleDisagreeButtonPress = () => {
  //   console.log('Disagree button pressed');
  //   setDisagreeButtonText('Disagreed');
  // };

  const navigation = useNavigation();
  const navigatePage = (Page) => {
    navigation.navigate(Page); // Navigate to the Login screen
};

  return (

    <SafeAreaView style = {globalStyles.defaultBackgroundColor}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
          <View style = {globalHeader.SmallHeader}>
            <Text style = {globalHeader.SmallHeaderTitle}>Apply as Requestor</Text>
          </View>
        <ScrollView 
          overScrollMode='never'
          nestedScrollEnabled={true}
      
        >
            <View style = {styles.container}>
              <Text style = {globalStyles.titleParagraph}>Data Privacy Act</Text>
              <Text style = {styles.paragraphText}>{RequestorDataPrivacyPolicyText}</Text>
            </View>

            <View style = {globalStyles.center}>
              <View style = {styles.button}>
                  <TouchableOpacity style = {styles.AgreebuttonContainer} onPress={() => navigatePage("RequestorScreeningForm")}>
                      <Text style = {styles.Alabel}>Agree</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style = {styles.DisagreebuttonContainer} onPress={() => navigatePage("Guest Profile")}>
                      <Text style = {styles.Dlabel}>Disagree</Text>
                  </TouchableOpacity>
                 
              </View>
          </View>

      </ScrollView>
      
    </SafeAreaView>

  )
};

const styles = StyleSheet.create ({
  SafeArea: {
      flex: 1,
      backgroundColor: '#FFF8EB',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: "100%"
  },

  button: {
      flex: 1,
      flexDirection: "row",
      //backgroundColor: "red"
  },

  Alabel: {
      color: "white",
      fontFamily: "Open-Sans-Bold",
      fontSize: 15,

  },

  Dlabel: {
      color: "#E60965",
      fontFamily: "Open-Sans-Bold",
      fontSize: 15,

  },


  AgreebuttonContainer:{
      backgroundColor: "#E60965",
      paddingVertical: 5,
      paddingHorizontal: 37,
      borderRadius: 20,
      justifyContent: "center",
      marginBottom: "10%",
      marginHorizontal: "5%"
  },
  
  DisagreebuttonContainer:{
      backgroundColor: "white",
      paddingVertical: 5,
      paddingHorizontal: 37,
      borderRadius: 20,
      justifyContent: "center",
      marginBottom: "10%",
      elevation:7,
      borderColor: "#E60965",
      marginHorizontal: "5%"
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    marginHorizontal: "7%",
    marginTop: "5%",
    marginBottom: "-20%",
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    borderRadius: 27,
    elevation: 7

  },

  flex_start: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: "5%",
    marginVertical: "2.5%"
  },

  paragraphText: {
    fontFamily: 'Open-Sans-Regular',
    fontSize: 17,
    marginHorizontal: '4%',
    textAlign: 'justify',
    color: '#E60965',
  }
  

})

export default RequestorDataPrivacy;
