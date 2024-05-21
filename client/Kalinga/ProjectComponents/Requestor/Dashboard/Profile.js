//Guest Home
import React, { useState } from 'react';
import { 
  ScrollView,
  Text, 
  View, 
  StatusBar, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Image
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalHeader } from '../../../styles_kit/globalHeader.js';

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../../../styles_kit/globalStyles.js';


const RequestorProfile = ({route}) => {

  const userInformation = route.params.userInformation
  const token = route.params.token

  let nameArray =  userInformation.fullName.split(' ').filter(name => name.trim() !== '')
  let UserName;

  if(!userInformation.fullName.includes(',') && !userInformation.fullName.includes('.')){
    UserName = nameArray[0] + ' ' + nameArray[nameArray.length - 1];
    console.log("Name: ", UserName)
  }
  else if (nameArray[0].endsWith(',')) {
    UserName = nameArray[1] + ' ' + nameArray[0].replace(',', '');
    console.log("Name: ", UserName)
  } else if(nameArray[1].endsWith(',')){
      UserName = nameArray[2] + ' ' + nameArray[0] + ' ' + nameArray[1].replace(',', '');
      console.log("Name: ", UserName);
  }
    else if(nameArray[nameArray.length - 2].endsWith('.')) {
    
    UserName = nameArray[0] + ' ' + nameArray[nameArray.length - 1] ;
    console.log("Name: ", UserName)
  } else if(nameArray[nameArray.length - 3].endsWith('.')){
    UserName = nameArray[0] + ' ' + nameArray[nameArray.length - 2] + ' ' + nameArray[nameArray.length - 1] ;
    console.log("Name: ", UserName)
  } 


  const navigation = useNavigation();
    
const navigatePage = (Page) => {

  if(Page === "RequestorSettingScreen"){
    navigation.navigate(Page, {userInformation: userInformation, UserName: UserName, token: token})
    return
  }
  navigation.navigate(Page, {userInformation: userInformation, token: token})
};

const [profilePic, setProfilePic] = useState("")
    const fetchDP = async () => {
      const DPLink = await AsyncStorage.getItem("DPLink")
      console.log("DPLink", DPLink)
      if(!DPLink && !userInformation.DPLink){
        console.log("DPLink: ", DPLink)
        console.log("userInformation.DPLink: ", userInformation.DPLink)
        return
      } 
      if(!DPLink){
        setProfilePic(userInformation.DPLink)
        await AsyncStorage.setItem("DPLink", userInformation.DPLink)
        console.log("userInformation.DPLink: ", userInformation.DPLink)
      } else{
        setProfilePic(DPLink)
        console.log("DPLink: ", DPLink)
      }
     
    } 

    useFocusEffect(
      React.useCallback(() => {
        fetchDP(); // Fetch profile picture whenever screen comes into focus
      }, [])
    );
    

    return (
        
        <SafeAreaView style = {globalStyles.defaultBackgroundColor}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Profile</Text>
            </View>

        <ScrollView
        overScrollMode='never' // Disable the over-scroll effect or the Jelly effect when reaching the end of the scroll
        nestedScrollEnabled={true} // Enable nested scrolling
        >
                <View style={styles.container}>
                  <View style = {styles.profileContainer}>
                    <View style = {styles.row}>
                    {profilePic === "" ? (
                        <View style = {styles.profilePic}>
                        <FontAwesome name="user-circle-o" size={200} color="#E60965" />
                        </View>
                      ) : (
                        <Image
                        style = {{
                          marginRight: -30,
                          width: 157,
                          height: 157,
                          borderWidth: 1,
                          borderRadius: 100,
                          marginBottom: 16,
                          borderColor: "#E60965",
                        }}
                        source = {{uri: profilePic}}
                        />
                      )
                    }
                      <View>
                        <MaterialIcons name="verified" size={24} color="#E60965" />
                      </View>
                     
                    </View>

                    <Text style = {styles.name}>{UserName}</Text>
                    <Text style = {styles.userType}>Requestor</Text>

                  </View>

                  <View style = {styles.box}>
                    
                      {/* <TouchableOpacity onPress={() => navigatePage("RequestorSavedArticles")} >
                        <View style = {styles.rowBox}>
                          <View style = {styles.rowMenu}>
                            <FontAwesome5 style = {styles.iconBookmark} name="bookmark" size={30} color="#E60965" />
                            <Text style = {styles.mediumText}>
                              Saved Articles
                            </Text>
                          </View>
                          
                          <Entypo name="chevron-right" size={30} color="#E60965" />
                        </View>
                      </TouchableOpacity> */}
                       
                 
                  {/* <TouchableOpacity onPress={() => navigatePage("RequestorFavoriteArticles")}>
                      <View style = {styles.rowBox}>
                          <View style = {styles.rowMenu}>
                            <MaterialCommunityIcons style = {styles.iconBabyBottle} name="baby-bottle-outline" size={38} color="#E60965"/>
                            <Text style = {styles.longText}>
                              Saved Milk Banks
                            </Text>
                          </View>
                       
                          <Entypo name="chevron-right" size={30} color="#E60965" />
                      </View>

                    </TouchableOpacity> */}
                    
                    <TouchableOpacity onPress={() => navigatePage("RequestorSettingScreen")}>
                      <View style = {styles.rowBox}>
                            <View style = {styles.rowMenu}>
                              <Octicons style = {styles.icon} name="gear" size={30} color="#E60965" />
                              <Text style = {styles.text}>
                                Settings
                              </Text>
                            </View>
                          
                            <Entypo name="chevron-right" size={30} color="#E60965" />
                      </View>
                    </TouchableOpacity>
                </View>
              </View>
              
          </ScrollView>
        </SafeAreaView>
        
    
        
      )
  }


  const styles = StyleSheet.create({

    safeArea:{ 
      backgroundColor: "#FFF8EB",
      height: "100%"
    },

    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileContainer: {
      //backgroundColor: "gray",
      width: "70%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 30,
    },

    box: {
      //backgroundColor: "pink",
      width: "90%",
    },
    row: {
      flexDirection: "row",
      alignItems: "baseline",
    },

    rowMenu: {
      flexDirection: "row",
      alignItems: "center",
      height: 50,
      justifyContent: "space-between",
      marginHorizontal: "15%"
    },

    rowBox: {
      flexDirection: "row",
      // backgroundColor: "gray",
      alignItems: "center",
      height: 50,
      borderBottomWidth: .5,
      borderColor: "#E60965",
      marginBottom: 10,
      justifyContent: "space-between",
      paddingRight: "10%"
      
    },

    profilePic: {
      marginRight: -20,

    },

    text: {

      //backgroundColor: "gray",
      color: "#E60965",
      fontFamily: "Open-Sans-Bold",
      fontSize: 20,
    },

    mediumText: {
     
      color: "#E60965",
      fontFamily: "Open-Sans-Bold",
      fontSize: 20,
    },

    longText: {
   
      color: "#E60965",
      fontFamily: "Open-Sans-Bold",
      fontSize: 20,
    },

    name: {
      color: "#E60965",
      fontFamily: "Open-Sans-Bold",
      fontSize: 20,
    },

    userType: {
      color: "#E60965",
      fontFamily: "Open-Sans-SemiBold",
      fontSize: 15,
      marginBottom: 30
    },

    iconBookmark: {
      marginRight: 37
    },

    icon: {
      marginRight: 30
    },

    iconBabyBottle: {
      marginRight: 20
    } 
   
  })
  
export default RequestorProfile;

