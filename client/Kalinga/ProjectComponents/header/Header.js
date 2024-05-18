import React from 'react'
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native'

export const SmallHeader = ({title}) => {

    return (
        <>
            <StatusBar barStyle="dark-content" 
                translucent = {true}
                backgroundColor="#FFF8EB" />
                <View style={smallHeader.headerContainer}>
                    <Text style={smallHeader.headerTitle}>{title}</Text>
                </View>
            
        </>
    )
}

const smallHeader = StyleSheet.create({
    headerContainer: {
        backgroundColor: "#E60965",
        paddingTop: 50,
        paddingVertical:20,
        borderBottomLeftRadius: 37,
        borderBottomRightRadius: 37,
        position: "absolute",
        width: "100%",
        zIndex: 10
    },
 
    headerTitle: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: 'Kurale',
        color: "white"
    },
})


export const BigHeader = ({userName}) => {

    return (
        <>
            <StatusBar barStyle="dark-content" 
            translucent = {true}
            backgroundColor="#FFF8EB" />
            <View style={bigHeader.headerContainer}>
                <View style = {bigHeader.greetingsContainer}>
                    {
                    userName ? <Text style = {bigHeader.greetings}>Good Day {userName}!</Text>
                    : <Text style = {bigHeader.greetings}>Good Day!</Text>
                    }
                    <Text style={bigHeader.subGreetings}>Discover the power of breastmilk for your baby's health and well-being.</Text>
                </View>
                
            </View>
           
        </>
    )
}

const bigHeader = StyleSheet.create({
    headerContainer: {
        backgroundColor: "#E60965",
        paddingTop: 50,
        paddingVertical:30,
        borderBottomLeftRadius: 37,
        borderBottomRightRadius: 37,
        position: "absolute",
        width: "100%",
        zIndex: 10
    },
    greetingsContainer: {
        marginLeft: 20,
        marginRight: "10%"
    },
    greetings: {
        textAlign: "left",
        fontSize: 27,
        fontFamily: 'Kurale',
        color: "white",
    },
    subGreetings: {
        marginLeft: 7,
        fontSize: 12,
        color: "#FFE0E8",
        fontFamily: 'Inter-Regular',
    }
})