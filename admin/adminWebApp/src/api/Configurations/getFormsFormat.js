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
