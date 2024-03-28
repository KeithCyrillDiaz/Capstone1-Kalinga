//Guest Home
import React from 'react';
import { ScrollView,Text, View, StatusBar, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalHeader } from '../../../styles_kit/globalHeader.js';

import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';





const DonorProfile = () => {


    const UserName = "Rogine"
    const navigation = useNavigation();

    const navigatePage = (Page) => {
      navigation.navigate(Page); // Navigate to the Login screen
    }

    return (
        
        <SafeAreaView style = {styles.safeArea}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Profile</Text>
            </View>

        <ScrollView
        overScrollMode='never' // Disable the over-scroll effect or the Jelly effect when reaching the end of the scroll
        nestedScrollEnabled={true} // Enable nested scrolling
        >
                <View style={styles.container}>
                  <View style = {styles.profileContainer}>
                    <View style = {styles.row}>
                      <View style = {styles.profilePic}>
                        <FontAwesome name="user-circle-o" size={200} color="#E60965" />
                      </View>
                      <View>
                        <MaterialIcons name="verified" size={24} color="#E60965" />
                      </View>
                     
                    </View>

                    <Text style = {styles.name}>Rogine Cubelo</Text>
                    <Text style = {styles.userType}>Donor</Text>

                  </View>

                  <View style = {styles.box}>
                    
                      <TouchableOpacity  onPress={() => navigatePage("DonorSavedArticles")}>
                        <View style = {styles.rowBox}>
                          <View style = {styles.rowMenu}>
                            <FontAwesome5 style = {styles.iconBookmark} name="bookmark" size={30} color="#E60965" />
                            <Text style = {styles.mediumText}>
                              Saved Articles
                            </Text>
                          </View>
                          <Entypo name="chevron-right" size={30} color="#E60965" />
              
                        </View>
                      </TouchableOpacity>
                       
                 
                  <TouchableOpacity>
                      <View style = {styles.rowBox}>
                          <View style = {styles.rowMenu}>
                            <MaterialCommunityIcons style = {styles.iconBabyBottle} name="baby-bottle-outline" size={38} color="#E60965"/>
                            <Text style = {styles.longText}>
                              Saved Milk Banks
                            </Text>
                          </View>
                       
                          <Entypo name="chevron-right" size={30} color="#E60965" />
                      </View>

                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => navigatePage("DonorSettingScreen")}>
                      <View style = {styles.rowBox}>
                            <View style = {styles.rowMenu}>
                              <Octicons style = {styles.icon} name="gear" size={30} color="#E60965" />
                              <Text style = {styles.text}>
                                Settings
                              </Text>
                            </View>
                          
                            <Entypo name="chevron-right" size={30} color="#E60965" />
                      </View>
                    </TouchableOpacity>
                </View>
              </View>
              
          </ScrollView>
        </SafeAreaView>
        
    
        
      )
  } 
  



  const styles = StyleSheet.create({

    safeArea:{ 
      backgroundColor: "white",
      height: "100%"
    },

    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileContainer: {
      //backgroundColor: "gray",
      width: "70%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 30,
    },

    box: {
      //backgroundColor: "pink",
      width: "90%",
    },
    row: {
      flexDirection: "row",
      alignItems: "baseline",
    },

    rowMenu: {
      flexDirection: "row",
      alignItems: "center",
      height: 50,
      justifyContent: "space-between",
      marginHorizontal: "15%"
    },

    rowBox: {
      flexDirection: "row",
      // backgroundColor: "gray",
      alignItems: "center",
      height: 50,
      borderBottomWidth: .5,
      borderColor: "#E60965",
      marginBottom: 10,
      justifyContent: "space-between",
      paddingRight: "10%"
      
    },

    profilePic: {
      marginRight: -20,

    },

    text: {

      //backgroundColor: "gray",
      color: "#E60965",
      fontFamily: "Open-Sans-Bold",
      fontSize: 20,
    },

    mediumText: {
     
      color: "#E60965",
      fontFamily: "Open-Sans-Bold",
      fontSize: 20,
    },

    longText: {
   
      color: "#E60965",
      fontFamily: "Open-Sans-Bold",
      fontSize: 20,
    },

    name: {
      color: "#E60965",
      fontFamily: "Open-Sans-Bold",
      fontSize: 20,
    },

    userType: {
      color: "#E60965",
      fontFamily: "Open-Sans-SemiBold",
      fontSize: 15,
      marginBottom: 30
    },

    iconBookmark: {
      marginRight: 37
    },

    icon: {
      marginRight: 30
    },

    iconBabyBottle: {
      marginRight: 20
    } 
   
  })
  
  export default DonorProfile;

