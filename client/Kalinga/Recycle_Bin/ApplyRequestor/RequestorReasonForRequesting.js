//Guest EducLibrary
import React from "react";
import { 
  ScrollView, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput, 
} from 'react-native';
import { globalStyles } from "../../../styles_kit/globalStyles.js"
import { globalHeader } from "../../../styles_kit/globalHeader.js";
import { useNavigation } from '@react-navigation/native';

const ReasonForRequesting = () => {
    const SecondParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Sit amet nisl purus in mollis nunc sed id semper. Nisi quis eleifend quam adipiscing vitae proin sagittis. Mi bibendum neque egestas congue quisque egestas diam in. Diam sollicitudin tempor id eu. Vitae tempus quam pellentesque nec. Auctor augue mauris augue neque. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Scelerisque purus semper eget duis. Orci dapibus ultrices in iaculis nunc sed augue lacus viverra. Sit amet nulla facilisi morbi tempus iaculis urna. Congue quisque egestas diam in arcu cursus euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Sit amet nisl purus in mollis nunc sed id semper. Nisi quis eleifend quam adipiscing vitae proin sagittis. Mi bibendum neque egestas congue quisque egestas diam in. Diam sollicitudin tempor id eu. Vitae tempus quam pellentesque nec. Auctor augue mauris augue neque. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Scelerisque purus semper eget duis. Orci dapibus ultrices in iaculis nunc sed augue lacus viverra. Sit amet nulla facilisi morbi tempus iaculis urna. Congue quisque egestas diam in arcu cursus euismod.'
    const navigation = useNavigation();

    const navigatePage = (Page) => {
      // Navigate to the next screen by route name
      navigation.navigate(Page);
    };
  return (

      <SafeAreaView style = {styles.SafeArea}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
            <View style = {globalHeader.SmallHeader}>
              <Text style = {globalHeader.SmallHeaderTitle}>Apply as Requestor</Text>
            </View>
          <ScrollView 
            style = {globalStyles.ScrollView}
            overScrollMode='never'
            nestedScrollEnabled={true}
        
          >
              <View style = {styles.container}>
                <View style = {globalStyles.flex_Row}>
                    <View style = {styles.pageIndicator}/>
                    <View style = {styles.IndicatedPage}/>
                    <View style = {styles.pageIndicator}/>
             
                </View>
              </View>
              
              <View style = {{marginLeft: 30}}>
                <Text style = {styles.title}>Reason For Requesting</Text>
              </View>
              <View style = {styles.container}>
                    <TextInput
                        style={styles.BiginputField}
                        multiline={true}
                        textAlignVertical="top" // Align text to the top vertically
               
                    />         
              </View>

              <View style = {styles.container}>
                <Text style = {styles.MainTitle}>Upload Medical Requirements</Text>
              </View>
              <View style = {globalStyles.center}>


              <View style = {styles.attachmentContainer}>
                <Text style={styles.newLabel}>
                    Attach Syphillis Test Result
                </Text>
                <View style={styles.rowAlignment}>
                    <FontAwesome5 name="asterisk" size={12} color="#E60965" />
                    <TouchableOpacity style={styles.iconContainer}>
                      <AntDesign name="picture" size={27} color="#E60965" />
                      <Text style={styles.verticalLine}>|</Text>
                      <AntDesign name="file1" size={24} color="#E60965" />
                    </TouchableOpacity>
                </View>
            </View>
               
                    <TouchableOpacity style = {styles.AgreebuttonContainer} onPress={() => navigatePage("RequestorApprovalMessage")}>
                        <Text style = {styles.label}>Next</Text>
                    </TouchableOpacity>
            </View>

        </ScrollView>

           
            

      </SafeAreaView>

    )
  }

  const styles = StyleSheet.create ({
    SafeArea: {
        flex: 1,
        backgroundColor: '#FFF8EB',
        
        width: '100%',
        height: "100%"
    },

    rowAlignment: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },

    attachmentContainer: {
      backgroundColor: "pink",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: "#E60965",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginBottom: 17,
      width: "90%"
  },

    newLabel: {
      color: "#E60965",
      fontSize: 15,
      fontFamily: "Open-Sans-SemiBold",
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFEECC",
    paddingHorizontal: 5,
    marginLeft: 10,
  },

  verticalLine: {
    fontSize: 37,
    marginTop: -10,
    color: "#E60965",
  },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: "yellow"

      },
  

    label: {
        color: "white",
        fontFamily: "Open-Sans-Bold",
        fontSize: 15,

    },

    IndicatedPage: {
        height: 4,
        width: 50,
        backgroundColor: "#F94892",
        marginTop: "10%",
        marginHorizontal: "1%",
    },

    pageIndicator: {
        height: 4,
        width: 50,
        backgroundColor: "#FFEECC",
        marginTop: "10%",
        marginHorizontal: "1%",
    },

    MainTitle: {
        fontFamily: 'Open-Sans-Bold',
        fontSize: 20,
        color: '#E60965',
        marginTop: "5%"
    },

    title: {
        fontFamily: 'Open-Sans-Bold',
        fontSize: 16,
        color: '#E60965',
        marginVertical: "4%"
    },

    AgreebuttonContainer:{
        backgroundColor: "#E60965",
        paddingHorizontal: 37,
        borderRadius: 20,
        justifyContent: "center",
        paddingVertical: 5,
        marginTop: "-25%"
    },

    BiginputField: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#E60965",
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: "90%",
        height: 300,
        marginVertical: "1.5%",
        color: "#E60965",
    },

  })

  export default ReasonForRequesting;

  