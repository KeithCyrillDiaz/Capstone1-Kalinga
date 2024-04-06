import React from 'react';
import { Image, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FacebookContinue = () => {
    const navigation = useNavigation();

    const handleBackButton = () => {
        navigation.goBack();
    };

    const handleContinueButton = () => {
        console.log("Continue with Facebook");
    };

    const handleCancelButton = () => {
        navigation.navigate('EmailVerificationCode');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.facebookContainer}>
                <Entypo name="facebook" size={35} color="#316FF6" />
                <Text style={styles.facebookText}> LOGIN WITH FACEBOOK</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.SecondContainer}
                >
                    <Image
                        source={require('../../assets/Kalinga_Logo.png')}
                        style={styles.image}
                    />
                    <Text style={styles.FirstText}>Kalinga is requesting to have access to your Facebook account</Text>

                    <TouchableOpacity style={styles.ContinueButton} onPress={handleContinueButton}>
                        <View style={styles.buttonContent}>
                            <Image
                                source={require('../../assets/fb_Icon.png')}
                                style={styles.icon}
                            />
                            <Text style={styles.ButtonText}>Continue as Rogine </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.CancelButton} onPress={handleCancelButton}>
                        <Text style={styles.ButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
}

export default FacebookContinue;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    facebookContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        top: 50
    },
    facebookText: {
        color: "#E60965",
        fontSize: 25,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    SecondContainer: {
        backgroundColor: '#FFE5EC',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
        height: '100%',
        marginTop: 90,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingBottom: 250
    },
    image: {
        bottom: 70,
    },
    FirstText: {
        marginHorizontal: 50,
        fontSize: 20,
        color: '#E60965',
        marginBottom: 80,
        bottom: 70,
        textAlign: 'center'
    },
    SecondText: {
        fontSize: 17,
        color: '#E60965',
        bottom: 120,
        marginHorizontal: 50,
        alignContent: 'center'
    },
    ContinueButton: {
        backgroundColor: "#FFE5EC",
        borderColor: "#E60965",
        paddingHorizontal: 48,
        paddingVertical: 10,
        borderWidth: 1,
        marginBottom: 10,
        bottom: 120
    },
    CancelButton: {
        backgroundColor: "#FFE5EC",
        borderColor: "#E60965",
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 110,
        marginBottom: 10,
        bottom: 120
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
        borderRadius: 20
    },
    ButtonText: {
        color: "#E60965",
        fontSize: 20,
    },
});
