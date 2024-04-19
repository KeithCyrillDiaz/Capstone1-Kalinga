import React  from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, ScrollView, StatusBar, BackHandler, Alert } from 'react-native'; // Import Dimensions
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { globalHeader } from '../../../../styles_kit/globalHeader';
import { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { BASED_URL } from '../../../../MyConstants';

// const expoIpAddress = process.env.EXPO_IP_ADDRESS;
// if(expoIpAddress === "") console.log("empty")
const expoIpAddress = "192.168.1.3";

const SearchBar = () => {
    return (
        <View style={styles.searchContainer}>
            <Feather name="search" size={24} color="black" style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Search Donors"
                placeholderTextColor="#777"
            />
        </View>
    );
};

const UserVerification = () => {
  const navigation = useNavigation();

  const [screeningForms, setScreeningForms] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchScreeningFormIDs = async () => {
      try {
          setIsLoading(true)
          const response = await axios.get(`${BASED_URL}/kalinga/getScreeningFormsUserType/Donor`);
          // console.log(response.data.screeningForms); 
          // 
          setScreeningForms(response.data.screeningForms)// Check if data is received

      } catch (error) {
          console.error("Error fetching screening form IDs:", error);
      } finally{
          setIsLoading(false)
      }
  };
  

  useEffect(() => {
    fetchScreeningFormIDs();

    const backAction = () => {
      // Navigate to the Admin Menu screen
      navigation.dispatch(
        CommonActions.reset({
          index: 1, // Reset the stack to index 1, leaving the first screen behind
          routes: [{ name: "AdminMenu" }], // Navigate to DonorUserVerification screen
        })
      );
      // Prevent default back behavior
      return true;
    };
  
    // Add event listener for hardware back button press
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
  
    // Clean up event listener on component unmount
    return () => backHandler.remove();
}, []);

const DeleteAlert = (name, userID) => {
  Alert.alert(
      'Confirmation',
      `Are you sure you want to DELETE ${name}'s application form?`,
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () =>  DeleteUser(userID), // Call a function when "Yes" is pressed
        },
      ],
      { cancelable: false }
    );
}

const DeleteUser = async (userID) => {
  const result = await axios.delete(`${BASED_URL}/kalinga/deleteScreeningFormByID/${userID}`)
  fetchScreeningFormIDs();
}

const handleViewPress = (Applicant_ID) => {
  navigation.navigate('DonorInitialScreeningFormPage1',  Applicant_ID );
};
  return (
            <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style={globalHeader.SmallHeader}>
                <Text style={globalHeader.SmallHeaderTitle}>Donor Verification</Text>
            </View>
            <SearchBar /> 
            <View styles={styles.title}>
                <Text style={styles.titleText}>Pendings</Text>
            </View>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
          {screeningForms.map((form, index) => (
                  <View key={index} style={styles.DonorContainer}>
                      <View style={styles.milkBankContainer}>
                          <View style={styles.milkBank}>
                              <FontAwesome name="user-circle-o" size={50} color="#E60965" />
                          </View>
                      </View>
                      <View style={styles.InfoContainer}>
                          <Text style={styles.MilkBankName}>{form.fullName}</Text>
                          <Text style={styles.MilkBankLocation}>{form.email}</Text>
                          <Text style={styles.MilkBankPhone}>{form.contactNumber}</Text>
                      </View>
                      <View style={styles.ButtonContainer}>
                        <TouchableOpacity style={styles.viewButton} onPress={() => handleViewPress(form.Applicant_ID)}>
                            <Text style={styles.viewButtonText}>View</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                            <Text style={styles.viewButtonText}>Message</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.viewButton} onPress={() => DeleteAlert(form.fullName, form.Applicant_ID)}>
                            <Text style={styles.viewButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                  </View>
              ))}
          </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  DonorContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
    paddingBottom: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E60965"

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
    fontFamily: 'Kurale-Regular',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    
  },
  menuIcon: {
    marginLeft: 20,
    marginRight: 20,
},
  tabContent: {
    alignItems: 'center',
    backgroundColor: '#FFF8EB',
  },
  container:{
    flex: 1,
    backgroundColor: '#FFF8EB',
},

milkBankContainer:{
  marginHorizontal: 10,
},

InfoContainer: {
    width: "60%"
},
searchContainer: {
    backgroundColor: '#FFF8EB',
    width: '100%',
    paddingVertical: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center', // Center the content horizontally
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    
},
  searchIcon: {
    position: 'absolute',
    left: 15,
    top: '60%',
    transform: [{ translateY: -12 }], 
    color: '#E60965'
  },
  searchInput: {
    flex: 1,
    paddingLeft: 35, // Adjust this value to provide space for the icon
    paddingVertical: 2,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E60965',
    borderRadius: 10,
  },
  titleText:{
    fontSize: 30,
    marginLeft: 20,
    color: '#E60965',
    fontWeight: '700'
  },
  milkBankList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 10,
},
milkBank: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5, 
    

},

milkBankButton:{
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginLeft: 30
},
milkBankDescription: {
    marginTop: 10,
    textAlign: 'center',
    color: 'black',
   
},
viewButton: {
    backgroundColor: 'white',
    height: 20,
    width: "50%",
    borderRadius: 50,
    borderColor: '#E60965',
    borderWidth: 1,
    alignItems: 'center',
    marginRight: 80,
    marginVertical: 1,
    marginBottom: 3,
},
viewButtonText: {
    color: '#E60965',
    fontSize: 12,
    alignItems: "center",
  
},

horizontalLine: {
    width: "100%",
    height: 1,
    backgroundColor: '#E60965',
    marginTop: -150,
    marginBottom: 10,
},
DescriptionText:
{
    alignItems: 'baseline',
    
},
MilkBankName:{
    fontWeight: '700',
    fontSize: 19,
    color: '#E60965'

},
MilkBankLocation:{
    fontSize: 15,
    color: '#E60965'
},
MilkBankPhone:{
    fontSize: 9,
    color: '#E60965'
},
ButtonContainer:{
    flexDirection: "column",
},
lineContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 5
},
line: {
  borderBottomColor: '#E60965',
  borderBottomWidth: 0.2,
  flex: 1,
},
    
});

export default UserVerification;
