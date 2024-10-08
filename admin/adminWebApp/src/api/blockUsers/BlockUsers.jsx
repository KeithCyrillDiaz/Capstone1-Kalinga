import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { WebHost } from '../../../MyConstantAdmin'


export const BlockdUser = async ({id, userType, status, email}) => {
    try{
        console.log("Blocking User")
        const response = await axios.patch(`${WebHost}/kalinga/updateBlockStatus/${id}`,
            {
                userType,
                status,
                email
            }
        )
        console.log(response.data.messages.message)
    } catch (error) {
        console.log("Error Blocking User", error)
    }
}