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
import { globalStyles } from "../../../styles_kit/globalStyles.js"
import { globalHeader } from "../../../styles_kit/globalHeader.js";
import { useNavigation } from '@react-navigation/native';

const RequestorMedicalAbstract = () => {

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
                <View style = {globalStyles.flex_Row}>
                    <View style = {styles.pageIndicator}/>
                    <View style = {styles.IndicatedPage}/>
                    <View style = {styles.pageIndicator}/>
                </View>
               
                <Text style = {styles.MainTitle}>Medical Abstract of Infant</Text>
              </View>
              
              <View style = {globalStyles.flex_start}>
                <Text style = {styles.title}>Clinical History</Text>
              </View>
              <View style = {styles.container}>
                    <TextInput
                        style={styles.BiginputField}
                    />         
              </View>

              <View style = {globalStyles.flex_start}>
                <Text style = {styles.title}>Presenting Complaint</Text>
              </View>
              <View style = {styles.container}>
                    <TextInput
                        style={styles.BiginputField}
                    />         
              </View>

              <View style = {globalStyles.flex_start}>
                <Text style = {styles.title}>Clinical Findings</Text>
              </View>
              <View style = {styles.container}>
                    <TextInput
                        style={styles.BiginputField}
                    />         
              </View>

              <View style = {globalStyles.flex_start}>
                <Text style = {styles.title}>Diagnostics</Text>
              </View>
              <View style = {styles.container}>
                    <TextInput
                        style={styles.BiginputField}
                    />         
              </View>

              <View style = {globalStyles.flex_start}>
                <Text style = {styles.title}>Treatment and Interventions</Text>
              </View>
              <View style = {styles.container}>
                    <TextInput
                        style={styles.BiginputField}
                    />         
              </View>



              <View style = {globalStyles.center}>
            
                    <TouchableOpacity style = {styles.AgreebuttonContainer} onPress={() => navigatePage("RequestorReasonForRequesting")}>
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
  

    label: {
        color: "white",
        fontFamily: "Open-Sans-Bold",
        fontSize: 15,

    },

    IndicatedPage: {
        height: 4,
        width: 50,
        backgroundColor: "#F94892",
        marginTop: "10%",
        marginHorizontal: "1%",
    },

    pageIndicator: {
        height: 4,
        width: 50,
        backgroundColor: "#FFEECC",
        marginTop: "10%",
        marginHorizontal: "1%",
    },

    MainTitle: {
        fontFamily: 'Open-Sans-Bold',
        fontSize: 20,
        color: '#E60965',
        marginTop: "5%"
    },

    title: {
        fontFamily: 'Open-Sans-Bold',
        fontSize: 16,
        color: '#E60965',
        marginVertical: "4%"
    },

    AgreebuttonContainer:{
        backgroundColor: "#E60965",
        paddingHorizontal: 37,
        borderRadius: 20,
        justifyContent: "center",
        paddingVertical: 5,
        marginTop: "-25%"
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

  export default RequestorMedicalAbstract;

  