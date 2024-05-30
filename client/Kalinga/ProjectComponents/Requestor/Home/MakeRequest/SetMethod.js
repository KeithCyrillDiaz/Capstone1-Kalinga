import React, { useState } from 'react';
import { ScrollView, 
    Text, 
    View, 
    StatusBar, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput, 
    Alert, 
    Platform,
    Modal,
    Image,
    Dimensions,
    TouchableHighlight,
} from 'react-native';
import { globalHeader } from '../../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import { useNavigation, useRoute} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons'; // Import Feather icon from Expo
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import randomatic from 'randomatic';
import { format } from 'date-fns';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import ImageZoom from 'react-native-image-pan-zoom';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ValidIdInfoModal } from "./ValidIdInfoModal.js";


const SetDateTimeLocation = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { formData } = route.params || {};
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedImage, setSelectedImage] = useState({});
    const [selectedFile, setSelectedFile] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');

    //validity
    const [invalidTime, setInvalidTime] = useState(false)
    const [invalidDate, setInvalidDate] = useState(false)

    const [location, setLocation] = useState('');
    const [newForm, setNewForm ] = useState(formData)



    const checkTime = (time) => {

        const timeNow = new Date()
        const dateNow = timeNow.getDate()
        console.log(time)
        console.log(timeNow)
        if(time < timeNow && dateNow >= selectedDate.getDate()) {
        
            console.log("Invalid Time")
            Alert.alert(
                "Invalid Time",
                "Please choose a proper time for your appointment")
                setInvalidTime(true)
            return
        }
        const startingWorkingHours = new Date();
        startingWorkingHours.setHours(8, 0, 0, 0) // set working Time to 8am
        const endingWorkingHours = new Date()
        endingWorkingHours.setHours(17, 0, 0, 0)// set working Time to 5pm

        const checkTimeNow = timeNow.getTime()// for checking current time
        const chosenTime = time.getTime()
        const startingTime = startingWorkingHours.getTime()
        const endingTime = endingWorkingHours.getTime()

        const result = checkTimeNow - endingTime
        console.log("result: ", result)

        // const day = time.getDate()
        // console.log("day: ",day )

        if(chosenTime < startingTime || chosenTime > endingTime ){
            console.log("Milk Banks are not available outside working hours")
            Alert.alert(
                "Milk Banks Availability",
                "Milk Banks are only available during working hours from 8:00 AM to 5:00 PM.")
            setInvalidTime(true)
            return false
        }
        setInvalidTime(false)
        return true
    }
    const checkDate = (date) => {
    
        if (date) {
            const day = date.getDate()
            const dayToday = new Date().getDate()
            if(day < dayToday){
                console.log("Invalid Date")
                Alert.alert(
                    "Invalid Date",
                    "Please choose a proper date for your appointment")
                setInvalidDate(true)
                return
            }
            const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                console.log("Milk Banks are not available during weekends")
                Alert.alert(
                    "Milk Banks Availability",
                    "Milk Banks are only available during weekdays")
                setInvalidDate(true)
                return false
            }   
            setInvalidDate(false)
            return true
        }
    }
    const handleDateChange = (event, selectedDate) => {
      setShowDatePicker(Platform.OS === 'ios');
      checkDate(selectedDate)
      setSelectedDate(selectedDate);
    };
  
    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(Platform.OS === 'ios');
        checkTime(selectedTime)
        setSelectedTime(selectedTime);
    };
    
    const checkForm = () => {
        // console.log("Test", newForm.location
        if (newForm.method === undefined || newForm.method === "") {
            Alert.alert('Missing Information', 'Please input a delivery method.');
            return;
        }
        if(invalidDate) {
            Alert.alert(
                "Milk Banks Availability",
                "Milk Banks are only available during weekdays")
            return
        }
        if(invalidTime){
            Alert.alert(
                "Milk Banks Availability",
                "Milk Banks are only available during working hours from 8:00 AM to 5:00 PM.")
            return
        }
        if(newForm.location === undefined || newForm.location === "") {
            Alert.alert("Invalid Milk Bank", "Please select a milk bank before proceeding.")
            return
        }
        handleAppointmentCreation()
    }
    const handleAppointmentCreation = async () => {
      
        const appointmentData = {
          ...newForm,
          selectedDate: selectedDate.toISOString(),
          selectedTime: selectedTime.toISOString(),
        };
      
        try {
            // Simulate API call or any processing
            console.log('Appointment data:', appointmentData);
            navigation.navigate('MakeRequestUploadMedicalAbstract', { 
                screeningFormData: appointmentData, 
                methodImage: selectedImage || {},
                methodFile:  selectedFile || {}
            });
            return
          } catch (error) {
            console.error('Error creating appointment:', error);
          }
        };

        const handleChange = (name, value) => {
            if(name === "method" && value !== "Authorized Person"){
              setSelectedImage({})
              setSelectedFile({})
            }
            const newData = {
                ...newForm,
                [name]: value
              };
              setNewForm(newData)
          };

          const handleImageUpload = async (attachmentType) => {
            try {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
                    return;
                }
        
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [Dimensions.get('window').width, Dimensions.get('window').height],
                    quality: 1,
                    multiple: true, 
                });
        
                if (!result.canceled && result.assets && result.assets.length > 0) {
                  delete selectedFile[attachmentType]
                    let fileType = ''
                  result.assets.forEach(image => {
        
                    if (image.type === 'image' || !image.type.includes('/')) {
                              fileType = image.type + "/jpeg"
        
                    } else {
        
                      fileType = image.type
        
                    }
                  });
                  setSelectedImage(prevState => ({
                      ...prevState,
                    
                  
                      [attachmentType]: ({
                        uri: result.assets[0].uri,
                        name: attachmentType, 
                        type: fileType,
                        userType: "Requestor",
                        owner: newForm.fullName,
                        ownerID: newForm.Requestor_ID
                    
                      })
                      
                  }));
        
            
              }
                  
                
            } catch (error) {
                Alert.alert('Error', 'Failed to pick an image.');
                console.log(error)
            }
        
            // console.log("selectedImage:", JSON.stringify(selectedImage, null, 2));
        };
        
        
        const handleFileUpload = async (attachmentType) => {
        
          try {
            const result = await DocumentPicker.getDocumentAsync();
            if (!result.canceled && result.assets && result.assets.length > 0) {
              delete selectedImage[attachmentType]
                    if (
                      result.assets[0].mimeType === "application/pdf" ||
                      result.assets[0].mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  ) {
                      if (result.assets[0].mimeType === "application/pdf") {
                          fileName = attachmentType + ".pdf";
                          fileType = result.assets[0].mimeType;
                      } else {
        
                          fileType = "application/docx";
                          fileName = attachmentType + ".docx";
                      }
                  } else {
                      fileName = attachmentType;
                  }
                // Create a new object to hold the updated selected file state
                const updatedSelectedFile = {
                    ...selectedFile,
                    [attachmentType]: {
                        // name: screeningFormData.fullName + "_" + attachmentType + result.assets[0].type,
                        name: result.assets[0].name,
                        uri: result.assets[0].uri,
                        type: fileType,
                        userType: "Requestor",
                        owner: newForm.fullName,
                        size: result.assets[0].size,
                        requirementType: attachmentType,
                        ownerID: newForm.Requestor_ID
                    }
                };
                // Update the selectedFile state
                setSelectedFile(updatedSelectedFile);
          
           
        
                // console.log("updatedSelectedFile:", updatedSelectedFile)
            }
        }catch (error) {
              Alert.alert('Error', 'Failed to pick a file.');
            }
        };
        
    return (
        <View style={globalStyles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style={globalHeader.SmallHeader}>
                <Text style={globalHeader.SmallHeaderTitle}>Set Appointment</Text>
            </View>

            <ScrollView overScrollMode='never' nestedScrollEnabled={true}>
                <View style={styles.container}>
                    
                    <Text style={[styles.AdminDate,{width: "100%", marginLeft: 5,}]}>Obtaining Method</Text>
                    <View style={styles.BiginputField}>
                        <Picker
                        selectedValue={newForm.method}
                        style={{ height: 30, width: "90%", color: '#E60965'}}
                        onValueChange={(itemValue) =>
                        handleChange("method", itemValue)
                        }
                        >
                        <Picker.Item label="Method of Obtaining" value="" />
                        <Picker.Item label="Authorized Person" value="Authorized Person" />
                        <Picker.Item label="Self Pick-up" value="Self Pick-up" />
                    </Picker>
                        <MaterialCommunityIcons name="truck-delivery" size={30} style={{flexShrink:0}} color='#E60965' />
                    </View>
                    
           

                    {/* <Text style={[styles.AdminDate,{width: "100%", marginLeft: 5,}]}>Method of Delivery</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    
                    <View style={styles.BiginputField}>
                    <TextInput
                    style={styles.inputText}
                    placeholder="MM/DD/YYYY"
                    placeholderTextColor="#E60965"
                    value={format(selectedDate, 'MM/dd/yyyy')}
                    editable={false}
                     />
                    <FontAwesome5 name="calendar-alt" size={20} color="#E60965" style={styles.icon} />
                                
                    </View>

                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )} */}

                    {/* <View>
                        <Text style={styles.AdminTime}>Choose Time</Text>
                    </View>

                    <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                        <View style={styles.BiginputField}>
                        <TextInput
                        style={styles.inputText}
                        placeholder="HH:MM"
                        placeholderTextColor="#E60965"
                        value={format(selectedTime, 'HH:mm')}
                        editable={false}
                        />
                        <MaterialIcons name="access-time" size={24} color="#E60965" style={styles.icon2} />
                        </View>
                    </TouchableOpacity>

                    {showTimePicker && (
                        <DateTimePicker
                            value={selectedTime || new Date()}
                            mode="time"
                            display="default"
                            onChange={handleTimeChange}
                        />
                    )} */}

                    <Text style={[styles.AdminMilkLocation]}>Milk Bank Location</Text>
                    <View style={[styles.BiginputField, {paddingLeft: 0,}]}>
                         <Picker
                            selectedValue={newForm.location}
                            style={{ height: 30, width: "90%", color: '#E60965', fontFamily: "Kurale"}}
                            onValueChange={(itemValue) =>
                            handleChange("location", itemValue)
                            }
                            >
                            <Picker.Item label="Select Milk Bank" value="" />
                            <Picker.Item 
                                label="Quezon City General Hospital - Human Milk Bank" 
                                value="Quezon City General Hospital - Human Milk Bank" 
                            />
                        </Picker>
                        <FontAwesome6 name="hospital" size={24} color="#E60965" style={styles.icon3} />
                    </View>
            
            {newForm.method === "Authorized Person" && (
                <>
                  <Text style={[styles.AdminMilkLocation, {width: "70%", marginRight:0, alignSelf: "flex-start"}]}>Authorized Person's ID</Text>
                <Text style ={{fontFamily: "Open-Sans-Regular", color: "#E60965", marginBottom: 7}}> Note: Make sure the images are clear</Text>
                 <View style = {styles. attachmentContainer}>
                <Text style={styles.newLabel}>
                  Authorized Person's ID
                </Text>
                  <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <View style={styles.iconContainer}>
                      <TouchableOpacity style = {{ backgroundColor: "pink", padding:4, borderRadius: 7}} onPress={()=>handleImageUpload("Authorized Person's ID")}>
                        <AntDesign name="picture" size={27} color="#E60965" />
                      </TouchableOpacity>
                        <Text style={styles.verticalLine}>|</Text>
                        <TouchableOpacity style = {{ backgroundColor: "pink", padding: 5, borderRadius: 7}} onPress={()=>handleFileUpload("Authorized Person's ID")}>
                        <AntDesign name="file1" size={24} color="#E60965" />
                      </TouchableOpacity>
                  </View>
                    
                </View>
            </View>

            <View style = {styles. attachmentContainer}>
                <Text style={styles.newLabel}>
                    Authorized Letter
                </Text>
                  <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <View style={styles.iconContainer}>
                      <TouchableOpacity style = {{ backgroundColor: "pink", padding:4, borderRadius: 7}} onPress={()=>handleImageUpload('Authorized Letter')}>
                        <AntDesign name="picture" size={27} color="#E60965" />
                      </TouchableOpacity>
                        <Text style={styles.verticalLine}>|</Text>
                        <TouchableOpacity style = {{ backgroundColor: "pink", padding: 5, borderRadius: 7}} onPress={()=>handleFileUpload('Authorized Letter')}>
                        <AntDesign name="file1" size={24} color="#E60965" />
                      </TouchableOpacity>
                  </View>
                    
                </View>
                
            </View>
                </>
            )}
           
        
            {Object.keys(selectedImage).length !== 0 && (
                  <View  style = {{
                    marginBottom: 20,
                    backgroundColor: "white",
                    paddingLeft: 10,
                    paddingRight: 10,
                    borderColor: "#E60965",
                    borderRadius: 15,
                    elevation: 5,
                    marginTop: 20,
                    marginHorizontal: "5%",
                    alignItems: "center",
                    paddingBottom: 20,
                    paddingTop: 10,
                    height: 170,
                    width: "85%"
                    }}>
                    <ScrollView 
                      showsHorizontalScrollIndicator={true}
                      overScrollMode='never'
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

            {Object.keys(selectedFile).length !==0 && (
            <View  style={{ 
              paddingVertical: 20,
              borderColor: "#E60965",
              backgroundColor: "white",
              width: "80%",
              borderRadius: 15,
              elevation: 7,
              alignSelf: "center",
              alignItems: "center",
              marginTop: 10
              }}>
                {Object.entries(selectedFile).map(([attachmentType,  file]) => {
                if (attachmentType !== "uri" && attachmentType !== "type") {
                return (
                    <View key={attachmentType} 
                    style={{ 
                      flexDirection: "row",      
                      width: "90%",
                      marginVertical: 10,
                      gap: 10
                      }}>
                      <Text style = {{textAlign: "left", fontWeight: "bold", width: 100, color: "#E60965",}}>{attachmentType} </Text>
                      <Text style= {{flex: 1}}>{file.name}</Text>

                    </View>
                );
                }
                return null; // Return null for other entries
                })}

              </View>
                        )}

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

                                <TouchableOpacity 
                                disabled={newForm.method === "Authorized Person" && Object.keys(selectedImage).length + Object.keys(selectedFile).length < 2}
                                onPress={() => checkForm()}>
                                    <View 
                                    style={[styles.buttonContainer,
                                    {
                                        opacity: newForm.method === "Authorized Person" && Object.keys(selectedImage).length + Object.keys(selectedFile).length < 2 ? 0.5 :1
                                    }]}>
                                        <Text style={styles.label}>Next</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
            </ScrollView>
        </View>
    );
};
export default SetDateTimeLocation;


const styles = StyleSheet.create({

    rowAlignment: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      },
      attachmentContainer: {
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        borderColor: "#E60965",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 17,
        width: "90%",
        alignSelf: "center",
        elevation:7
    },
  
      newLabel: {
        color: "#E60965",
        fontSize: 15,
        fontFamily: "Open-Sans-SemiBold",
    },
  
    iconContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 5,
      marginLeft: 10,
    },
  
    verticalLine: {
      fontSize: 37,
      marginTop: -10,
      color: "#E60965",
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputText: {
        color: '#E60965',
        fontFamily:"Kurale"
    },
    title: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E60965',
        marginBottom: 20,
    },
  
    buttonContainer: {
        backgroundColor: '#E60965',
        paddingHorizontal: 15,
        borderRadius: 20,
        paddingVertical: 5,
        marginHorizontal: 5,
        width: 120,
        alignSelf:"center",
        marginVertical: 20
    },
    label: {
        color: 'white',
        fontFamily: 'Open-Sans-Bold',
        fontSize: 15,
        alignSelf: "center"
    },
    center: {
        alignItems: 'center',
        marginTop: '5%',
    },
    AdminDate:{
    marginTop: 50,  
    paddingVertical: 15 ,
    color: '#E60965',
    fontSize: 25,
    fontWeight: "bold"
    },

    AdminTime:{
     marginRight: '60%' ,   
    paddingVertical: 15 ,
    color: '#E60965',
    fontSize: 25,
    fontWeight: "bold"



    },
    AdminMilkLocation:{
        marginRight: '40%' ,   
       paddingVertical: 15, 
       color: '#E60965',
       fontSize: 25,
       fontWeight: "bold"

       },
       BiginputField: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'white',
        borderRadius: 17,
        paddingVertical: 7,
        paddingHorizontal: 20,
        width: 320,
        marginBottom: 40,
        elevation: 5,

    },
    icon: {
        marginLeft: 180 // Adjust the margin right for the icon
    },
    icon2: {
        marginLeft: 220 // Adjust the margin right for the icon
    },
    icon3: {
        marginLeft: 10 // Adjust the margin right for the icon
    },
});

