import React, { useEffect, useState } from 'react';
import { 
  SafeAreaView, 
  Text, 
  View,
  ScrollView, 
  StatusBar, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { BASED_URL } from '../../../../MyConstants.js';
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';


const Tab = createBottomTabNavigator()


const MyDonation = ({route}) => {
  // console.log("route:", route.params)
  const userInformation = route.params.userInformation
  const token = route.params.token
  const Donor_ID = userInformation.Donor_ID;
  const [loading, setLoading] = useState(true);
  const [totalMilkRequested, setTotalMilkRequested] = useState(0);
  const [completedRequests, setCompletedRequests] = useState(0);
 
  const fetchUserData = async () => {
    try {
      // Make an API call to fetch data from the backend
      const response = await axios.get(`${BASED_URL}/kalinga/getDonorStats/${Donor_ID}`);
      const { totalMilkRequested, completedRequestsCount } = response.data;
      setTotalMilkRequested(totalMilkRequested);
      setCompletedRequests(completedRequestsCount);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Update loading state to false after data fetching
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  if (loading) {
    return (
      <View style={[styles.defaultBackgroundColor, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#E60965" />
      </View>
    );
  }



  
  return (
    <SafeAreaView style={globalStyles.defaultBackgroundColor}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
     
      <ScrollView
        overScrollMode='never'
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        

        <View style={styles.contentContainer}>
          <View style={styles.boxContainer}>
            <View style={styles.row}>
              <MaterialIcons name="local-drink" size={150} color="#E60965" />
              <View style={styles.textContainer}>
                <Text style={styles.upperText}>You have donated</Text>
                <Text style={styles.lowerText}>{totalMilkRequested} mL</Text>
              </View>
            </View>
          </View>

          <View style={styles.boxContainer}>
            <View style={styles.row}>
              <FontAwesome5 name="hand-holding-water" size={100} color="#E60965" />
              <View style={styles.textContainer}>
                <Text style={styles.upperText}>You have completed</Text>
                <Text style={styles.lowerText}>{completedRequests}</Text>
                <Text style={styles.upperText}>generous donations</Text>
              </View>
            </View>

          
          </View>
          {/* <TouchableOpacity onPress={() => Alert.alert("Sorry, this feature is not yet available right now. ", "Rest assured, our team is hard at work developing new features to better serve our community. Your continued support means the world to us. Thank you for your patience!")} style={styles.downloadButton}>
              <Text style={styles.buttonText}>Download as PDF</Text>
            </TouchableOpacity> */}

            <View>
            <Text style = {styles.bottomText}>Your generosity is changing lives. Thank you for making a difference with your valuable contribution.
               </Text>
                        
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EB",
  },

  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingBottom: 18,
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: "3%",
    borderBottomWidth: 1,
    borderBlockColor: "#FFACC7"
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

  approvedButton: {
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

  completedButton: {
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

  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 70,
  },

  boxContainer: {
    borderRadius: 20,
    borderColor: "#E60965",
    padding: 20,
    marginBottom: 20,
    backgroundColor: "white",
    elevation:17,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  textContainer: {
    marginLeft: 20,
  },

  upperText: {
    fontFamily: "Open-Sans-Bold",
    fontSize: 18,
    color: "#E60965",
    marginRight: 130

  },

  lowerText: {
    fontFamily: "Open-Sans-Bold",
    fontSize: 35,
    color: "#E60965",
    textAlign: "center",
    marginRight: 130

  },

  downloadButton: {
    backgroundColor: "#E60965",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    padding: 10,
    borderRadius: 20,
    width: "50%"
  },

  buttonText: {
    color: "white",
    fontFamily: "Open-Sans-Bold",
    fontSize: 17,
  },

  
  bottomText: {
    // backgroundColor: "gray",
     marginHorizontal: "10%",
     textAlign: "center",
     color: "#E60965",
     marginVertical: 20,
 }
});

export default MyDonation;
