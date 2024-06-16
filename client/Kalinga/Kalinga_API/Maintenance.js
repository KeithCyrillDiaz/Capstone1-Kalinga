import axios from "axios"
import { BASED_URL } from "../MyConstants"
import { getToken } from "../ProjectComponents/Authorization/checktoken"


export const checkMaintenanceStatus = async () => {
    try {
        const token = await getToken()
        const response = await axios.get(`${BASED_URL}/kalinga/checkMaintenanceStatus/`,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        console.log(response.data.messages.message)
        return response.data
    } catch (error) {
        console.log("Error: ", error)
    }
}