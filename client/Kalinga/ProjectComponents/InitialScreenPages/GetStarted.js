import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';

const GetStarted = () => {
    const navigation = useNavigation();

    const handleGetStarted = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'LogIn'}],
            })
        );
       // navigation.navigate('RequestorTabs'); 
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../assets/GetStarted.png')} 
                style={styles.image}
            />
            <View style={styles.FirstTextOverlay}>
                <Text style={styles.FirstText}>Ready to begin Your Kalinga</Text>
            </View>
            <View style={styles.SecondTextOverlay}>
                <Text style={styles.SecondText}>Journey?</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default GetStarted;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    FirstTextOverlay: {
        position: 'absolute',
        top: 150, 
        left: 60, 
    },
    FirstText: {
        color: 'white',
        fontSize: 25,
        textAlign: 'center',
        
    
    },
    SecondTextOverlay: {
        position: 'absolute',
        top: 180, 
        left: 230, 
    },
    SecondText: {
        color: 'white',
        fontSize: 25,
        textAlign: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 80, 
        backgroundColor: "#FFEECC",
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 50,
    },
    buttonText: {
        color: "#E60965",
        fontSize: 20,
    },
});
