import React, { useState }from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { SafeAreaView, Text, View,ScrollView, StatusBar, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { globalHeader } from '../../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';







const ApprovedTabRequest = () => {

    const[inputName, setInputName] = useState('')


    return (
             <SafeAreaView style = {styles.container}>
                <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
                <View style = {globalHeader.SmallHeader}>
                    <Text style = {globalHeader.SmallHeaderTitle}>My Requests</Text>
                </View>

                <ScrollView
                 overScrollMode='never'
                 nestedScrollEnabled={true} 
                showsVerticalScrollIndicator={false}
                >
                   <View style={styles.headerButton}>
                    <Text style = {styles.indicatedButton}>Pending</Text>
                    <Text style = {styles.button}>Approved</Text>
                    <Text style = {styles.button}>Completed</Text>

                   </View>

                    <View style ={styles.FormContainer}>
                        <View>
                            <Text>Fullname</Text>
                        </View>
                        <View>
                            <Text>Phone Number</Text>
                        </View>
                        <View>
                            <Text>Medical Condition</Text>
                        </View>
                        <View>
                            <Text>Amount of milk requested (ml)</Text>
                        </View>
                        <View>
                            <Text>Milkbank</Text>
                        </View>
                        <View>
                            <Text>Address</Text>
                        </View>
                        <View>
                            <Text>Time and Date</Text>
                        </View>
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

    headerButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        paddingBottom: 14,
        justifyContent: "space-evenly",
        marginVertical: 10,
        marginHorizontal: "3%",
        borderBottomWidth: 1,
        borderBlockColor: "#FFACC7"
    },

    button: {
        borderWidth: 1,
        padding: 5,
        paddingHorizontal: 15,
        color: "#E60965",
        borderColor: "#E60965",
        fontFamily: "Open-Sans-Bold",
        backgroundColor: "#FFE5EC",
        borderRadius: 7

    },

   indicatedButton: {
        borderWidth: 1,
        padding: 5,
        paddingHorizontal: 15,
        color: "white",
        borderRadius: 7,
        borderColor: "#E60965",
        fontFamily: "Open-Sans-Bold",
        backgroundColor: "#E60965"

    },


    FormContainer:{
        alignSelf:"center",
        width: 320,
        height: 400,
        backgroundColor: "#FFE5EC",
        marginTop: 40

    }


});

export default ApprovedTabRequest;