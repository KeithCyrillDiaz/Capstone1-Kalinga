import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, ScrollView, Dimensions, StatusBar } from 'react-native'; // Added Dimensions
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import PopOutMilkBank from '../../ProjectComponents/InitialScreenPages/PopOutMilkBank'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { globalHeader } from '../../styles_kit/globalHeader';


const SearchBar = () => {
    return (
        <View style={styles.searchContainer}>
            <Feather name="search" size={24} style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Search Donors"
                placeholderTextColor="#777"
            />
        </View>
    );
};

const AdminMilkbanks = () => {
    const navigation = useNavigation();
    const [popOutVisible, setPopOutVisible] = useState(false);

    const handleViewPress = () => {
        setPopOutVisible(true);
    }

    const screenWidth = Dimensions.get('window').width; // Get the screen width

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style={globalHeader.SmallHeader}>
                <Text style={globalHeader.SmallHeaderTitle}>MilkBanks</Text>
            </View>
            <SearchBar></SearchBar>
            <ScrollView style = {styles.scrollView}>
                
            <View style={styles.milkBankList}>
                 
                    <View style={styles.test}>
                         <FontAwesome5 name="hospital-user" size={35} color="#E60965" />

          
                        <View style={styles.DescriptionText}>
                            <Text style={styles.MilkBankName}>Quezon City General Hospital</Text>
                            <Text style={styles.MilkBankLocation}>Location: Quezon City</Text>
                            <Text style={styles.MilkBankPhone}>Phone Number: +63 2 426 1314</Text>
                        </View>
                        <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                            <Text style={styles.viewButtonText}>View</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.horizontalLine} />
                    
                    <View style={styles.test}>
                         <FontAwesome5 name="hospital-user" size={35} color="#E60965" />

          
                        <View style={styles.DescriptionText}>
                            <Text style={styles.MilkBankName}>Quezon City General Hospital</Text>
                            <Text style={styles.MilkBankLocation}>Location: Quezon City</Text>
                            <Text style={styles.MilkBankPhone}>Phone Number: +63 2 426 1314</Text>
                        </View>
                        <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                            <Text style={styles.viewButtonText}>View</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.horizontalLine} />
                    <View style={styles.test}>
                         <FontAwesome5 name="hospital-user" size={35} color="#E60965" />

          
                        <View style={styles.DescriptionText}>
                            <Text style={styles.MilkBankName}>Quezon City General Hospital</Text>
                            <Text style={styles.MilkBankLocation}>Location: Quezon City</Text>
                            <Text style={styles.MilkBankPhone}>Phone Number: +63 2 426 1314</Text>
                        </View>
                        <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                            <Text style={styles.viewButtonText}>View</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.horizontalLine} />
                    <View style={styles.test}>
                         <FontAwesome5 name="hospital-user" size={35} color="#E60965" />

          
                        <View style={styles.DescriptionText}>
                            <Text style={styles.MilkBankName}>Quezon City General Hospital</Text>
                            <Text style={styles.MilkBankLocation}>Location: Quezon City</Text>
                            <Text style={styles.MilkBankPhone}>Phone Number: +63 2 426 1314</Text>
                        </View>
                        <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                            <Text style={styles.viewButtonText}>View</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.horizontalLine} />
                    <View style={styles.test}>
                         <FontAwesome5 name="hospital-user" size={35} color="#E60965" />

          
                        <View style={styles.DescriptionText}>
                            <Text style={styles.MilkBankName}>Quezon City General Hospital</Text>
                            <Text style={styles.MilkBankLocation}>Location: Quezon City</Text>
                            <Text style={styles.MilkBankPhone}>Phone Number: +63 2 426 1314</Text>
                        </View>
                        <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                            <Text style={styles.viewButtonText}>View</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.horizontalLine} />
                    <View style={styles.test}>
                         <FontAwesome5 name="hospital-user" size={35} color="#E60965" />

          
                        <View style={styles.DescriptionText}>
                            <Text style={styles.MilkBankName}>Quezon City General Hospital</Text>
                            <Text style={styles.MilkBankLocation}>Location: Quezon City</Text>
                            <Text style={styles.MilkBankPhone}>Phone Number: +63 2 426 1314</Text>
                        </View>
                        <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                            <Text style={styles.viewButtonText}>View</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.horizontalLine} />
                    <View style={styles.test}>
                         <FontAwesome5 name="hospital-user" size={35} color="#E60965" />

          
                        <View style={styles.DescriptionText}>
                            <Text style={styles.MilkBankName}>Quezon City General Hospital</Text>
                            <Text style={styles.MilkBankLocation}>Location: Quezon City</Text>
                            <Text style={styles.MilkBankPhone}>Phone Number: +63 2 426 1314</Text>
                        </View>
                        <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                            <Text style={styles.viewButtonText}>View</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.horizontalLine} />
                    <View style={styles.test}>
                         <FontAwesome5 name="hospital-user" size={35} color="#E60965" />

          
                        <View style={styles.DescriptionText}>
                            <Text style={styles.MilkBankName}>Quezon City General Hospital</Text>
                            <Text style={styles.MilkBankLocation}>Location: Quezon City</Text>
                            <Text style={styles.MilkBankPhone}>Phone Number: +63 2 426 1314</Text>
                        </View>
                        <TouchableOpacity style={styles.viewButton} onPress={handleViewPress}>
                            <Text style={styles.viewButtonText}>View</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.horizontalLine} />
                </View>
            
               
               
                    

                
          

                

            </ScrollView>

            <PopOutMilkBank visible={popOutVisible} onClose={() => setPopOutVisible(false)} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    scrollView:{

        // backgroundColor: "pink",
        width: "100%",
        alignSelf: "center"
    },

    container: {
        flex: 1,
        // marginHorizontal:"10%",
        backgroundColor: '#FFF8EB',
    },
    header: {
        backgroundColor: '#E60965',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 30,
        alignItems: 'center',
        marginTop: 30,
        paddingVertical: 20
    },
    headerTitle: {
        fontFamily: 'Kurale-Regular',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
    },
    menuIcon: {
        marginLeft: 20,
        marginRight: 20,
    },
    searchContainer: {
        backgroundColor: '#FFF8EB',
        width: '80%',
        paddingVertical: 5,
        marginBottom: 10,
        alignItems: 'center',
        marginLeft: 40,
        borderRadius: 10,
        flexDirection: 'row',
        paddingHorizontal: 10,
        position: 'relative',
        marginTop: 10
    },
    searchIcon: {
        position: 'absolute',
        left: 15,
        top: '60%',
        transform: [{ translateY: -12 }], 
        color: '#E60965'
    },
    searchInput: {
        flex: 1,
        paddingLeft: 35, 
        paddingVertical: 2,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E60965',
        borderRadius: 10,
    },
    milkBankList: {

    },
    milkBank: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5, 
        
    },

    test: {
        flexDirection: 'row',
        // backgroundColor: "pink",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: "10%"
    },


    milkBankDescription: {
    },
    viewButton: {
        backgroundColor: 'white',
        height: '35%',
        width: "20%",
        borderRadius: 50,
        borderColor: '#E60965',
        borderWidth: 1,
        alignItems: 'center',
    },
    viewButtonText: {
        color: '#E60965',
        fontSize: 15,
    },
    
    horizontalLine: {
        width: '100%',
        height: 1,
        backgroundColor: '#E60965',
        marginTop: 10,
        marginBottom: 10,
    },
    DescriptionText:
    {
        alignItems: 'baseline',
        marginHorizontal:10,
        
    },
    MilkBankName:{
        fontWeight: '700',
        fontSize: 18,
        color: '#E60965'

    },
    MilkBankLocation:{
        fontSize: 15,
        color: '#E60965'
    },
    MilkBankPhone:{
        fontSize: 15,
        color: '#E60965'
    }
});
export default AdminMilkbanks;
