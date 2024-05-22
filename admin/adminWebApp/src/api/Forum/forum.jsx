import React from 'react'
import { WebHost } from '../../../MyConstantAdmin'
import axios from 'axios'

export const fetchAllPost = async () => {
    try {
        console.log("Fetching all Forum Posts")
        const response = await axios.get(`${WebHost}/kalinga/getAllPosts`,)
        console.log(response.data.messages.message)
        if(response.data.messages.code === 0) return response.data.posts
        return null
    } catch(error) {
        console.log("Error fetching forum posts", error)
        return null
    }
}

export const approvedPost = async (id) => {
    try {
        console.log("updating status of Posts")
        const response = await axios.patch(`${WebHost}/kalinga/approvedPost/${id}`,)
        console.log(response.data.messages.message)
    } catch(error) {
        console.log("Error fetching forum posts", error)
        return null
    }
}
export const deletePost = async (id) => {
    try {
        console.log("updating status of Posts")
        const response = await axios.delete(`${WebHost}/kalinga/removePost/${id}`,)
        console.log(response.data.messages.message)
    } catch(error) {
        console.log("Error fetching forum posts", error)
        return null
    }
}


