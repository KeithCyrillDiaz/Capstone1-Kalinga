//Guest Home
import React, {useState} from 'react';
import { ScrollView,Text, View, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import { globalHeader } from '../../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AdminMedicalHistory2 = () => {
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
      <View style={globalStyles.container}>
         <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Donor Verification</Text>
            </View>

        <ScrollView
        overScrollMode='never' // Disable the over-scroll effect or the Jelly effect when reaching the end of the scroll
        nestedScrollEnabled={true} // Enable nested scrolling
        showsVerticalScrollIndicator={false}
        >
            
            <View style = {styles.center}>
                    <View style = {styles.row}>
                        <TouchableOpacity>
                            <Text style = {styles.indicatedTabsTitle}>Screening Form</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style = {styles.tabsTitle}>Medical</Text>
                            <Text style = {styles.tabsTitle}>Requirements</Text>
                        </TouchableOpacity>
                    </View> 
               </View>

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
                     <TouchableOpacity style={styles.button} onPress={() => navigatePage("DonorUploadAdmin")}>
                        <Text style={styles.buttonTitle}>Next</Text>
                     </TouchableOpacity>
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
  
export default AdminMedicalHistory2;

