//Guest Home
import React from 'react';
import { ScrollView,Text, View, StatusBar, StyleSheet, SafeAreaView, TouchableOpacity, TextInput} from 'react-native';

import { globalHeader } from '../../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';

import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';




const FavoriteArticles = () => {

    const FirstParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    const SecondParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    const ThridParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    const UserName = "Rogine"

    return (
        
        <SafeAreaView>
            <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Saved Articles</Text>
            </View>

        <ScrollView
        overScrollMode='never' // Disable the over-scroll effect or the Jelly effect when reaching the end of the scroll
        nestedScrollEnabled={true} // Enable nested scrolling
        >
            <View style={globalStyles.container}>
                <View style = {styles.row}>
                    <View style = {styles.searchField}>
                        
                        <Octicons name="search" size={24} color="#E60965"/>
                        <TextInput
                            style={styles.search}
                            placeholder="Search."
                            placeholderTextColor="#E60965"
                        />
                    </View>
                                     
                        <TouchableOpacity style = {styles.favoriteButton}>
                            <MaterialIcons name="star-rate" size={30} color="white" />
                         </TouchableOpacity>
                           
                </View>
               
                    <View style = {styles.tabs}>
                        <View style = {styles.rowTabs}>
                            <TouchableOpacity>
                                <Text style = {styles.button}>
                                    Latest
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style = {styles.oldButton}>
                                    Old 
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style = {styles.button}>
                                    Newest
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style = {styles.indicatedButton}>
                                    Favorites
                                </Text>
                            </TouchableOpacity>
                        </View>
                      
                    </View>


                 <View style = {styles.box}>
                    <View style = {styles.rowBoxContent}>
                        <View style = {styles.img}>
                            <Text>Img</Text>
                        </View> 
                        <Text style = {styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </Text>
                    </View>

                 </View>
                 
                 <View style = {styles.box}>
                    <View style = {styles.rowBoxContent}>
                        <View style = {styles.img}>
                            <Text>Img</Text>
                        </View> 
                        <Text style = {styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </Text>
                    </View>

                 </View>
                 
                 <View style = {styles.box}>
                    <View style = {styles.rowBoxContent}>
                        <View style = {styles.img}>
                            <Text>Img</Text>
                        </View> 
                        <Text style = {styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </Text>
                    </View>

                 </View>
                 
                 <View style = {styles.box}>
                    <View style = {styles.rowBoxContent}>
                        <View style = {styles.img}>
                            <Text>Img</Text>
                        </View> 
                        <Text style = {styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </Text>
                    </View>

                 </View>
                 
                 <View style = {styles.box}>
                    <View style = {styles.rowBoxContent}>
                        <View style = {styles.img}>
                            <Text>Img</Text>
                        </View> 
                        <Text style = {styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </Text>
                    </View>

                 </View>
           
              
            </View>
              
          </ScrollView>
        </SafeAreaView>
        
    
        
      )
  }


  const styles = StyleSheet.create({

    row: {
        flexDirection: "row",
        marginVertical: 20,
        //backgroundColor: "gray",
        width: "90%",
        alignItems: "center",
        justifyContent: "center",

    },
    


    search: {
        borderWidth: 1,
        padding: 10,
        paddingLeft: 40,
        backgroundColor: "#FFEECC",
        borderColor: '#E60965',
        borderRadius: 30,
        height: "70%",
        width: 300,
        color: '#E60965',
        marginLeft: -35,
        elevation: -1,
    },
    
    searchField: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "5%",
    },

    favoriteButton: {
        backgroundColor: "#E60965",
        marginLeft: 10,
        alignItems: "center",
        justifyContent: "center",
        width: "13%",
        borderRadius: 12,
        height: 47
    },

    tabs: {
        //backgroundColor:"gray",
        marginHorizontal: "20%",
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },

    rowTabs: {
        flexDirection: "row",

    },

    button: {
        backgroundColor: "#E60965",
        padding: 5,
        paddingHorizontal: 15,
        marginRight: 10,
        color: "white",
        borderRadius: 20,
    },

    oldButton: {
        backgroundColor: "#E60965",
        padding: 5,
        paddingHorizontal: 30,
        marginRight: 10,
        color: "white",
        borderRadius: 20,

    },

    box: {
        backgroundColor: "#FFE5EC",
        marginHorizontal: "5%",
        marginTop: 20,
        //alignItems: "center",
        justifyContent: "center",
        height: 200,
        borderRadius: 10
    },

    rowBoxContent: {
        flexDirection: "row",
        alignItems: "center",

    },


    img: {
        backgroundColor: "white",
        height: 170,
        width: 100,
        marginLeft: 10,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 12,
    },

    text: {

        width: "60%",
        marginHorizontal: 10,
        textAlign: "justify",
        marginBottom: 20,
        marginVertical: 10,
        color: "#E60965"
    },

    indicatedButton: {
        backgroundColor: "FFEECC",
        padding: 5,
        paddingHorizontal: 15,
        marginRight: 10,
        color: "#E60965",
        borderRadius: 20,
    }





  })
  
export default FavoriteArticles;

