import React, { useState, useEffect }from 'react';
import { 
	SafeAreaView, 
	Text, 
	View,
	ScrollView, 
	StatusBar, 
	StyleSheet, 
	Alert
} from 'react-native';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios'; // Import axios for API requests
import { BASED_URL } from '../../../../MyConstants.js';

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
            const response = await axios.get(`${BASED_URL}/kalinga/getCompletedRequests/${Requestor_ID}`);
            const responseData = response.data;
			console.log(responseData)
			if(responseData.messages.success === false){
				Alert.alert("No Completed Request", "You currently don't have any completed requests.");
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

            setLoading(false);
        } catch (error) {
			setError(true)
            // console.log('Error fetching data:', error);
            setLoading(false);
        }
    };

    return (
			<SafeAreaView style = {styles.container}>
				<StatusBar barStyle="dark-content" translucent backgroundColor="white" />
				

				<ScrollView
					overScrollMode='never'
					nestedScrollEnabled={true} 
					showsVerticalScrollIndicator={false}
				>
				<View style={styles.body}>
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
                                <Text style={styles.boxContentBold}>Baby Category:</Text>
                                <Text style={[styles.boxContent, styles.limitText, {marginTop: 2}]}>{formData.BabyCategory}</Text>
                            </View>
							<View style={[styles.boxContentContainer, {gap: 4}]}>
                                <Text style={styles.boxContentBold}>Date:</Text>
                                <Text style={[styles.boxContent, styles.limitText, {marginTop: 2}]}>{formData.Date}</Text>
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
		backgroundColor: "#FFE5EC",
		marginTop: 15,
		borderRadius: 18,
		justifyContent: 'center',
		elevation: 10,
		paddingVertical: 20,
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