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

const RequestorScreeningForm = () => {


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
            showsVerticalScrollIndicator={false}
          >
              <View style = {styles.container}>
                <View style = {globalStyles.flex_Row}>
                    <View style = {styles.IndicatedPage}/>
                    <View style = {styles.pageIndicator}/>
                    <View style = {styles.pageIndicator}/>
                </View>
               
                <Text style = {styles.title}>Initial Screening Form</Text>
              </View>

                

              <View style = {globalStyles.flex_start}>
                <Text style = {globalStyles.titleParagraph}>Personal Information</Text>
              </View>
              <View style = {styles.container}>
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Full Name"
                        placeholderTextColor="#E60965"
                    />
                    <View style = {globalStyles.flex_Row}>
                    <TextInput
                        style={styles.SmallinputField}
                        placeholder="Age"
                        placeholderTextColor="#E60965"
                    />
                    <TextInput
                        style={styles.SmallinputField}
                        placeholder="Birth Date"
                        placeholderTextColor="#E60965"
                    />
                    </View>
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Email Address"
                        placeholderTextColor="#E60965"
                    />
                     <TextInput
                        style={styles.BiginputField}
                        placeholder="Contact Number"
                        placeholderTextColor="#E60965"
                    />
                     <TextInput
                        style={styles.BiginputField}
                        placeholder="Home Address"
                        placeholderTextColor="#E60965"
                    /> 
                    
              </View>

              <View style = {globalStyles.flex_start}>
                <Text style = {styles.subtitle}>Infant Information</Text>
              </View>
              <View style = {styles.container}>
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Name of Child"
                        placeholderTextColor="#E60965"
                    />
                    <View style = {globalStyles.flex_Row}>
                    <TextInput
                        style={styles.SmallinputField}
                        placeholder="Age"
                        placeholderTextColor="#E60965"
                    />
                    <TextInput
                        style={styles.SmallinputField}
                        placeholder="Sex"
                        placeholderTextColor="#E60965"
                    />
                    </View>

                    <View style = {globalStyles.flex_Row}>
                    <TextInput
                        style={styles.SmallinputField}
                        placeholder="Birth Weight"
                        placeholderTextColor="#E60965"
                    />
                    <TextInput
                        style={styles.SmallinputField}
                        placeholder="Birthdate"
                        placeholderTextColor="#E60965"
                    />
                    </View>
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Age of Gestation"
                        placeholderTextColor="#E60965"
                    />
                     <TextInput
                        style={styles.BiginputField}
                        placeholder="Medical Condition"
                        placeholderTextColor="#E60965"
                    />
                    
              </View>

              <View style = {globalStyles.center}>

                    <TouchableOpacity style = {styles.AgreebuttonContainer} onPress={() => navigatePage("RequestorMedicalAbstract")}>
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

    title: {
        fontFamily: 'Open-Sans-Bold',
        fontSize: 20,
        color: '#E60965',
        marginVertical: "5%"
    },

    subtitle: {
        fontFamily: 'Open-Sans-Bold',
        fontSize: 20,
        color: '#E60965',
        marginTop: "5%",
        marginBottom: "2%"
    },

    AgreebuttonContainer:{
        backgroundColor: "#E60965",
        paddingHorizontal: 37,
        borderRadius: 20,
        justifyContent: "center",
        paddingVertical: 5,
        marginTop: "-25%"
    },
    

    text: {
        fontFamily: "Open-Sans-Regular",
        fontSize: 15,
        textAlign: "justify",
        marginTop: "5%",
    },

    BiginputField: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#E60965",
        paddingVertical: 5,
        paddingHorizontal: 20,
        width: "90%",
        marginVertical: "1.5%",
        color: "#E60965",
    },

    SmallinputField: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#E60965",
        paddingVertical: 5,
        paddingHorizontal: 20,
        width: "47%",
        marginVertical: "1.5%",
        marginHorizontal: "3%",
        color: "#E60965",
    },

   
  })

  export default RequestorScreeningForm;

  