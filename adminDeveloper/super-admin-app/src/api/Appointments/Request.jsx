import axios from "axios";
import { WebHost } from "../../../MyConstantSuperAdmin";

export const getMedicalAbstractsImages = async ({id, purpose}) => {
    try {
        console.log("fethcing Medical Abstract")
        const response = await axios.post(`${WebHost}/kalinga/getMedicalRequirementImage/${id}`,
            {purpose: purpose }
        )
        console.log(response.data.messages.message)
        if(response.data.messages.code===0) return response.data.images
    } catch (error){
        console.log("Error Fetching Medical Abstract")
    }
}

export const getMedicalAbstractsFiles = async ({id, purpose}) => {
    try {
        console.log("fethcing Medical Abstract")
        const response = await axios.post(`${WebHost}/kalinga/getMedicalRequirementFile/${id}`,
        {purpose: purpose }
        )
        console.log(response.data.messages.message)
       if(response.data.messages.code===0) return response.data.files
    } catch (error){
        console.log("Error Fetching Medical Abstract")
        return null
    }
}