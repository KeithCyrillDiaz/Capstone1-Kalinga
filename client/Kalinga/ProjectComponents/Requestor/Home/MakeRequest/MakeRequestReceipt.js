import React, { useState }from 'react';
import { 
	SafeAreaView, 
	Text, 
	View,
	ScrollView, 
	StatusBar, 
	StyleSheet, 
	TouchableOpacity, 
	TextInput,
    Image,
    Alert
} from 'react-native';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native';


import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { globalHeader } from '../../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import { Picker } from '@react-native-picker/picker';



const PendingTabRequest = () => {
    const [inputValue, setInputValue] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState('Healthy Baby'); // Default category

   
  
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

        const handleImageUpload = async () => {
            try {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
                    return;
                }
    
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });
    
                if (!result.cancelled) {
                    setSelectedImage(result.uri);
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to pick an image.');
            }
        };

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
			

						<View style={styles.body}>
                        <View style={styles.Title}>
									<Text style={styles.TitleText}>Request Confirmation</Text>
                        </View>
							<View style={{marginTop: 15}}>
								<View style={styles.boxContainer}>
										<View style={styles.boxContentContainer}>
											<Text style={styles.boxLabel}>Full Name</Text>
											<Text style={[styles.boxContent, styles.limitText]}></Text>
										</View>
								</View>
							</View>

							<View style={styles.boxContainer}>
								<View style={styles.boxContentContainer}>
									<Text style={styles.boxLabel}>Phone Number</Text>
									<Text style={[styles.boxContent, styles.limitText]}></Text>
								</View>
							</View>

							<View style={styles.boxContainer}>
								<View style={styles.boxContentContainer}>
									<Text style={styles.boxLabel}>Email Address</Text>
									<Text style={[styles.boxContent, styles.limitText]}></Text>
								</View>
							</View>

							<View style={styles.boxContainer2}>
								<View style={styles.boxContentContainer}>
									<Text style={styles.boxLabel}>Home Address</Text>
									<Text style={[styles.boxContent, styles.limitText]}></Text>
								</View>
							</View>

							<View style={styles.boxContainer}>
								<View style={styles.boxContentContainer}>
									<Text style={styles.boxLabel}>Medical Condition (if applicable)</Text>
									<Text style={[styles.boxContent, styles.limitText]}></Text>
								</View>
							</View>
			
							<View style={styles.bodyForm1}>
                <TextInput
                    style={styles.form3}
                    value={inputValue}
                    placeholder="Amount of milk to be requested (mL) *"
                    placeholderTextColor="#E60965"
                    onChangeText={handleInputChange}
                />

              
                  <View style={styles.dropdownContainer}>
                  <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
                    style={styles.dropdown}
                  >
                    <Picker.Item label="Baby Category" value="Baby Category" />
                    <Picker.Item label="Healthy Baby" value="Healthy Baby" style={styles.dropdownItem} />
                    <Picker.Item label="Sick Baby" value="Sick Baby" style={styles.dropdownItem} />
                    <Picker.Item label="Medically Fragile Baby" value="Medically Fragile Baby" style={styles.dropdownItem} />
                    <Picker.Item label="Preterm Baby" value="Preterm Baby" style={styles.dropdownItem} />
                  </Picker>
                </View>
              </View>

							<View style={styles.boxContainer2}>
								<View style={styles.boxContentContainer}>
									<Text style={styles.boxLabel}>Reason for Requesting</Text>
									<Text style={[styles.boxContent, styles.limitText]}></Text>
								</View>
							</View>

							<Text style={styles.bodyNote}>Note: Maximum of 3 images or files per field.</Text>

                            <View style = {styles. attachmentContainer}>
                        <Text style={styles.labelPicture}>
                            Prescription.jpg
                        </Text>
                        <View style={styles.rowAlignment}>
                            <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                            <TouchableOpacity onPress={handleImageUpload}style={styles.iconContainer}>
                            <AntDesign name="picture" size={27} color="#E60965" />
                            <Text style={styles.verticalLine}>|</Text>
                            <AntDesign name="file1" size={24} color="#E60965" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {selectedImage && (
                        <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
                    )}

                            <View style={styles.DonorButton}>
                                <TouchableOpacity onPress={() => navigatePage("MakeRequest2")}>
                                    <View style={styles.ConfirmbuttonContainer}>
                                        <Text style={styles.label}>Confirm</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigatePage("DonorInitialScreeningFormPage2")}>
                                    <View style={styles.CancelbuttonContainer}>
                                        <Text style={styles.label}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>
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
    bodyForm1:{
        flexDirection: "row",
        alignSelf:"center",
      },
      form3:{
        height: 52,
        fontFamily: "OpenSans-Regular",
        borderColor: '#E60965', // Border color
        borderWidth: 1, // Border width
        borderRadius: 10, // Border radius
        paddingHorizontal: 10,
        marginBottom: 5,
        width: '30%',
        alignSelf: 'center', // Center the input horizontally
        backgroundColor: '#fff',
        justifyContent: "space-between"
      },

      dropdownContainer: {
        borderWidth: 1,
        borderColor: '#E60965',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 5,
        width: '55%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        height:10,
        marginLeft: 20,
        paddingBottom: 50

},

dropdown: {
  height: 10,
  color: '#E60965',



},

dropdownItem: {
  fontFamily: 'OpenSans-Regular',
  color: '#E60965',
  
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
    Title:{
        marginLeft: 25,
        marginTop: 25

    },
    TitleText:{
        color: '#E60965',
        fontSize: 20,
        fontWeight:"bold"
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
  ConfirmbuttonContainer: {
    backgroundColor: '#E60965',
    paddingHorizontal: 37,
    borderRadius: 20,
    paddingVertical: 5,
    marginHorizontal: 10

    
},
    CancelbuttonContainer: {
    backgroundColor: '#E60965',
    paddingHorizontal: 37,
    borderRadius: 20,
    paddingVertical: 5,
    marginHorizontal: 10

 
},
DonorButton:{
    flexDirection: "row",
    justifyContent:"center",
    marginTop: 20
},
label: {
    color: 'white',
    fontFamily: 'Open-Sans-Bold',
    fontSize: 15,
},
rowAlignment: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFEECC",
    paddingHorizontal: 5,
    marginLeft: 10,
  },


  attachmentContainer: {
    backgroundColor:"white",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: "#E60965",
      borderRadius: 10,
      paddingVertical: 5,
      paddingHorizontal: 20,
      marginBottom: 17,
      width: "90%",
     alignSelf:"center"

  },

  labelPicture: {
      color: "#E60965",
      fontSize: 15,
      fontFamily: "Open-Sans-SemiBold",
  },

});

export default PendingTabRequest;