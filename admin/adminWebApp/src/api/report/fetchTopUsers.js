import axios from "axios";
import { WebHost } from "../../../MyConstantAdmin";



export const getTopByBarangay = async ({barangay, token, userType}) => {
    try {
        const url = userType === "Donor" 
        ? "getTopDonorByBarangay"
        : "getTopRequestorByBarangay"

        const response  = await axios.get(`${WebHost}/kalinga/${url}/${barangay}`)
        if(response.data.data) return response.data.data
        return null
    } catch (error) {
        console.log("Error: ", error)
        return null
    }
}

export const getTopRequestorByBarangay = async ({barangay, token}) => {
    try {
        const response  = await axios.get(`${WebHost}/kalinga/getTopRequestorByBarangay/${barangay}`)
        if(response.data.data) return response.data.data
        return null
    } catch (error) {
        console.log("Error: ", error)
        return null
    }
}