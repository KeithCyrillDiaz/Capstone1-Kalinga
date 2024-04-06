import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { SafeAreaView, Text, View,ScrollView, StatusBar, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native';


import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { globalHeader } from '../../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';

import Tabs from './MyDonationsTabs.js';



const Tab = createBottomTabNavigator()



const OngoingDonations = () => {
 

  const navigation = useNavigation();
const navigatePage = (Page) => {
  navigation.navigate(Page); // Navigate to the Login screen
  

};
    return (
             <SafeAreaView style = {styles.container}>
                <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
                <View style = {globalHeader.SmallHeader}>
                    <Text style = {globalHeader.SmallHeaderTitle}>My Donations</Text>
                </View>

                <ScrollView
                 overScrollMode='never'
                 nestedScrollEnabled={true}
                
                >
                    <View style={styles.headerButton}>
							<TouchableOpacity onPress={() => navigatePage("OngoingDonations")}>
									<Text style = {styles.Tabbutton}>Ongoing</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => navigatePage("CompleteDonations")}>
									<Text style = {styles.indicatedButton}>Copleted</Text>
							</TouchableOpacity>
							
						</View>
                    
            <View>
                <Image
                source={require('../../../../assets/Kalinga_Logo.png')} 
                style={styles.img}
                 />
                  </View>
                <View style = {styles.OngoingTextContainer}>
                    <Text style = {styles.OngoingText}>Any previous transaction will appear here</Text>
                </View>
                      
                </ScrollView>
        
            </SafeAreaView>
        
    );

}

const styles = StyleSheet.create ({

    container: {
        flex: 1,
       //backgroundColor: "gray",

    },

    
    img: {
    
      width: 200,
      height: 200,
      alignSelf: "center",
      marginTop: 100
   
    
  },
  OngoingTextContainer:{
    alignSelf: "center"
  },
  OngoingText:{
    color: "#E60965",
    fontSize: 15
  },
    RowMilk: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: "10%",
        marginTop: 50,
        paddingLeft: 30,
        flexDirection: "row",
        //backgroundColor: "gray",
        borderWidth: 3,
        borderRadius: 20,
        borderColor: "#E60965",
        height: 270
  
    }, RowAchievements: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: "10%",
        marginTop: 30,
        paddingLeft: 30,
        flexDirection: "row",
        //backgroundColor: "gray",
        borderWidth: 3,
        borderRadius: 20,
        borderColor: "#E60965",
        height: 270
  
    },

    upperText: {
        fontFamily: "Open-Sans-Bold",
        fontSize: 18,
        color: "#E60965",
        marginRight: 50,
    },

    lowerText: {
        fontFamily: "Open-Sans-Bold", // Need prata font
        fontSize: 35,
        color: "#E60965",
        textAlign: "center",
        marginRight: 50,
        //backgroundColor: "red"
    },

    button: {
        backgroundColor: "#E60965",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: "30%",
        textAlign: "center",
        marginTop: 20,
        padding: 10,
        borderRadius: 20,
        color: "white",
        fontFamily: "Open-Sans-Regular", //should be swmi Bold
        fontSize: 17,
    },

    bottomText: {
       // backgroundColor: "gray",
        marginHorizontal: "10%",
        textAlign: "center",
        color: "#E60965",
        marginVertical: 20,
    },

    
	headerButton: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		paddingBottom: 18,
		justifyContent: "space-evenly",
		marginVertical: 10,
		marginHorizontal: "3%",
		borderBottomWidth: 1,
		borderBlockColor: "#FFACC7"
	},

	Tabbutton: {
		borderWidth: 1,
		padding: 10,
		paddingHorizontal: 18,
		color: "#E60965",
		borderColor: "#E60965",
		fontFamily: "Open-Sans-Bold",
		backgroundColor: "#FFE5EC",
		borderRadius: 7,
		fontSize: 18,

	},
	
	indicatedButton: {
		borderWidth: 1,
		padding: 10,
		paddingHorizontal: 18,
		color: "white",
		borderRadius: 7,
		borderColor: "#E60965",
		fontFamily: "Open-Sans-Bold",
		backgroundColor: "#E60965",
		fontSize: 18,

	},
});

export default OngoingDonations;