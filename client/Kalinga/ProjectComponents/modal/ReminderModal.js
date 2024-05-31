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
                         disabled={confirmed}
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
                        disabled={confirmed}
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
                        disabled={confirmed}
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
                        disabled={confirmed}
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
                        disabled={confirmed}
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


export const ReminderRequestModal = ({ onClose, data }) => {
    const [AuthorizedLetter, setAuthorizedLetter] = useState(false);
    const [AuthorizedPersonID, setAuthorizedPersonID] = useState(false);
    const [ClinicalHistory, setClinicalHistory] = useState(false);
    const [PresentingComplaint, setPresentingComplaint] = useState(false);
    const [ClinicalFindings, setClinicalFindings] = useState(false);
    const [Diagnosis, setDiagnosis] = useState(false);
    const [TreatmentsIntervensions, setTreatmentsIntervensions] = useState(false);
    const [Prescription, setPrescription] = useState(false);
    const [QuezonCityID, setQuezonCityID] = useState(false);
    const [GovernmentID, setGovernmentID] = useState(false);
    const [OtherValidID, setOtherValidID] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const storeInAsync = async ({ name, value }) => {
        console.log("Name: ", name);
        console.log("Value: ", value);
        try {
            await AsyncStorage.setItem(name, value);
        } catch (error) {
            console.error("Error storing data:", error);
        }
    };

    const fetchAsync = async () => {
        try {
            const authorizedLetterValue = await AsyncStorage.getItem("AuthorizedLetter");
            const authorizedPersonIDValue = await AsyncStorage.getItem("AuthorizedPersonID");
            const clinicalHistoryValue = await AsyncStorage.getItem("ClinicalHistory");
            const presentingComplaintValue = await AsyncStorage.getItem("PresentingComplaint");
            const clinicalFindingsValue = await AsyncStorage.getItem("ClinicalFindings");
            const diagnosisValue = await AsyncStorage.getItem("Diagnosis");
            const treatmentsIntervensionsValue = await AsyncStorage.getItem("TreatmentsIntervensions");
            const prescriptionValue = await AsyncStorage.getItem("Prescription");
            const quezonCityIDValue = await AsyncStorage.getItem("QuezonCityID");
            const governmentIDValue = await AsyncStorage.getItem("GovernmentID");
            const otherValidIDValue = await AsyncStorage.getItem("OtherValidID");
            const confirmedValue = await AsyncStorage.getItem("confirmed");

            setAuthorizedLetter(authorizedLetterValue === "true" ? true : false);
            setAuthorizedPersonID(authorizedPersonIDValue === "true" ? true : false);
            setClinicalHistory(clinicalHistoryValue === "true" ? true : false);
            setPresentingComplaint(presentingComplaintValue === "true" ? true : false);
            setClinicalFindings(clinicalFindingsValue === "true" ? true : false);
            setDiagnosis(diagnosisValue === "true" ? true : false);
            setTreatmentsIntervensions(treatmentsIntervensionsValue === "true" ? true : false);
            setPrescription(prescriptionValue === "true" ? true : false);
            setQuezonCityID(quezonCityIDValue === "true" ? true : false);
            setGovernmentID(governmentIDValue === "true" ? true : false);
            setOtherValidID(otherValidIDValue === "true" ? true : false);
            setConfirmed(confirmedValue === "true" ? true : false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchAsync()
    }, [])

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={true}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={[styles.modal, { position: "relative", }]}>
                    <TouchableOpacity
                        style={{ position: "absolute", right: 7, top: 7, zIndex: 17 }}
                        onPress={onClose}
                    >
                        <Feather name="x-circle" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        Before proceeding to the appointment, please ensure you have the following requirements:
                    </Text>
                    <ScrollView 
                    showsVerticalScrollIndicator={false}
                    style={{ alignSelf: "center", paddingBottom: 10,}}
                    contentContainerStyle={{ paddingBottom: 20, marginTop:7 }}
                    >
                        <TouchableOpacity
                            disabled={confirmed}
                            style={styles.row}
                            onPress={() => {
                                storeInAsync({ name: "ClinicalHistory", value: ClinicalHistory ? "false" : "true" })
                                setClinicalHistory(!ClinicalHistory)}
                            }
                        >
                            <Ionicons
                                name={ClinicalHistory ? "checkbox" : "checkbox-outline"}
                                size={24}
                                color="#E60965"
                            />
                            <Text style={styles.text}>ClinicalHistory</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={confirmed}
                            style={styles.row}
                            onPress={() => {
                                storeInAsync({ name: "PresentingComplaint", value: PresentingComplaint ? "false" : "true" })
                                setPresentingComplaint(!PresentingComplaint)}
                            }
                        >
                            <Ionicons
                                name={PresentingComplaint ? "checkbox" : "checkbox-outline"}
                                size={24}
                                color="#E60965"
                            />
                            <Text style={styles.text}>PresentingComplaint</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={confirmed}
                            style={styles.row}
                            onPress={() => {
                                storeInAsync({ name: "ClinicalFindings", value: ClinicalFindings ? "false" : "true" })
                                setClinicalFindings(!ClinicalFindings)}
                            }
                        >
                            <Ionicons
                                name={ClinicalFindings ? "checkbox" : "checkbox-outline"}
                                size={24}
                                color="#E60965"
                            />
                            <Text style={styles.text}>ClinicalFindings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={confirmed}
                            style={styles.row}
                            onPress={() => {
                                storeInAsync({ name: "Diagnosis", value: Diagnosis ? "false" : "true" })
                                setDiagnosis(!Diagnosis)}
                            }
                        >
                            <Ionicons
                                name={Diagnosis ? "checkbox" : "checkbox-outline"}
                                size={24}
                                color="#E60965"
                            />
                            <Text style={styles.text}>Diagnosis</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={confirmed}
                            style={styles.row}
                            onPress={() => {
                                storeInAsync({ name: "TreatmentsIntervensions", value: TreatmentsIntervensions ? "false" : "true" })
                                setTreatmentsIntervensions(!TreatmentsIntervensions)}
                            }
                        >
                            <Ionicons
                                name={TreatmentsIntervensions ? "checkbox" : "checkbox-outline"}
                                size={24}
                                color="#E60965"
                            />
                            <Text style={styles.text}>TreatmentsIntervensions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={confirmed}
                            style={styles.row}
                            onPress={() => {
                                storeInAsync({ name: "Prescription", value: Prescription ? "false" : "true" })
                                setPrescription(!Prescription)}
                            }
                        >
                            <Ionicons
                                name={Prescription ? "checkbox" : "checkbox-outline"}
                                size={24}
                                color="#E60965"
                            />
                            <Text style={styles.text}>Prescription</Text>
                        </TouchableOpacity>
                        
                       {data && data.noQCID === "No" &&(
                            <>
                                <TouchableOpacity
                                    disabled={confirmed}
                                    style={styles.row}
                                    onPress={() => {
                                        storeInAsync({ name: "QuezonCityID", value: QuezonCityID ? "false" : "true" })
                                        setQuezonCityID(!QuezonCityID)}
                                    }
                                >
                                    <Ionicons
                                        name={QuezonCityID ? "checkbox" : "checkbox-outline"}
                                        size={24}
                                        color="#E60965"
                                    />
                                    <Text style={styles.text}>QuezonCityID</Text>
                                </TouchableOpacity>
                            </>
                       )}
                        
                       {data && data.noQCID === "Yes" && (
                        <>
                             <TouchableOpacity
                                disabled={confirmed}
                                style={styles.row}
                                onPress={() => {
                                    storeInAsync({ name: "GovernmentID", value: GovernmentID ? "false" : "true" })
                                    setGovernmentID(!GovernmentID)}
                                }
                            >
                                <Ionicons
                                    name={GovernmentID ? "checkbox" : "checkbox-outline"}
                                    size={24}
                                    color="#E60965"
                                />
                                <Text style={styles.text}>GovernmentID</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={confirmed}
                                style={styles.row}
                                onPress={() => {
                                    storeInAsync({ name: "OtherValidID", value: OtherValidID ? "false" : "true" })
                                    setOtherValidID(!OtherValidID)}
                                }
                            >
                                <Ionicons
                                    name={OtherValidID ? "checkbox" : "checkbox-outline"}
                                    size={24}
                                    color="#E60965"
                                />
                                <Text style={styles.text}>OtherValidID</Text>
                            </TouchableOpacity>
                        </>
                       )}

                        {data && data.method === "Authorized Person" && (
                            <>
                            <Text
                            style={{
                                color:"#E60965",
                                fontFamily: "Open-Sans-SemiBold",
                                marginTop: 7,
                            }}
                            >Authorized Person</Text>
                                 <TouchableOpacity
                                    disabled={confirmed}
                                    style={styles.row}
                                    onPress={() => {
                                        storeInAsync({ name: "AuthorizedLetter", value: AuthorizedLetter ? "false" : "true" })
                                        setAuthorizedLetter(!AuthorizedLetter)}
                                    }
                                >
                                    <Ionicons
                                        name={AuthorizedLetter ? "checkbox" : "checkbox-outline"}
                                        size={24}
                                        color="#E60965"
                                    />
                                    <Text style={styles.text}>Authorized Letter</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    disabled={confirmed}
                                    style={styles.row}
                                    onPress={() => {
                                        storeInAsync({ name: "AuthorizedPersonID", value: AuthorizedPersonID ? "false" : "true" })
                                        setAuthorizedPersonID(!AuthorizedPersonID)}
                                    }
                                >
                                    <Ionicons
                                        name={AuthorizedPersonID ? "checkbox" : "checkbox-outline"}
                                        size={24}
                                        color="#E60965"
                                    />
                                    <Text style={styles.text}>AuthorizedPersonID</Text>
                                </TouchableOpacity>
                            </>
                        )}

                        {data && data.noQCID === "No" && (
                            <>
                                {AuthorizedLetter 
                                    && AuthorizedPersonID 
                                    && ClinicalHistory 
                                    && PresentingComplaint 
                                    && ClinicalFindings 
                                    && Diagnosis 
                                    && TreatmentsIntervensions 
                                    && Prescription 
                                    && QuezonCityID
                                    && !confirmed && (
                                        <TouchableOpacity style={styles.button} onPress={() => {
                                            storeInAsync({ name: "confirmed", value: "true" });
                                            setConfirmed(true);
                                        }}>
                                            <Text style={{ color: '#E60965' }}>Proceed to Appointment</Text>
                                        </TouchableOpacity>
                                    )}
                            </>
                        )}
                        {data && data.noQCID === "Yes" && (
                            <>
                                {AuthorizedLetter 
                                    && AuthorizedPersonID 
                                    && ClinicalHistory 
                                    && PresentingComplaint 
                                    && ClinicalFindings 
                                    && Diagnosis 
                                    && TreatmentsIntervensions 
                                    && Prescription 
                                    && GovernmentID 
                                    && OtherValidID 
                                    && !confirmed && (
                                        <TouchableOpacity style={styles.button} onPress={() => {
                                            storeInAsync({ name: "confirmed", value: "true" });
                                            setConfirmed(true);
                                        }}>
                                            <Text style={{ color: '#E60965' }}>Proceed to Appointment</Text>
                                        </TouchableOpacity>
                                    )}
                            </>
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