//Guest Home
import React from 'react';
import { ScrollView,Text, View, StatusBar, StyleSheet, SafeAreaView} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { globalHeader } from '../../../styles_kit/globalHeader.js';
import { globalStyles } from '../../../styles_kit/globalStyles.js';
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';


const DonorNotification = () => {

    const FirstParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    const SecondParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    const ThridParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

    const UserName = "Rogine"

    return (
        
        <SafeAreaView>
            <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Notifications</Text>
            </View>

        <ScrollView
        overScrollMode='never' // Disable the over-scroll effect or the Jelly effect when reaching the end of the scroll
        nestedScrollEnabled={true} // Enable nested scrolling
        >
                <View style={globalStyles.container}>
                    <View style = {styles.notifBox}>
                        <Text style = {styles.text}>
                            {FirstParagraph}
                        </Text>
                    </View>
                    <View style = {styles.notifBox}>
                        <Text style = {styles.text}>
                            {FirstParagraph}
                        </Text>
                    </View>
                    <View style = {styles.notifBox}>
                        <Text style = {styles.text}>
                            {FirstParagraph}
                        </Text>
                    </View>
                    <View style = {styles.notifBox}>
                        <Text style = {styles.text}>
                            {FirstParagraph}
                        </Text>
                    </View>
                    <View style = {styles.notifBox}>
                        <Text style = {styles.text}>
                            {FirstParagraph}
                        </Text>
                    </View>
                    <View style = {styles.notifBox}>
                        <Text style = {styles.text}>
                            {FirstParagraph}
                        </Text>
                    </View>
                    <View style = {styles.notifBox}>
                        <Text style = {styles.text}>
                            {FirstParagraph}
                        </Text>
                    </View>
                    <View style = {styles.notifBox}>
                        <Text style = {styles.text}>
                            {FirstParagraph}
                        </Text>
                    </View>
                    <View style = {styles.notifBox}>
                        <Text style = {styles.text}>
                            {FirstParagraph}
                        </Text>
                    </View>
                    <View style = {styles.notifBox}>
                        <Text style = {styles.text}>
                            {FirstParagraph}
                        </Text>
                    </View>
                    <View style = {styles.notifBox}>
                        <Text style = {styles.text}>
                            {FirstParagraph}
                        </Text>
                    </View>
                  
                </View>

              
        </ScrollView>
        </SafeAreaView>
        
    
        
      )
  }


  const styles = StyleSheet.create({


    notifBox: {
        //backgroundColor: "gray",
        //marginHorizontal: "5%",
        borderBottomWidth: 2,
        borderColor: "#E60965",
        paddingBottom: 20,
        padding: 20,
    },

    text: {
        color: "#E60965",
        textAlign: "justify",
        fontFamily: "Open-Sans-Regular",
        fontSize: 15,
    }

  })
  
export default DonorNotification;

