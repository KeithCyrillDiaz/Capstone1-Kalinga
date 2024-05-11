import React, { useState}from 'react';
import { 
	SafeAreaView, 
	Text, 
	View,
	ScrollView, 
	StatusBar, 
	StyleSheet, 
	TouchableOpacity, 
	ActivityIndicator,
	Alert
} from 'react-native';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { useNavigation, useFocusEffect} from '@react-navigation/native';
import axios from 'axios'; // Import axios for API requests
import { BASED_URL } from '../../../../MyConstants.js';
 

const ApprovedTabRequest = ({route}) => {


	const userInformation = route.params.userInformation
	const token = route.params.token
	const Requestor_ID = userInformation.Requestor_ID;

    const navigation = useNavigation();
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false)

    useFocusEffect(
		React.useCallback(() => {
			fetchData();
		}, [])
	);
    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASED_URL}/kalinga/getApprovedRequests/${Requestor_ID}`);
            const responseData = response.data;
			if(responseData.messages.success === false){
				console.log("No Approved Request")
				Alert.alert("No Approved Request", "You currently don't have any approved requests.");
				setLoading(false); 
				return
			}
            const formDataFromResponse = responseData.RequestData;
			console.log("formDataFromResponse: ", formDataFromResponse)
    
            setFormData(formDataFromResponse);
			setError(false)
            setLoading(false); 
        } catch (error) {
			console.log("Error: ", error)
			setError(true)
            setLoading(false); 
        } 
    };
	const handleReceivedButton = (RequestID) => {
		Alert.alert(
		  'Confirmation',
		  'Are you certain that you have received the milk? Please note that this action cannot be undone.',
		  [
			{
			  text: 'No',
			  onPress: () => console.log('Cancelled'),
			  style: 'cancel',
			},
			{
			  text: 'Yes',
			  onPress: async () => {
				try {
					
					await axios.put(`${BASED_URL}/kalinga/updateCompleteStatus/${RequestID}`, {
					RequestStatus: 'Complete',
				  });
				  Alert.alert('Success', 'Request status updated to Complete');
				  setFormData({})
				} catch (error) {
				  console.log('Error updating request status:', error);
				  Alert.alert('Error', 'Failed to update request status');
				}
			  },
			},
		  ],
		  { cancelable: false }
		);
	  };
	
	  if (loading) {
		return <ActivityIndicator size="large" color="#E60965" />;
	  }
	
    return (
			<SafeAreaView style = {styles.container}>
				<StatusBar barStyle="dark-content" translucent backgroundColor="white" />
				

				<ScrollView
					overScrollMode='never'
					nestedScrollEnabled={true} 
					showsVerticalScrollIndicator={false}
				>
					{Object.keys(formData).length !== 0 && (
						<>
							<View style ={styles.boxContainer}>
								<View style={{marginTop: 10}}>
									<View style={styles.boxContentContainer}>	
										<Text style={styles.boxContentBold}>Fullname: </Text>
										<Text style={[styles.boxContent, styles.limitText]}>{formData[0].fullName}</Text>
									</View>
								</View>
								<View style={styles.boxContentContainer}>
									<Text style={styles.boxContentBold}>Phone Number: </Text>
									<Text style={[styles.boxContent, styles.limitText]}>{formData[0].phoneNumber}</Text>
								</View>
								<View style={styles.boxContentContainer}>
									<Text style={styles.boxContentBold}>Medical Condition: </Text>
									<Text style={[styles.boxContent, styles.limitText]}>{formData[0].medicalCondition}</Text>
								</View>
								<View style={styles.boxContentContainer}>
									<Text style={styles.boxContentBold}>Amount of milk requested (mL): </Text>
									<Text style={[styles.boxContent, styles.limitText]}>{formData[0].milkAmount}</Text>
								</View>
								<View style={styles.boxContentContainer}>
									<Text style={styles.boxContentBold}>Milk Bank: </Text>
									<Text style={[styles.boxContent, styles.limitText]}>{formData[0].milkBank}</Text>
								</View>
								<View style={styles.boxContentContainer}>
									<Text style={styles.boxContentBold}>Baby Category: </Text>
									<Text style={[styles.boxContent, styles.limitText]}>{formData[0].BabyCategory}</Text>
								</View>
								
								<View style={styles.boxContentContainer}>
									<Text style={styles.boxContentBold}>Address: </Text>
									<Text style={[styles.boxContent, styles.limitText]}>{formData[0].homeAddress}</Text>
								</View>

								<View style={styles.boxContentContainer}>
									<Text style={styles.boxContentBold}>Date: </Text>
									<Text style={[styles.boxContent, styles.limitText]}>{formData[0].Date}</Text>
								</View>
								
							</View>
							<View style={styles.ApproveButton}>
								<TouchableOpacity onPress={() => handleReceivedButton(formData[0].RequestID)}>
									<View style={styles.ConfirmbuttonContainer}>
										<Text style={styles.label}>Received</Text>
									</View>
								</TouchableOpacity>
							</View>
						</>
					
					)}
					
						
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

	boxContainer: {
		alignSelf:"center",
		width: "80%",
		backgroundColor: "#FFE5EC",
		marginTop: 30,
		borderRadius: 18,
		elevation: 10,
		paddingBottom: 20,
		marginBottom: 50
	},

	boxContentContainer: {
		flexDirection: 'row', // Arrange children horizontally
		padding: 10,
		marginLeft: 10,
		marginTop: 5,
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

  ConfirmbuttonContainer: {
    backgroundColor: '#E60965',
    paddingHorizontal: 37,
    borderRadius: 20,
    paddingVertical: 5,
    marginHorizontal: 10

    
},

ApproveButton:{
    flexDirection: "row",
    justifyContent:"center",
    position: "absolute",
	bottom: 0,
	left: "30%",
},


label: {
    color: 'white',
    fontFamily: 'Open-Sans-Bold',
    fontSize: 15,
},
	
});

export default ApprovedTabRequest;