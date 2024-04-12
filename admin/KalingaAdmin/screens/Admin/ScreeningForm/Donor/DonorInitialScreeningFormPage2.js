import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute hook
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AntDesign } from '@expo/vector-icons';
import DonorUploadAdmin from './DonorUploadAdmin.js'
import axios from 'axios'; // Import axios for making HTTP requests
import { BASED_URL } from '../../../../../../Constant.js';


const Tab = createMaterialTopTabNavigator();

const FirstScreen = ({route}) => {
  const Applicant_ID= route.params.screeningFormId.Applicant_ID

    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        TypeOfDonor: '',
        QA: '',
        QB: '',
        Q1: '',
    });
    const [selectedOption, setSelectedOption] = useState(null); // State to store the selected option

    useState([]);

    const handleOptionSelect = (option) => {
      // Allow selection only if no option is selected
      if (!selectedOption) {
          setSelectedOption(option);
          setFormData({
              ...formData,
              TypeOfDonor: option,
          });
      }
    };
    useEffect(() => {
      fetchData(); // Fetch data when component mounts
  }, []);


    const fetchData = async () => {
      try {
          const response = await axios.get(`${BASED_URL}/kalinga/getScreeningFormsApplicant_ID/${Applicant_ID}`);
          const data = response.data.screeningForms; // Assuming you expect only one record
      setFormData((prevState) => ({
        ...prevState,

        QA: data.QA,
        QB: data.QB,
        Q1: data.Q1,
        Q2: data.Q2
      }));
      setSelectedOption(data.TypeOfDonor);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
};

const handleViewPress = (Applicant_ID) =>{
  navigation.navigate('DonorInitialScreeningFormPage3',{Applicant_ID});
}

    const navigatePage = (Page) => {
        navigation.navigate(Page); // Navigate to the specified screen
    };

    const renderQuestion = (questionId, questionText) => {
      const isCheckedYes = formData[questionId] === 'Yes'; // Check if the answer is 'Yes'
      const isCheckedNo = formData[questionId] === 'No'; // Check if the answer is 'No'
    
      return (
        <View style={styles.rowAlignment} key={questionId}>
          <TouchableOpacity onPress={() => pressOption(questionId, 'Yes')}>
            <View style={[styles.circle, isCheckedYes && styles.checkedCircle]}>
              {isCheckedYes && <AntDesign name="checkcircle" size={18} color="#E60965" />}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pressOption(questionId, 'No')}>
            <View style={[styles.circle, isCheckedNo && styles.checkedCircle]}>
              {isCheckedNo && <AntDesign name="checkcircle" size={18} color="#E60965" />}
            </View>
          </TouchableOpacity>
          <Text style={styles.question}>{questionText}</Text>
        </View>
      );
    };
    
    
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.tabContent}>
                <Text style = {styles.note}> Note: Select your answer by ticking the circle</Text>

                    <View style = {styles.box1}>
                        <Text style = {styles.userType}>Type of Donor</Text>

                      <View style={styles.rowAlignment}>
                        <View style={styles.column}>
                              <TouchableOpacity onPress={() => handleOptionSelect('Community')}>
                                  <View style={[styles.row, selectedOption === 'Community' ? styles.selectedOptionText  : null]}>
                                      <AntDesign name={selectedOption === 'Community' ? 'checkcircle' : 'checkcircleo'} size={24} color="#E60965" />
                                      <Text style={styles.text1}>Community</Text>
                                  </View>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => handleOptionSelect('Private')}>
                                <View style={[styles.row, selectedOption === 'Private' ? styles.selectedOptionText  : null]}>
                                      <AntDesign name={selectedOption === 'Private' ? 'checkcircle' : 'checkcircleo'} size={24} color="#E60965" />
                                      <Text style={styles.text1}>Private</Text>
                                  </View>
                              </TouchableOpacity>
                          </View>
                          <View style={styles.column}>
                              <TouchableOpacity onPress={() => handleOptionSelect('Employee')}>
                                  <View style={[styles.row, selectedOption === 'Employee' ? styles.selectedOptionText  : null]}>
                                      <AntDesign name={selectedOption === 'Employee' ? 'checkcircle' : 'checkcircleo'} size={24} color="#E60965" />
                                      <Text style={styles.text1}>Employee</Text>
                                  </View>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => handleOptionSelect('Network Office / Agency')}>
                              <View style={[styles.row, selectedOption === 'Network Office / Agency' ? styles.selectedOptionText  : null]}>
                                      <AntDesign name={selectedOption === 'Network Office / Agency' ? 'checkcircle' : 'checkcircleo'} size={24} color="#E60965" />
                                      <Text style={styles.text1}>Network Office / Agency</Text>
                                  </View>
                              </TouchableOpacity>
                          </View>
                          
                    </View>
                    </View>

                <View style={styles.box2}>
                    <Text style={styles.boxQuestion}>Bakit mo gusto magbigay ng iyong gatas/breastmilk?</Text>
                    <TextInput
                        style={styles.BiginputField}
                        multiline={true}
                        textAlignVertical="top" // Align text to the top vertically
                        value={formData.QA}
                    />
                </View>
                <View style={styles.box2}>
                    <Text style={styles.boxQuestion}>Paano mo nalaman ang tungkol sa (Name ng Client’s Milk Bank)?</Text>
                    <TextInput
                        style={styles.BiginputField}
                        multiline={true}
                        textAlignVertical="top" // Align text to the top vertically
                        value={formData.QB}
                    />
                </View>
                
            <View style={styles.form}>
            <View style={styles.row}>
                <Text style={styles.choices}>Yes</Text>
                <Text style={styles.choices}>No</Text>
            </View>
                {renderQuestion('Q1', 'Nakapagbigay ka na ba ng iyong gatas dati?')}
                {renderQuestion('Q2', 'Ikaw ba ay natanggihan na magbigay ng iyong gatas/breastmilk?')}
                </View>
                <TouchableOpacity style={styles.button} onPress={() => handleViewPress(Applicant_ID)}>
                    <Text style={styles.buttonTitle}>Next</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const SecondScreen = () => {
  const route = useRoute()
    const navigation = useNavigation();

    const navigatePage = (Page) => {
        navigation.navigate(Page); // Navigate to the Login screen
    };

    return (
      <DonorUploadAdmin route ={route}/>
  );
};

const DonorInitialScreeningFormPage2 = ({route}) => {
  const screeningFormId = route.params

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
                <Tab.Screen name="Screening Form" component={FirstScreen} initialParams = {{screeningFormId}} />
                <Tab.Screen name="Medical Requirements" component={SecondScreen} initialParams = {{screeningFormId}} />
            </Tab.Navigator>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent:"center"
  },
  Medicalcontainer:{
      flex: 1,
      backgroundColor: '#FFF8EB',
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
      fontFamily: 'Kurale',
      fontSize: 20,
      color: 'white',
      justifyContent: "center",
  },
  menuIcon: {
      marginLeft: 20,
      marginRight: 20,
  },
  tabContent: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#FFF8EB',
  },
  container: {
      flex: 1,
      backgroundColor: '#FFF8EB',
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

  BiginputField: {
    width: "100%",
    // marginVertical: 30,
    //backgroundColor: "gray"
    paddingHorizontal: 20,
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

  circle: {

    borderWidth: 1,
    height: 20,
    width: 20,
    marginLeft: 20,
    marginTop: 10,
    borderRadius: 20,
    borderColor: "#E60965",
  },

    boxQuestion : {
      color: "#E60965",
      //backgroundColor: "gray",
      width: 330,
      alignSelf:"center",
      marginLeft: 20,
      fontSize: 15,
      marginBottom: 20,

    },

    question: {
      marginTop: 10,
      color: "#E60965",
      //backgroundColor: "gray",
      width: 230,
      marginLeft: 20,
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

    box: {
      borderColor: '#E60965',
      borderWidth: 1,
    },

    box1: {
      borderColor: '#E60965',
      borderWidth: 1,
      height: 100,
      justifyContent: "center",
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 20,
      backgroundColor: "#FFFFFF",
      width: '90%',

    },

    box2: {
      //backgroundColor: "red",
      alignSelf: "center",
      justifyContent: "flex-start",
      borderColor: '#E60965',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 20,
      // marginHorizontal: 10
      width: '90%',
      paddingVertical: 10,
      height: 150,
      backgroundColor: "#FFFFFF"
    },

    box3: {
      borderColor: '#E60965',
      width: '90%',

  
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

    },

    form: {
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#E60965',
      paddingVertical: 10,
      backgroundColor: "#FFFFFF",
      width: '90%',
      
    },
    optionText: {
      color: '#E60965',
      fontFamily: 'Open-Sans-SemiBold',
      fontSize: 16,
      marginBottom: 10,
  },
  selectedOptionText: {
      color: '#E60965',
      fontFamily: 'Open-Sans-SemiBold',
      fontSize: 16,
      marginBottom: 10,
      textDecorationLine: 'underline', 
  },  
 

})


export default DonorInitialScreeningFormPage2;