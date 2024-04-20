import React, { useState }from 'react';
import { 
	SafeAreaView, 
	Text, 
	View,
	ScrollView, 
	StatusBar, 
	StyleSheet, 
	TouchableOpacity, 
} from 'react-native';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { globalHeader } from '../../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';

const ApprovedTabRequest = () => {
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
									<Text style = {styles.button}>Pending</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => navigatePage("ApprovedTabRequest")}>
									<Text style = {styles.indicatedButton}>Approved</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => navigatePage("CompletedTabRequest")}>
									<Text style = {styles.button}>Completed</Text>
							</TouchableOpacity>
						</View>

						<View style ={styles.boxContainer}>
							<View style={{marginTop: 10}}>
								<View style={styles.boxContentContainer}>	
									<Text style={styles.boxContentBold}>Fullname: </Text>
									<Text style={[styles.boxContent, styles.limitText]}>Juan Dela Cruz</Text>
								</View>
							</View>
							<View style={styles.boxContentContainer}>
								<Text style={styles.boxContentBold}>Phone Number: </Text>
								<Text style={[styles.boxContent, styles.limitText]}>09326136778</Text>
							</View>
							<View style={styles.boxContentContainer}>
								<Text style={styles.boxContentBold}>Medical Condition: </Text>
								<Text style={[styles.boxContent, styles.limitText]}>Allergy</Text>
							</View>
							<View style={styles.boxContentContainer}>
								<Text style={styles.boxContentBold}>Amount of milk requested (mL): </Text>
								<Text style={[styles.boxContent, styles.limitText]}>15 mL</Text>
							</View>
							<View style={styles.boxContentContainer}>
								<Text style={styles.boxContentBold}>Baby Category: </Text>
								<Text style={[styles.boxContent, styles.limitText]}>Medically Fragile Baby</Text>
							</View>
							<View style={styles.boxContentContainer}>
								<Text style={styles.boxContentBold}>Milk Bank: </Text>
								<Text style={[styles.boxContent, styles.limitText]}>Quezon City Human Milk Bank</Text>
							</View>
							<View style={styles.boxContentContainer}>
								<Text style={styles.boxContentBold}>Address: </Text>
								<Text style={[styles.boxContent, styles.limitText]}>Project 8, Quezon City, Metro Manila</Text>
							</View>
							<View style={styles.boxContentContainer}>
								<Text style={styles.boxContentBold}>Time and Date: </Text>
								<Text style={[styles.boxContent, styles.limitText]}>11:00 AM - 04/10/2024</Text>
							</View>

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

	boxContainer: {
		alignSelf:"center",
		width: 320,
		height: 400,
		backgroundColor: "#FFE5EC",
		marginTop: 30,
		borderRadius: 18,
		elevation: 3,
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
	
});

export default ApprovedTabRequest;