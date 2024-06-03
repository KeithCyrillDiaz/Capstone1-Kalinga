import axios from 'axios'
import { WebHost } from '../../../MyConstantAdmin'
import { getToken } from '../../functions/Authentication'

export const sendApprovedAppointmentEmail = async ({id}) => {
    if(!id){
        console.log("No Id")
        return
    }

    const token = getToken()
    try {
        console.log("Sending Email")
        const response = await axios.get(`${WebHost}/kalinga/sendApprovedAppointmentEmail/${id}`,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        console.log(response.data.messages.message)
    } catch (error) {
        console.log("Error: ", error)
    }
}