import axios from "axios"
import { BASED_URL } from "../MyConstants"
import { getToken } from "../ProjectComponents/Authorization/checktoken"
import { logOutUser } from "../ProjectComponents/Authorization/checktoken"


export const getFormFormat = async({navigation}) => {
    try {
        const token = await getToken()
        if (!token) await logOutUser({navigation: navigation})
        const result = await axios.get(`${BASED_URL}/kalinga/getAppointmentsConfiguration/`,
          {headers:{Authorization: `Bearer ${token}`}}
        )
        const {donationAppointmentConfig, requestAppointmentConfig} = result.data //result.data format
        return result.data
    } catch (error) {
        console.log("Error: ",error)
    } 
  }

  
  export const getAllMethodTitles = (data) => data.map(item => item.title)
  export const getSelectedMethodBoolean = (data, title) => data.find(method => method.title === title)
