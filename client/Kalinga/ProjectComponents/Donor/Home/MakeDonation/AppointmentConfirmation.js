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
    } from 'react-native';
    import { globalHeader } from '../../../../styles_kit/globalHeader.js';
    import { globalStyles } from '../../../../styles_kit/globalStyles.js';
    import { useNavigation, useRoute } from '@react-navigation/native'; // Correct import
    import { FontAwesome5 } from '@expo/vector-icons';
    import { MaterialIcons } from '@expo/vector-icons';
    import { FontAwesome6 } from '@expo/vector-icons';
    import { format } from 'date-fns';
    import { BASED_URL } from '../../../../MyConstants.js';


    const AppointmentConfirmation = () => {

        const navigation = useNavigation();
        const route = useRoute();
        const { formData } = route.params || {};
        
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
        
              navigation.navigate('AppointmentConfirmationMessage'); // Redirect to AppointmentConfirmationMessage
            } catch (error) {
              console.error('Error creating appointment:', error);
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
                    <FontAwesome6 name="hospital" size={24} color="#E60965" style={styles.icon3} />
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
