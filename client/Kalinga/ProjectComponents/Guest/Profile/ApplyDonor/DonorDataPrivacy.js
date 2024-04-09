//Guest EducLibrary
import React from "react";
import { 
  ScrollView, 
  Text, View, 
  SafeAreaView, 
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { globalStyles } from "../../../../styles_kit/globalStyles.js";
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { useNavigation } from '@react-navigation/native';
import DataPrivacyPolicyText from './DataPrivacyText.js';

const DonorDataPrivacy = () => {

  const navigation = useNavigation();

  const navigatePage = (Page) => {
    // Navigate to the next screen by route name
    navigation.navigate(Page);
  }

  return (

      <SafeAreaView style = {styles.SafeArea}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Apply as Donor</Text>
            </View>
          <ScrollView 
            style = {globalStyles.ScrollView}
            overScrollMode='never'
            nestedScrollEnabled={true}
        
          >
              <View style = {styles.container}>
                <Text style = {globalStyles.titleParagraph}>Data Privacy Act</Text>
                <Text style = {styles.paragraphText}>{DataPrivacyPolicyText}</Text>
              </View>

              <View style = {globalStyles.center}>
                <View style = {styles.button}>
                    <TouchableOpacity style = {styles.AgreebuttonContainer} onPress={() => navigatePage("DonorScreeningForm")}>
                        <Text style = {styles.Alabel}>Agree</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.DisagreebuttonContainer} onPress={() => navigatePage("Guest Profile")}>
                        <Text style = {styles.Dlabel}>Diagree</Text>
                    </TouchableOpacity>
                   
                </View>
            </View>

        </ScrollView>
        
      </SafeAreaView>

    )
  }

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
        borderWidth: 1,
        borderColor: "#E60965",
        marginHorizontal: "5%"
    },

    container: {
      flex: 1,
      backgroundColor: '#FFE5EC',
      alignItems: 'center',
      marginHorizontal: "4%",
      marginTop: "5%",
      marginBottom: "-20%",
      paddingVertical: "5%",
      paddingHorizontal: "5%",
      borderRadius: 27,

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

  export default DonorDataPrivacy;

  