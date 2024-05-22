import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { WebHost } from '../../../MyConstantSuperAdmin'


export const BlockdUser = async ({id, userType, status}) => {
    try{
        console.log("Blocking User")
        const response = await axios.patch(`${WebHost}/kalinga/updateBlockStatus/${id}`,
            {
                userType,
                status
            }
        )
        console.log(response.data.messages.message)
    } catch (error) {
        console.log("Error Blocking User", error)
    }
}