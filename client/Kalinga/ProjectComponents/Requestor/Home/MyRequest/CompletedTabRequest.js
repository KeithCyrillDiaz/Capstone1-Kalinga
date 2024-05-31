import React, { useState, useEffect }from 'react';
import { 
	SafeAreaView, 
	Text, 
	View,
	ScrollView, 
	StatusBar, 
	StyleSheet, 
	Alert,
	ActivityIndicator
} from 'react-native';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios'; // Import axios for API requests
import { BASED_URL } from '../../../../MyConstants.js';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import { getDateTime } from '../../../functions/formatDateAndTime.js';

const CompletedTabRequest = ({route}) => {
	const userInformation = route.params.userInformation
	const token = route.params.token
	const Requestor_ID = userInformation.Requestor_ID;
    const navigation = useNavigation();
	const [formDataList, setFormDataList] = useState([]);
    const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false)

    useFocusEffect(
		React.useCallback(() => {
			fetchData();	
			
		}, [])
	);

    const fetchData = async () => {
        try {
			setLoading(true)
            const response = await axios.get(`${BASED_URL}/kalinga/getCompletedRequests/${Requestor_ID}`);
            const responseData = response.data;
			if(responseData.messages.success === false){
				setLoading(false); 
				return
			}

			setFormDataList(responseData.RequestData);
            // if ('RequestData' in responseData && responseData.RequestData.length > 0) {
            //     const formattedData = responseData.RequestData.map(item => ({
            //         fullName: item.fullName,
            //         phoneNumber: item.phoneNumber,
            //         emailAddress: item.emailAddress,
            //         homeAddress: item.homeAddress,
            //         medicalCondition: item.medicalCondition,
            //         milkAmount: item.milkAmount,
            //         BabyCategory: item.BabyCategory,
            //         ReasonForRequesting: item.ReasonForRequesting,
            //     }));
			// 	console.log(responseData.RequestData)
			// 	setError(false)
            //     setFormDataList(formattedData);
				
            // } else {
            //     console.log('No completed requests found for the specified Requestor_ID.');
            // }
			formatDateTime(responseData.RequestData)
            setLoading(false);
        } catch (error) {
			setError(true)
            // console.log('Error fetching data:', error);
            setLoading(false);
        } finally {
			setLoading(false)
		}
    };

	const formatDateTime = (data) => {
		if (data.length === 0) return;
		const updatedList = data.map(formData => {
		  const newForm = {
			...formData,
			selectedDate: formData.Date,
			selectedTime: formData.Time,
		  }
		  const { time, date } = getDateTime({ data: newForm }); 
	  
		  return {
			...formData,
			date,
			time,
		};
		});
		setFormDataList(updatedList); // Update the formDataList with the updated items
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
					showsVerticalScrollIndicator={false}
				>
				<View style={styles.body}>
				{formDataList.length === 0 && (
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
							alignSelf: "center",
							marginVertical: "7%"
						}}>
						<Text style={{
						fontFamily: "Open-Sans-SemiBold",
						color:  '#E60965',
						}}>No completed at the moment.</Text>
						</View>
					)}
					{formDataList.map((formData, index) => (
                    <View key={index} style={{paddingBottom: 17}}>
                        <View style={styles.boxColContainer}>
							<View style={[styles.boxContentContainer, {gap: 4}]}>
                                <Text style={styles.boxContentBold}>Milk Bank:</Text>
                                <Text style={[styles.boxContent, styles.limitText, {marginTop: 2}]}>{formData.milkBank}</Text>
                            </View>
                            <View style={[styles.boxContentContainer, {gap: 4}]}>
                                <Text style={styles.boxContentBold}>Amount of milk requested: </Text>
                                <Text style={[styles.boxContent, styles.limitText, {marginTop: 2}]}>{formData.milkAmount} ml</Text>
                            </View>
							<View style={[styles.boxContentContainer, {gap: 4}]}>
                                <Text style={styles.boxContentBold}>Method of Obtaining:</Text>
                                <Text style={[styles.boxContent, styles.limitText, {marginTop: 2}]}>{formData.method}</Text>
                            </View>
							{formData.BabyCategory && (
								  <View style={[styles.boxContentContainer, {gap: 4}]}>
									<Text style={styles.boxContentBold}>Baby Category:</Text>
									<Text style={[styles.boxContent, styles.limitText, {marginTop: 2}]}>{formData.BabyCategory}</Text>
							  	  </View>
							)}
                          
							<View style={[styles.boxContentContainer, {gap: 4}]}>
                                <Text style={styles.boxContentBold}>Scheduled Date:</Text>
                                <Text style={[styles.boxContent, styles.limitText, {marginTop: 2}]}>{formData.date}</Text>
                            </View>
							<View style={[styles.boxContentContainer, {gap: 4}]}>
                                <Text style={styles.boxContentBold}>Scheduled Time:</Text>
                                <Text style={[styles.boxContent, styles.limitText, {marginTop: 2}]}>{formData.time}</Text>
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

	button: {
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

	bodyForm: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
	},

	boxColContainer: {
		alignSelf:"center",
		width: "90%",
		backgroundColor: "white",
		marginTop: 15,
		borderRadius: 18,
		justifyContent: 'center',
		elevation: 10,
		paddingVertical: 20,
		paddingHorizontal: 10,
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

	limitText: {
    flexShrink: 1,
    overflow: 'hidden',
  },

	
   

 
	
});

export default CompletedTabRequest;