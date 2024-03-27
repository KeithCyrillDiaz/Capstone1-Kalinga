//Guest Home
import React from 'react';
import { ScrollView,Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { globalHeader } from '../../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import { useNavigation } from '@react-navigation/native';




const AdminMedicalHistory = () => {
  const navigation = useNavigation();

  const navigatePage = (Page) => {

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
              

            <Text style = {styles.title}>Medical History</Text>
            <Text style = {styles.note}> Note: Select your answer by ticking the circle</Text>


            <ScrollView
            
            style = {styles.form}
            overScrollMode='never' // Disable the over-scroll effect or the Jelly effect when reaching the end of the scroll
            nestedScrollEnabled={true} 
            
            >
                <View style = {styles.row}>
                    <Text style = {styles.choices}>Yes</Text>
                    <Text style = {styles.choices}>No</Text>
                </View>

                <View style = {styles.rowAlignment}>
                  <View style = {styles.row}>
                      <View style = {styles.circle}/>
                      <View style = {styles.circle}/>
                  </View>
                  <Text style = {styles.question}>Nakapagbigay ka na ba ng iyong gatas dati?</Text>

                </View>

                <View style = {styles.rowAlignment}>
                  <View style = {styles.row}>
                      <View style = {styles.circle}/>
                      <View style = {styles.circle}/>
                  </View>
                  <Text style = {styles.question}>Ikaw ba ay natanggihan na magbigay ng iyong gatas/breastmilk? Kung oo, sa anong dahilan?</Text>

                </View>

                <View style = {styles.rowAlignment}>
                  <View style = {styles.row}>
                      <View style = {styles.circle}/>
                      <View style = {styles.circle}/>
                  </View>
                  <Text style = {styles.question}>Normal ba ang panganganak mo sa huli mong anak?</Text>

                </View>

                <View style = {styles.rowAlignment}>
                  <View style = {styles.row}>
                      <View style = {styles.circle}/>
                      <View style = {styles.circle}/>
                  </View>
                  <Text style = {styles.question}>Nagkaroon ka ba ng impeksiyon o sakit? Nagkaroon ka ba ng TB o sakit sa atay?</Text>

                </View>

                <View style = {styles.rowAlignment}>
                  <View style = {styles.row}>
                      <View style = {styles.circle}/>
                      <View style = {styles.circle}/>
                  </View>
                  <Text style = {styles.question}>Ikaw ba ay nasalinan ng dugo nitong nakaaran na 12 na buwan?</Text>

                </View>

                <View style = {styles.rowAlignment}>
                  <View style = {styles.row}>
                      <View style = {styles.circle}/>
                      <View style = {styles.circle}/>
                  </View>
                  <Text style = {styles.question}>Ikaw ba ay naging recipient ng organ o tissue mula sa ibang tao nitong nakaraang 12 na buwan?</Text>

                </View>

                <View style = {styles.rowAlignment}>
                  <View style = {styles.row}>
                      <View style = {styles.circle}/>
                      <View style = {styles.circle}/>
                  </View>
                  <Text style = {styles.question}>Nakainom ka ba ng alak nitong nakaraang 24 oras? Kung oo, gaano karami? </Text>

                </View>

                <View style = {styles.rowAlignment}>
                  <View style = {styles.row}>
                      <View style = {styles.circle}/>
                      <View style = {styles.circle}/>
                  </View>
                  <Text style = {styles.question}>Regular ka bang gumagamit ng mga gamot gaya ng replacement/birth control hormones o pills?</Text>

                </View>

                <View style = {styles.rowAlignment}>
                  <View style = {styles.row}>
                      <View style = {styles.circle}/>
                      <View style = {styles.circle}/>
                  </View>
                  <Text style = {styles.question}>Gumagamit ka ba ng mga “megadose vitamins” o mga “herbal drugs”</Text>

                </View>

                <View style = {styles.rowAlignment}>
                  <View style = {styles.row}>
                      <View style = {styles.circle}/>
                      <View style = {styles.circle}/>
                  </View>
                  <Text style = {styles.question}>Ikaw ba ay hindi kumakain ng karne o isang “vegetarian”?</Text>

                </View>

                <View style = {styles.rowAlignment}>
                  <View style = {styles.row}>
                      <View style = {styles.circle}/>
                      <View style = {styles.circle}/>
                  </View>
                  <Text style = {styles.question}>Kung oo, umiinom ka ba ng multivitamins?</Text>

                </View>

            </ScrollView>

            <TouchableOpacity onPress={() => navigatePage("AdminMedicalHistory2")} >
                <Text style = {styles.button}>Next</Text>
            </TouchableOpacity>
              
        </ScrollView>
      </View>
        
      )
  }


  const styles = StyleSheet.create({

    rectanglesContainer: {
        flexDirection: "row",
        marginTop: "17%",
    },


    title: {
      textAlign: 'center', // Center align the text
      marginTop: 40, // Adjust margin top as needed
      fontSize: 20, // Adjust the font size
      fontWeight: 'bold', // Apply bold font weight
      color: '#E60965'
    },

    note: {
      color: '#E60965',
      fontFamily: "Open-Sans-Light",
      marginTop: 20,
      fontSize: 13
    },
    
    form: {

      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#E60965',
      height: 500,
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
        color: "white",
        marginVertical: 50,
        alignSelf: "center",
        backgroundColor: "#E60965",
        paddingVertical: 5,
        paddingHorizontal: 30,
        fontSize: 15,
        borderRadius: 30,
        fontFamily: "Open-Sans-SemiBold"
    }

   

  })
  
export default AdminMedicalHistory;

