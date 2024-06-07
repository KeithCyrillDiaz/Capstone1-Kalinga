import axios from "axios";
import { WebHost } from "../../../MyConstantAdmin";
import { getToken } from "../../functions/Authentication";



export const updateMaintenaceStatus = async ({value}) => {
    try {
        const token = getToken()
        const response = await axios.patch(`${WebHost}/kalinga/updateMaintenanceStatus/`,
        {status: value},
        {headers: {Authorization: `Bearer ${token}`}}
    )
        if(response.data.messages.code === 0) console.log("Successfully updated Maintenance Status")
        return
    } catch (error) {
        console.log("Error: ", error)
    }
}

export const getMaintenace = async () => {
    try {
        const token = getToken()
        const result = await axios.get(`${WebHost}/kalinga/checkMaintenanceStatus/`,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        const { maintenance } = result.data // format of result.data
        console.log("maintenance: ",maintenance)
        return result.data
    } catch (error) {
        console.log("Error: ", error)
    }
}