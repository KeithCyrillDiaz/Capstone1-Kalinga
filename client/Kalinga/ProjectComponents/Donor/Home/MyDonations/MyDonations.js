import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { SafeAreaView, Text, View,ScrollView, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { globalHeader } from '../../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';

import Tabs from './MyDonationsTabs.js';



const Tab = createBottomTabNavigator()


const MyDonations = () => {
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
                    <View style = {styles.RowMilk}>
                        <View>
                            {/* Temporary */}
                            <MaterialIcons name="local-drink" size={150} color="#E60965" /> 
                        </View>
                        <View>
                            <Text style = {styles.upperText}>You Have Donated</Text>
                            <Text style = {styles.lowerText}> 50 mL</Text>
                        </View>
                    </View>

                    <View style = {styles.RowAchievements}>
                        <View>
                            {/* Temporary */}
                            <FontAwesome5 name="hand-holding-water" size={100} color="#E60965"/>
                        </View>
                        <View>
                            <Text style = {styles.upperText}>You have completed</Text>
                            <Text style = {styles.lowerText}> 5 </Text>
                            <Text style = {styles.upperText}>Generous Donations</Text>
                        </View>
                    </View>

                    <TouchableOpacity>
                            <Text style = {styles.button}>Download as PDF</Text>
                    </TouchableOpacity>

                    <View>
                            <Text style = {styles.bottomText}>Your generosity is changing lives. Thank you for making a difference with your valuable contribution.
</Text>
                        
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
    }
});

export default MyDonations;