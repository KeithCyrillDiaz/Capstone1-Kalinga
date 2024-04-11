//Guest EducLibrary
import React, { useEffect } from "react";
import { 
  ScrollView, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import { globalStyles } from "../../../../styles_kit/globalStyles.js"
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { Octicons } from '@expo/vector-icons';
import { useNavigation , CommonActions } from '@react-navigation/native';

const AdminApprovedDonor = ({route}) => {

  const name = route.params
  const navigation = useNavigation();

  const navigatePage = (Page) => {
    // Navigate to the next screen by route name
    navigation.dispatch(
      CommonActions.reset({
        index: 0, //Reset the stack to 0 so the user cannot go back
        routes: [{ name: Page }], // Replace 'Login' with the name of your login screen
      })
    );
  }

  useEffect(() => {

    const backAction = () => {
      // Navigate to the Admin Menu screen
      navigation.dispatch(
        CommonActions.reset({
          index: 1, // Reset the stack to index 1, leaving the first screen behind
          routes: [{ name: "DonorUserVerification" }], // Navigate to DonorUserVerification screen
        })
      );
      // Prevent default back behavior
      return true;
    };
  
    // Add event listener for hardware back button press
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
  
    // Clean up event listener on component unmount
    return () => backHandler.remove();
}, []);

  const FirstParagraph = `You've `;
  const boldText = <Text style={{fontFamily: "Open-Sans-Bold"}}>approved</Text>;
  const remainingText = ` ${name} as a donor. An email has been sent to notify them of their approval. Thank you for your diligence and dedication in the approval process.`;

  return (

      <SafeAreaView style = {styles.SafeArea}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Donor Verification</Text>
            </View>

            <View style = {styles.container}>
              <Octicons name="checklist" size={200} color="#F94892" />
              <View style = {[styles.labelContainer, {marginTop: 20}]}>
              <Text style={styles.mess}>
                {FirstParagraph}
                {boldText}
                {remainingText}
              </Text>
              </View>
            </View>
              
              
            <TouchableOpacity style = {globalStyles.center} onPress={() => navigatePage("DonorUserVerification")}>
                  <View style = {styles.AgreebuttonContainer} >
                      <Text style = {styles.label}>Done</Text>
                  </View>
            </TouchableOpacity>

      </SafeAreaView>

    )
  }

  const styles = StyleSheet.create ({
    SafeArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF8EB',
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: "pink",
        marginTop: "50%",
        width: " 70%"
      },
  
    labelContainer:{
        //backgroundColor: "red",
        alignItems: "center",
    },

    mess: {
        color: "#E60965",
        fontFamily: "Open-Sans-Regular",
        fontSize: 20,
        textAlign: "center"
    },

    label: {
        color: "white",
        fontFamily: "Open-Sans-Bold",
        fontSize: 15,
    },


    AgreebuttonContainer:{
        backgroundColor: "#E60965",
        paddingHorizontal: 37,
        borderRadius: 20,
        justifyContent: "center",
        paddingVertical: 5,
        marginTop: "-20%"
    },

    BiginputField: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#E60965",
        paddingVertical: 5,
        paddingHorizontal: 20,
        width: "90%",
        height: "100%",
        marginVertical: "1.5%",
        color: "#E60965",
    },

  })

  export default AdminApprovedDonor;

  