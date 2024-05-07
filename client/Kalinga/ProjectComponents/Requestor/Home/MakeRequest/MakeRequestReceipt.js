import React, { useState, useEffect }from 'react';
import { 
	SafeAreaView, 
	Text, 
	View,
	ScrollView, 
	StatusBar, 
	StyleSheet, 
	TouchableOpacity, 
	TextInput,
  Modal,
  Dimensions,
  Image,
  TouchableHighlight,
  Alert
} from 'react-native';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { useNavigation, useRoute } from '@react-navigation/native'; // Correct import
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { globalHeader } from '../../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import { Picker } from '@react-native-picker/picker';
import { BackHandler } from 'react-native';
import { BASED_URL } from '../../../../MyConstants.js';
import Spinner from 'react-native-loading-spinner-overlay';
import ImageZoom from 'react-native-image-pan-zoom';


const MakeRequestReceipt = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { formData, BabyCategory, selectedImage } = route.params;

  // State to track selected image and input value
  const [modalVisible, setModalVisible] = useState(false);
  // const [scrollableHorizontal, setScrollableHorizontal] = useState(false)
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const confirmation = (status) => {
    if(status === "Confirm"){
      Alert.alert(
        'Confirm Appointment Creation',
        'Are you sure you want to create this appointment?',
        [
          {
            text: 'Yes',
            onPress: () => handleRequestCreation()
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]
      );
    } else {
      Alert.alert(
        'Cancel Appointment Creation',
        'Are you sure you want to create this appointment?',
        [
          {
            text: 'Yes',
            onPress: () =>  navigatePage("MakeRequest")
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
         
        ]
      );
    }
  
  }
    const handleRequestCreation = async () => {
      try {
        const response = await fetch(`${BASED_URL}/kalinga/createRequest`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          
        });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      navigation.navigate('MakeRequest2'); // Redirect to AppointmentConfirmationMessage
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

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
              <Text style={styles.boxLabel}>Full Name:</Text>
              <Text style={[styles.boxContent, styles.limitText]}>{formData.fullName}</Text>
            </View>
          </View>

          <View style={styles.boxContainer}>
            <View style={styles.boxContentContainer}>
              <Text style={styles.boxLabel}>Phone Number:</Text>
              <Text style={[styles.boxContent, styles.limitText]}>{formData.phoneNumber}</Text>
            </View>
          </View>

          <View style={[styles.boxContainer, {height: 60}]}>
            <View style={styles.boxContentContainer}>
              <Text style={styles.boxLabel}>Email Address:</Text>
              <Text style={[styles.boxContent, styles.limitText]}>{formData.emailAddress}</Text>
            </View>
          </View>

          <View style={[styles.boxContainer2, {height: 80}]}>
            <View style={[styles.boxContentContainer]}>
              <Text style={styles.boxLabel}>Home Address:</Text>
              <Text style={[styles.boxContent, styles.limitText]}>{formData.homeAddress}</Text>
            </View>
          </View>

          <View style={styles.boxContainer2}>
            <View style={styles.boxContentContainer}>
              <Text style={styles.boxLabel}>City: </Text>
              <Text style={[styles.boxContent, styles.limitText]}>{formData.city}</Text>
            </View>
          </View>

          

          <View style={styles.boxContainer}>
            <View style={styles.boxContentContainer}>
              <Text style={styles.boxLabel}>Medical Condition: </Text>
              <Text style={[styles.boxContent, styles.limitText]}>{formData.medicalCondition}</Text>
            </View>
          </View>

          <View style={styles.bodyForm1}>
            <TextInput
                  style={[styles.form3, { color: '#E60965', fontWeight: 'bold', }]}
                  value={ "Amount of Milk: " + formData.milkAmount + " ml" }               
                  placeholder="Amount of milk to be requested (mL) *"
                  placeholderTextColor="#E60965"
                  editable={false}
                  />

            <View style={styles.bodyForm2}>
                <View style={[styles.form4, {flexDirection: "row"}]}>
                    <Text style={styles.boxLabel}>Baby Category:</Text>
                    <Text style={[styles.boxContent, styles.limitText]}>{formData.BabyCategory}</Text>
                </View>
            </View>
          </View>

          <View style={styles.boxContainer2}>
            <View style={styles.boxContentContainer}>
              <Text style={styles.boxLabel}>Reason for Requesting: </Text>
              <Text style={[styles.boxContent, styles.limitText]}>{formData.ReasonForRequesting}</Text>
            </View>
          </View>

          <Text style={styles.bodyNote}>Note: Maximum of 3 images or files per field.</Text>

          {Object.keys(selectedImage).length !== 0 && (
                      <View  style = {{
                        height: 150,
                        marginBottom: 20,
                        borderWidth: 1,
                        backgroundColor: "white",
                        paddingLeft: 10,
                        paddingRight: 10,
                        borderColor: "#E60965",
                        borderRadius: 15,
                        elevation: 5,
                        marginTop: 20,
                        marginHorizontal: "10%",
                        alignItems: "center"
                        }}>
                        <ScrollView 
                          showsHorizontalScrollIndicator={true}
                          overScrollMode='never'
                          horizontal={false}
                        contentContainerStyle={{ flexDirection: 'row', }}
                      >
                          {Object.entries(selectedImage).map(([attachmentType, value]) => (
                                    <TouchableOpacity
                                        key={attachmentType}
                                        onPress={() => {
                                            setSelectedImageUrl(value.uri);
                                            setModalVisible(true);
                                        }}
                                    >
                                        <View style={{ marginHorizontal: 5 , alignItems: "center"}}>
                                            <Text style ={{
                                              textAlign: "center",
                                              color: "#E60965",
                                              marginTop: 7,
                                          
                                            }}>{attachmentType}</Text>
                                            <Image
                                                source={{ uri: value.uri }}
                                                style={{ width: 100, height: 100, marginTop: 7, resizeMode: 'cover',}}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                ))}

                        </ScrollView>
                    </View>
                )}

          <View style={styles.DonorButton}>
            <TouchableOpacity onPress={() => confirmation("Confirm")}>
              <View style={styles.ConfirmbuttonContainer}>
                <Text style={styles.label}>Approve</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => confirmation("Decline")}>
              <View style={styles.CancelbuttonContainer}>
                <Text style={styles.label}>Decline</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        </View>
        

      </ScrollView>

      <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                      setModalVisible(!modalVisible);
                  }}
              >
                  <View style={styles.modalContainer}>
                  <ImageZoom
                      cropWidth={Dimensions.get('window').width}
                      cropHeight={Dimensions.get('window').height}
                      imageWidth={Dimensions.get('window').width}
                      imageHeight={Dimensions.get('window').height * 1} // Adjust the height as needed
                      enableSwipeDown={true}
                      onSwipeDown={() => setModalVisible(false)} // Close modal on swipe down
                      style={{ backgroundColor: 'black' }} // Set background color to black to avoid seeing the underlying content
                  >
                      <Image
                          source={{ uri: selectedImageUrl }}
                          style={{ width: '100%', height: '100%' }}
                      />
                  </ImageZoom>
                      <TouchableHighlight
                          style={styles.closeButton}
                          onPress={() => {
                              setModalVisible(!modalVisible);
                          }}
                      >
                          <AntDesign name="close" size={24} color="black" />
                      </TouchableHighlight>
                  </View>
              </Modal>
    </SafeAreaView>
  );
};


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
      width: "90%",
      alignSelf: "center",
      paddingVertical: 3

      },
  form3:{
    height: 52,
    fontFamily: "OpenSans-Regular",
    borderColor: '#E60965', // Border color
    borderWidth: 1, // Border width
    borderRadius: 10, // Border radius
    paddingLeft: 25,
    marginBottom: 5,
    width: '98%',
    alignSelf: 'center', // Center the input horizontally
    backgroundColor: '#fff',
  },

    
  bodyForm2:{
    width: "98%",
    alignSelf: "center",
    paddingVertical: 3,

  },
  form4:{
    height: 52,
    fontFamily: "OpenSans-Regular",
    borderColor: '#E60965', // Border color
    borderWidth: 1, // Border width
    borderRadius: 10, // Border radius
    paddingLeft: 25,
    marginBottom: 5,
    width: '100%',
    alignSelf: 'center', // Center the input horizontally
    backgroundColor: '#fff',
    alignItems: "center",
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
		marginLeft:-15,
    paddingLeft: 10
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
    marginBottom: 40
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

export default MakeRequestReceipt;