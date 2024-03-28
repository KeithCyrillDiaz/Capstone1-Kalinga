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

const CompletedTabRequest = () => {
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
									<Text style = {styles.button}>Approved</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => navigatePage("CompletedTabRequest")}>
									<Text style = {styles.indicatedButton}>Completed</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.body}>

          <View style={styles.columnContainer}>
						<View style={styles.boxColContainer}>
								<View style={styles.boxContentContainer}>
										<Text style={styles.boxContentBold}>Amount of milk requested: </Text>
										<Text style={[styles.boxContent, styles.limitText]}>XX mL</Text>
								</View>
								<View style={styles.boxContentContainer}>
										<Text style={styles.boxContentBold}>MilkBank: </Text>
										<Text style={[styles.boxContent, styles.limitText]}>Lorem ipsum dolor sit amet</Text>
								</View>
								<View style={styles.boxContentContainer}>
										<Text style={styles.boxContentBold}>Date and Time: </Text>
										<Text style={[styles.boxContent, styles.limitText]}>XX:XX AM/PM  XX - XX - XXXX </Text>
								</View>
							</View>

						<View style={styles.boxColContainer}>
							<View style={styles.boxContentContainer}>
									<Text style={styles.boxContentBold}>Amount of milk requested: </Text>
									<Text style={[styles.boxContent, styles.limitText]}>XX mL</Text>
							</View>
							<View style={styles.boxContentContainer}>
									<Text style={styles.boxContentBold}>MilkBank: </Text>
									<Text style={[styles.boxContent, styles.limitText]}>Lorem ipsum dolor sit amet</Text>
							</View>
							<View style={styles.boxContentContainer}>
									<Text style={styles.boxContentBold}>Date and Time: </Text>
									<Text style={[styles.boxContent, styles.limitText]}>XX:XX AM/PM  XX - XX - XXXX </Text>
							</View>
						</View>

						<View style={styles.boxColContainer}>
							<View style={styles.boxContentContainer}>
									<Text style={styles.boxContentBold}>Amount of milk requested: </Text>
									<Text style={[styles.boxContent, styles.limitText]}>XX mL</Text>
							</View>
							<View style={styles.boxContentContainer}>
									<Text style={styles.boxContentBold}>MilkBank: </Text>
									<Text style={[styles.boxContent, styles.limitText]}>Lorem ipsum dolor sit amet</Text>
							</View>
							<View style={styles.boxContentContainer}>
									<Text style={styles.boxContentBold}>Date and Time: </Text>
									<Text style={[styles.boxContent, styles.limitText]}>XX:XX AM/PM  XX - XX - XXXX </Text>
							</View>
						</View>

						<View style={styles.boxColContainer}>
							<View style={styles.boxContentContainer}>
									<Text style={styles.boxContentBold}>Amount of milk requested: </Text>
									<Text style={[styles.boxContent, styles.limitText]}>XX mL</Text>
							</View>
							<View style={styles.boxContentContainer}>
									<Text style={styles.boxContentBold}>MilkBank: </Text>
									<Text style={[styles.boxContent, styles.limitText]}>Lorem ipsum dolor sit amet</Text>
							</View>
							<View style={styles.boxContentContainer}>
									<Text style={styles.boxContentBold}>Date and Time: </Text>
									<Text style={[styles.boxContent, styles.limitText]}>XX:XX AM/PM  XX - XX - XXXX </Text>
							</View>
						</View>
						
						<View style={styles.boxColContainer}>
							<View style={styles.boxContentContainer}>
									<Text style={styles.boxContentBold}>Amount of milk requested: </Text>
									<Text style={[styles.boxContent, styles.limitText]}>XX mL</Text>
							</View>
							<View style={styles.boxContentContainer}>
									<Text style={styles.boxContentBold}>MilkBank: </Text>
									<Text style={[styles.boxContent, styles.limitText]}>Lorem ipsum dolor sit amet</Text>
							</View>
							<View style={styles.boxContentContainer}>
									<Text style={styles.boxContentBold}>Date and Time: </Text>
									<Text style={[styles.boxContent, styles.limitText]}>XX:XX AM/PM  XX - XX - XXXX </Text>
							</View>
						</View>

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

	limitText: {
    flexShrink: 1,
    overflow: 'hidden',
  },

	
   

 
	
});

export default CompletedTabRequest;