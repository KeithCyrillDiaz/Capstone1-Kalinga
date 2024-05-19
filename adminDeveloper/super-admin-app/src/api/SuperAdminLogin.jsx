import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { WebHost } from '../../MyConstantSuperAdmin'

export const SuperAdminLogin = async({username, password}) => {
    try {
        // console.log("username: ", username)
        console.log("password: ", password)
        const response = await axios.post(`${WebHost}/kalinga/superAdminLogin`,{
            username: username,
            password: password
        })
        return response.data
    } catch(error) {
        console.log("Something Went wrong", error)
        return false
    }
}