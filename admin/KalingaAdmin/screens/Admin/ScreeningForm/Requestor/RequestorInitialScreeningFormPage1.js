import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, ScrollView, Modal, Image, Dimensions, TouchableHighlight, Alert } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';

import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ImageZoom from 'react-native-image-pan-zoom';
import { BASED_URL } from '../../../../MyConstants.js';

const Tab = createMaterialTopTabNavigator();





export const FirstScreen = ({route}) => {
    
    const Applicant_ID = route.params.screeningformId
    // console.log("FS id: ", Applicant_ID)
    const [screeningFormID, setScreeningFormID] = useState({})
    const navigation = useNavigation();

    useEffect(()=>{
       
        const fetchscreeningForm = async () => {
           try {
                const response = await axios.get(`${BASED_URL}/kalinga/getScreeningFormsRequestorApplicant_ID/${Applicant_ID}`)
                // console.log( "test", response.data.screeningForm)
                setScreeningFormID(response.data.screeningForm)
                // console.log("ScreeningFormID: ", screeningFormID)

           } catch(error) {

           }

        }
        fetchscreeningForm();
    },[])

    return (
        <ScrollView
         contentContainerStyle={styles.scrollContainer}
         overScrollMode='never'
         >
            <View style={styles.tabContent}>
            <Text style = {styles.title}>Initial Screening Form</Text>
            {/* <Text style = {styles.title}>{EXPO_IP_ADDRESS}</Text> */}

           

            <View style = {styles.screeningFormcontainer}>

                <Text style = {[
                    globalStyles.titleParagraph, {alignSelf: "flex-start",
                    }]}>Personal Information
                </Text>

                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Full Name"
                        placeholderTextColor="#E60965"
                        value={"Name: " + screeningFormID.fullName}
                        editable={false}
                    />
                    <View style = {styles.flex_Row}>
                        <TextInput
                            style={styles.ageInputField}
                            placeholder="Age"
                            placeholderTextColor="#E60965"
                            value={"Age: " + screeningFormID.Age}
                            editable={false}
                        />
                        <TextInput
                            style={styles.birthDateInputField}
                            placeholder="Birth Date"
                            placeholderTextColor="#E60965"
                            value={"Birthday: " + screeningFormID.birthDate}
                            editable={false}
                        />
                    </View>
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Email Address"
                        placeholderTextColor="#E60965"
                        value={"Email: " + screeningFormID.email}
                        editable={false}
                    />
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Contact Number"
                        placeholderTextColor="#E60965"
                        value={"Contact Number: " + screeningFormID.contactNumber}
                        editable={false}
                    />
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Home Address"
                        placeholderTextColor="#E60965"
                        value={"Address: " + screeningFormID.homeAddress}
                        editable={false}
                    /> 

                <Text style = {[
                    globalStyles.titleParagraph, {alignSelf: "flex-start"
                    }]}>Infant Information

                </Text>
                    <View style = {styles.flex_Row}>

                    <TextInput
                        style={styles.birthDateInputField}
                        placeholder="Birthdate"
                        placeholderTextColor="#E60965"
                        value={"Birthday: " + screeningFormID.childBirthDate}
                        editable={false}
                    />
                    
                    <TextInput
                        style={styles.childSexInputField}
                        placeholder="Sex"
                        placeholderTextColor="#E60965"
                        value={"Sex: " + screeningFormID.sex}
                        editable={false}
                    />
                    </View>

                    <View style = {styles.flex_Row}>

                    <TextInput
                        style={styles.ageInputField}
                        placeholder="Age"
                        placeholderTextColor="#E60965"
                        value={"Age: " + screeningFormID.childAge}
                        editable={false}
                    />

                    <TextInput
                        style={styles.birthDateInputField }
                        placeholder="Birth Weight"
                        placeholderTextColor="#E60965"
                        value={"Birth Weight: " + screeningFormID.birthWeight}
                        editable={false}
                    />
                   
                   
                    </View>
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Age of Gestation"
                        placeholderTextColor="#E60965"
                        value={"Age of Gestation: " + screeningFormID.ageOfGestation}
                        editable={false}
                    />
                </View>


            </View>

           
    </ScrollView>
    );
};

export const SecondScreen = ({route}) => {

    const Applicant_ID = route.params.screeningformId
    const navigation = useNavigation();

    const [medicalAbstractForm, setMedicalAbstractForm] = useState({})
    const [modalVisible, setModalVisible] = useState(false);
    const [images, setImages] = useState({})
    const [url, setUrl] = useState("")
    const [owner, setOwner] = useState("")

    const fetchData = async () => {
        try {
  
            const response = await axios.get(`${BASED_URL}/kalinga/getMedicalRequirementImage/${Applicant_ID}`);
            const result = response.data.image
            // console.log('result: ', result)
            setImages(result)
            setOwner(result[0].owner)
            
           
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    const handleImage = (imageName) => {
        images.forEach(image => {
          if(image.originalname === imageName) {
            setUrl(`${BASED_URL}/kalinga/getImage/${image.filename}`)
          }// Print the originalname property of each image object
          setModalVisible(true)
      });
      }


    const fetchMedicalAbstract = async () => {
        const response = await axios.get(`${BASED_URL}/kalinga/getMedicalAbstractByID/${Applicant_ID}`)
        setMedicalAbstractForm(response.data.medicalAbstract)
       
    }

    useEffect(() => {
        fetchMedicalAbstract();
        fetchData();
    },[])

    const approvedUser = (Page) => {

        Alert.alert(
          'Confirmation',
          `Are you sure you want to approve ${owner} as donor?`,
          [
            {
              text: 'No',
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () =>  navigatePage(Page, owner), // Call a function when "Yes" is pressed
            },
          ],
          { cancelable: false }
        );
      };
  
     
  
      const declinedUser = (Page) => {
  
        Alert.alert(
          'Confirmation',
          `Are you sure you want to decline ${owner} as donor?`,
          [
            {
              text: 'No',
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => navigatePage(Page, owner), // Call a function when "Yes" is pressed
            },
          ],
          { cancelable: false }
        );
      };
  
      const navigatePage = (Page, owner) => {
        // Navigate to the next screen by route name
        navigation.dispatch(
          CommonActions.reset({
            index: 0, //Reset the stack to 0 so the user cannot go back
            routes: [{ name: Page, params: owner }], // Replace 'Login' with the name of your login screen
          })
        );
      }
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style = {styles.Medicalcontainer}>
                <View style={styles.tabContent}>
                    <Text style = {styles.title}>Medical Abstract of Infant</Text>
                </View>
                
                <View style = {globalStyles.flex_start1}>
                    <Text style = {globalStyles.titleParagraph}>Clinical History</Text>
                </View>
                        <TextInput
                            style={styles.BiginputField1}
                            value={medicalAbstractForm.clinicalHistory}
                            editable={false}
                        />         

                <View style = {globalStyles.flex_start1}>
                    <Text style = {globalStyles.titleParagraph}>Presenting Complaint</Text>
                </View>
                        <TextInput
                            style={styles.BiginputField1}
                            value={medicalAbstractForm.complaint}
                            editable={false}
                        />         
         

                <View style = {globalStyles.flex_start1}>
                    <Text style = {globalStyles.titleParagraph}>Clinical Findings</Text>
                </View>
                        <TextInput
                            style={styles.BiginputField1}
                            value={medicalAbstractForm.clinicalFindings}
                            editable={false}
                        />         

                <View style = {globalStyles.flex_start1}>
                    <Text style = {globalStyles.titleParagraph}>Diagnostics</Text>
                </View>
                        <TextInput
                            style={styles.BiginputField1}
                            value={medicalAbstractForm.diagnosis}
                            editable={false}
                        />         

                <View style = {globalStyles.flex_start1}>
                    <Text style = {globalStyles.titleParagraph}>Treatment and Interventions</Text>
                </View>
                        <TextInput
                            style={styles.BiginputField1}
                            value={medicalAbstractForm.treatment}
                            editable={false}
                        />         
                <View style ={styles.UploadContainer}>
                        <TouchableOpacity
                        style={styles.Uploadbutton}
                        onPress={() =>handleImage('Government_ID.png')}
                        >
                        <Text style={styles.UploadbuttonTitle}>View Government ID</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.Uploadbutton}
                        onPress={() => handleImage('Prescription.png')}
                    >
                        <Text style={styles.UploadbuttonTitle}>View Prescription</Text>
                    </TouchableOpacity>

                </View>
               

                <View style={styles.AdminButton}>
                        <TouchableOpacity onPress={() => approvedUser("AdminApprovedRequestor")}>
                            <View style={styles.Approvedbutton}>
                                <Text style={styles.ApprovedbuttonTitle}>Approve</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => declinedUser("AdminDeclinedRequestor")}>
                            <View style={styles.Declinebutton}>
                                <Text style={styles.DeclinebuttonTitle}>Decline</Text>
                            </View>
                        </TouchableOpacity>
                </View>
            </View>

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
                          source={{ uri: url}}
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

            
        </ScrollView>
    );
};
export const RequestorInitialScreeningFormPage1 = ({route}) => {

    const screeningformId = route.params
   

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Requestor Verification</Text>
            </View>

            <Tab.Navigator
                tabBarOptions={{
                    labelStyle: {
                        fontSize: 16,
                        fontWeight: 'bold',
                    },
                    style: {
                        backgroundColor: '#FFF8EB',
                    },
                    indicatorStyle: {
                        backgroundColor: '#E60965',
                    },
                }}
            >
                <Tab.Screen name="Screening Form" component={FirstScreen} initialParams={{screeningformId} } />
                <Tab.Screen name="Medical Requirements" component={SecondScreen} initialParams={{screeningformId}} />
            </Tab.Navigator>
        </SafeAreaView>
    );
}; 



const styles = StyleSheet.create({

    
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      
    },
    modalContent: {
        width: '80%',
        aspectRatio: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },

    UploadContainer:{
        justifyContent: "center",

      },
    
      Uploadbutton: {
        backgroundColor: "white",
        width: 250,
        height: 40,
        alignSelf: "center",
        marginVertical: 10,
        paddingVertical: 10,
        borderRadius: 10,
        borderColor: "#E60965",
        borderWidth: 1
      },
    
      UploadbuttonTitle: {
        color: "#E60965",
        textAlign: "center",
        fontSize: 15,
        fontFamily: "Open-Sans-SemiBold",
      },
    

    flex_Row: {
        width: "95%",
        flexDirection: "row",
        justifyContent: "space-between",

    },
    scrollContainer: {
        backgroundColor: '#FFF8EB',
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent:"center",
        // backgroundColor: "pink"
    },

    screeningFormcontainer: {
        // backgroundColor: "pink",
        flex: 1,
        marginHorizontal: "10%",
        alignItems: "center"
    },

    Medicalcontainer:{
        flex: 1,
        // backgroundColor: 'pink',
        justifyContent:"center",
        alignSelf: "center",

    },
    header: {
        backgroundColor: '#E60965',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 30,
        alignItems: 'center',
        marginTop: 30,
        paddingVertical: 20
    },
    headerTitle: {
        fontFamily: 'Kurale',
        fontSize: 20,
        color: 'white',
        justifyContent: "center",
    },
    menuIcon: {
        marginLeft: 20,
        marginRight: 20,
    },
    tabContent: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF8EB',
    },
    container: {
        flex: 1,
    },

    text: {
        fontFamily: "Open-Sans-Regular",
        fontSize: 15,
        textAlign: "justify",
        marginTop: "5%",
    },

    BiginputField1: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#E60965",
        paddingVertical: 5,
        paddingLeft: 15,
        width: 300,
        marginVertical: 10,
        color: "#E60965",
        backgroundColor: "white"
    },
    
    BiginputField: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#E60965",
        paddingVertical: 5,
        paddingLeft: 15,
        width: 300,
        marginVertical: 10,
        color: "#E60965",
        backgroundColor: "white"

    },

    ageInputField:{
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#E60965",
        paddingVertical: 5,
        paddingLeft: 15,
        width: 90,
        marginVertical: 10,
        justifyContent: "center",
        color: "#E60965",
        backgroundColor: "white",
    },

    birthDateInputField :{
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#E60965",
        paddingVertical: 5,
        paddingLeft: 15,
        width: 190,
        marginVertical: 10,
        justifyContent: "center",
        color: "#E60965",
        backgroundColor: "white",  
    },

    childSexInputField: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#E60965",
        paddingVertical: 5,
        paddingLeft: 15,
        width: 100,
        marginVertical: 10,
        justifyContent: "center",
        color: "#E60965",
        backgroundColor: "white",
    },

    SmallinputField: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#E60965",
        paddingVertical: 5,
        paddingLeft: 15,
        width: 130,
        marginVertical: 10,
        justifyContent: "center",
        color: "#E60965",
        backgroundColor: "white",
    },
    title:{
        color: "#E60965",
        fontWeight: "bold",
        marginVertical: 20,
        fontSize: 20

    },

    AdminButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        justifyContent: "space-evenly",
        marginVertical: 20,
    },

    Approvedbutton: {
        backgroundColor: "#E60965",
        width: 100,
        alignSelf: "center",

        paddingVertical: 7,
        borderRadius: 30,
      },
  
      ApprovedbuttonTitle: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 15,
        fontFamily: "Open-Sans-SemiBold",
      },

      Declinebutton: {
        backgroundColor: "white",
        width: 100,
        alignSelf: "center",
        paddingVertical: 7,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#E60965"
      },
  
      DeclinebuttonTitle: {
        color: "#E60965",
        textAlign: "center",
        fontSize: 15,
        fontFamily: "Open-Sans-SemiBold",
      },

});

export default RequestorInitialScreeningFormPage1;