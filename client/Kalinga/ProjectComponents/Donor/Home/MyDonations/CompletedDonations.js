import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { SafeAreaView, Text, View,ScrollView, StatusBar, StyleSheet, TouchableOpacity, Image, ActivityIndicator, TextInput} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios'; // Import axios for API requests
import { format } from 'date-fns';


import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { globalHeader } from '../../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';

import Tabs from './MyDonationsTabs.js';



const Tab = createBottomTabNavigator()



const CompleteDonations = () => {
 
  const navigation = useNavigation();
  const route = useRoute();
  const Donor_ID ='tSUnvRQj7m990c8CQcVQ';
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [formData, setFormData] = useState([]); 

  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const response = await axios.get(`http://192.168.254.106:7000/kalinga/getCompletedDonation/${Donor_ID}`);
        const responseData = response.data;

        if ('DonorData' in responseData && responseData.DonorData.length > 0) {
            const formattedData = responseData.DonorData.map(item => ({
                milkAmount: item.milkAmount,
                location: item.location,
                selectedDate: format(new Date(item.selectedDate), 'EEE MMM dd yyyy HH:mm:ss'),
                selectedTime: format(new Date(item.selectedTime), 'EEE MMM dd yyyy HH:mm:ss'),
            }));

            setFormData(formattedData);
        } else {
            console.log('No completed donations found for the specified Donor_ID.');
        }

        setLoading(false);
    } catch (error) {
        console.log('Error fetching data:', error);
        setLoading(false);
    }


  

};
    return (
             <SafeAreaView style = {styles.container}>
                <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
              
                <ScrollView
                 overScrollMode='never'
                 nestedScrollEnabled={true}
                
                >
            <View style={styles.columnContainer}>
            {formData.map((data, index) => (
                    <View key={index} style={styles.columnContainer}>
                        <View style={styles.boxColContainer}>
                            <View style={styles.boxContentContainer}>
                                <Text style={styles.boxContentBold}>Amount of milk requested:</Text>
                                <Text style={[styles.boxContent, styles.limitText]}>{data.milkAmount}</Text>
                            </View>
                            <View style={styles.boxContentContainer}>
                                <Text style={styles.boxContentBold}>Milk Bank:</Text>
                                <Text style={[styles.boxContent, styles.limitText]}>{data.location}</Text>
                            </View>
                            <View style={styles.boxContentContainer}>
                                <Text style={styles.boxContentBold}>Time and Date:</Text>
                                <Text style={[styles.boxContent, styles.limitText]}>
                                    {data.selectedDate}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))}
                </View>
            </ScrollView>
        
            </SafeAreaView>
        
    );

}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EB",
  },
  SmallHeader: {
    backgroundColor: '#E60965', // Set the background color of the header
    borderRadius: 34,
    paddingTop: "12%",
    paddingBottom: "5%",
    marginTop: "-10%",
    width: '100%', // the size will depend on the screen, this is better so it will look the same on all phones
    justifyContent: 'flex-end',
    alignItems: 'center',
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
		paddingVertical: 20,
		justifyContent: "space-evenly",
		borderBottomWidth: 1,
		borderBlockColor: "#FFACC7"
	},

	Tabbutton: {
		borderWidth: 1,
		paddingVertical: 10,
		width: "25%",
		color: "#E60965",
		borderColor: "#E60965",
		fontFamily: "Open-Sans-Bold",
		backgroundColor: "#FFE5EC",
		borderRadius: 7,
		fontSize: 18,
    textAlign: "center"
	},
	
	indicatedButton: {
		borderWidth: 1,
		paddingVertical: 10,
		width: "25%",
		color: "white",
		borderRadius: 7,
		borderColor: "#E60965",
		fontFamily: "Open-Sans-Bold",
		backgroundColor: "#E60965",
		fontSize: 18,
    textAlign: "center"
	},

  boxColContainer: {
		alignSelf:"center",
		width: 350,
		height: 130,
		backgroundColor: "#FFE5EC",
		marginTop: 15,
		borderRadius: 18,
		justifyContent: 'center',
		elevation: 3,
	},

	boxContentContainer: {
		flexDirection: 'row', // Arrange children horizontally
		padding: 5,
		marginLeft: 20,
		marginTop: 3,
		marginRight:5,
	},

	boxContentBold: {
		fontFamily: "OpenSans-Regular",
		fontWeight: 'bold',
		color: '#E60965',
		fontSize: 17,
	},

	boxContent: {
		fontFamily: "OpenSans-Regular",
		color: '#E60965',
		fontSize: 15,
	},
});

export default CompleteDonations;