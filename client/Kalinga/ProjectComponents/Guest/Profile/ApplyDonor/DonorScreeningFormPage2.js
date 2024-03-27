//Admin Initial Screening For page2
import React from 'react';
import { ScrollView,Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { globalStyles } from "../../../../styles_kit/globalStyles.js";
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const DonorScreeningFormPage2 = () => {
  
  const navigation = useNavigation();

  const navigatePage = (Page) => {
    // Navigate to the next screen by route name
    navigation.navigate(Page);
  };


    const FirstParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    const SecondParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    const ThridParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    const UserName = "Rogine"


    return (
      <View style={globalStyles.container}>
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

               <Text style = {styles.note}> Note: Select your answer by ticking the circle</Text>

               <View style = {styles.box1}>
                     <Text style = {styles.userType}>Type of Donor</Text>

                    <View style = {styles.rowAlignment}>
                      
                        <View style = {styles.column}>
                            <View style = {styles.row}>
                                <AntDesign name="checkcircle" size={24} color="#E60965" />
                                <Text style = {styles.text1}>Community</Text>
                            </View>
                            <View style = {styles.row}>
                                <View style = {styles.circle}></View>
                                <Text style = {styles.text1}>Private</Text>
                            </View>

                        </View>
                        <View style = {styles.column}>
                            <View style = {styles.row}>
                            <View style = {styles.circle}></View>
                                <Text style = {styles.text1}>Community</Text>
                            </View>
                              <View style = {styles.row}>
                            <View style = {styles.circle}></View>
                                <Text style = {styles.text1}>Network Office / Agency</Text>
                            </View>

                        </View>
                       
                    </View>

               </View>

             
                    

                <View style = {styles.box2}>
                    
                      <View>
                        <Text style = {styles.boxQuestion}>
                            Bakit mo gusto magbigay ng iyong gatas/breastmilk?
                        </Text>
                      </View>

                        <TextInput
                                  style={styles.BiginputField}
                                  multiline={true}
                                  textAlignVertical="top" // Align text to the top vertically
                              /> 
                        
                </View>

                <View style = {styles.box2}>
                    
                      <View>
                        <Text style = {styles.boxQuestion}>
                          Paano mo nalaman ang tungkol sa (Name ng Client’s Milk Bank) ?
                        </Text>
                      </View>

                        <TextInput
                                  style={styles.BiginputField}
                                  multiline={true}
                                  textAlignVertical="top"  // Align text to the top vertically
                              /> 
                        
                </View>
                  
                <View style = {styles.form}>
                  <View style = {styles.row}>
                      <Text style = {styles.choices}>Yes</Text>
                      <Text style = {styles.choices}>No</Text>
                  </View>


                  <View style = {styles.rowsAlignment}>
                      <View style = {styles.row}>
                          <View style = {styles.circles}/>
                          <View style = {styles.circles}/>
                      </View>
                      <Text style = {styles.question}>Gusto mo bang magbigay ng gatas nang regular sa loob ng anim (6) na buwan? </Text>

                  </View>
                  <View style = {styles.rowsAlignment}>
                      <View style = {styles.row}>
                          <View style = {styles.circles}/>
                          <View style = {styles.circles}/>
                      </View>
                      <Text style = {styles.question}>Papayagan ka ba ng iyong asawa na magbigay ng iyong gatas sa Human Milk Bank?</Text>

                  </View>
                </View>


                      <TouchableOpacity style = {styles.button}  onPress={() => navigatePage("DonorMedicalHistory")}>
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
      flexDirection: "row"
    },

    rowAlignment: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginLeft: 20,

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

      circles: {
  
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
        marginLeft: 20,
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
      },

      box2: {
        //backgroundColor: "red",
        alignSelf: "flex-start",
        justifyContent: "flex-start",
        borderColor: '#E60965',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        // marginHorizontal: 10
        width: "100%",
        paddingVertical: 10,
        height: 150,
      },

      box3: {
        borderColor: '#E60965',
    
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

      circle: {

        borderWidth: 2,
        height: 24,
        width: 24,
        borderRadius: 20,
        borderColor: "#E60965",
      },


      questions: {
  
        color: "#E60965",
        textAlign: "left",
        marginTop:10,
        //backgroundColor: "gray",
        alignSelf: "left"

      },

      form: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E60965',
        paddingVertical: 10
      }
   

  })
  
export default DonorScreeningFormPage2;

