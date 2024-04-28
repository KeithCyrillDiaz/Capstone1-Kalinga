//Donor EducLibrary
import React from "react";
import { 
    ScrollView, 
    Text, 
    View, 
    SafeAreaView, 
    StatusBar, 
    StyleSheet
} from 'react-native';
import { globalStyles } from "../../../../styles_kit/globalStyles.js";
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';



const DonorEducContents = () => {

  //const { width, height } = Dimensions.get('window');
  
  const FirstParagraph = ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Sit amet nisl purus in mollis nunc sed id semper. Nisi quis eleifend quam adipiscing vitae proin sagittis. Mi bibendum neque egestas congue quisque egestas diam in. Diam sollicitudin tempor id eu. Vitae tempus quam pellentesque nec. Auctor augue mauris augue neque. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Scelerisque purus semper eget duis. Orci dapibus ultrices in iaculis nunc sed augue lacus viverra. Sit amet nulla facilisi morbi tempus iaculis urna. Congue quisque egestas diam in arcu cursus euismod.'

  const SecondParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Sit amet nisl purus in mollis nunc sed id semper. Nisi quis eleifend quam adipiscing vitae proin sagittis. Mi bibendum neque egestas congue quisque egestas diam in. Diam sollicitudin tempor id eu. Vitae tempus quam pellentesque nec. Auctor augue mauris augue neque. Diam quis enim lobortis scelerisque '

  const ThirdParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Sit amet nisl purus in mollis nunc sed id semper. Nisi quis eleifend quam adipiscing vitae proin sagittis. Mi bibendum neque egestas congue quisque egestas diam in. Diam sollicitudin tempor id eu. Vitae tempus quam pellentesque nec. Auctor augue mauris augue neque. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Scelerisque purus semper eget duis. Orci dapibus ultrices in iaculis nunc sed augue lacus viverra. Sit amet nulla facilisi morbi tempus iaculis urna. Congue quisque egestas diam in arcu cursus euismod.'

  return (
        <SafeAreaView style = {globalStyles.SafeArea}>
           
            <StatusBar barStyle="dark-content" translucent backgroundColor="white" />

            <View style ={globalHeader.SmallHeader}>
                <Text style = {globalHeader.SmallHeaderTitle}>Education Library</Text>

            </View>

            <ScrollView
                style = {globalStyles.scrollView}
                overScrollMode='never' // Disable the over-scroll effect or the Jelly effect when reaching the end of the scroll
                nestedScrollEnabled={true} // Enable nested scrolling
            >
                    
            <View style = {styles.container}>
                <Text style = {globalStyles.titleParagraph}>TITLE</Text>
            </View>

            <View style = {globalStyles.div}>
                <Text style = {globalStyles.Open_Sans_Regular}>
                    {FirstParagraph}
                </Text>
            </View>

            <View style = {globalStyles.flex_Row}>
                <View style = {globalStyles.Paragraph_Container}>
                    <Text style = {globalStyles.Open_Sans_Regular}>{SecondParagraph}</Text>
                </View>
                <View style = {globalStyles.flex_Column}>
                    <View style = {globalStyles.box}>
                        <Text>IMG</Text>
                    </View>
                    <View style = {globalStyles.box}>
                        <Text>IMG</Text>
                    </View>
                </View>
            </View>
            <View style = {globalStyles.div}>
                    <Text style = {globalStyles.Open_Sans_Regular}>
                        {ThirdParagraph}
                    </Text>
            </View>

            </ScrollView>
        </SafeAreaView>
        
      
    )
  }

  const styles = StyleSheet.create ({

    container: {
        alignItems: "center",
        paddingVertical: 20,
    }
    
  })

  export default DonorEducContents;

  