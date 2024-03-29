import React, { useState } from 'react';
import { View, Text, TouchableOpacity,StatusBar, StyleSheet, ScrollView } from 'react-native';
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ApplyAs_Donor = () => {
  const [agreeButtonText, setAgreeButtonText] = useState('Agree');
  const [disagreeButtonText, setDisagreeButtonText] = useState('Disagree');

  const handleAgreeButtonPress = () => {
    console.log('Agree button pressed');
    setAgreeButtonText('Agreed');
  };

  const handleDisagreeButtonPress = () => {
    console.log('Disagree button pressed');
    setDisagreeButtonText('Disagreed');
  };

  const navigation = useNavigation();
  const navigatePage = (Page) => {
    navigation.navigate(Page); // Navigate to the Login screen
};

  return (
    
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => console.log('Apply As Donor_Back button pressed')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={26} color="white" />
          </TouchableOpacity>

          <View style={styles.headerTitle}>
            <Text style={styles.headerTitleText}>Apply As Requestor</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.rectangle}>
        <Text style={styles.dataprivacyactText}>Data Privacy Act</Text>
        <ScrollView style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          overScrollMode='never'
          nestedScrollEnabled={true}
        >
          <Text style={styles.paragraph}>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Sit amet nisl purus in mollis nunc sed id semper. Nisi quis eleifend quam adipiscing vitae proin sagittis. Mi bibendum neque egestas congue quisque egestas diam in. Diam sollicitudin tempor id eu. Vitae tempus quam pellentesque nec. Auctor augue mauris augue neque. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Scelerisque purus semper eget duis. Orci dapibus ultrices in iaculis nunc sed augue lacus viverra. Sit amet nulla facilisi morbi tempus iaculis urna. Congue quisque egestas diam in arcu cursus euismod. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Sit amet nisl purus in mollis nunc sed id semper. Nisi quis eleifend quam adipiscing vitae proin sagittis. Mi bibendum neque egestas congue quisque egestas diam in. Diam sollicitudin tempor id eu. Vitae tempus quam pellentesque nec. Auctor augue mauris augue neque. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Scelerisque purus semper eget duis. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Sit amet nisl purus in mollis nunc sed id semper. Nisi quis eleifend quam adipiscing vitae proin sagittis. Mi bibendum neque egestas congue quisque egestas diam in. Diam sollicitudin tempor id eu. Vitae tempus quam pellentesque nec. Auctor augue mauris augue neque. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Scelerisque purus semper eget duis.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Sit amet nisl purus in mollis nunc sed id semper. Nisi quis eleifend quam adipiscing vitae proin sagittis. Mi bibendum neque egestas congue quisque egestas diam in. Diam sollicitudin tempor id eu. Vitae tempus quam pellentesque nec. Auctor augue mauris augue neque. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Scelerisque purus semper eget duis. Orci dapibus ultrices in iaculis nunc sed augue lacus viverra. Sit amet nulla facilisi morbi tempus iaculis urna. Congue quisque egestas diam in arcu cursus euismod. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Sit amet nisl purus in mollis nunc sed id semper. Nisi quis eleifend quam adipiscing vitae proin sagittis. Mi bibendum neque egestas congue quisque egestas diam in. Diam sollicitudin tempor id eu. Vitae tempus quam pellentesque nec. Auctor augue mauris augue neque. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Scelerisque purus semper eget duis. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit amet. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Sit amet nisl purus in mollis nunc sed id semper. Nisi quis eleifend quam adipiscing vitae proin sagittis. Mi bibendum neque egestas congue quisque egestas diam in. Diam sollicitudin tempor id eu. Vitae tempus quam pellentesque nec. Auctor augue mauris augue neque. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Scelerisque purus semper eget duis.
          </Text>
          </Text>
        </ScrollView>
    
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigatePage("Screening Form")} style={[styles.button, { backgroundColor: agreeButtonText === 'Agree' ? '#FFE5EC' : '#E60965' }]}>
          <Text style={[styles.buttonText, { color: agreeButtonText === 'Agree' ? '#E60965' : 'white' }]}>{agreeButtonText}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDisagreeButtonPress} style={[styles.button, { backgroundColor: disagreeButtonText === 'Disagree' ? '#FFE5EC' : '#E60965' }]}>
          <Text style={[styles.buttonText, { color: disagreeButtonText === 'Disagree' ? '#E60965' : 'white' }]}>{disagreeButtonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8EB',
    flex: 1,
  },
  header: {
    ...globalHeader.HeaderContainer,
  },
  headerContent: {
    ...globalHeader.SmallHeader,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginLeft: 20,
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
    marginLeft: -37,
  },
  headerTitleText: {
    ...globalHeader.SmallHeaderTitle,
  },
  rectangle: {
    backgroundColor: '#FFE5EC',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    width: '95%',
    height: '75%',
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dataprivacyactText: {
    color: '#E60965',
    fontWeight: 'bold',
    fontSize: 20,
  },
  scrollContainer: {
    maxHeight: 800, // Set the maximum height for scrolling
  },  
  paragraph: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'justify',
    fontSize: 12,
    lineHeight: 18,
    color: '#E60965',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 50,
    marginTop: 20,
    
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    borderWidth: 2, 
    borderColor: '#E60965',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingHorizontal: 10,
  },
});

export default ApplyAs_Donor;
