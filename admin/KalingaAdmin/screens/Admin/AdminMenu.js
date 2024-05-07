import React from 'react';
import { ScrollView,Text, View, StatusBar, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../../styles_kit/globalStyles.js';
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';




const AdminMenu = () => {
   
    const navigation = useNavigation();
    const navigatePage = (Page) => {
      if(Page === "LoginAdmin"){
        navigation.dispatch(
          CommonActions.reset({
              index: 0,
              routes: [{ name: Page }],
          })
      );
      return
      }
        navigation.navigate(Page); // Navigate to the Login screen
        

    };
    
    return (
        <View style={globalStyles.container}>
          
            <StatusBar barStyle="dark-content"  backgroundColor="white" />
              <View style = {styles.header}>
                      <View style={styles.row}>
                        <Image
                            source={require('../../assets/Kalinga_Logo.png')}
                            style={styles.img}
                        />
                        <View>  
                            <Text style = {styles.headerTitle}>Good Day!</Text>
                            <Text style = {styles.SubTitle}>Welcome to Kalinga Admin!</Text>
                        </View>   
                  </View>
              </View>
            
                

          <ScrollView style ={styles.AdminContainer}
          overScrollMode='never' // Disable the over-scroll effect or the Jelly effect when reaching the end of the scroll
          nestedScrollEnabled={true} // Enable nested scrolling
          >
            
                <View style = {styles.flex_Row}>
  
                  <TouchableOpacity style = {styles.smallBackgroundBoxAdmin}  onPress={() => navigatePage("AdminDashboard")}>
                  <SimpleLineIcons name="graph" size={70} color="#E60965" />
                      <View style = {styles.LabelCenter}>
                        <Text style = {styles.Label}>Dashboard</Text>
                      </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style = {styles.smallBackgroundBoxAdmin} onPress={() => navigatePage("AdminMilkbanks")}>
                  <FontAwesome6 name="hospital" size={70} color="#E60965" />
                      <View style = {styles.LabelCenter}>
                        <Text style = {styles.Label}>Milk Banks</Text>
                      </View>
                    </TouchableOpacity>
                  
  
                </View>
  
                <View style = {styles.flex_Row}>
                <TouchableOpacity style = {styles.smallBackgroundBoxAdmin} onPress={() => navigatePage("RequestorUserVerification")}>
                  <FontAwesome5 name="hands-helping" size={70} color="#E60965"/>
                    <View style = {styles.LabelCenter}>
                      <Text style = {styles.Label}>Requestor's Verification</Text>
             
                    </View>
                  </TouchableOpacity>
  
                  <TouchableOpacity style = {styles.smallBackgroundBoxAdmin} onPress={() => navigatePage("DonorUserVerification")}>
                  <FontAwesome5 name="hand-holding-heart" size={70} color="#E60965" />
                    <View style = {styles.LabelCenter}>
                      <Text style = {styles.Label}>Donor's Verification</Text>
                    </View>
                  </TouchableOpacity>
                </View>
  
                <View style = {styles.flex_Row}>
                <TouchableOpacity style = {styles.smallBackgroundBoxAdmin} onPress={() => navigatePage("AdminUser")}>
                  <Ionicons name="calendar" size={70} color="#E60965" />
                    <View style = {styles.LabelCenter}>
                      <Text style = {styles.Label}>appointment</Text>
                    </View>
                  </TouchableOpacity>
  
                  <TouchableOpacity style = {styles.smallBackgroundBoxAdmin} onPress={() => navigatePage("LoginAdmin")}>
                  <FontAwesome name="sign-out" size={70} color="#E60965"/>
                    <View style = {styles.LabelCenter}>
                      <Text style = {styles.Label}>Sign-Out</Text>
                     
                    </View>
                  </TouchableOpacity>
                </View>
         
          </ScrollView>
        </View>
          
        )
    }

    const styles = StyleSheet.create({

      header: {
        backgroundColor: '#E60965', // Set the background color of the header
        borderRadius: 34,
        paddingTop: "12%",
        paddingBottom: "5%",
        marginTop: "-10%",
        width: '100%', // the size will depend on the screen, this is better so it will look the same on all phones
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
      },

      headerTitle: {
        color: 'white',
        fontSize: 30,
        marginLeft: '7%',
        fontFamily: 'Kurale',
      },

      SubTitle: {
        color: 'white',
        fontSize: 17,
        marginLeft: '7%',
        marginRight: '10%',
        fontFamily: 'Kurale',
      },


        AdminContainer:{
            backgroundColor: "#FFF8EB",
            paddingVertical: 50
        },
        smallBackgroundBoxAdmin:{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFE5EC',
            borderRadius: 20,
            width: 150,
            height: 160,
            marginRight: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            paddingBottom: 10,
            paddingTop: 10,
        },
        flex_start:{ 
          flex: 1,
          marginTop: "5%",
          marginBottom: "1%",
          alignItems: "flex-start",
          justifyContent: "center",
          marginLeft: "3.5%",
    
        },

        row: {
          flexDirection: "row",
          alignItems: "center"

        },
    
        flex_Row: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: "5%",
          marginRight: "5%",
          maxWidth: "90%",
        },
    
        title: {
          fontFamily: "Open-Sans-Bold",
          fontSize: 20,
          color: "#E60965"
        },
    
        Label: {
          textAlign: 'center',
          fontSize: 17,
          fontFamily: 'Open-Sans-Bold',
          color: '#E60965',
          //backgroundColor: "gray",
        },
    
        subLabel: {
          textAlign: 'center',
          fontSize: 13,
          fontFamily: 'Open-Sans-Regular',
          color: '#E60965',
          marginHorizontal: 10, 
    
          //backgroundColor: "pink",
        },
    
        LabelCenter: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
    
        ShortLabel:{
          textAlign: 'center',
          fontSize: 13,
          fontFamily: 'Open-Sans-Regular',
          color: '#E60965',
          maxWidth: "100%",
        },
        HeaderContainer1:
        {
          flexDirection: "row"
        },
        HeaderContainer2:
        {
          flexDirection: "Column"
        },
        img:{
          width: 100,
          height: 100,
          flexShrink: 0,
          marginRight: "-3%"
        }
      
      
      })
      
    export default AdminMenu;
    
    