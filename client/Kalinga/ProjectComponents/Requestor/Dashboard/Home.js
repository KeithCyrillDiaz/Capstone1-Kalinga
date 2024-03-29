//Guest Home
import React from 'react';
import { ScrollView,Text, View, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { globalHeader } from '../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../styles_kit/globalStyles.js';
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';




export default function RequestorHome() {

    const FirstParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    const SecondParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    const ThridParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    const UserName = "Beverly"

    const navigation = useNavigation();
    
    const navigatePage = (Page) => {
        navigation.navigate(Page); // Navigate to the Login screen
        

    };

    return (
      <View style={globalStyles.container}>
        <StatusBar barStyle="dark-content"  backgroundColor="white" />
              <View style = {globalHeader.BigHeader}>
              <Text style = {globalHeader.BigHeaderTitle}>Good Day, {UserName}!</Text>
                  <Text style = {globalHeader.SubTitle}>Discover the power of breastmilk for your baby's health and well-being.</Text>
              </View>

        <ScrollView
        overScrollMode='never' // Disable the over-scroll effect or the Jelly effect when reaching the end of the scroll
        nestedScrollEnabled={true} // Enable nested scrolling
        showsVerticalScrollIndicator={false}
        >
              <View style = {styles.flex_start}>
                <Text style = {styles.title}>Requestor's Dashboard</Text>
              </View>
              <View style = {styles.flex_Row}>
              
                <TouchableOpacity style = {globalStyles.smallBackgroundBox} onPress={() => navigatePage("RequestorTabsExploreAndMilkBank")}>
                    <MaterialIcons name="location-pin" size={70} color="#E60965" />
                    <View style = {styles.LabelCenter}>
                      <Text style = {styles.Label}>Milk Bank Locator</Text>
                      <Text style = {styles.subLabel}>Easily find human milk banks near you</Text>
                    </View>
                </TouchableOpacity>
                
                  <TouchableOpacity style = {globalStyles.smallBackgroundBox}  onPress={() => navigatePage("RequestorEducLibrary")}>
                    <Ionicons name="book" size={70} color="#E60965" />
                    <View style = {styles.LabelCenter}>
                      <Text style = {styles.Label}>Educational Library</Text>
                      <Text style = {styles.subLabel}>Explore our educational articles on breastfeeding and maternal health</Text>
                    </View>
                  </TouchableOpacity>
                

              </View>

              <View style = {styles.flex_Row}>
                <TouchableOpacity style = {globalStyles.smallBackgroundBox} onPress={() => navigatePage("RequestorChatAssistance")}>
                <FontAwesome5 name="robot" size={70} color="#E60965"/>
                  <View style = {styles.LabelCenter}>
                    <Text style = {styles.Label}>Instant Messaging</Text>
                    <Text style = {styles.subLabel}>Chat with our chatbot for quick respond to FAQs </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style = {globalStyles.smallBackgroundBox} onPress={() => navigatePage("RequestorForum")}>
                <MaterialIcons name="forum" size={70} color="#E60965" />
                  <View style = {styles.LabelCenter}>
                    <Text style = {styles.Label}>Forum</Text>
                    <Text style = {styles.ShortLabel}>Engage with user discussions</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style = {styles.flex_Row}>
                <TouchableOpacity style = {globalStyles.smallBackgroundBox} onPress={() => navigatePage("MakeRequest")}>
                <Ionicons name="calendar" size={70} color="#E60965" />
                  <View style = {styles.LabelCenter}>
                    <Text style = {styles.Label}>Make Request</Text>
                    <Text style = {styles.subLabel}>Ready to Request Milk? Set an appointment</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style = {globalStyles.smallBackgroundBox} onPress={() => navigatePage("ApprovedMessageRequest")}>
                  <SimpleLineIcons name="graph" size={70} color="#E60965"s />
                  <View style = {styles.LabelCenter}>
                    <Text style = {styles.Label}>My Request</Text>
                    <Text style = {styles.subLabel}>View Milk Request History</Text>
                  </View>
                </TouchableOpacity>
              </View>
             
              
        </ScrollView>
      </View>
        
      )
  }


  const styles = StyleSheet.create({


    flex_start:{ 
      //backgroundColor: "gray",
      flex: 1,
      marginTop: "5%",
      marginBottom: "1%",
      alignItems: "flex-start",
      justifyContent: "center",
      marginLeft: "3.5%",

    },

    flex_Row: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: "5%",
      marginRight: "5%",
      maxWidth: "90%",
    },

    title: {
      fontFamily: "Open-Sans-Bold",
      fontSize: 20,
      color: "#E60965"
    },

    Label: {
      textAlign: 'center',
      fontSize: 17,
      fontFamily: 'Open-Sans-Bold',
      color: '#E60965',
      //backgroundColor: "gray",
    },

    subLabel: {
      textAlign: 'center',
      fontSize: 13,
      fontFamily: 'Open-Sans-Regular',
      color: '#E60965',
      marginHorizontal: 10, 

      //backgroundColor: "pink",
    },

    LabelCenter: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    ShortLabel:{
      textAlign: 'center',
      fontSize: 13,
      fontFamily: 'Open-Sans-Regular',
      color: '#E60965',
      maxWidth: "100%",
    },

    navBarBorder: {
      backgroundColor: '#E60965',
      height: 90,
      width: '100%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderBottomWidth: 0,
      position: 'absolute',
      bottom: 0,
    },
  
    navBar: {
      flexDirection: 'row',
      justifyContent: 'center', // Center the content horizontally
      alignItems: 'center', // Center the content vertically
      padding: 10,
      marginTop: 5,
    },
    
    navBarButton: {
      justifyContent: 'center',
      marginLeft: 15, // Add space between buttons
      marginRight: 15, // Add space between buttons
    },
  
    iconText: {
      fontSize: 12,
      color: 'white',
      marginTop: 0, 
      marginLeft: 10,
    },


  })
  


