import axios from "axios";
import { BASED_URL } from "../MyConstants";
import { getToken } from "../ProjectComponents/Authorization/checktoken";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const checkPrevForm = async ({userType}) => {
    try {
        const token = await getToken()
        const email = userType === "Donor" ? await AsyncStorage.getItem("email_Donor") : await AsyncStorage.getItem("email_Requestor")
        console.log("email: ", email)
        if(!email) return
        const response = await axios.post(`${BASED_URL}/kalinga/fetchScreeningFormByEmail/`,
            {email : email},
        )
        const { screeningForm } = response.data // Format
        return response
    } catch (error) {
        console.log("Error: ", error)
    }
}

export const storePrevForm = async ({userType, email}) => {
    try {
        if(userType === "Donor") await AsyncStorage.setItem("email_Donor", email)
            else await AsyncStorage.setItem("email_Requestor", email)
    } catch (error) {
        console.log("Error: ", error)
    }
}