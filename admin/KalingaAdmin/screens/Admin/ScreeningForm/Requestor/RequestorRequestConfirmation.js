import React, { useState } from 'react';
import { ScrollView, Text, View, StatusBar, StyleSheet, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import { globalHeader } from '../../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


const RequestorRequestConfirmation = () => {
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState(null);

    const navigatePage = (Page) => {
        navigation.navigate(Page); // Navigate to the specified screen
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

    return (
        <View style={globalStyles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style={globalHeader.SmallHeader}>
                <Text style={globalHeader.SmallHeaderTitle}>Set Appointment</Text>
            </View>

            <ScrollView overScrollMode='never' nestedScrollEnabled={true}>
                <Text style={styles.title}>Appointment Confirmation</Text>
                <View style={styles.container}>
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Full Name"
                        placeholderTextColor="#E60965"
                    />
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Phone Number"
                        placeholderTextColor="#E60965"
                    />
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Email Address"
                        placeholderTextColor="#E60965"
                    />
                    <TextInput
                        style={styles.BiginputField2}
                        placeholder="Home Address"
                        placeholderTextColor="#E60965"
                    />
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Medical Condition (If Applicable)"
                        placeholderTextColor="#E60965"
                    />
                    <TextInput
                        style={styles.BiginputField}
                        placeholder="Reason for Requesting"
                        placeholderTextColor="#E60965"
                    />

                <View style = {styles. attachmentContainer}>
                        <Text style={styles.label}>
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

                
                    <View style={styles.adminButton}>
                        <TouchableOpacity onPress={() => navigatePage("DonorInitialScreeningFormPage2")}>
                            <View style={styles.approvedButtonContainer}>
                                <Text style={styles.Adminlabel}>Approved</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigatePage("DonorInitialScreeningFormPage2")}>
                            <View style={styles.declinedButtonContainer}>
                                <Text style={styles.Adminlabel}>Decline</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
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
    BiginputField: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E60965',
        paddingVertical: 5,
        paddingHorizontal: 20,
        width: "90%",
        marginVertical: '1.5%',
        color: '#E60965',
    },
    BiginputField2: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E60965',
        paddingVertical: 5,
        paddingHorizontal: 20,
        width: "90%",
        height: 80,
        marginVertical: '1.5%',
        color: '#E60965',
    },
    uploadButton: {
        marginVertical: 10,
        flexDirection:"row",
        backgroundColor: 'white',
        borderColor: '#E60965',
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 20,
        
    },
    uploadText: {
        color: '#E60965',
        fontSize: 15,
        paddingRight: 50
    },
    uploadedImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    adminButton: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    approvedButtonContainer: {
        backgroundColor: '#E60965',
        paddingHorizontal: 37,
        borderRadius: 20,
        paddingVertical: 5,
        marginHorizontal: 10,
    },
    declinedButtonContainer: {
        backgroundColor: '#E60965',
        paddingHorizontal: 37,
        borderRadius: 20,
        paddingVertical: 5,
        marginHorizontal: 10,
    },
    Adminlabel: {
        color: 'white',
        fontFamily: 'Open-Sans-Bold',
        fontSize: 15,
    },
    rowAlignment: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
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
          width: "90%"
      },
  
      label: {
          color: "#E60965",
          fontSize: 15,
          fontFamily: "Open-Sans-SemiBold",
      },
});

export default RequestorRequestConfirmation;
