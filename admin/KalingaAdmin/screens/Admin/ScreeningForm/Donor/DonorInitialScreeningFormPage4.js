import React, { useState }from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Feather } from '@expo/vector-icons';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import { AntDesign } from '@expo/vector-icons';
import DonorUploadAdmin from './DonorUploadAdmin.js';


const Tab = createMaterialTopTabNavigator();


const FirstScreen = ({  }) => {
    const navigation = useNavigation();

    const navigatePage = (Page) => {
        navigation.navigate(Page); // Navigate to the Login screen
    }
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

    const renderQuestion = (questionId, questionText, questionType) => {
        let isChecked;
        if (questionType === 'Medical History') {
            isChecked = medicalAnsweredQuestions.find(item => item.id === questionId)?.answer;
        } else {
            isChecked = sexualAnsweredQuestions.find(item => item.id === questionId)?.answer;
        }
    
        return (
            <View style={styles.rowAlignment} key={questionId}>
                <TouchableOpacity onPress={() => pressOption(questionId, 'Yes', questionType)}>
                    <View style={[styles.circle, isChecked === 'Yes' && styles.checkedCircle]}>
                        {isChecked === 'Yes' && <AntDesign name="checkcircle" size={18} color="#E60965" />}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => pressOption(questionId, 'No', questionType)}>
                    <View style={[styles.circle, isChecked === 'No' && styles.checkedCircle]}>
                        {isChecked === 'No' && <AntDesign name="checkcircle" size={18} color="#E60965" />}
                    </View>
                </TouchableOpacity>
                <Text style={styles.question}>{questionText}</Text>
            </View>
        );
    };
   
    return (

        
            <View style={styles.tabContent}>


            <Text style = {styles.title}>Medical History</Text>
            <Text style = {styles.note}> Note: Select your answer by ticking the circle</Text>


            <View style = {styles.form}>
                    <View style = {styles.row}>
                        <Text style = {styles.choices}>Yes</Text>
                        <Text style = {styles.choices}>No</Text>
                    </View>
                    {renderQuestion(12, 'Gumagamit ka ba ng bawal na gamot?',"Medical History")}
                    {renderQuestion(13, 'Ikaw ba ay naninigarilyo? If yes, how many sticks or packs per day?', "Medical History")}
                    {renderQuestion(14, 'Ikaw ba ay naoperahan na sa suso at nalagyan ng “silicone” or “artificial breast implants”?', "Medical History")}
            </View>

            <Text style = {styles.title}>Sexual History</Text>
            <Text style = {styles.note}> Note: Select your answer by ticking the circle</Text>

                    
            <View style = {styles.form2}>
                    <View style = {styles.row}>
                        <Text style = {styles.choices}>Yes</Text>
                        <Text style = {styles.choices}>No</Text>
                    </View>
                    
                    {renderQuestion(1, 'Nagkaroon ka na ba ng mga sakit na nakukuha sa pakikipagtalik/sex?', "Sexual History")}
                    {renderQuestion(2, 'Nagkaroon ka na ba ng karanasang makipagtalik sa higit pa sa isang lalaki?', "Sexual History")}
                   
            </View>
                     
</View>

    );
    

};

const SecondScreen = () => {
    const navigation = useNavigation();

    const navigatePage = (Page) => {
        navigation.navigate(Page); // Navigate to the Login screen
    }
    return (
        <DonorUploadAdmin></DonorUploadAdmin>
    );
};

const DonorInitialScreeningFormPage4 = () => {
    const navigation = useNavigation();

    
  

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Donor Verification</Text>
            </View>

            <Tab.Navigator
                tabBarOptions={{
                    labelStyle: {
                        fontSize: 16,
                        fontWeight: 'bold',
                    },
                    style: {
                        backgroundColor: '#FFF8EB',
                    },
                    indicatorStyle: {
                        backgroundColor: '#E60965',
                    },
                }}
            >
                <Tab.Screen name="Screening Form" component={FirstScreen} />
                <Tab.Screen name="Medical Requirements" component={SecondScreen} />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center"
    },
  

    header: {
        backgroundColor: '#E60965',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 30,
        alignItems: 'center',
        marginTop: 30,
        paddingVertical: 20
    },
    headerTitle: {
        fontFamily: 'Kurale-Regular',
        fontSize: 20,
        color: 'white',
        justifyContent: "center",
    },
    tabContent: {
        alignItems: 'center',
        backgroundColor: '#FFF8EB',
        height: "100%"
    },
    
    center: {
        //backgroundColor: "gray",
        alignItems: "center",
        marginTop: "5%"
    },
  
    tabsTitle: {
     
        color: "#E60965",
        fontFamily: "Open-Sans-Bold",
        fontSize: 20,
        marginHorizontal: 30,
        width: 120,
        textAlign: "center",
  
    },
  
    indicatedTabsTitle:{
  
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
  
  
      button: {
          backgroundColor: "#E60965",
          width: 100,
          alignSelf: "center",
          marginVertical: 30,
          paddingVertical: 7,
          borderRadius: 30,
        },
    
        buttonTitle: {
          color: "#FFFFFF",
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
        backgroundColor: 'white'
      },
  
      form2: {
  
          borderWidth: 1,
          borderRadius: 10,
          borderColor: '#E60965',
          height: 170,
          paddingRight: 10,
          marginBottom: 10,
          backgroundColor: 'white'

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


export default DonorInitialScreeningFormPage4 ;