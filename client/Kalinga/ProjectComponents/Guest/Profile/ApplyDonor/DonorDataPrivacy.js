//Guest EducLibrary
import React from "react";
import { 
  ScrollView, 
  Text, View, 
  SafeAreaView, 
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { globalStyles } from "../../../../styles_kit/globalStyles.js";
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { useNavigation } from '@react-navigation/native';



const DonorDataPrivacy = () => {


  const navigation = useNavigation();

  const navigatePage = (Page) => {
    // Navigate to the next screen by route name
    navigation.navigate(Page);
  }

  //const { width, height } = Dimensions.get('window');
  
  const FirstParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse '

  const SecondParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Sit amet nisl purus in mollis nunc sed id semper. Nisi quis eleifend quam adipiscing vitae proin sagittis. Mi bibendum neque egestas congue quisque egestas diam in. Diam sollicitudin tempor id eu. Vitae tempus quam pellentesque nec. Auctor augue mauris augue neque. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Scelerisque purus semper eget duis. Orci dapibus ultrices in iaculis nunc sed augue lacus viverra. Sit amet nulla facilisi morbi tempus iaculis urna. Congue quisque egestas diam in arcu cursus euismod. '

  const ThirdParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Sit amet nisl purus in mollis nunc sed id semper. Nisi quis eleifend quam adipiscing vitae proin sagittis. Mi bibendum neque egestas congue quisque egestas diam in. Diam sollicitudin tempor id eu. Vitae tempus quam pellentesque nec. Auctor augue mauris augue neque. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Scelerisque purus semper eget duis.  '

  return (

      <SafeAreaView style = {styles.SafeArea}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Apply as Donor</Text>
            </View>
          <ScrollView 
            style = {globalStyles.ScrollView}
            overScrollMode='never'
            nestedScrollEnabled={true}
        
          >
              <View style = {styles.container}>
                <Text style = {globalStyles.titleParagraph}>Data Privacy Act</Text>
                <Text style = {styles.text}>{FirstParagraph}</Text>
                <Text style = {styles.text}>{SecondParagraph}</Text>
                <Text style = {styles.text}>{ThirdParagraph}</Text>
              </View>

              <View style = {globalStyles.center}>
                <View style = {styles.button}>
                    <TouchableOpacity style = {styles.AgreebuttonContainer} onPress={() => navigatePage("DonorScreeningForm")}>
                        <Text style = {styles.Alabel}>Agree</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.DisagreebuttonContainer} onPress={() => navigatePage("Guest Profile")}>
                        <Text style = {styles.Dlabel}>Diagree</Text>
                    </TouchableOpacity>
                   
                </View>
            </View>

        </ScrollView>

           
            

      </SafeAreaView>

    )
  }

  const styles = StyleSheet.create ({
    SafeArea: {
        flex: 1,
        backgroundColor: '#FFF8EB',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: "100%"
    },

    button: {
        flex: 1,
        flexDirection: "row",
        //backgroundColor: "red"
    },

    Alabel: {
        color: "white",
        fontFamily: "Open-Sans-Bold",
        fontSize: 15,

    },

    Dlabel: {
        color: "#E60965",
        fontFamily: "Open-Sans-Bold",
        fontSize: 15,

    },


    AgreebuttonContainer:{
        backgroundColor: "#E60965",
        paddingVertical: 5,
        paddingHorizontal: 37,
        borderRadius: 20,
        justifyContent: "center",
        marginBottom: "10%",
        marginHorizontal: "5%"
    },
    
    DisagreebuttonContainer:{
        backgroundColor: "white",
        paddingVertical: 5,
        paddingHorizontal: 37,
        borderRadius: 20,
        justifyContent: "center",
        marginBottom: "10%",
        borderWidth: 1,
        borderColor: "#E60965",
        marginHorizontal: "5%"
    },

    text: {
        fontFamily: "Open-Sans-Regular",
        fontSize: 15,
        textAlign: "justify",
        marginTop: "5%",
    },

    container: {
      flex: 1,
      backgroundColor: '#FFE5EC',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: "5%",
      marginTop: "5%",
      marginBottom: "-25%",
      paddingVertical: "10%",
      paddingHorizontal: "5%",
      borderRadius: 27,

    },

    flex_start: {
      flex: 1,
      //justifyContent: "center"
      alignItems: "flex-start",
      marginLeft: "5%",
      marginVertical: "2.5%"
    }

  })

  export default DonorDataPrivacy;

  