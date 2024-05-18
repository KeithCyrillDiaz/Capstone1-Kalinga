import React, { useState, useEffect, useRef, useMemo } from 'react'
import { View, Text, StyleSheet, Modal, Alert, TouchableOpacity, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';//need to be set up in Babel
import MapComponent from './MapComponent.js';
import { MilkBankList } from './MilbanksList.js';
import { useNavigation } from '@react-navigation/native';
//icons
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Carousel } from './Carousel.js';


export const MilkBankDetails = ({
    id,
    onSelect,
    userType
}) => {
    
    if(!userType) userType = "Guest"
    const navigate = useNavigation()
    const bottomSheetRef = useRef(null);
    const [data, setData] = useState({})
    const [index, setIndex] = useState(2)
    //height of BottomSheet
    const snapPoints = useMemo(() => ['3%','15%', '35%', '50%', '70%'], []);

    const getMilbankDetails = (id) => MilkBankList.find((milkBank) => (milkBank.id === id))
    const fetchDetails = (index) => {
        if(!id && !index){
            console.log("Id is Undefined")
            const MilkBank = getMilbankDetails(1)
            setIndex(0)
            setData(MilkBank)
            return
        }
        const MilkBank = !id ? getMilbankDetails(index) : getMilbankDetails(id)
        setData(MilkBank)
        onSelect(MilkBank)
        setIndex(2)
    }

    const handleDirections = () => {
        Alert.alert(
            "Feature Not Available",
            "Sorry, this feature is not yet available right now. Rest assured, our team is hard at work developing new features to better serve our community. Your continued support means the world to us. Thank you for your patience!"
        )
        return
    }


    const handleAppointments = () => {
        if(userType == "Guest"){
            Alert.alert(
                "Registration Required",
                "To set an appointment, please register first as either a donor or a requestor in the profile section.",
                [
                    {
                        text: "Okay",
                        onPress: () => navigate.replace("Guest Profile")
                    }
                ]
              );
              return
        }
    }
    
    useEffect(()=> {
        fetchDetails()
    },[id])

    if(Object.keys(data).length !== 0){
        return (
            <BottomSheet
                ref={bottomSheetRef}
                index={index}
                snapPoints={snapPoints}
                onChange={(index) => console.log('Sheet moved to index:', index)}
            >
                <View style={styles.container}>
                    <View style={styles.contentContainer}>

                        <View style={{height: 60, justifyContent: "center"}}>
                            <Text style={styles.title}>{data.name}</Text>
                        </View>
                  
                        <View style={styles.divider}/>
                        <View style={styles.detailsContainer}>
                            <View style ={styles.details}> 
                                <Entypo name="location-pin" size={30} color="black" />
                                <Text style={[styles.text, {width: "90%"}]}>{data.address}</Text>
                            </View>
                            <View style ={[styles.details, {marginLeft:7}]}> 
                                <Feather name="phone" size={24} color="black" />        
                                <Text style={styles.text}>{data.contactNum}</Text>
                            </View>
                            <View style ={[styles.details, {marginLeft:7}]}> 
                                <MaterialCommunityIcons name="store-clock" size={24} color="black" />
                                <Text style={styles.text}>8:00 am to 5:00 pm</Text>
                            </View>
                            <View style = {{flexDirection: "row", gap: 7, justifyContent: "center"}}>
                                <TouchableOpacity 
                                onPress={() => fetchDetails(data.id)}
                                style = {styles.location}>
                                    <FontAwesome5 name="directions" size={17} color="white" />
                                    <Text style={styles.buttonText}>Location</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                onPress={() => handleDirections()}
                                style = {styles.direction}>
                                    <FontAwesome5 name="directions" size={17} color="white" />
                                    <Text style={styles.buttonText}>Directions</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                onPress={() => handleAppointments()}
                                style = {styles.setAppointment}>
                                    <AntDesign name="calendar" size={17} color="white" />
                                    <Text style={styles.buttonText}>Set Appointment</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                        <Carousel data={data.image}/>
                    </View>
                </View>
            </BottomSheet>
        );
    }
 
  };
  
  const styles = StyleSheet.create({

    container: {
        padding: 16,
        backgroundColor:"#FFE7DA",
        borderRadius:17,
        flex: 1,
      },
    contentContainer: {
      padding: 16,
      backgroundColor:"white",
      borderRadius:17,
      borderLeftWidth:7,
      borderColor: "#E60965",
      elevation:5,
      position:"relative",
    },

    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    divider: {
        borderBottomWidth: 1, 
        borderColor: "black", 
        width: "100%",
        marginBottom: 8,
    },
    detailsContainer: {
        gap:7,
        position: "relative",  
        marginBottom:7,
        paddingBottom: 10,
    },
    details: {
        flexDirection:"row",
        alignItems: "center",
        gap:7,
    },
    text: {
        width:"90%",
        fontSize:14
    },
    location:{
        backgroundColor: "#F54A91",
        paddingVertical:7,
        paddingHorizontal:10,
        borderRadius: 17,
        flexDirection:"row",
        gap:7,
    
    },
    direction:{
        backgroundColor: "#F54A91",
        paddingVertical:7,
        paddingHorizontal:10,
        borderRadius: 17,
        flexDirection:"row",
        gap:7,
    
    },
    setAppointment: {
        backgroundColor: "#F54A91",
        paddingVertical:7,
        paddingHorizontal:10,
        borderRadius: 17,
        flexDirection:"row",
        gap:7,
       
    },
    buttonText: {
        fontSize:13,
        color:"white",
        fontFamily:"Open-Sans-Regular"
    },
    image: {
        height: 120,
        width: 200,
        borderRadius: 17,
        marginHorizontal: 7
    }
  });