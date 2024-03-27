//Guest Home
import React, { useState } from 'react';
import { ScrollView,Text, View, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import { globalStyles } from "../../../../styles_kit/globalStyles.js";
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MedicalHistoryPage2 from './DonorMedicalHistory2.js'

const DonorMedicalHistory = () => {

  const navigation = useNavigation();

  const navigatePage = (Page) => {
    // Navigate to the next screen by route name
    navigation.navigate(Page);
  };
    const UserName = "Rogine"

    const [medicalAnsweredQuestions, setMedicalAnsweredQuestions] = useState([]);

    const pressOption = (questionId, answer, questionType) => {
 
        const answeredQuestion = { id: questionId, answer: answer, type: questionType};
        setMedicalAnsweredQuestions(prevState => [...prevState.filter(item => item.id !== questionId), answeredQuestion]);
    };

    const renderQuestion = (questionId, questionText, questionType) => {

          const isChecked = medicalAnsweredQuestions.find(item => item.id === questionId)?.answer;

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
              <Text style = {globalHeader.SmallHeaderTitle}>Apply as Donor</Text>
            </View>

        <ScrollView
        overScrollMode='never' // Disable the over-scroll effect or the Jelly effect when reaching the end of the scroll
        nestedScrollEnabled={true} // Enable nested scrolling
        showsVerticalScrollIndicator={false}
        >
            <View style={styles.rectanglesContainer}>
                <View style={styles.rectangle}></View>
                <View style={styles.rectangle}></View>
                <View style={styles.rectangleIndicator}></View>
                <View style={styles.rectangle}></View>
                <View style={styles.rectangle}></View>
            </View>


            <Text style = {styles.title}>Medical History</Text>
            <Text style = {styles.note}> Note: Select your answer by ticking the circle</Text>


            <ScrollView
            
            style = {styles.form}
            overScrollMode='never' // Disable the over-scroll effect or the Jelly effect when reaching the end of the scroll
            nestedScrollEnabled={true} 
            showsVerticalScrollIndicator={false}
            >
                
                <View style = {styles.row}>
                    <Text style = {styles.choices}>Yes</Text>
                    <Text style = {styles.choices}>No</Text>
                </View>

                    {renderQuestion(1, 'Nakapagbigay ka na ba ng iyong gatas dati?',"Medical History")}
                    {renderQuestion(2, 'Ikaw ba ay natanggihan na magbigay ng iyong gatas/breastmilk? Kung oo, sa anong dahilan?', "Medical History")}
                    {renderQuestion(3, 'Normal ba ang panganganak mo sa huli mong anak?”?', "Medical History")}
                    {renderQuestion(4, 'Nagkaroon ka ba ng impeksiyon o sakit? Nagkaroon ka ba ng TB o sakit sa atay?',"Medical History")}
                    {renderQuestion(5, 'Ikaw ba ay nasalinan ng dugo nitong nakaaran na 12 na buwan?', "Medical History")}
                    {renderQuestion(6, 'Ikaw ba ay naging recipient ng organ o tissue mula sa ibang tao nitong nakaraang 12 na buwan?', "Medical History")}
                    {renderQuestion(7, 'Nakainom ka ba ng alak nitong nakaraang 24 oras? Kung oo, gaano karami? ',"Medical History")}
                    {renderQuestion(8, 'Regular ka bang gumagamit ng mga gamot gaya ng replacement/birth control hormones o pills?', "Medical History")}
                    {renderQuestion(9, 'Gumagamit ka ba ng mga “megadose vitamins” o mga “herbal drugs”?', "Medical History")}
                    {renderQuestion(10, 'Ikaw ba ay hindi kumakain ng karne o isang “vegetarian”?',"Medical History")}
                    {renderQuestion(11, 'Kung oo, umiinom ka ba ng multivitamins?', "Medical History")}
                    
                    <View style = {styles.space}></View>
            </ScrollView>
        </ScrollView>

                      {/*MedicalHistory2.js*/}
                     <TouchableOpacity style={styles.button} onPress={() => navigatePage("DonorMedicalHistory2")}>
                        <Text style={styles.buttonTitle}>Next</Text>
                     </TouchableOpacity>
      </View>
        
      )
  }


  const styles = StyleSheet.create({
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
      color: '#E60965'
    },

    note: {
      color: '#E60965',
      fontFamily: "Open-Sans-Light",
      marginTop: 20,
      marginBottom: 10,
      fontSize: 13
    },
    
    form: {

      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#E60965',
      height: 500,
    },

    space: {
      marginVertical: 20
    },


    row: {
      flexDirection: "row"
    },

    rowAlignment: {
      flexDirection: "row",
      alignItems: "center"
    },

    choices: {
      marginLeft: 30,
      marginTop: 10,
      color: "#E60965",
    },

    circle: {

      borderWidth: 1,
      height: 20,
      width: 20,
      marginLeft: 30,
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
  
export default DonorMedicalHistory;

