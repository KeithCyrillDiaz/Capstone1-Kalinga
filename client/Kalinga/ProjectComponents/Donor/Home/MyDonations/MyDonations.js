import React from 'react';
import { SafeAreaView, Text, View,ScrollView, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';


import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


const MyDonations = () => {
    const navigation = useNavigation();

const navigatePage = (Page) => {
    navigation.navigate(Page); // Navigate to the Login screen
    

};
    return (
             <SafeAreaView style = {styles.container}>
 
                 {/* <View style={styles.headerButton}>
                      <Text style = {styles.indicatedButton}>Overall</Text>
                      <Text style = {styles.Tabbutton}>Ongoing</Text>
                      <Text style = {styles.Tabbutton}>Completed</Text>
                  </View> */}
                <ScrollView
                 overScrollMode='never'
                 nestedScrollEnabled={true}
                
                >

                    <View style = {styles.RowMilk}>
                        <View>
                            {/* Temporary */}
                            <MaterialIcons name="local-drink" size={150} color="#E60965" /> 
                        </View>
                        <View>
                            <Text style = {styles.upperText}>You Have Donated</Text>
                            <Text style = {styles.lowerText}> 50 mL</Text>
                        </View>
                    </View>

                    <View style = {styles.RowAchievements}>
                        <View>
                            {/* Temporary */}
                            <FontAwesome5 name="hand-holding-water" size={100} color="#E60965"/>
                        </View>
                        <View>
                            <Text style = {styles.upperText}>You have completed</Text>
                            <Text style = {styles.lowerText}> 5 </Text>
                            <Text style = {styles.upperText}>Generous Donations</Text>
                        </View>
                    </View>

                    <TouchableOpacity>
                            <Text style = {styles.button}>Download as PDF</Text>
                    </TouchableOpacity>

                    <View>
                            <Text style = {styles.bottomText}>Your generosity is changing lives. Thank you for making a difference with your valuable contribution.</Text>
                        
                        </View>

                </ScrollView>
        
            </SafeAreaView>
        
    );

}

const styles = StyleSheet.create ({

    container: {
        flex: 1,
        backgroundColor: "#FFF8EB",

    },

    RowMilk: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: "10%",
        marginTop: 50,
        paddingLeft: 30,
        flexDirection: "row",
        //backgroundColor: "gray",
        borderWidth: 3,
        borderRadius: 20,
        borderColor: "#E60965",
        height: 270
  
    }, RowAchievements: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: "10%",
        marginTop: 30,
        paddingLeft: 30,
        flexDirection: "row",
        //backgroundColor: "gray",
        borderWidth: 3,
        borderRadius: 20,
        borderColor: "#E60965",
        height: 270
  
    },

    upperText: {
        fontFamily: "Open-Sans-Bold",
        fontSize: 18,
        color: "#E60965",
        marginRight: 50,
    },

    lowerText: {
        fontFamily: "Open-Sans-Bold", // Need prata font
        fontSize: 35,
        color: "#E60965",
        textAlign: "center",
        marginRight: 50,
        //backgroundColor: "red"
    },

    button: {
        backgroundColor: "#E60965",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: "30%",
        textAlign: "center",
        marginTop: 20,
        padding: 10,
        borderRadius: 20,
        color: "white",
        fontFamily: "Open-Sans-Regular", //should be swmi Bold
        fontSize: 17,
    },

    bottomText: {
       // backgroundColor: "gray",
        marginHorizontal: "10%",
        textAlign: "center",
        color: "#E60965",
        marginVertical: 20,
    },

    
	headerButton: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 20,
		justifyContent: "space-evenly",
		borderBottomWidth: 1,
		borderBlockColor: "#FFACC7"
	},

	Tabbutton: {
		borderWidth: 1,
		paddingVertical: 10,
		width: "25%",
		color: "#E60965",
		borderColor: "#E60965",
		fontFamily: "Open-Sans-Bold",
		backgroundColor: "#FFE5EC",
		borderRadius: 7,
		fontSize: 18,
    textAlign: "center"
	},
	
	indicatedButton: {
		borderWidth: 1,
		paddingVertical: 10,
		width: "25%",
		color: "white",
		borderRadius: 7,
		borderColor: "#E60965",
		fontFamily: "Open-Sans-Bold",
		backgroundColor: "#E60965",
		fontSize: 18,
    textAlign: "center"
	},
});

export default MyDonations;