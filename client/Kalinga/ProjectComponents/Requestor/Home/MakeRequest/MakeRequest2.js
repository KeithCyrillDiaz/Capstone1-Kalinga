//Guest EducLibrary
import React from "react";
import { 
  ScrollView, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity, 
} from 'react-native';
import { globalStyles } from "../../../../styles_kit/globalStyles.js"
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';  
import { useNavigation } from '@react-navigation/native';


const MakeRequest2 = () => {

    const TitleParagraph = 'Thank You!'

    const FirstParagraph = 'We’ll confirm your milk request through your contact details.'
    const navigation = useNavigation();

    const navigatePage = (Page) => {
      navigation.navigate(Page); // Navigate to the Login screen
    }
  return (

      <SafeAreaView style = {styles.SafeArea}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Make a Request</Text>
            </View>
          <ScrollView 
            style = {globalStyles.ScrollView}
            overScrollMode='never'
            nestedScrollEnabled={true}
        
          >
              <View style = {styles.container}>
                <View style = {styles.IconContainer}>
                <MaterialCommunityIcons name="check-decagram" size={200} color="#E60965" /></View>
              
                <View style = {styles.labelContainer}>
                <Text style = {styles.messTitle}>{TitleParagraph}</Text>

                 <Text style = {styles.mess}>{FirstParagraph}</Text>
                </View>
              </View>
              
              

              <View style = {globalStyles.center}>
                <Pressable>
                <TouchableOpacity style={[styles.AgreebuttonContainer]}onPress={() => navigatePage("Requestor Tabs")}>
                  <Text style={styles.label}>Done</Text>
                </TouchableOpacity>
                </Pressable>
            </View>

        </ScrollView>

           
            

      </SafeAreaView>

    )
  }

  const styles = StyleSheet.create ({
    SafeArea: {
        flex: 1,
        backgroundColor: '#fff',
        
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
        fontSize: 18,
        textAlign: "justify"
    },

    messTitle: {
      color: "#E60965",
      fontFamily: "Open-Sans-Bold",
      fontSize: 50,
      textAlign: "justify"
  },


    label: {
        color: "white",
        fontFamily: "Open-Sans-Bold",
        fontSize: 15,
        alignSelf: 'center'
    },


    AgreebuttonContainer:{
        backgroundColor: "#E60965",
        borderRadius: 20,
        justifyContent: "center",
        height:35,
        width: 100
        
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

  export default MakeRequest2;

  