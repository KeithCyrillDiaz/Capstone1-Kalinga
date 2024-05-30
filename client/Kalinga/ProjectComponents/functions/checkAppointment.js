import axios from "axios"
import { BASED_URL } from "../../MyConstants"
import { Alert } from "react-native"
import { CheckToken } from "../Authorization/checktoken"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const checkOngoingAppointments = async ({id, token, navigation}) => {
    console.log("ID", id)
    try {
        const response = await axios.post(`${BASED_URL}/kalinga/checkAppointmentStatus/${id}`,
        {
            status: "Ongoing"
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data.messages.message)
       await CheckToken({navigation: navigation, message: response.data.messages.message})
       if(response.data.messages.code === 0){
        return response.data.appointment
       }
       return null
    } catch (error) {
        if (error.message.includes('Network')) {
            Alert.alert("Network Error", "Please check your internet connection and try again.");
          } 
        console.log("Error: ", error)
    
    }
}


export const deleteAllCheckListItems = async () => {
    try {
        await AsyncStorage.multiRemove(["HepaB", "HIV", "Syphillis", "PregnancyBooklet", "GovernmentID", "confirmed"]);
        console.log("Items deleted successfully.");
    } catch (error) {
        console.error("Error deleting items:", error);
    }
};