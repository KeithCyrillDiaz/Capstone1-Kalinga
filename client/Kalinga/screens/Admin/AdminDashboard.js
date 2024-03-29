import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { globalHeader } from '../../styles_kit/globalHeader';

const AdminDashboard = () => {
    const navigation = useNavigation(); 

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style={globalHeader.SmallHeader}>
                <Text style={globalHeader.SmallHeaderTitle}>Notifications</Text>
            </View>
            <View>
            <Text style={styles.MotherText}>Mothers</Text>
            </View>
            <View style={styles.rowContainer}>
                <View style={styles.FirstContainer}>
                    <View style={styles.SecondRowContainer}>
                        <FontAwesome5 name="user-alt" size={24} color="#E60965" style={styles.Firsticon} />
                        <Text style={styles.DonorText}>Donor</Text>
                    </View>
                    <View>
                        <Text style={styles.NumberOfDonor}>123</Text>
                        <Text style={styles.TotalDonorText}>Total Donors</Text>
                    </View>
                    
                </View>
                <View style={styles.SecondContainer}>
                    <View style={styles.SecondRowContainer}>
                        <FontAwesome5 name="user-alt" size={24} color="#E60965" style={styles.Firsticon}/>
                        <Text style={styles.RequestorText}>Requestor</Text>
                    </View>
                    <View>
                        <Text style={styles.NumberOfDonor}>123</Text>
                        <Text style={styles.TotalDonorText}>Total Requestors</Text>
                    </View>
                </View>
            </View>
            <View style={styles.ThirdContainer}>
                <View style={styles.FourthContainer}>
                    <Text style={styles.TitleText}>Milk Donation per month</Text>
                    <Foundation name="graph-bar" size={150} color="#E60965" style={styles.icon}/>
                    <SimpleLineIcons name="graph" size={150} color="#E60965" style={styles.icon} />
                </View>
                
            </View>
        </SafeAreaView>
    );
}

export default AdminDashboard;

const styles = StyleSheet.create ({
    header: {
        
        backgroundColor: '#E60965',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 30,
        alignItems: 'center',
        marginTop: -20,
        paddingVertical: 20
        

    },
    headerTitle: {
        fontFamily: 'Kurale-Regular',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
        alignSelf: "center"
    },
    container:{
        flex: 1,
        backgroundColor: '#FFF8EB',

    },
    menuIcon: {
        marginLeft: 20,
        marginRight: 20,
    },
    MotherText: {
        fontSize: 30,
        color: '#E60965',
        fontWeight: '500',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)', 
        textShadowOffset: { width: 0, height: 2}, 
        textShadowRadius: 1,
        marginTop: 15

    },
    rowContainer: {
        flexDirection: 'row',
        marginBottom: 10, 
        justifyContent: 'space-evenly',
        height: '25%'
    },
    SecondRowContainer: {
        flexDirection: 'row',
        marginBottom: 10, 
        justifyContent: 'center',
        height: '25%'
    },
    FirstContainer:{
        flexDirection: 'column',
        marginVertical: 10, 
        backgroundColor: 'white',
        width: '45%',
        borderRadius: 10,
        borderColor: '#E60965',
        borderWidth: 1,
        
    },
    NumberOfDonor:{
        fontSize: 50,
        fontWeight: '700',
        alignSelf: 'center',
        color: '#E60965',
    },
    SecondContainer:{
        marginVertical: 10, 
        backgroundColor: 'white',
        width: '45%',
        borderRadius: 10,
        borderColor: '#E60965',
        borderWidth: 1,
    },
    RequestorText:{
        fontSize: 30,
        color: '#E60965',
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 15
    },
    DonorText:{
        fontSize: 30,
        color: '#E60965',
        fontWeight: '500',
        marginTop: 15,
    },

    ThirdContainer:{
        marginBottom: 10, 
        justifyContent: 'center',
        height: '50%',
    },
    FourthContainer:{
        marginBottom: 10, 
        height: '95%',
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#E60965',
        borderWidth: 1,
        marginHorizontal: 10,

    },
    TitleText:{
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center',
        color: '#E60965',

    },
    icon: {
        alignSelf: 'center', 
    },
    Firsticon:{
        marginTop: 20,
       
    },
    TotalDonorText:{
        fontSize: 20,
        color: '#E60965',
        fontWeight: '500',
        marginTop: 15,
        textAlign: 'center',
    }
});
