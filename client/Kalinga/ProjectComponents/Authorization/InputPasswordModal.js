import React, { useState } from "react";
import { View, Text, Modal, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import axios from "axios";
import { BASED_URL } from "../../MyConstants";
import { LoadingSpinner } from "../uploader/LoadingSpinner";
import { CheckToken } from "./checktoken";

export const InputPasswordModal = ({onClose, email, id, token, userType, navigation, onValid}) => {

    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [incorrect, setIncorrect] = useState(false)

    const handleSubmit = async () => {
        if (!password || password.length < 8) {
            Alert.alert("Invalid Password", "Password must be at least 8 characters long.");
            return;
        }
        try{
            setIsLoading(true)
            const response = await axios.post(`${BASED_URL}/kalinga/getAccess/${id}`,
                {
                    email,
                    pass: password,
                    userType
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(response.data.messages.message)
            await CheckToken({navigation: navigation, message: response.data.messages.message})
            if(response.data.messages.message === "Unauthorized User")onClose()
            if(response.data.messages.code === 0) onValid()
        } catch (error) {
            console.log("Error: ", error);
            setIsLoading(false)
            if (error.message.includes('Network')) {
              Alert.alert("Network Error", "Please check your internet connection and try again.");
            } 
            if (error.response && error.response.status === 401) setIncorrect(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal
        transparent={true}
        animationType="slide"
        visible={true}
        onRequestClose={onClose}
    >
        <View style={styles.container}>
            <LoadingSpinner loading={isLoading}/>
            <View style = {styles.modal}>
                <Text style={styles.title}> Confirm Access</Text>
                <Text style={styles.text}> Please input your password to gain access </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={'#E60965'}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                {incorrect && (
                    <Text style={{color: "red", marginTop: 7}}> Incorrect Password</Text>
                )}
             
                <View style={{flexDirection: "row", gap: 17}}>
                    <TouchableOpacity 
                    style={[styles.button, {backgroundColor: '#E60965',}]} 
                    onPress={handleSubmit}>
                        <Text style={{ color: "white", fontFamily: "Open-Sans-Regular", fontSize: 15}}> Submit </Text>
                    </TouchableOpacity>
                    <TouchableOpacity  
                    style={[styles.button, {backgroundColor: 'white',}]}  
                    onPress={onClose}>
                        <Text style={{ color: '#E60965', fontFamily: "Open-Sans-Regular", fontSize: 15}}> Cancel </Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        
        </View>
    </Modal>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    modal: {
        backgroundColor: "#f5f5f5",
        borderWidth: 1,
        borderColor: '#E60965',
        flex: 1,
        maxHeight: 230,
        maxWidth: 300,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 17,
    },
    input: {
        width: "80%",
        padding: 10,
        elevation: 17,
        color: '#E60965',
        backgroundColor: "white",
        borderRadius: 7,
    },
    title: {
        marginTop: 10,
        color: '#E60965',
        fontFamily: "Open-Sans-Bold",
        fontSize: 20
    },
    text: {
        marginBottom: 10,
        color: '#E60965',
        fontFamily: "Open-Sans-Regular",
        fontSize: 15
    },
    button: {
        marginVertical: 10,
        paddingVertical: 7,
        paddingHorizontal: 17,
        elevation: 7,
        borderRadius: 7,
    }
})