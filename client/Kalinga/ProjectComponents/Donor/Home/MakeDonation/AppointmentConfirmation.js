    import React, { useState, useEffect} from 'react';
    import { 
      ScrollView, 
      Text, 
      View, 
      StatusBar, 
      StyleSheet, 
      TouchableOpacity, 
      TextInput, 
      Alert,
      Dimensions, 
      Image, 
      Modal, 
      TouchableHighlight
    } from 'react-native';
    import { globalHeader } from '../../../../styles_kit/globalHeader.js';
    import { globalStyles } from '../../../../styles_kit/globalStyles.js';
    import { useNavigation, useRoute } from '@react-navigation/native'; // Correct import
    import { FontAwesome5 } from '@expo/vector-icons';
    import { MaterialIcons } from '@expo/vector-icons';
    import { FontAwesome6 } from '@expo/vector-icons';
    import { format } from 'date-fns';
    import { MaterialCommunityIcons } from '@expo/vector-icons';
    import { BASED_URL } from '../../../../MyConstants.js';
    import { Uploading } from '../../../uploader/Uploading.js';
    import { UploadImageOrFileToFirebase, deleteFolderContents } from '../../../uploader/fireBaseUploader.js'
    import ImageZoom from 'react-native-image-pan-zoom';
    import { AntDesign } from '@expo/vector-icons';
    import axios from 'axios'

    const AppointmentConfirmation = () => {

        const navigation = useNavigation();
        const route = useRoute();
        const { formData, selectedFile, selectedImage } = route.params;
        const [modalVisible, setModalVisible] = useState(false);
        const [selectedImageUrl, setSelectedImageUrl] = useState('');
          //uploaderModal
      const [progressBar, setProgressBar] = useState(0)
      const [uploadingImage, setUploadingImage] = useState(false)
      const [imageUri, setIMageUri] = useState("")
      const [loaderLabel, setLoaderLabel] = useState("")
        
        const navigatePage = (Page) => {
          navigation.navigate(Page, {data: formData})
          return
        };
      
        const confirmation = (status) => {
          if(status === "Confirm"){
            Alert.alert(
              'Confirm Appointment Creation',
              'Are you sure you want to create this appointment?',
              [
                {
                  text: 'Yes',
                  onPress: () => handleAppointmentCreation()
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
                  onPress: () =>  navigatePage("SetAnAppointment")
                },
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
               
              ]
            );
          }
        
        }
        const handleAppointmentCreation = async () => {
        
            try {
              const response = await fetch(`${BASED_URL}/kalinga/createAppointment`,
               {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });
        
              if (!response.ok) {
                throw new Error('Network response was not ok.');
              }
               await handleFileDataUpload()
              navigation.navigate('AppointmentConfirmationMessage'); // Redirect to AppointmentConfirmationMessage
            } catch (error) {
              console.error('Error creating appointment:', error);
            }
          };

          const handleFileDataUpload = async () => {
            try{
                setUploadingImage(true)

                const filesToBeDeleted = formData.userType + "/" + formData.fullName + "/" + "Donate/" + "Files"
                const imagesToBeDeleted = formData.userType + "/" + formData.fullName + "/" + "Donate/" + "Images"
          
              // Delete old files to overwrite
                if(filesToBeDeleted && imagesToBeDeleted){
                  await deleteFolderContents({
                    folderPath: filesToBeDeleted
                  })
                  await deleteFolderContents({
                    folderPath: imagesToBeDeleted
                  })
                }

                const response = await axios.post(`${BASED_URL}/kalinga/deleteFiledata/${formData.Donor_ID}`,
                {purpose: "Donate"}
              )
              console.log(response.data.messages.message)
        

              //upload new files
                for (const key in selectedImage) {
                  const imageData = selectedImage[key];
                  
                await UploadImageOrFileToFirebase({
                  URI: imageData.uri, 
                  requirmentType: imageData.name,
                  purpose: "Donate",
                  type: "Image",
                  userType: "Donor", 
                  userId: formData.Donor_ID,
                  nameOfUser: formData.fullName,
                  percent: setProgressBar, // for uploading with loader
                  setImage: setIMageUri, // for uploading with loader
                  setLabel: setLoaderLabel  // for uploading with loader
                });
                }
        
        
                for (const key in selectedFile) {
                  const fileData = selectedFile[key];
                  
                  await UploadImageOrFileToFirebase({
                    URI: fileData.uri, 
                    requirmentType: fileData.requirementType,
                    purpose: "Donate",
                    type: "File",
                    userType: "Donor", 
                    userId: formData.Donor_ID,
                    nameOfUser: formData.fullName,
                    percent: setProgressBar,// for uploading with loader
                    setImage: setIMageUri, // for uploading modal
                    setLabel: setLoaderLabel // for uploading with loader
                  });
                }
            }catch(error) {
              console.log("ErrorUploading Image", error)
            } finally {
              setUploadingImage(false)
            }
           
     

          }
        return (
          
            <View style={globalStyles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style={globalHeader.SmallHeader}>
                <Text style={globalHeader.SmallHeaderTitle}>Set Appointment</Text>
            </View>

            <ScrollView 
            overScrollMode='never' 
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}>
            {uploadingImage && (
             <Uploading 
             progress={progressBar} 
             Image={imageUri}
             label={loaderLabel}
            //  onClose = {() => setUploadingImage(false)}
            />
          )}
                <Text style={styles.title}>Appointment Confirmation</Text>
               
              {formData && (
                <View style={styles.container}>
                  <TextInput
                    style={[styles.BiginputField, { color: '#E60965' }]}
                    placeholder="Full Name"
                    placeholderTextColor="#E60965"
                    value={`Full Name: ${formData.fullName || ''}`}
                    editable={false}
                  />
                  <TextInput
                    style={[styles.BiginputField, { color: '#E60965' }]}
                    placeholder="Phone Number"
                    placeholderTextColor="#E60965"
                    value={`Phone Number: ${formData.phoneNumber || ''}`}
                    editable={false}
                  />
                  <TextInput
                    style={[styles.BiginputField, { color: '#E60965', paddingVertical: 10 }]}
                    placeholder="Email Address"
                    multiline= {true}
                    placeholderTextColor="#E60965"
                    value={`Email Address: ${formData.emailAddress || ''}`}
                    editable={false}
                  />
                  <TextInput
                    style={[styles.BiginputField, { color: '#E60965' }]}
                    placeholder="Home Address"
                    placeholderTextColor="#E60965"
                    multiline={true}
                    value={`Home Address: ${formData.homeAddress || ''}`}
                    editable={false}
                  />

                  <TextInput
                    style={[styles.BiginputField, { color: '#E60965' }]}
                    placeholder="City"
                    placeholderTextColor="#E60965"
                    value={`City: ${formData.city || ''}`}
                    editable={false}
                  />

                  <TextInput
                    style={[styles.BiginputField, { color: '#E60965' }]}
                    placeholder="Amount of Milk to be Donated"
                    placeholderTextColor="#E60965"
                    value={`Amount of Milk to be Donated: ${formData.milkAmount || ''}` + " ml"}
                    editable={false}
                  />
                  <View>
                        <Text style={[styles.AdminMilkLocation, {marginLeft: "-7%"}]}>Delivery Method</Text>
                    </View>
                    <View style={styles.BiginputField}>
                    <TextInput
                        style={{ flex: 1, color: '#E60965' }} // Set flex to 1 to allow TextInput to take up remaining space
                        placeholder="Location"
                        multiline={true}
                        placeholderTextColor="#E60965"
                        value={formData.method}
                        editable={false}
                    />
                     <MaterialCommunityIcons name="truck-delivery" size={30} style={{flexShrink:0}} color='#E60965' />
                    </View>
                  <View>
                        <Text style={styles.AdminMilkLocation}>Milk Bank Location</Text>
                    </View>
                    <View style={styles.BiginputField}>
                    <TextInput
                        style={{ flex: 1, color: '#E60965' }} // Set flex to 1 to allow TextInput to take up remaining space
                        placeholder="Location"
                        multiline={true}
                        placeholderTextColor="#E60965"
                        value={formData.location || ''}
                        editable={false}
                    />
                    <FontAwesome6 name="hospital" size={24} color="#E60965" style={styles.icon3} />
                    </View>
                    
          {Object.keys(selectedImage).length !== 0  && (
            <View  style = {{
              height: 150,
              marginBottom: 20,
              backgroundColor: "white",
              paddingLeft: 10,
              paddingRight: 10,
              borderColor: "#E60965",
              borderRadius: 15,
              elevation: 7,
              marginTop: 20,
              marginHorizontal: "7%"
              }}>
              <ScrollView 
                showsHorizontalScrollIndicator={true}
                overScrollMode='never'
              horizontal={Object.keys(selectedImage).length >3 }
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
            
           

            {Object.keys(selectedFile).length !== 0 && (
                      <View  style={{ 
                        paddingVertical: 20,
                        borderColor: "#E60965",
                        backgroundColor: "white",
                        width: "90%",
                        borderRadius: 15,
                        elevation: 7,

                        }}>
                          {Object.entries(selectedFile).map(([attachmentType,  file]) => {
                          if (attachmentType !== "uri" && attachmentType !== "type") {
                          return (
                              <View key={attachmentType} 
                              style={{ 
                                flexDirection: "row", 
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingHorizontal: 17,
                                gap:10
                                }}>

                                  <View style = {styles.fileType}>
                                    <Text style = {{color: "#E60965", fontFamily: "Open-Sans-Bold"}}>{attachmentType}: </Text>
                                  </View>
                                  <View style = {styles.fileName}>
                                    <Text style= {{width: 170}}>{file.name}</Text>
                                  </View>
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
             <View style={[styles.AdminButton, {marginBottom: 40}]}>
              <TouchableOpacity onPress={() => confirmation("Confirm")}>
                      <View style={styles.ConfirmbuttonContainer}>
                          <Text style={styles.label}>Confirm</Text>
                      </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => confirmation("Cancel")}>
                      <View style={styles.CancelbuttonContainer}>
                          <Text style={[styles.label, {color: '#E60965'}]}>Cancel</Text>
                      </View>
              </TouchableOpacity>
                </View>
                </View>
              )}
            </ScrollView>
          </View>
        );
      };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        title: {
            textAlign: 'center',
            marginTop: 20,
            fontSize: 20,
            fontWeight: 'bold',
            color: '#E60965',
            marginBottom: 20,
        },
        
        ConfirmbuttonContainer: {
            backgroundColor: '#E60965',
            paddingHorizontal: 37,
            borderRadius: 20,
            paddingVertical: 5,
            marginHorizontal: 10,
            elevation: 7,
            
        },
        CancelbuttonContainer: {
            backgroundColor: 'white',
            paddingHorizontal: 37,
            borderRadius: 20,
            paddingVertical: 5,
            marginHorizontal: 10,
            elevation: 7,
        },
        AdminButton:{
            flexDirection: "row",
            justifyContent:"center",
            marginTop: 20
        },
        label: {
            color: 'white',
            fontFamily: 'Open-Sans-Bold',
            fontSize: 15,
        },
        center: {
            alignItems: 'center',
            marginTop: '5%',
        },
        AdminDate:{
        marginRight: '80%',   
        paddingVertical: 5 ,
        color: '#E60965',
        fontSize: 18
        },
        AdminTime:{
        marginRight: '80%' ,   
        paddingVertical: 5 ,
        color: '#E60965',
        fontSize: 18


        },
        AdminMilkLocation:{
            marginRight: '50%' ,   
        paddingVertical: 5, 
        color: '#E60965',
        fontSize: 18

    
        },
        BiginputField: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor:'white',
            borderRadius: 10,
            borderColor: '#E60965',
            paddingVertical: 5,
            paddingHorizontal: 20,
            width: 320,
            marginBottom: 15,
            elevation: 5
        },
        BiginputFieldHome: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            backgroundColor:'white',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#E60965',
            paddingVertical: 5,
            paddingHorizontal: 20,
            width: 320,
            height: 150,
            marginBottom: 15
        },
        icon: {
            marginLeft: 180 // Adjust the margin right for the icon
        },
        icon2: {
            marginLeft: 200 // Adjust the margin right for the icon
        },
        icon3: {
            marginLeft: 10 // Adjust the margin right for the icon
        },

    });

    export default AppointmentConfirmation;
