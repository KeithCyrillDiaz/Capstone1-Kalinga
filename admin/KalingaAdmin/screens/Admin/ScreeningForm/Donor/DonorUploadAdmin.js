//Guest Home
import React, {useState} from 'react';
import { ScrollView,Text, View, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import { globalHeader } from '../../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DonorUploadAdmin = () => {
    const navigation = useNavigation();

    const navigatePage = (Page) => {

      navigation.navigate(Page);
    };

    const [medicalAnsweredQuestions, setMedicalAnsweredQuestions] = useState([]);
    const [sexualAnsweredQuestions, setSexualAnsweredQuestions] = useState([]);


    const pressOption = (questionId, answer, questionType) => {
        if(questionType === "Medical History")
        {
            const answeredQuestion = { id: questionId, answer: answer, type: questionType };
            setMedicalAnsweredQuestions(prevState => [...prevState.filter(item => item.id !== questionId), answeredQuestion]);
        } else {

            const answeredQuestion = { id: questionId, answer: answer, type: questionType };
            setSexualAnsweredQuestions(prevState => [...prevState.filter(item => item.id !== questionId), answeredQuestion]);
        }

    };
    
    const UserName = "Rogine"

    
   
    return (
      <View style={globalStyles.container}>
        <ScrollView
        overScrollMode='never' // Disable the over-scroll effect or the Jelly effect when reaching the end of the scroll
        nestedScrollEnabled={true} // Enable nested scrolling
        showsVerticalScrollIndicator={false}
        >

               <View style ={styles.UploadContainer}>
                    <TouchableOpacity style={styles.Uploadbutton} onPress={() => navigatePage("")}>
                            <Text style={styles.UploadbuttonTitle}>Hepa B Test Result</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Uploadbutton} onPress={() => navigatePage("")}>
                        <Text style={styles.UploadbuttonTitle}>HIV 1 & 2 Test Result </Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.Uploadbutton} onPress={() => navigatePage("")}>
                        <Text style={styles.UploadbuttonTitle}>Syphillis Test Result</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.Uploadbutton} onPress={() => navigatePage("")}>
                        <Text style={styles.UploadbuttonTitle}>Pregnancy Booklet</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.Uploadbutton} onPress={() => navigatePage("")}>
                        <Text style={styles.UploadbuttonTitle}>Government ID </Text>
                     </TouchableOpacity>
               </View>

            <View style ={styles.ButtonContainer}>
                    <TouchableOpacity style={styles.Approvedbutton} onPress={() => navigatePage("")}>
                        <Text style={styles.ApprovedbuttonTitle}>Approved</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.Declinebutton} onPress={() => navigatePage("")}>
                        <Text style={styles.DeclinebuttonTitle}>Decline</Text>
                     </TouchableOpacity>
            </View>
                     
        </ScrollView>
      </View>
        
      )
  }


  const styles = StyleSheet.create({

    center: {
      //backgroundColor: "gray",
      alignItems: "center",
      marginTop: "5%"
  },

  tabsTitle: {
   
      color: "#E60965",
      fontFamily: "Open-Sans-Bold",
      fontSize: 20,
      marginHorizontal: 20,
      width: 120,
      textAlign: "center",

  },
  UploadContainer:{
    justifyContent: "center",
    paddingTop: 50
  },

  Uploadbutton: {
    backgroundColor: "white",
    width: 250,
    height: 40,
    alignSelf: "center",
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "#E60965",
    borderWidth: 1
  },

  UploadbuttonTitle: {
    color: "#E60965",
    textAlign: "center",
    fontSize: 15,
    fontFamily: "Open-Sans-SemiBold",
  },

  indicatedTabsTitle:{

      color: "#E60965",
      fontFamily: "Open-Sans-Bold",
      fontSize: 20,
      marginHorizontal: 30,
      width: 100,
      textAlign: "center",
      paddingBottom: 10,
      

  },

  
  indicatedTabsTitle2:{

    color: "#E60965",
    fontFamily: "Open-Sans-Bold",
    fontSize: 20,
    marginHorizontal: 30,
    width: 100,
    textAlign: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#E60965",

},

ButtonContainer:{
    flexDirection: "row",
    justifyContent: "space-evenly",
 

},
    Approvedbutton: {
        backgroundColor: "#E60965",
        width: 100,
        alignSelf: "center",
        marginVertical: 30,
        paddingVertical: 7,
        borderRadius: 30,
      },
  
      ApprovedbuttonTitle: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 15,
        fontFamily: "Open-Sans-SemiBold",
      },

      Declinebutton: {
        backgroundColor: "white",
        width: 100,
        alignSelf: "center",
        marginVertical: 30,
        paddingVertical: 7,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#E60965"
      },
  
      DeclinebuttonTitle: {
        color: "#E60965",
        textAlign: "center",
        fontSize: 15,
        fontFamily: "Open-Sans-SemiBold",
      },

    rectanglesContainer: {
        flexDirection: "row",
        marginTop: "10%",
        //backgroundColor: "red",
        height: 10,
        justifyContent: "center"
    },

    rectangle: {
      width: 50,
      height: 4, 
      backgroundColor: '#FFEECC', // Color for Rectangle F94892
      borderRadius: 10,
      marginHorizontal: 5,
    },

    rectangleIndicator: {
      width: 50,
      height: 4, 
      backgroundColor: '#F94892', // Color for Rectangle F94892
      borderRadius: 10,
      marginHorizontal: 5,
    },

    title: {
      textAlign: 'center', // Center align the text
      marginTop: 20, // Adjust margin top as needed
      fontSize: 20, // Adjust the font size
      fontWeight: 'bold', // Apply bold font weight
      color: '#E60965',
      marginBottom: 20
    },

    note: {
      color: '#E60965',
      fontFamily: "Open-Sans-Light",
      marginBottom: 10,
      fontSize: 13
    },
    
    form: {

      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#E60965',
      height: 210,
      paddingRight: 10,
      marginBottom: 10,
    },

    form2: {

        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E60965',
        height: 170,
        paddingRight: 10,
        marginBottom: 10,
      },

    row: {
      flexDirection: "row"
    },

    rowAlignment: {
      flexDirection: "row",
      alignItems: "center"
    },

    choices: {
      marginLeft: 20,
      marginTop: 10,
      color: "#E60965",
    },

    circle: {

      borderWidth: 1,
      height: 20,
      width: 20,
      marginLeft: 20,
      marginTop: 10,
      borderRadius: 20,
      borderColor: "#E60965",
    },

    question: {
      marginTop: 10,
      color: "#E60965",
      //backgroundColor: "gray",
      width: 220,
      marginLeft: 20,
    }

   

  })
  
export default DonorUploadAdmin;

