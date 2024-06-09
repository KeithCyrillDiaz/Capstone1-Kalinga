


export const saveToken = ({token}) => {
    if(!token) return false
    localStorage.setItem("token", token)
    return true
}

export const getToken = () => {
    const token = localStorage.getItem("token")
    if(token) return token
    else return null

}

export const removeToken = ({token}) => {
    if(!token) return false
    localStorage.removeItem("token")
    return true
}

export const generateId = () => {
    const timestamp = Date.now().toString(36); // Convert timestamp to base-36 string
    const randomString = Math.random().toString(36).substring(2, 8); // Generate a random base-36 string and take the first 6 characters
    return (timestamp + randomString).substring(0, 11); // Combine and ensure the length is 11 characters
}

export const saveId = ({id}) => {
    if(!id) return false
    localStorage.setItem("id", id)
    return true
}

export const getId = () => {
    const token = localStorage.getItem("id")
    if(token) return token
    else return null

}

export const removeId = ({id}) => {
    if(!id) return false
    localStorage.removeItem("id")
    return true
}

export const checkId = ({id}) => {
    const storedId = getId()
    if(!storedId) return null
    if(storedId === id) return true
    else return false
}
