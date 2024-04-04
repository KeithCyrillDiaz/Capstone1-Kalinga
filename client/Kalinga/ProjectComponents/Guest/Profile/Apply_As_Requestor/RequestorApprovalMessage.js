//Guest EducLibrary
import React from "react";
import { 
  ScrollView, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput, 
} from 'react-native';
import { globalStyles } from "../../../../styles_kit/globalStyles.js"
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RequestorApprovalMessage = () => {

    const FirstParagraph = 'Thank you for submitting request form! Your information has been received. We will carefully review your details and notify you of the qualification status soon. Stay tuned for updates!'
    const navigation = useNavigation();

    const navigatePage = (Page) => {
      // Navigate to the next screen by route name
      navigation.navigate(Page);
    };

  return (

      <SafeAreaView style = {styles.SafeArea}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Apply as Requestor</Text>
            </View>
          <ScrollView 
            style = {globalStyles.ScrollView}
            overScrollMode='never'
            nestedScrollEnabled={true}
        
          >
              <View style = {styles.container}>
                <View style = {styles.IconContainer}>
                    <Octicons name="checklist" size={200} color="#E60965" />
                </View>
              
                <View style = {styles.labelContainer}>
                 <Text style = {styles.mess}>{FirstParagraph}</Text>
                </View>
              </View>
              
              

              <View style = {globalStyles.center}>
                    <TouchableOpacity style = {styles.AgreebuttonContainer} onPress={() => navigatePage("Log In")}>
                        <Text style = {styles.label}>Next</Text>
                    </TouchableOpacity>
            </View>

        </ScrollView>

           
            

      </SafeAreaView>

    )
  }

  const styles = StyleSheet.create ({
    SafeArea: {
        flex: 1,
        backgroundColor: '#FFF8EB',
        
        width: '100%',
        height: "100%"
    },


    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: "yellow"

      },

    IconContainer:{
        flex: 1,
        alignItems: "center",
        marginTop: "40%",
        marginBottom: "5%",
        marginLeft: "11%"
    },
  
    labelContainer:{

        flex: 1,
        //backgroundColor: "pink",
        width: "80%",
        alignItems: "center",
       
    },

    mess: {
        color: "#E60965",
        fontFamily: "Open-Sans-Bold",
        fontSize: 15,
        textAlign: "justify"
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
        marginTop: "-5%"
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

  export default RequestorApprovalMessage;

  