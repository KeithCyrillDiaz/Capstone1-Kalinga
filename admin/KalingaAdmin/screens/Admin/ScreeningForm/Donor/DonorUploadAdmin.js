
import React, { useState, useEffect } from 'react';
import { ScrollView,Text, View, StyleSheet, TouchableOpacity, Dimensions, Image, Modal, TouchableHighlight, Alert} from 'react-native';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, CommonActions} from '@react-navigation/native'; // Import useRoute hook
import axios from 'axios'; // Import axios for making HTTP requests
import ImageZoom from 'react-native-image-pan-zoom';
import { BASED_URL } from '../../../../MyConstants.js';


const DonorUploadAdmin = ({ route }) => {

  const Applicant_ID = route.params.screeningFormId
  
  const [modalVisible, setModalVisible] = useState(false);
  const [images, setImages] = useState({});
  const [url, setUrl] = useState("");
  const [owner, setOwner] = useState("")

  const navigation = useNavigation();


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

  useEffect(() => {
    // console.log( "ID", Applicant_ID)
    fetchData(); // Fetch data when component mounts
  }, []);

 
  const handleImage = (imageName) => {
    images.forEach(image => {
      if(image.originalname === imageName) {
        setUrl(`${BASED_URL}/kalinga/getImage/${image.filename}`)
      }// Print the originalname property of each image object
      setModalVisible(true)
  });
  }
 
   
    return (
      <View style={globalStyles.container}>
        <ScrollView
        overScrollMode='never' // Disable the over-scroll effect or the Jelly effect when reaching the end of the scroll
        nestedScrollEnabled={true} // Enable nested scrolling
        showsVerticalScrollIndicator={false}
        >
               <View style ={styles.UploadContainer}>
                    <TouchableOpacity
                    style={styles.Uploadbutton}
                    onPress={() =>handleImage('HepaB.png')}
                    >
                    <Text style={styles.UploadbuttonTitle}>View Hepa B Result</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.Uploadbutton}
                    onPress={() => handleImage('HIV.png')}
                  >
                    <Text style={styles.UploadbuttonTitle}>View HIV Result</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.Uploadbutton}
                    onPress={() =>handleImage('Syphillis.png')}

                  >
                    <Text style={styles.UploadbuttonTitle}>View Syphillis Result</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.Uploadbutton}
                    onPress={() =>handleImage('Pregnancy Book.png')}

                  >
                    <Text style={[styles.UploadbuttonTitle]}>View Pregnancy Book</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.Uploadbutton}
                    onPress={() =>handleImage('Government_ID.png')}
                  >
                    <Text style={styles.UploadbuttonTitle}>View Government ID Result</Text>
                  </TouchableOpacity>
               </View>

            <View style ={styles.ButtonContainer}>
                    <TouchableOpacity style={styles.Approvedbutton} onPress={() => approvedUser("AdminApprovedDonor")}>
                        <Text style={styles.ApprovedbuttonTitle}>Approved</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.Declinebutton} onPress={() => declinedUser("AdminDeclinedDonor")}>
                        <Text style={styles.DeclinebuttonTitle}>Decline</Text>
                     </TouchableOpacity>
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
      </View>
        
      )
  }


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

    center: {
      //backgroundColor: "gray",
      alignItems: "center",
      marginTop: "5%"
  },

  tabsTitle: {
   
      color: "#E60965",
      fontFamily: "Open-Sans-Bold",
      fontSize: 20,
      marginHorizontal: 20,
      width: 120,
      textAlign: "center",

  },
  UploadContainer:{
    justifyContent: "center",
    paddingTop: 50
  },

  Uploadbutton: {
    backgroundColor: "white",
    width: 250,
    height: 45,
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

  indicatedTabsTitle:{

      color: "#E60965",
      fontFamily: "Open-Sans-Bold",
      fontSize: 20,
      marginHorizontal: 30,
      width: 100,
      textAlign: "center",
      paddingBottom: 10,
      

  },

  
  indicatedTabsTitle2:{

    color: "#E60965",
    fontFamily: "Open-Sans-Bold",
    fontSize: 20,
    marginHorizontal: 30,
    width: 100,
    textAlign: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#E60965",

},

ButtonContainer:{
    flexDirection: "row",
    justifyContent: "space-evenly",
 

},
    Approvedbutton: {
        backgroundColor: "#E60965",
        width: 100,
        alignSelf: "center",
        marginVertical: 30,
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
        marginVertical: 30,
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

    rectanglesContainer: {
        flexDirection: "row",
        marginTop: "10%",
        //backgroundColor: "red",
        height: 10,
        justifyContent: "center"
    },

    rectangle: {
      width: 50,
      height: 4, 
      backgroundColor: '#FFEECC', // Color for Rectangle F94892
      borderRadius: 10,
      marginHorizontal: 5,
    },

    rectangleIndicator: {
      width: 50,
      height: 4, 
      backgroundColor: '#F94892', // Color for Rectangle F94892
      borderRadius: 10,
      marginHorizontal: 5,
    },

    title: {
      textAlign: 'center', // Center align the text
      marginTop: 20, // Adjust margin top as needed
      fontSize: 20, // Adjust the font size
      fontWeight: 'bold', // Apply bold font weight
      color: '#E60965',
      marginBottom: 20
    },

    note: {
      color: '#E60965',
      fontFamily: "Open-Sans-Light",
      marginBottom: 10,
      fontSize: 13
    },
    
    form: {

      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#E60965',
      height: 210,
      paddingRight: 10,
      marginBottom: 10,
    },

    form2: {

        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E60965',
        height: 170,
        paddingRight: 10,
        marginBottom: 10,
      },

    row: {
      flexDirection: "row"
    },

    rowAlignment: {
      flexDirection: "row",
      alignItems: "center"
    },

    choices: {
      marginLeft: 20,
      marginTop: 10,
      color: "#E60965",
    },

    circle: {

      borderWidth: 1,
      height: 20,
      width: 20,
      marginLeft: 20,
      marginTop: 10,
      borderRadius: 20,
      borderColor: "#E60965",
    },

    question: {
      marginTop: 10,
      color: "#E60965",
      //backgroundColor: "gray",
      width: 220,
      marginLeft: 20,
    }

   

  })
  
export default DonorUploadAdmin;