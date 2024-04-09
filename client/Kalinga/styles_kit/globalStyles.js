
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF8EB',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      position: 'relative', // or 'absolute'
      
    },

    SafeArea:{
      flex: 1,
      backgroundColor: "#FFE7DA"
     },
 
     scrollView:{
         flex: 1,
         //backgroundColor: "red"
     },

     keyBoardAvoidView: {
        backgroundColor: "transparent"
     }, 


    div: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: "5%",
      marginRight: "5%",
      textAlign: "justify",
      //backgroundColor: "red"
    },

    center:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '30%',
    },

    flex_Column: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '100%',
    },

    flex_Row:{
      //backgroundColor: 'blue',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: "5%",
      marginRight: "5%",
      maxWidth: "90%",
    },

    tabs: {
      flex: 1,
    },

    leftFlexBox: {
      flex: 1,
      width: '90%',
      alignItems: 'flex-start',
      //backgroundColor: 'red',
    },

    EducLibraryBox: {
      //EDUC LIBRARY GUEST
      flex: 1, 
      width: '90%',
      backgroundColor: "#FFE5EC",
      alignItems: 'center',
      padding: "8%",
      marginTop: 10,
      borderColor: "#E60965",
      borderWidth: 1,
      borderRadius: 20,
   
    },

    flex_start: {
    marginRight: 160,
    },

    flex_start1: {
      marginHorizontal: 30
      },

    flex_end: {
      flex: 1,
      //justifyContent: "center"
      alignItems: "flex-end",
      marginRight: "5%"
    },

    Paragraph_Container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    smallBackgroundBox: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFD8E2',
      borderRadius: 20,
      width: 150,
      marginRight: 10,
      marginHorizontal: 10,
      marginVertical: 10,
      paddingBottom: 10,
      paddingTop: 10,
    },

    MessageContainer: {
      flex:1
    },

    SentMessageContainer: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "gray",
      maxWidth: "70%",
    },

    //TEXT STYLES

    titleText:{
        fontFamily: 'Kurale',
        fontSize: 18,
    },

    titleParagraph:{
      fontFamily: 'Open-Sans-Bold',
      fontSize: 25,
      color: '#E60965',
    },
    
    paragraphText: {
      fontFamily: 'Open-Sans-Regular',
      fontSize: 12,
      marginRight: '7%',
      marginLeft: '7%',
    },

    Open_Sans_Regular: {
      fontFamily: 'Open-Sans-Regular',
      fontSize: 15,
      color: "#E60965",
      textAlign: "justify",
      marginTop: 10,
    },
    
    Label:{
      textAlign: 'center',
      fontSize: 13,
      fontFamily: 'Open-Sans-Bold',
      color: '#E60965',
    },

    EducLibraryBox_Title:{
      fontFamily: "Open-Sans-Bold",
      fontSize: 14,
      color: "#E60965",
    },


    //SHAPES

    box: {
      backgroundColor: "#F94892",
      width: "80%",
      height: 100,
      marginBottom: 30,
      marginTop: 20,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
    },

    iconbuttonContainer: {
      flexDirection: 'row',
      
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      marginTop: 5,
      marginLeft: 120,
      marginRight: 120,
    },
    
    iconText: {
      fontSize: 12,
      color: 'white',
      marginTop: 0, 
      marginLeft: 10,
    },
  });
  

