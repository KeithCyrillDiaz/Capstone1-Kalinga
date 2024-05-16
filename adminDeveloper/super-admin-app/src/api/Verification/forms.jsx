import axios from 'axios'
import { WebHost } from '../../../MyConstantSuperAdmin'

export const fetchFormsByUserType = async ({userType}) => {
    try {
        console.log("Fetching Screening Forms")
        const response = await axios.get(`${WebHost}/kalinga/getScreeningFormsUserType/${userType}`)
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
        const response = await axios.get(`${WebHost}/kalinga/getMedicalRequirementFile/${id}`)
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
        const response = await axios.get(`${WebHost}/kalinga/getMedicalRequirementImage/${id}`)
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