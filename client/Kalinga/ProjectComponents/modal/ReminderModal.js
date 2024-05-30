import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

export const ReminderModal = ({onClose}) => {

    const [HepaB, setHepaB] = useState(false)
    const [HIV, setHIV] = useState(false)
    const [Syphillis, setSyphillis] = useState(false)
    const [PregnancyBooklet, setPregnancyBooklet] = useState(false)
    const [GovernmentID, setGovernmentID] = useState(false)
    const [confirmed, setConfirmed] = useState(false);

    const storeInAsync = async ({name, value}) => {
        console.log("Name: ", name)
        console.log("Value: ",value)
        try {
            await AsyncStorage.setItem(name, value);
        } catch (error) {
            console.error("Error storing data:", error);
        }
    };

    const fetchAsync = async () => {
        try {
     
            const hepBValue = await AsyncStorage.getItem("HepaB");
            const hivValue = await AsyncStorage.getItem("HIV");
            const syphillisValue = await AsyncStorage.getItem("Syphillis");
            const pregnancyBookletValue = await AsyncStorage.getItem("PregnancyBooklet");
            const governmentIDValue = await AsyncStorage.getItem("GovernmentID");
            const confirmedValue = await AsyncStorage.getItem("confirmed");
            
            setHepaB(hepBValue === "true" ? true : false);
            setHIV(hivValue === "true" ? true : false);
            setSyphillis(syphillisValue === "true" ? true : false);
            setPregnancyBooklet(pregnancyBookletValue === "true" ? true : false);
            setGovernmentID(governmentIDValue === "true" ? true : false);
            setConfirmed(confirmedValue === "true" ? true : false)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        fetchAsync()
    },[])

    return (
        <Modal
        transparent={true}
        animationType="slide"
        visible={true}
        onRequestClose={onClose}
    >
        <View style={styles.container}>
            <View style={[styles.modal, {position: "relative"}]}>
                <TouchableOpacity
                 style={{position: "absolute", right: 7, top: 7, zIndex:17}}
                 onPress={onClose}
                >
                    <Feather name="x-circle" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>
                    Before proceeding to the appointment, please ensure you have the following requirements:
                </Text>
               <ScrollView style={{alignSelf: "center", paddingVertical: 10}}>
                <TouchableOpacity
                        //  disabled={confirmed}
                        style={styles.row}
                        onPress={() => {
                            storeInAsync({name: "HepaB", value: HepaB ? "false" : "true"})
                            setHepaB(!HepaB)}
                        }
                    >
                        <Ionicons
                        name={HepaB ? "checkbox" : "checkbox-outline"}
                        size={24}
                        color="#E60965"
                        />
                        <Text style={styles.text}>Hepa B Result</Text>
                    </TouchableOpacity>

                    {/* HIV */}
                    <TouchableOpacity
                        // disabled={confirmed}
                        style={styles.row}
                        onPress={() => {
                            storeInAsync({name: "HIV", value: HIV ? "false" : "true"})
                            setHIV(!HIV)}
                        }
                    >
                        <Ionicons
                        name={HIV ? "checkbox" : "checkbox-outline"}
                        size={24}
                        color="#E60965"
                        />
                        <Text style={styles.text}>HIV 1 & 2 Test Result</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        // disabled={confirmed}
                        style={styles.row}
                        onPress={() => {
                            storeInAsync({name: "Syphillis", value: Syphillis ? "false" : "true"})
                            setSyphillis(!Syphillis)}
                        }
                    >
                        <Ionicons
                        name={Syphillis ? "checkbox" : "checkbox-outline"}
                        size={24}
                        color="#E60965"
                        />
                        <Text style={styles.text}>Syphillis Test Result</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        // disabled={confirmed}
                        style={styles.row}
                        onPress={() => {
                            storeInAsync({name: "PregnancyBooklet", value: PregnancyBooklet ? "false" : "true"})
                            setPregnancyBooklet(!PregnancyBooklet)}
                        }
                    >
                        <Ionicons
                        name={PregnancyBooklet ? "checkbox" : "checkbox-outline"}
                        size={24}
                        color="#E60965"
                        />
                        <Text style={styles.text}>Pregnancy Booklet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        // disabled={confirmed}
                        style={styles.row}
                        onPress={() => {
                            storeInAsync({name: "GovernmentID", value: GovernmentID ? "false" : "true"})
                            setGovernmentID(!GovernmentID)}
                        }
                    >
                        <Ionicons
                        name={GovernmentID ? "checkbox" : "checkbox-outline"}
                        size={24}
                        color="#E60965"
                        />
                        <Text style={styles.text}>Government ID</Text>
                    </TouchableOpacity>
                    {HepaB && HIV && Syphillis && PregnancyBooklet && GovernmentID && !confirmed && (
                        <TouchableOpacity style={styles.button} onPress={() => {
                            storeInAsync({name: "confirmed", value: confirmed ? "false" : "true"})
                            setConfirmed(true)
                        }}>
                        <Text style={{ color: '#E60965',}}>Proceed to Appointment</Text>
                        </TouchableOpacity>
                    )}
               </ScrollView>
               {confirmed && (
                        <Text style={styles.confirmationText}>You have confirmed all requirements. Proceed with your appointment.</Text>
                    )}
            </View>
        </View>
    </Modal>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    modal: {
        backgroundColor: "#f5f5f5",
        borderWidth: 1,
        borderColor: '#E60965',
        maxWidth: 300,
        paddingBottom: "7%",
        maxHeight: 400,
        width: "100%",
        alignItems: "center",
        paddingTop:17,
        borderRadius: 17,
    },
    row: {
        flexDirection: "row", 
        gap: 17, 
        alignItems: "center",
        width: 200,
        marginTop:7,
        backgroundColor: "white",
        paddingVertical: 4,
        paddingLeft: 7,
        borderRadius:7,
        elevation: 7
    },
    input: {
        width: "80%",
        padding: 10,
        elevation: 17,
        color: '#E60965',
        backgroundColor: "white",
        borderRadius: 7,
    },
    title: {
        color: '#E60965',
        fontFamily: "Open-Sans-Bold",
        fontSize: 17,
        textAlign: "center",
        width: "85%"
    },
    text: {
        color: '#E60965',
        fontFamily: "Open-Sans-SemiBold"
    },
    button: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 7,
        marginTop: 20,
        alignItems: "center",
        elevation:17
      },
    confirmationText: {
        color: '#E60965',
        fontFamily: "Open-Sans-SemiBold",
        marginTop: 20,
        textAlign: "center",
      },
})