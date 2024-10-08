import axios from 'axios'
import { WebHost } from '../../../MyConstantSuperAdmin'
import { getToken } from '../../../../../admin/adminWebApp/src/functions/Authentication'

export const fetchFormsByUserType = async ({userType}) => {
    try {
        const token = getToken()
        console.log("Fetching Screening Forms")
        const response = await axios.get(`${WebHost}/kalinga/getScreeningFormsUserType/${userType}`,
            {headers: { Authorization: `Bearer ${token}`}}
        )
        console.log(response.data.messages.message)

        if(!response.data.screeningForms)
            return null

        else 
            return response.data.screeningForms

    } catch(error) {
        console.log("Error fetching Forms", error)
        return null
    }
}

export const fetchApplicantFilesById = async ({id}) => {
    try {
        console.log("Fetching Applicant Files")
        const response = await axios.post(`${WebHost}/kalinga/getMedicalRequirementFile/${id}`,
        {purpose: "Application"}
        )
        console.log(response.data.messages.message)

        if(!response.data.files)
            return null

        else 
            return response.data.files

    } catch(error) {
        console.log("Error fetching Files", error)
        return null
    }
}

export const fetchApplicantImagesById = async ({id}) => {
    try {
        console.log("Fetching Applicant Images")
        const response = await axios.post(`${WebHost}/kalinga/getMedicalRequirementImage/${id}`,
        {purpose: "Applicant"}
        )
        console.log(response.data.messages.message)

        if(!response.data.images)
            return null

        else 
            return response.data.images

    } catch(error) {
        console.log("Error fetching Images", error)
        return null
    }
}