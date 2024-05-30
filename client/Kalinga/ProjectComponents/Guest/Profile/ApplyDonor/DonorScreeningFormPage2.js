//Admin Initial Screening For page2
import React, { useState, useEffect }from 'react';
import { ScrollView,
  Text, 
  View, 
  StatusBar, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  TextInput
} from 'react-native';
import { globalStyles } from "../../../../styles_kit/globalStyles.js";
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const DonorScreeningFormPage2 = ({route}) => {
  const { screeningFormData } = route.params; // Access formData from route.params
  // console.log(screeningFormData)

  const [formData, setFormData] = useState(screeningFormData);
  const [isFormFilled, setIsFormFilled] = useState(false)
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const navigatePage = (Page, data) => {
    checkForm()
    if(!isFormFilled) {
      Alert.alert("Invalid Form", "Please complete the form first")
      return
    }
    navigation.navigate(Page, data);
  };



  const handleOptionSelect = (option) => {
    setSelectedOption(option)
     setFormData({
      ...formData,
      typeOfDonor: option // Update typeOfDonor field
     })
      
  };


  const [medicalAnsweredQuestions, setMedicalAnsweredQuestions] = useState([]);

    const pressOption = (questionId, answer) => {
          const answeredQuestion = { id: questionId, answer: answer,};
          setMedicalAnsweredQuestions(prevState => [...prevState.filter(item => item.id !== questionId), answeredQuestion]);
          setFormData(prevData => ({
            ...prevData,
            [`Q${questionId}`]: answer,
          }));
  };

  const handleChangeText = (name, value) => {
    setFormData(prevData => ({...prevData, 
    [`Q${name}`]: value
    }))
    // setScreeningFormData({ ...screeningFormData, [name]: value });
};

    const renderQuestion = (questionId, questionText) => {

        const isChecked = medicalAnsweredQuestions.find(item => item.id === questionId)?.answer;

    return (
        <View style={[styles.rowAlignment, {marginVertical: 7}]} key={questionId}>
            <TouchableOpacity onPress={() => pressOption(questionId, 'Yes')}>
                <View style={[styles.circle, isChecked === 'Yes' && styles.checkedCircle]}>
                    {isChecked === 'Yes' && <AntDesign name="checkcircle" size={18} color="#E60965" />}
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pressOption(questionId, 'No')}>
                <View style={[styles.circle, isChecked === 'No' && styles.checkedCircle]}>
                    {isChecked === 'No' && <AntDesign name="checkcircle" size={18} color="#E60965" />}
                </View>
            </TouchableOpacity>
            <Text style={styles.question}>{questionText}</Text>
           
          
        </View>

        
    );
  };

  const checkForm = () => {
    let keysToCheck = [
      'QA',
      'QB',
      'Q1',
      'Q2',
      ];

 
      const isFormDataValid = keysToCheck.every(key => formData[key].trim() !== '');
  
      if (isFormDataValid) {
          if(!isFormFilled)console.log('All values until medical condition are valid');
          setIsFormFilled(true)
      } else {
        if(isFormFilled)console.log('Some values until medical condition are empty');
          setIsFormFilled(false)
      }
  }


  useEffect(() => {
    checkForm()
  },[
    formData.QA,
    formData.QB,
    formData.Q1,
    formData.Q2,
  ])
    return (
      <View style={globalStyles.defaultBackgroundColor}>
         <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Apply As Donor</Text>
            </View>

        <ScrollView
        overScrollMode='never' // Disable the over-scroll effect or the Jelly effect when reaching the end of the scroll
        nestedScrollEnabled={true} // Enable nested scrolling
        showsVerticalScrollIndicator={false}
        >
               
               <View style={styles.rectanglesContainer}>
                    <View style={styles.rectangle}></View>
                    <View style={styles.rectangleIndicator}></View>
                    <View style={styles.rectangle}></View>
                    <View style={styles.rectangle}></View>
                    <View style={styles.rectangle}></View>
                </View>
               {/* <View style = {styles.box1}>
                     <Text style = {styles.userType}>Type of Donor</Text>

                     <View style={styles.rowAlignment}>
                        <View style={styles.column}>
                            <TouchableOpacity onPress={() => handleOptionSelect('Community')}>
                                <View style={[styles.row, selectedOption === 'Community' ? styles.selectedOption : null]}>
                                    <AntDesign name={selectedOption === 'Community' ? 'checkcircle' : 'checkcircleo'} size={24} color="#E60965" />
                                    <Text style={styles.text1}>Community</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleOptionSelect('Private')}>
                              <View style={[styles.row, selectedOption === 'Private' ? styles.selectedOption : null]}>
                                    <AntDesign name={selectedOption === 'Private' ? 'checkcircle' : 'checkcircleo'} size={24} color="#E60965" />
                                    <Text style={styles.text1}>Private</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.column}>
                            <TouchableOpacity onPress={() => handleOptionSelect('Employee')}>
                                <View style={[styles.row, selectedOption === 'Employee' ? styles.selectedOption : null]}>
                                    <AntDesign name={selectedOption === 'Employee' ? 'checkcircle' : 'checkcircleo'} size={24} color="#E60965" />
                                    <Text style={styles.text1}>Employee</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleOptionSelect('Network Office / Agency')}>
                            <View style={[styles.row, selectedOption === 'Network Office / Agency' ? styles.selectedOption : null]}>
                                    <AntDesign name={selectedOption === 'Network Office / Agency' ? 'checkcircle' : 'checkcircleo'} size={24} color="#E60965" />
                                    <Text style={styles.text1}>Network Office / Agency</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>


               </View> */}

             
                    

                <View style = {styles.box2}>
                  <Text style = {styles.boxQuestion}>
                      Bakit mo gusto magbigay ng iyong gatas/breastmilk?
                  </Text>

                  <TextInput
                            style={styles.BiginputField}
                            multiline={true}
                            textAlignVertical="top" // Align text to the top vertically
                            onChangeText={(value) => handleChangeText('A', value)}
                        /> 
                </View>

                <View style = {styles.box2}>
                  <Text style = {styles.boxQuestion}>
                    Paano mo nalaman ang tungkol sa BreastMilk Bank ng Quezon City General Hospital?
                  </Text>
                  <TextInput
                      style={styles.BiginputField}
                      multiline={true}
                      textAlignVertical="top"  // Align text to the top vertically
                      onChangeText={(value) => handleChangeText('B', value)}
                  />       
                </View>
                  
               <Text style = {styles.note}> Note: Select your answer by ticking the circle</Text>
                <View style = {styles.form}>
                  <View style = {styles.row}>
                      <Text style = {styles.choices}>Yes</Text>
                      <Text style = {styles.choices}>No</Text>
                  </View>


                    {renderQuestion(1, 'Gusto mo bang magbigay ng gatas nang regular sa loob ng anim (6) na buwan?',"Medical History")}
                    {renderQuestion(2, 'Papayagan ka ba ng iyong asawa na magbigay ng iyong gatas sa Human Milk Bank?', "Medical History")}
                
                </View>


                      <TouchableOpacity style = {[styles.button,
                        {opacity: !isFormFilled ? 0.5 : 1}
                        ]}  
                      onPress={() => navigatePage("DonorMedicalHistory", { screeningFormData: formData })}>
                            <Text style = {styles.buttonTitle}>Next</Text>
                      </TouchableOpacity>
                

        

        </ScrollView>
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

    BiginputField: {
      // marginVertical: 30,
      marginHorizontal: 10,
      color: '#E60965',
      fontFamily: "Open-Sans-SemiBold",
      maxHeight: 80

  },

    title: {
      textAlign: 'center', // Center align the text
      marginTop: 40, // Adjust margin top as needed
      fontSize: 20, // Adjust the font size
      fontWeight: 'bold', // Apply bold font weight
      color: '#E60965',
      marginBottom: 30,
    },

    row: {
      flexDirection: "row",
      // backgroundColor: "pink",
      marginLeft: 10,
    },

    rowAlignment: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        // backgroundColor: "pink",

      },

      rowsAlignment: {
        flexDirection: "row",
        alignItems: "center",
        
      },

      choices: {
        marginLeft: 20,
        marginTop: 10,
        color: "#E60965",
        fontFamily: "Open-Sans-SemiBold"
      },
      rectanglesContainer: {
        flexDirection: "row",
        marginTop: "10%",
        //backgroundColor: "red",
        height: 10,
        justifyContent: "center",
        marginBottom:40
    },

    rectangle: {
      width: 50,
      height: 7, 
      backgroundColor: 'white', // Color for Rectangle F94892
      borderRadius: 10,
      marginHorizontal: 5,
      elevation: 7
    },

    rectangleIndicator: {
      width: 50,
      height: 7, 
      backgroundColor: '#F94892', // Color for Rectangle F94892
      borderRadius: 10,
      marginHorizontal: 5,
      elevation: 7
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
    box: {
      borderColor: '#E60965',
      elevation: 7,
    },

    box1: {
      borderColor: '#E60965',
      height: 100,
      justifyContent: "center",
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 20,
      backgroundColor: "#FFFFFF",
      elevation: 7,
      width: "90%",
      alignSelf: "center"
    },

    box2: {
      alignSelf: "flex-start",
      justifyContent: "flex-start",
      borderColor: '#E60965',
      borderRadius: 10,
      marginBottom: 20,
      // marginHorizontal: 10
      width: "90%",
      paddingVertical: 10,
      height: 150,
      backgroundColor: "#FFFFFF",
      elevation: 7,
      paddingHorizontal: 10,
      alignSelf: "center"
    },

      boxQuestion : {
        color: "#E60965",
        marginBottom: 10,
        width: "95%",
        marginLeft: 7,
        fontFamily: "Open-Sans-SemiBold",
        textAlign: "justify"
      },
  
      question: {
        marginTop: 10,
        color: "#E60965",
        //backgroundColor: "gray",
        width: 230,
        marginLeft: 20,
        fontFamily: "Open-Sans-SemiBold",
        textAlign: "justify"
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

    note: {
        color: '#E60965',
        fontFamily: "Open-Sans-Light",
        marginTop: 40,
        fontSize: 13
      },
      text1: {
        marginBottom: 10,
        marginHorizontal: 10,
        color: '#E60965',
        fontFamily: "Open-Sans-SemiBold"
      },

      userType: {
        color: '#E60965',
        fontFamily: "Open-Sans-SemiBold",
        marginHorizontal: 10,
        fontSize: 15
      },

      questions: {
  
        color: "#E60965",
        textAlign: "left",
        marginTop:10,
        //backgroundColor: "gray",
        alignSelf: "left",
        fontFamily: "Open-Sans-SemiBold"

      },

      form: {
        borderRadius: 10,
        borderColor: '#E60965',
        paddingVertical: 10,
        backgroundColor: "#FFFFFF",
        elevation: 7,
        fontFamily: "Open-Sans-SemiBold",
        width: "90%",
        alignSelf: "center"
      }
   

  })
  
export default DonorScreeningFormPage2;

