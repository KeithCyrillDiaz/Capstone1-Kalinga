import axios from "axios"
import { WebHost } from "../../../MyConstantAdmin";
import { getId, getToken, removeId, removeToken } from "../../functions/Authentication";

export const signOutUser = () => {
    const id = getId();
    removeId({ id });
    window.location.href = "/"; // Redirect to the login page
};

// Function to get form format
export const getFormFormat = async () => {
    try {
        const token = getToken();
        if (!token) {
            // signOutUser(); // Force sign out if token is null
            return;
        }
        const result = await axios.get(`${WebHost}/kalinga/getAppointmentsConfiguration/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const { donationAppointmentConfig, requestAppointmentConfig } = result.data; // result.data format
        return result.data;
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const getAllMethodTitles = (data) => data.map(item => item.title)
export const getSelectedMethodIDBoolean = (data, title) => data.find(method => method.title === title)


export const updateRequestorFormFormat = async ({value}) => {
  try {
    const token = getToken()
    if (!token) {
         // signOutUser(); // Force sign out if token is null
        return
    }
    console.log("value: ",value)
    const result = await axios.put(`${WebHost}/kalinga/updateRequestorAppointmentsConfiguration/`,
        value,
        {headers: {Authorization: `Bearer ${token}`}}
    )
    const { updateResult } = result.data // format
    return result
  } catch (error) {
    console.log("Error", error)
  }
    
}

export const updateDonorFormFormat = async ({value}) => {
    try {
      const token = getToken()
      if (!token) {
           // signOutUser(); // Force sign out if token is null
          return
      }
      console.log("value: ",value)
      const result = await axios.put(`${WebHost}/kalinga/updateDonationAppointmentsConfiguration/`,
          value,
          {headers: {Authorization: `Bearer ${token}`}}
      )
      const { updateResult } = result.data // format
      return result
    } catch (error) {
      console.log("Error", error)
    }
      
  }
