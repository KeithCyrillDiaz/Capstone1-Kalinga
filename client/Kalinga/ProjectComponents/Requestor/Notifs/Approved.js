import React from "react";
import { 
  ScrollView,
  TouchableOpacity, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar,
  StyleSheet,
  Pressable,
  TextInput, 
} from 'react-native';
import { globalStyles } from "../../../styles_kit/globalStyles.js"
import { globalHeader } from "../../../styles_kit/globalHeader.js";
import { Octicons } from '@expo/vector-icons';

const Approved = () => {

    const FirstParagraph = 'Your request has been approved. Please pay the fee before proceeding to the next step'

  return (

      <SafeAreaView style = {styles.SafeArea}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Apply as Donor</Text>
            </View>

            <View style = {styles.container}>
              <View style = {styles.labelContainer}>
                <Text style = {styles.mess}>{FirstParagraph}</Text>
              </View>
            </View>
              
              

              <View style = {globalStyles.center}>
                <TouchableOpacity>
                    <View style = {styles.AgreebuttonContainer}>
                        <Text style = {styles.label}>Done</Text>
                    </View>
                </TouchableOpacity>
            </View>
      </SafeAreaView>

    )
  }

  const styles = StyleSheet.create ({
    SafeArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'yellow',
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
        fontFamily: "Open-Sans-Bold",
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

  export default Approved;

  