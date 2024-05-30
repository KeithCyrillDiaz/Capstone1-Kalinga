import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { SafeAreaView, Text, View,ScrollView, StatusBar, StyleSheet, Alert, TouchableOpacity, Image, ActivityIndicator, TextInput} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios'; // Import axios for API requests
import { format } from 'date-fns';
import { BASED_URL } from '../../../../MyConstants.js';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import { getDateTime } from '../../../functions/formatDateAndTime.js';

const Tab = createBottomTabNavigator()

const CompleteDonations = ({route}) => {

    const userInformation = route.params.userInformation
    const token = route.params.token
    const Donor_ID = userInformation.Donor_ID;
    
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [formData, setFormData] = useState(null); 

  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  )
  useEffect(() => {
    fetchData();
  },[])

  const fetchData = async () => {
    try {
        setLoading(true)
        const response = await axios.get(`${BASED_URL}/kalinga/getCompletedDonation/${Donor_ID}`);
        const responseData = response.data;

        if ('DonorData' in responseData && responseData.DonorData.length > 0) {
            const formattedData = responseData.DonorData.map(item => ({
                milkAmount: item.milkAmount,
                location: item.location,
                ...getDateTime({ data: item }),
            }));
            
            setFormData(formattedData);
        } else {
            Alert.alert("No Ongoing Donation", "You currently don't have any ongoing donations.");
            console.log('No completed donations found for the specified Donor_ID.');
        }

        setLoading(false);
    } catch (error) {
        console.log('Error fetching data:', error);
        setLoading(false);
    } finally {
        setLoading(false)
    }

};

if (loading) {
    return <ActivityIndicator size="large" color="#E60965" />;
}
    return (
             <SafeAreaView style = {globalStyles.defaultBackgroundColor}>
                <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
              
                <ScrollView
                 overScrollMode='never'
                 nestedScrollEnabled={true}
                
                >
            <View style={styles.columnContainer}>
            {!loading && formData && formData.length === 0 && (
                 <View style ={{
                    backgroundColor: "white",
                    width: "90%",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal:7,
                    paddingVertical:17,
                    elevation:7,
                    borderRadius: 17,
                    marginTop: "7%",
                    alignSelf: "center"
                  }}>
                <Text style ={{
                fontFamily: "Open-Sans-SemiBold",
                color:  '#E60965',
            }}>No completed donations at the moment</Text>
            </View>
              
            )}
            {formData && formData.map((data, index) => (
                    <View key={index} style={styles.columnContainer}>
                        <View style={styles.boxColContainer}>
                            <View style={styles.boxContentContainer}>
                                <Text style={styles.boxContentBold}>Amount of milk requested:</Text>
                                <Text style={[styles.boxContent, styles.limitText]}>{data.milkAmount} ml</Text>
                            </View>
                            <View style={styles.boxContentContainer}>
                                <Text style={styles.boxContentBold}>Milk Bank:</Text>
                                <Text style={[styles.boxContent, {width: "70%"}]}>{data.location}</Text>
                            </View>
                            <View style={styles.boxContentContainer}>
                                <Text style={styles.boxContentBold}>Date:</Text>
                                <Text style={[styles.boxContent, styles.limitText]}>
                                    {data.date}
                                </Text>
                            </View>
                            <View style={styles.boxContentContainer}>
                                <Text style={styles.boxContentBold}>Time:</Text>
                                <Text style={[styles.boxContent, styles.limitText]}>
                                    {data.time}
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
    columnContainer: {
        paddingBottom: 10,
    },
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
		maxWidth: 350,
		backgroundColor: "white",
		marginTop: 15,
		borderRadius: 18,
		justifyContent: 'center',
        paddingVertical:10,
		elevation: 10,
	},

	boxContentContainer: {
		flexDirection: 'row', // Arrange children horizontally
		padding: 5,
		marginLeft: 20,
		marginTop: 3,
		marginRight:5,
        gap: 7,
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