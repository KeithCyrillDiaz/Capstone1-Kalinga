import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Modal, TouchableOpacity } from 'react-native'
//IDS
import DriverLicense from '../../../../assets/ValidIDs/DriverLicense.jpg'
import MultiPurposeID from '../../../../assets/ValidIDs/MultiPurposeID.jpg'
import NBIClearance from '../../../../assets/ValidIDs/NBIclearance.jpg'
import PassPort from '../../../../assets/ValidIDs/PassPort.png'
import PhilHealthID from '../../../../assets/ValidIDs/PhilHealthID.jpeg'
import PhilID from '../../../../assets/ValidIDs/PhilID.png'
import PostalImage from '../../../../assets/ValidIDs/PostalID.jpg'
import { AntDesign } from '@expo/vector-icons';


export const ValidIdInfoModal = ({onClose}) => {
    return (
        <View style={styles.container}>
             
            <View style={styles.modalContainer}>
                <TouchableOpacity onPress={onClose} style={{ position:"absolute", zIndex: 100, right:10, top: 10}}>
                    <AntDesign name="closecircle" size={24} color="#EB7AA9" />
                </TouchableOpacity>
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 20 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <RenderImages source={DriverLicense} title="Driver's License" />
                    <RenderImages source={MultiPurposeID} title="SSS Unified Multi-Purpose ID (UMID)" />
                    <RenderImages source={NBIClearance} title="NBI Clearance" />
                    <RenderImages source={PassPort} title="Passport" />
                    <RenderImages source={PhilHealthID} title="PhilHealth ID" />
                    <RenderImages source={PhilID} title="Philippine Identification (PhilID / ePhilID)" />
                    <RenderImages source={PostalImage} title="Postal ID" />
                </ScrollView>
            </View>
        </View>
    );
}


export const RenderImages = ({source, title}) => {

    return (
        <>
        <Image
                source={source}
                style={{
                    height: 140,
                    width: 200,
                    marginVertical: 10,
                    borderRadius: 10,
                    alignSelf: "center",
                    resizeMode: 'contain', // Ensures the image fits within the dimensions while maintaining aspect ratio
                }}
                />
        <Text style={{alignSelf: "center", color: "#E60965", fontFamily: "Open-Sans-Bold"}}> {title}</Text>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)' // Transparent black
    },
    modalContainer: {
        height: "50%",
        width: "70%",
        backgroundColor: "white",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#E60965",
        
    },
    text: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    }
})