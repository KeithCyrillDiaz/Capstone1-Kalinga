import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute hook
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AntDesign } from '@expo/vector-icons';
import DonorUploadAdmin from './DonorUploadAdmin.js';
import axios from 'axios'; // Import axios for making HTTP requests
import { BASED_URL } from '../../../../MyConstants.js';


const Tab = createMaterialTopTabNavigator();


const FirstScreen = ({ route}) => {
  const Applicant_ID= route.params.screeningFormId.Applicant_ID

    const navigation = useNavigation();

   
    const [formData, setFormData] = useState({
        MH1:'',
        MH2:'',
        MH3:'',
        MH4:'',
        MH5:'',
        MH6:'',
        MH7:'',
        MH8:'',
        MH9:'',
        MH10:'',
        MH11:'',
    });

    const navigatePage = (Page) => {
        navigation.navigate(Page); // Navigate to the Login screen
    }
    useEffect(() => {
      fetchData(); // Fetch data when component mounts
  }, []);
  const fetchData = async () => {
    try {
        const response = await axios.get(`${BASED_URL}/kalinga/getScreeningFormsApplicant_ID/${Applicant_ID}`);
        const data = response.data.screeningForms; // Assuming you expect only one record
      // Set the fetched data to the state
      setFormData((prevState) => ({
        ...prevState,
            MH1: data.MH1,
            MH2: data.MH2,
            MH3: data.MH3,
            MH4: data.MH4,
            MH5: data.MH5,
            MH6: data.MH6,
            MH7: data.MH7,
            MH8: data.MH8,
            MH9: data.MH9,
            MH10: data.M10,
            MH11: data.MH11,
      }));
      setSelectedOption(data.TypeOfDonor);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
};


const handleViewPress = (Applicant_ID) =>{
  navigation.navigate('DonorInitialScreeningFormPage4',{Applicant_ID});
}



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

                    {renderQuestion('MH1', 'Nakapagbigay ka na ba ng iyong gatas dati?',"Medical History")}
                    {renderQuestion('MH2', 'Ikaw ba ay natanggihan na magbigay ng iyong gatas/breastmilk? Kung oo, sa anong dahilan?', "Medical History")}
                    {renderQuestion('MH3', 'Normal ba ang panganganak mo sa huli mong anak?”?', "Medical History")}
                    {renderQuestion('MH4', 'Nagkaroon ka ba ng impeksiyon o sakit? Nagkaroon ka ba ng TB o sakit sa atay?',"Medical History")}
                    {renderQuestion('MH5', 'Ikaw ba ay nasalinan ng dugo nitong nakaaran na 12 na buwan?', "Medical History")}
                    {renderQuestion('MH6', 'Ikaw ba ay naging recipient ng organ o tissue mula sa ibang tao nitong nakaraang 12 na buwan?', "Medical History")}
                    {renderQuestion('MH7', 'Nakainom ka ba ng alak nitong nakaraang 24 oras? Kung oo, gaano karami? ',"Medical History")}
                    {renderQuestion('MH8', 'Regular ka bang gumagamit ng mga gamot gaya ng replacement/birth control hormones o pills?', "Medical History")}
                    {renderQuestion('MH9', 'Gumagamit ka ba ng mga “megadose vitamins” o mga “herbal drugs”?', "Medical History")}
                    {renderQuestion('MH10', 'Ikaw ba ay hindi kumakain ng karne o isang “vegetarian”?',"Medical History")}
                    {renderQuestion('MH11', 'Kung oo, umiinom ka ba ng multivitamins?', "Medical History")}
                    
                    <View style = {styles.space}></View>
            </ScrollView>
      

                      {/*MedicalHistory2.js*/}
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
    }
    return (
      <DonorUploadAdmin route ={route}/>
  );
};

const DonorInitialScreeningFormPage3 = ({route}) => {
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
    tabContent: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF8EB',
    },
    
    center:{
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
        backgroundColor: "#FFFFFF"
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


export default DonorInitialScreeningFormPage3;