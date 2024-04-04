//Admin Initial Screening For page2
import React from 'react';
import { ScrollView,Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { globalHeader } from '../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../styles_kit/globalStyles.js';
import { AntDesign } from '@expo/vector-icons';



const ScreeningForm = () => {

    const FirstParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    const SecondParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    const ThridParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    const UserName = "Rogine"


    return (
      <View style={globalStyles.container}>
         <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Donor Verification</Text>
            </View>

        <ScrollView
        overScrollMode='never' // Disable the over-scroll effect or the Jelly effect when reaching the end of the scroll
        nestedScrollEnabled={true} // Enable nested scrolling
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
                      <Text style = {styles.questions}>
                          Bakit mo gusto magbigay ng iyong gatas/breastmilk?
                       </Text>
                    </View>

                      <TextInput
                                style={styles.BiginputField}
                                multiline={true}
                                textAlignVertical="center" // Align text to the top vertically
                            /> 
                      
               </View>

               <View >
                  
                  <View style = {styles.box2}>
                    <Text style = {styles.questions}>
                        Paano mo nalaman ang tungkol sa (Name ng Client’s Milk Bank) ? 
                     </Text>
                  </View>

                    <TextInput
                              style={styles.BiginputField}
                              multiline={true}
                              textAlignVertical="top" // Align text to the top vertically
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
                      <Text style = {styles.question}>Paano mo nalaman ang tungkol sa (Name ng Client’s Milk Bank) ? </Text>

                  </View>
                </View>
                

        

        </ScrollView>
      </View>
        
      )
  }


  const styles = StyleSheet.create({

    BiginputField: {
      width: "100%",
      marginVertical: 30,
      //backgroundColor: "gray"
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
        borderWidth: 1,
      },

      choices: {
        marginLeft: 30,
        marginTop: 10,
        color: "#E60965",
      },
  
      circles: {
  
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

        borderColor: '#E60965',
        borderWidth: 1,
        height: 100,
        justifyContent: "center",
        borderRadius: 10,
        marginBottom: 20,
        padding: 20,
        width: 350,
        alignSelf: "center",
        paddingHorizontal: 10,
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
        textAlign: "center",
        marginTop:10,
        //backgroundColor: "gray",
        alignSelf: "left"

      },

      form: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E60965',
        height: 500,
      }
   

  })
  
export default ScreeningForm;

