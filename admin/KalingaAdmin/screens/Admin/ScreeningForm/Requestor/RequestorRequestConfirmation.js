import React, { useState, useEffect} from 'react';
import { ScrollView, Text, View, StatusBar, StyleSheet, TouchableOpacity, Image, Alert, TextInput, SafeAreaView } from 'react-native';
import { globalHeader } from '../../../../styles_kit/globalHeader.js';
import axios from 'axios'; // Import axios
import { BASED_URL } from '../../../../MyConstants.js';
import { useNavigation, useRoute, useFocusEffect} from '@react-navigation/native'; // Import useRoute hook


const RequestorRequestConfirmation = () => {
    const route = useRoute();
    const RequestID = route.params;
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false); // Add this line to define isLoading state



    const [formData, setFormData] = useState({});

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASED_URL}/kalinga/getRequestByID/${RequestID.formData}`);
            const data = response.data.Request;
            
            // Log fetched data and up formData state
            // console.log('Fetched Data:', data);
            setFormData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const handleApproveButtonPress = async () => {
      Alert.alert(
        'Are you sure you want to approve this request?',
        'Once approved, the request process will proceed.',
        [
            
            {
                text: 'Yes',
                onPress: async () => {
                    try {
                        setIsLoading(true);
                        await axios.put(`${BASED_URL}/kalinga/updateRequestStatus/${RequestID.formData}`, {
                          RequestStatus: 'Approved',
                        });
                        fetchData(); // Assuming fetchData updates the data in your component
                        navigation.navigate('RequestConfirm');
                    } catch (error) {
                        console.error('Error updating donation status:', error.response);
                    } finally {
                        setIsLoading(false);
                    }
                },
            },

            {
                text: 'No',
                style: 'cancel',
            },
        ],
        { cancelable: false },
        
    );
};
    
    const handleDeclineButtonPress = async () => {
      Alert.alert(
        'Are you sure you want to decline this request?',
        'Once declined, the request process will not proceed.',
        [
            
            {
                text: 'Yes',
                onPress: async () => {
                    try {
                        setIsLoading(true);
                        await axios.put(`${BASED_URL}/kalinga/updateRequestStatus/${RequestID.formData}`, {
                          RequestStatus: 'Decline',
                        });
                        fetchData(); // Assuming fetchData updates the data in your component
                        navigation.navigate('RequestDecline');
                    } catch (error) {
                        console.error('Error updating donation status:', error.response);
                    } finally {
                        setIsLoading(false);
                    }
                },
            },

            {
                text: 'No',
                style: 'cancel',
            },
        ],
        { cancelable: false },
        
    );
}; 

useFocusEffect(
    React.useCallback(() => {
        fetchData();
    }, [])
)
    // useEffect(() => {
    //     fetchData();
    // }, []);

    console.log('FormData:', formData); // Log formData state

   
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
                                <Text style={styles.boxLabel}>Full Name: </Text>
                                <Text style={[styles.boxContent, styles.limitText]}>{formData.fullName}</Text>
                            </View>
                        </View>


                <View style={styles.boxContainer}>
                    <View style={styles.boxContentContainer}>
                    <Text style={styles.boxLabel}>Phone Number: </Text>
                    <Text style={[styles.boxContent, styles.limitText]}>{formData.phoneNumber}</Text>
                    </View>
                </View>

                <View style={[styles.boxContainer, {height: 60}]}>
                    <View style={styles.boxContentContainer}>
                    <Text style={styles.boxLabel}>Email Address: </Text>
                    <Text style={[styles.boxContent, styles.limitText]}>{formData.emailAddress}</Text>
                    </View>
                </View>

                <View style={[styles.boxContainer2, {height: 80}]}>
                    <View style={styles.boxContentContainer}>
                    <Text style={styles.boxLabel}>Home Address: </Text>
                    <Text style={[styles.boxContent, styles.limitText]}>{formData.homeAddress}</Text>
                    </View>
                </View>

                <View style={[styles.boxContainer2, {height: 50}]}>
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

                <View style={[styles.bodyForm1, {width: "100%", paddingHorizontal: "6%"}]}>
                    <TextInput
                        style={[styles.form3, { color: '#E60965', width: "100%", fontWeight: "bold", paddingLeft: 20,}]}
                        value={"Amount of milk to be requested: " + formData.milkAmount + " ml" }               
                        placeholderTextColor="#E60965"
                        editable={false}
                    />
                </View>
                <View style={styles.form4}>
                    <Text style={styles.boxLabel}>Baby Category: </Text>
                    <Text style={[styles.boxContent, styles.limitText]}>{formData.BabyCategory}</Text>
                </View>
             

                <View style={[styles.boxContainer2, {marginVertical: 10, width: "90%"}]}>
                    <View style={styles.boxContentContainer}>
                    <Text style={styles.boxLabel}>Reason for Requesting: </Text>
                    <Text style={[styles.boxContent, styles.limitText]}>{formData.ReasonForRequesting}</Text>
                    </View>
                </View>
                <View style={[styles.boxContainer2, {marginVertical: 10, width: "90%", height: 100}]}>
                    <View style={styles.boxContentContainer}>
                    <Text style={styles.boxLabel}>Submission Date: </Text>
                    <Text style={[styles.boxContent, styles.limitText,]}>{formData.Date}</Text>
                    </View>
                </View>

                {/* <Text style={styles.bodyNote}>Note: Maximum of 3 images or files per field.</Text>

                <View style={styles.attachmentContainer}>
                    <Text style={styles.labelPicture}>Prescription.jpg</Text>
                    <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <TouchableOpacity onPress={handleImageUpload} style={styles.iconContainer}>
                        <AntDesign name="picture" size={27} color="#E60965" />
                        <Text style={styles.verticalLine}>|</Text>
                        <AntDesign name="file1" size={24} color="#E60965" />
                    </TouchableOpacity>
                    </View>
                </View>

                {selectedImage && (
                    <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
                )} */}
                             {formData.RequestStatus === 'Pending' && ( // Only render buttons if DonationStatus is 'Pending'
                        <View style={[styles.AdminButton, {marginBottom: 40}]}>
                            <TouchableOpacity onPress={() => handleApproveButtonPress(RequestID)}>
                                <View style={styles.ApprovebuttonContainer}>
                                    <Text style={styles.label}>Approve</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDeclineButtonPress(RequestID)}>
                                <View style={styles.DeclinebuttonContainer}>
                                    <Text style={styles.label}>Decline</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
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
    flexDirection: "row",
    alignSelf:"center"
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


  bodyForm2:{
    flexDirection: "row",
    alignSelf:"center",
    paddingLeft: 55
  },
  form4:{
    height: 40,
    paddingTop: 4,
    fontFamily: "OpenSans-Regular",
    borderColor: '#E60965', // Border color
    borderWidth: 1, // Border width
    borderRadius: 10, // Border radius
    paddingHorizontal: 10,
    marginBottom: 5,
    width: '89%',
    alignSelf: 'center', // Center the input horizontally
    backgroundColor: '#fff',
    flexDirection: "row",
    paddingLeft: 25,
    marginVertical: 10
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

    
ApprovebuttonContainer: {
    backgroundColor: '#E60965',
    paddingHorizontal: 37,
    borderRadius: 20,
    paddingVertical: 5,
    marginHorizontal: 10

    
},
DeclinebuttonContainer: {
    backgroundColor: '#E60965',
    paddingHorizontal: 37,
    borderRadius: 20,
    paddingVertical: 5,
    marginHorizontal: 10

 
},
AdminButton:{
    flexDirection: "row",
    justifyContent:"center",
    marginTop: 20
},

});


export default RequestorRequestConfirmation;
