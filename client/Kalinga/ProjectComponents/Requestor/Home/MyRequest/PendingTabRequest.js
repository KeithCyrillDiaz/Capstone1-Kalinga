import React, { useState }from 'react';
import { 
	SafeAreaView, 
	Text, 
	View,
	ScrollView, 
	StatusBar, 
	StyleSheet, 
	TouchableOpacity, 
	TextInput
} from 'react-native';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native';


import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { globalHeader } from '../../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';


const PendingTabRequest = () => {
    const [inputValue, setInputValue] = useState('');

		const navigation = useNavigation();
    
    const navigatePage = (Page) => {
        navigation.navigate(Page); // Navigate to the Login screen
    };

    const handlePress = () => {
        console.log('Button Pressed!');
      };
		
		const handleBackPress = () => {
			console.log("Back button pressed");
		};

		const handleInputChange = (text) => {
			setInputValue(text); // Update the local inputValue
		};

    const[inputName, setInputName] = useState('')
    return (
			<SafeAreaView style = {styles.container}>
				<StatusBar barStyle="dark-content" translucent backgroundColor="white" />
				<View style = {globalHeader.SmallHeader}>
						<TouchableOpacity onPress={handleBackPress}>
								<AntDesign name="arrowleft" size={24} color="white" style={{position: 'absolute', top: 5, left: -180}}/>
						</TouchableOpacity>

						<Text style = {globalHeader.SmallHeaderTitle}>My Requests</Text>
				</View>

				<ScrollView
					overScrollMode='never'
					nestedScrollEnabled={true} 
					showsVerticalScrollIndicator={false}
				>
						<View style={styles.headerButton}>
							<TouchableOpacity onPress={() => navigatePage("PendingTabRequest")}>
									<Text style = {styles.indicatedButton}>Pending</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => navigatePage("ApprovedTabRequest")}>
									<Text style = {styles.button}>Approved</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => navigatePage("CompletedTabRequest")}>
									<Text style = {styles.button}>Completed</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.body}>

							<View style={{marginTop: 15}}>
								<View style={styles.boxContainer}>
										<View style={styles.boxContentContainer}>
											<Text style={styles.boxLabel}>Full Name</Text>
											<Text style={[styles.boxContent, styles.limitText]}>Rogine Cubelo</Text>
										</View>
								</View>
							</View>

							<View style={styles.boxContainer}>
								<View style={styles.boxContentContainer}>
									<Text style={styles.boxLabel}>Phone Number</Text>
									<Text style={[styles.boxContent, styles.limitText]}>09XXXXXXXXX</Text>
								</View>
							</View>

							<View style={styles.boxContainer}>
								<View style={styles.boxContentContainer}>
									<Text style={styles.boxLabel}>Email Address</Text>
									<Text style={[styles.boxContent, styles.limitText]}>xxxx@gmail.com</Text>
								</View>
							</View>

							<View style={styles.boxContainer2}>
								<View style={styles.boxContentContainer}>
									<Text style={styles.boxLabel}>Home Address</Text>
									<Text style={[styles.boxContent, styles.limitText]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit </Text>
								</View>
							</View>

							<View style={styles.boxContainer}>
								<View style={styles.boxContentContainer}>
									<Text style={styles.boxLabel}>Medical Condition (if applicable)</Text>
									<Text style={[styles.boxContent, styles.limitText]}>xxxx@gmail.com</Text>
								</View>
							</View>
			
							<View style={styles.boxContainer}>
								<View style={styles.boxContentContainer}>
									<Text style={styles.boxLabel}>Amount of milk to be requested (mL)</Text>
									<Text style={[styles.boxContent, styles.limitText]}>xxxx@gmail.com</Text>
								</View>
							</View>

							<View style={styles.boxContainer2}>
								<View style={styles.boxContentContainer}>
									<Text style={styles.boxLabel}>Reason for Requesting</Text>
									<Text style={[styles.boxContent, styles.limitText]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit </Text>
								</View>
							</View>

							<Text style={styles.bodyNote}>Note: Maximum of 3 images or files per field.</Text>

							<View style = {styles.uploadContainer}>
									<Text style = {styles.uploadContainerTitle}>Attach Prescription </Text>
							</View>

							<Text style={styles.bodyNote2}>Note: Your request is still being reviewed by our administrators. We kindly ask for your patience. Thank you!</Text>

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

	bodyNote: {
    fontSize: 10,
    fontFamily: 'OpenSans-Regular',
    color: '#E60965',
    marginLeft: 50,
    marginBottom: 5,
		marginTop: 5,
  },

	bodyNote2: {
    fontSize: 18,
    fontFamily: 'OpenSans-Regular',
    color: '#E60965',
    marginLeft: 15,
		marginRight: 15,
    marginBottom: 5,
		marginTop: 20,
		textAlign: 'center'
  },

	bodyForm: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
	},
	
	boxContainer: {
		height: 45,
		fontFamily: "OpenSans-Regular",
		borderColor: '#E60965', // Border color
		borderWidth: 1, // Border width
		borderRadius: 10, // Border radius
		paddingHorizontal: 12,
		marginBottom: 15,
		width: '88%',
		alignSelf: 'center', // Center the input horizontally
		backgroundColor: '#fff', // Background color
	},

	boxContainer2: {
		height: 70,
		fontFamily: "OpenSans-Regular",
		borderColor: '#E60965', // Border color
		borderWidth: 1, // Border width
		borderRadius: 10, // Border radius
		paddingHorizontal: 12,
		marginBottom: 15,
		width: '88%',
		alignSelf: 'center', // Center the input horizontally
		backgroundColor: '#fff', // Background color
	},

	boxLabel: {
		textAlign: 'left', // Align text to the left
		fontFamily: 'OpenSans-Regular',
		fontSize: 15,
		color: '#E60965',
		marginTop: 3,
		marginLeft:-15
	},

	boxContent: {
		fontFamily: "OpenSans-Regular",
		fontSize: 15,
		color: '#E60965',
		fontWeight: 'bold',
		marginTop: 3,
		marginLeft: 10,
		alignItems: 'center'
	},

	boxContentContainer: {
		flexDirection: 'row', // Arrange children horizontally
		padding: 5,
		marginLeft: 10,
		marginTop: 3,
		marginRight:5,
	},

	uploadContainer: {
		height: 45,
		fontFamily: "OpenSans-Regular",
		borderColor: '#E60965', // Border color
		borderWidth: 1, // Border width
		borderRadius: 10, // Border radius
		paddingHorizontal: 10,
		marginBottom: 5,
		width: '70%',
		alignSelf: 'center', // Center the input horizontally
		backgroundColor: '#fff', // Background color
		
	},

	uploadContainerTitle: {
		color: '#E60965',
		margin: 15,
		marginLeft: 2,
	},

	limitText: {
    flexShrink: 1,
    overflow: 'hidden',
  },

    
});

export default PendingTabRequest;